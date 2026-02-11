/*
Problem: Replace the Substring for Balanced String
Difficulty: Medium
Category: String, Sliding Window
LeetCode: #1234
Pattern: Variable Window Sliding Window

You are given a string s of length n containing only four kinds of characters: 'Q', 'W', 'E', and 'R'.

A string is said to be balanced if each of its characters appears n/4 times where n is the length of the string.

Return the minimum length of the substring that can be replaced with any other string of the same length to make s balanced.

If s is already balanced, return 0.

Example 1:
  Input: s = "QWER"
  Output: 0
  Explanation: s is already balanced.

Example 2:
  Input: s = "QQWE"
  Output: 1
  Explanation: We need to replace a 'Q' to 'R', so that "QRWE" (or "RWQE" or any other combination) will be balanced.

Example 3:
  Input: s = "QQQQQWWWRRRREEEEE"
  Output: 4
  Explanation: We can replace the last 4 characters to make s = "QQQQQWWWRRRRWWWW" which is balanced.

Example 4:
  Input: s = "WWEQERQWQWWRWWERQWEQ"
  Output: 4

Constraints:
  - n == s.length
  - 4 <= n <= 10^5
  - s.length is a multiple of 4
  - s contains only 'Q', 'W', 'E', and 'R'

Time Complexity: O(n)
Space Complexity: O(1)

Pattern Notes:
  - First count frequency of each character
  - Find which characters appear more than n/4 times (excess characters)
  - Find minimum substring that contains all excess characters
  - Use sliding window to find minimum substring that contains enough excess characters
  - The substring we find can be replaced to balance the string
*/

export const functionName = 'balancedString';

export const tests = [
  {
    input: ["QWER"],
    expected: 0
  },
  {
    input: ["QQWE"],
    expected: 1
  },
  {
    input: ["QQQQQWWWRRRREEEEE"],
    expected: 4
  },
  {
    input: ["WWEQERQWQWWRWWERQWEQ"],
    expected: 4
  },
  {
    input: ["QQQWWWWEEEERRRR"],
    expected: 4
  },
  {
    input: ["QQQQWWWWEEERRR"],
    expected: 1
  },
  {
    input: ["QWERQWERQWERQWER"],
    expected: 0
  },
  {
    input: ["QWEQWEQWEQWE"],
    expected: 4
  },
  // --- NEW TEST CASES ---
  {
    input: ["QQQQ"],
    expected: 3
  },
  {
    input: ["QQQQWWWWEEEERRRR"],
    expected: 0
  },
  {
    input: ["QQQQQQQR"],
    expected: 6
  },
  {
    input: ["QQQQQQQQWWWWEEEERRRR"],
    expected: 4
  }
];

/**
 * Finds minimum length substring to replace for balanced string
 * @param {string} s - Input string containing only Q, W, E, R
 * @return {number} Minimum length of substring to replace
 */
function balancedString(s) {
    const n = s.length;
    const target = n / 4;

    // Count frequency of each character
    const count = new Map();
    for (const char of s) {
        count.set(char, (count.get(char) || 0) + 1);
    }

    // If already balanced, return 0
    if (isBalanced(count, target)) {
        return 0;
    }

    // Find minimum window that contains enough excess characters
    let left = 0;
    let minLength = n;

    for (let right = 0; right < n; right++) {
        // Remove character from count (simulating replacement)
        const rightChar = s[right];
        count.set(rightChar, count.get(rightChar) - 1);

        // Try to shrink window while it's still valid
        while (left <= right && isValidWindow(count, target)) {
            minLength = Math.min(minLength, right - left + 1);

            // Add back the left character (stop simulating its replacement)
            const leftChar = s[left];
            count.set(leftChar, count.get(leftChar) + 1);
            left++;
        }
    }

    return minLength;
}

/**
 * Check if string is balanced (each character appears exactly target times)
 * @param {Map} count - Character frequency map
 * @param {number} target - Target frequency for each character
 * @return {boolean} True if balanced
 */
function isBalanced(count, target) {
    for (const char of ['Q', 'W', 'E', 'R']) {
        if ((count.get(char) || 0) !== target) {
            return false;
        }
    }
    return true;
}

/**
 * Check if current window is valid (removing characters in window would not make any character < target)
 * @param {Map} count - Character frequency map
 * @param {number} target - Target frequency for each character
 * @return {boolean} True if window is valid
 */
function isValidWindow(count, target) {
    for (const char of ['Q', 'W', 'E', 'R']) {
        if ((count.get(char) || 0) > target) {
            return false;
        }
    }
    return true;
}

export default balancedString;