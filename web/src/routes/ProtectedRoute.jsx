import { Navigate, Outlet, useLocation } from 'react-router'
import PageLoader from '@/components/feedback/PageLoader'
import { useAuth } from '@/hooks/useAuth'
import { ROUTES } from './paths'

/** Pages inside this route need a logged-in user. Guests go to /login and come back afterwards. */
export default function ProtectedRoute() {
  const { status } = useAuth()
  const location = useLocation()

  if (status === 'checking') return <PageLoader label="Checking your account…" />
  if (status === 'guest') return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />

  return <Outlet />
}
