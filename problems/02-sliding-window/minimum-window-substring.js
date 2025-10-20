/*
Problem: Minimum Window Substring
Difficulty: Hard
Category: Hash Table, String, Sliding Window
LeetCode: #76
Pattern: Variable Window Sliding Window

Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such window, return the empty string "".

The testcases will be generated such that the answer is unique.

Example 1:
  Input: s = "ADOBECODEBANC", t = "ABC"
  Output: "BANC"
  Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.

Example 2:
  Input: s = "a", t = "a"
  Output: "a"
  Explanation: The entire string s is the minimum window.

Example 3:
  Input: s = "a", t = "aa"
  Output: ""
  Explanation: Both 'a's from t must be included in the window.
  Since the largest window of s only has one 'a', return empty string.

Example 4:
  Input: s = "ab", t = "b"
  Output: "b"

Example 5:
  Input: s = "bba", t = "ab"
  Output: "ba"

Constraints:
  - m == s.length
  - n == t.length
  - 1 <= m, n <= 10^5
  - s and t consist of uppercase and lowercase English letters

Follow up: Could you find an algorithm that runs in O(m + n) time?

Time Complexity: O(m + n)
Space Complexity: O(m + n)

Pattern Notes:
  - Variable window sliding window approach
  - Expand window until all characters of t are included
  - Once valid window found, try to shrink from left while maintaining validity
  - Track minimum valid window found
  - Use frequency maps to track required characters and current window characters
  - Use a counter to track how many required characters are satisfied
*/

export const functionName = 'minWindow';

export const tests = [
  {
    input: ["ADOBECODEBANC", "ABC"],
    expected: "BANC"
  },
  {
    input: ["a", "a"],
    expected: "a"
  },
  {
    input: ["a", "aa"],
    expected: ""
  },
  {
    input: ["ab", "b"],
    expected: "b"
  },
  {
    input: ["bba", "ab"],
    expected: "ba"
  },
  {
    input: ["abc", "cba"],
    expected: "abc"
  },
  {
    input: ["ADOBECODEBANC", "AABC"],
    expected: "ADOBEC"
  },
  {
    input: ["aa", "aa"],
    expected: "aa"
  }
];

/**
 * Finds minimum window substring containing all characters of t
 * @param {string} s - Source string
 * @param {string} t - Target string with required characters
 * @return {string} Minimum window substring, empty string if not found
 */
function minWindow(s, t) {
    if (s.length < t.length) return "";

    // Count required characters
    const required = new Map();
    for (const char of t) {
        required.set(char, (required.get(char) || 0) + 1);
    }

    let left = 0;
    let right = 0;
    let formed = 0; // Number of unique characters in current window with desired frequency
    const requiredCount = required.size;

    // Current window character counts
    const windowCounts = new Map();

    // Result
    let minLen = Infinity;
    let minLeft = 0;

    while (right < s.length) {
        // Add character from right to window
        const rightChar = s[right];
        windowCounts.set(rightChar, (windowCounts.get(rightChar) || 0) + 1);

        // If current character's frequency matches required frequency, increment formed
        if (required.has(rightChar) && windowCounts.get(rightChar) === required.get(rightChar)) {
            formed++;
        }

        // Try to contract window until it ceases to be 'desirable'
        while (left <= right && formed === requiredCount) {
            // Update result if current window is smaller
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                minLeft = left;
            }

            // Remove character from left of window
            const leftChar = s[left];
            windowCounts.set(leftChar, windowCounts.get(leftChar) - 1);

            // If character is required and its count drops below required, decrement formed
            if (required.has(leftChar) && windowCounts.get(leftChar) < required.get(leftChar)) {
                formed--;
            }

            left++;
        }

        right++;
    }

    return minLen === Infinity ? "" : s.substring(minLeft, minLeft + minLen);
}

export default minWindow;