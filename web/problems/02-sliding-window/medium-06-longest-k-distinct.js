/*
Problem: Longest Substring with Exactly K Distinct Characters
Difficulty: Medium
Category: Hash Table, String, Sliding Window
Pattern: Variable Window Sliding Window

Given a string s and an integer k, return the length of the longest substring of s that contains exactly k distinct characters.

Example 1:
  Input: s = "eceba", k = 2
  Output: 3
  Explanation: The substring is "ece" with length 3.

Example 2:
  Input: s = "aa", k = 1
  Output: 2
  Explanation: The substring is "aa" with length 2.

Example 3:
  Input: s = "abaccc", k = 3
  Output: 4
  Explanation: The substring is "bacc" with length 4.

Example 4:
  Input: s = "abcdef", k = 7
  Output: 0
  Explanation: There's no substring with 7 distinct characters.

Example 5:
  Input: s = "aaaaaaa", k = 3
  Output: 0
  Explanation: The string contains only 1 distinct character, can't have 3.

Example 6:
  Input: s = "abacadaeaf", k = 3
  Output: 4
  Explanation: The substring "adae" has exactly 3 distinct characters.

Constraints:
  - 1 <= s.length <= 5 * 10^4
  - 0 <= k <= 50
  - s consists of lowercase English letters

Time Complexity: O(n)
Space Complexity: O(k)

Pattern Notes:
  - This is different from "at most k distinct" - we need exactly k
  - Use the helper function approach: exactly k = (at most k) - (at most k-1)
  - Alternative: Expand window until we have exactly k distinct characters
  - Once we have exactly k, try to extend as much as possible
  - When we get k+1 distinct characters, shrink until we have k again
*/

export const functionName = 'lengthOfLongestSubstringExactlyKDistinct';

export const tests = [
  {
    input: ["eceba", 2],
    expected: 3
  },
  {
    input: ["aa", 1],
    expected: 2
  },
  {
    input: ["abaccc", 3],
    expected: 4
  },
  {
    input: ["abcdef", 7],
    expected: 0
  },
  {
    input: ["aaaaaaa", 3],
    expected: 0
  },
  {
    input: ["abacadaeaf", 3],
    expected: 4
  },
  {
    input: ["a", 0],
    expected: 0
  },
  {
    input: ["abcde", 1],
    expected: 1
  },
  {
    input: ["aabbccddee", 2],
    expected: 4
  },
  {
    input: ["abcdefghijklmnopqrstuvwxyz", 26],
    expected: 26
  },
  {
    input: ["aaaaaaaaaaaaaaaaaaaaaaaaa", 1],
    expected: 25
  },
  {
    input: ["", 1],
    expected: 0
  }
];

/**
 * Finds length of longest substring with exactly k distinct characters
 * @param {string} s - Input string
 * @param {number} k - Exact number of distinct characters required
 * @return {number} Length of longest valid substring
 */
function lengthOfLongestSubstringExactlyKDistinct(s, k) {
    if (k === 0) return 0;

    return atMostKDistinct(s, k) - atMostKDistinct(s, k - 1);
}

/**
 * Helper function to find length of longest substring with at most k distinct characters
 * @param {string} s - Input string
 * @param {number} k - Maximum number of distinct characters
 * @return {number} Length of longest valid substring
 */
function atMostKDistinct(s, k) {
    if (k === 0) return 0;

    const charCount = new Map();
    let left = 0;
    let maxLength = 0;

    for (let right = 0; right < s.length; right++) {
        const rightChar = s[right];

        // Add current character to window
        charCount.set(rightChar, (charCount.get(rightChar) || 0) + 1);

        // Shrink window while we have more than k distinct characters
        while (charCount.size > k) {
            const leftChar = s[left];
            charCount.set(leftChar, charCount.get(leftChar) - 1);

            // Remove character from map if count becomes 0
            if (charCount.get(leftChar) === 0) {
                charCount.delete(leftChar);
            }

            left++;
        }

        // Update maximum length
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}

export default lengthOfLongestSubstringExactlyKDistinct;