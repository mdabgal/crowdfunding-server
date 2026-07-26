/**
 * =============================================================================
 * Role-Based Authorization Middleware
 * =============================================================================
 *
 * Restricts access to routes based on user roles.
 * Must be used AFTER the `authenticate` middleware so that `req.user` exists.
 *
 * Usage:
 *   import { authorize } from '../middleware/authorize.js';
 *   import { USER_ROLES } from '../constants/index.js';
 *
 *   router.delete(
 *     '/campaigns/:id',
 *     authenticate,
 *     authorize(USER_ROLES.ADMIN),
 *     campaignController.deleteCampaign,
 *   );
 *
 *   // Multiple allowed roles:
 *   authorize(USER_ROLES.ADMIN, USER_ROLES.MODERATOR)
 */

import { HTTP_STATUS } from '../constants/httpStatus.js';
import { ApiError } from '../utils/ApiError.js';

/**
 * Returns middleware that checks if the authenticated user has one of the
 * specified roles.
 *
 * @param {...string} allowedRoles - Roles permitted to access the route
 * @returns {import('express').RequestHandler}
 */
export function authorize(...allowedRoles) {
  return (req, _res, next) => {
    // Guard: authenticate middleware must run first
    if (!req.user) {
      return next(
        new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Authentication required'),
      );
    }

    const userRole = req.user.role || 'user';

    if (!allowedRoles.includes(userRole)) {
      return next(
        new ApiError(
          HTTP_STATUS.FORBIDDEN,
          'You do not have permission to access this resource',
        ),
      );
    }

    next();
  };
}

export const isAdmin = authorize('admin');
export const isCreator = authorize('creator');
export const isSupporter = authorize('supporter');
