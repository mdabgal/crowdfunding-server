/**
 * =============================================================================
 * Auth Controller
 * =============================================================================
 *
 * Implements register, login, logout, and get current user endpoints.
 * Integrates programmatically with Better Auth and enforces registration
 * credit rules and duplicate email prevention.
 */

import { auth } from '../auth/auth.js';
import { fromNodeHeaders } from 'better-auth/node';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { ApiError } from '../utils/ApiError.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { getDb } from '../db/connection.js';

/**
 * Utility to helper that forwards Set-Cookie headers from Better Auth response
 * to the Express response.
 *
 * @param {Response} betterAuthResponse
 * @param {import('express').Response} res
 */
function forwardCookies(betterAuthResponse, res) {
  const cookies = [];
  betterAuthResponse.headers.forEach((value, key) => {
    if (key.toLowerCase() === 'set-cookie') {
      cookies.push(value);
    }
  });

  if (cookies.length > 0) {
    res.setHeader('Set-Cookie', cookies);
  }
}

/**
 * POST /api/v1/auth/register
 * Registers a new user (Supporter or Creator) and awards initial credits.
 */
export async function register(req, res) {
  const { name, email, password, role, profileImage } = req.body;

  // 1. Prevent duplicate email registration using the users collection
  const db = getDb();
  const existingUser = await db.collection('users').findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new ApiError(HTTP_STATUS.CONFLICT, 'Email is already registered');
  }

  // 2. Normalize role and calculate initial credits
  const normalizedRole = role.trim().toLowerCase(); // supporter or creator
  let credits = 0;
  if (normalizedRole === 'supporter') {
    credits = 50;
  } else if (normalizedRole === 'creator') {
    credits = 20;
  }

  // 3. Programmatically sign up via Better Auth
  const betterAuthResponse = await auth.api.signUpEmail({
    body: {
      email: email.toLowerCase(),
      password,
      name,
      role: normalizedRole,
      credits,
      profileImage: profileImage || '',
    },
    asResponse: true,
    returnHeaders: true,
  });

  if (!betterAuthResponse.ok) {
    const errorData = await betterAuthResponse.json().catch(() => ({}));
    throw new ApiError(
      betterAuthResponse.status || HTTP_STATUS.BAD_REQUEST,
      errorData.message || 'Registration failed',
      errorData,
    );
  }

  // 4. Forward session cookies to client
  forwardCookies(betterAuthResponse, res);

  const payload = await betterAuthResponse.json();

  sendSuccess(res, HTTP_STATUS.CREATED, 'User registered successfully', {
    user: payload.user,
  });
}

/**
 * POST /api/v1/auth/login
 * Standard email & password login.
 */
export async function login(req, res) {
  const { email, password } = req.body;

  const betterAuthResponse = await auth.api.signInEmail({
    body: {
      email: email.toLowerCase(),
      password,
    },
    asResponse: true,
    returnHeaders: true,
  });

  if (!betterAuthResponse.ok) {
    const errorData = await betterAuthResponse.json().catch(() => ({}));
    throw new ApiError(
      betterAuthResponse.status || HTTP_STATUS.UNAUTHORIZED,
      errorData.message || 'Invalid email or password',
      errorData,
    );
  }

  // Forward session cookies to client
  forwardCookies(betterAuthResponse, res);

  const payload = await betterAuthResponse.json();

  sendSuccess(res, HTTP_STATUS.OK, 'Login successful', {
    user: payload.user,
  });
}

/**
 * POST /api/v1/auth/logout
 * Sign out user and clear session cookies.
 */
export async function logout(req, res) {
  const betterAuthResponse = await auth.api.signOut({
    headers: fromNodeHeaders(req.headers),
    asResponse: true,
    returnHeaders: true,
  });

  if (!betterAuthResponse.ok) {
    const errorData = await betterAuthResponse.json().catch(() => ({}));
    throw new ApiError(
      betterAuthResponse.status || HTTP_STATUS.BAD_REQUEST,
      errorData.message || 'Logout failed',
      errorData,
    );
  }

  // Forward cookie clears to client
  forwardCookies(betterAuthResponse, res);

  sendSuccess(res, HTTP_STATUS.OK, 'Logout successful');
}

/**
 * GET /api/v1/auth/me
 * Retrieves current logged-in user profile.
 */
export async function me(req, res) {
  // req.user is set by the authenticate middleware
  sendSuccess(res, HTTP_STATUS.OK, 'Current user profile fetched successfully', {
    user: req.user,
  });
}
