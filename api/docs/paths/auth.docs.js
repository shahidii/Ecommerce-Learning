/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Create a new account
 *     description: Registers a user and returns a JWT so the user is logged in straight away.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/SignupRequest' }
 *     responses:
 *       201:
 *         description: Account created
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/AuthResponse' }
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 *             examples:
 *               MissingName:
 *                 value: { success: false, error: { code: VALIDATION_ERROR, message: "Name is required", field: name, details: [{ field: name, message: "Name is required" }] } }
 *               WeakPassword:
 *                 value: { success: false, error: { code: VALIDATION_ERROR, message: "Password must contain at least one letter and one number", field: password } }
 *       409:
 *         description: Email already registered
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 *             example: { success: false, error: { code: EMAIL_EXISTS, message: "An account with this email already exists", field: email } }
 *
 * /auth/login:
 *   post:
 *     summary: Log in
 *     description: |
 *       Returns the user and a JWT `token`.
 *       Save the token (e.g. in localStorage) and send it on protected requests as
 *       `Authorization: Bearer <token>`.
 *
 *       Demo accounts — customer: `demo@shopnest.dev` / `Demo@1234`, admin: `admin@shopnest.dev` / `Admin@1234`
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/LoginRequest' }
 *     responses:
 *       200:
 *         description: Logged in
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/AuthResponse' }
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 *             example: { success: false, error: { code: VALIDATION_ERROR, message: "Please enter a valid email address", field: email } }
 *       401:
 *         description: Wrong email or password
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 *             example: { success: false, error: { code: INVALID_CREDENTIALS, message: "Invalid email or password", field: null } }
 *
 * /auth/me:
 *   get:
 *     summary: Get the logged-in user
 *     description: Use this on app load to check whether the saved token is still valid.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Current user fetched successfully" }
 *                 data:
 *                   type: object
 *                   properties:
 *                     user: { $ref: '#/components/schemas/User' }
 *       401:
 *         description: Missing, invalid or expired token
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 *             examples:
 *               NoToken:
 *                 value: { success: false, error: { code: NO_TOKEN, message: "Authentication required. Please log in.", field: null } }
 *               Expired:
 *                 value: { success: false, error: { code: TOKEN_EXPIRED, message: "Session expired. Please log in again.", field: null } }
 *               Invalid:
 *                 value: { success: false, error: { code: INVALID_TOKEN, message: "Invalid token. Please log in again.", field: null } }
 */
