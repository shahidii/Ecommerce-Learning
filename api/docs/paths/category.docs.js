/**
 * @swagger
 * /categories:
 *   get:
 *     summary: List all categories
 *     description: Use for the category menu / chips on the Home and Products pages. Each item includes `productCount`.
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: All categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Categories fetched successfully" }
 *                 data:
 *                   type: object
 *                   properties:
 *                     categories: { type: array, items: { $ref: '#/components/schemas/Category' } }
 *
 * /categories/{slug}:
 *   get:
 *     summary: Get one category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema: { type: string, example: feeding-essentials }
 *     responses:
 *       200:
 *         description: Category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Category fetched successfully" }
 *                 data:
 *                   type: object
 *                   properties:
 *                     category: { $ref: '#/components/schemas/Category' }
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 *             example: { success: false, error: { code: CATEGORY_NOT_FOUND, message: "Category \"abc\" not found", field: null } }
 *
 * /categories/{slug}/products:
 *   get:
 *     summary: Products in a category
 *     description: Same filters, sorting and pagination as `GET /products`.
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema: { type: string, example: feeding-essentials }
 *       - $ref: '#/components/parameters/page'
 *       - $ref: '#/components/parameters/limit'
 *       - $ref: '#/components/parameters/ageGroup'
 *       - $ref: '#/components/parameters/minPrice'
 *       - $ref: '#/components/parameters/maxPrice'
 *       - $ref: '#/components/parameters/sort'
 *     responses:
 *       200:
 *         description: Category with its products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Products in Feeding Essentials fetched successfully" }
 *                 data:
 *                   type: object
 *                   properties:
 *                     category: { $ref: '#/components/schemas/Category' }
 *                     products: { type: array, items: { $ref: '#/components/schemas/Product' } }
 *                 meta: { $ref: '#/components/schemas/PaginationMeta' }
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 */
