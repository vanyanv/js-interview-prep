/*
Problem: Happy Number
Difficulty: Easy
Category: Math, Fast & Slow Pointers
LeetCode: #202
Pattern: Fast & Slow Pointers (Cycle Detection in Numbers)

Write an algorithm to determine if a number n is happy.

A happy number is a number defined by the following process:
- Starting with any positive integer, replace the number by the sum of the squares of its digits.
- Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.
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
  Explanation: This will loop in a cycle.

Example 3:
  Input: n = 1
  Output: true

Constraints:
  - 1 <= n <= 2^31 - 1

Time Complexity: O(log n)
Space Complexity: O(1)

Pattern Notes:
  - Use fast and slow pointers to detect cycles in the sequence
  - Slow pointer: one step (one sum of squares calculation)
  - Fast pointer: two steps (two sum of squares calculations)
  - If they meet and the value is 1, it's happy
  - If they meet and the value is not 1, there's a cycle (not happy)
  - This avoids using a HashSet to track seen numbers

Hints:
  1. Create helper function to calculate sum of squares of digits
  2. Use slow pointer (one calculation) and fast pointer (two calculations)
  3. Continue until slow === fast
  4. Check if the meeting point is 1 (happy) or not (cycle)
  5. The cycle detection pattern applies to number sequences too
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
    input: [1],
    expected: true
  },
  {
    input: [7],
    expected: true
  },
  {
    input: [4],
    expected: false
  },
  {
    input: [23],
    expected: true
  },
  {
    input: [89],
    expected: true
  },
  {
    input: [145],
    expected: false
  },
  {
    input: [10],
    expected: true
  },
  {
    input: [100],
    expected: true
  },
  {
    input: [116],
    expected: false
  },
  {
    input: [44],
    expected: true
  }
];