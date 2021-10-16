import BandiEvents from '../src/index';
import { BandiEventProps } from '../src/interfaces';

const EVENT_NAME = 'monetizationprogress';

describe('index', () => {
  let bandi: BandiEventProps;

  const globalDocument = window.document as any;
  const initParams = {
    currentBalance: 0,
    amount: 0,
    multiplier: 1,
    onTransaction: jest.fn(),
  };

  beforeEach(() => {
    bandi = BandiEvents();

    globalDocument.monetization = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('init', () => {
    it('throws an error when monetization is not initialized', () => {
      globalDocument.monetization = null;

      expect(() => {
        bandi.init(null);
      }).toThrowError('Monetization not initialized');
    });

    it('correctly initializes when provided with correct params', () => {
      const windowSpy = globalDocument.monetization.addEventListener;

      bandi.init({
        ...initParams,
      });

      expect(windowSpy).toHaveBeenCalled();
      expect(windowSpy.mock.calls[0][0]).toBe('monetizationprogress');
    });
  });

  describe('startMonetization', () => {
    it('adds the monetization start event listener', () => {
      const windowSpy = globalDocument.monetization.addEventListener;

      bandi.startMonetization();

      expect(windowSpy).toHaveBeenCalled();
      expect(windowSpy.mock.calls[0][0]).toBe(EVENT_NAME);
    });
  });

  describe('stopMonetization', () => {
    it('removes the moneitzationprogress event listener', () => {
      const windowSpy = globalDocument.monetization.removeEventListener;

      bandi.stopMonetization();

      expect(windowSpy).toHaveBeenCalled();
      expect(windowSpy.mock.calls[0][0]).toBe(EVENT_NAME);
    });
  });

  describe('isActive', () => {
    it('returns true when monetization is active', () => {
      bandi.startMonetization();

      const expected = true;
      const actual = bandi.isActive();

      expect(actual).toBe(expected);
    });

    it('returns false when monetization is not active', () => {
      bandi.stopMonetization();

      const expected = false;
      const actual = bandi.isActive();

      expect(actual).toBe(expected);
    });
  });
});
