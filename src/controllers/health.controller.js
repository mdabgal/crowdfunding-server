/**
 * =============================================================================
 * Health Check Controller
 * =============================================================================
 */

import { HTTP_STATUS } from '../constants/httpStatus.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { getDb } from '../db/connection.js';

/**
 * GET /api/v1/health
 * Returns server and database health status.
 */
export async function getHealth(req, res) {
  let dbStatus = 'disconnected';

  try {
    const db = getDb();
    await db.command({ ping: 1 });
    dbStatus = 'connected';
  } catch {
    dbStatus = 'error';
  }

  sendSuccess(res, HTTP_STATUS.OK, 'Server is healthy', {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`,
    environment: process.env.NODE_ENV,
    database: dbStatus,
  });
}
