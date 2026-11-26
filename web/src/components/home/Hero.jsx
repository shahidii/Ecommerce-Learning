import { Button, Container, Rating } from '@/components/ui'
import { ROUTES } from '@/routes/paths'
import { pexels } from '@/utils/image'

export default function Hero() {
  return (
    <section className="overflow-hidden">
      <Container className="grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_1fr] lg:py-20">
        <div className="max-w-xl">
          <h1 className="text-[2.75rem] leading-[1.05] sm:text-6xl lg:text-[4.25rem]">Everything for the first five years, chosen gently.</h1>
          <p className="mt-6 max-w-md text-lg text-muted">
            Organic clothing, safe feeding gear, cosy sleep essentials and toys that grow with your child, from newborn to preschool.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button size="lg" to="/#age">
              Shop by age
            </Button>
            <Button size="lg" variant="outline" to={ROUTES.CATEGORIES}>
              Browse categories
            </Button>
          </div>
          <div className="mt-10 flex items-center gap-3 text-sm text-muted">
            <Rating value={4.8} size="md" />
            <span>from 12,400 parents</span>
          </div>
        </div>

        {/* Photo in a soft "pebble" shape, wrapped by a stitched loop: our nest */}
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div aria-hidden className="stitched absolute -inset-4 rounded-[46%_54%_42%_58%/52%_44%_56%_48%] sm:-inset-6" />
          <img
            src={pexels(40133587, 1200)}
            alt="A mother holding her baby's hands as the baby takes first steps"
            className="relative aspect-[5/4] w-full rounded-[46%_54%_42%_58%/52%_44%_56%_48%] object-cover"
          />
        </div>
      </Container>
    </section>
  )
}
