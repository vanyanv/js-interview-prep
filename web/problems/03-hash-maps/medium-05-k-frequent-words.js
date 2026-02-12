/*
Problem: Top K Frequent Words
Difficulty: Medium
Category: Strings, Hash Map, Sorting, Heap
LeetCode: #692
Pattern: Frequency Counting + Custom Sorting

Given an array of strings words and an integer k, return the k most
frequent strings.

Return the answer sorted by the frequency from highest to lowest. Sort
the words with the same frequency by their lexicographical order.

Example 1:
  Input: words = ["i","love","leetcode","i","love","coding"], k = 2
  Output: ["i","love"]
  Explanation: "i" and "love" are the two most frequent words.
  Note that "i" comes before "love" due to a lower alphabetical order.

Example 2:
  Input: words = ["the","day","is","sunny","the","the","the","sunny","is","is"], k = 4
  Output: ["the","is","sunny","day"]
  Explanation: "the", "is", "sunny" and "day" are the four most frequent words, with the number of occurrence being 4, 3, 2 and 1 respectively.

Example 3:
  Input: words = ["i","love","leetcode","i","love","coding"], k = 3
  Output: ["i","love","coding"]

Constraints:
  - 1 <= words.length <= 500
  - 1 <= words[i].length <= 10
  - words[i] consists of lowercase English letters.
  - k is in the range [1, The number of unique words[i]]

Time Complexity: O(n log n)
Space Complexity: O(n)

Hash Map Pattern Notes:
  - Count frequency of each word using Map
  - Sort by frequency (descending), then alphabetically (ascending)
  - Use custom comparator for dual-criteria sorting
  - Take first k elements from sorted array
  - Map.entries() provides [word, frequency] pairs for sorting
*/

export const functionName = 'topKFrequentWords';

export const tests = [
  {
    input: [["i", "love", "leetcode", "i", "love", "coding"], 2],
    expected: ["i", "love"]
  },
  {
    input: [["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], 4],
    expected: ["the", "is", "sunny", "day"]
  },
  {
    input: [["i", "love", "leetcode", "i", "love", "coding"], 3],
    expected: ["i", "love", "coding"]
  },
  {
    input: [["a", "aa", "aaa"], 1],
    expected: ["a"]
  },
  {
    input: [["a", "aa", "aaa"], 2],
    expected: ["a", "aa"]
  },
  {
    input: [["apple", "banana", "apple", "cherry"], 2],
    expected: ["apple", "banana"]
  },
  {
    input: [["word", "world", "row"], 2],
    expected: ["row", "word"]
  },
  {
    input: [["plpaboutit", "jnoqzdute", "sfvkdqf", "mjc", "nkpllqzjzp", "foqqenbey", "ssnanizsav", "nkpllqzjzp", "sfvkdqf", "isnjmy", "pnqsz", "hhqpvvt", "fvvdtpnzx", "jkqonvenhx", "cyxendjzwz", "hhqpvvt", "fvvdtpnzx", "plpaboutit", "sfvkdqf", "mjc", "fvvdtpnzx", "bwumsj", "foqqenbey", "isnjmy", "nkpllqzjzp", "hhqpvvt", "foqqenbey", "fvvdtpnzx", "bwumsj", "hhqpvvt", "fvvdtpnzx", "jkqonvenhx", "jnoqzdute", "foqqenbey", "jnoqzdute", "foqqenbey", "hhqpvvt", "ssnanizsav", "mjc", "foqqenbey", "bwumsj", "ssnanizsav", "fvvdtpnzx", "nkpllqzjzp", "jkqonvenhx", "hhqpvvt", "mjc", "isnjmy", "bwumsj", "pnqsz", "hhqpvvt", "nkpllqzjzp", "jnoqzdute", "pnqsz", "nkpllqzjzp", "jnoqzdute", "foqqenbey", "nkpllqzjzp", "hhqpvvt", "fvvdtpnzx", "plpaboutit", "jnoqzdute", "sfvkdqf", "fvvdtpnzx", "jkqonvenhx", "jnoqzdute", "nkpllqzjzp", "jnoqzdute", "fvvdtpnzx", "jkqonvenhx", "hhqpvvt", "isnjmy", "jnoqzdute", "ssnanizsav", "jnoqzdute", "fvvdtpnzx", "hhqpvvt", "bwumsj", "nkpllqzjzp", "bwumsj", "jkqonvenhx", "jnoqzdute", "pnqsz", "foqqenbey", "sfvkdqf", "sfvkdqf"], 1],
    expected: ["fvvdtpnzx"]
  },
  // Single word - k=1
  {
    input: [["hello"], 1],
    expected: ["hello"]
  },
  // All same word repeated - k=1
  {
    input: [["aaa", "aaa", "aaa", "aaa"], 1],
    expected: ["aaa"]
  },
  // All words have same frequency - should sort lexicographically
  {
    input: [["d", "b", "c", "a"], 3],
    expected: ["a", "b", "c"]
  },
  // Tie in frequency, lexicographic order determines ranking
  // "b" x3, "a" x3, "c" x1 => k=2 => ["a","b"] (same freq, lex order)
  {
    input: [["b", "a", "b", "a", "b", "a", "c"], 2],
    expected: ["a", "b"]
  }
];