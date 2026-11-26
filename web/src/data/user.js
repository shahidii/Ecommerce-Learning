// Dummy logged-in user for the Profile page UI (same shape as GET /api/auth/me → data.user).
export const user = {
  id: 'user-1',
  name: 'Demo User',
  email: 'demo@shopnest.dev',
  avatar: 'https://ui-avatars.com/api/?name=Demo%20User&background=dce6d8&color=3d503b&size=160',
  role: 'customer',
  createdAt: '2026-03-14T09:30:00.000Z',
}

export const addresses = [
  {
    id: 'addr-1',
    label: 'Home',
    name: 'Demo User',
    line1: '24, Rose Garden Apartments',
    line2: 'MG Road, Kakkanad',
    city: 'Kochi',
    state: 'Kerala',
    pincode: '682030',
    phone: '+91 98765 43210',
    isDefault: true,
  },
  {
    id: 'addr-2',
    label: 'Grandparents',
    name: 'Sara Thomas',
    line1: '7/112, Hill View Road',
    line2: 'Near St. Mary’s Church',
    city: 'Thrissur',
    state: 'Kerala',
    pincode: '680001',
    phone: '+91 91234 56780',
    isDefault: false,
  },
]

export const childProfiles = [
  { id: 'child-1', name: 'Aanya', ageLabel: '8 months', ageGroup: 'Infant' },
]
