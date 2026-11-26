import { Container } from '@/components/ui'

/** Split screen for Login / Signup: form on the left, a calm photo on the right. */
export default function AuthLayout({ image, imageAlt, quote, children }) {
  return (
    <Container className="py-10 lg:py-16">
      <div className="grid overflow-hidden rounded-pebble border border-border bg-white lg:grid-cols-2">
        <div className="px-6 py-10 sm:px-12 sm:py-14">{children}</div>
        <figure className="relative hidden lg:block">
          <img src={image} alt={imageAlt} className="absolute inset-0 size-full object-cover" />
          {quote && (
            <figcaption className="absolute right-6 bottom-6 left-6 rounded-3xl bg-white/92 p-6 shadow-soft backdrop-blur">
              <p className="font-serif text-xl leading-snug" style={{ fontVariationSettings: '"SOFT" 100' }}>
                “{quote.text}”
              </p>
              <p className="mt-3 text-sm text-muted">{quote.author}</p>
            </figcaption>
          )}
        </figure>
      </div>
    </Container>
  )
}
