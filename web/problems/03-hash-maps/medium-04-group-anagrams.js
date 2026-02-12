/*
Problem: Group Anagrams
Difficulty: Medium
Category: Strings, Hash Map, Sorting
LeetCode: #49
Pattern: Hash Map Grouping

Given an array of strings strs, group the anagrams together. You can return
the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different
word or phrase, typically using all the original letters exactly once.

Example 1:
  Input: strs = ["eat","tea","tan","ate","nat","bat"]
  Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

Example 2:
  Input: strs = [""]
  Output: [[""]]

Example 3:
  Input: strs = ["a"]
  Output: [["a"]]

Example 4:
  Input: strs = ["abc", "bca", "cab", "xyz", "zyx", "yxz"]
  Output: [["abc","bca","cab"],["xyz","zyx","yxz"]]

Constraints:
  - 1 <= strs.length <= 10^4
  - 0 <= strs[i].length <= 100
  - strs[i] consists of lowercase English letters only.

Time Complexity: O(n * k log k) where n is length of strs, k is max length of string
Space Complexity: O(n * k)

Hash Map Pattern Notes:
  - Use sorted string as key to group anagrams
  - Map key -> array of strings with same sorted form
  - Alternative: use character frequency as key
  - Object.values() to get grouped arrays
  - Each anagram group has same sorted representation
*/

export const functionName = 'groupAnagrams';

export const tests = [
  {
    input: [["eat", "tea", "tan", "ate", "nat", "bat"]],
    expected: [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]
  },
  {
    input: [[""]],
    expected: [[""]]
  },
  {
    input: [["a"]],
    expected: [["a"]]
  },
  {
    input: [["abc", "bca", "cab", "xyz", "zyx", "yxz"]],
    expected: [["abc", "bca", "cab"], ["xyz", "zyx", "yxz"]]
  },
  {
    input: [["ab", "ba", "abc", "cba", "bac", "cab"]],
    expected: [["ab", "ba"], ["abc", "cba", "bac", "cab"]]
  },
  {
    input: [["aaa", "aaa"]],
    expected: [["aaa", "aaa"]]
  },
  {
    input: [["listen", "silent", "hello", "world"]],
    expected: [["listen", "silent"], ["hello"], ["world"]]
  },
  // All empty strings - all are anagrams of each other
  {
    input: [["", "", ""]],
    expected: [["", "", ""]]
  },
  // No anagrams - every string is unique group
  {
    input: [["abc", "def", "ghi"]],
    expected: [["abc"], ["def"], ["ghi"]]
  },
  // All same characters but different lengths - should NOT be grouped together
  {
    input: [["a", "aa", "aaa", "a"]],
    expected: [["a", "a"], ["aa"], ["aaa"]]
  },
  // Larger input with multiple anagram groups of varying sizes
  {
    input: [["rat", "tar", "art", "star", "tars", "rats", "arts", "z"]],
    expected: [["rat", "tar", "art"], ["star", "tars", "rats", "arts"], ["z"]]
  }
];