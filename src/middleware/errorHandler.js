/**
 * =============================================================================
 * Centralized Error Handler Middleware
 * =============================================================================
 *
 * This is the single point where all errors are caught, logged, and returned
 * to the client in a consistent format. It must be registered LAST in the
 * Express middleware chain (after all routes).
 *
 * Handles:
 * - ApiError instances → returns the attached status & message
 * - Unexpected errors  → returns 500 with a generic message (details are logged,
 *                         never leaked to the client in production)
 */

import { HTTP_STATUS } from '../constants/httpStatus.js';
import { sendError } from '../utils/apiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import logger from '../utils/logger.js';
import env from '../config/env.js';

/**
 * Express error-handling middleware (4-argument signature).
 */
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, _next) {
  // Log every error — stack traces in development only
  logger.error(err.message, {
    statusCode: err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR,
    path: req.originalUrl,
    method: req.method,
    ...(env.isDevelopment && { stack: err.stack }),
  });

  // Known operational errors (thrown via `new ApiError(...)`)
  if (err instanceof ApiError) {
    return sendError(res, err.statusCode, err.message, err.errors);
  }

  // Unexpected / programmer errors — never leak internals in production
  const statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = env.isProduction
    ? 'An unexpected error occurred'
    : err.message || 'Internal Server Error';

  return sendError(res, statusCode, message);
}
