/*
Problem: Unique Paths (LeetCode #62)
Difficulty: Medium
Category: Dynamic Programming
Pattern: 2D DP, Grid DP

There is a robot on an m x n grid. The robot is initially located at the top-left corner
(i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m-1][n-1]).
The robot can only move either down or right at any point in time.

Given the two integers m and n, return the number of possible unique paths that the robot
can take to reach the bottom-right corner.

Example 1:
  Input: m = 3, n = 7
  Output: 28
  Explanation: There are 28 unique paths from top-left to bottom-right.

Example 2:
  Input: m = 3, n = 2
  Output: 3
  Explanation: From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
  1. Right -> Down -> Down
  2. Down -> Right -> Down
  3. Down -> Down -> Right

Example 3:
  Input: m = 7, n = 3
  Output: 28
  Explanation: Same as Example 1, but dimensions swapped.

Example 4:
  Input: m = 1, n = 1
  Output: 1
  Explanation: Only one path (already at destination).

Example 5:
  Input: m = 1, n = 10
  Output: 1
  Explanation: Only one path: keep moving right.

Constraints:
  - 1 <= m, n <= 100

Time Complexity: O(m * n) for 2D DP, O(min(m,n)) for space-optimized version
Space Complexity: O(m * n) for 2D DP, O(min(m,n)) for space-optimized version

Dynamic Programming Pattern Notes:
  - State: dp[i][j] represents number of unique paths to reach cell (i,j)
  - Recurrence: dp[i][j] = dp[i-1][j] + dp[i][j-1]
    - Can reach (i,j) from above (i-1,j) or from left (i,j-1)
  - Base cases: dp[0][j] = 1 for all j (only one way to reach first row - keep going right)
                dp[i][0] = 1 for all i (only one way to reach first column - keep going down)
  - Final answer: dp[m-1][n-1]
  - Can be space optimized to O(min(m,n)) by using 1D array
  - This is also solvable using combinatorics: C(m+n-2, m-1)

Hints:
  - Think about how many ways you can reach any cell in the grid
  - You can only come from the cell above or the cell to the left
  - The first row and first column have only one way to reach each cell
  - This follows Pascal's triangle pattern
  - Consider space optimization - you only need the previous row to compute current row
  - Alternative mathematical solution: this is a combination problem C(m+n-2, m-1)
*/

export const functionName = 'uniquePaths';

export const tests = [
  {
    input: [3, 7],
    expected: 28
  },
  {
    input: [3, 2],
    expected: 3
  },
  {
    input: [7, 3],
    expected: 28
  },
  {
    input: [1, 1],
    expected: 1
  },
  {
    input: [1, 10],
    expected: 1
  },
  {
    input: [10, 1],
    expected: 1
  },
  {
    input: [2, 2],
    expected: 2
  },
  {
    input: [4, 4],
    expected: 20
  }
];

/**
 * Calculate number of unique paths from top-left to bottom-right in m x n grid
 * @param {number} m - Number of rows
 * @param {number} n - Number of columns
 * @return {number} Number of unique paths
 */
function uniquePaths(m, n) {
    // Space optimized solution using 1D array
    // We only need the previous row to compute the current row
    let dp = new Array(n).fill(1);

    // For each row starting from the second row
    for (let i = 1; i < m; i++) {
        // For each column starting from the second column
        for (let j = 1; j < n; j++) {
            // dp[j] represents paths to current cell
            // dp[j] (before update) = paths from above
            // dp[j-1] (already updated) = paths from left
            dp[j] = dp[j] + dp[j - 1];
        }
    }

    return dp[n - 1];
}

export default uniquePaths;