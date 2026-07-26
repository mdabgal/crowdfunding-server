/**
 * =============================================================================
 * CORS Configuration
 * =============================================================================
 *
 * Defines the CORS policy for the application.
 * Allows the configured frontend origin and exposes necessary headers
 * for cookie-based authentication via Better Auth.
 */

import env from './env.js';

const corsOptions = {
  // Allow requests from the frontend origin
  origin: env.FRONTEND_URL,

  // Allow credentials (cookies, authorization headers)
  credentials: true,

  // Allowed HTTP methods
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],

  // Headers the client is allowed to send
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
  ],

  // Headers exposed to the client
  exposedHeaders: ['Set-Cookie'],

  // Preflight cache duration (in seconds) — 10 minutes
  maxAge: 600,
};

export default corsOptions;
