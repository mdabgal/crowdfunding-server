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
  await collection.createIndex({ category: 1 });
  await collection.createIndex({ createdAt: -1 });
  await collection.createIndex({ deadline: 1 });
  await collection.createIndex({ goalAmount: 1 });
  await collection.createIndex({ title: 1 });
  await collection.createIndex({ title: 'text' });
}

