/*
Problem: Move Zeros to End
Difficulty: Easy
Category: Array, Two Pointers
LeetCode: #283
Pattern: Two Pointers + In-place Array Modification
Mixed Patterns: Two Pointers + Array Manipulation + Order Preservation

Given an integer array nums, move all 0's to the end of it while maintaining
the relative order of the non-zero elements.

Note: You must do this in-place without making a copy of the array.

Example 1:
  Input: nums = [0,1,0,3,12]
  Output: [1,3,12,0,0]
  Explanation: Non-zero elements maintain their relative order.

Example 2:
  Input: nums = [0]
  Output: [0]
  Explanation: Single zero remains in place.

Example 3:
  Input: nums = [1,2,3]
  Output: [1,2,3]
  Explanation: No zeros to move.

Example 4:
  Input: nums = [0,0,1]
  Output: [1,0,0]
  Explanation: Single non-zero element moves to front.

Constraints:
  - 1 <= nums.length <= 10^4
  - -2^31 <= nums[i] <= 2^31 - 1

Time Complexity: O(n) where n is length of array
Space Complexity: O(1) - in-place modification

Pattern Notes:
  - Use two pointers: one for non-zero position, one for current element
  - Maintain relative order of non-zero elements
  - Fill remaining positions with zeros after moving non-zeros
  - Alternative: swap non-zeros to front, or remove and append zeros
  - Focus on minimizing number of writes for optimization

Interview Notes:
  - Follow-up: Minimize the total number of operations
  - Follow-up: Move all instances of specific value to end
  - Follow-up: Move zeros to beginning instead of end
  - Follow-up: What if we want to remove zeros entirely?
*/

export const functionName = 'moveZeroes';

export const tests = [
  {
    input: [[0,1,0,3,12]],
    expected: [1,3,12,0,0]
  },
  {
    input: [[0]],
    expected: [0]
  },
  {
    input: [[1,2,3]],
    expected: [1,2,3]
  },
  {
    input: [[0,0,1]],
    expected: [1,0,0]
  },
  {
    input: [[1,0,1,0,1]],
    expected: [1,1,1,0,0]
  },
  {
    input: [[0,0,0,0,0]],
    expected: [0,0,0,0,0]
  },
  {
    input: [[4,2,4,0,0,3,0,5,1,0]],
    expected: [4,2,4,3,5,1,0,0,0,0]
  }
];

/**
 * Moves all zeros to end while maintaining relative order
 * @param {number[]} nums - Array of integers (modified in-place)
 * @return {void} Do not return anything, modify nums in-place instead
 */
function moveZeroes(nums) {
    let writeIndex = 0; // Position to place next non-zero element

    // Move all non-zero elements to the front
    for (let readIndex = 0; readIndex < nums.length; readIndex++) {
        if (nums[readIndex] !== 0) {
            nums[writeIndex] = nums[readIndex];
            writeIndex++;
        }
    }

    // Fill remaining positions with zeros
    while (writeIndex < nums.length) {
        nums[writeIndex] = 0;
        writeIndex++;
    }
}

/**
 * Alternative: Swap approach (minimizes writes)
 * @param {number[]} nums - Array of integers
 * @return {void} Modify nums in-place
 */
function moveZeroesSwap(nums) {
    let left = 0; // Position for next non-zero element

    for (let right = 0; right < nums.length; right++) {
        if (nums[right] !== 0) {
            // Swap only if positions are different
            if (left !== right) {
                [nums[left], nums[right]] = [nums[right], nums[left]];
            }
            left++;
        }
    }
}

/**
 * Alternative: Two-pointer with explicit counting
 * @param {number[]} nums - Array of integers
 * @return {void} Modify nums in-place
 */
function moveZeroesCount(nums) {
    let nonZeroIndex = 0;
    let zeroCount = 0;

    // First pass: move non-zeros and count zeros
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            nums[nonZeroIndex] = nums[i];
            nonZeroIndex++;
        } else {
            zeroCount++;
        }
    }

    // Second pass: fill with zeros
    for (let i = nums.length - zeroCount; i < nums.length; i++) {
        nums[i] = 0;
    }
}

/**
 * Alternative: Bubble approach (less efficient but intuitive)
 * @param {number[]} nums - Array of integers
 * @return {void} Modify nums in-place
 */
function moveZeroesBubble(nums) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length - 1 - i; j++) {
            if (nums[j] === 0 && nums[j + 1] !== 0) {
                [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
            }
        }
    }
}

/**
 * Extended: Move specific value to end (generalized version)
 * @param {number[]} nums - Array of integers
 * @param {number} target - Value to move to end
 * @return {void} Modify nums in-place
 */
function moveValueToEnd(nums, target) {
    let writeIndex = 0;

    // Move all non-target elements to front
    for (let readIndex = 0; readIndex < nums.length; readIndex++) {
        if (nums[readIndex] !== target) {
            nums[writeIndex] = nums[readIndex];
            writeIndex++;
        }
    }

    // Fill remaining positions with target value
    while (writeIndex < nums.length) {
        nums[writeIndex] = target;
        writeIndex++;
    }
}

/**
 * Extended: Move zeros to beginning
 * @param {number[]} nums - Array of integers
 * @return {void} Modify nums in-place
 */
function moveZeroesToBeginning(nums) {
    let writeIndex = nums.length - 1; // Position to place next non-zero (from end)

    // Move all non-zero elements to the back
    for (let readIndex = nums.length - 1; readIndex >= 0; readIndex--) {
        if (nums[readIndex] !== 0) {
            nums[writeIndex] = nums[readIndex];
            writeIndex--;
        }
    }

    // Fill remaining positions with zeros
    while (writeIndex >= 0) {
        nums[writeIndex] = 0;
        writeIndex--;
    }
}

/**
 * Extended: Remove zeros entirely (return new length)
 * @param {number[]} nums - Array of integers
 * @return {number} New length after removing zeros
 */
function removeZeros(nums) {
    let writeIndex = 0;

    for (let readIndex = 0; readIndex < nums.length; readIndex++) {
        if (nums[readIndex] !== 0) {
            nums[writeIndex] = nums[readIndex];
            writeIndex++;
        }
    }

    return writeIndex;
}

/**
 * Extended: Move zeros with statistics
 * @param {number[]} nums - Array of integers
 * @return {Object} Statistics about the operation
 */
function moveZeroesWithStats(nums) {
    const originalArray = [...nums];
    let swaps = 0;
    let writes = 0;
    let left = 0;

    for (let right = 0; right < nums.length; right++) {
        if (nums[right] !== 0) {
            if (left !== right) {
                [nums[left], nums[right]] = [nums[right], nums[left]];
                swaps++;
            }
            writes++;
            left++;
        }
    }

    const zeroCount = nums.length - left;

    return {
        originalArray,
        resultArray: [...nums],
        totalSwaps: swaps,
        totalWrites: writes,
        zerosCount: zeroCount,
        nonZerosCount: nums.length - zeroCount
    };
}

export default moveZeroes;