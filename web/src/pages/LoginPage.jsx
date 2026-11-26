import { Lock, Mail } from 'lucide-react'
import AuthLayout from '@/components/layout/AuthLayout'
import { Button, Checkbox, Input } from '@/components/ui'
import { pexels } from '@/utils/image'

export default function LoginPage() {
  return (
    <AuthLayout
      image={pexels(6209544, 1200)}
      imageAlt="A parent dressing a smiling baby"
      quote={{ text: 'The swaddles are the softest we have tried, and they got softer with every wash.', author: 'Meera, mum of two' }}
    >
      <h1 className="text-4xl">Welcome back</h1>
      <p className="mt-2 text-muted">Log in to see your cart, wishlist and saved addresses.</p>

      <form className="mt-8 flex flex-col gap-5" onSubmit={(event) => event.preventDefault()}>
        <Input label="Email" type="email" name="email" autoComplete="email" placeholder="you@example.com" icon={Mail} required />
        <Input label="Password" type="password" name="password" autoComplete="current-password" placeholder="Your password" icon={Lock} required />

        <div className="flex items-center justify-between gap-4">
          <Checkbox label="Keep me logged in" />
          <a href="#forgot-password" className="shrink-0 text-sm font-semibold text-sage-700 hover:underline">
            Forgot password?
          </a>
        </div>

        <Button type="submit" size="lg" className="w-full">
          Log in
        </Button>
      </form>

      <div className="stitched mt-8 rounded-2xl p-4 text-sm">
        <p className="font-semibold">Trying the demo?</p>
        <p className="mt-1 text-muted">
          Use <span className="font-medium text-foreground">demo@shopnest.dev</span> with password{' '}
          <span className="font-medium text-foreground">Demo@1234</span>.
        </p>
      </div>

      <p className="mt-8 text-center text-sm text-muted">
        New to Little Nest?{' '}
        <a href="#signup" className="font-semibold text-sage-700 hover:underline">
          Create an account
        </a>
      </p>
    </AuthLayout>
  )
}
