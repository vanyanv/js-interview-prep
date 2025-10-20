/*
Problem: First Unique Character in a String
Difficulty: Easy
Category: Strings, Hash Map
LeetCode: #387
Pattern: Character Frequency + First Occurrence

Given a string s, find the first non-repeating character in it and return
its index. If it does not exist, return -1.

Example 1:
  Input: s = "leetcode"
  Output: 0

Example 2:
  Input: s = "loveleetcode"
  Output: 2

Example 3:
  Input: s = "aabb"
  Output: -1

Example 4:
  Input: s = "abccba"
  Output: -1

Constraints:
  - 1 <= s.length <= 10^5
  - s consists of only lowercase English letters.

Time Complexity: O(n)
Space Complexity: O(1) - at most 26 characters

Hash Map Pattern Notes:
  - First pass: count frequency of each character
  - Second pass: find first character with frequency 1
  - Use Map or object to store character frequencies
  - Return index of first unique character, -1 if none
  - Two-pass solution is more efficient than checking uniqueness for each char
*/

export const functionName = 'firstUniqChar';

export const tests = [
  {
    input: ["leetcode"],
    expected: 0
  },
  {
    input: ["loveleetcode"],
    expected: 2
  },
  {
    input: ["aabb"],
    expected: -1
  },
  {
    input: ["abccba"],
    expected: -1
  },
  {
    input: ["a"],
    expected: 0
  },
  {
    input: ["abacabad"],
    expected: 2
  },
  {
    input: ["aabcbc"],
    expected: -1
  },
  {
    input: ["dddccdbba"],
    expected: 8
  }
];