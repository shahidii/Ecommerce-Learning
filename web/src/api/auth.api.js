import { apiClient } from './client'

// Each function returns only the part of the response the UI needs.
export const authApi = {
  /** POST /auth/signup → { user, token } */
  signup: async ({ name, email, password }) => {
    const body = await apiClient.post('/auth/signup', { name, email, password })
    return body.data
  },

  /** POST /auth/login → { user, token } */
  login: async ({ email, password }) => {
    const body = await apiClient.post('/auth/login', { email, password })
    return body.data
  },

  /** GET /auth/me (needs the token) → user */
  getMe: async ({ signal } = {}) => {
    const body = await apiClient.get('/auth/me', { signal })
    return body.data.user
  },
}
