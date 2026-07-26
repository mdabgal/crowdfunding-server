/**
 * =============================================================================
 * Middleware Barrel Export
 * =============================================================================
 *
 * Re-exports all middleware from a single entry point for clean imports.
 *
 * Usage:
 *   import { authenticate, authorize, validate, errorHandler } from '../middleware/index.js';
 */

export { authenticate } from './authenticate.js';
export { authorize, isAdmin, isCreator, isSupporter } from './authorize.js';
export { validate } from './validate.js';
export { errorHandler } from './errorHandler.js';
export { notFoundHandler } from './notFound.js';
export { requestLogger } from './requestLogger.js';
