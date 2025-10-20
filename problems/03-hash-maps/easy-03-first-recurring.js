/*
Problem: First Recurring Character
Difficulty: Easy
Category: Strings, Hash Set
Pattern: First Duplicate Detection

Given a string, find the first recurring character in it. We need to find
the character for which the second occurrence has the minimal index.

In other words, if there are multiple characters that repeat, return the
one whose second occurrence comes first.

Example 1:
  Input: s = "abccba"
  Output: "c"
  Explanation: The first recurring character is 'c', which occurs at positions 2 and 3.

Example 2:
  Input: s = "abcdef"
  Output: ""
  Explanation: No character repeats.

Example 3:
  Input: s = "hello"
  Output: "l"
  Explanation: 'l' is the first character to repeat.

Example 4:
  Input: s = "abba"
  Output: "b"
  Explanation: 'b' repeats first (at positions 1 and 2).

Constraints:
  - 1 <= s.length <= 10^5
  - s consists of lowercase English letters only.

Time Complexity: O(n)
Space Complexity: O(1) - at most 26 characters

Hash Set Pattern Notes:
  - Use Set to track characters we've seen
  - Return first character that's already in the Set
  - One pass through string is sufficient
  - Return empty string if no character repeats
  - Set.has() provides O(1) lookup time
*/

export const functionName = 'firstRecurringChar';

export const tests = [
  {
    input: ["abccba"],
    expected: "c"
  },
  {
    input: ["abcdef"],
    expected: ""
  },
  {
    input: ["hello"],
    expected: "l"
  },
  {
    input: ["abba"],
    expected: "b"
  },
  {
    input: ["a"],
    expected: ""
  },
  {
    input: ["aabbcc"],
    expected: "a"
  },
  {
    input: ["abcdea"],
    expected: "a"
  },
  {
    input: ["programming"],
    expected: "r"
  }
];