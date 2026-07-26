/**
 * =============================================================================
 * Authentication Middleware
 * =============================================================================
 *
 * Verifies that the incoming request carries a valid Better Auth session.
 * Attaches the authenticated user to `req.user` for downstream handlers.
 *
 * Usage:
 *   import { authenticate } from '../middleware/authenticate.js';
 *   router.get('/profile', authenticate, profileController.getProfile);
 */

import { auth } from '../auth/auth.js';
import { fromNodeHeaders } from 'better-auth/node';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { ApiError } from '../utils/ApiError.js';

/**
 * Express middleware that validates the Better Auth session.
 * Throws a 401 ApiError if the session is missing or invalid.
 */
export async function authenticate(req, _res, next) {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session || !session.user) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Authentication required');
    }

    // Attach user and session to the request object
    req.user = session.user;
    req.session = session.session;

    next();
  } catch (error) {
    // Re-throw ApiErrors as-is; wrap unexpected errors
    if (error instanceof ApiError) {
      return next(error);
    }
    next(new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Authentication failed'));
  }
}
