/**
 * =============================================================================
 * Campaign Controller
 * =============================================================================
 *
 * Handles campaign HTTP requests for retrieving campaign listings and single campaign details.
 */

import { HTTP_STATUS } from '../constants/httpStatus.js';
import { sendSuccess } from '../utils/apiResponse.js';
import * as campaignService from '../services/campaign.service.js';

/**
 * Controller to handle GET /api/v1/campaigns
 *
 * Supports pagination, title search, category filter, and sorting.
 *
 * @type {import('express').RequestHandler}
 */
export async function getCampaigns(req, res) {
  const result = await campaignService.getCampaigns(req.query);

  return sendSuccess(
    res,
    HTTP_STATUS.OK,
    'Campaigns retrieved successfully',
    result,
  );
}

/**
 * Controller to handle GET /api/v1/campaigns/:id
 *
 * Fetches single campaign details by ID.
 *
 * @type {import('express').RequestHandler}
 */
export async function getCampaignById(req, res) {
  const { id } = req.params;
  const campaign = await campaignService.getCampaignById(id);

  return sendSuccess(
    res,
    HTTP_STATUS.OK,
    'Campaign retrieved successfully',
    { campaign },
  );
}
