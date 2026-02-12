/*
Problem: Find All Numbers Disappeared in an Array
Difficulty: Easy
Category: Array, Hash Set, Cyclic Sort
LeetCode: #448
Pattern: Array Manipulation + Hash Set + Cyclic Sort
Mixed Patterns: Hash Set + Array Indexing + Mathematical Properties

Given an array nums of n integers where nums[i] is in the range [1, n], return
an array of all the integers in the range [1, n] that do not appear in nums.

Example 1:
  Input: nums = [4,3,2,7,8,2,3,1]
  Output: [5,6]
  Explanation: Numbers 5 and 6 are missing from range [1,8].

Example 2:
  Input: nums = [1,1]
  Output: [2]
  Explanation: Number 2 is missing from range [1,2].

Example 3:
  Input: nums = [1,2,3,4,5]
  Output: []
  Explanation: All numbers are present.

Example 4:
  Input: nums = [2,2,2,2]
  Output: [1,3,4]
  Explanation: Numbers 1, 3, and 4 are missing from range [1,4].

Constraints:
  - n == nums.length
  - 1 <= n <= 10^5
  - 1 <= nums[i] <= n

Time Complexity: O(n) for all approaches
Space Complexity: O(1) for in-place marking, O(n) for hash set approach

Pattern Notes:
  - Multiple approaches: Hash Set, Array marking, Cyclic sort
  - Hash Set: Track seen numbers, find missing ones
  - Array marking: Use array indices to mark presence (negate values)
  - Cyclic sort: Place each number at correct index
  - Mathematical: Use sum formula or XOR properties

Interview Notes:
  - Follow-up: Do it without extra space (array marking approach)
  - Follow-up: What if numbers can be outside range [1,n]?
  - Follow-up: Find duplicates instead of missing numbers
  - Follow-up: Numbers in range [0,n-1] instead of [1,n]
*/

export const functionName = 'findDisappearedNumbers';

export const tests = [
  {
    input: [[4,3,2,7,8,2,3,1]],
    expected: [5,6]
  },
  {
    input: [[1,1]],
    expected: [2]
  },
  {
    input: [[1,2,3,4,5]],
    expected: []
  },
  {
    input: [[2,2,2,2]],
    expected: [1,3,4]
  },
  {
    input: [[1]],
    expected: []
  },
  {
    input: [[2,3,4,5,6]],
    expected: [1]
  },
  {
    input: [[1,2,3,4,6,7,8]],
    expected: [5]
  }
];

/**
 * Finds disappeared numbers using array marking (O(1) space)
 * @param {number[]} nums - Array of integers in range [1,n]
 * @return {number[]} Array of missing numbers
 */
function findDisappearedNumbers(nums) {
    const result = [];

    // Mark presence by negating values at corresponding indices
    for (let i = 0; i < nums.length; i++) {
        const index = Math.abs(nums[i]) - 1; // Convert to 0-based index
        if (nums[index] > 0) {
            nums[index] = -nums[index]; // Mark as seen
        }
    }

    // Find indices with positive values (unmarked = missing numbers)
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > 0) {
            result.push(i + 1); // Convert back to 1-based
        }
    }

    // Restore original array (optional)
    for (let i = 0; i < nums.length; i++) {
        nums[i] = Math.abs(nums[i]);
    }

    return result;
}

/**
 * Alternative: Hash Set approach (O(n) space)
 * @param {number[]} nums - Array of integers in range [1,n]
 * @return {number[]} Array of missing numbers
 */
function findDisappearedNumbersHashSet(nums) {
    const seen = new Set(nums);
    const result = [];

    for (let i = 1; i <= nums.length; i++) {
        if (!seen.has(i)) {
            result.push(i);
        }
    }

    return result;
}

/**
 * Alternative: Cyclic sort approach
 * @param {number[]} nums - Array of integers in range [1,n]
 * @return {number[]} Array of missing numbers
 */
function findDisappearedNumbersCyclicSort(nums) {
    // Place each number at its correct position
    for (let i = 0; i < nums.length; i++) {
        while (nums[i] !== i + 1 && nums[nums[i] - 1] !== nums[i]) {
            // Swap current number to its correct position
            const correctIndex = nums[i] - 1;
            [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]];
        }
    }

    // Find numbers not in correct positions
    const result = [];
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== i + 1) {
            result.push(i + 1);
        }
    }

    return result;
}

/**
 * Alternative: Using array offset marking
 * @param {number[]} nums - Array of integers in range [1,n]
 * @return {number[]} Array of missing numbers
 */
function findDisappearedNumbersOffset(nums) {
    const n = nums.length;

    // Mark presence by adding n to the value at corresponding index
    for (let i = 0; i < n; i++) {
        const index = (nums[i] - 1) % n; // Handle already modified values
        nums[index] += n;
    }

    // Find indices where value <= n (not marked)
    const result = [];
    for (let i = 0; i < n; i++) {
        if (nums[i] <= n) {
            result.push(i + 1);
        }
    }

    // Restore original array
    for (let i = 0; i < n; i++) {
        nums[i] %= n;
        if (nums[i] === 0) nums[i] = n;
    }

    return result;
}

/**
 * Alternative: Mathematical approach using sum
 * @param {number[]} nums - Array of integers in range [1,n]
 * @return {number[]} Array of missing numbers
 */
function findDisappearedNumbersMath(nums) {
    const n = nums.length;
    const expectedSum = (n * (n + 1)) / 2;
    const actualSum = nums.reduce((sum, num) => sum + num, 0);

    // This approach only works if exactly one number is missing
    // For multiple missing numbers, need to use other approaches
    const seen = new Set(nums);
    const result = [];

    for (let i = 1; i <= n; i++) {
        if (!seen.has(i)) {
            result.push(i);
        }
    }

    return result;
}

/**
 * Extended: Find both missing and duplicate numbers
 * @param {number[]} nums - Array of integers in range [1,n]
 * @return {Object} Object with missing and duplicate arrays
 */
function findMissingAndDuplicates(nums) {
    const missing = [];
    const duplicates = [];
    const seen = new Set();

    // Find duplicates
    for (const num of nums) {
        if (seen.has(num)) {
            duplicates.push(num);
        } else {
            seen.add(num);
        }
    }

    // Find missing
    for (let i = 1; i <= nums.length; i++) {
        if (!seen.has(i)) {
            missing.push(i);
        }
    }

    return { missing, duplicates };
}

/**
 * Extended: Handle range [0, n-1] instead of [1, n]
 * @param {number[]} nums - Array of integers in range [0,n-1]
 * @return {number[]} Array of missing numbers
 */
function findDisappearedNumbersZeroBased(nums) {
    const result = [];

    // Mark presence by negating values at corresponding indices
    for (let i = 0; i < nums.length; i++) {
        const index = Math.abs(nums[i]);
        if (nums[index] > 0) {
            nums[index] = -nums[index];
        }
    }

    // Find indices with positive values
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > 0) {
            result.push(i);
        }
    }

    // Restore array
    for (let i = 0; i < nums.length; i++) {
        nums[i] = Math.abs(nums[i]);
    }

    return result;
}

/**
 * Extended: Find disappeared numbers with statistics
 * @param {number[]} nums - Array of integers in range [1,n]
 * @return {Object} Missing numbers with statistics
 */
function findDisappearedNumbersWithStats(nums) {
    const missing = findDisappearedNumbers([...nums]); // Use copy to preserve original
    const duplicates = [];
    const seen = new Set();

    for (const num of nums) {
        if (seen.has(num)) {
            duplicates.push(num);
        } else {
            seen.add(num);
        }
    }

    return {
        missing,
        duplicates,
        missingCount: missing.length,
        duplicateCount: duplicates.length,
        uniqueCount: seen.size,
        totalExpected: nums.length
    };
}

export default findDisappearedNumbers;