import type { Locale } from '../types'
import type { Dictionary } from '../types'

import en from './en'
import fr from './fr'
import de from './de'
import es from './es'
import pt from './pt'
import ja from './ja'
import ko from './ko'
import ru from './ru'
import zh from './zh'

const dictionaries: Record<Locale, Dictionary> = { en, fr, de, es, pt, ja, ko, ru, zh }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] || dictionaries.en
}
