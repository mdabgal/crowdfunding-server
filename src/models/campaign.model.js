/**
 * =============================================================================
 * Campaign Model
 * =============================================================================
 *
 * MongoDB collection helpers and index definitions for campaigns.
 *
 * TODO: Define indexes and helper methods when campaign features are built.
 */

import { getDb } from '../db/connection.js';

export const COLLECTION_NAME = 'campaigns';

/**
 * Returns the campaigns collection.
 *
 * @returns {import('mongodb').Collection}
 */
export function getCampaignsCollection() {
  return getDb().collection(COLLECTION_NAME);
}

/**
 * Creates required indexes for the campaigns collection.
 */
export async function createCampaignIndexes() {
  const collection = getCampaignsCollection();
  await collection.createIndex({ status: 1 });
  await collection.createIndex({ createdBy: 1 });
  await collection.createIndex({ createdAt: -1 });
  // TODO: Add additional indexes (e.g., text search on title/description)
}
