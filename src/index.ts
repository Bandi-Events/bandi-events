import { createTransaction } from './events';
import { validateParams } from './validation';
import { BandiEventProps, InitProps, EventDetail } from './interfaces';
import { MONETIZATION_PROGRESS, NO_OP } from './constants';

const BandiEvents = (): BandiEventProps => {
  let currentBalance: number;
  let multiplier: number;
  let onTransaction: (args: number) => number | void;
  let active = false;

  /**
   * Set up the initial properties and start the monetizationprogress event listener
   *
   * @param {Object} params the params for initializing
   * @param {number} params.currentBalance the user's current point balance
   * @param {number} params.multiplier a multiplier to use when incrementing point values
   * @param {Function} [params.onTransaction] optional callback for when transaction is created
   * @returns {void}
   */
  function init(params: InitProps): void {
    try {
      if (!(document as any).monetization) {
        throw new Error('Monetization not initialized');
      }

      validateParams(params);

      currentBalance = params.currentBalance;
      multiplier = params.multiplier;
      onTransaction = params.onTransaction || NO_OP;

      startMonetization();
    } catch (e) {
      throw new Error(`Something went wrong: ${e}`);
    }
  }

  /**
   * This function is called on every iteration of the monetizationprogress
   * event. It takes in an event object containing the amount received, and
   * the scale (number of places past the decimal for the amount)
   * Read more here: https://webmonetization.org/docs/api
   *
   * @param {Object} detail the detail param pulled from the event
   * @param {number} detail.assetScale the scale to use
   * @param {number} detail.amount the destination amount received
   * @returns {void}
   */
  function transactionEvent({ detail }: { detail: EventDetail }): void {
    if (!active) {
      return;
    }
    const { amount, assetScale } = detail;

    const newBalance = createTransaction({
      assetScale,
      amount,
      currentBalance,
      multiplier,
    });

    setBalance(newBalance);
    onTransaction(newBalance);
  }

  /**
   * Update the user's current balance
   *
   * @param {number} newBalance the user's updated balance
   * @returns {void}
   */
  function setBalance(newBalance: number): void {
    currentBalance = newBalance;
  }

  /**
   * Return the user's current balance
   *
   * @returns {number}
   */
  function getCurrentBalance(): number {
    return currentBalance;
  }

  /**
   * Start the monetizationprogress event listener
   *
   * @returns {void}
   */
  function startMonetization(): void {
    active = true;

    (document as any).monetization.addEventListener(
      MONETIZATION_PROGRESS,
      transactionEvent
    );
  }

  /**
   * Stop the monetizationprogress event listener
   *
   * @returns {void}
   */
  function stopMonetization(): void {
    active = false;

    (document as any).monetization.removeEventListener(
      MONETIZATION_PROGRESS,
      transactionEvent
    );

    cleanup();
  }

  /**
   * Return whether monetization is currently active
   *
   * @returns {boolean}
   */
  function isActive(): boolean {
    return active;
  }

  /**
   * Clean up instance variables
   *
   * @returns {void}
   */
  function cleanup(): void {
    currentBalance = null;
    multiplier = null;
    onTransaction = null;
  }

  return {
    init,
    getCurrentBalance,
    startMonetization,
    stopMonetization,
    isActive,
  };
};

export default BandiEvents;
