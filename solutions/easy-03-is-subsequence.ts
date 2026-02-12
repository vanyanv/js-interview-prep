/*
Problem: Is Subsequence
Difficulty: Easy
Category: Strings, Dynamic Programming, Two Pointers
LeetCode: #392
Pattern: Two Pointers (Same Direction)

Given two strings s and t, return true if s is a subsequence of t, or false otherwise.

A subsequence of a string is a new string that is formed from the original string
by deleting some (can be zero) of the characters without disturbing the relative
positions of the remaining characters. (i.e., "ace" is a subsequence of "abcde"
while "aec" is not).

Example 1:
  Input: s = "abc", t = "ahabgdc"
  Output: true

Example 2:
  Input: s = "axc", t = "ahbgdc"
  Output: false

Example 3:
  Input: s = "", t = "ahbgdc"
  Output: true

Example 4:
  Input: s = "abc", t = "abc"
  Output: true

Constraints:
  - 0 <= s.length <= 100
  - 0 <= t.length <= 10^4
  - s and t consist only of lowercase English letters.

Time Complexity: O(n) where n is length of t
Space Complexity: O(1)

Pattern Notes:
  - Use two pointers, one for each string
  - Move pointer in t for every character
  - Move pointer in s only when characters match
  - Return true if we've matched all characters in s
  - Early termination when remaining characters in t < remaining in s
*/

export const functionName = 'isSubsequence';

export const isSubsequence = (string1: string, string2: string): boolean => {
  let pointer1: 0;
  let pointer2: 0;

  while (pointer1 < string1.length) {
    
  }

  return false;


  return true;
}

export const tests = [
  {
    input: ['abc', 'ahabgdc'],
    expected: true,
  },
  {
    input: ['axc', 'ahbgdc'],
    expected: false,
  },
  {
    input: ['', 'ahbgdc'],
    expected: true,
  },
  {
    input: ['abc', 'abc'],
    expected: true,
  },
  {
    input: ['abc', ''],
    expected: false,
  },
  {
    input: ['b', 'abc'],
    expected: true,
  },
  {
    input: ['abc', 'aXbYcZ'],
    expected: true,
  },
  {
    input: ['acb', 'ahbgdc'],
    expected: false,
  },
  {
    input: ['', ''],
    expected: true,
  },
  {
    input: ['a', 'a'],
    expected: true,
  },
  {
    input: ['z', 'abcdefghijklmnopqrstuvwxyz'],
    expected: true,
  },
  {
    input: ['abcdefghij', 'aXbXcXdXeXfXgXhXiXjX'],
    expected: true,
  },
  {
    input: ['aaa', 'aaaa'],
    expected: true,
  },
];
