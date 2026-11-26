import { Baby, Heart, LogOut, MapPin, Package, Plus, UserRound } from 'lucide-react'
import { Badge, Button, Container, Input } from '@/components/ui'
import { addresses, childProfiles, user } from '@/data/user'
import { cn } from '@/utils/cn'

const sections = [
  { id: 'details', label: 'Account details', icon: UserRound },
  { id: 'little-ones', label: 'My little ones', icon: Baby },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'orders', label: 'Orders', icon: Package },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
]

const memberSince = new Date(user.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })

function Panel({ id, title, action, children }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="rounded-pebble border border-border bg-white p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id={`${id}-title`} className="text-2xl">
          {title}
        </h2>
        {action}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  )
}

export default function ProfilePage() {
  return (
    <Container className="py-10">
      {/* Profile header */}
      <div className="flex flex-wrap items-center gap-5 rounded-pebble bg-surface p-6 sm:p-8">
        <img src={user.avatar} alt="" className="size-20 rounded-full ring-4 ring-white" />
        <div className="flex-1">
          <h1 className="text-3xl sm:text-4xl">Hello, {user.name.split(' ')[0]}</h1>
          <p className="mt-1 text-muted">{user.email}</p>
          <p className="text-sm text-subtle">Member since {memberSince}</p>
        </div>
        <Button variant="outline">
          <LogOut aria-hidden className="size-4.5" />
          Log out
        </Button>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[15rem_1fr]">
        <nav aria-label="Account sections">
          <ul className="flex gap-2 overflow-x-auto lg:flex-col">
            {sections.map(({ id, label, icon: Icon }, index) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={index === 0 ? 'true' : undefined}
                  className={cn(
                    'flex items-center gap-3 rounded-full px-4 py-2.5 text-[0.95rem] font-medium whitespace-nowrap',
                    index === 0 ? 'bg-primary-soft text-sage-800' : 'text-bark-800 hover:bg-surface',
                  )}
                >
                  <Icon aria-hidden className="size-4.5" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-8">
          <Panel id="details" title="Account details">
            <form className="grid gap-5 sm:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
              <Input label="Full name" defaultValue={user.name} autoComplete="name" />
              <Input label="Email" type="email" defaultValue={user.email} autoComplete="email" />
              <Input label="Phone" type="tel" defaultValue="+91 98765 43210" autoComplete="tel" />
              <Input label="Birthday (optional)" type="date" />
              <div className="sm:col-span-2">
                <Button type="submit">Save changes</Button>
              </div>
            </form>
          </Panel>

          <Panel
            id="little-ones"
            title="My little ones"
            action={
              <Button variant="secondary" size="sm">
                <Plus aria-hidden className="size-4" />
                Add a child
              </Button>
            }
          >
            <p className="text-sm text-muted">We use your child's age to suggest the right stage and sizes.</p>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {childProfiles.map((child) => (
                <li key={child.id} className="flex items-center gap-4 rounded-3xl bg-surface-soft p-4">
                  <span className="flex size-12 items-center justify-center rounded-full bg-blush-100 font-serif text-xl text-blush-700">{child.name[0]}</span>
                  <div>
                    <p className="font-semibold">{child.name}</p>
                    <p className="text-sm text-muted">
                      {child.ageLabel}, shopping the {child.ageGroup} stage
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel
            id="addresses"
            title="Addresses"
            action={
              <Button variant="secondary" size="sm">
                <Plus aria-hidden className="size-4" />
                Add address
              </Button>
            }
          >
            <ul className="grid gap-4 md:grid-cols-2">
              {addresses.map((address) => (
                <li key={address.id} className={cn('rounded-3xl border p-5 text-sm', address.isDefault ? 'border-sage-300 bg-sage-50' : 'border-border')}>
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{address.label}</p>
                    {address.isDefault && <Badge variant="sage">Default</Badge>}
                  </div>
                  <address className="mt-3 text-muted not-italic">
                    {address.name}
                    <br />
                    {address.line1}, {address.line2}
                    <br />
                    {address.city}, {address.state} {address.pincode}
                    <br />
                    {address.phone}
                  </address>
                  <div className="mt-4 flex gap-4 font-semibold">
                    <button type="button" className="text-sage-700 hover:underline">
                      Edit
                    </button>
                    <button type="button" className="text-muted hover:text-blush-700 hover:underline">
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel id="orders" title="Orders">
            <div className="stitched flex flex-col items-center rounded-3xl px-6 py-12 text-center">
              <Package aria-hidden className="size-10 text-sage-500" />
              <p className="mt-4 font-serif text-xl">No orders yet</p>
              <p className="mt-1 max-w-sm text-sm text-muted">When you place an order, you can track it and reorder favourites from here.</p>
              <Button href="#shop" className="mt-6">
                Start shopping
              </Button>
            </div>
          </Panel>
        </div>
      </div>
    </Container>
  )
}
