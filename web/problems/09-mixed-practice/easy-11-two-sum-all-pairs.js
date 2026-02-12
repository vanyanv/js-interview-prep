/*
Problem: Two Sum - All Pairs
Difficulty: Easy
Category: Hash Map, Array, Pairs
LeetCode: #1 (Extended)
Pattern: Hash Map + Array Processing + Pair Finding
Mixed Patterns: Hash Map Lookup + Array Iteration + Duplicate Handling

Given an array of integers nums and an integer target, return all unique pairs
of indices where the two numbers add up to target.

Unlike the original Two Sum problem, this returns ALL valid pairs, not just one.
Each pair should be returned only once, and the order of pairs doesn't matter.

Example 1:
  Input: nums = [2,7,11,15], target = 9
  Output: [[0,1]]
  Explanation: nums[0] + nums[1] = 2 + 7 = 9

Example 2:
  Input: nums = [3,2,4], target = 6
  Output: [[1,2]]
  Explanation: nums[1] + nums[2] = 2 + 4 = 6

Example 3:
  Input: nums = [3,3], target = 6
  Output: [[0,1]]
  Explanation: nums[0] + nums[1] = 3 + 3 = 6

Example 4:
  Input: nums = [1,2,3,2,1], target = 3
  Output: [[0,1],[0,4],[2,3]]
  Explanation: Multiple pairs sum to 3: (1,2), (1,2), (3,0)

Constraints:
  - 2 <= nums.length <= 10^4
  - -10^9 <= nums[i] <= 10^9
  - -10^9 <= target <= 10^9

Time Complexity: O(n) where n is length of nums array
Space Complexity: O(n) for hash map storage

Pattern Notes:
  - Use hash map to store previously seen numbers and their indices
  - For each number, check if complement exists in hash map
  - Handle duplicates carefully to avoid duplicate pairs
  - Store multiple indices for same value to find all pairs
  - Ensure each pair is only reported once

Interview Notes:
  - Follow-up: Return actual values instead of indices
  - Follow-up: Find all triplets that sum to target (Three Sum)
  - Follow-up: What if array is sorted? (Two pointers approach)
  - Follow-up: Count total number of pairs instead of returning them
*/

export const functionName = 'twoSumAllPairs';

export const tests = [
  {
    input: [[2,7,11,15], 9],
    expected: [[0,1]]
  },
  {
    input: [[3,2,4], 6],
    expected: [[1,2]]
  },
  {
    input: [[3,3], 6],
    expected: [[0,1]]
  },
  {
    input: [[1,2,3,2,1], 3],
    expected: [[0,1],[0,4],[2,3]]
  },
  {
    input: [[1,1,1,1], 2],
    expected: [[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]]
  },
  {
    input: [[0,4,3,0], 0],
    expected: [[0,3]]
  },
  {
    input: [[-1,-2,-3,-4,-5], -8],
    expected: [[2,4]]
  },
  {
    input: [[1], 2],
    expected: []
  }
];

/**
 * Finds all pairs of indices that sum to target
 * @param {number[]} nums - Array of integers
 * @param {number} target - Target sum
 * @return {number[][]} Array of index pairs
 */
function twoSumAllPairs(nums, target) {
    const result = [];
    const numMap = new Map(); // number -> array of indices

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];

        // Check if complement exists in map
        if (numMap.has(complement)) {
            // Add all pairs with the complement
            for (const complementIndex of numMap.get(complement)) {
                result.push([complementIndex, i]);
            }
        }

        // Add current number and index to map
        if (!numMap.has(nums[i])) {
            numMap.set(nums[i], []);
        }
        numMap.get(nums[i]).push(i);
    }

    return result;
}

/**
 * Alternative: Using Set to avoid duplicate pairs
 * @param {number[]} nums - Array of integers
 * @param {number} target - Target sum
 * @return {number[][]} Array of unique index pairs
 */
function twoSumAllPairsNoDuplicates(nums, target) {
    const result = [];
    const seen = new Set();
    const pairSet = new Set();

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];

        for (let j = 0; j < i; j++) {
            if (nums[j] === complement) {
                const pairKey = `${Math.min(i, j)},${Math.max(i, j)}`;
                if (!pairSet.has(pairKey)) {
                    result.push([j, i]);
                    pairSet.add(pairKey);
                }
            }
        }
    }

    return result;
}

/**
 * Alternative: Two-pass approach
 * @param {number[]} nums - Array of integers
 * @param {number} target - Target sum
 * @return {number[][]} Array of index pairs
 */
function twoSumAllPairsTwoPass(nums, target) {
    const result = [];

    // Build map of number -> indices
    const numIndices = new Map();
    for (let i = 0; i < nums.length; i++) {
        if (!numIndices.has(nums[i])) {
            numIndices.set(nums[i], []);
        }
        numIndices.get(nums[i]).push(i);
    }

    // Find all pairs
    const processed = new Set();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];

        if (numIndices.has(complement)) {
            const complementIndices = numIndices.get(complement);

            for (const j of complementIndices) {
                if (j > i) { // Ensure unique pairs and correct order
                    result.push([i, j]);
                }
            }
        }
    }

    return result;
}

/**
 * Alternative: Return actual values instead of indices
 * @param {number[]} nums - Array of integers
 * @param {number} target - Target sum
 * @return {number[][]} Array of value pairs
 */
function twoSumAllValues(nums, target) {
    const result = [];
    const numCount = new Map();

    // Count occurrences of each number
    for (const num of nums) {
        numCount.set(num, (numCount.get(num) || 0) + 1);
    }

    const processed = new Set();

    for (const num of nums) {
        if (processed.has(num)) continue;

        const complement = target - num;

        if (num === complement) {
            // Special case: number pairs with itself
            const count = numCount.get(num);
            const pairs = Math.floor(count / 2);
            for (let i = 0; i < pairs; i++) {
                result.push([num, complement]);
            }
        } else if (numCount.has(complement) && !processed.has(complement)) {
            // Different numbers
            const count1 = numCount.get(num);
            const count2 = numCount.get(complement);
            const pairs = count1 * count2;
            for (let i = 0; i < pairs; i++) {
                result.push([num, complement]);
            }
        }

        processed.add(num);
    }

    return result;
}

/**
 * Extended: Count pairs instead of returning them
 * @param {number[]} nums - Array of integers
 * @param {number} target - Target sum
 * @return {number} Total count of valid pairs
 */
function twoSumCountPairs(nums, target) {
    let count = 0;
    const numMap = new Map();

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];

        if (numMap.has(complement)) {
            count += numMap.get(complement);
        }

        numMap.set(nums[i], (numMap.get(nums[i]) || 0) + 1);
    }

    return count;
}

export default twoSumAllPairs;