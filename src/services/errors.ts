interface ApiErrorOptions {
  status?: number
  cause?: unknown
}

/**
 * Transport-level failure, normalised so that nothing outside src/services has
 * to know the app talks to the network through Axios. The original error is
 * kept in `cause` so stack traces survive the translation.
 */
export class ApiError extends Error {
  readonly status: number | undefined

  constructor(message: string, { status, cause }: ApiErrorOptions = {}) {
    super(message, { cause })
    this.name = 'ApiError'
    this.status = status
  }
}

/** The request never got a response: offline, DNS failure, or timed out. */
export class NetworkError extends ApiError {
  constructor(message: string, cause?: unknown) {
    super(message, { cause })
    this.name = 'NetworkError'
  }
}

export class CamperNotFoundError extends ApiError {
  constructor(id: string, cause?: unknown) {
    super(`Camper "${id}" was not found`, { status: 404, cause })
    this.name = 'CamperNotFoundError'
  }
}
