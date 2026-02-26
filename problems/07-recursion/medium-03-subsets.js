/*
Problem: Subsets
Difficulty: Medium
Category: Recursion, Backtracking, Array, Bit Manipulation
LeetCode: #78
Pattern: Backtracking — Include/Exclude Decision Tree

Given an integer array nums of unique elements, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.

Example 1:
  Input: nums = [1,2,3]
  Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
  Explanation: There are 2^3 = 8 subsets total

Example 2:
  Input: nums = [0]
  Output: [[],[0]]
  Explanation: There are 2^1 = 2 subsets total

Example 3:
  Input: nums = [1,2]
  Output: [[],[1],[2],[1,2]]
  Explanation: There are 2^2 = 4 subsets total

Constraints:
  - 1 <= nums.length <= 10
  - -10 <= nums[i] <= 10
  - All the numbers of nums are unique

Time Complexity: O(n * 2^n) — 2^n subsets, each taking O(n) to copy
Space Complexity: O(n * 2^n) for output storage + O(n) for recursion stack

Recursion Pattern Notes:
  - At each index, decide to include or exclude the current element
  - This creates a binary decision tree of depth n
  - Base case: when index reaches end of array, add current subset to result
  - The "include/exclude" pattern is fundamental to subset generation
  - Each path from root to leaf represents one subset

Hints:
  - At each element, you have two choices: include it or skip it
  - Use an index to track your position in the array
  - Backtrack by removing the last added element after exploring with it
  - The total number of subsets is always 2^n
  - Think of each subset as a binary string of length n (include/exclude)
*/

export const functionName = 'subsets';

export const tests = [
  {
    input: [[1,2,3]],
    expected: [[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]]
  },
  {
    input: [[0]],
    expected: [[],[0]]
  },
  {
    input: [[1,2]],
    expected: [[],[1],[1,2],[2]]
  },
  {
    input: [[5]],
    expected: [[],[5]]
  },
  {
    input: [[1,2,3,4]],
    expected: [[],[1],[1,2],[1,2,3],[1,2,3,4],[1,2,4],[1,3],[1,3,4],[1,4],[2],[2,3],[2,3,4],[2,4],[3],[3,4],[4]]
  },
  {
    input: [[-1,0,1]],
    expected: [[],[-1],[-1,0],[-1,0,1],[-1,1],[0],[0,1],[1]]
  },
  {
    input: [[3,7]],
    expected: [[],[3],[3,7],[7]]
  }
];

/**
 * Generate all possible subsets (power set) of an array of unique integers.
 * Uses backtracking with include/exclude decisions at each index.
 * @param {number[]} nums - Array of unique integers
 * @return {number[][]} All possible subsets
 */
function subsets(nums) {
    const result = [];
    const current = [];

    function backtrack(index) {
        // Add a copy of the current subset to results
        result.push([...current]);

        // Try adding each remaining element
        for (let i = index; i < nums.length; i++) {
            current.push(nums[i]);
            backtrack(i + 1);
            current.pop(); // backtrack
        }
    }

    backtrack(0);
    return result;
}

export default subsets;
