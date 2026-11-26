import { createContext } from 'react'

// The context object only. The state lives in AuthProvider.jsx, and components read it with useAuth().
export const AuthContext = createContext(null)
