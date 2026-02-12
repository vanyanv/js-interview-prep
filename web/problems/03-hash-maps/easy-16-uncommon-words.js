/*
Problem: Uncommon Words from Two Sentences
Difficulty: Easy
Category: Strings, Hash Map
LeetCode: #884
Pattern: Combined Frequency Counting

A sentence is a string of single-space separated words where each word
consists only of lowercase letters.

A word is uncommon if it appears exactly once in one of the sentences,
and does not appear in the other sentence.

Given two sentences s1 and s2, return a list of all the uncommon words.
You may return the answer in any order.

Example 1:
  Input: s1 = "this apple is sweet", s2 = "this apple is sour"
  Output: ["sweet","sour"]

Example 2:
  Input: s1 = "apple apple", s2 = "banana"
  Output: ["banana"]

Example 3:
  Input: s1 = "abcd def abcd xyz", s2 = "ijk def ijk"
  Output: ["xyz"]

Example 4:
  Input: s1 = "s z z z s", s2 = "s z ejt"
  Output: ["ejt"]

Constraints:
  - 1 <= s1.length, s2.length <= 200
  - s1 and s2 consist of lowercase English letters and spaces.
  - s1 and s2 do not have leading or trailing spaces.
  - All the words in s1 and s2 are separated by a single space.

Time Complexity: O(n + m) where n, m are lengths of s1, s2
Space Complexity: O(n + m)

Hash Map Pattern Notes:
  - Combine both sentences and count word frequencies
  - A word is uncommon if it appears exactly once total
  - Use Map to count frequencies across both sentences
  - Filter words that have frequency === 1
  - Split sentences by space to get word arrays
*/

export const functionName = 'uncommonFromSentences';

export const tests = [
  {
    input: ["this apple is sweet", "this apple is sour"],
    expected: ["sweet", "sour"]
  },
  {
    input: ["apple apple", "banana"],
    expected: ["banana"]
  },
  {
    input: ["abcd def abcd xyz", "ijk def ijk"],
    expected: ["xyz"]
  },
  {
    input: ["s z z z s", "s z ejt"],
    expected: ["ejt"]
  },
  {
    input: ["a b c", "d e f"],
    expected: ["a", "b", "c", "d", "e", "f"]
  },
  {
    input: ["a a", "a"],
    expected: []
  },
  {
    input: ["hello world", "hello"],
    expected: ["world"]
  },
  {
    input: ["one two three", "four five six"],
    expected: ["one", "two", "three", "four", "five", "six"]
  }
];