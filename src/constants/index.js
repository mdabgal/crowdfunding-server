/**
 * =============================================================================
 * Application Constants
 * =============================================================================
 *
 * Central location for application-wide constants.
 * Organized by domain for easy discovery.
 */

/**
 * User roles for role-based access control (RBAC).
 */
export const USER_ROLES = Object.freeze({
  USER: 'user',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
});

/**
 * Campaign status values.
 */
export const CAMPAIGN_STATUS = Object.freeze({
  DRAFT: 'draft',
  PENDING: 'pending',
  ACTIVE: 'active',
  FUNDED: 'funded',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',
});

/**
 * Payment status values.
 */
export const PAYMENT_STATUS = Object.freeze({
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
});

/**
 * Withdrawal status values.
 */
export const WITHDRAWAL_STATUS = Object.freeze({
  PENDING: 'pending',
  APPROVED: 'approved',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  REJECTED: 'rejected',
});

/**
 * Pagination defaults.
 */
export const PAGINATION = Object.freeze({
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
});
