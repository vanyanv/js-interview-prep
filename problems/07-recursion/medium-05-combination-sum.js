/*
Problem: Combination Sum
Difficulty: Medium
Category: Recursion, Backtracking, Array
LeetCode: #39
Pattern: Backtracking — Unbounded Choice with Target

Given an array of distinct integers candidates and a target integer target, return a list of all
unique combinations of candidates where the chosen numbers sum to target. You may return the
combinations in any order.

The same number may be chosen from candidates an unlimited number of times. Two combinations are
unique if the frequency of at least one of the chosen numbers is different.

The test cases are generated such that the number of unique combinations that sum up to target is
less than 150 combinations for the given input.

Example 1:
  Input: candidates = [2,3,6,7], target = 7
  Output: [[2,2,3],[7]]
  Explanation: 2+2+3 = 7 and 7 = 7. These are the only two combinations.

Example 2:
  Input: candidates = [2,3,5], target = 8
  Output: [[2,2,2,2],[2,3,3],[3,5]]
  Explanation: 2+2+2+2 = 8, 2+3+3 = 8, 3+5 = 8

Example 3:
  Input: candidates = [2], target = 1
  Output: []
  Explanation: No combinations sum to 1

Constraints:
  - 1 <= candidates.length <= 30
  - 2 <= candidates[i] <= 40
  - All elements of candidates are distinct
  - 1 <= target <= 40

Time Complexity: O(n^(t/m)) where t = target, m = minimum candidate value
Space Complexity: O(t/m) for recursion stack depth

Recursion Pattern Notes:
  - Similar to subsets but with repetition allowed and a target constraint
  - At each step, either include current candidate again or move to next candidate
  - Use remaining target to prune branches early (if remaining < 0, stop)
  - Start index prevents generating duplicate combinations in different orders
  - Sorting candidates enables early termination optimization

Hints:
  - Sort candidates first to enable early stopping when sum exceeds target
  - Use a start index to avoid generating duplicate combinations
  - Unlike permutations, the same element CAN be reused (don't increment index)
  - When do you move to the next candidate? When do you reuse the current one?
  - Prune: if current candidate > remaining target, skip it and all larger ones
*/

export const functionName = 'combinationSum';

export const tests = [
  {
    input: [[2,3,6,7], 7],
    expected: [[2,2,3],[7]]
  },
  {
    input: [[2,3,5], 8],
    expected: [[2,2,2,2],[2,3,3],[3,5]]
  },
  {
    input: [[2], 1],
    expected: []
  },
  {
    input: [[1], 1],
    expected: [[1]]
  },
  {
    input: [[1], 2],
    expected: [[1,1]]
  },
  {
    input: [[2,3], 6],
    expected: [[2,2,2],[3,3]]
  },
  {
    input: [[2,7,6,3,5,1], 9],
    expected: [[1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,2],[1,1,1,1,1,1,3],[1,1,1,1,1,2,2],[1,1,1,1,2,3],[1,1,1,1,5],[1,1,1,2,2,2],[1,1,1,3,3],[1,1,1,6],[1,1,2,2,3],[1,1,2,5],[1,1,7],[1,2,2,2,2],[1,2,3,3],[1,2,6],[1,3,5],[2,2,2,3],[2,2,5],[2,7],[3,3,3],[3,6]]
  },
  {
    input: [[8,10], 5],
    expected: []
  }
];

/**
 * Find all unique combinations of candidates that sum to target.
 * Each candidate may be used an unlimited number of times.
 * Uses backtracking with a start index to avoid duplicate combinations.
 * @param {number[]} candidates - Array of distinct positive integers
 * @param {number} target - Target sum
 * @return {number[][]} All unique combinations summing to target
 */
function combinationSum(candidates, target) {
    const result = [];
    const current = [];

    // Sort to enable early termination
    candidates.sort((a, b) => a - b);

    function backtrack(startIndex, remaining) {
        // Base case: found a valid combination
        if (remaining === 0) {
            result.push([...current]);
            return;
        }

        for (let i = startIndex; i < candidates.length; i++) {
            // Prune: if current candidate exceeds remaining, all future ones will too
            if (candidates[i] > remaining) break;

            current.push(candidates[i]);
            // Don't increment i — same element can be reused
            backtrack(i, remaining - candidates[i]);
            current.pop(); // backtrack
        }
    }

    backtrack(0, target);
    return result;
}

export default combinationSum;
