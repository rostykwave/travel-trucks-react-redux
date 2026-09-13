import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import type { CampersFilters } from '@/features/filters/urlFilters'

/**
 * Global store for the active filter set, as the assignment requires ("глобальний
 * стан для зберігання списку транспортних засобів, стану фільтрів").
 *
 * The URL stays the entry point — it is the address, not application state — and
 * the catalog page pushes each parsed filter set in here before firing a request.
 * Everything that needs the *active* filters afterwards (Load More, retry) reads
 * them from the store rather than re-parsing the URL. See ADR-011.
 */
const initialState: CampersFilters = {}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters: (_state, action: PayloadAction<CampersFilters>) =>
      action.payload,
  },
})

export const { setFilters } = filtersSlice.actions
export default filtersSlice.reducer
