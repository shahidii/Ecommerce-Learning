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
| 7+ | Routing, API calls, auth, cart state… | 🚧 next |

## Run it

```bash
cd web
pnpm install
pnpm dev          # http://localhost:5173
pnpm lint         # oxlint
pnpm build        # production build in dist/
```

Use the **Preview** bar at the bottom of the page to switch between pages (it's temporary until React Router is added).

## Folder structure

```
src/
├── api/            # API client and calls (next phases)
├── assets/         # images, icons, fonts bundled with the app
├── components/
│   ├── ui/         # small reusable pieces: Button, Input, Badge, Rating, Price…
│   ├── layout/     # Navbar, Footer, AnnouncementBar, AuthLayout
│   ├── product/    # ProductCard, ProductGrid, FilterPanel
│   ├── home/       # Home page sections: Hero, GrowthChart, CategoryShowcase…
│   └── dev/        # PagePreviewBar (development only)
├── constants/      # navigation links and other fixed values
├── data/           # dummy data in the same shape as the API responses
├── hooks/          # custom hooks (next phases)
├── pages/          # one file per page
├── utils/          # cn(), formatPrice(), pexels()
├── App.jsx
├── index.css       # Tailwind import + design tokens
└── main.jsx
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
