// One place to read environment variables.
// Vite exposes variables that start with VITE_ on `import.meta.env`.
const DEFAULT_API_URL = 'https://ecommerce-learning-api.onrender.com/api'

export const env = {
  API_URL: (import.meta.env.VITE_API_URL || DEFAULT_API_URL).replace(/\/$/, ''),
  IS_DEV: import.meta.env.DEV,
}
