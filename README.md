# Ecommerce Learning Project

A teaching project: students build a **React e-commerce frontend** (a baby store, *Little Nest*) against a ready-made API.

| Folder | What | Status |
| --- | --- | --- |
| [`api/`](api/README.md) | Express + MongoDB REST API with Swagger docs and a Postman collection | ✅ Ready |
| [`web/`](web/README.md) | React + Vite + Tailwind frontend (Little Nest): all pages as UI with dummy data | 🟡 Phase 6 of the guide done (UI only) |

## Run the API

```bash
cd api
pnpm install
cp .env.example .env
pnpm seed
pnpm dev
```

- API: http://localhost:5000/api
- Swagger: http://localhost:5000/api/docs
- Demo login: `demo@shopnest.dev` / `Demo@1234`

## Run the website

```bash
cd web
pnpm install
pnpm dev
```

## Pages students build (web/)

| Page | API used |
| --- | --- |
| Signup | `POST /auth/signup` |
| Login | `POST /auth/login`, then `GET /auth/me` on app load |
| Home | `GET /age-groups` (Shop by Age), `GET /categories` (Little Essentials), `GET /products?featured=true&limit=8` |
| Products | `GET /products?page=&limit=&category=&ageGroup=&minPrice=&maxPrice=&sort=` |
| Product detail | `GET /products/:id`, `GET /products/:id/related` |
| Search | `GET /products/search?q=` (debounced search bar) |

Add to cart and wishlist are **buttons only**. They are not wired to the API.
