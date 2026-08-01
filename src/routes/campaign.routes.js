/**
 * =============================================================================
 * Campaign Routes
 * =============================================================================
 *
 * Endpoints for crowdfunding campaign operations.
 *
 * Mounted at /api/v1/campaigns in routes/index.js.
 *
 * Supported public endpoints:
 *   GET /api/v1/campaigns     → List campaigns with search, filter, pagination, sorting
 *   GET /api/v1/campaigns/:id → Get campaign details by ID
 */

import { Router } from 'express';
import { validate } from '../middleware/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import {
  getCampaignsValidator,
  getCampaignByIdValidator,
} from '../validators/campaign.validator.js';
import {
  getCampaigns,
  getCampaignById,
} from '../controllers/campaign.controller.js';

const router = Router();

// GET /api/v1/campaigns - Public listing with pagination, search, category filter, and sorting
router.get('/', validate(getCampaignsValidator), asyncHandler(getCampaigns));

// GET /api/v1/campaigns/:id - Public single campaign fetch by ID
router.get('/:id', validate(getCampaignByIdValidator), asyncHandler(getCampaignById));

export default router;
