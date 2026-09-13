export interface ThunkError {
  message: string
  notFound?: boolean
}

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'
