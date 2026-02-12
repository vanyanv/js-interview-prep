/*
Problem: Longest Consecutive Sequence
Difficulty: Medium
Category: Arrays, Hash Set, Union Find
LeetCode: #128
Pattern: Set-based Sequence Detection

Given an unsorted array of integers nums, return the length of the
longest consecutive elements sequence.

You must write an algorithm that runs in O(n) time.

Example 1:
  Input: nums = [100,4,200,1,3,2]
  Output: 4
  Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.

Example 2:
  Input: nums = [0,3,7,2,5,8,4,6,0,1]
  Output: 9

Example 3:
  Input: nums = []
  Output: 0

Example 4:
  Input: nums = [1,2,0,1]
  Output: 3

Constraints:
  - 0 <= nums.length <= 10^5
  - -10^9 <= nums[i] <= 10^9

Time Complexity: O(n)
Space Complexity: O(n)

Hash Set Pattern Notes:
  - Convert array to Set for O(1) lookup
  - For each number, check if it's the start of a sequence (num-1 not in set)
  - If it's a start, count consecutive numbers using set.has()
  - Track maximum sequence length found
  - Each number is visited at most twice (once as start, once as continuation)
*/

export const functionName = 'longestConsecutive';

export const tests = [
  {
    input: [[100, 4, 200, 1, 3, 2]],
    expected: 4
  },
  {
    input: [[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]],
    expected: 9
  },
  {
    input: [[]],
    expected: 0
  },
  {
    input: [[1, 2, 0, 1]],
    expected: 3
  },
  {
    input: [[1]],
    expected: 1
  },
  {
    input: [[9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6]],
    expected: 7
  },
  {
    input: [[1, 3, 5, 7, 9]],
    expected: 1
  },
  {
    input: [[-1, 1, 0]],
    expected: 3
  },
  // All same values - longest consecutive is just 1
  {
    input: [[5, 5, 5, 5, 5]],
    expected: 1
  },
  // Large gap between two consecutive sequences
  {
    input: [[1, 2, 3, 100, 101, 102, 103]],
    expected: 4
  },
  // Negative numbers forming a consecutive sequence
  {
    input: [[-5, -4, -3, -2, -1, 10, 20]],
    expected: 5
  },
  // Duplicates within a long consecutive sequence
  {
    input: [[1, 2, 2, 3, 3, 4, 5, 5, 6, 7, 8, 8, 9, 10]],
    expected: 10
  }
];