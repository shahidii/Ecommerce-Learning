/**
 * @swagger
 * /:
 *   get:
 *     summary: API info
 *     description: Lists the available resources.
 *     tags: [General]
 *     responses:
 *       200:
 *         description: API info
 *
 * /health:
 *   get:
 *     summary: Health check
 *     description: Check that the server and database are up. Good first request in Postman.
 *     tags: [General]
 *     responses:
 *       200:
 *         description: Server is healthy
 *         content:
 *           application/json:
 *             example: { success: true, message: "API is healthy", data: { uptime: 42, database: "connected", timestamp: "2026-11-26T10:00:00.000Z" } }
 */
