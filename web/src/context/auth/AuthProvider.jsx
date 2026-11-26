import { useCallback, useEffect, useMemo, useState } from 'react'
import { authApi, setUnauthorizedHandler } from '@/api'
import { TOKEN_KEY, tokenStorage } from '@/utils/tokenStorage'
import { AuthContext } from './AuthContext'

/**
 * Who is logged in, for the whole app.
 *
 * status:
 *   'checking'       → we have a token and are asking GET /auth/me who it belongs to
 *   'authenticated'  → user is logged in
 *   'guest'          → nobody is logged in
 */
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [status, setStatus] = useState(() => (tokenStorage.get() ? 'checking' : 'guest'))
  const [sessionMessage, setSessionMessage] = useState(null)

  // 1. App start: if a token is saved, load the user it belongs to
  useEffect(() => {
    if (!tokenStorage.get()) return

    const controller = new AbortController()
    authApi
      .getMe({ signal: controller.signal })
      .then((me) => {
        setUser(me)
        setStatus('authenticated')
      })
      .catch((error) => {
        if (error.isCanceled) return
        // 401 → the token is bad (the API client already removed it).
        // Network or server error → keep the token; we try again on the next visit.
        setUser(null)
        setStatus('guest')
      })

    return () => controller.abort()
  }, [])

  // 2. Any API call answered "token expired / invalid" → log out everywhere
  useEffect(() => {
    setUnauthorizedHandler(() => {
      setUser(null)
      setStatus('guest')
      setSessionMessage('Your session has expired. Please log in again.')
    })
    return () => setUnauthorizedHandler(null)
  }, [])

  // 3. Logged out in another tab → log out here too
  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === TOKEN_KEY && !event.newValue) {
        setUser(null)
        setStatus('guest')
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const startSession = useCallback(({ user: nextUser, token }, remember) => {
    tokenStorage.set(token, { remember })
    setUser(nextUser)
    setStatus('authenticated')
    setSessionMessage(null)
    return nextUser
  }, [])

  const login = useCallback(async ({ email, password, remember = true }) => startSession(await authApi.login({ email, password }), remember), [startSession])

  const signup = useCallback(async ({ name, email, password }) => startSession(await authApi.signup({ name, email, password }), true), [startSession])

  const logout = useCallback(() => {
    tokenStorage.clear()
    setUser(null)
    setStatus('guest')
  }, [])

  const value = useMemo(
    () => ({
      user,
      status,
      isAuthenticated: status === 'authenticated',
      isCheckingAuth: status === 'checking',
      sessionMessage,
      login,
      signup,
      logout,
    }),
    [user, status, sessionMessage, login, signup, logout],
  )

  return <AuthContext value={value}>{children}</AuthContext>
}
