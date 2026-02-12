/*
Problem: Top K Frequent Elements
Difficulty: Medium
Category: Arrays, Hash Map, Sorting, Heap
LeetCode: #347
Pattern: Frequency Counting + Sorting

Given an integer array nums and an integer k, return the k most frequent elements.
You may return the answer in any order.

Example 1:
  Input: nums = [1,1,1,2,2,3], k = 2
  Output: [1,2]

Example 2:
  Input: nums = [1], k = 1
  Output: [1]

Example 3:
  Input: nums = [1,2,3,4,5,5,6,6,6], k = 2
  Output: [6,5]

Example 4:
  Input: nums = [4,1,-1,2,-1,2,3], k = 2
  Output: [-1,2]

Constraints:
  - 1 <= nums.length <= 10^5
  - -10^4 <= nums[i] <= 10^4
  - k is in the range [1, the number of unique elements in the array].
  - It is guaranteed that the answer is unique.

Time Complexity: O(n log n) for sorting approach, O(n log k) for heap
Space Complexity: O(n)

Hash Map Pattern Notes:
  - First pass: count frequency of each element using Map
  - Convert Map to array of [element, frequency] pairs
  - Sort by frequency in descending order
  - Take first k elements
  - Alternative: use Min Heap of size k for better space complexity
*/

export const functionName = 'topKFrequent';

export const tests = [
  {
    input: [[1, 1, 1, 2, 2, 3], 2],
    expected: [1, 2]
  },
  {
    input: [[1], 1],
    expected: [1]
  },
  {
    input: [[1, 2, 3, 4, 5, 5, 6, 6, 6], 2],
    expected: [6, 5]
  },
  {
    input: [[4, 1, -1, 2, -1, 2, 3], 2],
    expected: [-1, 2]
  },
  {
    input: [[1, 2], 2],
    expected: [1, 2]
  },
  {
    input: [[3, 3, 3, 2, 2, 1], 3],
    expected: [3, 2, 1]
  },
  {
    input: [[5, 3, 1, 1, 1, 3, 73, 1], 2],
    expected: [1, 3]
  },
  {
    input: [[7, 7], 1],
    expected: [7]
  }
];