/**
 * =============================================================================
 * Auth Validators
 * =============================================================================
 *
 * Validation functions for authentication-related requests.
 * Each validator receives the Express `req` object and returns an array
 * of error objects. An empty array means the data is valid.
 *
 * TODO: Implement validation logic when auth endpoints are built.
 */

/**
 * Validates the sign-up request body.
 *
 * @param {import('express').Request} req
 * @returns {{ field: string, message: string }[]}
 */
export function signUpValidator(req) {
  const errors = [];
  const { name, email, password, role } = req.body || {};

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push({ field: 'name', message: 'Name is required' });
  }

  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push({ field: 'email', message: 'A valid email address is required' });
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    errors.push({ field: 'password', message: 'Password must be at least 6 characters long' });
  }

  if (!role || typeof role !== 'string') {
    errors.push({ field: 'role', message: 'Role is required' });
  } else {
    const normalizedRole = role.trim().toLowerCase();
    if (normalizedRole !== 'supporter' && normalizedRole !== 'creator') {
      errors.push({ field: 'role', message: 'Role must be either supporter or creator' });
    }
  }

  return errors;
}

/**
 * Validates the sign-in request body.
 *
 * @param {import('express').Request} req
 * @returns {{ field: string, message: string }[]}
 */
export function signInValidator(req) {
  const errors = [];
  const { email, password } = req.body || {};

  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push({ field: 'email', message: 'A valid email address is required' });
  }

  if (!password || typeof password !== 'string' || password.trim().length === 0) {
    errors.push({ field: 'password', message: 'Password is required' });
  }

  return errors;
}
