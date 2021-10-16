import { validateParams } from '../src/validation';

describe('validation', () => {
  describe('validateParams', () => {
    it('throws an error when not provided required params', () => {
      expect(() => {
        validateParams({
          currentBalance: 0,
          multiplier: null,
        });
      }).toThrowError('multiplier must be provided when initializing!');

      expect(() => {
        validateParams({
          currentBalance: null,
          multiplier: 0,
        });
      }).toThrowError('currentBalance must be provided when initializing!');
    });
  });

  it('does not throw an error if all required params are provided', () => {
    expect(() => {
      validateParams({
        currentBalance: 0,
        multiplier: 0,
      });
    }).not.toThrowError();
  });
});
