/**
 * Example Unit Test to Verify Jest Setup
 *
 * This test demonstrates the TDD workflow and verifies that
 * Jest is properly configured with TypeScript.
 */

import { Calculator } from './math';

describe('Calculator', () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('add', () => {
    test('should add two positive numbers correctly', () => {
      const result = calculator.add(2, 3);
      expect(result).toBe(5);
    });

    test('should handle negative numbers', () => {
      const result = calculator.add(-2, 3);
      expect(result).toBe(1);
    });

    test('should add negative numbers correctly', () => {
      const result = calculator.add(-2, -3);
      expect(result).toBe(-5);
    });

    test('should handle zero', () => {
      const result = calculator.add(0, 5);
      expect(result).toBe(5);
      const result2 = calculator.add(5, 0);
      expect(result2).toBe(5);
    });
  });

  describe('multiply', () => {
    test('should multiply two numbers correctly', () => {
      const result = calculator.multiply(3, 4);
      expect(result).toBe(12);
    });

    test('should multiply positive numbers correctly', () => {
      const result = calculator.multiply(2, 3);
      expect(result).toBe(6);
    });

    test('should return zero when multiplying by zero', () => {
      const result = calculator.multiply(5, 0);
      expect(result).toBe(0);
      const result2 = calculator.multiply(0, 5);
      expect(result2).toBe(0);
    });

    test('should multiply negative numbers correctly', () => {
      const result1 = calculator.multiply(-2, 3);
      expect(result1).toBe(-6);
      const result2 = calculator.multiply(-2, -3);
      expect(result2).toBe(6);
    });
  });

  describe('divide', () => {
    test('should divide two numbers correctly', () => {
      const result = calculator.divide(10, 2);
      expect(result).toBe(5);
    });

    test('should throw error when dividing by zero', () => {
      expect(() => {
        calculator.divide(5, 0);
      }).toThrow('Division by zero is not allowed');
    });
  });
});
