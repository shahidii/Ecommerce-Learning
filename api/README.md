# ShopNest API 🛒

A REST API for learning how a **React e-commerce frontend** talks to a backend.
Built with **Node.js, Express 5, MongoDB (Mongoose) and JWT**, documented with **Swagger**.

> Students only **consume** this API from the React app (login, signup, home, products, product detail, search).
> Add-to-cart and wishlist are UI-only buttons — there are no endpoints for them.

---

## 1. Quick start

**Requirements:** Node.js 20+, pnpm (or npm), and a MongoDB Atlas URI **or** MongoDB running locally.

```bash
cd api
pnpm install          # or: npm install
cp .env.example .env  # then edit values if needed
pnpm seed             # loads 10 categories, 63 products, 2 demo users
pnpm dev              # starts http://localhost:5000 with auto-reload
```

| What | URL |
| --- | --- |
| API base URL | `http://localhost:5000/api` |
| Swagger docs (try every endpoint in the browser) | `http://localhost:5000/api/docs` |
| Raw OpenAPI JSON (import into Postman) | `http://localhost:5000/api/docs.json` |
| Health check | `http://localhost:5000/api/health` |

### Demo accounts (created by `pnpm seed`)

| Role | Email | Password |
| --- | --- | --- |
| Customer | `demo@shopnest.dev` | `Demo@1234` |
| Admin | `admin@shopnest.dev` | `Admin@1234` |

### Scripts

| Script | What it does |
| --- | --- |
| `pnpm dev` | Start with auto-reload (`node --watch`) |
| `pnpm start` | Start for production |
| `pnpm seed` | Wipe DB and insert fresh demo data |
| `pnpm seed:destroy` | Wipe all users, categories and products |

---

## 2. Folder structure

```
api/
├── src/
│   ├── server.js            # Entry: load .env → connect DB → start server
│   └── app.js               # Express app: middleware → routes → 404 → error handler
├── config/
│   ├── env.js               # Reads & validates process.env (single source of truth)
│   ├── db.js                # MongoDB connection (Atlas first, local fallback)
│   ├── logger.js            # pino logger (pretty in dev, JSON in production)
│   ├── cors.js              # Which frontends may call the API
│   └── swagger.js           # Swagger/OpenAPI setup
├── routes/                  # URL → middleware → controller   (WHAT url?)
│   ├── index.js             # Mounts /auth, /products, /categories, /docs, /health
│   ├── auth.routes.js
│   ├── product.routes.js
│   └── category.routes.js
├── controllers/             # Read req, call service, send res (thin!)
├── services/                # Business logic (no req/res here)
├── repositories/            # The ONLY place that queries the database
├── models/                  # Mongoose schemas (User, Category, Product)
│   └── plugins/toJSON.plugin.js   # _id → id, hides password
├── validators/              # Request validation rules
├── middleware/
│   ├── httpLogger.middleware.js     # logs every request + adds X-Request-Id
│   ├── requestContext.middleware.js # makes the request logger available to every layer
│   ├── auth.middleware.js       # authenticate (JWT) + authorize("admin")
│   ├── validate.middleware.js   # runs a validator, returns 400 on error
│   ├── notFound.middleware.js   # unknown routes → 404
│   └── error.middleware.js      # turns every error into the same JSON shape
├── utils/                   # ApiError, apiResponse, asyncHandler, jwt, pagination, requestContext…
├── docs/
│   ├── swagger.schemas.js   # Reusable Swagger schemas (User, Product, Error…)
│   └── paths/*.docs.js      # Swagger docs per module
├── seed/
│   ├── seed.js
│   └── data/                # categories.js, products.js, users.js
└── postman/                 # Postman collection + environment
```

### How a request flows

```
Request → route → [validate] → [authenticate] → controller → service → repository → MongoDB
                                                                  ↓ throws ApiError
Response ← sendSuccess()  ←─────────── controller      error.middleware → { success:false, error }
```

---

## 3. Response format

Every response has the **same shape**, so the frontend can handle all of them in one place.

**Success**
```json
{
  "success": true,
  "message": "Products fetched successfully",
  "data": { "products": [ ... ] },
  "meta": { "page": 1, "limit": 12, "total": 63, "totalPages": 6, "hasNextPage": true, "hasPrevPage": false }
}
```
`meta` is only present on paginated lists.

**Error**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Please enter a valid email address",
    "field": "email",
    "details": [{ "field": "email", "message": "Please enter a valid email address" }]
  }
}
```
Use `error.field` to show the message under the right input in a form.

---

## 4. Endpoints

All URLs start with `http://localhost:5000/api`. 🔒 = needs `Authorization: Bearer <token>`.

### Auth

| Method | URL | Body | Description |
| --- | --- | --- | --- |
| POST | `/auth/signup` | `{ name, email, password, avatar? }` | Create account → `{ user, token }` |
| POST | `/auth/login` | `{ email, password }` | Log in → `{ user, token }` |
| GET 🔒 | `/auth/me` | – | Logged-in user (check the saved token on app load) |

Password rules: at least 6 characters, at least 1 letter and 1 number.

### Products

| Method | URL | Description |
| --- | --- | --- |
| GET | `/products` | List with pagination, filters and sorting |
| GET | `/products/search?q=shirt` | Search (title, brand, tags, category name) |
| GET | `/products/:id` | Product detail |
| GET | `/products/slug/:slug` | Product detail by slug |
| GET | `/products/:id/related?limit=4` | Same-category products ("You may also like") |
| POST 🔒 admin | `/products` | Create product |
| PUT 🔒 admin | `/products/:id` | Update product (partial) |
| DELETE 🔒 admin | `/products/:id` | Delete product |

**Query params for `/products`, `/products/search` and `/categories/:slug/products`**

| Param | Example | Notes |
| --- | --- | --- |
| `page` | `2` | default `1` |
| `limit` | `12` | default `12`, max `50` |
| `search` / `q` | `phone` | `q` is required on `/products/search` |
| `category` | `laptops` | category **slug** |
| `brand` | `Nexa,Orbit` | comma separated, case-insensitive |
| `minPrice` / `maxPrice` | `1000` / `50000` | in INR |
| `minRating` | `4` | 0–5 |
| `inStock` | `true` | `true` / `false` |
| `featured` | `true` | use for the home page |
| `sort` | `price_asc` | `newest` (default), `oldest`, `price_asc`, `price_desc`, `rating`, `popular`, `title_asc`, `title_desc`, `discount` |

### Categories

| Method | URL | Description |
| --- | --- | --- |
| GET | `/categories` | All categories with `productCount` |
| GET | `/categories/:slug` | One category |
| GET | `/categories/:slug/products` | Products in a category (same query params as above) |

### Product object

```json
{
  "id": "6745a1f0c2b3d4e5f6a7b8d2",
  "title": "Nexa 13 Pro (128 GB, Graphite)",
  "slug": "nexa-13-pro-128-gb-graphite",
  "description": "A flagship phone with ...",
  "brand": "Nexa",
  "category": { "id": "...", "name": "Smartphones", "slug": "smartphones", "image": "..." },
  "price": 79999,
  "mrp": 89999,
  "discountPercentage": 11,
  "currency": "INR",
  "rating": 4.7,
  "reviewsCount": 2341,
  "stock": 25,
  "inStock": true,
  "thumbnail": "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/thumbnail.webp",
  "images": ["...1.webp", "...2.webp", "...3.webp"],
  "tags": ["5g", "flagship", "camera"],
  "specifications": [{ "label": "Display", "value": "6.1\" OLED, 120Hz" }],
  "isFeatured": true,
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

## 5. Error codes

| HTTP | `error.code` | When |
| --- | --- | --- |
| 400 | `VALIDATION_ERROR` | Missing or invalid input (see `field` / `details`) |
| 400 | `INVALID_JSON` | Body is not valid JSON |
| 400 | `INVALID_ID` | `/products/123`: not a valid id |
| 401 | `NO_TOKEN` | Protected route called without a token |
| 401 | `INVALID_TOKEN` / `TOKEN_EXPIRED` | Bad or expired token → log the user out |
| 401 | `INVALID_CREDENTIALS` | Wrong email or password |
| 403 | `FORBIDDEN` | Logged in but not an admin |
| 404 | `PRODUCT_NOT_FOUND` / `CATEGORY_NOT_FOUND` | Resource does not exist |
| 404 | `ROUTE_NOT_FOUND` | Unknown URL |
| 409 | `EMAIL_EXISTS` | Signup with an email that is already registered |
| 500 | `INTERNAL_SERVER_ERROR` | Bug on the server |

---

## 6. Testing with Postman

1. Postman → **Import** → select both files in `postman/`:
   - `ShopNest-API.postman_collection.json`
   - `ShopNest-Local.postman_environment.json`
2. Top-right environment dropdown → choose **ShopNest Local**.
3. Run **Auth → Login (demo user)**. Its test script saves the token into `{{token}}`.
4. Run **Products → Get products**. This saves the first product's id into `{{productId}}`.
5. Now **Get product by id**, **Related products** and **Get current user (me)** work.
6. For the admin requests, first run **Login (admin)** and **Categories → Get categories**.

Each request has tests (see the *Tests* tab), and you can use **Run collection** to run all of them.

> Alternative: Postman → Import → paste `http://localhost:5000/api/docs.json` to generate a collection from Swagger.

---

## 7. Environment variables

| Key | Example | Description |
| --- | --- | --- |
| `PORT` | `5000` | Server port |
| `MONGODB_URI` | `mongodb+srv://user:pass@cluster.mongodb.net` | MongoDB Atlas URI (tried first) |
| `MONGO_URI_LOCAL` | `mongodb://127.0.0.1:27017/shopnest` | Local MongoDB (fallback if Atlas is missing or fails) |
| `MONGODB_DB_NAME` | `shopnest` | Database name used on Atlas / local |
| `JWT_SECRET` | long random string | Used to sign tokens |
| `JWT_EXPIRES_IN` | `7d` | Token lifetime |
| `ALLOWED_ORIGINS` | `http://localhost:5173` or `*` | Frontend URLs allowed by CORS (comma separated). `*` = any website. Any localhost port is always allowed in development, and the API's own URL is always allowed |
| `API_BASE_URL` | `https://your-api.onrender.com` | Public URL shown in Swagger. Optional on Render (it uses `RENDER_EXTERNAL_URL` automatically) |
| `LOG_LEVEL` | `debug` | Optional. `trace`, `debug`, `info`, `warn`, `error`, `fatal`, `silent`. Default: `debug` in development, `info` in production |

---

## 8. Logging: see how a request flows

Logging uses [pino](https://getpino.io), one of the fastest Node.js loggers.
The logs are written to **teach how the API works**: in development every request prints its path through each layer.

### Development (`pnpm dev`, level `debug`)

```
[11:22:59] DEBUG: ↳ http: → POST /api/auth/login
    body: { "email": "demo@shopnest.dev", "password": "[REDACTED]" }
[11:22:59] DEBUG: ↳ validate: loginValidator(body) passed
[11:22:59] DEBUG: ↳ controller: authController.login → authService.login()
[11:22:59] DEBUG: ↳ service: authService.login: finding user by email (including the hashed password)
[11:22:59] DEBUG: ↳ db: users.findOne({ email: 'demo@shopnest.dev' }, {})
[11:22:59] DEBUG: ↳ service: User found. Comparing password with bcrypt.compare()
[11:22:59] DEBUG: ↳ service: Password correct. Generating JWT (role: customer)
[11:22:59] INFO:  ↳ service: User logged in
    userId: "6b07c7b6618c2ec7d36d3a46"
[11:22:59] DEBUG: ↳ controller: Sending 200 with { user, token }
[11:22:59] INFO:  POST /api/auth/login 200 - 103ms
```

A products request even shows the **real MongoDB query** that ran:

```
[11:22:58] DEBUG: ↳ http: → GET /api/products?category=laptops&minPrice=80000&sort=price_asc&limit=2
[11:22:58] DEBUG: ↳ validate: listQueryValidator(query) passed
[11:22:58] DEBUG: ↳ controller: productController.getProducts → productService.listProducts()
[11:22:58] DEBUG: ↳ service: productService.listProducts: page 1, limit 2 → skip 0
[11:22:58] DEBUG: ↳ db: categories.findOne({ slug: 'laptops' }, {})
[11:22:58] DEBUG: ↳ service: Built MongoDB filter from the query string
    filter: { "category": "6b07...", "price": { "$gte": 80000 } }
[11:22:58] DEBUG: ↳ db: products.find({ category: new ObjectId('6b07...'), price: { '$gte': 80000 } }, { sort: { price: 1, _id: 1 }, skip: 0, limit: 2 })
[11:22:58] DEBUG: ↳ db: products.countDocuments({ category: new ObjectId('6b07...'), price: { '$gte': 80000 } }, {})
[11:22:58] DEBUG: ↳ controller: Sending 200 with 2 of 4 products (page 1/2)
[11:22:58] INFO:  GET /api/products?category=laptops&minPrice=80000&sort=price_asc&limit=2 200 - 158ms
```

And errors show **where** they stopped the request:

```
[11:23:03] DEBUG: ↳ http: → POST /api/products
[11:23:03] DEBUG: ↳ auth: Token valid → user id 6b07..., loading user from DB
[11:23:03] DEBUG: ↳ db: users.findOne({ _id: new ObjectId('6b07...') }, { projection: { password: 0 } })
[11:23:03] DEBUG: ↳ auth: Authenticated as customer (6b07...)
[11:23:03] WARN:  ↳ auth: Access denied: needs admin → 403
[11:23:03] DEBUG: ↳ error-handler: Caught ApiError → responding 403 FORBIDDEN
[11:23:03] WARN:  POST /api/products 403 - 47ms → FORBIDDEN: You do not have permission to perform this action.
```

### Production (`NODE_ENV=production`, level `info`)

Production logs are **quiet and machine-readable**: one JSON object per line, ready for log tools (Datadog, Grafana Loki, CloudWatch, Render/Railway logs). Only these are logged:
- one line per request (status, time, request id),
- business events: `User signed up`, `User logged in`, `Failed login attempt`, `Access denied`, admin product changes,
- errors (500s with the full stack trace).

```json
{"level":30,"time":"2026-11-26T05:53:18.857Z","service":"shopnest-api","env":"production","reqId":"f94b5647-...","layer":"service","userId":"6b07...","role":"customer","msg":"User logged in"}
{"level":30,"time":"2026-11-26T05:53:18.858Z","service":"shopnest-api","env":"production","reqId":"f94b5647-...","req":{"id":"f94b5647-...","method":"POST","url":"/api/auth/login"},"res":{"statusCode":200},"responseTime":103,"msg":"POST /api/auth/login 200 - 103ms"}
```

To see the full flow in production too (e.g. while debugging a deployed app), set `LOG_LEVEL=debug`. Every line then has a `layer` field (`http`, `validate`, `auth`, `controller`, `service`, `db`, `error-handler`) and the same `reqId`, so you can filter one request.

### Log levels

| Level | Used for | Dev | Prod |
| --- | --- | :-: | :-: |
| `debug` | Step-by-step flow, DB queries | ✅ | ❌ (unless `LOG_LEVEL=debug`) |
| `info` | Requests (2xx/3xx), business events, startup | ✅ | ✅ |
| `warn` | 4xx responses, failed logins, access denied | ✅ | ✅ |
| `error` | 5xx responses, with stack trace | ✅ | ✅ |
| `fatal` | Server cannot start / crashes | ✅ | ✅ |

### How it works (files)

| File | Job |
| --- | --- |
| `config/logger.js` | Creates the pino logger: pretty in dev, JSON in prod, hides secrets |
| `middleware/httpLogger.middleware.js` | Logs every request with a request id, sets `X-Request-Id` |
| `utils/requestContext.js` | `AsyncLocalStorage`: lets services and DB code log with the request id **without** passing `req` around. `createLogger("service")` gives a logger tagged with a layer |
| `middleware/requestContext.middleware.js` | Starts the context for each request and logs `→ METHOD url` |
| `config/db.js` | `mongoose.set("debug", …)` logs every MongoDB query (debug level only) |
| `middleware/error.middleware.js` | Logs where the error was caught; 500s are logged with the stack |

### Safety

- **Secrets are hidden:** `Authorization` headers, cookies, `password` and `token` fields → `[REDACTED]`. Bcrypt hashes in DB queries → `[HASHED_PASSWORD]`.
- **Request ID:** every response has an `X-Request-Id` header, and 500 errors return `error.requestId`. Search the logs for that id.
- **Crashes are logged:** startup errors (e.g. port already in use), `unhandledRejection` and `uncaughtException` are logged as `fatal`. Ctrl+C / `SIGTERM` closes the server and the DB cleanly.

### Use it in your own code

```js
const { createLogger } = require("../utils/requestContext");
const log = createLogger("service");                // layer name shown in the log

log.debug("Checking stock");                        // flow detail (development)
log.info({ orderId, total }, "Order placed");       // business event (production too)
log.warn({ userId }, "Coupon already used");        // something suspicious
// Outside a request (startup, scripts) use the plain logger:
const logger = require("../config/logger");
logger.error({ err }, "Payment provider down");     // pass errors as { err } to keep the stack
```

---

## 9. Deploy on Render

1. Push the repo to GitHub (`.env` is git-ignored, so your secrets stay local).
2. Render → **New → Web Service** → pick the repo.
3. Settings:

| Setting | Value |
| --- | --- |
| Root Directory | `api` |
| Runtime | `Node` |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Health Check Path | `/api/health` |

4. **Environment** tab → add these variables (do **not** add `PORT`; Render sets it):

| Key | Value |
| --- | --- |
| `NODE_ENV` | `production` |
| `MONGODB_URI` | your Atlas `mongodb+srv://...` URI (don't set `MONGO_URI_LOCAL` on Render: the local fallback only runs in development) |
| `MONGODB_DB_NAME` | `shopnest` |
| `JWT_SECRET` | a long random string, e.g. output of `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"` |
| `JWT_EXPIRES_IN` | `7d` |
| `ALLOWED_ORIGINS` | `*` (any student frontend) or a list like `http://localhost:5173,https://my-shop.vercel.app` |

5. **Allow Render's IPs in Atlas** (instead of opening the database to everyone with `0.0.0.0/0`):
   1. Render → your service → **Connect** (top right) → **Outbound** tab → copy the IP ranges (e.g. `74.220.48.0/24`).
   2. Atlas → **Security → Network Access → Add IP Address** → paste **one range per entry** → Confirm.
   3. Wait until every entry shows **Active**, then Render → **Manual Deploy → Restart service**.

   These ranges are shared by all Render services in your region, so also keep the database user safe:
   a strong password and only the `readWrite` role on the `shopnest` database.
   (For IPs used only by you, Render sells [dedicated outbound IPs](https://render.com/docs/dedicated-ips).)

   If you forget this step, the logs say: *"Atlas blocked this server's IP. Fix: Render → your service → Connect → Outbound …"*.
6. Deploy. Then open `https://<your-service>.onrender.com/api/docs`.

The data is already in Atlas if you ran `pnpm seed` locally with the same `MONGODB_URI`.

> **Free plan note:** the service sleeps after ~15 minutes without traffic. The first request after that takes ~30–60 s to wake up, so tell students not to panic about one slow request (and to show a loading state in React!).

---

Product images come from the free [dummyjson.com](https://dummyjson.com) image CDN.
