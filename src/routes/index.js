/**
 * =============================================================================
 * API v1 Router
 * =============================================================================
 *
 * Aggregates all v1 route modules under a single router.
 * Mounted at /api/v1 in app.js.
 *
 * To add a new feature:
 * 1. Create the route module in src/routes/
 * 2. Import and mount it here
 */

import { Router } from 'express';

import healthRoutes from './health.routes.js';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import campaignRoutes from './campaign.routes.js';
import contributionRoutes from './contribution.routes.js';
import withdrawalRoutes from './withdrawal.routes.js';
import paymentRoutes from './payment.routes.js';
import notificationRoutes from './notification.routes.js';
import reportRoutes from './report.routes.js';
import adminRoutes from './admin.routes.js';

const router = Router();

// ── Health ───────────────────────────────────────────────────────────────────
router.use('/health', healthRoutes);

// ── Authentication ───────────────────────────────────────────────────────────
router.use('/auth', authRoutes);

// ── Core Resources ───────────────────────────────────────────────────────────
router.use('/users', userRoutes);
router.use('/campaigns', campaignRoutes);
router.use('/contributions', contributionRoutes);
router.use('/withdrawals', withdrawalRoutes);
router.use('/payments', paymentRoutes);
router.use('/notifications', notificationRoutes);

// ── Reporting & Admin ────────────────────────────────────────────────────────
router.use('/reports', reportRoutes);
router.use('/admin', adminRoutes);

export default router;
