/*
Problem: Substring with Concatenation of All Words
Difficulty: Hard
Category: Strings, Hash Map, Sliding Window
LeetCode: #30
Pattern: Hash Map + Sliding Window

You are given a string s and an array of strings words. All the strings of words
are of the same length.

A concatenated string is a string that exactly contains all the strings of any
permutation of words concatenated.

Return an array of the starting indices of all the concatenated substrings in s.
You can return the answer in any order.

Example 1:
  Input: s = "barfoothefoobarman", words = ["foo","bar"]
  Output: [0, 9]
  Explanation: "barfoo" starts at index 0, "foobar" starts at index 9.

Example 2:
  Input: s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]
  Output: []
  Explanation: No substring of the required length contains all words with the
  correct frequencies.

Example 3:
  Input: s = "barfoofoobarthefoobarman", words = ["bar","foo","the"]
  Output: [6, 9, 12]
  Explanation: "foobarthe" at 6, "barthefoo" at 9, "thefoobar" at 12.

Constraints:
  - 1 <= s.length <= 10^4
  - 1 <= words.length <= 5000
  - 1 <= words[i].length <= 30
  - s and words[i] consist of lowercase English letters.

Time Complexity: O(n * a * b) where n = s.length, a = words.length, b = words[i].length
Space Complexity: O(a * b) for the hash maps

Hash Map Pattern Notes:
  - Build a frequency map of the words array
  - Slide a window of size (word count * word length) across s
  - For each starting position, extract word-sized chunks and compare frequencies
  - Optimization: use wordLength different starting offsets for true sliding window
  - When a mismatch is found, the entire window can be skipped
*/

export const functionName = 'findSubstring';

export const tests = [
  // Classic example: two words found at two positions
  {
    input: ["barfoothefoobarman", ["foo", "bar"]],
    expected: [0, 9]
  },
  // No valid concatenation exists (word frequencies don't match)
  {
    input: ["wordgoodgoodgoodbestword", ["word", "good", "best", "word"]],
    expected: []
  },
  // Three words found at multiple consecutive-ish positions
  {
    input: ["barfoofoobarthefoobarman", ["bar", "foo", "the"]],
    expected: [6, 9, 12]
  },
  // Single character words
  {
    input: ["aaa", ["a", "a"]],
    expected: [0, 1]
  },
  // Exact match: s is exactly the concatenation
  {
    input: ["a", ["a"]],
    expected: [0]
  },
  // s is too short for the total word length
  {
    input: ["a", ["a", "a"]],
    expected: []
  },
  // All same characters, repeated word
  // s = "aaaaaaaaaaaaaa" (14 a's), words = ["aa","aa"], total len = 4
  // Every window of length 4 matches: indices 0 through 10
  {
    input: ["aaaaaaaaaaaaaa", ["aa", "aa"]],
    expected: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  },
  // No overlap at all between s and words
  {
    input: ["abcdef", ["gh", "ij"]],
    expected: []
  }
];

/**
 * Finds all starting indices of substrings in s that are a concatenation of
 * all words in the given array (in any order).
 *
 * @param {string} s - The string to search within
 * @param {string[]} words - Array of equal-length words to concatenate
 * @returns {number[]} Array of starting indices of valid concatenated substrings
 */
function findSubstring(s, words) {
  if (s.length === 0 || words.length === 0) return [];

  const wordLen = words[0].length;
  const wordCount = words.length;
  const totalLen = wordLen * wordCount;
  const result = [];

  if (s.length < totalLen) return result;

  // Build frequency map of required words
  const wordFreq = new Map();
  for (const word of words) {
    wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
  }

  // Try each possible starting offset (0 to wordLen - 1)
  for (let offset = 0; offset < wordLen; offset++) {
    let left = offset;
    let count = 0;
    const windowFreq = new Map();

    for (let right = offset; right + wordLen <= s.length; right += wordLen) {
      const word = s.substring(right, right + wordLen);

      if (wordFreq.has(word)) {
        windowFreq.set(word, (windowFreq.get(word) || 0) + 1);
        count++;

        // If a word appears more than required, shrink from left
        while (windowFreq.get(word) > wordFreq.get(word)) {
          const leftWord = s.substring(left, left + wordLen);
          windowFreq.set(leftWord, windowFreq.get(leftWord) - 1);
          count--;
          left += wordLen;
        }

        // Found a valid window
        if (count === wordCount) {
          result.push(left);
          // Shrink from left to continue searching
          const leftWord = s.substring(left, left + wordLen);
          windowFreq.set(leftWord, windowFreq.get(leftWord) - 1);
          count--;
          left += wordLen;
        }
      } else {
        // Word not in dictionary, reset window
        windowFreq.clear();
        count = 0;
        left = right + wordLen;
      }
    }
  }

  return result.sort((a, b) => a - b);
}

export default findSubstring;
