/**
 * =============================================================================
 * Better Auth Configuration
 * =============================================================================
 *
 * Configures Better Auth with:
 * - Email/Password authentication
 * - Google OAuth provider
 * - MongoDB as the persistence layer (official driver)
 *
 * The `auth` instance is used by middleware to protect routes and by the
 * auth route handler to process sign-up, sign-in, and OAuth callbacks.
 *
 * Docs: https://www.better-auth.com/docs
 */

import { betterAuth } from 'better-auth';
import { MongoClient } from 'mongodb';
import env from '../config/env.js';

/**
 * Initialize the Better Auth instance.
 * Uses its own MongoClient to keep auth storage independent of the app's
 * general-purpose database connection.
 */
export const auth = betterAuth({
  // Base URL for auth callbacks (e.g., OAuth redirect)
  baseURL: env.BETTER_AUTH_URL,

  // Secret used to sign tokens and cookies
  secret: env.BETTER_AUTH_SECRET,

  // ---------------------------------------------------------------------------
  // Database — MongoDB via the official driver
  // ---------------------------------------------------------------------------
  database: new MongoClient(env.MONGODB_URI),

  // ---------------------------------------------------------------------------
  // Email & Password authentication
  // ---------------------------------------------------------------------------
  emailAndPassword: {
    enabled: true,
  },

  // ---------------------------------------------------------------------------
  // User Model Schema Extensions
  // ---------------------------------------------------------------------------
  user: {
    modelName: 'users',
    additionalFields: {
      role: {
        type: 'string',
        required: true,
        defaultValue: 'supporter',
        input: true,
      },
      credits: {
        type: 'number',
        required: true,
        defaultValue: 0,
        input: true,
      },
      profileImage: {
        type: 'string',
        required: false,
        defaultValue: '',
        input: true,
      },
    },
  },

  // ---------------------------------------------------------------------------
  // Social / OAuth providers
  // ---------------------------------------------------------------------------
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },

  // ---------------------------------------------------------------------------
  // Trusted origins (for CORS / cookie domain validation)
  // ---------------------------------------------------------------------------
  trustedOrigins: [env.FRONTEND_URL],
});
