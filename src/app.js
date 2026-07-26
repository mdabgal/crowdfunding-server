/**
 * =============================================================================
 * Express Application
 * =============================================================================
 *
 * Configures the Express app with all middleware, routes, and error handlers.
 * This module exports the configured app instance — it does NOT start the
 * server. Server startup is handled by server.js, which allows the app to be
 * imported independently for testing.
 *
 * Middleware order:
 * 1. CORS
 * 2. Cookie parser
 * 3. JSON body parser
 * 4. URL-encoded body parser
 * 5. Request logger
 * 6. Better Auth handler (catch-all for /api/auth/*)
 * 7. API v1 routes (/api/v1/*)
 * 8. 404 handler
 * 9. Centralized error handler
 */

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { toNodeHandler } from 'better-auth/node';

import corsOptions from './config/cors.js';
import { auth } from './auth/auth.js';
import v1Routes from './routes/index.js';
import { requestLogger, notFoundHandler, errorHandler } from './middleware/index.js';

const app = express();

// =============================================================================
// Global Middleware
// =============================================================================

// Enable CORS with configured options
app.use(cors(corsOptions));

// Parse cookies (required for Better Auth session cookies)
app.use(cookieParser());

// Parse JSON request bodies
app.use(express.json({ limit: '10mb' }));

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Log every incoming request
app.use(requestLogger);

// =============================================================================
// Better Auth — catch-all handler
// =============================================================================
// Better Auth manages its own routes under /api/auth/*.
// This MUST be mounted before the versioned API routes so that auth requests
// (sign-up, sign-in, OAuth callbacks, session management) are handled first.
app.all('/api/auth/{*splat}', toNodeHandler(auth));

// =============================================================================
// API Routes
// =============================================================================
app.use('/api/v1', v1Routes);

// =============================================================================
// Error Handling
// =============================================================================

// Catch any request that didn't match a route
app.use(notFoundHandler);

// Centralized error handler — must be last
app.use(errorHandler);

export default app;
