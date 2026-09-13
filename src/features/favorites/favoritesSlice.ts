import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { loadFavorites } from '@/features/favorites/storage'

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: loadFavorites(),
  reducers: {
    toggleFavorite(state, action: PayloadAction<string>) {
      const index = state.indexOf(action.payload)
      if (index === -1) state.push(action.payload)
      else state.splice(index, 1)
    },
  },
})

export const { toggleFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer
