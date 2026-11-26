/**
 * @swagger
 * components:
 *   parameters:
 *     page:
 *       in: query
 *       name: page
 *       schema: { type: integer, minimum: 1, default: 1 }
 *       description: Page number
 *     limit:
 *       in: query
 *       name: limit
 *       schema: { type: integer, minimum: 1, maximum: 50, default: 12 }
 *       description: Items per page
 *     sort:
 *       in: query
 *       name: sort
 *       schema:
 *         type: string
 *         enum: [newest, oldest, price_asc, price_desc, rating, popular, title_asc, title_desc, discount]
 *         default: newest
 *     category:
 *       in: query
 *       name: category
 *       schema: { type: string, example: smartphones }
 *       description: Category slug (from GET /categories)
 *     brand:
 *       in: query
 *       name: brand
 *       schema: { type: string, example: "Nexa,Orbit" }
 *       description: One brand or a comma separated list (case-insensitive)
 *     minPrice:
 *       in: query
 *       name: minPrice
 *       schema: { type: number, example: 1000 }
 *     maxPrice:
 *       in: query
 *       name: maxPrice
 *       schema: { type: number, example: 50000 }
 *     minRating:
 *       in: query
 *       name: minRating
 *       schema: { type: number, minimum: 0, maximum: 5, example: 4 }
 *     inStock:
 *       in: query
 *       name: inStock
 *       schema: { type: string, enum: ["true", "false"] }
 *     featured:
 *       in: query
 *       name: featured
 *       schema: { type: string, enum: ["true", "false"] }
 *       description: "featured=true → products for the home page hero / featured section"
 *     productId:
 *       in: path
 *       name: id
 *       required: true
 *       schema: { type: string, example: "6745a1f0c2b3d4e5f6a7b8d2" }
 *       description: Product id (copy one from GET /products)
 *   responses:
 *     ProductList:
 *       description: Paginated list of products
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success: { type: boolean, example: true }
 *               message: { type: string, example: "Products fetched successfully" }
 *               data:
 *                 type: object
 *                 properties:
 *                   products: { type: array, items: { $ref: '#/components/schemas/Product' } }
 *               meta: { $ref: '#/components/schemas/PaginationMeta' }
 *     SingleProduct:
 *       description: One product
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success: { type: boolean, example: true }
 *               message: { type: string, example: "Product fetched successfully" }
 *               data:
 *                 type: object
 *                 properties:
 *                   product: { $ref: '#/components/schemas/Product' }
 *     ValidationError:
 *       description: Invalid input
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Error' }
 *           example: { success: false, error: { code: VALIDATION_ERROR, message: "limit must be a whole number between 1 and 50", field: limit } }
 *     ProductNotFound:
 *       description: Product not found
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Error' }
 *           example: { success: false, error: { code: PRODUCT_NOT_FOUND, message: "Product not found", field: null } }
 *     InvalidId:
 *       description: Not a valid id
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Error' }
 *           example: { success: false, error: { code: INVALID_ID, message: "\"123\" is not a valid product id", field: id } }
 *     Unauthorized:
 *       description: Not logged in
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Error' }
 *           example: { success: false, error: { code: NO_TOKEN, message: "Authentication required. Please log in.", field: null } }
 *     Forbidden:
 *       description: Logged in, but not an admin
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Error' }
 *           example: { success: false, error: { code: FORBIDDEN, message: "You do not have permission to perform this action.", field: null } }
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: List products (pagination, filters, sorting)
 *     description: |
 *       Main endpoint for the **Products page** and **Home page**.
 *
 *       Examples:
 *       - `/products?page=2&limit=12`
 *       - `/products?category=laptops&sort=price_asc`
 *       - `/products?minPrice=1000&maxPrice=5000&minRating=4`
 *       - `/products?featured=true&limit=8` (home page)
 *       - `/products?search=shirt` (same as /products/search)
 *     tags: [Products]
 *     parameters:
 *       - $ref: '#/components/parameters/page'
 *       - $ref: '#/components/parameters/limit'
 *       - in: query
 *         name: search
 *         schema: { type: string, example: phone }
 *         description: Matches title, brand, tags or category name
 *       - $ref: '#/components/parameters/category'
 *       - $ref: '#/components/parameters/brand'
 *       - $ref: '#/components/parameters/minPrice'
 *       - $ref: '#/components/parameters/maxPrice'
 *       - $ref: '#/components/parameters/minRating'
 *       - $ref: '#/components/parameters/inStock'
 *       - $ref: '#/components/parameters/featured'
 *       - $ref: '#/components/parameters/sort'
 *     responses:
 *       200: { $ref: '#/components/responses/ProductList' }
 *       400: { $ref: '#/components/responses/ValidationError' }
 *       404:
 *         description: Unknown category slug
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 *             example: { success: false, error: { code: CATEGORY_NOT_FOUND, message: "Category \"abc\" not found", field: category } }
 *   post:
 *     summary: Create a product (admin)
 *     description: Log in as `admin@shopnest.dev` / `Admin@1234` and authorize with that token. The slug is generated from the title.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/ProductInput' }
 *     responses:
 *       201:
 *         description: Product created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Product created successfully" }
 *                 data:
 *                   type: object
 *                   properties:
 *                     product: { $ref: '#/components/schemas/Product' }
 *       400: { $ref: '#/components/responses/ValidationError' }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 *       403: { $ref: '#/components/responses/Forbidden' }
 *
 * /products/search:
 *   get:
 *     summary: Search products
 *     description: |
 *       Powers the **search bar**. Case-insensitive, partial matching on title, brand, tags and category name.
 *       Supports every filter and sort option from `GET /products`.
 *
 *       Tip: for live suggestions while typing, debounce the input (~300 ms) and call `?q=<text>&limit=5`.
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema: { type: string, example: shirt }
 *         description: Search text (1–100 characters)
 *       - $ref: '#/components/parameters/page'
 *       - $ref: '#/components/parameters/limit'
 *       - $ref: '#/components/parameters/category'
 *       - $ref: '#/components/parameters/minPrice'
 *       - $ref: '#/components/parameters/maxPrice'
 *       - $ref: '#/components/parameters/sort'
 *     responses:
 *       200:
 *         description: Search results (an empty array when nothing matches — still 200)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Found 3 product(s) for \"shirt\"" }
 *                 data:
 *                   type: object
 *                   properties:
 *                     query: { type: string, example: shirt }
 *                     products: { type: array, items: { $ref: '#/components/schemas/Product' } }
 *                 meta: { $ref: '#/components/schemas/PaginationMeta' }
 *       400:
 *         description: Missing q
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 *             example: { success: false, error: { code: VALIDATION_ERROR, message: "Search text (q) is required", field: q } }
 *
 * /products/slug/{slug}:
 *   get:
 *     summary: Get a product by slug
 *     description: For SEO-friendly URLs like `/product/nexa-13-pro-128-gb-graphite`.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema: { type: string, example: nexa-13-pro-128-gb-graphite }
 *     responses:
 *       200: { $ref: '#/components/responses/SingleProduct' }
 *       404: { $ref: '#/components/responses/ProductNotFound' }
 *
 * /products/{id}:
 *   get:
 *     summary: Get a product by id
 *     description: Powers the **Product detail page**.
 *     tags: [Products]
 *     parameters:
 *       - $ref: '#/components/parameters/productId'
 *     responses:
 *       200: { $ref: '#/components/responses/SingleProduct' }
 *       400: { $ref: '#/components/responses/InvalidId' }
 *       404: { $ref: '#/components/responses/ProductNotFound' }
 *   put:
 *     summary: Update a product (admin)
 *     description: Send only the fields you want to change.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/productId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/ProductInput' }
 *           example: { price: 1299, stock: 20 }
 *     responses:
 *       200: { $ref: '#/components/responses/SingleProduct' }
 *       400: { $ref: '#/components/responses/ValidationError' }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 *       403: { $ref: '#/components/responses/Forbidden' }
 *       404: { $ref: '#/components/responses/ProductNotFound' }
 *   delete:
 *     summary: Delete a product (admin)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/productId'
 *     responses:
 *       200:
 *         description: Deleted
 *         content:
 *           application/json:
 *             example: { success: true, message: "Product deleted successfully", data: { id: "6745a1f0c2b3d4e5f6a7b8d2" } }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 *       403: { $ref: '#/components/responses/Forbidden' }
 *       404: { $ref: '#/components/responses/ProductNotFound' }
 *
 * /products/{id}/related:
 *   get:
 *     summary: Related products
 *     description: Other products from the same category, highest rated first. Use for "You may also like" on the detail page.
 *     tags: [Products]
 *     parameters:
 *       - $ref: '#/components/parameters/productId'
 *       - in: query
 *         name: limit
 *         schema: { type: integer, minimum: 1, maximum: 12, default: 4 }
 *     responses:
 *       200:
 *         description: Related products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Related products fetched successfully" }
 *                 data:
 *                   type: object
 *                   properties:
 *                     products: { type: array, items: { $ref: '#/components/schemas/Product' } }
 *       400: { $ref: '#/components/responses/InvalidId' }
 *       404: { $ref: '#/components/responses/ProductNotFound' }
 */
