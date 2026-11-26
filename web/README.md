# Little Nest – React frontend

The React (Vite + JavaScript) website for the Little Nest baby store. It is built phase by phase for learning; each phase has its own page in the Notion guide.

| Phase | What | Status |
| --- | --- | --- |
| 1 | Vite + React (JS) with oxlint | ✅ |
| 2 | Tailwind CSS v4 (`@tailwindcss/vite`) | ✅ |
| 3 | Design tokens: colours, fonts, radius in `src/index.css` | ✅ |
| 4 | Folder structure, `@/` path alias, utils, dummy data | ✅ |
| 5 | shadcn/ui (optional) vs. our own UI components | ✅ own components |
| 6 | All pages as static UI with dummy data | ✅ |
| 7 | Routing: React Router, layouts, lazy pages, protected and guest routes, 404 | ✅ |
| 8 | API connection: one axios client, service files, `ApiError`, loading/error/empty states | ✅ |
| 9 | Token handling: storage, `Authorization` header, expiry, auto logout | ✅ |
| 10 | Context API: Auth, Cart (useReducer) and Wishlist, saved in localStorage | ✅ |
| 11+ | Checkout, orders, cart synced with the API… | 🚧 next |

## Run it

```bash
cd web
cp .env.example .env   # VITE_API_URL: the live API on Render, or your local API
pnpm install
pnpm dev          # http://localhost:5173
pnpm lint         # oxlint
pnpm build        # production build in dist/
```

The first request after a while can take ~50 s: the free Render server is waking up. The skeletons stay on screen until it answers.

Demo login: `demo@shopnest.dev` / `Demo@1234` (or press **Use demo account** on the login page).

## Routes

| URL | Page | API |
| --- | --- | --- |
| `/` | Home | `GET /age-groups`, `GET /categories`, `GET /products?featured=true` |
| `/shop?category=&ageGroup=&minPrice=&maxPrice=&inStock=&sort=&page=` | Shop | `GET /products?…` |
| `/search?q=` | Search | `GET /products/search?q=` |
| `/products/:slug` | Product | `GET /products/slug/:slug`, `GET /products/:id/related` |
| `/categories` | Categories | `GET /categories`, `GET /categories/:slug/products` |
| `/cart`, `/wishlist` | Cart, Wishlist | none (Context + localStorage) |
| `/profile` | Profile (logged in only) | `GET /auth/me` |
| `/login`, `/signup` | Auth (guests only) | `POST /auth/login`, `POST /auth/signup` |
| `*` | 404 | none |

## Folder structure

```
src/
├── api/            # client.js (axios + interceptors), ApiError.js, one file per resource
├── assets/         # images, icons, fonts bundled with the app
├── components/
│   ├── ui/         # small reusable pieces: Button, Input, Badge, Alert, Skeleton…
│   ├── layout/     # RootLayout, Navbar, Footer, AnnouncementBar, AuthLayout
│   ├── feedback/   # ErrorState, EmptyState, PageLoader
│   ├── product/    # ProductCard, ProductGrid, FilterPanel, Pagination, skeleton
│   └── home/       # Home page sections: Hero, GrowthChart, CategoryShowcase…
├── config/         # env.js: reads VITE_ variables
├── constants/      # navigation links, shop rules (free shipping, sort options)
├── context/        # auth/, cart/, wishlist/ providers + AppProviders
├── data/           # sampleProfile.js (addresses, children: no API yet)
├── hooks/          # useApi, useAuth, useCart, useWishlist, useDebounce, usePageTitle
├── pages/          # one file per route
├── routes/         # paths.js, router.jsx, ProtectedRoute, GuestRoute
├── utils/          # cn, formatPrice, tokenStorage, jwt, storage, validators
├── index.css       # Tailwind import + design tokens
└── main.jsx        # <AppProviders><RouterProvider /></AppProviders>
```

## Design system

| Token | Value | Used for |
| --- | --- | --- |
| `milk` | `#fbf8f3` | page background |
| `oat-100` | `#f2ece2` | surfaces, sections |
| `bark-900` | `#3b2e25` | text |
| `sage-600` | `#5d7759` | primary buttons, links |
| `blush-600` | `#b0505c` | sale badges, wishlist |
| `butter-400` | `#e9b949` | rating stars |
| Fraunces (SOFT 100) | serif | headings |
| Figtree | sans-serif | body text |

Components use **semantic** names (`bg-primary`, `text-muted`, `border-border`), defined once in `index.css`.

Photos: free [Pexels](https://www.pexels.com/license/) images.
