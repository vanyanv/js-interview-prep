/*
Problem: Valid Palindrome
Difficulty: Easy
Category: Strings, Two Pointers
LeetCode: #125
Pattern: Two Pointers (Opposite Direction)

A phrase is a palindrome if, after converting all uppercase letters into
lowercase letters and removing all non-alphanumeric characters, it reads
the same forward and backward. Alphanumeric characters include letters
and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.

Example 1:
  Input: s = "A man, a plan, a canal: Panama"
  Output: true
  Explanation: "amanaplanacanalpanama" is a palindrome.

Example 2:
  Input: s = "race a car"
  Output: false
  Explanation: "raceacar" is not a palindrome.

Example 3:
  Input: s = " "
  Output: true
  Explanation: s is an empty string "" after removing non-alphanumeric characters.

Constraints:
  - 1 <= s.length <= 2 * 10^5
  - s consists only of printable ASCII characters.

Time Complexity: O(n)
Space Complexity: O(1)

Pattern Notes:
  - Clean the string OR use two pointers with character validation
  - Compare characters from both ends moving inward
  - Skip non-alphanumeric characters
  - Use toLowerCase() for case-insensitive comparison
*/

export const functionName = 'isPalindrome';

export const tests = [
  {
    input: ["A man, a plan, a canal: Panama"],
    expected: true
  },
  {
    input: ["race a car"],
    expected: false
  },
  {
    input: [" "],
    expected: true
  },
  {
    input: ["a"],
    expected: true
  },
  {
    input: ["ab"],
    expected: false
  },
  {
    input: ["0P"],
    expected: false
  },
  {
    input: ["Madam"],
    expected: true
  },
  {
    input: ["Was it a car or a cat I saw?"],
    expected: true
  },
  {
    input: [".,!@#$%"],
    expected: true
  },
  {
    input: ["12321"],
    expected: true
  },
  {
    input: ["abcba"],
    expected: true
  },
  {
    input: ["abccba"],
    expected: true
  }
];