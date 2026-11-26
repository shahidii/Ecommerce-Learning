import { apiClient } from './client'
import { cleanParams } from './products.api'

export const categoriesApi = {
  /** GET /categories → categories (each with productCount) */
  getCategories: async ({ signal } = {}) => {
    const body = await apiClient.get('/categories', { signal })
    return body.data.categories
  },

  /** GET /categories/:slug/products → { category, products, meta } */
  getCategoryProducts: async (slug, params = {}, { signal } = {}) => {
    const body = await apiClient.get(`/categories/${slug}/products`, { params: cleanParams(params), signal })
    return { category: body.data.category, products: body.data.products, meta: body.meta }
  },
}
