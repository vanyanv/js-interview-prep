/*
Problem: Minimum Window Substring
Difficulty: Hard
Category: Hash Table, String, Sliding Window
LeetCode: #76
Pattern: Two Pointers (Sliding Window)

Given two strings s and t of lengths m and n respectively, return the minimum window
substring of s such that every character in t (including duplicates) is included in
the window. If there is no such window in s that covers all characters in t, return
the empty string "".

Note that If there is such a window, it is guaranteed that there will always be only
one unique minimum window in s.

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

Constraints:
  - m == s.length
  - n == t.length
  - 1 <= m, n <= 10^5
  - s and t consist of uppercase and lowercase English letters.

Time Complexity: O(|s| + |t|)
Space Complexity: O(|s| + |t|)

Pattern Notes:
  - Use sliding window with two pointers (left and right)
  - Expand right pointer to include characters until window is valid
  - Contract left pointer to find minimum valid window
  - Use frequency maps to track required and current character counts
  - Track how many unique characters are satisfied
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
    input: ["acbbaca", "aba"],
    expected: "baca"
  },
  {
    input: ["cabwefgewcwaefgcf", "cae"],
    expected: "cwae"
  }
];

/**
 * Finds minimum window substring containing all characters of t
 * @param {string} s - Source string
 * @param {string} t - Target string
 * @return {string} Minimum window substring
 */
function minWindow(s, t) {
    if (s.length < t.length) return "";

    // Count characters in t
    const targetFreq = new Map();
    for (const char of t) {
        targetFreq.set(char, (targetFreq.get(char) || 0) + 1);
    }

    const required = targetFreq.size; // Number of unique characters in t
    let formed = 0; // Number of unique chars in current window with desired frequency

    // Sliding window
    const windowCounts = new Map();
    let left = 0;
    let right = 0;

    // Result
    let minLen = Infinity;
    let minStart = 0;

    while (right < s.length) {
        // Add character from right to the window
        const char = s[right];
        windowCounts.set(char, (windowCounts.get(char) || 0) + 1);

        // Check if frequency of current character matches desired count in t
        if (targetFreq.has(char) && windowCounts.get(char) === targetFreq.get(char)) {
            formed++;
        }

        // Try to contract the window until it ceases to be 'desirable'
        while (left <= right && formed === required) {
            // Update result if this window is smaller
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                minStart = left;
            }

            // Remove character from left
            const leftChar = s[left];
            windowCounts.set(leftChar, windowCounts.get(leftChar) - 1);

            if (targetFreq.has(leftChar) && windowCounts.get(leftChar) < targetFreq.get(leftChar)) {
                formed--;
            }

            left++;
        }

        right++;
    }

    return minLen === Infinity ? "" : s.substring(minStart, minStart + minLen);
}

export default minWindow;