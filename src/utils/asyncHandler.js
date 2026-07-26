/**
 * =============================================================================
 * Async Handler Wrapper
 * =============================================================================
 *
 * Wraps async route handlers / controllers so that rejected promises are
 * automatically forwarded to Express's next(err) — no try/catch boilerplate.
 *
 * Usage:
 *   import { asyncHandler } from '../utils/asyncHandler.js';
 *
 *   router.get('/campaigns', asyncHandler(async (req, res) => {
 *     const campaigns = await campaignService.findAll();
 *     sendSuccess(res, 200, 'Campaigns fetched', campaigns);
 *   }));
 */

/**
 * @param {Function} fn - Async Express route handler (req, res, next) => Promise
 * @returns {Function} Express-compatible middleware that catches promise rejections
 */
export function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
