#!/usr/bin/env node
/**
 * GalleryPilot — GA4 provisioning (zero dependency).
 *
 * Creates, idempotently:
 *   - Property "GP — Website"   + web stream (eromepilot.vercel.app) -> measurement ID
 *   - Property "GP — Extension" + Measurement Protocol stream        -> API secret
 *   - Key events, custom dimensions, audiences on each property
 *
 * Writes results into:
 *   gallerypilot-landing-page/.env.local  (NEXT_PUBLIC_GA_MEASUREMENT_ID)
 *   extension_hero/.env                   (ANALYTICS_GA4_MEASUREMENT_ID / _API_SECRET)
 *
 * Usage:
 *   node scripts/ga4/setup-ga4.mjs --key-file /path/to/service-account.json
 *   node scripts/ga4/setup-ga4.mjs                # uses gcloud ADC if available
 *   node scripts/ga4/setup-ga4.mjs --dry-run      # list current state only
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_ROOT = path.resolve(__dirname, '..', '..');
const EXT_ROOT = path.resolve(SITE_ROOT, '..', 'extension_hero');

const ADMIN = 'https://analyticsadmin.googleapis.com';
const SCOPES = ['https://www.googleapis.com/auth/analytics.edit'];
const SITE_URI = 'https://eromepilot.vercel.app';
const TIME_ZONE = process.env.GA_TIME_ZONE || 'Europe/Paris';
const CURRENCY = process.env.GA_CURRENCY || 'USD';

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const keyFileIdx = args.indexOf('--key-file');
const KEY_FILE = keyFileIdx >= 0 ? args[keyFileIdx + 1] : null;

function die(msg) {
  console.error(`\n✗ ${msg}\n`);
  process.exit(1);
}

async function loadServiceAccount() {
  const candidates = [
    KEY_FILE,
    process.env.GOOGLE_SERVICE_ACCOUNT_JSON,
    process.env.GOOGLE_APPLICATION_CREDENTIALS,
  ].filter(Boolean);
  for (const p of candidates) {
    try {
      const json = JSON.parse(fs.readFileSync(p, 'utf8'));
      if (json.client_email && json.private_key) return { kind: 'sa', ...json };
    } catch { /* try next */ }
  }
  return null;
}

async function loadAdc() {
  const paths = [
    path.join(process.env.HOME || '', '.config/gcloud/application_default_credentials.json'),
    path.join(process.env.APPDATA || '', 'gcloud/application_default_credentials.json'),
  ];
  for (const p of paths) {
    try {
      const json = JSON.parse(fs.readFileSync(p, 'utf8'));
      if (json.refresh_token && json.client_secret && json.client_id) return { kind: 'adc', ...json };
    } catch { /* try next */ }
  }
  return null;
}

function b64url(input) {
  return Buffer.from(input).toString('base64url');
}

async function getServiceAccountToken(sa) {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = b64url(JSON.stringify({
    iss: sa.client_email,
    scope: SCOPES.join(' '),
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  }));
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(`${header}.${claims}`);
  const signature = signer.sign(sa.private_key, 'base64url');
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${header}.${claims}.${signature}`,
    }),
  });
  const data = await res.json();
  if (!data.access_token) die(`Service-account token exchange failed: ${JSON.stringify(data)}`);
  return data.access_token;
}

async function getAdcToken(adc) {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: adc.refresh_token,
      client_id: adc.client_id,
      client_secret: adc.client_secret,
    }),
  });
  const data = await res.json();
  if (!data.access_token) die(`ADC token refresh failed: ${JSON.stringify(data)}`);
  return data.access_token;
}

let TOKEN = null;
async function api(method, apiPath, body = undefined, version = 'v1beta') {
  const url = `${ADMIN}/${version}/${apiPath.replace(/^\/+/, '')}`;
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await res.text();
  let data;
  try { data = text ? JSON.parse(text) : {}; } catch { data = { raw: text }; }
  if (!res.ok) {
    throw Object.assign(new Error(`${method} ${apiPath} -> ${res.status}`), { apiError: data });
  }
  return data;
}

async function findOrCreate(listPath, listKey, matchFn, describe, createFn, version = 'v1beta') {
  const existing = await api('GET', listPath, undefined, version);
  const items = existing[listKey] ?? [];
  const found = items.find(matchFn);
  if (found) {
    console.log(`  = ${describe} (exists: ${found.name})`);
    return found;
  }
  if (DRY_RUN) {
    console.log(`  + ${describe} (MISSING — would create)`);
    return null;
  }
  const created = await createFn();
  console.log(`  + ${describe} (created: ${created.name})`);
  return created;
}

function upsertEnv(file, entries) {
  let content = '';
  try { content = fs.readFileSync(file, 'utf8'); } catch { /* new file */ }
  for (const [key, value] of Object.entries(entries)) {
    const re = new RegExp(`^${key}=.*$`, 'm');
    if (re.test(content)) content = content.replace(re, `${key}=${value}`);
    else content += `${content.endsWith('\n') || content === '' ? '' : '\n'}${key}=${value}\n`;
  }
  fs.writeFileSync(file, content);
  console.log(`  → updated ${file}`);
}

const SITE_KEY_EVENTS = ['chrome_store_click', 'checkout_click'];
const EXT_KEY_EVENTS = ['slideshow_start', 'pro_panel_open', 'checkout_click'];

const SITE_DIMENSIONS = [
  ['placement', 'CTA placement'],
  ['plan', 'Pricing plan'],
  ['question_id', 'FAQ item'],
];

const EXT_DIMENSIONS = [
  ['mode', 'Slideshow media mode'],
  ['setting', 'Changed setting name'],
  ['value', 'Setting value'],
  ['feature', 'Pro feature name'],
  ['plan', 'Checkout plan'],
  ['media_viewed', 'Media viewed count'],
  ['duration_sec', 'Session duration seconds'],
];

function includeClause(eventName, parameterConditions = null) {
  const eventFilter = { eventName };
  if (parameterConditions) {
    eventFilter.eventParameterFilterExpression = {
      andGroup: {
        filterExpressions: parameterConditions.map(({ name, op, value }) => ({
          orGroup: {
            filterExpressions: [{
              dimensionOrMetricFilter: {
                fieldName: name,
                numericFilter: { operation: op, value: { int64Value: String(value) } },
              },
            }],
          },
        })),
      },
    };
  }
  return {
    clauseType: 'INCLUDE',
    simpleFilter: {
      scope: 'AUDIENCE_FILTER_SCOPE_WITHIN_SAME_EVENT',
      filterExpression: {
        andGroup: {
          filterExpressions: [{ orGroup: { filterExpressions: [{ eventFilter }] } }],
        },
      },
    },
  };
}

function simpleAudience(displayName, description, eventName) {
  return {
    displayName,
    description,
    membershipDurationDays: 30,
    filterClauses: [includeClause(eventName)],
  };
}

const AUDIENCES_SITE = [
  simpleAudience('WEB — Store Clickers', 'Clicked a Chrome Web Store CTA on the marketing site', 'chrome_store_click'),
  simpleAudience('WEB — Checkout Starters', 'Started the Stripe Pro checkout on the marketing site', 'checkout_click'),
];

const AUDIENCES_EXT = [
  simpleAudience('EXT — Opened', 'Opened the extension overlay on a gallery page', 'extension_open'),
  simpleAudience('EXT — Activated', 'Started at least one slideshow', 'slideshow_start'),
  simpleAudience('EXT — Pro Interested', 'Opened the Pro panel', 'pro_panel_open'),
  simpleAudience('EXT — Checkout Clicked', 'Clicked extension checkout', 'checkout_click'),
  {
    displayName: 'EXT — Engaged',
    description: 'Sessions that navigated at least 10 media',
    membershipDurationDays: 30,
    filterClauses: [includeClause('session_end', [{ name: 'media_viewed', op: 'GREATER_THAN', value: 9 }])],
  },
];

async function ensureProperty(accounts, displayName) {
  const target = displayName.trim();
  let prop = null;
  for (const account of accounts) {
    const list = await api('GET', `properties?filter=${encodeURIComponent('parent:' + account.name)}`);
    prop = (list.properties ?? []).find((p) => (p.displayName || '').trim() === target);
    if (prop) break;
  }
  if (prop) {
    console.log(`= Property "${target}" exists (${prop.name})`);
    return prop;
  }
  if (DRY_RUN) {
    console.log(`+ Property "${target}" MISSING — would create under ${accounts[0].name}`);
    return null;
  }
  prop = await api('POST', 'properties', {
    displayName: target,
    parent: accounts[0].name,
    timeZone: TIME_ZONE,
    currencyCode: CURRENCY,
    industryCategory: 'OTHER',
    propertyType: 'PROPERTY_TYPE_ORDINARY',
  });
  console.log(`+ Property "${target}" created (${prop.name})`);
  return prop;
}

async function ensureWebStream(property) {
  const streams = await api('GET', `${property.name}/dataStreams`);
  const found = (streams.dataStreams ?? []).find(
    (s) => s.type === 'WEB_DATA_STREAM' && s.webStreamData?.defaultUri === SITE_URI,
  );
  if (found) {
    console.log(`= Web stream exists (${found.name}, ${found.webStreamData?.measurementId})`);
    return found;
  }
  if (DRY_RUN) {
    console.log('+ Web stream MISSING — would create');
    return null;
  }
  const created = await api('POST', `${property.name}/dataStreams`, {
    type: 'WEB_DATA_STREAM',
    displayName: 'eromepilot.vercel.app',
    webStreamData: { defaultUri: SITE_URI },
  });
  console.log(`+ Web stream created (${created.webStreamData?.measurementId})`);
  return created;
}

async function ensureExtWebStream(property) {
  // The Admin API cannot create MEASUREMENT_PROTOCOL_DATA_STREAM streams;
  // the standard pattern is a dedicated WEB stream carrying an MP secret.
  const streams = await api('GET', `${property.name}/dataStreams`);
  const found = (streams.dataStreams ?? []).find((s) => s.type === 'WEB_DATA_STREAM');
  if (found) {
    console.log(`= Extension web stream exists (${found.webStreamData?.measurementId})`);
    return found;
  }
  if (DRY_RUN) {
    console.log('+ Extension web stream MISSING — would create');
    return null;
  }
  const created = await api('POST', `${property.name}/dataStreams`, {
    type: 'WEB_DATA_STREAM',
    displayName: 'EroPilot extension telemetry',
    webStreamData: { defaultUri: 'https://eromepilot.vercel.app' },
  });
  console.log(`+ Extension web stream created (${created.webStreamData?.measurementId})`);
  return created;
}

async function ensureUserDataAck(property) {
  if (DRY_RUN || !property) return;
  try {
    await api('POST', `${property.name}:acknowledgeUserDataCollection`, {
      acknowledgement:
        'I acknowledge that I have the necessary privacy disclosures and rights from ' +
        'my end users for the collection and processing of their data, including the ' +
        'association of such data with the visitation information Google Analytics ' +
        'collects from my site and/or app property.',
    });
    console.log('+ User-data-collection attested');
  } catch (err) {
    console.log('! User-data-collection attestation failed:');
    console.log(JSON.stringify(err?.apiError ?? { message: err?.message }, null, 2));
  }
}

async function ensureMpSecret(property, stream) {
  if (!stream) return null;
  const secrets = await api('GET', `${stream.name}/measurementProtocolSecrets`);
  const existing = secrets.measurementProtocolSecrets?.[0];
  if (existing) return existing;
  if (DRY_RUN) {
    console.log('+ MP secret MISSING — would create');
    return null;
  }
  return api('POST', `${stream.name}/measurementProtocolSecrets`, {
    displayName: 'eropilot-extension-telemetry',
  });
}

async function ensureKeyEvents(property, eventNames) {
  for (const eventName of eventNames) {
    await findOrCreate(
      `${property.name}/keyEvents`,
      'keyEvents',
      (k) => k.eventName === eventName,
      `keyEvent ${eventName}`,
      () => api('POST', `${property.name}/keyEvents`, {
        eventName,
        countingMethod: 'ONCE_PER_EVENT',
      }),
    );
  }
}

async function ensureDimensions(property, dims) {
  for (const [parameterName, displayName] of dims) {
    await findOrCreate(
      `${property.name}/customDimensions`,
      'customDimensions',
      (d) => d.parameterName === parameterName,
      `dimension ${parameterName}`,
      () => api('POST', `${property.name}/customDimensions`, {
        parameterName,
        displayName,
        scope: 'EVENT',
        disallowAdsPersonalization: true,
      }),
    );
  }
}

async function ensureAudiences(property, audiences) {
  for (const audience of audiences) {
    await findOrCreate(
      `${property.name}/audiences`,
      'audiences',
      (a) => a.displayName === audience.displayName,
      `audience "${audience.displayName}"`,
      () => api('POST', `${property.name}/audiences`, audience, 'v1alpha'),
      'v1alpha',
    );
  }
}

async function main() {
  console.log('\nGalleryPilot — GA4 provisioning\n===============================\n');

  const sa = await loadServiceAccount();
  const adc = sa ? null : await loadAdc();
  if (!sa && KEY_FILE) die(`Key file unreadable or missing: ${KEY_FILE}`);
  if (sa) console.log(`Auth: service account ${sa.client_email}`);
  else if (adc) console.log('Auth: gcloud application-default credentials');
  else {
    die([
      'No credentials found.',
      '',
      'Option A (recommended):',
      '  1. console.cloud.google.com → IAM & Admin → Service Accounts → Create',
      '  2. Keys → Add key → JSON → download',
      '  3. Share your GA4 account: analytics.google.com → Admin → Account Access Management',
      '     → add the service-account email as EDITOR',
      '  4. Run:',
      '     node scripts/ga4/setup-ga4.mjs --key-file /path/to/key.json',
      '',
      'Option B:',
      '  Install gcloud CLI, run `gcloud auth application-default login`, re-run this script.',
    ].join('\n'));
  }

  TOKEN = sa ? await getServiceAccountToken(sa) : await getAdcToken(adc);

  let accountsRes = await api('GET', 'accounts');
  let accounts = accountsRes.accounts ?? [];

  const ownerIdx = args.indexOf('--owner-email');
  const OWNER_EMAIL = ownerIdx >= 0 ? args[ownerIdx + 1] : 'mathis.zerbib@gmail.com';

  if (!accounts.length && !DRY_RUN) {
    console.log('No GA4 account visible — creating a dedicated account...');
    const account = await api('POST', 'accounts', {
      displayName: 'GalleryPilot',
      regionCode: process.env.GA_REGION || 'FR',
    }, 'v1alpha');
    await api('POST', `${account.name}/userLinks`, {
      emailAddress: OWNER_EMAIL,
      roles: ['predefinedRoles/admin'],
    }, 'v1alpha');
    console.log(`+ Account "${account.displayName}" created (${account.name})`);
    console.log(`+ ${OWNER_EMAIL} added as ADMIN`);
    accountsRes = await api('GET', 'accounts');
    accounts = accountsRes.accounts ?? [];
  }

  if (!accounts.length) die('No GA4 account visible for these credentials.');
  console.log(`GA4 account: ${accounts[0].displayName} (${accounts[0].name})\n`);

  console.log('Website surface:');
  const siteProp = await ensureProperty(accounts, 'GP — Website');
  const webStream = siteProp ? await ensureWebStream(siteProp) : null;
  if (siteProp && !DRY_RUN) {
    await ensureKeyEvents(siteProp, SITE_KEY_EVENTS);
    await ensureDimensions(siteProp, SITE_DIMENSIONS);
  }
  await ensureAudiences(siteProp, AUDIENCES_SITE);

  console.log('\nExtension surface:');
  const extProp = await ensureProperty(accounts, 'GP — Extension');
  const extStream = extProp ? await ensureExtWebStream(extProp) : null;
  await ensureUserDataAck(extProp);
  const mpSecret = await ensureMpSecret(extProp, extStream);
  const extMeasurementId = extStream?.webStreamData?.measurementId ?? null;
  if (extProp && !DRY_RUN) {
    await ensureKeyEvents(extProp, EXT_KEY_EVENTS);
    await ensureDimensions(extProp, EXT_DIMENSIONS);
  }
  await ensureAudiences(extProp, AUDIENCES_EXT);

  if (DRY_RUN) {
    console.log('\nDry-run complete. Re-run without --dry-run to apply.\n');
    return;
  }

  console.log('\nWriting environment files:');
  if (webStream?.webStreamData?.measurementId) {
    upsertEnv(path.join(SITE_ROOT, '.env.local'), {
      NEXT_PUBLIC_GA_MEASUREMENT_ID: webStream.webStreamData.measurementId,
    });
  }
  if (extMeasurementId || mpSecret?.secretValue) {
    upsertEnv(path.join(EXT_ROOT, '.env'), {
      ...(extMeasurementId ? { ANALYTICS_GA4_MEASUREMENT_ID: extMeasurementId } : {}),
      ...(mpSecret?.secretValue ? { ANALYTICS_GA4_API_SECRET: mpSecret.secretValue } : {}),
    });
  }

  console.log(`
✓ Done.

  Site  : NEXT_PUBLIC_GA_MEASUREMENT_ID=${webStream?.webStreamData?.measurementId ?? '(see .env.local)'}
  Ext   : ANALYTICS_GA4_MEASUREMENT_ID=${extMeasurementId ?? '(see extension .env)'}
          ANALYTICS_GA4_API_SECRET=${mpSecret?.secretValue ? '(written to .env)' : '(missing)'}

Next steps:
  1. cd extension_hero && node scripts/build.mjs   (rebuild with telemetry enabled)
  2. Redeploy the landing page (Vercel picks up .env.local via dashboard env vars —
     also copy NEXT_PUBLIC_GA_MEASUREMENT_ID into Vercel project settings).
  3. DebugView (both properties) to verify events arrive.
`);
}

main().catch((err) => {
  if (err?.apiError) {
    console.error(`\n✗ Google API error:\n${JSON.stringify(err.apiError, null, 2)}\n`);
  } else {
    console.error(`\n✗ ${err?.message ?? err}\n`);
  }
  process.exit(1);
});
