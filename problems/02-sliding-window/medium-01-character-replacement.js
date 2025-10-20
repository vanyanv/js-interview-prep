/*
Problem: Longest Repeating Character Replacement
Difficulty: Medium
Category: Hash Table, String, Sliding Window
LeetCode: #424
Pattern: Variable Window Sliding Window

You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times.

Return the length of the longest substring containing the same letter you can get after performing the above operations.

Example 1:
  Input: s = "ABAB", k = 2
  Output: 4
  Explanation: Replace the two 'A's with two 'B's or vice versa.

Example 2:
  Input: s = "AABABBA", k = 1
  Output: 4
  Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
  The substring "BBBB" has the longest repeating letters, which is 4.

Example 3:
  Input: s = "ABCDE", k = 1
  Output: 2
  Explanation: Replace any one character to get a substring of length 2 with repeating characters.

Example 4:
  Input: s = "AAAA", k = 0
  Output: 4
  Explanation: The entire string already has repeating characters.

Example 5:
  Input: s = "ABAB", k = 0
  Output: 1
  Explanation: No replacements allowed, so maximum length is 1.

Constraints:
  - 1 <= s.length <= 10^5
  - s consists of only uppercase English letters
  - 0 <= k <= s.length

Time Complexity: O(n)
Space Complexity: O(1) - at most 26 characters in map

Pattern Notes:
  - Variable window sliding window approach
  - Track frequency of characters in current window
  - Window is valid if (window_length - max_frequency) <= k
  - This means we can change at most k characters to match the most frequent character
  - Expand window by moving right pointer
  - Shrink window when it becomes invalid
  - Keep track of maximum valid window size
*/

export const functionName = 'characterReplacement';

export const tests = [
  {
    input: ["ABAB", 2],
    expected: 4
  },
  {
    input: ["AABABBA", 1],
    expected: 4
  },
  {
    input: ["ABCDE", 1],
    expected: 2
  },
  {
    input: ["AAAA", 0],
    expected: 4
  },
  {
    input: ["ABAB", 0],
    expected: 1
  },
  {
    input: ["AAABBBCCC", 2],
    expected: 5
  },
  {
    input: ["A", 1],
    expected: 1
  },
  {
    input: ["AABCABAA", 2],
    expected: 5
  }
];

/**
 * Finds longest substring with same character after k replacements
 * @param {string} s - Input string of uppercase letters
 * @param {number} k - Maximum number of character replacements allowed
 * @return {number} Length of longest valid substring
 */
function characterReplacement(s, k) {
    const charCount = new Map();
    let left = 0;
    let maxLength = 0;
    let maxCount = 0; // Max frequency of any character in current window

    for (let right = 0; right < s.length; right++) {
        const rightChar = s[right];

        // Add current character to window
        charCount.set(rightChar, (charCount.get(rightChar) || 0) + 1);
        maxCount = Math.max(maxCount, charCount.get(rightChar));

        // Check if current window is valid
        // Window is valid if we can change at most k characters to match the most frequent one
        const windowLength = right - left + 1;

        if (windowLength - maxCount > k) {
            // Window is invalid, shrink from left
            const leftChar = s[left];
            charCount.set(leftChar, charCount.get(leftChar) - 1);
            left++;
        }

        // Update maximum length (window is guaranteed to be valid here)
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}

export default characterReplacement;