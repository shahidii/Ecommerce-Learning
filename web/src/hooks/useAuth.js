import { useContext } from 'react'
import { AuthContext } from '@/context/auth/AuthContext'

/** const { … } = useAuth()   (must be used inside <AuthProvider>) */
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside <AuthProvider>')
  return context
}
