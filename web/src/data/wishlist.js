// Dummy wishlist for the Wishlist page UI.
import { products } from './products'

const ids = ['prod-12', 'prod-17', 'prod-35', 'prod-26', 'prod-07']

export const wishlistItems = ids.map((id) => products.find((product) => product.id === id))
