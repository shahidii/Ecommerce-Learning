# Ecommerce Learning Project

A teaching project: students build a **React e-commerce frontend** against a ready-made API.

| Folder | What | Status |
| --- | --- | --- |
| [`api/`](api/README.md) | Express + MongoDB REST API with Swagger docs and a Postman collection | ✅ Ready |
| `web/` | React frontend (login, signup, home, products, product detail, search) | 🚧 To build |

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

## Pages students build (web/)

| Page | API used |
| --- | --- |
| Signup | `POST /auth/signup` |
| Login | `POST /auth/login`, then `GET /auth/me` on app load |
| Home | `GET /categories`, `GET /products?featured=true&limit=8` |
| Products | `GET /products?page=&limit=&category=&minPrice=&maxPrice=&sort=` |
| Product detail | `GET /products/:id`, `GET /products/:id/related` |
| Search | `GET /products/search?q=` (debounced search bar) |

Add to cart and wishlist are **buttons only**. They are not wired to the API.
