const FAVORITES_KEY = 'traveltrucks:favorites'

/** Reads/writes are wrapped — private browsing and quota errors shouldn't crash the app. */
export function loadFavorites(): string[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed)
      ? parsed.filter((id) => typeof id === 'string')
      : []
  } catch {
    return []
  }
}

export function saveFavorites(ids: string[]): void {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids))
  } catch {
    // Storage unavailable (private mode, quota) — favorites just won't persist.
  }
}
