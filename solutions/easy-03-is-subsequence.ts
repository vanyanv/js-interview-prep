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

  if (string1.length < 1) return true;
  
  let pointer1 = 0;
  let pointer2 = 0;

  // if I've interated through all of string1, I can return true
  // if I've iterated through all of string2, without reaching the end of string1, return false


  while (pointer1 < string1.length) {
    if (pointer2 === string2.length) return false;

    if (string1[pointer1] === string2[pointer2]) {
      pointer1++;
    }
    pointer2++;
    //logic to find
    //conditinal return false if string 1 is not a subsequence
      //return false
  }
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
