/*
Problem: Spiral Matrix
Difficulty: Medium
Category: Array, Matrix, Simulation
LeetCode: #54
Pattern: Matrix Traversal + Direction Control + Boundary Management
Mixed Patterns: 2D Array Navigation + State Machine + Boundary Tracking

Given an m x n matrix, return all elements of the matrix in spiral order.

Example 1:
  Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
  Output: [1,2,3,6,9,8,7,4,5]
  Explanation:
  1 → 2 → 3
          ↓
  4 → 5   6
  ↑       ↓
  7 ← 8 ← 9

Example 2:
  Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
  Output: [1,2,3,4,8,12,11,10,9,5,6,7]

Example 3:
  Input: matrix = [[1]]
  Output: [1]

Example 4:
  Input: matrix = [[1,2],[3,4]]
  Output: [1,2,4,3]

Constraints:
  - m == matrix.length
  - n == matrix[i].length
  - 1 <= m, n <= 10
  - -100 <= matrix[i][j] <= 100

Time Complexity: O(m * n) where m and n are matrix dimensions
Space Complexity: O(1) not counting output array

Pattern Notes:
  - Four directions: right, down, left, up (clockwise spiral)
  - Track boundaries: top, bottom, left, right
  - Shrink boundaries after completing each direction
  - Handle edge cases: single row, single column, single element
  - Direction state machine: right → down → left → up → repeat

Interview Notes:
  - Follow-up: Generate spiral matrix given dimensions and starting number
  - Follow-up: Counter-clockwise spiral traversal
  - Follow-up: Spiral traversal from center outward
  - Follow-up: 3D spiral matrix traversal
*/

export const functionName = 'spiralOrder';

export const tests = [
  {
    input: [[[1,2,3],[4,5,6],[7,8,9]]],
    expected: [1,2,3,6,9,8,7,4,5]
  },
  {
    input: [[[1,2,3,4],[5,6,7,8],[9,10,11,12]]],
    expected: [1,2,3,4,8,12,11,10,9,5,6,7]
  },
  {
    input: [[[1]]],
    expected: [1]
  },
  {
    input: [[[1,2],[3,4]]],
    expected: [1,2,4,3]
  },
  {
    input: [[[1,2,3]]],
    expected: [1,2,3]
  },
  {
    input: [[[1],[2],[3]]],
    expected: [1,2,3]
  },
  {
    input: [[[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15]]],
    expected: [1,2,3,4,5,10,15,14,13,12,11,6,7,8,9]
  }
];

/**
 * Returns matrix elements in spiral order using boundary tracking
 * @param {number[][]} matrix - 2D matrix
 * @return {number[]} Elements in spiral order
 */
function spiralOrder(matrix) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
        return [];
    }

    const result = [];
    let top = 0;
    let bottom = matrix.length - 1;
    let left = 0;
    let right = matrix[0].length - 1;

    while (top <= bottom && left <= right) {
        // Traverse right across top row
        for (let col = left; col <= right; col++) {
            result.push(matrix[top][col]);
        }
        top++;

        // Traverse down right column
        for (let row = top; row <= bottom; row++) {
            result.push(matrix[row][right]);
        }
        right--;

        // Traverse left across bottom row (if still valid)
        if (top <= bottom) {
            for (let col = right; col >= left; col--) {
                result.push(matrix[bottom][col]);
            }
            bottom--;
        }

        // Traverse up left column (if still valid)
        if (left <= right) {
            for (let row = bottom; row >= top; row--) {
                result.push(matrix[row][left]);
            }
            left++;
        }
    }

    return result;
}

/**
 * Alternative: Direction vector approach
 * @param {number[][]} matrix - 2D matrix
 * @return {number[]} Elements in spiral order
 */
function spiralOrderDirections(matrix) {
    if (!matrix || matrix.length === 0) return [];

    const m = matrix.length;
    const n = matrix[0].length;
    const result = [];
    const visited = Array(m).fill().map(() => Array(n).fill(false));

    // Direction vectors: right, down, left, up
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    let dirIndex = 0;

    let row = 0, col = 0;

    for (let i = 0; i < m * n; i++) {
        result.push(matrix[row][col]);
        visited[row][col] = true;

        // Calculate next position
        const nextRow = row + directions[dirIndex][0];
        const nextCol = col + directions[dirIndex][1];

        // Check if we need to turn (hit boundary or visited cell)
        if (nextRow < 0 || nextRow >= m || nextCol < 0 || nextCol >= n ||
            visited[nextRow][nextCol]) {
            dirIndex = (dirIndex + 1) % 4; // Turn clockwise
        }

        // Move to next position
        row += directions[dirIndex][0];
        col += directions[dirIndex][1];
    }

    return result;
}

/**
 * Alternative: Recursive approach
 * @param {number[][]} matrix - 2D matrix
 * @return {number[]} Elements in spiral order
 */
function spiralOrderRecursive(matrix) {
    if (!matrix || matrix.length === 0) return [];

    const result = [];

    function spiral(top, bottom, left, right) {
        if (top > bottom || left > right) return;

        // Top row
        for (let col = left; col <= right; col++) {
            result.push(matrix[top][col]);
        }

        // Right column
        for (let row = top + 1; row <= bottom; row++) {
            result.push(matrix[row][right]);
        }

        // Bottom row (if different from top)
        if (top < bottom) {
            for (let col = right - 1; col >= left; col--) {
                result.push(matrix[bottom][col]);
            }
        }

        // Left column (if different from right)
        if (left < right) {
            for (let row = bottom - 1; row > top; row--) {
                result.push(matrix[row][left]);
            }
        }

        spiral(top + 1, bottom - 1, left + 1, right - 1);
    }

    spiral(0, matrix.length - 1, 0, matrix[0].length - 1);
    return result;
}

/**
 * Extended: Generate spiral matrix
 * @param {number} n - Matrix size (n x n)
 * @param {number} start - Starting number (default 1)
 * @return {number[][]} Spiral matrix
 */
function generateSpiralMatrix(n, start = 1) {
    const matrix = Array(n).fill().map(() => Array(n).fill(0));

    let top = 0, bottom = n - 1, left = 0, right = n - 1;
    let num = start;

    while (top <= bottom && left <= right) {
        // Fill top row
        for (let col = left; col <= right; col++) {
            matrix[top][col] = num++;
        }
        top++;

        // Fill right column
        for (let row = top; row <= bottom; row++) {
            matrix[row][right] = num++;
        }
        right--;

        // Fill bottom row
        if (top <= bottom) {
            for (let col = right; col >= left; col--) {
                matrix[bottom][col] = num++;
            }
            bottom--;
        }

        // Fill left column
        if (left <= right) {
            for (let row = bottom; row >= top; row--) {
                matrix[row][left] = num++;
            }
            left++;
        }
    }

    return matrix;
}

/**
 * Extended: Counter-clockwise spiral
 * @param {number[][]} matrix - 2D matrix
 * @return {number[]} Elements in counter-clockwise spiral order
 */
function spiralOrderCounterClockwise(matrix) {
    if (!matrix || matrix.length === 0) return [];

    const result = [];
    let top = 0, bottom = matrix.length - 1;
    let left = 0, right = matrix[0].length - 1;

    while (top <= bottom && left <= right) {
        // Down left column
        for (let row = top; row <= bottom; row++) {
            result.push(matrix[row][left]);
        }
        left++;

        // Right across bottom row
        for (let col = left; col <= right; col++) {
            result.push(matrix[bottom][col]);
        }
        bottom--;

        // Up right column
        if (left <= right) {
            for (let row = bottom; row >= top; row--) {
                result.push(matrix[row][right]);
            }
            right--;
        }

        // Left across top row
        if (top <= bottom) {
            for (let col = right; col >= left; col--) {
                result.push(matrix[top][col]);
            }
            top++;
        }
    }

    return result;
}

/**
 * Extended: Spiral traversal with coordinates
 * @param {number[][]} matrix - 2D matrix
 * @return {Object[]} Array of {value, row, col} objects in spiral order
 */
function spiralOrderWithCoordinates(matrix) {
    if (!matrix || matrix.length === 0) return [];

    const result = [];
    let top = 0, bottom = matrix.length - 1;
    let left = 0, right = matrix[0].length - 1;

    while (top <= bottom && left <= right) {
        // Right
        for (let col = left; col <= right; col++) {
            result.push({ value: matrix[top][col], row: top, col });
        }
        top++;

        // Down
        for (let row = top; row <= bottom; row++) {
            result.push({ value: matrix[row][right], row, col: right });
        }
        right--;

        // Left
        if (top <= bottom) {
            for (let col = right; col >= left; col--) {
                result.push({ value: matrix[bottom][col], row: bottom, col });
            }
            bottom--;
        }

        // Up
        if (left <= right) {
            for (let row = bottom; row >= top; row--) {
                result.push({ value: matrix[row][left], row, col: left });
            }
            left++;
        }
    }

    return result;
}

export default spiralOrder;