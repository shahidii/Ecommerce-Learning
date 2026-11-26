import axios from 'axios'
import { env } from '@/config/env'
import { tokenStorage } from '@/utils/tokenStorage'
import { toApiError } from './ApiError'

// Codes the API sends when the saved token is no good any more (see api/middleware/auth.middleware.js)
const SESSION_ERROR_CODES = ['TOKEN_EXPIRED', 'INVALID_TOKEN', 'USER_NOT_FOUND']

// The AuthProvider registers a function here, so the client can log the user out
// without importing React code.
let handleUnauthorized = null
export function setUnauthorizedHandler(handler) {
  handleUnauthorized = handler
}

/** The single axios instance the whole app uses. */
export const apiClient = axios.create({
  baseURL: env.API_URL,
  timeout: 60_000, // the free Render server can take ~50 s to wake up
  headers: { Accept: 'application/json' },
})

// ── Request interceptor: runs before EVERY request ──────────────────────────
apiClient.interceptors.request.use((config) => {
  const token = tokenStorage.get()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ── Response interceptor: runs after EVERY response ─────────────────────────
apiClient.interceptors.response.use(
  // Success: hand back the JSON body { success, message, data, meta } instead of the axios wrapper
  (response) => response.data,

  // Failure: convert to ApiError, handle expired sessions, log in development
  (error) => {
    const apiError = toApiError(error)

    const sentToken = Boolean(error.config?.headers?.Authorization)
    if (apiError.isUnauthorized && sentToken && SESSION_ERROR_CODES.includes(apiError.code)) {
      tokenStorage.clear()
      handleUnauthorized?.(apiError)
    }

    if (env.IS_DEV && !apiError.isCanceled) {
      const { method = '', url = '' } = error.config ?? {}
      console.warn(`[API] ${method.toUpperCase()} ${url} failed →`, apiError.status || apiError.code, apiError.message, error.response?.data ?? '')
    }

    return Promise.reject(apiError)
  },
)
