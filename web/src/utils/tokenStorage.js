import { isTokenExpired } from './jwt'

// Where the login token is kept.
//   "Keep me logged in" ticked   → localStorage   (survives closing the browser)
//   not ticked                   → sessionStorage (cleared when the tab closes)
export const TOKEN_KEY = 'little-nest.token'

function safely(action, fallback = null) {
  try {
    return action()
  } catch {
    return fallback
  }
}

export const tokenStorage = {
  get() {
    const token = safely(() => localStorage.getItem(TOKEN_KEY) ?? sessionStorage.getItem(TOKEN_KEY))
    if (token && isTokenExpired(token)) {
      tokenStorage.clear() // expired tokens are useless, remove them right away
      return null
    }
    return token
  },

  set(token, { remember = true } = {}) {
    tokenStorage.clear()
    safely(() => (remember ? localStorage : sessionStorage).setItem(TOKEN_KEY, token))
  },

  clear() {
    safely(() => {
      localStorage.removeItem(TOKEN_KEY)
      sessionStorage.removeItem(TOKEN_KEY)
    })
  },
}
