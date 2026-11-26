// Small client-side checks so users get instant feedback.
// The API validates again: never rely on the browser alone.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateLogin({ email, password }) {
  const errors = {}
  if (!email.trim()) errors.email = 'Enter your email address'
  else if (!EMAIL_REGEX.test(email.trim())) errors.email = 'Enter a valid email address, like you@example.com'
  if (!password) errors.password = 'Enter your password'
  return errors
}

export function validateSignup({ name, email, password }) {
  const errors = validateLogin({ email, password })
  if (!name.trim()) errors.name = 'Enter your name'
  else if (name.trim().length < 2) errors.name = 'Name must be at least 2 characters'
  if (password && (password.length < 6 || !/[a-z]/i.test(password) || !/\d/.test(password))) {
    errors.password = 'Use at least 6 characters, with a letter and a number'
  }
  return errors
}
