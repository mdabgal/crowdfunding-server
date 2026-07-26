/**
 * =============================================================================
 * API Response Utility
 * =============================================================================
 *
 * Provides a consistent shape for all API responses. Every controller should
 * use these helpers instead of calling res.json() directly — this guarantees
 * the frontend always receives { success, statusCode, message, data }.
 *
 * Usage:
 *   import { sendSuccess, sendError } from '../utils/apiResponse.js';
 *
 *   // Success
 *   sendSuccess(res, HTTP_STATUS.OK, 'Users fetched', { users });
 *
 *   // Error (or throw an ApiError to let the global error handler respond)
 *   sendError(res, HTTP_STATUS.BAD_REQUEST, 'Validation failed', errors);
 */

/**
 * Send a standardized success response.
 *
 * @param {import('express').Response} res - Express response object
 * @param {number} statusCode - HTTP status code (2xx)
 * @param {string} message - Human-readable success message
 * @param {*} [data=null] - Response payload
 */
export function sendSuccess(res, statusCode, message, data = null) {
  return res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    data,
  });
}

/**
 * Send a standardized error response.
 *
 * @param {import('express').Response} res - Express response object
 * @param {number} statusCode - HTTP status code (4xx / 5xx)
 * @param {string} message - Human-readable error message
 * @param {*} [errors=null] - Validation errors or additional error details
 */
export function sendError(res, statusCode, message, errors = null) {
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors,
  });
}
