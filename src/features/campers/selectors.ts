import type { RootState } from '@/store/store'

export const selectCampers = (state: RootState) => state.campers.items
export const selectCampersTotal = (state: RootState) => state.campers.total
export const selectCampersStatus = (state: RootState) => state.campers.status
export const selectCampersError = (state: RootState) => state.campers.error
export const selectCampersPage = (state: RootState) => state.campers.page

/** Derived, not stored — see CLAUDE.md §10 on duplicating derived state. */
export const selectHasMoreCampers = (state: RootState) =>
  state.campers.items.length < state.campers.total

export const selectCamperDetail = (state: RootState) =>
  state.campers.detail.item
export const selectCamperDetailStatus = (state: RootState) =>
  state.campers.detail.status
export const selectCamperDetailError = (state: RootState) =>
  state.campers.detail.error
