/**
 * =============================================================================
 * Helper Functions
 * =============================================================================
 *
 * Generic utility helpers that don't belong to a specific domain.
 * Keep functions pure and well-documented.
 */

/**
 * Picks only the specified keys from an object.
 * Useful for sanitizing request bodies before database operations.
 *
 * @param {object} obj - Source object
 * @param {string[]} keys - Keys to retain
 * @returns {object} New object with only the specified keys
 */
export function pick(obj, keys) {
  return keys.reduce((result, key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = obj[key];
    }
    return result;
  }, {});
}

/**
 * Omits the specified keys from an object.
 *
 * @param {object} obj - Source object
 * @param {string[]} keys - Keys to exclude
 * @returns {object} New object without the specified keys
 */
export function omit(obj, keys) {
  const keySet = new Set(keys);
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keySet.has(key)),
  );
}

/**
 * Pauses execution for the given duration.
 * Useful for retry logic with exponential backoff.
 *
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise<void>}
 */
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
