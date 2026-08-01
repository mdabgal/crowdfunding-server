/**
 * =============================================================================
 * Campaign Validators
 * =============================================================================
 *
 * Validation functions for campaign-related requests.
 * Each validator receives the Express `req` object and returns an array
 * of error objects: `{ field, message }`. An empty array means valid.
 */

import { ObjectId } from 'mongodb';

/**
 * Validates query parameters for listing campaigns (GET /api/v1/campaigns).
 *
 * @param {import('express').Request} req
 * @returns {{ field: string, message: string }[]}
 */
export function getCampaignsValidator(req) {
  const errors = [];
  const { page, limit, sortBy, sort, sortOrder, order } = req.query || {};

  if (page !== undefined && page !== '') {
    const pageNum = Number(page);
    if (!Number.isInteger(pageNum) || pageNum < 1) {
      errors.push({ field: 'page', message: 'Page must be a positive integer greater than or equal to 1' });
    }
  }

  if (limit !== undefined && limit !== '') {
    const limitNum = Number(limit);
    if (!Number.isInteger(limitNum) || limitNum < 1 || limitNum > 100) {
      errors.push({ field: 'limit', message: 'Limit must be an integer between 1 and 100' });
    }
  }

  const effectiveSortBy = sortBy || sort;
  const allowedSortBy = [
    'newest',
    'oldest',
    'most_funded',
    'least_funded',
    'ending_soon',
    'deadline',
    'goalAmount',
    'raisedAmount',
    'createdAt',
    'goal',
    'raised',
  ];

  if (effectiveSortBy !== undefined && effectiveSortBy !== '') {
    if (typeof effectiveSortBy !== 'string' || !allowedSortBy.includes(effectiveSortBy.trim())) {
      errors.push({
        field: 'sortBy',
        message: `Sort field must be one of: ${allowedSortBy.join(', ')}`,
      });
    }
  }

  const effectiveOrder = sortOrder || order;
  if (effectiveOrder !== undefined && effectiveOrder !== '') {
    const allowedOrders = ['asc', 'desc', 'ASC', 'DESC', '1', '-1'];
    if (typeof effectiveOrder !== 'string' || !allowedOrders.includes(effectiveOrder.trim())) {
      errors.push({
        field: 'sortOrder',
        message: 'Sort order must be either asc or desc',
      });
    }
  }

  return errors;
}

/**
 * Validates request parameters for getting a campaign by ID (GET /api/v1/campaigns/:id).
 *
 * @param {import('express').Request} req
 * @returns {{ field: string, message: string }[]}
 */
export function getCampaignByIdValidator(req) {
  const errors = [];
  const { id } = req.params || {};

  if (!id || typeof id !== 'string' || !/^[0-9a-fA-F]{24}$/.test(id.trim()) || !ObjectId.isValid(id.trim())) {
    errors.push({ field: 'id', message: 'Invalid campaign ID format. Must be a 24-character hex ObjectId string.' });
  }

  return errors;
}

/**
 * Validates the create campaign request body (placeholder for future write endpoints).
 *
 * @param {import('express').Request} req
 * @returns {{ field: string, message: string }[]}
 */
export function createCampaignValidator(req) {
  const errors = [];
  return errors;
}

/**
 * Validates the update campaign request body (placeholder for future write endpoints).
 *
 * @param {import('express').Request} req
 * @returns {{ field: string, message: string }[]}
 */
export function updateCampaignValidator(req) {
  const errors = [];
  return errors;
}
