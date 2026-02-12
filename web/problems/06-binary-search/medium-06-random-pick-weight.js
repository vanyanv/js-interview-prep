/*
Problem: Random Pick with Weight
Difficulty: Medium
Category: Binary Search, Math, Prefix Sum, Randomization
LeetCode: #528
Pattern: Binary Search with Prefix Sum

You are given a 0-indexed array of positive integers w where w[i] describes the weight of the ith index.

You need to implement the function pickIndex(), which randomly picks an index in the range [0, w.length - 1]
(inclusive) and returns it. The probability of picking an index i is w[i] / sum(w).

For example, if w = [1, 3], the probability of picking index 0 is 1 / (1 + 3) = 1 / 4 = 25%,
and the probability of picking index 1 is 3 / (1 + 3) = 3 / 4 = 75%.

Example 1:
  Input: ["Solution", "pickIndex"]
         [[[1]], []]
  Output: [null, 0]
  Explanation: Since there is only one element, the only choice is to return 0

Example 2:
  Input: ["Solution", "pickIndex", "pickIndex", "pickIndex", "pickIndex", "pickIndex"]
         [[[1, 3]], [], [], [], [], []]
  Output: [null, 1, 1, 1, 1, 0]
  Explanation: The probability of index 0 is 25% and index 1 is 75%

Example 3:
  Input: ["Solution", "pickIndex", "pickIndex"]
         [[[3, 14, 1, 7]], [], []]
  Output: [null, 2, 1]
  Explanation: Weights [3,14,1,7] give probabilities [12%, 56%, 4%, 28%]

Example 4:
  Input: ["Solution", "pickIndex"]
         [[[1, 2, 3, 4]], []]
  Output: [null, 3]
  Explanation: Index 3 has 40% probability

Constraints:
  - 1 <= w.length <= 10^4
  - 1 <= w[i] <= 10^5
  - pickIndex will be called at most 10^4 times

Time Complexity:
  - Solution constructor: O(n) where n is length of weights
  - pickIndex: O(log n)
Space Complexity: O(n) for storing prefix sums

Pattern Notes:
  - Build prefix sum array where prefixSum[i] = sum of weights from index 0 to i
  - Generate random number in range [1, totalSum]
  - Use binary search to find the first prefix sum >= random number
  - This maps the random number to the correct weighted index
  - Binary search finds the leftmost position where condition is true
*/

export const functionName = 'Solution';

export const tests = [
  {
    input: [
      ["Solution", "pickIndex"],
      [[[1]], []]
    ],
    expected: [null, 0]
  },
  {
    input: [
      ["Solution", "pickIndex", "pickIndex", "pickIndex"],
      [[[1, 3]], [], [], []]
    ],
    expected: [null, "random", "random", "random"] // Results will vary due to randomness
  },
  {
    input: [
      ["Solution", "pickIndex", "pickIndex"],
      [[[3, 14, 1, 7]], [], []]
    ],
    expected: [null, "random", "random"] // Results will vary due to randomness
  },
  {
    input: [
      ["Solution", "pickIndex"],
      [[[1, 2, 3, 4]], []]
    ],
    expected: [null, "random"] // Results will vary due to randomness
  },
  {
    input: [
      ["Solution", "pickIndex", "pickIndex", "pickIndex"],
      [[[5, 5, 5, 5]], [], [], []]
    ],
    expected: [null, "random", "random", "random"] // Results will vary due to randomness
  },
  {
    input: [
      ["Solution", "pickIndex"],
      [[[100]], []]
    ],
    expected: [null, 0] // Single weight, always picks index 0
  },
  {
    input: [
      ["Solution", "pickIndex", "pickIndex", "pickIndex"],
      [[[1, 1]], [], [], []]
    ],
    expected: [null, "random", "random", "random"] // Equal weights
  },
  {
    input: [
      ["Solution", "pickIndex", "pickIndex"],
      [[[10, 1, 1, 1, 1]], [], []]
    ],
    expected: [null, "random", "random"] // Heavily weighted toward index 0
  }
];

/**
 * Random pick with weight implementation
 */
class Solution {
    /**
     * @param {number[]} w - Array of weights
     */
    constructor(w) {
        this.prefixSums = [];
        let sum = 0;

        // Build prefix sum array
        for (let i = 0; i < w.length; i++) {
            sum += w[i];
            this.prefixSums.push(sum);
        }

        this.totalSum = sum;
    }

    /**
     * Pick a random index based on weights
     * @return {number} Random index weighted by the original weights
     */
    pickIndex() {
        // Generate random number in range [1, totalSum]
        const target = Math.floor(Math.random() * this.totalSum) + 1;

        // Binary search for first prefix sum >= target
        let left = 0;
        let right = this.prefixSums.length - 1;

        while (left < right) {
            const mid = Math.floor((left + right) / 2);

            if (this.prefixSums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        return left;
    }
}

/**
 * Test function that simulates the LeetCode test format
 * @param {string[]} operations - Array of operation names
 * @param {any[][]} operands - Array of operation parameters
 * @return {any[]} Array of results from each operation
 */
function testSolution(operations, operands) {
    const results = [];
    let solution = null;

    for (let i = 0; i < operations.length; i++) {
        const operation = operations[i];
        const operand = operands[i];

        if (operation === "Solution") {
            solution = new Solution(operand[0]);
            results.push(null);
        } else if (operation === "pickIndex") {
            const picked = solution.pickIndex();
            results.push(picked);
        }
    }

    return results;
}

export default testSolution;