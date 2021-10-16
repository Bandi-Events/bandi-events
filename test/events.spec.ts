import {
  createTransaction,
  updateBalance,
  getScaledAmount,
} from '../src/events';

const balance = 100;
const amount = 10;
const scale = 5;

describe('events', () => {
  describe('createTransaction', () => {
    it('creates a proper transaction', () => {
      const expected = 100.0001;
      const actual = createTransaction({
        amount,
        assetScale: scale,
        currentBalance: balance,
        multiplier: 1,
      });

      expect(actual).toBe(expected);
    });
  });

  describe('updateBalance', () => {
    it('returns the updated user balance', () => {
      const expected = amount + balance;
      const actual = updateBalance({
        amount,
        currentBalance: balance,
        multiplier: 1,
      });

      expect(actual).toBe(expected);
    });

    it('updates the user balance with a multiplier', () => {
      const expected = 200;
      const actual = updateBalance({
        amount,
        currentBalance: balance,
        multiplier: 10,
      });

      expect(actual).toBe(expected);
    });
  });

  describe('getScaledAmount', () => {
    it('returns an amount scaled based on provided assetScale', () => {
      const expected = '0.00010';
      const actual = getScaledAmount(amount, scale);

      expect(actual).toBe(expected);
    });
  });
});
