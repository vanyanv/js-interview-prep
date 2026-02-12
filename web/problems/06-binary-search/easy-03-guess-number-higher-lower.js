/*
Problem: Guess Number Higher or Lower
Difficulty: Easy
Category: Binary Search, Interactive
LeetCode: #374
Pattern: Binary Search with API

We are playing the Guess Game. The game is as follows:
I pick a number from 1 to n. You have to guess which number I picked.
Every time you guess wrong, I will tell you whether the number I picked is higher or lower than your guess.

You call a pre-defined API int guess(int num), which returns three possible results:
- -1: Your guess is higher than the number I picked (i.e. num > pick).
- 1: Your guess is lower than the number I picked (i.e. num < pick).
- 0: Your guess is correct (i.e. num == pick).

Return the number that I picked.

Example 1:
  Input: n = 10, pick = 6
  Output: 6
  Explanation: Game flows as follows:
    guess(5) -> 1 (pick is higher)
    guess(8) -> -1 (pick is lower)
    guess(6) -> 0 (correct!)

Example 2:
  Input: n = 1, pick = 1
  Output: 1
  Explanation: Only one number to guess

Example 3:
  Input: n = 2, pick = 1
  Output: 1
  Explanation: guess(1) -> 0 (correct!)

Example 4:
  Input: n = 100, pick = 75
  Output: 75
  Explanation: Binary search will find 75

Constraints:
  - 1 <= n <= 2^31 - 1
  - 1 <= pick <= n

Time Complexity: O(log n) where n is the upper bound
Space Complexity: O(1)

Pattern Notes:
  - Classic binary search with API calls
  - Use while (left <= right) for inclusive bounds
  - When guess(mid) returns -1, search left half: right = mid - 1
  - When guess(mid) returns 1, search right half: left = mid + 1
  - When guess(mid) returns 0, found the answer: return mid
  - Handle API responses correctly to avoid infinite loops
*/

export const functionName = 'guessNumber';

export const tests = [
  {
    input: [10, 6],
    expected: 6
  },
  {
    input: [1, 1],
    expected: 1
  },
  {
    input: [2, 1],
    expected: 1
  },
  {
    input: [100, 75],
    expected: 75
  },
  {
    input: [50, 25],
    expected: 25
  },
  {
    input: [1000, 1],
    expected: 1
  },
  {
    input: [1000, 999],
    expected: 999
  },
  {
    input: [5, 3],
    expected: 3
  },
  // --- Additional rigorous test cases ---
  {
    // Pick is the first number
    input: [100, 1],
    expected: 1
  },
  {
    // Pick is the last number
    input: [100, 100],
    expected: 100
  },
  {
    // Two-element range, pick is second
    input: [2, 2],
    expected: 2
  },
  {
    // Large range, pick near the middle
    input: [10000, 4999],
    expected: 4999
  }
];

/**
 * Mock guess function for testing
 * @param {number} pick - The number that was picked
 * @return {function} guess function for testing
 */
function createMockGuess(pick) {
    return function(num) {
        if (num > pick) return -1;
        if (num < pick) return 1;
        return 0;
    };
}

/**
 * Guess the number using binary search
 * @param {number} n - Upper bound of the range [1, n]
 * @param {function} guess - API function that returns -1, 0, or 1
 * @return {number} The number that was picked
 */
function guessNumberWithAPI(n, guess) {
    let left = 1;
    let right = n;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const result = guess(mid);

        if (result === 0) {
            return mid;
        } else if (result === -1) {
            // Guess is too high, search lower half
            right = mid - 1;
        } else {
            // Guess is too low, search upper half
            left = mid + 1;
        }
    }

    // Should never reach here given valid input
    return -1;
}

/**
 * Test wrapper that simulates the LeetCode environment
 * @param {number} n - Upper bound of the range
 * @param {number} pick - The number that was picked
 * @return {number} Result from the solution
 */
function guessNumber(n, pick) {
    const guess = createMockGuess(pick);
    return guessNumberWithAPI(n, guess);
}

export default guessNumber;