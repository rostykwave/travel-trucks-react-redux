import type { Middleware } from '@reduxjs/toolkit'

import { toggleFavorite } from '@/features/favorites/favoritesSlice'
import { saveFavorites } from '@/features/favorites/storage'

interface FavoritesState {
  favorites: string[]
}

/**
 * Thin persistence layer — writes to localStorage after every change, nothing
 * more. Typed against a minimal local shape instead of RootState to avoid a
 * circular import with store.ts (which imports this middleware).
 */
export const favoritesMiddleware: Middleware<object, FavoritesState> =
  (store) => (next) => (action) => {
    const result = next(action)
    if (toggleFavorite.match(action)) {
      saveFavorites(store.getState().favorites)
    }
    return result
  }
