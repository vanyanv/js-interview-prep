/*
Problem: Most Common Word
Difficulty: Easy
Category: Strings, Hash Map
LeetCode: #819
Pattern: Word Frequency with Filtering

Given a string paragraph and a string array of the banned words banned,
return the most frequent word that is not banned. It is guaranteed there
is at least one word that is not banned, and that the answer is unique.

The words in paragraph are case-insensitive and the answer should be
returned in lowercase.

Example 1:
  Input: paragraph = "Bob hit a ball, the hit BALL flew far after it was hit.", banned = ["hit"]
  Output: "ball"
  Explanation: "hit" occurs 3 times, but it is a banned word. "ball" occurs twice (and no other word does), so it is the most frequent non-banned word in the paragraph.

Example 2:
  Input: paragraph = "a.", banned = []
  Output: "a"

Example 3:
  Input: paragraph = "a, a, a, a, b,b,b,c, c", banned = ["a"]
  Output: "b"

Constraints:
  - 1 <= paragraph.length <= 1000
  - paragraph consists of English letters, space ' ', or one of the symbols: "!?',;.".
  - 0 <= banned.length <= 100
  - 1 <= banned[i].length <= 10
  - banned[i] consists of only lowercase English letters.

Time Complexity: O(n + m) where n is paragraph length, m is banned array length
Space Complexity: O(n + m)

Hash Map Pattern Notes:
  - Convert banned array to Set for O(1) lookup
  - Extract words using regex or manual parsing
  - Convert words to lowercase for case-insensitive comparison
  - Count frequency of non-banned words using Map
  - Find word with maximum frequency
*/

export const functionName = 'mostCommonWord';

export const tests = [
  {
    input: ["Bob hit a ball, the hit BALL flew far after it was hit.", ["hit"]],
    expected: "ball"
  },
  {
    input: ["a.", []],
    expected: "a"
  },
  {
    input: ["a, a, a, a, b,b,b,c, c", ["a"]],
    expected: "b"
  },
  {
    input: ["Bob. hIt, baLl", ["bob", "hit"]],
    expected: "ball"
  },
  {
    input: ["..Bob hit a ball, the hit BALL flew far after it was hit.", ["hit", "ball"]],
    expected: "the"
  },
  {
    input: ["a b c a", []],
    expected: "a"
  },
  {
    input: ["the quick brown fox jumps over the lazy dog", ["the"]],
    expected: "quick"
  },
  {
    input: ["Hello world! Hello everyone.", ["hello"]],
    expected: "world"
  }
];