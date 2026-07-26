/**
 * =============================================================================
 * User Model
 * =============================================================================
 *
 * Defines the MongoDB collection name, indexes, and schema shape for users.
 * Since we use the official MongoDB driver (not Mongoose), "models" serve as
 * documentation and provide helper functions for collection access.
 *
 * Note: Better Auth manages its own user collection. This model is for any
 * extended user profile data stored separately.
 *
 * TODO: Define indexes and helper methods when user features are built.
 */

import { getDb } from '../db/connection.js';

export const COLLECTION_NAME = 'users';

/**
 * Returns the users collection.
 *
 * @returns {import('mongodb').Collection}
 */
export function getUsersCollection() {
  return getDb().collection(COLLECTION_NAME);
}

/**
 * Creates required indexes for the users collection.
 * Call once during application startup.
 */
export async function createUserIndexes() {
  const collection = getUsersCollection();
  await collection.createIndex({ email: 1 }, { unique: true });
  // TODO: Add additional indexes as needed
}
