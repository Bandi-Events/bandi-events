import { Transaction } from './interfaces';

/**
 * This function is responsible updating the xp when the monetization API
 * sends a payment update
 *
 * @param {number} assetScale the assetScale returned from monetization API
 * @param {number} amount the amount to increment by
 * @param {number} currentBalance the current experience
 * @param {number} multiplier a multiplier for the amount
 *
 * @returns {number} the new xp value
 */
export function createTransaction({
  assetScale,
  amount,
  currentBalance,
  multiplier,
}: Transaction): number {
  return updateBalance({
    currentBalance,
    amount: Number(getScaledAmount(amount, assetScale)),
    multiplier,
  });
}

/**
 * This function increments the current xp by a provided amount
 *
 * @param {number} xp the current experience
 * @param {number} amount the amount to add
 * @param {number} multiplier a multiplier for the amount
 *
 * @returns {number} the incremented value
 */
export function updateBalance({
  currentBalance,
  amount,
  multiplier,
}: Partial<Transaction>): number {
  return (currentBalance += amount * multiplier);
}

/**
 * This function returns experience adjusted to the provided assetScale
 * returned from the web monetization API
 *
 * @param {number} amount the amount
 * @param {number} scale the assetScale returned from monetization API
 *
 * @returns {string} the scaled experience
 */
export function getScaledAmount(amount: number, scale: number): string {
  return (amount * Math.pow(10, -scale)).toFixed(scale);
}
