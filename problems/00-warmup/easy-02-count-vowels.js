/*
Problem: Count Vowels
Difficulty: Warmup
Category: Strings - Fundamentals

Given a string, count the number of vowels (a, e, i, o, u).
Count both uppercase and lowercase vowels.

Example 1:
  Input: s = "hello"
  Output: 2

Example 2:
  Input: s = "JavaScript"
  Output: 3

Example 3:
  Input: s = "xyz"
  Output: 0

Constraints:
  - 0 <= s.length <= 1000
  - s consists of letters only

Time Complexity: O(n)
Space Complexity: O(1)

Hints:
  - Create a set or string of vowels to check against
  - Loop through string and check if each character is a vowel
  - Remember to handle both cases (toLowerCase())
*/

export const functionName = 'countVowels';

export const tests = [
  {
    input: ["hello"],
    expected: 2
  },
  {
    input: ["JavaScript"],
    expected: 3
  },
  {
    input: ["xyz"],
    expected: 0
  },
  {
    input: [""],
    expected: 0
  },
  {
    input: ["AEIOU"],
    expected: 5
  },
  {
    input: ["Programming"],
    expected: 3
  }
];