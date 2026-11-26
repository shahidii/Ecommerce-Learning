import { apiClient } from './client'

export const ageGroupsApi = {
  /** GET /age-groups → age groups sorted newborn → preschool */
  getAgeGroups: async ({ signal } = {}) => {
    const body = await apiClient.get('/age-groups', { signal })
    return body.data.ageGroups
  },
}
