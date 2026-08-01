/**
 * =============================================================================
 * Campaign Service
 * =============================================================================
 *
 * Business logic for campaign operations, database queries, search, filtering,
 * pagination, and document formatting.
 */

import { ObjectId } from 'mongodb';
import { getCampaignsCollection } from '../models/campaign.model.js';
import { ApiError } from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

/**
 * Formats a raw MongoDB campaign document into a standard, clean campaign object.
 *
 * @param {import('mongodb').WithId<import('mongodb').Document>} doc
 * @returns {object}
 */
export function formatCampaign(doc) {
  if (!doc) return null;

  return {
    id: doc._id.toString(),
    _id: doc._id.toString(),
    title: doc.title || '',
    description: doc.description || '',
    image: doc.image || '',
    category: doc.category || '',
    goalAmount: typeof doc.goalAmount === 'number' ? doc.goalAmount : Number(doc.goalAmount || 0),
    raisedAmount: typeof doc.raisedAmount === 'number' ? doc.raisedAmount : Number(doc.raisedAmount || 0),
    deadline: doc.deadline ? new Date(doc.deadline).toISOString() : null,
    creatorId: doc.creatorId ? doc.creatorId.toString() : null,
    creatorName: doc.creatorName || '',
    createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : null,
    updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : null,
  };
}

/**
 * Fetches a paginated list of campaigns with optional title search, category filter, and sorting.
 *
 * @param {object} params
 * @param {number|string} [params.page=1] - Page number (1-indexed)
 * @param {number|string} [params.limit=8] - Number of items per page
 * @param {string} [params.search] - Search keyword for campaign title
 * @param {string} [params.title] - Alias for search
 * @param {string} [params.q] - Alias for search
 * @param {string} [params.category] - Category filter
 * @param {string} [params.sortBy='newest'] - Sort field ('newest', 'deadline', 'goalAmount')
 * @param {string} [params.sortOrder] - Sort direction ('asc', 'desc')
 * @param {string} [params.order] - Alias for sortOrder
 * @returns {Promise<{ campaigns: object[], pagination: object }>}
 */
export async function getCampaigns(params = {}) {
  const collection = getCampaignsCollection();

  const page = Math.max(1, parseInt(params.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(params.limit, 10) || 8));

  // Build filter query
  const filter = {};

  const searchTerm = (params.search || params.title || params.q || '').trim();
  if (searchTerm) {
    // Escape regex special characters for safe partial title search
    const escapedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    filter.title = { $regex: escapedTerm, $options: 'i' };
  }

  const category = (params.category || '').trim();
  if (category && category.toLowerCase() !== 'all') {
    // Case-insensitive exact category match
    filter.category = { $regex: `^${category}$`, $options: 'i' };
  }

  // Build sort options
  const sortBy = (params.sortBy || params.sort || 'newest').trim();
  const rawOrder = (params.sortOrder || params.order || '').trim().toLowerCase();

  let sort = {};
  let direction = rawOrder === 'asc' || rawOrder === '1' ? 1 : rawOrder === 'desc' || rawOrder === '-1' ? -1 : null;

  switch (sortBy) {
    case 'oldest':
      sort = { createdAt: direction !== null ? direction : 1 };
      break;

    case 'most_funded':
      sort = { raisedAmount: direction !== null ? direction : -1 };
      break;

    case 'least_funded':
      sort = { raisedAmount: direction !== null ? direction : 1 };
      break;

    case 'ending_soon':
    case 'deadline':
      // Default for deadline/ending_soon is upcoming deadline first (ascending order: 1)
      sort = { deadline: direction !== null ? direction : 1 };
      break;

    case 'goalAmount':
    case 'goal':
      sort = { goalAmount: direction !== null ? direction : -1 };
      break;

    case 'raisedAmount':
    case 'raised':
      sort = { raisedAmount: direction !== null ? direction : -1 };
      break;

    case 'newest':
    case 'createdAt':
    default:
      // Default for newest is newest created first (descending order: -1)
      sort = { createdAt: direction !== null ? direction : -1 };
      break;
  }

  const skip = (page - 1) * limit;

  const [totalItems, rawCampaigns] = await Promise.all([
    collection.countDocuments(filter),
    collection.find(filter).sort(sort).skip(skip).limit(limit).toArray(),
  ]);

  const totalPages = Math.ceil(totalItems / limit) || 0;

  return {
    campaigns: rawCampaigns.map(formatCampaign),
    pagination: {
      total: totalItems,
      totalItems,
      totalPages,
      currentPage: page,
      limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
}

/**
 * Fetches a single campaign by ID.
 *
 * @param {string} id - Campaign MongoDB ObjectId string
 * @returns {Promise<object>} The campaign object
 * @throws {ApiError} 404 if campaign is not found
 */
export async function getCampaignById(id) {
  const collection = getCampaignsCollection();

  let objectId;
  try {
    objectId = new ObjectId(id);
  } catch (_error) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Invalid campaign ID format');
  }

  const doc = await collection.findOne({ _id: objectId });

  if (!doc) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Campaign not found');
  }

  return formatCampaign(doc);
}
