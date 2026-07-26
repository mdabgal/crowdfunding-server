/**
 * =============================================================================
 * Custom API Error
 * =============================================================================
 *
 * Throwable error class that carries an HTTP status code.
 * The centralized error handler in middleware/errorHandler.js catches these
 * and returns a well-structured JSON response to the client.
 *
 * Usage:
 *   throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Campaign not found');
 */

export class ApiError extends Error {
  /**
   * @param {number} statusCode - HTTP status code
   * @param {string} message - Error message
   * @param {*} [errors=null] - Additional error details (e.g., validation errors)
   */
  constructor(statusCode, message, errors = null) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errors = errors;

    // Capture a clean stack trace (excluding the constructor frame)
    Error.captureStackTrace(this, this.constructor);
  }
}
