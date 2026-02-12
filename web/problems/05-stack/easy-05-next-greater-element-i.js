/*
Problem: Next Greater Element I
Difficulty: Easy
Category: Stack, Array, Hash Table
LeetCode: #496
Pattern: Stack (Monotonic Stack)

The next greater element of some element x in an array is the first greater
element that is to the right of x in the same array.

You are given two distinct 0-indexed integer arrays nums1 and nums2, where nums1
is a subset of nums2.

For each element in nums1, find the next greater element in nums2.

The next greater element for an element x is the first element greater than x
to its right in nums2. If it does not exist, return -1 for this element.

Example 1:
  Input: nums1 = [4,1,2], nums2 = [1,3,4,2]
  Output: [-1,3,-1]
  Explanation: The next greater element for each value of nums1 is as follows:
  - 4 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1.
  - 1 is underlined in nums2 = [1,3,4,2]. The next greater element is 3.
  - 2 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1.

Example 2:
  Input: nums1 = [2,4], nums2 = [1,2,3,4]
  Output: [3,-1]
  Explanation: The next greater element for each value of nums1 is as follows:
  - 2 is underlined in nums2 = [1,2,3,4]. The next greater element is 3.
  - 4 is underlined in nums2 = [1,2,3,4]. There is no next greater element, so the answer is -1.

Example 3:
  Input: nums1 = [1,3,5,2,4], nums2 = [6,5,4,3,2,1,7]
  Output: [7,7,7,7,7]

Constraints:
  - 1 <= nums1.length <= nums2.length <= 1000
  - 0 <= nums1[i], nums2[i] <= 10^4
  - All integers in nums1 and nums2 are unique.
  - All the integers of nums1 also appear in nums2.

Time Complexity: O(n + m) where n = nums2.length, m = nums1.length
Space Complexity: O(n) for the stack and hash map

Pattern Notes:
  - Monotonic decreasing stack to find next greater elements
  - Use hash map to store next greater element for each number
  - Stack maintains elements in decreasing order
  - When current element > stack top, found next greater for stack elements
  - This is the foundation pattern for many "next greater" problems
*/

export const functionName = 'nextGreaterElement';

export const tests = [
  {
    input: [[4,1,2], [1,3,4,2]],
    expected: [-1,3,-1]
  },
  {
    input: [[2,4], [1,2,3,4]],
    expected: [3,-1]
  },
  {
    input: [[1,3,5,2,4], [6,5,4,3,2,1,7]],
    expected: [7,7,7,7,7]
  },
  {
    input: [[1], [1,2]],
    expected: [2]
  },
  {
    input: [[2], [2,1]],
    expected: [-1]
  },
  {
    input: [[1,2,3], [1,2,3,4]],
    expected: [2,3,4]
  },
  {
    input: [[4,3,2,1], [1,2,3,4]],
    expected: [-1,-1,-1,2]
  },
  {
    input: [[5,4,3,2,1], [1,2,3,4,5]],
    expected: [-1,-1,-1,-1,2]
  }
];

/**
 * Find next greater element for each element in nums1
 * @param {number[]} nums1 - Query array (subset of nums2)
 * @param {number[]} nums2 - Array to search in
 * @return {number[]} Next greater elements for nums1
 */
function nextGreaterElement(nums1, nums2) {
    const nextGreaterMap = new Map();
    const stack = [];

    // Build next greater element map for nums2
    for (let num of nums2) {
        // While stack not empty and current number > stack top
        while (stack.length > 0 && num > stack[stack.length - 1]) {
            const smaller = stack.pop();
            nextGreaterMap.set(smaller, num);
        }

        stack.push(num);
    }

    // For remaining elements in stack, there's no next greater element
    // (we don't need to explicitly set this as Map.get() returns undefined)

    // Build result for nums1
    const result = [];
    for (let num of nums1) {
        result.push(nextGreaterMap.get(num) || -1);
    }

    return result;
}

export default nextGreaterElement;