/**
 * =============================================================================
 * Payment Model
 * =============================================================================
 *
 * MongoDB collection helpers and index definitions for payments.
 *
 * TODO: Define indexes and helper methods when payment features are built.
 */

import { getDb } from '../db/connection.js';

export const COLLECTION_NAME = 'payments';

/**
 * Returns the payments collection.
 *
 * @returns {import('mongodb').Collection}
 */
export function getPaymentsCollection() {
  return getDb().collection(COLLECTION_NAME);
}

/**
 * Creates required indexes for the payments collection.
 */
export async function createPaymentIndexes() {
  const collection = getPaymentsCollection();
  await collection.createIndex({ userId: 1 });
  await collection.createIndex({ status: 1 });
  await collection.createIndex({ createdAt: -1 });
  // TODO: Add additional indexes as needed
}
