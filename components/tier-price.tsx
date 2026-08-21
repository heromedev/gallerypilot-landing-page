interface TierPriceProps {
  value: string
}

/**
 * Renders a tier price with a clearly separated decimal mark.
 * At display sizes a tight "7.99" can scan as "799"; explicit spacing
 * around the decimal mark keeps the price readable in every locale format
 * ($7.99 / 7,99 $ / US$ 7,99). Prices without decimals render unchanged.
 */
export function TierPrice({ value }: TierPriceProps) {
  const match = value.match(/^(.*?)(\d+)([.,])(\d+)\s*(.*)$/)
  if (!match) return <>{value}</>
  const [, prefix, whole, mark, decimals, suffix] = match

  return (
    <>
      {prefix}
      {whole}
      <span className="mx-[0.09em] inline-block" aria-hidden="true">{mark}</span>
      {decimals}
      {suffix ? <>&nbsp;{suffix}</> : null}
    </>
  )
}
