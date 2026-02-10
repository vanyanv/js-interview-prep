/*
Problem: Reverse String
Difficulty: Easy
Category: Strings, Two Pointers
LeetCode: #344
Pattern: Two Pointers (Opposite Direction)

Write a function that reverses a string. The input string is given as an
array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.

Example 1:
  Input: s = ["h","e","l","l","o"]
  Output: ["o","l","l","e","h"]

Example 2:
  Input: s = ["H","a","n","n","a","h"]
  Output: ["h","a","n","n","a","H"]

Constraints:
  - 1 <= s.length <= 10^5
  - s[i] is a printable ascii character.

Time Complexity: O(n)
Space Complexity: O(1)


*/

export const reverseString = (array) => {
  //two pointer
  let left = 0;
  let right = array.length - 1;

  while (left < right) {
    [array[left], array[right]] = [array[right], array[left]];

    left++;
    right--;
  }

  return array;
};
export const functionName = 'reverseString';

export const tests = [
  {
    input: [['h', 'e', 'l', 'l', 'o']],
    expected: ['o', 'l', 'l', 'e', 'h'],
  },
  {
    input: [['H', 'a', 'n', 'n', 'a', 'h']],
    expected: ['h', 'a', 'n', 'n', 'a', 'H'],
  },
  {
    input: [['A']],
    expected: ['A'],
  },
  {
    input: [['a', 'b']],
    expected: ['b', 'a'],
  },
  {
    input: [['1', '2', '3', '4', '5']],
    expected: ['5', '4', '3', '2', '1'],
  },
];
