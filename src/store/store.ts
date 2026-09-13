import { configureStore } from '@reduxjs/toolkit'

import campersReducer from '@/features/campers/campersSlice'
import favoritesReducer from '@/features/favorites/favoritesSlice'
import filtersReducer from '@/features/filters/filtersSlice'
import { favoritesMiddleware } from '@/features/favorites/favoritesMiddleware'

export const store = configureStore({
  reducer: {
    campers: campersReducer,
    filters: filtersReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(favoritesMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
