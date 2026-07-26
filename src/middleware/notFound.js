/**
 * =============================================================================
 * 404 Not Found Handler
 * =============================================================================
 *
 * Catches any request that didn't match a defined route and returns a
 * structured 404 response. Must be registered AFTER all routes but BEFORE
 * the centralized error handler.
 */

import { HTTP_STATUS } from '../constants/httpStatus.js';
import { sendError } from '../utils/apiResponse.js';

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export function notFoundHandler(req, res) {
  sendError(
    res,
    HTTP_STATUS.NOT_FOUND,
    `Route not found: ${req.method} ${req.originalUrl}`,
  );
}
