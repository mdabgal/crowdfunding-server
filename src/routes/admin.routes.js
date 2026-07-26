/**
 * =============================================================================
 * Admin Routes
 * =============================================================================
 *
 * Endpoints for platform administration.
 * All routes in this module require admin-level authorization.
 *
 * TODO: Wire controller methods when admin features are built.
 *
 * Planned routes:
 *   GET    /api/v1/admin/dashboard       → Admin dashboard stats
 *   GET    /api/v1/admin/users           → Manage users
 *   GET    /api/v1/admin/campaigns       → Manage campaigns
 *   GET    /api/v1/admin/withdrawals     → Manage withdrawals
 */

import { Router } from 'express';

const router = Router();

// All admin routes should use:
//   authenticate, authorize(USER_ROLES.ADMIN)

// Routes will be defined here

export default router;
