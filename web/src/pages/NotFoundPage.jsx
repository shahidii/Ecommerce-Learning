import { Compass } from 'lucide-react'
import EmptyState from '@/components/feedback/EmptyState'
import { Button, Container } from '@/components/ui'
import { usePageTitle } from '@/hooks/usePageTitle'
import { ROUTES } from '@/routes/paths'

export default function NotFoundPage({
  title = 'We couldn’t find that page',
  description = 'The link may be old, or the page has moved. Let’s get you back to the nest.',
}) {
  usePageTitle('Page not found')

  return (
    <Container className="py-16">
      <h1 className="sr-only">Page not found</h1>
      <EmptyState
        icon={Compass}
        title={title}
        description={description}
        action={
          <div className="flex flex-wrap justify-center gap-3">
            <Button to={ROUTES.HOME}>Go to Home</Button>
            <Button to={ROUTES.SHOP} variant="outline">
              Browse the shop
            </Button>
          </div>
        }
      />
    </Container>
  )
}
