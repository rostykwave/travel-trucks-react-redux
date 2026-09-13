import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getCamperById, getCampers } from '@/services/campersApi'
import type { CampersQuery } from '@/services/campersApi'
import { ApiError, CamperNotFoundError } from '@/services/errors'
import type { RequestStatus, ThunkError } from '@/features/campers/types'
import type { Camper } from '@/types/camper'

interface CampersState {
  items: Camper[]
  total: number
  page: number
  status: RequestStatus
  error: string | null
  detail: {
    item: Camper | null
    status: RequestStatus
    error: ThunkError | null
  }
}

const initialState: CampersState = {
  items: [],
  total: 0,
  page: 0,
  status: 'idle',
  error: null,
  detail: {
    item: null,
    status: 'idle',
    error: null,
  },
}

export const fetchCampers = createAsyncThunk<
  { total: number; items: Camper[]; page: number },
  CampersQuery,
  { rejectValue: string }
>('campers/fetchCampers', async (query, { signal, rejectWithValue }) => {
  try {
    const response = await getCampers(query, { signal })
    return { ...response, page: query.page ?? 1 }
  } catch (error) {
    if (error instanceof ApiError) return rejectWithValue(error.message)
    throw error
  }
})

export const fetchCamperById = createAsyncThunk<
  Camper,
  string,
  { rejectValue: ThunkError }
>('campers/fetchCamperById', async (id, { signal, rejectWithValue }) => {
  try {
    return await getCamperById(id, { signal })
  } catch (error) {
    if (error instanceof CamperNotFoundError) {
      return rejectWithValue({ message: error.message, notFound: true })
    }
    if (error instanceof ApiError) {
      return rejectWithValue({ message: error.message })
    }
    throw error
  }
})

const campersSlice = createSlice({
  name: 'campers',
  initialState,
  reducers: {
    /** Clears the accumulated list — dispatched before a filtered request (commit 28). */
    resetCampers(state) {
      state.items = []
      state.total = 0
      state.page = 0
      state.status = 'idle'
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.total = action.payload.total
        state.page = action.payload.page
        state.items =
          action.payload.page > 1
            ? [...state.items, ...action.payload.items]
            : action.payload.items
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        if (action.meta.aborted) return
        state.status = 'failed'
        state.error = action.payload ?? action.error.message ?? 'Unknown error'
      })
      .addCase(fetchCamperById.pending, (state) => {
        state.detail.status = 'loading'
        state.detail.error = null
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.detail.status = 'succeeded'
        state.detail.item = action.payload
      })
      .addCase(fetchCamperById.rejected, (state, action) => {
        if (action.meta.aborted) return
        state.detail.status = 'failed'
        state.detail.error = action.payload ?? {
          message: action.error.message ?? 'Unknown error',
        }
      })
  },
})

export const { resetCampers } = campersSlice.actions
export default campersSlice.reducer
