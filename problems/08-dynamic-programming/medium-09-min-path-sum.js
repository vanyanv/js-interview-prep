/*
Problem: Minimum Path Sum (LeetCode #64)
Difficulty: Medium
Category: Dynamic Programming
Pattern: 2D DP, Grid DP

Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right,
which minimizes the sum of all numbers along its path.

Note: You can only move either down or right at any point in time.

Example 1:
  Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
  Output: 7
  Explanation: Because the path 1 → 3 → 1 → 1 → 1 minimizes the sum.

Example 2:
  Input: grid = [[1,2,3],[4,5,6]]
  Output: 12
  Explanation: Because the path 1 → 2 → 3 → 6 minimizes the sum.

Example 3:
  Input: grid = [[1,4,8,6,2,2,1,7],[4,7,3,1,4,0,8,7],[1,1,1,1,1,1,1,1]]
  Output: 12
  Explanation: One optimal path is 1 → 4 → 7 → 3 → 1 → 1 → 1 → 1.

Example 4:
  Input: grid = [[5]]
  Output: 5
  Explanation: Single cell, minimum sum is the cell value itself.

Example 5:
  Input: grid = [[1,2],[3,4]]
  Output: 8
  Explanation: Path 1 → 2 → 4 gives sum 7, path 1 → 3 → 4 gives sum 8. Minimum is 7.

Constraints:
  - m == grid.length
  - n == grid[i].length
  - 1 <= m, n <= 200
  - 0 <= grid[i][j] <= 100

Time Complexity: O(m * n) where m and n are grid dimensions
Space Complexity: O(1) with in-place modification, O(min(m,n)) with space optimization

Dynamic Programming Pattern Notes:
  - State: dp[i][j] represents minimum path sum to reach cell (i,j)
  - Recurrence: dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])
    - Add current cell value to minimum of coming from above or left
  - Base cases:
    - dp[0][0] = grid[0][0]
    - dp[0][j] = dp[0][j-1] + grid[0][j] (first row: can only come from left)
    - dp[i][0] = dp[i-1][0] + grid[i][0] (first column: can only come from above)
  - Can be space optimized or done in-place by modifying the original grid

Hints:
  - Similar to unique paths, but now we're minimizing cost instead of counting paths
  - At each cell, choose the path with minimum cost from either above or left
  - First row and first column have only one way to reach, so build them separately
  - Consider modifying the grid in-place to save space
  - This is a classic shortest path problem on a grid with only right/down moves
*/

export const functionName = 'minPathSum';

export const tests = [
  {
    input: [[[1,3,1],[1,5,1],[4,2,1]]],
    expected: 7
  },
  {
    input: [[[1,2,3],[4,5,6]]],
    expected: 12
  },
  {
    input: [[[1,4,8,6,2,2,1,7],[4,7,3,1,4,0,8,7],[1,1,1,1,1,1,1,1]]],
    expected: 12
  },
  {
    input: [[[5]]],
    expected: 5
  },
  {
    input: [[[1,2],[3,4]]],
    expected: 7
  },
  {
    input: [[[1,2,5],[3,2,1]]],
    expected: 6
  },
  {
    input: [[[9,1,4,8]]],
    expected: 22
  },
  {
    input: [[[2],[3],[1],[4]]],
    expected: 10
  }
];

/**
 * Find minimum path sum from top-left to bottom-right in a grid
 * @param {number[][]} grid - 2D grid with non-negative numbers
 * @return {number} Minimum path sum
 */
function minPathSum(grid) {
    if (!grid || grid.length === 0 || grid[0].length === 0) return 0;

    const m = grid.length;
    const n = grid[0].length;

    // In-place DP to save space
    // Modify the grid to store minimum path sums

    // Initialize first row: can only come from left
    for (let j = 1; j < n; j++) {
        grid[0][j] += grid[0][j - 1];
    }

    // Initialize first column: can only come from above
    for (let i = 1; i < m; i++) {
        grid[i][0] += grid[i - 1][0];
    }

    // Fill the rest of the grid
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            // Current cell = current value + minimum of (from above, from left)
            grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);
        }
    }

    return grid[m - 1][n - 1];
}

export default minPathSum;