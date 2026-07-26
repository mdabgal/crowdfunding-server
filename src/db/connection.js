/**
 * =============================================================================
 * MongoDB Connection Module
 * =============================================================================
 *
 * Manages a singleton MongoDB client connection using the official driver.
 * Provides getDb() to access the default database from any module.
 *
 * Usage:
 *   import { connectDB, getDb } from './db/connection.js';
 *
 *   await connectDB();                // Call once at startup
 *   const db = getDb();               // Use anywhere after connection
 *   const users = db.collection('users');
 */

import { MongoClient } from 'mongodb';
import env from '../config/env.js';
import logger from '../utils/logger.js';

/** @type {MongoClient|null} */
let client = null;

/** @type {import('mongodb').Db|null} */
let db = null;

/**
 * Establish a connection to MongoDB.
 * Safe to call multiple times — subsequent calls return the existing connection.
 *
 * @returns {Promise<import('mongodb').Db>} The connected database instance
 */
export async function connectDB() {
  if (db) return db;

  try {
    client = new MongoClient(env.MONGODB_URI);
    await client.connect();

    // Extract the database name from the URI, or fall back to 'crowdfunding'
    db = client.db();

    logger.info('MongoDB connected successfully', {
      database: db.databaseName,
    });

    return db;
  } catch (error) {
    logger.error('MongoDB connection failed', { error: error.message });
    process.exit(1);
  }
}

/**
 * Returns the active database instance.
 * Throws if connectDB() has not been called.
 *
 * @returns {import('mongodb').Db}
 */
export function getDb() {
  if (!db) {
    throw new Error(
      'Database not initialized. Call connectDB() before accessing the database.',
    );
  }
  return db;
}

/**
 * Returns the active MongoClient instance.
 * Useful when Better Auth or other libraries need the raw client.
 *
 * @returns {MongoClient}
 */
export function getClient() {
  if (!client) {
    throw new Error(
      'MongoClient not initialized. Call connectDB() before accessing the client.',
    );
  }
  return client;
}

/**
 * Gracefully close the MongoDB connection.
 * Called during shutdown to prevent connection leaks.
 */
export async function disconnectDB() {
  if (client) {
    await client.close();
    client = null;
    db = null;
    logger.info('MongoDB connection closed');
  }
}
