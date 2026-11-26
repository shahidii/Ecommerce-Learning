// Dummy cart for the Cart page UI. Later this comes from state / the API.
import { products } from './products'

const pick = (id) => products.find((product) => product.id === id)

export const cartItems = [
  { product: pick('prod-09'), quantity: 2 }, // Anti-Colic Feeding Bottle
  { product: pick('prod-20'), quantity: 1 }, // Muslin Swaddle Blankets
  { product: pick('prod-33'), quantity: 1 }, // Classic Teddy Bear
]

export const FREE_SHIPPING_ABOVE = 999
export const SHIPPING_FEE = 79
