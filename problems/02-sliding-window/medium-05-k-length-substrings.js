/*
Problem: Find All Substrings of Length K with Unique Characters
Difficulty: Medium
Category: String, Sliding Window, Hash Table
Pattern: Fixed Window Sliding Window

Given a string s and an integer k, return all unique substrings of length k that contain only unique characters.

Example 1:
  Input: s = "abcabc", k = 3
  Output: ["abc"]
  Explanation:
    - "abc" (positions 0-2): all unique characters ✓
    - "bca" (positions 1-3): all unique characters ✓ (but duplicate of "abc" when sorted)
    - "cab" (positions 2-4): all unique characters ✓ (but duplicate of "abc" when sorted)
    - "abc" (positions 3-5): all unique characters ✓ (duplicate)
    Result: ["abc"]

Example 2:
  Input: s = "abacadaeaf", k = 3
  Output: ["aba", "bac", "aca", "cad", "ada", "dae", "aea", "eaf"]
  Explanation: All substrings of length 3 happen to have all unique characters.

Example 3:
  Input: s = "aabbcc", k = 3
  Output: ["abc"]
  Explanation:
    - "aab": has duplicate 'a'
    - "abb": has duplicate 'b'
    - "bbc": has duplicate 'b'
    - "bcc": has duplicate 'c'
    Only "abc" would have unique characters, but it doesn't exist in this string.

Example 4:
  Input: s = "abcdefg", k = 4
  Output: ["abcd", "bcde", "cdef", "defg"]

Constraints:
  - 1 <= s.length <= 10^4
  - 1 <= k <= s.length
  - s consists of lowercase English letters

Time Complexity: O(n * k)
Space Complexity: O(k)

Pattern Notes:
  - Fixed window sliding window of size k
  - Use a Set or frequency map to track unique characters in current window
  - If window has k unique characters, add to result
  - Use Set to avoid duplicate results
  - Slide window by removing leftmost character and adding rightmost character
*/

export const functionName = 'findKLengthSubstrings';

export const tests = [
  {
    input: ["abcabc", 3],
    expected: ["abc"]
  },
  {
    input: ["abacadaeaf", 3],
    expected: ["aba", "bac", "aca", "cad", "ada", "dae", "aea", "eaf"]
  },
  {
    input: ["aabbcc", 3],
    expected: []
  },
  {
    input: ["abcdefg", 4],
    expected: ["abcd", "bcde", "cdef", "defg"]
  },
  {
    input: ["a", 1],
    expected: ["a"]
  },
  {
    input: ["aab", 2],
    expected: ["ab"]
  },
  {
    input: ["abcdefghijk", 1],
    expected: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"]
  },
  {
    input: ["aaaa", 2],
    expected: []
  },
  {
    input: ["abcdefghijklmnopqrstuvwxyz", 26],
    expected: ["abcdefghijklmnopqrstuvwxyz"]
  },
  {
    input: ["abababababababababab", 2],
    expected: ["ab"]
  },
  {
    input: ["abcabcabcabcabcabcabc", 3],
    expected: ["abc"]
  },
  {
    input: ["zz", 1],
    expected: ["z"]
  }
];

/**
 * Finds all substrings of length k with unique characters
 * @param {string} s - Input string
 * @param {number} k - Length of substrings
 * @return {string[]} Array of unique substrings with all unique characters
 */
function findKLengthSubstrings(s, k) {
    if (s.length < k) return [];

    const result = new Set(); // Use Set to avoid duplicates
    const charCount = new Map();

    // Initialize first window
    for (let i = 0; i < k; i++) {
        charCount.set(s[i], (charCount.get(s[i]) || 0) + 1);
    }

    // Check if first window has all unique characters
    if (charCount.size === k) {
        result.add(s.substring(0, k));
    }

    // Slide the window
    for (let i = k; i < s.length; i++) {
        // Remove leftmost character
        const leftChar = s[i - k];
        charCount.set(leftChar, charCount.get(leftChar) - 1);
        if (charCount.get(leftChar) === 0) {
            charCount.delete(leftChar);
        }

        // Add rightmost character
        const rightChar = s[i];
        charCount.set(rightChar, (charCount.get(rightChar) || 0) + 1);

        // Check if current window has all unique characters
        if (charCount.size === k) {
            result.add(s.substring(i - k + 1, i + 1));
        }
    }

    return Array.from(result).sort(); // Convert Set to sorted array
}

export default findKLengthSubstrings;