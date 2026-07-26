/**
 * =============================================================================
 * Server Entry Point
 * =============================================================================
 *
 * Bootstraps the application:
 * 1. Connects to MongoDB
 * 2. Starts the Express HTTP server
 * 3. Registers graceful shutdown handlers
 *
 * This is the file executed by `node src/server.js` or `nodemon src/server.js`.
 */

import app from './app.js';
import env from './config/env.js';
import { connectDB, disconnectDB } from './db/connection.js';
import { createUserIndexes } from './models/user.model.js';
import logger from './utils/logger.js';

/**
 * Starts the application server.
 */
async function startServer() {
  try {
    // ── 1. Connect to MongoDB ─────────────────────────────────────────────
    await connectDB();
    await createUserIndexes();

    // ── 2. Start HTTP server ──────────────────────────────────────────────
    const server = app.listen(env.PORT, () => {
      logger.info(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
      logger.info(`Health check: http://localhost:${env.PORT}/api/v1/health`);
      logger.info(`Better Auth:  http://localhost:${env.PORT}/api/auth`);
    });

    // ── 3. Graceful shutdown ──────────────────────────────────────────────
    const shutdown = async (signal) => {
      logger.info(`${signal} received — shutting down gracefully`);

      server.close(async () => {
        logger.info('HTTP server closed');
        await disconnectDB();
        process.exit(0);
      });

      // Force exit if graceful shutdown takes too long (10 seconds)
      setTimeout(() => {
        logger.error('Forced shutdown — graceful shutdown timed out');
        process.exit(1);
      }, 10_000);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

    // Catch unhandled rejections and uncaught exceptions
    process.on('unhandledRejection', (reason) => {
      logger.error('Unhandled Rejection', { reason: String(reason) });
    });

    process.on('uncaughtException', (error) => {
      logger.error('Uncaught Exception', { error: error.message, stack: error.stack });
      process.exit(1);
    });
  } catch (error) {
    logger.error('Failed to start server', { error: error.message });
    process.exit(1);
  }
}

startServer();
