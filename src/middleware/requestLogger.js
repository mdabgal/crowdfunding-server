/**
 * =============================================================================
 * Request Logger Middleware
 * =============================================================================
 *
 * Logs every incoming HTTP request with method, URL, status code, and duration.
 * Useful for debugging and monitoring.
 */

import logger from '../utils/logger.js';

/**
 * Logs request details on response finish.
 */
export function requestLogger(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.originalUrl}`, {
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
    });
  });

  next();
}
