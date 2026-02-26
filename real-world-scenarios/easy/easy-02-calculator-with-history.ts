/*
Problem: Calculator with History
Difficulty: Easy
Category: Real World - Stateful Applications

Create a calculator that tracks operation history and supports undo.

Example 1:
  Input: calc.add(5) → calc.multiply(3) → calc.getResult()
  Output: 15

Example 2:
  Input: calc.undo() → calc.getResult()
  Output: 5 (reverts multiply)

Requirements:
  - Support add, subtract, multiply, divide operations
  - Track history of all operations
  - Support undo (revert last operation)
  - Return current result
  - Handle division by zero gracefully
  - Start from 0 by default, or accept initial value

Time Complexity: O(1) per operation, O(n) for getHistory
Space Complexity: O(n) where n is number of operations

Hints:
  - Use a stack (array) for history
  - Store previous value on each operation for easy undo
  - Consider edge cases like undo on empty history
  - Division by zero should return an error or keep current value
*/

export const functionName = 'createCalculator';

export const tests = [
  {
    input: [],
    expected: (() => {
      const calc = { value: 0, history: [] };
      return { result: 0, history: [] };
    })(),
  },
  {
    input: [10],
    expected: { result: 10, history: [] },
  },
  {
    input: [0, ['add', 5]],
    expected: { result: 5, history: [{ op: 'add', value: 5 }] },
  },
  {
    input: [0, ['add', 10], ['subtract', 3]],
    expected: {
      result: 7,
      history: [
        { op: 'add', value: 10 },
        { op: 'subtract', value: 3 },
      ],
    },
  },
  {
    input: [2, ['multiply', 5], ['add', 10]],
    expected: {
      result: 20,
      history: [
        { op: 'multiply', value: 5 },
        { op: 'add', value: 10 },
      ],
    },
  },
  {
    input: [10, ['divide', 0]],
    expected: { result: 10, history: [], error: 'Cannot divide by zero' },
  },
  {
    input: [0, ['add', 10], ['multiply', 3], ['undo']],
    expected: { result: 10, history: [{ op: 'add', value: 10 }] },
  },
  {
    input: [0, ['undo']],
    expected: { result: 0, history: [] },
  },
];
