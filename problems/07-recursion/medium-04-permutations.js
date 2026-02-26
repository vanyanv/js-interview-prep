/*
Problem: Permutations
Difficulty: Medium
Category: Recursion, Backtracking, Array
LeetCode: #46
Pattern: Backtracking — Permutation Generation

Given an array nums of distinct integers, return all the possible permutations.
You can return the answer in any order.

Example 1:
  Input: nums = [1,2,3]
  Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
  Explanation: There are 3! = 6 permutations

Example 2:
  Input: nums = [0,1]
  Output: [[0,1],[1,0]]
  Explanation: There are 2! = 2 permutations

Example 3:
  Input: nums = [1]
  Output: [[1]]
  Explanation: Only one permutation of a single element

Constraints:
  - 1 <= nums.length <= 6
  - -10 <= nums[i] <= 10
  - All the integers of nums are unique

Time Complexity: O(n! * n) — n! permutations, each taking O(n) to copy
Space Complexity: O(n! * n) for output storage + O(n) for recursion stack

Recursion Pattern Notes:
  - Unlike subsets, permutations use ALL elements but in different orders
  - At each position, choose from remaining unused elements
  - Use a "used" boolean array or swap-based approach to track which elements are placed
  - Base case: when current permutation has n elements, add to result
  - Each level of recursion fills one position in the permutation

Hints:
  - Track which elements have been used with a boolean array or set
  - At each recursive call, try every unused element
  - The depth of recursion equals the length of the input array
  - Backtrack by un-marking the element as used after exploring
  - Alternative: use swapping to avoid extra space for tracking
*/

export const functionName = 'permute';

export const tests = [
  {
    input: [[1,2,3]],
    expected: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
  },
  {
    input: [[0,1]],
    expected: [[0,1],[1,0]]
  },
  {
    input: [[1]],
    expected: [[1]]
  },
  {
    input: [[5,4]],
    expected: [[5,4],[4,5]]
  },
  {
    input: [[1,2,3,4]],
    expected: [
      [1,2,3,4],[1,2,4,3],[1,3,2,4],[1,3,4,2],[1,4,2,3],[1,4,3,2],
      [2,1,3,4],[2,1,4,3],[2,3,1,4],[2,3,4,1],[2,4,1,3],[2,4,3,1],
      [3,1,2,4],[3,1,4,2],[3,2,1,4],[3,2,4,1],[3,4,1,2],[3,4,2,1],
      [4,1,2,3],[4,1,3,2],[4,2,1,3],[4,2,3,1],[4,3,1,2],[4,3,2,1]
    ]
  },
  {
    input: [[-1,0,1]],
    expected: [[-1,0,1],[-1,1,0],[0,-1,1],[0,1,-1],[1,-1,0],[1,0,-1]]
  },
  {
    input: [[7]],
    expected: [[7]]
  },
  {
    input: [[0]],
    expected: [[0]]
  }
];

/**
 * Generate all possible permutations of an array of distinct integers.
 * Uses backtracking with a used-element tracker.
 * @param {number[]} nums - Array of distinct integers
 * @return {number[][]} All possible permutations
 */
function permute(nums) {
    const result = [];
    const current = [];
    const used = new Array(nums.length).fill(false);

    function backtrack() {
        // Base case: permutation is complete
        if (current.length === nums.length) {
            result.push([...current]);
            return;
        }

        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue;

            current.push(nums[i]);
            used[i] = true;

            backtrack();

            // Backtrack
            current.pop();
            used[i] = false;
        }
    }

    backtrack();
    return result;
}

export default permute;
