/*
Problem: N-Queens
Difficulty: Hard
Category: Recursion, Backtracking, Matrix
LeetCode: #51
Pattern: Constrained Backtracking — Row-by-Row Placement

The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two
queens attack each other.

Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the
answer in any order.

Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and
'.' both indicate a queen and an empty space, respectively.

Example 1:
  Input: n = 4
  Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
  Explanation:
    Solution 1:        Solution 2:
    . Q . .            . . Q .
    . . . Q            Q . . .
    Q . . .            . . . Q
    . . Q .            . Q . .

Example 2:
  Input: n = 1
  Output: [["Q"]]
  Explanation: Only one way to place 1 queen on a 1x1 board

Constraints:
  - 1 <= n <= 9

Time Complexity: O(n!) — at most n choices for first row, n-1 for second, etc.
Space Complexity: O(n^2) for the board + O(n) for tracking sets + O(n) recursion stack

Recursion Pattern Notes:
  - Place queens one row at a time (each row must have exactly one queen)
  - For each row, try every column and check if placement is safe
  - A queen attacks along its row, column, and both diagonals
  - Use sets to track occupied columns, main diagonals (row-col), and anti-diagonals (row+col)
  - Base case: all n rows have a queen placed — record the board as a solution
  - This is a classic constrained satisfaction problem solved via backtracking

Hints:
  - Process one row at a time — this eliminates row conflicts automatically
  - Use a set for columns to check column conflicts in O(1)
  - Main diagonal: all cells on the same diagonal have the same (row - col) value
  - Anti-diagonal: all cells on the same anti-diagonal have the same (row + col) value
  - When backtracking, remove the queen and update all three tracking sets
*/

export const functionName = 'solveNQueens';

export const tests = [
  {
    input: [1],
    expected: [["Q"]]
  },
  {
    input: [2],
    expected: []
  },
  {
    input: [3],
    expected: []
  },
  {
    input: [4],
    expected: [
      [".Q..","...Q","Q...","..Q."],
      ["..Q.","Q...","...Q",".Q.."]
    ]
  },
  {
    input: [5],
    expected: [
      ["Q....","..Q..","....Q",".Q...","...Q."],
      ["Q....","...Q.",".Q...","....Q","..Q.."],
      [".Q...","...Q.","Q....","..Q..","....Q"],
      [".Q...","....Q","..Q..","Q....","...Q."],
      ["..Q..","Q....","...Q.",".Q...","....Q"],
      ["..Q..","....Q",".Q...","...Q.","Q...."],
      ["...Q.","Q....","..Q..","....Q",".Q..."],
      ["...Q.",".Q...","....Q","..Q..","Q...."],
      ["....Q",".Q...","...Q.","Q....","..Q.."],
      ["....Q","..Q..","Q....","...Q.",".Q..."]
    ]
  },
  {
    input: [6],
    expected: [
      [".Q....","...Q..",".....Q","Q.....","..Q...","....Q."],
      ["..Q...",".....Q",".Q....","....Q.","Q.....","...Q.."],
      ["...Q..","Q.....","....Q.",".Q....",".....Q","..Q..."],
      ["....Q.","..Q...","Q.....",".....Q","...Q..",".Q...."]
    ]
  }
];

/**
 * Solve the N-Queens puzzle — place n queens on an n x n board with no attacks.
 * Uses backtracking, placing one queen per row.
 * @param {number} n - Size of the board and number of queens
 * @return {string[][]} All distinct solutions, each as an array of strings
 */
function solveNQueens(n) {
    const result = [];
    const board = Array.from({ length: n }, () => '.'.repeat(n).split(''));
    const cols = new Set();
    const diag1 = new Set(); // row - col (main diagonal)
    const diag2 = new Set(); // row + col (anti-diagonal)

    function backtrack(row) {
        // Base case: all queens placed
        if (row === n) {
            result.push(board.map(r => r.join('')));
            return;
        }

        for (let col = 0; col < n; col++) {
            const d1 = row - col;
            const d2 = row + col;

            // Check if this column or diagonal is under attack
            if (cols.has(col) || diag1.has(d1) || diag2.has(d2)) {
                continue;
            }

            // Place queen
            board[row][col] = 'Q';
            cols.add(col);
            diag1.add(d1);
            diag2.add(d2);

            backtrack(row + 1);

            // Remove queen (backtrack)
            board[row][col] = '.';
            cols.delete(col);
            diag1.delete(d1);
            diag2.delete(d2);
        }
    }

    backtrack(0);
    return result;
}

export default solveNQueens;
