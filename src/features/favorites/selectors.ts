import type { RootState } from '@/store/store'

export const selectFavorites = (state: RootState) => state.favorites
export const selectIsFavorite = (id: string) => (state: RootState) =>
  state.favorites.includes(id)
