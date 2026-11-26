# Ecommerce Learning Project

A teaching project: students build a **React e-commerce frontend** (a baby store, *Little Nest*) against a ready-made API.

| Folder | What | Status |
| --- | --- | --- |
| [`api/`](api/README.md) | Express + MongoDB REST API with Swagger docs and a Postman collection | ✅ Ready |
| [`web/`](web/README.md) | React + Vite + Tailwind frontend (Little Nest), connected to the live API | 🟡 Phase 10 of the guide done (routing, API, auth, context) |

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
cp .env.example .env
pnpm install
pnpm dev
```

The website talks to the live API at https://ecommerce-learning-api.onrender.com/api (change `VITE_API_URL` in `web/.env` to use your local API).

## Pages students build (web/)

| Page | API used |
| --- | --- |
| Signup | `POST /auth/signup` |
| Login | `POST /auth/login`, then `GET /auth/me` on app load |
| Home | `GET /age-groups` (Shop by Age), `GET /categories` (Little Essentials), `GET /products?featured=true&limit=8` |
| Products | `GET /products?page=&limit=&category=&ageGroup=&minPrice=&maxPrice=&sort=` |
| Product detail | `GET /products/:id`, `GET /products/:id/related` |
| Search | `GET /products/search?q=` (debounced search bar) |

Cart and wishlist live in React Context and are saved in localStorage. Syncing them with the API comes with checkout in a later phase.
