/**
 * =============================================================================
 * Environment Configuration
 * =============================================================================
 *
 * Loads and validates environment variables.
 * All env access should go through this module — never read process.env directly
 * in application code. This provides a single source of truth and makes it easy
 * to add validation or defaults later.
 */

import 'dotenv/config';
import dns from 'node:dns';

// Fix for environments (like sandboxes or restricted local networks) 
// where the default DNS resolver fails to resolve SRV records.
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  // Gracefully fallback if dns.setServers is not supported
}

const env = Object.freeze({
  // Server
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT, 10) || 5000,

  // MongoDB
  MONGODB_URI: process.env.MONGODB_URI,

  // Better Auth
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || 'http://localhost:5000',

  // Google OAuth
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

  // Frontend
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',

  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',

  // Helpers
  get isDevelopment() {
    return this.NODE_ENV === 'development';
  },
  get isProduction() {
    return this.NODE_ENV === 'production';
  },
  get isTest() {
    return this.NODE_ENV === 'test';
  },
});

if (!env.MONGODB_URI) {
  throw new Error('Environment validation error: MONGODB_URI is required.');
}

export default env;
