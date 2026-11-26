import { TriangleAlert } from 'lucide-react'
import { isRouteErrorResponse, useRouteError } from 'react-router'
import EmptyState from '@/components/feedback/EmptyState'
import { Button, Container } from '@/components/ui'
import { ERROR_MESSAGES } from '@/api'
import { ROUTES } from '@/routes/paths'
import NotFoundPage from './NotFoundPage'

/** React Router shows this when a page throws while rendering. */
export default function RouteErrorPage() {
  const error = useRouteError()
  if (isRouteErrorResponse(error) && error.status === 404) return <NotFoundPage />

  // Show the real error to developers only
  if (import.meta.env.DEV) console.error(error)

  return (
    <Container className="py-16">
      <h1 className="sr-only">Something went wrong</h1>
      <EmptyState
        icon={TriangleAlert}
        title="This page stopped working"
        description={ERROR_MESSAGES.SERVER}
        action={
          <div className="flex flex-wrap justify-center gap-3">
            <Button onClick={() => window.location.reload()}>Reload the page</Button>
            <Button to={ROUTES.HOME} variant="outline">
              Go to Home
            </Button>
          </div>
        }
      />
    </Container>
  )
}
