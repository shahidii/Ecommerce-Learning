import { Lock, Mail, User } from 'lucide-react'
import AuthLayout from '@/components/layout/AuthLayout'
import { Button, Checkbox, Input } from '@/components/ui'
import { pexels } from '@/utils/image'

export default function SignupPage() {
  return (
    <AuthLayout
      image={pexels(3875085, 1200)}
      imageAlt="A bright nursery with a white wooden crib"
      quote={{ text: 'We furnished the whole nursery from here, and the crib turned into a toddler bed this year.', author: 'Arjun, dad of Aanya' }}
    >
      <h1 className="text-4xl">Create your account</h1>
      <p className="mt-2 text-muted">Save favourites, check out faster and get tips for every stage.</p>

      <form className="mt-8 flex flex-col gap-5" onSubmit={(event) => event.preventDefault()}>
        <Input label="Full name" name="name" autoComplete="name" placeholder="Your name" icon={User} required />
        <Input label="Email" type="email" name="email" autoComplete="email" placeholder="you@example.com" icon={Mail} required />
        <Input
          label="Password"
          type="password"
          name="password"
          autoComplete="new-password"
          placeholder="Create a password"
          icon={Lock}
          hint="At least 6 characters, with a letter and a number."
          required
        />
        <Checkbox label="Send me tips for my child's stage (you can unsubscribe anytime)" />

        <Button type="submit" size="lg" className="w-full">
          Create account
        </Button>
        <p className="text-center text-xs text-muted">
          By creating an account you agree to our{' '}
          <a href="#terms" className="underline">
            terms
          </a>{' '}
          and{' '}
          <a href="#privacy" className="underline">
            privacy policy
          </a>
          .
        </p>
      </form>

      <p className="mt-8 text-center text-sm text-muted">
        Already have an account?{' '}
        <a href="#login" className="font-semibold text-sage-700 hover:underline">
          Log in
        </a>
      </p>
    </AuthLayout>
  )
}
