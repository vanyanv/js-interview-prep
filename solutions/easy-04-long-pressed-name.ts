/*
Problem: Long Pressed Name
Difficulty: Easy
Category: Two Pointers, String
LeetCode: #925
Pattern: Two Pointers (Same Direction)

Your friend is typing his name into a keyboard. Sometimes, when typing a character c,
the key might get long pressed, and the character will be typed 1 or more times.

You examine the typed characters and return True if it is possible that it was your
friend's name, with some characters (possibly none) being long pressed.

Example 1:
  Input: name = "alex", typed = "aaleex"
  Output: true
  Explanation: 'a' and 'e' in 'alex' were long pressed.

Example 2:
  Input: name = "saeed", typed = "ssaaedd"
  Output: false
  Explanation: 'e' must have been pressed twice, but it was not in the original name.

Example 3:
  Input: name = "leelee", typed = "lleeelee"
  Output: true

Example 4:
  Input: name = "laiden", typed = "laiden"
  Output: true

Constraints:
  - 1 <= name.length, typed.length <= 1000
  - name and typed consist of only lowercase English letters.

Time Complexity: O(n + m) where n and m are lengths of name and typed
Space Complexity: O(1)

Pattern Notes:
  - Use two pointers, one for each string
  - When characters match, advance both pointers
  - When characters don't match, check if typed char equals previous char
  - If so, advance only typed pointer (long press scenario)
  - If not, return false
  - Ensure all characters in name are matched
*/

export const functionName = 'isLongPressedName';

export const isLongPressedName = (name: string, typed: string): boolean => {

  //create pointer 1
  //create pointer 2

  //i keep pointer 1 on name
  //i have pointer 2 on typed
  return false;
};

export const tests = [
  {
    input: ['alex', 'aaleex'],
    expected: true,
  },
  {
    input: ['saeed', 'ssaaedd'],
    expected: false,
  },
  {
    input: ['leelee', 'lleeelee'],
    expected: true,
  },
  {
    input: ['laiden', 'laiden'],
    expected: true,
  },
  {
    input: ['alex', 'aaleexa'],
    expected: false,
  },
  {
    input: ['alex', 'alex'],
    expected: true,
  },
  {
    input: ['pyplrz', 'ppyypllr'],
    expected: false,
  },
  {
    input: ['vtkgn', 'vttkgnn'],
    expected: true,
  },
  {
    input: ['a', 'a'],
    expected: true,
  },
  {
    input: ['a', 'b'],
    expected: false,
  },
  {
    input: ['aaa', 'aaaaaaa'],
    expected: true,
  },
  {
    input: ['ab', 'ba'],
    expected: false,
  },
  {
    input: ['abcde', 'aabbccddeee'],
    expected: true,
  },
];
