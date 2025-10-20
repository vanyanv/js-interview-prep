/*
Problem: Palindromic Substrings (LeetCode #647)
Difficulty: Medium
Category: Dynamic Programming
Pattern: 2D DP, String DP, Expand Around Centers

Given a string s, return the number of palindromic substrings in it.
A string is a palindrome when it reads the same backward as forward.
A substring is a contiguous sequence of characters within the string.

Example 1:
  Input: s = "abc"
  Output: 3
  Explanation: Three palindromic strings: "a", "b", "c".

Example 2:
  Input: s = "aaa"
  Output: 6
  Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".

Example 3:
  Input: s = "racecar"
  Output: 10
  Explanation: "r", "a", "c", "e", "c", "a", "r", "cec", "aceca", "racecar"

Example 4:
  Input: s = "abccba"
  Output: 9
  Explanation: "a", "b", "c", "c", "b", "a", "cc", "bccb", "abccba"

Example 5:
  Input: s = "fdsklf"
  Output: 6
  Explanation: Only single character palindromes: "f", "d", "s", "k", "l", "f"

Constraints:
  - 1 <= s.length <= 1000
  - s consists of lowercase English letters

Time Complexity: O(n^2) for both DP and expand around centers approaches
Space Complexity: O(n^2) for DP approach, O(1) for expand around centers

Dynamic Programming Pattern Notes:
  - State: dp[i][j] represents whether substring s[i...j] is a palindrome
  - Recurrence: dp[i][j] = (s[i] == s[j]) && (j-i <= 2 || dp[i+1][j-1])
  - Base cases: single characters are palindromes, empty strings are palindromes
  - Alternative approach: expand around centers (more space efficient)
  - For each center (single char or between chars), expand outward while characters match
  - This problem can also be solved with Manacher's algorithm in O(n) time

Hints:
  - Consider both DP and expand around centers approaches
  - For DP: build table bottom-up, starting with smaller substrings
  - For expand around centers: consider both odd-length (center is a character) and even-length (center is between characters) palindromes
  - Every single character is a palindrome by definition
  - A palindrome of length > 1 requires matching first/last chars and inner substring being palindrome
  - Expand around centers is more space efficient and equally fast
*/

export const functionName = 'countSubstrings';

export const tests = [
  {
    input: ["abc"],
    expected: 3
  },
  {
    input: ["aaa"],
    expected: 6
  },
  {
    input: ["racecar"],
    expected: 10
  },
  {
    input: ["abccba"],
    expected: 9
  },
  {
    input: ["fdsklf"],
    expected: 6
  },
  {
    input: ["a"],
    expected: 1
  },
  {
    input: ["aa"],
    expected: 3
  },
  {
    input: ["aba"],
    expected: 4
  }
];

/**
 * Count number of palindromic substrings in a string
 * @param {string} s - Input string
 * @return {number} Number of palindromic substrings
 */
function countSubstrings(s) {
    if (!s || s.length === 0) return 0;

    let count = 0;

    // Helper function to expand around center and count palindromes
    function expandAroundCenter(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            count++;
            left--;
            right++;
        }
    }

    // Check all possible centers
    for (let i = 0; i < s.length; i++) {
        // Odd length palindromes (center is character i)
        expandAroundCenter(i, i);

        // Even length palindromes (center is between i and i+1)
        expandAroundCenter(i, i + 1);
    }

    return count;
}

export default countSubstrings;