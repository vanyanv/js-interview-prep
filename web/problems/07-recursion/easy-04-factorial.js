/*
Problem: Factorial
Difficulty: Easy
Category: Recursion, Math
Pattern: Basic Recursion

Calculate the factorial of a non-negative integer n using recursion.
The factorial of n (written as n!) is the product of all positive integers less than or equal to n.

By definition:
- 0! = 1
- n! = n × (n-1)! for n > 0

Example 1:
  Input: n = 5
  Output: 120
  Explanation: 5! = 5 × 4 × 3 × 2 × 1 = 120

Example 2:
  Input: n = 0
  Output: 1
  Explanation: 0! = 1 by definition

Example 3:
  Input: n = 1
  Output: 1
  Explanation: 1! = 1

Example 4:
  Input: n = 3
  Output: 6
  Explanation: 3! = 3 × 2 × 1 = 6

Constraints:
  - 0 <= n <= 12
  - n is a non-negative integer

Time Complexity: O(n) where n is the input number
Space Complexity: O(n) due to recursion call stack

Recursion Pattern Notes:
  - Base case: n = 0 or n = 1, return 1
  - Recursive case: n * factorial(n - 1)
  - Each recursive call reduces the problem size by 1
  - This is a simple linear recursion pattern

Hints:
  - Think about the mathematical definition of factorial
  - What's the smallest case you can solve directly? (base case)
  - How can you express factorial(n) in terms of factorial(n-1)?
  - Remember that 0! = 1 by mathematical convention
*/

export const functionName = 'factorial';

export const tests = [
  {
    input: [5],
    expected: 120
  },
  {
    input: [0],
    expected: 1
  },
  {
    input: [1],
    expected: 1
  },
  {
    input: [3],
    expected: 6
  },
  {
    input: [4],
    expected: 24
  },
  {
    input: [2],
    expected: 2
  },
  {
    input: [6],
    expected: 720
  },
  {
    input: [7],
    expected: 5040
  }
];

/**
 * Calculate factorial of n using recursion
 * @param {number} n - Non-negative integer
 * @return {number} Factorial of n
 */
function factorial(n) {
    // Base case: 0! = 1 and 1! = 1
    if (n <= 1) {
        return 1;
    }

    // Recursive case: n! = n * (n-1)!
    return n * factorial(n - 1);
}

export default factorial;