/*
Problem: Brick Wall
Difficulty: Medium
Category: Arrays, Hash Map
LeetCode: #554
Pattern: Position Frequency Counting

There is a rectangular brick wall in front of you with n rows of bricks.
The ith row has some number of bricks each of the same height (i.e., one unit)
but they can be of different widths. The total width of each row is the same.

Draw a vertical line from the top to the bottom and cross the least number
of bricks. If your line goes through the edge of a brick, then the brick
is not considered as crossed. A brick is crossed only if the line goes
through the middle of the brick.

Return the minimum number of bricks the line crosses.

Example 1:
  Input: wall = [[1,2,2,1],[3,1,2],[1,3,2],[2,4],[3,1,2],[1,3,1,1]]
  Output: 2

Example 2:
  Input: wall = [[1],[1],[1]]
  Output: 3

Example 3:
  Input: wall = [[1,1],[2],[1,1]]
  Output: 1

Constraints:
  - n == wall.length
  - 1 <= n <= 10^4
  - 1 <= wall[i].length <= 10^4
  - 1 <= sum(wall[i].length) <= 2 * 10^4
  - sum(wall[i]) is the same for each row i.
  - 1 <= wall[i][j] <= 2^31 - 1

Time Complexity: O(n * m) where n is number of rows, m is average bricks per row
Space Complexity: O(w) where w is total wall width

Hash Map Pattern Notes:
  - Count frequency of edge positions across all rows
  - For each row, calculate cumulative positions of brick edges
  - Don't count the rightmost edge (end of wall)
  - Position with maximum edge frequency gives minimum crossings
  - Answer = total_rows - max_edge_frequency
*/

export const functionName = 'leastBricks';

export const tests = [
  {
    input: [[[1, 2, 2, 1], [3, 1, 2], [1, 3, 2], [2, 4], [3, 1, 2], [1, 3, 1, 1]]],
    expected: 2
  },
  {
    input: [[[1], [1], [1]]],
    expected: 3
  },
  {
    input: [[[1, 1], [2], [1, 1]]],
    expected: 1
  },
  {
    input: [[[1, 2, 3], [2, 1, 3], [3, 2, 1]]],
    expected: 0
  },
  {
    input: [[[2, 1, 1], [1, 1, 2], [1, 2, 1]]],
    expected: 1
  },
  {
    input: [[[1, 1, 1, 1], [2, 2], [1, 3], [4]]],
    expected: 1
  },
  {
    input: [[[100000000]]],
    expected: 1
  },
  {
    input: [[[5, 5, 5], [3, 7, 5], [2, 8, 5], [1, 9, 5]]],
    expected: 0
  },
  // Edge case: single row, single brick (no edges to align, must cross 1)
  {
    input: [[[5]]],
    expected: 1
  },
  // All rows identical bricks - every edge aligns, crosses 0
  {
    input: [[[2, 2, 2], [2, 2, 2], [2, 2, 2], [2, 2, 2], [2, 2, 2]]],
    expected: 0
  },
  // Worst case: no two rows share an edge position
  {
    input: [[[1, 5], [2, 4], [3, 3], [4, 2], [5, 1]]],
    expected: 1
  },
  // Larger wall with varying brick sizes; edges at positions:
  // Row 0: 1,3,6  Row 1: 2,4,6  Row 2: 3,6  Row 3: 1,2,3,4,5,6
  // Position 3 appears in rows 0,2,3 => freq 3, position 6 is wall end (excluded)
  // min crossings = 4 - 3 = 1
  {
    input: [[[1, 2, 3, 1], [2, 2, 2, 1], [3, 3, 1], [1, 1, 1, 1, 1, 1, 1]]],
    expected: 1
  }
];