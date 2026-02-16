/*
Problem: Valid Palindrome II
Difficulty: Easy
Category: Strings, Two Pointers
LeetCode: #680
Pattern: Two Pointers (Opposite Direction)

Given a string s, return true if the s can be palindrome after deleting at most
one character from it.

Example 1:
  Input: s = "aba"
  Output: true

Example 2:
  Input: s = "abca"
  Output: true
  Explanation: You could delete the character 'c'.

Example 3:
  Input: s = "abc"
  Output: false

Example 4:
  Input: s = "raceacar"
  Output: true
  Explanation: You could delete the character 'e'.

Constraints:
  - 1 <= s.length <= 10^5
  - s consists of lowercase English letters.

Time Complexity: O(n)
Space Complexity: O(1)

Pattern Notes:
  - Use two pointers from opposite ends
  - When characters don't match, try removing left OR right character
  - Check if remaining substring is palindrome in both cases
  - Helper function to check palindrome of substring
  - At most one deletion allowed
*/

export const functionName = 'validPalindrome';

const isItaPalindrome = (
  string: string,
  left: number,
  right: number,
): boolean => {
  while (left < right) {
    if (string[left] !== string[right]) return false;

    left++;
    right--;
  }
  return true;
};

export const validPalindrome = (string: string): boolean => {
  let left = 0;
  let right = string.length - 1;
  let counter = 0;

  while (left < right) {
    if (string[right] !== string[left]) {
      if (counter >= 1) return false;
      counter++;

      if (string[left] === string[right - 1]) {
        right--;
      } else if (string[left + 1] === string[right]) {
        left++;
      } else {
        return false;
      }
      //we can pass into our helper left + 1 and right -1
      // return (
      //   isItaPalindrome(string, left + 1, right) ||
      //   isItaPalindrome(string, left, right - 1)
      // );
    }
    left++;
    right--;
  }
  return true;
};
export const tests = [
  {
    input: ['aba'],
    expected: true,
  },
  {
    input: ['abca'],
    expected: true,
  },
  {
    input: ['abc'],
    expected: false,
  },
  {
    input: ['raceacar'],
    expected: true,
  },
  {
    input: ['a'],
    expected: true,
  },
  {
    input: ['ab'],
    expected: true,
  },
  {
    input: ['deeee'],
    expected: true,
  },
  {
    input: ['abcddcbea'],
    expected: true,
  },
  // Boundary: two identical chars (already palindrome)
  {
    input: ['aa'],
    expected: true,
  },
  // All same characters (15 elements)
  {
    input: ['aaaaaaaaaaaaaaa'],
    expected: true,
  },
  // Needs to remove first or last char
  {
    input: ['cbbcc'],
    expected: true,
  },
  // Larger input: clearly not fixable with one deletion
  {
    input: ['abcdefghij'],
    expected: false,
  },
  // Alternating pattern that fails
  {
    input: ['ababababab'],
    expected: false,
  },
];
