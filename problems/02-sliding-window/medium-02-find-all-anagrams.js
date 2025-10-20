/*
Problem: Find All Anagrams in a String
Difficulty: Medium
Category: Hash Table, String, Sliding Window
LeetCode: #438
Pattern: Fixed Window Sliding Window

Given two strings s and p, return an array of all the start indices of p's anagrams in s. You may return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

Example 1:
  Input: s = "abab", p = "ab"
  Output: [0, 2]
  Explanation:
  The substring with start index 0 is "ab", which is an anagram of "ab".
  The substring with start index 2 is "ab", which is an anagram of "ab".

Example 2:
  Input: s = "abacbabc", p = "abc"
  Output: [1, 4]
  Explanation:
  The substring with start index 1 is "bac", which is an anagram of "abc".
  The substring with start index 4 is "abc", which is an anagram of "abc".

Example 3:
  Input: s = "aaab", p = "aab"
  Output: [1]
  Explanation:
  The substring with start index 1 is "aab", which is an anagram of "aab".

Example 4:
  Input: s = "abcdefghijk", p = "abc"
  Output: [0]

Constraints:
  - 1 <= s.length, p.length <= 3 * 10^4
  - s and p consist of lowercase English letters

Time Complexity: O(|s| + |p|)
Space Complexity: O(|p|)

Pattern Notes:
  - Fixed window sliding window with window size = p.length
  - Anagrams have same characters with same frequencies
  - Use frequency map to track character counts in p
  - Slide window of size p.length through s
  - For each window position, check if frequencies match p
  - Collect all starting indices where match is found
*/

export const functionName = 'findAnagrams';

export const tests = [
  {
    input: ["abab", "ab"],
    expected: [0, 2]
  },
  {
    input: ["abacbabc", "abc"],
    expected: [1, 4]
  },
  {
    input: ["aaab", "aab"],
    expected: [1]
  },
  {
    input: ["abcdefghijk", "abc"],
    expected: [0]
  },
  {
    input: ["aa", "bb"],
    expected: []
  },
  {
    input: ["aab", "ab"],
    expected: [1]
  },
  {
    input: ["ababacb", "ab"],
    expected: [0, 2, 4]
  },
  {
    input: ["baa", "aa"],
    expected: [1]
  }
];

/**
 * Finds all starting indices of anagrams of p in s
 * @param {string} s - Text string to search in
 * @param {string} p - Pattern string to find anagrams of
 * @return {number[]} Array of starting indices where anagrams are found
 */
function findAnagrams(s, p) {
    if (p.length > s.length) return [];

    const result = [];

    // Count frequency of characters in p
    const pCount = new Map();
    for (const char of p) {
        pCount.set(char, (pCount.get(char) || 0) + 1);
    }

    const windowSize = p.length;
    const windowCount = new Map();

    // Initialize first window
    for (let i = 0; i < windowSize; i++) {
        const char = s[i];
        windowCount.set(char, (windowCount.get(char) || 0) + 1);
    }

    // Check if first window is an anagram
    if (mapsEqual(pCount, windowCount)) {
        result.push(0);
    }

    // Slide the window
    for (let i = windowSize; i < s.length; i++) {
        // Add new character to window
        const newChar = s[i];
        windowCount.set(newChar, (windowCount.get(newChar) || 0) + 1);

        // Remove old character from window
        const oldChar = s[i - windowSize];
        windowCount.set(oldChar, windowCount.get(oldChar) - 1);
        if (windowCount.get(oldChar) === 0) {
            windowCount.delete(oldChar);
        }

        // Check if current window is an anagram
        if (mapsEqual(pCount, windowCount)) {
            result.push(i - windowSize + 1);
        }
    }

    return result;
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

export default findAnagrams;