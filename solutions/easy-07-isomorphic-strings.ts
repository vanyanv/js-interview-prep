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

export const isIsomorphic = (s: string, t: string): boolean => {
  // quickly check strings to check if immediately can return false
  if (s.length !== t.length) {return false};

  // create a map to track first string letter with its value being the second string letter
  const sMap = new Map<string, string>();
  const tMap = new Map<string, string>();

  // iterate through first string
  for (let i = 0; i < s.length; i++) {
    // add in checking logic
    if (sMap.has(s[i])) {
      // This logic will keep checking to see if checks fail and return false
      if (sMap.get(s[i]) !== t[i]) {
        return false;
      }
    } else {
      sMap.set(s[i], t[i]);
    }
  }

  // iterate through second string
  for (let j = 0; j < t.length; j++) {
    // add in checking logic
    if (tMap.has(t[j])) {
      // This logic will keep checking to see if checks fail and return false
      if (tMap.get(t[j]) !== s[j]) {
        return false;
      }
    } else {
      tMap.set(t[j], s[j]);
    }
  }
  // return true if no tests fail
  return true;
}

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
  },
  // All-same-values: both strings are one repeated character
  {
    input: ["aaaa", "bbbb"],
    expected: true
  },
  // Single character strings
  {
    input: ["a", "z"],
    expected: true
  },
  // Mapping conflict in reverse direction: a->a, b->a fails (two chars map to same)
  {
    input: ["ab", "aa"],
    expected: false
  },
  // Longer palindromic pattern mapping
  {
    input: ["abcba", "xyzyx"],
    expected: true
  },
  // All same in s but different in t
  {
    input: ["aaa", "abc"],
    expected: false
  }
];