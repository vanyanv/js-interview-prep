/*
Problem: Decode Ways (LeetCode #91)
Difficulty: Medium
Category: Dynamic Programming
Pattern: 1D DP, String DP

A message containing letters from A-Z can be encoded into numbers using the following mapping:
'A' -> "1", 'B' -> "2", ..., 'Z' -> "26"

To decode an encoded message, all the digits must be grouped then mapped back into letters
using the reverse of the mapping above (there may be multiple ways).

Given a string s containing only digits, return the number of ways to decode it.

Example 1:
  Input: s = "12"
  Output: 2
  Explanation: "12" could be decoded as "AB" (1 2) or "L" (12).

Example 2:
  Input: s = "226"
  Output: 3
  Explanation: "226" could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).

Example 3:
  Input: s = "06"
  Output: 0
  Explanation: "06" cannot be mapped to "F" because of the leading zero ("6" is different from "06").

Example 4:
  Input: s = "0"
  Output: 0
  Explanation: There is no character that is mapped to a number starting with 0.

Example 5:
  Input: s = "10"
  Output: 1
  Explanation: "10" can only be decoded as "J" (10).

Constraints:
  - 1 <= s.length <= 100
  - s contains only digits and may contain leading zero(s)

Time Complexity: O(n) where n is the length of the string
Space Complexity: O(1) with space optimization, O(n) with DP array

Dynamic Programming Pattern Notes:
  - State: dp[i] represents number of ways to decode s[0...i-1]
  - Recurrence:
    - If s[i-1] is valid single digit (1-9): dp[i] += dp[i-1]
    - If s[i-2:i] is valid two-digit (10-26): dp[i] += dp[i-2]
  - Base cases: dp[0] = 1, dp[1] = 1 if s[0] != '0' else 0
  - Key insight: similar to climbing stairs with variable step sizes
  - Handle edge cases: leading zeros, invalid two-digit combinations

Hints:
  - Think about this as a path counting problem similar to climbing stairs
  - At each position, you can decode the current digit alone or with the previous digit
  - Check validity: single digit must be 1-9, two-digit must be 10-26
  - Handle zeros carefully - '0' cannot be decoded alone, but can be part of '10' or '20'
  - Use space optimization since you only need the last two values
  - Consider both top-down (recursion + memoization) and bottom-up approaches
*/

export const functionName = 'numDecodings';

export const tests = [
  {
    input: ["12"],
    expected: 2
  },
  {
    input: ["226"],
    expected: 3
  },
  {
    input: ["06"],
    expected: 0
  },
  {
    input: ["0"],
    expected: 0
  },
  {
    input: ["10"],
    expected: 1
  },
  {
    input: ["27"],
    expected: 1
  },
  {
    input: ["123"],
    expected: 3
  },
  {
    input: ["1234"],
    expected: 3
  }
];

/**
 * Count number of ways to decode a string of digits
 * @param {string} s - String containing only digits
 * @return {number} Number of ways to decode the string
 */
function numDecodings(s) {
    if (!s || s.length === 0 || s[0] === '0') return 0;

    const n = s.length;

    // Space optimized approach
    let prev2 = 1; // dp[i-2]
    let prev1 = 1; // dp[i-1]

    for (let i = 1; i < n; i++) {
        let current = 0;

        // Check single digit: s[i]
        if (s[i] !== '0') {
            current += prev1;
        }

        // Check two digits: s[i-1:i+1]
        const twoDigit = parseInt(s.substring(i - 1, i + 1));
        if (twoDigit >= 10 && twoDigit <= 26) {
            current += prev2;
        }

        // Update for next iteration
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
}

export default numDecodings;