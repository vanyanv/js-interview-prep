/*
Problem: Number of Substrings with Exactly K Distinct Characters
Difficulty: Medium
Category: String, Sliding Window, Hash Table
Pattern: Fixed Window Sliding Window

Given a string s and an integer k, return the number of substrings that contain exactly k distinct characters.

Example 1:
  Input: s = "pqpqs", k = 2
  Output: 7
  Explanation: The substrings with exactly 2 distinct characters are:
    "pq", "qp", "pq", "qs" (length 2)
    "pqp", "qpq", "pqs" (length 3)

Example 2:
  Input: s = "aabcabc", k = 3
  Output: 10
  Explanation: Substrings with exactly 3 distinct characters:
    Length 3: "abc", "abc"
    Length 4: "aabc", "abca", "bcab", "cabc"
    Length 5: "aabca", "abcab", "bcabc"
    Length 6: "aabcab", "abcabc"

Example 3:
  Input: s = "aaaa", k = 1
  Output: 10
  Explanation: All substrings have exactly 1 distinct character.
    Length 1: "a", "a", "a", "a" (4 substrings)
    Length 2: "aa", "aa", "aa" (3 substrings)
    Length 3: "aaa", "aaa" (2 substrings)
    Length 4: "aaaa" (1 substring)

Example 4:
  Input: s = "abc", k = 4
  Output: 0
  Explanation: No substring can have 4 distinct characters when string has only 3.

Constraints:
  - 1 <= s.length <= 10^4
  - 1 <= k <= 26
  - s consists of lowercase English letters

Time Complexity: O(n²)
Space Complexity: O(k)

Pattern Notes:
  - This requires checking all possible substrings, not just fixed windows
  - For each starting position, expand window until we have exactly k distinct characters
  - Continue expanding while maintaining exactly k distinct characters
  - Alternative approach: Use sliding window to count substrings with "at most k" distinct characters
  - Answer = atMostK(k) - atMostK(k-1)
*/

export const functionName = 'substringWithKDistinct';

export const tests = [
  {
    input: ["pqpqs", 2],
    expected: 7
  },
  {
    input: ["aabcabc", 3],
    expected: 10
  },
  {
    input: ["aaaa", 1],
    expected: 10
  },
  {
    input: ["abc", 4],
    expected: 0
  },
  {
    input: ["a", 1],
    expected: 1
  },
  {
    input: ["abcdef", 1],
    expected: 6
  },
  {
    input: ["abcabc", 2],
    expected: 12
  },
  {
    input: ["abacadaeaf", 2],
    expected: 23
  }
];

/**
 * Counts substrings with exactly k distinct characters using helper function
 * @param {string} s - Input string
 * @param {number} k - Number of distinct characters
 * @return {number} Count of valid substrings
 */
function substringWithKDistinct(s, k) {
    if (k === 0) return 0;
    return atMostKDistinct(s, k) - atMostKDistinct(s, k - 1);
}

/**
 * Helper function to count substrings with at most k distinct characters
 * @param {string} s - Input string
 * @param {number} k - Maximum number of distinct characters
 * @return {number} Count of valid substrings
 */
function atMostKDistinct(s, k) {
    if (k === 0) return 0;

    let count = 0;
    let left = 0;
    const charCount = new Map();

    for (let right = 0; right < s.length; right++) {
        // Add current character to window
        const rightChar = s[right];
        charCount.set(rightChar, (charCount.get(rightChar) || 0) + 1);

        // Shrink window if we have more than k distinct characters
        while (charCount.size > k) {
            const leftChar = s[left];
            charCount.set(leftChar, charCount.get(leftChar) - 1);
            if (charCount.get(leftChar) === 0) {
                charCount.delete(leftChar);
            }
            left++;
        }

        // Add count of all valid substrings ending at current position
        count += right - left + 1;
    }

    return count;
}

export default substringWithKDistinct;