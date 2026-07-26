/**
 * =============================================================================
 * Authentication Routes
 * =============================================================================
 *
 * All Better Auth routes are handled automatically via the catch-all handler
 * in app.js. This router is reserved for any custom auth-related endpoints
 * (e.g., custom profile enrichment on sign-up, role assignment, etc.).
 *
 * TODO: Add custom auth endpoints as needed.
 */

import { Router } from 'express';
import { register, login, logout, me } from '../controllers/auth.controller.js';
import { authenticate, validate } from '../middleware/index.js';
import { signUpValidator, signInValidator } from '../validators/auth.validator.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.post('/register', validate(signUpValidator), asyncHandler(register));
router.post('/login', validate(signInValidator), asyncHandler(login));
router.post('/logout', asyncHandler(logout));
router.get('/me', authenticate, asyncHandler(me));

export default router;
