/*
Problem: Next Greater Element II
Difficulty: Medium
Category: Stack, Array, Monotonic Stack
LeetCode: #503
Pattern: Stack (Circular Array + Monotonic Stack)

Given a circular integer array nums (i.e., the next element of nums[nums.length - 1] is nums[0]),
return the next greater number for every element in nums.

The next greater number of a number x is the first greater number to its traversing-order next
in the array, which means you could search circularly to find its next greater number.
If it doesn't exist, return -1 for this number.

Example 1:
  Input: nums = [1,2,1]
  Output: [2,-1,2]
  Explanation: The first 1's next greater number is 2;
  The number 2 can't find next greater number.
  The second 1's next greater number needs to search circularly, which is also 2.

Example 2:
  Input: nums = [1,2,3,4,3]
  Output: [2,3,4,-1,4]

Example 3:
  Input: nums = [5,4,3,2,1]
  Output: [-1,5,5,5,5]

Example 4:
  Input: nums = [1]
  Output: [-1]

Example 5:
  Input: nums = [1,1,1,1]
  Output: [-1,-1,-1,-1]

Constraints:
  - 1 <= nums.length <= 10^4
  - -10^9 <= nums[i] <= 10^9

Time Complexity: O(n)
Space Complexity: O(n) for the stack and result array

Pattern Notes:
  - Circular array: simulate by processing array twice
  - Use modulo operator to wrap around indices
  - Monotonic decreasing stack stores indices
  - Process 2n elements but only update result in first n iterations
  - Stack maintains indices in decreasing order of their values
  - This pattern handles circular/cyclic constraints in array problems
*/

export const functionName = 'nextGreaterElements';

export const tests = [
  {
    input: [[1,2,1]],
    expected: [2,-1,2]
  },
  {
    input: [[1,2,3,4,3]],
    expected: [2,3,4,-1,4]
  },
  {
    input: [[5,4,3,2,1]],
    expected: [-1,5,5,5,5]
  },
  {
    input: [[1]],
    expected: [-1]
  },
  {
    input: [[1,1,1,1]],
    expected: [-1,-1,-1,-1]
  },
  {
    input: [[2,1,2,4,3,1]],
    expected: [4,2,4,-1,4,2]
  },
  {
    input: [[100,1,11,1,120,111,123,1,-1,-100]],
    expected: [120,11,120,120,123,123,-1,100,100,100]
  },
  {
    input: [[3,8,4,1,2]],
    expected: [8,-1,8,2,3]
  }
];

/**
 * Find next greater element in circular array
 * @param {number[]} nums - Circular integer array
 * @return {number[]} Next greater elements
 */
function nextGreaterElements(nums) {
    const n = nums.length;
    const result = new Array(n).fill(-1);
    const stack = []; // Stack of indices

    // Process the array twice to handle circular nature
    for (let i = 0; i < 2 * n; i++) {
        const actualIndex = i % n;
        const currentNum = nums[actualIndex];

        // While stack not empty and current number > number at stack top index
        while (stack.length > 0 && currentNum > nums[stack[stack.length - 1]]) {
            const prevIndex = stack.pop();
            result[prevIndex] = currentNum;
        }

        // Only push indices from first pass to avoid duplicates
        if (i < n) {
            stack.push(actualIndex);
        }
    }

    return result;
}

export default nextGreaterElements;