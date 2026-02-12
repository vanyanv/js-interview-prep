/*
Problem: Sort Characters By Frequency
Difficulty: Medium
Category: Strings, Hash Map, Sorting
LeetCode: #451
Pattern: Frequency Counting + Custom Sorting

Given a string s, sort it in decreasing order based on the frequency of
the characters. The frequency of a character is the number of times it
appears in the string.

Return the sorted string. If there are multiple answers, return any of them.

Example 1:
  Input: s = "tree"
  Output: "eert"
  Explanation: 'e' appears twice while 'r' and 't' both appear once.
  So 'e' must appear before both 'r' and 't'. Therefore "eetr" is also a valid answer.

Example 2:
  Input: s = "cccaaa"
  Output: "aaaccc"
  Explanation: Both 'c' and 'a' appear three times, so both "cccaaa" and "aaaccc" are valid answers.
  Note that "cacaca" is incorrect, as the same characters must be together.

Example 3:
  Input: s = "Aabb"
  Output: "bbAa"
  Explanation: "bbaA" is also a valid answer, but "Aabb" is incorrect.

Constraints:
  - 1 <= s.length <= 5 * 10^5
  - s consists of uppercase and lowercase English letters and digits.

Time Complexity: O(n log n)
Space Complexity: O(n)

Hash Map Pattern Notes:
  - Count frequency of each character using Map
  - Sort characters by frequency (descending)
  - Build result string by repeating each character
  - Use Array.from() to convert Map entries for sorting
  - Tie-breaking order doesn't matter per problem statement
*/

export const functionName = 'frequencySort';

export const tests = [
  {
    input: ["tree"],
    expected: "eert"
  },
  {
    input: ["cccaaa"],
    expected: "cccaaa"
  },
  {
    input: ["Aabb"],
    expected: "bbAa"
  },
  {
    input: ["a"],
    expected: "a"
  },
  {
    input: ["abcABC"],
    expected: "abcABC"
  },
  {
    input: ["loveleetcode"],
    expected: "eeeelloovtdc"
  },
  {
    input: ["raaeaedere"],
    expected: "eeeeaarrde"
  },
  {
    input: ["2a554442f544asfasssffffasss"],
    expected: "sssssssfffffffaaaa55544422"
  }
];