/**
 * @swagger
 * /age-groups:
 *   get:
 *     summary: List all age groups
 *     description: |
 *       Powers the **Shop by Age** cards on the Home page: Newborn (0–3 Months), Infant (3–12 Months),
 *       Toddler (1–3 Years), Preschool (3–5 Years). Sorted youngest first; each item includes `productCount`.
 *     tags: [Age Groups]
 *     responses:
 *       200:
 *         description: All age groups
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Age groups fetched successfully" }
 *                 data:
 *                   type: object
 *                   properties:
 *                     ageGroups: { type: array, items: { $ref: '#/components/schemas/AgeGroup' } }
 *
 * /age-groups/{slug}:
 *   get:
 *     summary: Get one age group
 *     tags: [Age Groups]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema: { type: string, enum: [newborn, infant, toddler, preschool], example: toddler }
 *     responses:
 *       200:
 *         description: Age group
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Age group fetched successfully" }
 *                 data:
 *                   type: object
 *                   properties:
 *                     ageGroup: { $ref: '#/components/schemas/AgeGroup' }
 *       404:
 *         description: Age group not found
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 *             example: { success: false, error: { code: AGE_GROUP_NOT_FOUND, message: "Age group \"teen\" not found", field: null } }
 *
 * /age-groups/{slug}/products:
 *   get:
 *     summary: Products for an age group
 *     description: |
 *       Same filters, sorting and pagination as `GET /products`.
 *       Example: `/age-groups/newborn/products?category=feeding-essentials&sort=price_asc`
 *     tags: [Age Groups]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema: { type: string, enum: [newborn, infant, toddler, preschool], example: newborn }
 *       - $ref: '#/components/parameters/page'
 *       - $ref: '#/components/parameters/limit'
 *       - $ref: '#/components/parameters/category'
 *       - $ref: '#/components/parameters/minPrice'
 *       - $ref: '#/components/parameters/maxPrice'
 *       - $ref: '#/components/parameters/sort'
 *     responses:
 *       200:
 *         description: Age group with its products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Products for Newborn (0–3 Months) fetched successfully" }
 *                 data:
 *                   type: object
 *                   properties:
 *                     ageGroup: { $ref: '#/components/schemas/AgeGroup' }
 *                     products: { type: array, items: { $ref: '#/components/schemas/Product' } }
 *                 meta: { $ref: '#/components/schemas/PaginationMeta' }
 *       404:
 *         description: Age group not found
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 */
