// Dummy age groups for building the UI (Phase 6).
// Same shape as the API response (GET /api/age-groups), so in a later
// phase we only replace this import with a real API call.

export const ageGroups = [
  {
    id: "age-1",
    name: "Newborn",
    slug: "newborn",
    ageRange: "0–3 Months",
    minMonths: 0,
    maxMonths: 3,
    sortOrder: 1,
    description: "Soft, gentle essentials for the very first weeks.",
    image: "https://images.pexels.com/photos/36845894/pexels-photo-36845894.jpeg?auto=compress&cs=tinysrgb&w=800",
    productCount: 20
  },
  {
    id: "age-2",
    name: "Infant",
    slug: "infant",
    ageRange: "3–12 Months",
    minMonths: 3,
    maxMonths: 12,
    sortOrder: 2,
    description: "Feeding, play and comfort for a fast-growing baby.",
    image: "https://images.pexels.com/photos/8772505/pexels-photo-8772505.jpeg?auto=compress&cs=tinysrgb&w=800",
    productCount: 32
  },
  {
    id: "age-3",
    name: "Toddler",
    slug: "toddler",
    ageRange: "1–3 Years",
    minMonths: 12,
    maxMonths: 36,
    sortOrder: 3,
    description: "Sturdy clothes and busy toys for little explorers.",
    image: "https://images.pexels.com/photos/34325483/pexels-photo-34325483.jpeg?auto=compress&cs=tinysrgb&w=800",
    productCount: 26
  },
  {
    id: "age-4",
    name: "Preschool",
    slug: "preschool",
    ageRange: "3–5 Years",
    minMonths: 36,
    maxMonths: 60,
    sortOrder: 4,
    description: "Creative play and everyday wear for big kids.",
    image: "https://images.pexels.com/photos/7269700/pexels-photo-7269700.jpeg?auto=compress&cs=tinysrgb&w=800",
    productCount: 13
  }
]
