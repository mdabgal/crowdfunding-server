/**
 * =============================================================================
 * Request Validation Middleware
 * =============================================================================
 *
 * Generic validation middleware factory. Accepts a validation function and
 * returns Express middleware that validates the request body (or params/query).
 *
 * Validation functions should return an array of error objects — an empty array
 * means the data is valid.
 *
 * Usage:
 *   import { validate } from '../middleware/validate.js';
 *   import { createCampaignValidator } from '../validators/campaign.validator.js';
 *
 *   router.post('/campaigns', validate(createCampaignValidator), controller.create);
 */

import { HTTP_STATUS } from '../constants/httpStatus.js';
import { ApiError } from '../utils/ApiError.js';

/**
 * Creates validation middleware from a validator function.
 *
 * @param {Function} validatorFn - (req) => { field, message }[]
 * @returns {import('express').RequestHandler}
 */
export function validate(validatorFn) {
  return (req, _res, next) => {
    const errors = validatorFn(req);

    if (errors && errors.length > 0) {
      return next(
        new ApiError(HTTP_STATUS.UNPROCESSABLE_ENTITY, 'Validation failed', errors),
      );
    }

    next();
  };
}
