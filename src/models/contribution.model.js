/**
 * =============================================================================
 * Contribution Model
 * =============================================================================
 *
 * MongoDB collection helpers and index definitions for contributions.
 *
 * TODO: Define indexes and helper methods when contribution features are built.
 */

import { getDb } from '../db/connection.js';

export const COLLECTION_NAME = 'contributions';

/**
 * Returns the contributions collection.
 *
 * @returns {import('mongodb').Collection}
 */
export function getContributionsCollection() {
  return getDb().collection(COLLECTION_NAME);
}

/**
 * Creates required indexes for the contributions collection.
 */
export async function createContributionIndexes() {
  const collection = getContributionsCollection();
  await collection.createIndex({ campaignId: 1 });
  await collection.createIndex({ userId: 1 });
  await collection.createIndex({ createdAt: -1 });
  // TODO: Add additional indexes as needed
}
