/*
Problem: Happy Number
Difficulty: Easy
Category: Math, Hash Set
LeetCode: #202
Pattern: Cycle Detection with Set

Write an algorithm to determine if a number n is happy.

A happy number is a number defined by the following process:

- Starting with any positive integer, replace the number by the sum of the
  squares of its digits.
- Repeat the process until the number equals 1 (where it will stay), or it
  loops endlessly in a cycle which does not include 1.
- Those numbers for which this process ends in 1 are happy.

Return true if n is a happy number, and false if not.

Example 1:
  Input: n = 19
  Output: true
  Explanation:
  1² + 9² = 82
  8² + 2² = 68
  6² + 8² = 100
  1² + 0² + 0² = 1

Example 2:
  Input: n = 2
  Output: false

Example 3:
  Input: n = 7
  Output: true

Constraints:
  - 1 <= n <= 2^31 - 1

Time Complexity: O(log n)
Space Complexity: O(log n)

Hash Set Pattern Notes:
  - Use Set to detect cycles in the sequence
  - Store each computed sum to check for repetition
  - If sum becomes 1, return true
  - If sum repeats (cycle detected), return false
  - Extract digits using modulo and division
*/

export const functionName = 'isHappy';

export const tests = [
  {
    input: [19],
    expected: true
  },
  {
    input: [2],
    expected: false
  },
  {
    input: [7],
    expected: true
  },
  {
    input: [1],
    expected: true
  },
  {
    input: [23],
    expected: true
  },
  {
    input: [4],
    expected: false
  },
  {
    input: [82],
    expected: true
  },
  {
    input: [20],
    expected: false
  }
];