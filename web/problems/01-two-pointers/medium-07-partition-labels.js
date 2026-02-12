/*
Problem: Partition Labels
Difficulty: Medium
Category: Hash Table, Two Pointers, String, Greedy
LeetCode: #763
Pattern: Two Pointers (Greedy with Hash Map)

You are given a string s. We want to partition the string into as many parts as
possible so that each letter appears in at most one part.

Note that the partition is done so that after concatenating all the parts in order,
the resultant string should be s.

Return a list of integers representing the size of these parts.

Example 1:
  Input: s = "ababcbacadefegdehijhklij"
  Output: [9,7,8]
  Explanation:
  The partition is "ababcbaca", "defegde", "hijhklij".
  This is a partition so that each letter appears in at most one part.

Example 2:
  Input: s = "eccbbbbdec"
  Output: [10]

Example 3:
  Input: s = "abcabc"
  Output: [6]

Constraints:
  - 1 <= s.length <= 500
  - s consists of lowercase English letters.

Time Complexity: O(n)
Space Complexity: O(1) since we only store at most 26 characters

Pattern Notes:
  - First pass: record last occurrence of each character
  - Second pass: use two pointers to track current partition
  - Extend partition end to include last occurrence of any seen character
  - When current position reaches partition end, we can make a cut
  - Greedy approach: make partition as soon as possible
*/

export const functionName = 'partitionLabels';

export const tests = [
  {
    input: ["ababcbacadefegdehijhklij"],
    expected: [9,7,8]
  },
  {
    input: ["eccbbbbdec"],
    expected: [10]
  },
  {
    input: ["abcabc"],
    expected: [6]
  },
  {
    input: ["a"],
    expected: [1]
  },
  {
    input: ["abc"],
    expected: [1,1,1]
  },
  {
    input: ["abccba"],
    expected: [6]
  },
  {
    input: ["caedbdceaebbdcd"],
    expected: [8,7]
  },
  {
    input: ["qiejxqfnqceocmy"],
    expected: [13,1,1]
  },
  // All same character — one big partition
  {
    input: ["aaaaaaa"],
    expected: [7]
  },
  // Every character unique — each is its own partition
  {
    input: ["abcdefgh"],
    expected: [1,1,1,1,1,1,1,1]
  },
  // Two distinct partitions with clear boundaries
  {
    input: ["abcadefed"],
    expected: [4,5]
  },
  // Single character
  {
    input: ["z"],
    expected: [1]
  },
  // Longer input: repeating pattern that forces large partitions
  {
    input: ["aabbccddeeaabbccddee"],
    expected: [20]
  }
];

/**
 * Partitions string so each letter appears in at most one part
 * @param {string} s - Input string
 * @return {number[]} Array of partition sizes
 */
function partitionLabels(s) {
    // Step 1: Record last occurrence of each character
    const lastOccurrence = new Map();
    for (let i = 0; i < s.length; i++) {
        lastOccurrence.set(s[i], i);
    }

    const result = [];
    let start = 0;    // Start of current partition
    let end = 0;      // End of current partition

    // Step 2: Iterate and determine partition boundaries
    for (let i = 0; i < s.length; i++) {
        // Extend the end of current partition to include
        // the last occurrence of current character
        end = Math.max(end, lastOccurrence.get(s[i]));

        // If we've reached the end of current partition,
        // we can make a cut here
        if (i === end) {
            result.push(end - start + 1);
            start = i + 1; // Start new partition
        }
    }

    return result;
}

export default partitionLabels;