/*
Problem: Substring with Concatenation of All Words
Difficulty: Hard
Category: Hash Table, String, Sliding Window
LeetCode: #30
Pattern: Two Pointers (Sliding Window with Hash Map)

You are given a string s and an array of strings words. All the strings of words
are of the same length.

A concatenated substring in s is a substring that contains exactly one occurrence
of each string in words, and they can be in any order.

Return the starting indices of all the concatenated substrings in s. You can return
the answer in any order.

Example 1:
  Input: s = "barfoothefoobarman", words = ["foo","bar"]
  Output: [0,9]
  Explanation: The substring starting at 0 is "barfoo". It is the concatenation of ["bar","foo"] which is a permutation of words.
  The substring starting at 9 is "foobar". It is the concatenation of ["foo","bar"] which is a permutation of words.

Example 2:
  Input: s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]
  Output: []
  Explanation: Since words.length == 4 and words[i].length == 4, the concatenated substring has to be of length 16.
  There are no substrings of length 16 in s that equal the concatenation of any permutation of words.

Example 3:
  Input: s = "barfoobar", words = ["foo","bar"]
  Output: [0,3]

Constraints:
  - 1 <= s.length <= 10^4
  - 1 <= words.length <= 5000
  - 1 <= words[i].length <= 30
  - words[i] and s consist of lowercase English letters.

Time Complexity: O(n * m * k) where n = s.length, m = words.length, k = word.length
Space Complexity: O(m * k)

Pattern Notes:
  - Use sliding window approach with word-length steps
  - Maintain frequency map of required words
  - For each starting position (0 to wordLen-1), slide window by wordLen
  - Use two pointers to maintain valid window
  - Check if current window contains exactly the required words
*/

export const functionName = 'findSubstring';

export const tests = [
  {
    input: ["barfoothefoobarman", ["foo","bar"]],
    expected: [0,9]
  },
  {
    input: ["wordgoodgoodgoodbestword", ["word","good","best","word"]],
    expected: []
  },
  {
    input: ["barfoobar", ["foo","bar"]],
    expected: [0,3]
  },
  {
    input: ["lingmindraboofooowingdingbarrwingmonkeypoundcake", ["fooo","barr","wing","ding","wing"]],
    expected: [13]
  },
  {
    input: ["wordgoodgoodgoodbestword", ["word","good","best","good"]],
    expected: [8]
  },
  {
    input: ["a", ["a"]],
    expected: [0]
  },
  {
    input: ["ababab", ["ab","ab"]],
    expected: [0,2]
  },
  {
    input: ["abababab", ["a","b","a"]],
    expected: [0,2,4]
  },
  // Boundary: s too short for words
  {
    input: ["ab", ["abc"]],
    expected: []
  },
  // All same words, all same chars
  {
    input: ["aaaaaa", ["aa","aa"]],
    expected: [0,2]
  },
  // No matches at all
  {
    input: ["abcdefgh", ["xyz","uvw"]],
    expected: []
  },
  // Single char words
  {
    input: ["abcabc", ["a","b","c"]],
    expected: [0,3]
  },
  // Larger input: words appearing only once
  {
    input: ["thequickbrownfoxjumps", ["quick","brown"]],
    expected: [3]
  }
];

/**
 * Finds all starting indices of concatenated substrings
 * @param {string} s - Input string
 * @param {string[]} words - Array of words to concatenate
 * @return {number[]} Array of starting indices
 */
function findSubstring(s, words) {
    if (!s || !words || words.length === 0) return [];

    const wordLen = words[0].length;
    const totalLen = wordLen * words.length;
    const result = [];

    if (s.length < totalLen) return result;

    // Create frequency map of words
    const wordCount = new Map();
    for (const word of words) {
        wordCount.set(word, (wordCount.get(word) || 0) + 1);
    }

    // Try each possible starting position (0 to wordLen-1)
    for (let i = 0; i < wordLen; i++) {
        let left = i;
        let right = i;
        const currentCount = new Map();
        let validWords = 0;

        // Sliding window approach
        while (right + wordLen <= s.length) {
            // Get the word at right pointer
            const rightWord = s.substring(right, right + wordLen);
            right += wordLen;

            if (wordCount.has(rightWord)) {
                currentCount.set(rightWord, (currentCount.get(rightWord) || 0) + 1);

                // If we have exact count needed, increment valid words
                if (currentCount.get(rightWord) === wordCount.get(rightWord)) {
                    validWords++;
                }
                // If we have too many, we need to shrink window
                else if (currentCount.get(rightWord) > wordCount.get(rightWord)) {
                    // Move left pointer until we remove extra occurrence
                    while (currentCount.get(rightWord) > wordCount.get(rightWord)) {
                        const leftWord = s.substring(left, left + wordLen);
                        left += wordLen;

                        if (currentCount.get(leftWord) === wordCount.get(leftWord)) {
                            validWords--;
                        }
                        currentCount.set(leftWord, currentCount.get(leftWord) - 1);
                    }
                    validWords++;
                }
            } else {
                // Word not in target, reset window
                currentCount.clear();
                validWords = 0;
                left = right;
            }

            // Check if we have a valid window
            if (validWords === wordCount.size) {
                result.push(left);

                // Move left pointer to look for next valid window
                const leftWord = s.substring(left, left + wordLen);
                left += wordLen;
                validWords--;
                currentCount.set(leftWord, currentCount.get(leftWord) - 1);
            }
        }
    }

    return result;
}

export default findSubstring;