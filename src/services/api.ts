import axios from 'axios'

import { ApiError, NetworkError } from '@/services/errors'

const DEFAULT_BASE_URL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io'
const REQUEST_TIMEOUT_MS = 10_000

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? DEFAULT_BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
})

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    // An aborted request is not a failure — let callers recognise it as such.
    if (axios.isCancel(error)) throw error

    if (axios.isAxiosError(error)) {
      if (!error.response) throw new NetworkError(error.message, error)
      throw new ApiError(error.message, {
        status: error.response.status,
        cause: error,
      })
    }

    throw error
  },
)
