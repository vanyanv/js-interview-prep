/*
Problem: Permutation in String
Difficulty: Medium
Category: Hash Table, Two Pointers, String, Sliding Window
LeetCode: #567
Pattern: Fixed Window Sliding Window

Given two strings s1 and s2, return true if s2 contains a permutation of s1. In other words, return true if one of s1's permutations is the substring of s2.

Example 1:
  Input: s1 = "ab", s2 = "eidbaooo"
  Output: true
  Explanation: s2 contains one permutation of s1 ("ba").

Example 2:
  Input: s1 = "ab", s2 = "eidboaoo"
  Output: false

Example 3:
  Input: s1 = "adc", s2 = "dcda"
  Output: true
  Explanation: s2 contains permutation "dcd" + "a" = "dcda" which includes all characters of s1.

Example 4:
  Input: s1 = "hello", s2 = "ooolleoooleh"
  Output: false

Example 5:
  Input: s1 = "mart", s2 = "karma"
  Output: true
  Explanation: s2 contains permutation "arm" + "a" = "arma" which includes all characters of s1.

Constraints:
  - 1 <= s1.length, s2.length <= 10^4
  - s1 and s2 consist of lowercase English letters

Time Complexity: O(|s1| + |s2|)
Space Complexity: O(|s1|)

Pattern Notes:
  - Fixed window sliding window with window size = s1.length
  - A permutation means same characters with same frequencies
  - Use frequency map to track character counts in s1
  - Slide window of size s1.length through s2
  - For each window, check if character frequencies match s1
  - Can optimize by maintaining running frequency difference count
*/

export const functionName = 'checkInclusion';

export const tests = [
  {
    input: ["ab", "eidbaooo"],
    expected: true
  },
  {
    input: ["ab", "eidboaoo"],
    expected: false
  },
  {
    input: ["adc", "dcda"],
    expected: true
  },
  {
    input: ["hello", "ooolleoooleh"],
    expected: false
  },
  {
    input: ["mart", "karma"],
    expected: true
  },
  {
    input: ["a", "a"],
    expected: true
  },
  {
    input: ["abc", "bbbca"],
    expected: true
  },
  {
    input: ["abcdxabcde", "abcdeabcdx"],
    expected: true
  }
];

/**
 * Checks if s2 contains any permutation of s1
 * @param {string} s1 - Pattern string to find permutation of
 * @param {string} s2 - Text string to search in
 * @return {boolean} True if s2 contains a permutation of s1
 */
function checkInclusion(s1, s2) {
    if (s1.length > s2.length) return false;

    // Count frequency of characters in s1
    const s1Count = new Map();
    for (const char of s1) {
        s1Count.set(char, (s1Count.get(char) || 0) + 1);
    }

    const windowSize = s1.length;
    const windowCount = new Map();

    // Initialize first window
    for (let i = 0; i < windowSize; i++) {
        const char = s2[i];
        windowCount.set(char, (windowCount.get(char) || 0) + 1);
    }

    // Check if first window matches
    if (mapsEqual(s1Count, windowCount)) {
        return true;
    }

    // Slide the window
    for (let i = windowSize; i < s2.length; i++) {
        // Add new character to window
        const newChar = s2[i];
        windowCount.set(newChar, (windowCount.get(newChar) || 0) + 1);

        // Remove old character from window
        const oldChar = s2[i - windowSize];
        windowCount.set(oldChar, windowCount.get(oldChar) - 1);
        if (windowCount.get(oldChar) === 0) {
            windowCount.delete(oldChar);
        }

        // Check if current window matches
        if (mapsEqual(s1Count, windowCount)) {
            return true;
        }
    }

    return false;
}

/**
 * Helper function to check if two maps are equal
 * @param {Map} map1 - First map
 * @param {Map} map2 - Second map
 * @return {boolean} True if maps have same key-value pairs
 */
function mapsEqual(map1, map2) {
    if (map1.size !== map2.size) return false;

    for (const [key, value] of map1) {
        if (map2.get(key) !== value) return false;
    }

    return true;
}

export default checkInclusion;