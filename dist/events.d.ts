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
export declare function createTransaction({
  assetScale,
  amount,
  currentBalance,
  multiplier,
}: Transaction): number;
/**
 * This function increments the current xp by a provided amount
 *
 * @param {number} xp the current experience
 * @param {number} amount the amount to add
 * @param {number} multiplier a multiplier for the amount
 *
 * @returns {number} the incremented value
 */
export declare function updateBalance({
  currentBalance,
  amount,
  multiplier,
}: Partial<Transaction>): number;
/**
 * This function returns experience adjusted to the provided assetScale
 * returned from the web monetization API
 *
 * @param {number} amount the amount
 * @param {number} scale the assetScale returned from monetization API
 *
 * @returns {string} the scaled experience
 */
export declare function getScaledAmount(amount: number, scale: number): string;
