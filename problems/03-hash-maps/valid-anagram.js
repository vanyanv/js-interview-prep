/*
Problem: Valid Anagram
Difficulty: Easy
Category: Strings, Hash Map
LeetCode: #242
Pattern: Character Frequency Counting

Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different
word or phrase, typically using all the original letters exactly once.

Example 1:
  Input: s = "anagram", t = "nagaram"
  Output: true

Example 2:
  Input: s = "rat", t = "car"
  Output: false

Example 3:
  Input: s = "listen", t = "silent"
  Output: true

Example 4:
  Input: s = "evil", t = "vile"
  Output: true

Constraints:
  - 1 <= s.length, t.length <= 5 * 10^4
  - s and t consist of lowercase English letters only.

Time Complexity: O(n)
Space Complexity: O(1) - at most 26 characters

Hash Map Pattern Notes:
  - Count frequency of each character in both strings
  - Use Map or object to store character counts
  - Compare frequency maps for equality
  - Early return if lengths differ
  - Alternative: sort both strings and compare
*/

export const functionName = 'isAnagram';

export const tests = [
  {
    input: ["anagram", "nagaram"],
    expected: true
  },
  {
    input: ["rat", "car"],
    expected: false
  },
  {
    input: ["listen", "silent"],
    expected: true
  },
  {
    input: ["evil", "vile"],
    expected: true
  },
  {
    input: ["a", "ab"],
    expected: false
  },
  {
    input: ["ab", "a"],
    expected: false
  },
  {
    input: ["", ""],
    expected: true
  },
  {
    input: ["aab", "baa"],
    expected: true
  }
];