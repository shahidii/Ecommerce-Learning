import { Baby, Heart, LogOut, MapPin, Package, Plus, UserRound } from 'lucide-react'
import { Link } from 'react-router'
import { Badge, Button, Container } from '@/components/ui'
import { addresses, childProfiles } from '@/data/sampleProfile'
import { useAuth } from '@/hooks/useAuth'
import { usePageTitle } from '@/hooks/usePageTitle'
import { useWishlist } from '@/hooks/useWishlist'
import { ROUTES } from '@/routes/paths'
import { cn } from '@/utils/cn'

const sections = [
  { id: 'details', label: 'Account details', icon: UserRound },
  { id: 'little-ones', label: 'My little ones', icon: Baby },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'orders', label: 'Orders', icon: Package },
]

const formatDate = (date) => new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

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

/** Protected page: ProtectedRoute only renders it when `user` exists. */
export default function ProfilePage() {
  usePageTitle('Your account')
  const { user, logout } = useAuth()
  const { count: wishlistCount } = useWishlist()

  // No navigate() needed: once `user` is null, ProtectedRoute notices and sends us to /login.
  const handleLogout = () => logout()

  return (
    <Container className="py-10">
      {/* Profile header */}
      <div className="flex flex-wrap items-center gap-5 rounded-pebble bg-surface p-6 sm:p-8">
        <img src={user.avatar} alt="" className="size-20 rounded-full ring-4 ring-white" />
        <div className="flex-1">
          <h1 className="text-3xl sm:text-4xl">Hello, {user.name.split(' ')[0]}</h1>
          <p className="mt-1 text-muted">{user.email}</p>
          <p className="text-sm text-subtle">Member since {formatDate(user.createdAt)}</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
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
            <li>
              <Link
                to={ROUTES.WISHLIST}
                className="flex items-center gap-3 rounded-full px-4 py-2.5 text-[0.95rem] font-medium whitespace-nowrap text-bark-800 hover:bg-surface"
              >
                <Heart aria-hidden className="size-4.5" />
                Wishlist ({wishlistCount})
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex flex-col gap-8">
          <Panel id="details" title="Account details">
            {/* Straight from GET /api/auth/me (stored in AuthContext) */}
            <dl className="grid gap-x-8 gap-y-5 text-[0.95rem] sm:grid-cols-2">
              <div>
                <dt className="text-sm text-muted">Full name</dt>
                <dd className="mt-1 font-semibold">{user.name}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted">Email</dt>
                <dd className="mt-1 font-semibold break-all">{user.email}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted">Account type</dt>
                <dd className="mt-1 font-semibold capitalize">{user.role}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted">Joined</dt>
                <dd className="mt-1 font-semibold">{formatDate(user.createdAt)}</dd>
              </div>
            </dl>
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
            <p className="text-sm text-muted">
              We use your child's age to suggest the right stage and sizes. <Badge>Sample data</Badge>
            </p>
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
            <p className="mb-4 text-sm text-muted">
              Addresses get their own API in the checkout phase. <Badge>Sample data</Badge>
            </p>
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
              <Button to={ROUTES.SHOP} className="mt-6">
                Start shopping
              </Button>
            </div>
          </Panel>
        </div>
      </div>
    </Container>
  )
}
