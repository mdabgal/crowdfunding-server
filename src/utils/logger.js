/**
 * =============================================================================
 * Logger Utility
 * =============================================================================
 *
 * Lightweight, structured logger with level filtering.
 * Outputs JSON in production for log aggregation tools (e.g., Datadog, ELK).
 * Outputs human-readable strings in development for convenience.
 *
 * Usage:
 *   import logger from './utils/logger.js';
 *   logger.info('Server started', { port: 5000 });
 *   logger.error('DB connection failed', { error: err.message });
 */

import env from '../config/env.js';

const LOG_LEVELS = Object.freeze({
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
});

const currentLevel = LOG_LEVELS[env.LOG_LEVEL] ?? LOG_LEVELS.info;

/**
 * Formats a log entry based on the environment.
 *
 * @param {'error'|'warn'|'info'|'debug'} level - Log severity
 * @param {string} message - Human-readable message
 * @param {object} [meta] - Additional structured data
 * @returns {string} Formatted log string
 */
function formatLogEntry(level, message, meta) {
  const timestamp = new Date().toISOString();

  if (env.isProduction) {
    // JSON format for log aggregation in production
    return JSON.stringify({ timestamp, level, message, ...meta });
  }

  // Human-readable format for development
  const metaString = meta && Object.keys(meta).length
    ? ` ${JSON.stringify(meta)}`
    : '';
  return `[${timestamp}] [${level.toUpperCase()}] ${message}${metaString}`;
}

/**
 * Creates a log function for the given severity level.
 *
 * @param {'error'|'warn'|'info'|'debug'} level
 * @returns {Function}
 */
function createLogFn(level) {
  return (message, meta = {}) => {
    if (LOG_LEVELS[level] > currentLevel) return;

    const entry = formatLogEntry(level, message, meta);
    const stream = level === 'error' ? process.stderr : process.stdout;
    stream.write(entry + '\n');
  };
}

const logger = Object.freeze({
  error: createLogFn('error'),
  warn: createLogFn('warn'),
  info: createLogFn('info'),
  debug: createLogFn('debug'),
});

export default logger;
