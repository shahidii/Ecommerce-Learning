import { Navigate, Outlet, useLocation } from 'react-router'
import PageLoader from '@/components/feedback/PageLoader'
import { useAuth } from '@/hooks/useAuth'
import { ROUTES } from './paths'

/**
 * Login and Signup are only for guests. As soon as the user is logged in (also right after
 * submitting the form) we send them back to the page they came from, or Home.
 */
export default function GuestRoute() {
  const { status } = useAuth()
  const location = useLocation()

  if (status === 'checking') return <PageLoader label="Checking your account…" />
  if (status === 'authenticated') {
    const from = location.state?.from
    const target = from ? `${from.pathname}${from.search ?? ''}` : ROUTES.HOME
    return <Navigate to={target} replace />
  }

  return <Outlet />
}
