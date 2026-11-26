import { Leaf, Recycle, ShieldCheck } from 'lucide-react'
import { Button, Container } from '@/components/ui'
import { pexels } from '@/utils/image'

const steps = [
  { title: 'We start with the material', text: 'Organic cotton, merino, beech wood and food-grade silicone. If it touches skin or goes in a mouth, it has to be clean and simple.' },
  { title: 'We test it the boring way', text: 'Lab safety tests first (EN71, BIS, BPA-free), then washing it 30 times to see what really happens.' },
  { title: 'Parents use it for a month', text: 'Real families try every product at home. If it is fiddly at 3 a.m., it does not make it to the shop.' },
]

const values = [
  { icon: Leaf, title: 'Organic where it matters', text: 'Everything that touches skin is certified organic or naturally finished.' },
  { icon: ShieldCheck, title: 'Safe by default', text: 'No small parts for under-threes, no BPA, no harsh dyes. Ever.' },
  { icon: Recycle, title: 'Made to be handed down', text: 'Durable enough for a younger sibling, a cousin or a friend.' },
]

export default function AboutPage() {
  return (
    <>
      <Container className="grid items-center gap-12 py-14 lg:grid-cols-2 lg:py-20">
        <div>
          <h1 className="text-5xl leading-[1.05] sm:text-6xl">We choose every product as if it were for our own child.</h1>
          <p className="mt-6 max-w-lg text-lg text-muted">
            Little Nest started in 2021 when two new parents in Kochi could not find baby clothes that were soft, safe and fairly priced in one place.
            Today we carry a small, carefully tested range for the first five years.
          </p>
        </div>
        <img
          src={pexels(7055880, 1200)}
          alt="A parent hanging freshly washed baby clothes"
          className="aspect-[4/3] w-full rounded-[44%_56%_48%_52%/52%_46%_54%_48%] object-cover"
        />
      </Container>

      <section className="bg-surface py-20">
        <Container>
          <h2 className="max-w-xl text-4xl">How a product gets into the nest</h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="border-t border-dashed border-bark-300 pt-6">
                <span className="font-serif text-5xl text-sage-500" style={{ fontVariationSettings: '"SOFT" 100' }}>
                  {index + 1}
                </span>
                <h3 className="mt-3 text-2xl">{step.title}</h3>
                <p className="mt-2 text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <Container className="py-20">
        <ul className="grid gap-10 md:grid-cols-3">
          {values.map(({ icon: Icon, title, text }) => (
            <li key={title}>
              <Icon aria-hidden className="size-7 text-sage-600" />
              <h3 className="mt-4 font-sans text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-muted">{text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-20 flex flex-col items-start gap-6 rounded-pebble bg-sage-100 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-12">
          <div>
            <h2 className="text-3xl">Not sure where to start?</h2>
            <p className="mt-2 text-bark-800">Pick your child's age and we'll show you what fits right now.</p>
          </div>
          <Button size="lg" href="#age">
            Shop by age
          </Button>
        </div>
      </Container>
    </>
  )
}
