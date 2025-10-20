/*
Problem: Longest Substring Without Repeating Characters
Difficulty: Medium
Category: Hash Table, String, Sliding Window
LeetCode: #3
Pattern: Variable Window Sliding Window

Given a string s, find the length of the longest substring without repeating characters.

Example 1:
  Input: s = "abcabcbb"
  Output: 3
  Explanation: The answer is "abc", with the length of 3.

Example 2:
  Input: s = "bbbbb"
  Output: 1
  Explanation: The answer is "b", with the length of 1.

Example 3:
  Input: s = "pwwkew"
  Output: 3
  Explanation: The answer is "wke", with the length of 3.
  Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

Example 4:
  Input: s = ""
  Output: 0
  Explanation: Empty string has no substrings.

Example 5:
  Input: s = "dvdf"
  Output: 3
  Explanation: The answer is "vdf", with the length of 3.

Constraints:
  - 0 <= s.length <= 5 * 10^4
  - s consists of English letters, digits, symbols and spaces

Time Complexity: O(n)
Space Complexity: O(min(m, n)) where m is size of character set

Pattern Notes:
  - Use variable window sliding window approach
  - Expand window by moving right pointer
  - Use Set or Map to track characters in current window
  - When duplicate found, shrink window from left until duplicate is removed
  - Keep track of maximum window size encountered
  - Alternative: Use Map to store character -> index for more efficient left pointer updates
*/

export const functionName = 'lengthOfLongestSubstring';

export const tests = [
  {
    input: ["abcabcbb"],
    expected: 3
  },
  {
    input: ["bbbbb"],
    expected: 1
  },
  {
    input: ["pwwkew"],
    expected: 3
  },
  {
    input: [""],
    expected: 0
  },
  {
    input: ["dvdf"],
    expected: 3
  },
  {
    input: ["abcdef"],
    expected: 6
  },
  {
    input: ["a"],
    expected: 1
  },
  {
    input: ["au"],
    expected: 2
  }
];

/**
 * Finds length of longest substring without repeating characters
 * @param {string} s - Input string
 * @return {number} Length of longest valid substring
 */
function lengthOfLongestSubstring(s) {
    const charMap = new Map(); // character -> last seen index
    let left = 0;
    let maxLength = 0;

    for (let right = 0; right < s.length; right++) {
        const currentChar = s[right];

        // If character is seen before and is within current window
        if (charMap.has(currentChar) && charMap.get(currentChar) >= left) {
            // Move left pointer to position after the duplicate
            left = charMap.get(currentChar) + 1;
        }

        // Update character's last seen position
        charMap.set(currentChar, right);

        // Update maximum length
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}

export default lengthOfLongestSubstring;