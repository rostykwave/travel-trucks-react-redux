/**
 * Formats a raw API price (e.g. 8000) as "€8000,00" — literal per ADR-005,
 * no thousands separator.
 */
export function formatPrice(price: number): string {
  return `€${price.toFixed(2).replace('.', ',')}`
}
