/*
Problem: Jewels and Stones
Difficulty: Easy
Category: Strings, Hash Set
LeetCode: #771
Pattern: Set Membership Check

You're given strings jewels representing the types of stones that are jewels,
and stones representing the stones you have. Each character in stones is a
type of stone you have. You want to know how many of the stones you have
are also jewels.

Letters are case sensitive, so "a" is considered a different type of stone from "A".

Example 1:
  Input: jewels = "aA", stones = "aAAbbbb"
  Output: 3

Example 2:
  Input: jewels = "z", stones = "ZZ"
  Output: 0

Example 3:
  Input: jewels = "aAbBcC", stones = "aabbcc"
  Output: 6

Example 4:
  Input: jewels = "", stones = "abc"
  Output: 0

Constraints:
  - 1 <= jewels.length, stones.length <= 50
  - jewels and stones consist of only English letters.
  - All the characters of jewels are unique.

Time Complexity: O(j + s) where j is jewels length, s is stones length
Space Complexity: O(j)

Hash Set Pattern Notes:
  - Convert jewels string to Set for O(1) lookup
  - Iterate through stones and count jewels
  - Set.has() is more efficient than string.includes()
  - Case sensitive comparison - 'a' != 'A'
  - Simple counting with set membership
*/

export const functionName = 'numJewelsInStones';

export const tests = [
  {
    input: ["aA", "aAAbbbb"],
    expected: 3
  },
  {
    input: ["z", "ZZ"],
    expected: 0
  },
  {
    input: ["aAbBcC", "aabbcc"],
    expected: 6
  },
  {
    input: ["", "abc"],
    expected: 0
  },
  {
    input: ["abc", ""],
    expected: 0
  },
  {
    input: ["Aa", "aAAaAaA"],
    expected: 7
  },
  {
    input: ["abcdefg", "hijklmnop"],
    expected: 0
  },
  {
    input: ["aA", "aA"],
    expected: 2
  },
  // All stones are jewels
  {
    input: ["abc", "aabbcc"],
    expected: 6
  },
  // All-same stones, all are jewels
  {
    input: ["x", "xxxxxxxx"],
    expected: 8
  },
  // Case sensitivity: lowercase jewels don't match uppercase stones
  {
    input: ["abc", "ABC"],
    expected: 0
  },
  // Single jewel, single stone, match
  {
    input: ["a", "a"],
    expected: 1
  }
];