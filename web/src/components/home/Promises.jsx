import { Leaf, RotateCcw, ShieldCheck } from 'lucide-react'
import { Container } from '@/components/ui'

const promises = [
  {
    icon: Leaf,
    title: 'Gentle on new skin',
    text: 'Clothing and bedding in certified organic cotton, free from harsh dyes and finishes.',
  },
  {
    icon: ShieldCheck,
    title: 'Safety tested',
    text: 'Every toy and feeding product meets EN71 and BIS safety standards before it reaches you.',
  },
  {
    icon: RotateCcw,
    title: 'Easy 30-day returns',
    text: 'Wrong size or not quite right? Send it back within 30 days, unworn and unwashed.',
  },
]

export default function Promises() {
  return (
    <section aria-label="Our promises">
      <Container>
        <ul className="grid gap-10 border-y border-dashed border-border-strong py-12 md:grid-cols-3">
          {promises.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary-soft text-sage-700">
                <Icon aria-hidden className="size-5.5" />
              </span>
              <div>
                <h3 className="font-sans text-base font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-muted">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
