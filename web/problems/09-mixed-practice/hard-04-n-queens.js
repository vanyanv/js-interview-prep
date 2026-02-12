/*
Problem: N-Queens
Difficulty: Hard
Category: Backtracking, Array, Recursion
LeetCode: #51
Pattern: Backtracking + Constraint Satisfaction + State Space Search
Mixed Patterns: Backtracking + 2D Array + Constraint Checking + Optimization

The n-queens puzzle is the problem of placing n chess queens on an n×n
chessboard so that no two queens attack each other.

Given an integer n, return all distinct solutions to the n-queens puzzle.
You may return the answer in any order.

Each solution contains a distinct board configuration of the n-queens'
placement, where 'Q' and '.' both indicate a queen and an empty space, respectively.

Example 1:
  Input: n = 4
  Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
  Explanation: There exist two distinct solutions to the 4-queens puzzle.

Example 2:
  Input: n = 1
  Output: [["Q"]]

Example 3:
  Input: n = 2
  Output: []
  Explanation: No solution exists for 2-queens.

Example 4:
  Input: n = 3
  Output: []
  Explanation: No solution exists for 3-queens.

Constraints:
  - 1 <= n <= 9

Time Complexity: O(N!) where N is the board size
Space Complexity: O(N) for recursion stack and board state

Pattern Notes:
  - Backtracking with constraint checking at each step
  - Queens attack horizontally, vertically, and diagonally
  - Use arrays to track occupied columns and diagonals
  - Diagonal constraints: row-col and row+col remain constant
  - Optimize by checking constraints before recursive calls

Interview Notes:
  - Follow-up: Count total number of solutions instead of returning all
  - Follow-up: Find just one solution instead of all
  - Follow-up: Optimize using bit manipulation
  - Follow-up: Generalize to other chess pieces
*/

export const functionName = 'solveNQueens';

export const tests = [
  {
    input: [4],
    expected: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
  },
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
    input: [8],
    expected: [] // Too many solutions to list, but should return 92 solutions
  }
];

/**
 * Solves N-Queens puzzle using backtracking
 * @param {number} n - Size of the chessboard (n x n)
 * @return {string[][]} All valid board configurations
 */
function solveNQueens(n) {
    const solutions = [];
    const board = Array(n).fill().map(() => Array(n).fill('.'));

    // Track attacked positions for optimization
    const cols = new Set();
    const diag1 = new Set(); // row - col
    const diag2 = new Set(); // row + col

    function backtrack(row) {
        if (row === n) {
            // Found a valid solution
            solutions.push(board.map(row => row.join('')));
            return;
        }

        for (let col = 0; col < n; col++) {
            // Check if position is under attack
            if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) {
                continue;
            }

            // Place queen
            board[row][col] = 'Q';
            cols.add(col);
            diag1.add(row - col);
            diag2.add(row + col);

            // Recursively place queens in next row
            backtrack(row + 1);

            // Backtrack - remove queen
            board[row][col] = '.';
            cols.delete(col);
            diag1.delete(row - col);
            diag2.delete(row + col);
        }
    }

    backtrack(0);
    return solutions;
}

/**
 * Alternative: Count total number of solutions
 * @param {number} n - Size of the chessboard
 * @return {number} Total number of distinct solutions
 */
function totalNQueens(n) {
    let count = 0;
    const cols = new Set();
    const diag1 = new Set();
    const diag2 = new Set();

    function backtrack(row) {
        if (row === n) {
            count++;
            return;
        }

        for (let col = 0; col < n; col++) {
            if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) {
                continue;
            }

            cols.add(col);
            diag1.add(row - col);
            diag2.add(row + col);

            backtrack(row + 1);

            cols.delete(col);
            diag1.delete(row - col);
            diag2.delete(row + col);
        }
    }

    backtrack(0);
    return count;
}

/**
 * Alternative: Bit manipulation optimization
 * @param {number} n - Size of the chessboard
 * @return {string[][]} All valid board configurations
 */
function solveNQueensBitwise(n) {
    const solutions = [];
    const board = Array(n).fill().map(() => Array(n).fill('.'));

    function backtrack(row, cols, diag1, diag2) {
        if (row === n) {
            solutions.push(board.map(row => row.join('')));
            return;
        }

        // Available positions (1 bits indicate free positions)
        let available = ((1 << n) - 1) & ~(cols | diag1 | diag2);

        while (available) {
            // Get rightmost set bit (lowest available position)
            const pos = available & -available;
            available ^= pos; // Remove this position

            // Calculate column from bit position
            const col = Math.log2(pos);

            // Place queen
            board[row][col] = 'Q';

            backtrack(
                row + 1,
                cols | pos,
                (diag1 | pos) << 1,
                (diag2 | pos) >> 1
            );

            // Backtrack
            board[row][col] = '.';
        }
    }

    backtrack(0, 0, 0, 0);
    return solutions;
}

/**
 * Alternative: Find first solution only
 * @param {number} n - Size of the chessboard
 * @return {string[]} First valid board configuration, empty if none exists
 */
function solveNQueensFirst(n) {
    const board = Array(n).fill().map(() => Array(n).fill('.'));
    const cols = new Set();
    const diag1 = new Set();
    const diag2 = new Set();

    function backtrack(row) {
        if (row === n) {
            return true; // Found solution
        }

        for (let col = 0; col < n; col++) {
            if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) {
                continue;
            }

            board[row][col] = 'Q';
            cols.add(col);
            diag1.add(row - col);
            diag2.add(row + col);

            if (backtrack(row + 1)) {
                return true; // Solution found, stop searching
            }

            board[row][col] = '.';
            cols.delete(col);
            diag1.delete(row - col);
            diag2.delete(row + col);
        }

        return false;
    }

    return backtrack(0) ? board.map(row => row.join('')) : [];
}

/**
 * Extended: N-Queens with obstacles
 * @param {number} n - Size of the chessboard
 * @param {number[][]} obstacles - Array of [row, col] positions that are blocked
 * @return {string[][]} All valid board configurations avoiding obstacles
 */
function solveNQueensWithObstacles(n, obstacles = []) {
    const solutions = [];
    const board = Array(n).fill().map(() => Array(n).fill('.'));
    const obstacleSet = new Set(obstacles.map(([r, c]) => `${r},${c}`));

    // Mark obstacles on board
    for (const [r, c] of obstacles) {
        if (r >= 0 && r < n && c >= 0 && c < n) {
            board[r][c] = 'X';
        }
    }

    const cols = new Set();
    const diag1 = new Set();
    const diag2 = new Set();

    function backtrack(row) {
        if (row === n) {
            solutions.push(board.map(row => row.join('')));
            return;
        }

        for (let col = 0; col < n; col++) {
            // Skip if position is obstacle or under attack
            if (obstacleSet.has(`${row},${col}`) ||
                cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) {
                continue;
            }

            board[row][col] = 'Q';
            cols.add(col);
            diag1.add(row - col);
            diag2.add(row + col);

            backtrack(row + 1);

            board[row][col] = '.';
            cols.delete(col);
            diag1.delete(row - col);
            diag2.delete(row + col);
        }
    }

    backtrack(0);
    return solutions;
}

/**
 * Extended: N-Queens with detailed statistics
 * @param {number} n - Size of the chessboard
 * @return {Object} Solution with performance statistics
 */
function solveNQueensWithStats(n) {
    let totalCalls = 0;
    let pruned = 0;
    let solutions = 0;

    const results = [];
    const board = Array(n).fill().map(() => Array(n).fill('.'));
    const cols = new Set();
    const diag1 = new Set();
    const diag2 = new Set();

    const startTime = performance.now();

    function backtrack(row) {
        totalCalls++;

        if (row === n) {
            solutions++;
            results.push(board.map(row => row.join('')));
            return;
        }

        for (let col = 0; col < n; col++) {
            if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) {
                pruned++;
                continue;
            }

            board[row][col] = 'Q';
            cols.add(col);
            diag1.add(row - col);
            diag2.add(row + col);

            backtrack(row + 1);

            board[row][col] = '.';
            cols.delete(col);
            diag1.delete(row - col);
            diag2.delete(row + col);
        }
    }

    backtrack(0);

    const endTime = performance.now();

    return {
        solutions: results,
        stats: {
            n,
            solutionCount: solutions,
            totalBacktrackCalls: totalCalls,
            prunedBranches: pruned,
            executionTime: endTime - startTime,
            efficiency: pruned / totalCalls
        }
    };
}

/**
 * Extended: Visualize N-Queens solution
 * @param {string[]} solution - Single board configuration
 * @return {string} Pretty-printed board
 */
function visualizeBoard(solution) {
    if (!solution || solution.length === 0) {
        return 'No solution';
    }

    const n = solution.length;
    let result = '  ';

    // Column headers
    for (let i = 0; i < n; i++) {
        result += ` ${i}`;
    }
    result += '\n';

    // Board with row numbers
    for (let i = 0; i < n; i++) {
        result += `${i} `;
        for (let j = 0; j < n; j++) {
            result += ` ${solution[i][j]}`;
        }
        result += '\n';
    }

    return result;
}

/**
 * Extended: Check if N-Queens solution is valid
 * @param {string[]} solution - Board configuration to validate
 * @return {boolean} True if solution is valid
 */
function isValidNQueensSolution(solution) {
    const n = solution.length;
    const queens = [];

    // Find all queen positions
    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            if (solution[row][col] === 'Q') {
                queens.push([row, col]);
            }
        }
    }

    // Should have exactly n queens
    if (queens.length !== n) return false;

    // Check if any two queens attack each other
    for (let i = 0; i < queens.length; i++) {
        for (let j = i + 1; j < queens.length; j++) {
            const [r1, c1] = queens[i];
            const [r2, c2] = queens[j];

            // Same row, column, or diagonal
            if (r1 === r2 || c1 === c2 || Math.abs(r1 - r2) === Math.abs(c1 - c2)) {
                return false;
            }
        }
    }

    return true;
}

export default solveNQueens;