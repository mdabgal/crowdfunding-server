/**
 * =============================================================================
 * Campaign Validators
 * =============================================================================
 *
 * Validation functions for campaign-related requests.
 *
 * TODO: Implement validation logic when campaign endpoints are built.
 */

/**
 * Validates the create campaign request body.
 *
 * @param {import('express').Request} req
 * @returns {{ field: string, message: string }[]}
 */
export function createCampaignValidator(req) {
  const errors = [];

  // TODO: Validate title, description, goal, deadline, etc.

  return errors;
}

/**
 * Validates the update campaign request body.
 *
 * @param {import('express').Request} req
 * @returns {{ field: string, message: string }[]}
 */
export function updateCampaignValidator(req) {
  const errors = [];

  // TODO: Validate updatable campaign fields

  return errors;
}
