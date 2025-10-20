/*
Problem: Isomorphic Strings
Difficulty: Easy
Category: Strings, Hash Map
LeetCode: #205
Pattern: Bidirectional Character Mapping

Given two strings s and t, determine if they are isomorphic.

Two strings s and t are isomorphic if the characters in s can be replaced
to get t.

All occurrences of a character must be replaced with the same character
while preserving the order of characters. No two characters may map to
the same character, but a character may map to itself.

Example 1:
  Input: s = "egg", t = "add"
  Output: true

Example 2:
  Input: s = "foo", t = "bar"
  Output: false

Example 3:
  Input: s = "paper", t = "title"
  Output: true

Example 4:
  Input: s = "ab", t = "aa"
  Output: false

Constraints:
  - 1 <= s.length <= 5 * 10^4
  - t.length == s.length
  - s and t consist of any valid ascii character.

Time Complexity: O(n)
Space Complexity: O(1) - at most 256 ASCII characters

Hash Map Pattern Notes:
  - Need two Maps: s->t mapping and t->s mapping
  - Check both directions to ensure one-to-one mapping
  - If mapping exists, verify consistency
  - If no mapping exists, create new mapping
  - Bidirectional mapping prevents many-to-one relationships
*/

export const functionName = 'isIsomorphic';

export const tests = [
  {
    input: ["egg", "add"],
    expected: true
  },
  {
    input: ["foo", "bar"],
    expected: false
  },
  {
    input: ["paper", "title"],
    expected: true
  },
  {
    input: ["ab", "aa"],
    expected: false
  },
  {
    input: ["ab", "ca"],
    expected: true
  },
  {
    input: ["abc", "def"],
    expected: true
  },
  {
    input: ["badc", "baba"],
    expected: false
  },
  {
    input: ["abcdefghijklmnopqrstuvwxyz", "abcdefghijklmnopqrstuvwxyz"],
    expected: true
  }
];