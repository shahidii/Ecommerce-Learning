import { useState } from 'react'
import { Lock, Mail, User } from 'lucide-react'
import { Link, useLocation } from 'react-router'
import AuthLayout from '@/components/layout/AuthLayout'
import { Alert, Button, Input, Spinner } from '@/components/ui'
import { useAuth } from '@/hooks/useAuth'
import { usePageTitle } from '@/hooks/usePageTitle'
import { ROUTES } from '@/routes/paths'
import { pexels } from '@/utils/image'
import { validateSignup } from '@/utils/validators'

export default function SignupPage() {
  usePageTitle('Create an account')
  const { signup } = useAuth()
  const location = useLocation()

  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [fieldErrors, setFieldErrors] = useState({})
  const [formError, setFormError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateField = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setFieldErrors((current) => ({ ...current, [name]: undefined }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setFormError(null)

    const errors = validateSignup(form)
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) return

    setIsSubmitting(true)
    try {
      await signup(form) // the API returns a token too, so the user is logged in straight away
    } catch (error) {
      // e.g. 409 EMAIL_EXISTS → "An account with this email already exists" under the email field
      setFieldErrors(error.fieldErrors)
      if (Object.keys(error.fieldErrors).length === 0) setFormError(error.message)
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      image={pexels(3875085, 1200)}
      imageAlt="A bright nursery with a white wooden crib"
      quote={{ text: 'We furnished the whole nursery from here, and the crib turned into a toddler bed this year.', author: 'Arjun, dad of Aanya' }}
    >
      <h1 className="text-4xl">Create your account</h1>
      <p className="mt-2 text-muted">Save favourites, check out faster and get tips for every stage.</p>

      {formError && <Alert className="mt-6">{formError}</Alert>}

      <form className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
        <Input
          label="Full name"
          name="name"
          autoComplete="name"
          placeholder="Your name"
          icon={User}
          value={form.name}
          onChange={updateField}
          error={fieldErrors.name}
        />
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
          autoComplete="new-password"
          placeholder="Create a password"
          icon={Lock}
          hint="At least 6 characters, with a letter and a number."
          value={form.password}
          onChange={updateField}
          error={fieldErrors.password}
        />

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Spinner className="size-4" />}
          {isSubmitting ? 'Creating your account…' : 'Create account'}
        </Button>
        <p className="text-center text-xs text-muted">By creating an account you agree to our terms and privacy policy.</p>
      </form>

      <p className="mt-8 text-center text-sm text-muted">
        Already have an account?{' '}
        <Link to={ROUTES.LOGIN} state={location.state} className="font-semibold text-sage-700 hover:underline">
          Log in
        </Link>
      </p>
    </AuthLayout>
  )
}
