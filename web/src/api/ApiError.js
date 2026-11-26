import axios from 'axios'

// Messages the user sees. Keep them in one place so every page speaks the same way.
export const ERROR_MESSAGES = {
  SERVER: 'Something went wrong from our side. Please try again in a moment.',
  NETWORK: "We couldn't reach Little Nest. Check your internet connection and try again.",
  TIMEOUT: 'The server is taking too long to respond. Please try again.',
  UNKNOWN: 'Something went wrong. Please try again.',
}

/**
 * The ONE error type every API call throws.
 * Pages never have to look inside axios errors: they read `error.message`, `error.status`,
 * `error.code` and helpers like `error.isNotFound`.
 */
export class ApiError extends Error {
  constructor({ message, status = 0, code = 'UNKNOWN_ERROR', field = null, details = [] }) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
    this.field = field
    this.details = details
  }

  get isCanceled() {
    return this.code === 'CANCELED'
  }
  get isNetworkError() {
    return this.code === 'NETWORK_ERROR' || this.code === 'TIMEOUT'
  }
  get isServerError() {
    return this.status >= 500
  }
  get isUnauthorized() {
    return this.status === 401
  }
  get isNotFound() {
    return this.status === 404
  }
  get isValidationError() {
    return this.status === 400 || this.status === 422
  }

  /** { email: 'Please enter a valid email address', … } for showing errors under form fields. */
  get fieldErrors() {
    const errors = {}
    for (const item of this.details) {
      if (item.field && !errors[item.field]) errors[item.field] = item.message
    }
    if (this.field && !errors[this.field]) errors[this.field] = this.message
    return errors
  }
}

/** Turns anything axios throws into an ApiError. */
export function toApiError(error) {
  if (error instanceof ApiError) return error

  if (axios.isCancel(error)) {
    return new ApiError({ message: 'Request was canceled', code: 'CANCELED' })
  }

  // 1. The request was sent but the server took too long
  if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
    return new ApiError({ message: ERROR_MESSAGES.TIMEOUT, code: 'TIMEOUT' })
  }

  // 2. No response at all: offline, wrong URL, CORS blocked, server down
  if (!error.response) {
    return new ApiError({ message: ERROR_MESSAGES.NETWORK, code: 'NETWORK_ERROR' })
  }

  const { status, data } = error.response
  const body = data?.error ?? {}

  // 3. Server errors (500, 502, 503…): never show technical details to users
  if (status >= 500) {
    return new ApiError({ message: ERROR_MESSAGES.SERVER, status, code: body.code ?? 'SERVER_ERROR' })
  }

  // 4. Client errors (400, 401, 404, 409…): the API's message is written for users, show it
  return new ApiError({
    message: body.message ?? ERROR_MESSAGES.UNKNOWN,
    status,
    code: body.code,
    field: body.field ?? null,
    details: body.details ?? [],
  })
}
