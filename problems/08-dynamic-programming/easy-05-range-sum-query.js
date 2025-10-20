/*
Problem: Range Sum Query - Immutable (LeetCode #303)
Difficulty: Easy
Category: Dynamic Programming
Pattern: Prefix Sum, Preprocessing

Given an integer array nums, handle multiple queries of the following type:
Calculate the sum of the elements of nums between indices left and right inclusive where left <= right.

Implement the NumArray class:
- NumArray(int[] nums) Initializes the object with the integer array nums.
- int sumRange(int left, int right) Returns the sum of the elements of nums between indices left and right inclusive.

Example 1:
  Input: ["NumArray", "sumRange", "sumRange", "sumRange"]
         [[[1, 3, 5]], [0, 2], [1, 2], [0, 1]]
  Output: [null, 9, 8, 4]
  Explanation:
  NumArray numArray = new NumArray([1, 3, 5]);
  numArray.sumRange(0, 2); // return 1 + 3 + 5 = 9
  numArray.sumRange(1, 2); // return 3 + 5 = 8
  numArray.sumRange(0, 1); // return 1 + 3 = 4

Example 2:
  Input: ["NumArray", "sumRange", "sumRange"]
         [[[−2, 0, 3, −5, 2, −1]], [0, 2], [2, 5]]
  Output: [null, 1, -1]

Example 3:
  Input: ["NumArray", "sumRange", "sumRange", "sumRange"]
         [[[1, -3, 2]], [0, 1], [1, 2], [0, 2]]
  Output: [null, -2, -1, 0]

Constraints:
  - 1 <= nums.length <= 10^4
  - -10^5 <= nums[i] <= 10^5
  - 0 <= left <= right < nums.length
  - At most 10^4 calls will be made to sumRange

Time Complexity: O(1) for sumRange queries, O(n) for initialization
Space Complexity: O(n) for prefix sum array

Dynamic Programming Pattern Notes:
  - Preprocessing approach: compute prefix sums once, answer queries in O(1)
  - State: prefixSum[i] represents sum of elements from index 0 to i-1
  - Recurrence: prefixSum[i] = prefixSum[i-1] + nums[i-1]
  - Query formula: sum(left, right) = prefixSum[right+1] - prefixSum[left]
  - Base case: prefixSum[0] = 0 (sum of empty prefix)
  - This demonstrates the power of preprocessing to optimize repeated queries

Hints:
  - Naive approach: sum elements from left to right for each query - O(n) per query
  - Optimized approach: precompute prefix sums, answer each query in O(1)
  - Think about how to use prefix sums to calculate range sums
  - prefix[i] = sum of elements from 0 to i-1
  - sum(left, right) = prefix[right+1] - prefix[left]
  - Handle edge cases: make sure array bounds are correct
  - This pattern is useful for any problem involving range queries on static data
*/

export const functionName = 'NumArray';

export const tests = [
  {
    input: [[[1, 3, 5]], [0, 2]],
    expected: 9
  },
  {
    input: [[[1, 3, 5]], [1, 2]],
    expected: 8
  },
  {
    input: [[[1, 3, 5]], [0, 1]],
    expected: 4
  },
  {
    input: [[[-2, 0, 3, -5, 2, -1]], [0, 2]],
    expected: 1
  },
  {
    input: [[[-2, 0, 3, -5, 2, -1]], [2, 5]],
    expected: -1
  },
  {
    input: [[[1, -3, 2]], [0, 1]],
    expected: -2
  },
  {
    input: [[[1, -3, 2]], [1, 2]],
    expected: -1
  },
  {
    input: [[[1, -3, 2]], [0, 2]],
    expected: 0
  }
];

/**
 * NumArray class for handling range sum queries efficiently
 * Uses prefix sum preprocessing for O(1) query time
 */
class NumArray {
    /**
     * Initialize the data structure with input array
     * @param {number[]} nums - Input array of integers
     */
    constructor(nums) {
        // Build prefix sum array
        // prefixSum[i] represents sum of elements from index 0 to i-1
        this.prefixSum = new Array(nums.length + 1).fill(0);

        for (let i = 0; i < nums.length; i++) {
            this.prefixSum[i + 1] = this.prefixSum[i] + nums[i];
        }
    }

    /**
     * Calculate sum of elements between indices left and right inclusive
     * @param {number} left - Left index (inclusive)
     * @param {number} right - Right index (inclusive)
     * @return {number} Sum of elements in range [left, right]
     */
    sumRange(left, right) {
        // sum(left, right) = prefixSum[right+1] - prefixSum[left]
        return this.prefixSum[right + 1] - this.prefixSum[left];
    }
}

/**
 * Test function that creates NumArray and calls sumRange
 * @param {number[]} nums - Array to initialize NumArray
 * @param {number} left - Left index for sumRange
 * @param {number} right - Right index for sumRange
 * @return {number} Result of sumRange call
 */
function NumArray_test(nums, left, right) {
    const numArray = new NumArray(nums);
    return numArray.sumRange(left, right);
}

export default NumArray_test;