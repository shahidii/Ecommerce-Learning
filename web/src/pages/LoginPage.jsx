import { useState } from 'react'
import { Lock, Mail } from 'lucide-react'
import { Link, useLocation } from 'react-router'
import AuthLayout from '@/components/layout/AuthLayout'
import { Alert, Button, Checkbox, Input, Spinner } from '@/components/ui'
import { useAuth } from '@/hooks/useAuth'
import { usePageTitle } from '@/hooks/usePageTitle'
import { ROUTES } from '@/routes/paths'
import { pexels } from '@/utils/image'
import { validateLogin } from '@/utils/validators'

const DEMO_ACCOUNT = { email: 'demo@shopnest.dev', password: 'Demo@1234' }

export default function LoginPage() {
  usePageTitle('Log in')
  const { login, sessionMessage } = useAuth()
  const location = useLocation()

  const [form, setForm] = useState({ email: '', password: '', remember: true })
  const [fieldErrors, setFieldErrors] = useState({})
  const [formError, setFormError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateField = (event) => {
    const { name, type, value, checked } = event.target
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
    setFieldErrors((current) => ({ ...current, [name]: undefined })) // clear the error while the user fixes it
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setFormError(null)

    // 1. Check in the browser first
    const errors = validateLogin(form)
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) return

    // 2. Ask the API. On success, GuestRoute sends the user back to where they came from.
    setIsSubmitting(true)
    try {
      await login(form)
    } catch (error) {
      // error is an ApiError: field errors go under inputs, everything else in the alert
      setFieldErrors(error.fieldErrors)
      if (Object.keys(error.fieldErrors).length === 0) setFormError(error.message)
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      image={pexels(6209544, 1200)}
      imageAlt="A parent dressing a smiling baby"
      quote={{ text: 'The swaddles are the softest we have tried, and they got softer with every wash.', author: 'Meera, mum of two' }}
    >
      <h1 className="text-4xl">Welcome back</h1>
      <p className="mt-2 text-muted">Log in to see your cart, wishlist and saved addresses.</p>

      {sessionMessage && !formError && (
        <Alert variant="info" className="mt-6">
          {sessionMessage}
        </Alert>
      )}
      {formError && <Alert className="mt-6">{formError}</Alert>}

      {/* noValidate: we show our own messages instead of the browser's pop-ups */}
      <form className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
        <Input
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@example.com"
          icon={Mail}
          value={form.email}
          onChange={updateField}
          error={fieldErrors.email}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="Your password"
          icon={Lock}
          value={form.password}
          onChange={updateField}
          error={fieldErrors.password}
        />

        <Checkbox label="Keep me logged in" name="remember" checked={form.remember} onChange={updateField} />

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Spinner className="size-4" />}
          {isSubmitting ? 'Logging in…' : 'Log in'}
        </Button>
      </form>

      <div className="stitched mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl p-4 text-sm">
        <div>
          <p className="font-semibold">Trying the demo?</p>
          <p className="mt-1 text-muted">
            <span className="font-medium text-foreground">{DEMO_ACCOUNT.email}</span> /{' '}
            <span className="font-medium text-foreground">{DEMO_ACCOUNT.password}</span>
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            setForm((current) => ({ ...current, ...DEMO_ACCOUNT }))
            setFieldErrors({})
          }}
        >
          Use demo account
        </Button>
      </div>

      <p className="mt-8 text-center text-sm text-muted">
        New to Little Nest? {/* pass `state` on so signup also returns the user to the page they wanted */}
        <Link to={ROUTES.SIGNUP} state={location.state} className="font-semibold text-sage-700 hover:underline">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  )
}
