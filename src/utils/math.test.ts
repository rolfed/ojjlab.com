import { add, multiply } from './math';

describe('Math Utilities', () => {
  describe('add', () => {
    it('should add two positive numbers correctly', () => {
      expect(add(2, 3)).toBe(5);
    });

    it('should add negative numbers correctly', () => {
      expect(add(-2, -3)).toBe(-5);
    });

    it('should add zero correctly', () => {
      expect(add(5, 0)).toBe(5);
      expect(add(0, 5)).toBe(5);
    });
  });

  describe('multiply', () => {
    it('should multiply two positive numbers correctly', () => {
      expect(multiply(2, 3)).toBe(6);
    });

    it('should multiply by zero correctly', () => {
      expect(multiply(5, 0)).toBe(0);
      expect(multiply(0, 5)).toBe(0);
    });

    it('should multiply negative numbers correctly', () => {
      expect(multiply(-2, 3)).toBe(-6);
      expect(multiply(-2, -3)).toBe(6);
    });
  });
});
