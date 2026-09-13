/**
 * The API stores locations as "Country, City" ("Ukraine, Kyiv") while the mockup
 * shows them city first ("Kyiv, Ukraine"). Anything that isn't a two-part value
 * is passed through untouched.
 */
export function formatLocation(location: string): string {
  const parts = location.split(',').map((part) => part.trim())
  return parts.length === 2 ? `${parts[1]}, ${parts[0]}` : location
}

/**
 * Inverse of `formatLocation`, for the location filter: the field takes what the
 * app displays everywhere else ("Kyiv, Ukraine", the placeholder included) while
 * the API substring-matches against its own "Country, City" order and answers a
 * literal "Kyiv, Ukraine" with 404. A single token ("Kyiv", "Ukraine") already
 * matches either way and is left alone.
 */
export function toApiLocation(location: string): string {
  const parts = location
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)

  return parts.length === 2 ? `${parts[1]}, ${parts[0]}` : location.trim()
}
