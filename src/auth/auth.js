/**
 * =============================================================================
 * Better Auth Configuration
 * =============================================================================
 *
 * Configures Better Auth with:
 * - Email/Password authentication
 * - Google OAuth provider
 * - MongoDB as the persistence layer (official driver + mongodbAdapter)
 *
 * The `auth` instance is used by middleware to protect routes and by the
 * auth route handler to process sign-up, sign-in, and OAuth callbacks.
 *
 * Docs: https://www.better-auth.com/docs/adapters/mongodb
 */

import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MongoClient } from 'mongodb';
import env from '../config/env.js';

/**
 * Dedicated MongoClient for Better Auth storage.
 * Kept separate from the app's general-purpose connection so that auth
 * data is isolated and the client lifecycle is self-contained.
 * The MongoDB Node.js driver (v4+) auto-connects on the first operation,
 * so explicit .connect() is not required here.
 */
const authClient = new MongoClient(env.MONGODB_URI);

/**
 * Initialize the Better Auth instance.
 */
export const auth = betterAuth({
  // Base URL for auth callbacks (e.g., OAuth redirect)
  baseURL: env.BETTER_AUTH_URL,

  // Secret used to sign tokens and cookies
  secret: env.BETTER_AUTH_SECRET,

  // ---------------------------------------------------------------------------
  // Database — MongoDB via the official adapter
  // ---------------------------------------------------------------------------
  database: mongodbAdapter(authClient.db(), {
    // Pass the MongoClient so the adapter can use transactions when needed
    client: authClient,
  }),

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
