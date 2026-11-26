import { apiClient } from './client'

export const productsApi = {
  /** GET /products?page&limit&category&ageGroup&minPrice&maxPrice&inStock&featured&sort → { products, meta } */
  getProducts: async (params = {}, { signal } = {}) => {
    const body = await apiClient.get('/products', { params: cleanParams(params), signal })
    return { products: body.data.products, meta: body.meta }
  },

  /** GET /products/search?q= → { products, meta } */
  searchProducts: async (q, params = {}, { signal } = {}) => {
    const body = await apiClient.get('/products/search', { params: cleanParams({ ...params, q }), signal })
    return { products: body.data.products, meta: body.meta }
  },

  /** GET /products/slug/:slug → product */
  getProductBySlug: async (slug, { signal } = {}) => {
    const body = await apiClient.get(`/products/slug/${encodeURIComponent(slug)}`, { signal })
    return body.data.product
  },

  /** GET /products/:id/related?limit= → products */
  getRelatedProducts: async (id, limit = 4, { signal } = {}) => {
    const body = await apiClient.get(`/products/${id}/related`, { params: { limit }, signal })
    return body.data.products
  },
}

/** Drops empty values so the URL stays clean: { category: '', page: 2 } → { page: 2 } */
export function cleanParams(params) {
  return Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== ''))
}
