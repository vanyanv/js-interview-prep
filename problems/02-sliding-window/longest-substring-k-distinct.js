/*
Problem: Longest Substring with At Most K Distinct Characters
Difficulty: Medium
Category: Hash Table, String, Sliding Window
Pattern: Variable Window Sliding Window

Given a string s and an integer k, return the length of the longest substring of s that contains at most k distinct characters.

Example 1:
  Input: s = "eceba", k = 2
  Output: 3
  Explanation: The substring is "ece" with length 3.

Example 2:
  Input: s = "aa", k = 1
  Output: 2
  Explanation: The substring is "aa" with length 2.

Example 3:
  Input: s = "abaccc", k = 2
  Output: 4
  Explanation: The substring is "accc" with length 4.

Example 4:
  Input: s = "abcdef", k = 3
  Output: 3
  Explanation: Any substring of length 3 with distinct characters like "abc", "bcd", etc.

Example 5:
  Input: s = "aaaaaaa", k = 3
  Output: 7
  Explanation: The entire string contains only 1 distinct character, which is <= 3.

Constraints:
  - 1 <= s.length <= 5 * 10^4
  - 0 <= k <= 50
  - s consists of lowercase English letters

Time Complexity: O(n)
Space Complexity: O(k)

Pattern Notes:
  - Variable window sliding window approach
  - Expand window by moving right pointer and adding characters
  - Use Map to count frequency of characters in current window
  - When distinct characters exceed k, shrink window from left
  - Keep track of maximum window size that satisfies the constraint
  - Remove characters from map when their count becomes 0
*/

export const functionName = 'lengthOfLongestSubstringKDistinct';

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
    input: ["abaccc", 2],
    expected: 4
  },
  {
    input: ["abcdef", 3],
    expected: 3
  },
  {
    input: ["aaaaaaa", 3],
    expected: 7
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
  }
];

/**
 * Finds length of longest substring with at most k distinct characters
 * @param {string} s - Input string
 * @param {number} k - Maximum number of distinct characters allowed
 * @return {number} Length of longest valid substring
 */
function lengthOfLongestSubstringKDistinct(s, k) {
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

export default lengthOfLongestSubstringKDistinct;