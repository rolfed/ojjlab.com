/**
 * Example Calculator Class for TDD Demonstration
 *
 * This class demonstrates the TDD workflow:
 * 1. Tests were written first in math.test.ts
 * 2. This implementation was created to make tests pass
 * 3. Code can be refactored while keeping tests green
 */

export class Calculator {
  /**
   * Add two numbers together
   * @param a First number
   * @param b Second number
   * @returns Sum of a and b
   */
  public add(a: number, b: number): number {
    return a + b;
  }

  /**
   * Multiply two numbers
   * @param a First number
   * @param b Second number
   * @returns Product of a and b
   */
  public multiply(a: number, b: number): number {
    return a * b;
  }

  /**
   * Divide two numbers
   * @param a Dividend
   * @param b Divisor
   * @returns Quotient of a divided by b
   * @throws Error if divisor is zero
   */
  public divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error('Division by zero is not allowed');
    }
    return a / b;
  }
}
