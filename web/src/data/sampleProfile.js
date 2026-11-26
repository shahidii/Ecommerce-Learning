// Sample addresses and children for the Profile page. The API has no endpoints for these yet
// (they come with the checkout phase), so the page labels them "Sample data".
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

export const childProfiles = [{ id: 'child-1', name: 'Aanya', ageLabel: '8 months', ageGroup: 'Infant' }]
