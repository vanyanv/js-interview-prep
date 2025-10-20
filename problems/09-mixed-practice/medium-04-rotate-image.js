/*
Problem: Rotate Image 90 Degrees
Difficulty: Medium
Category: Array, Matrix, Math
LeetCode: #48
Pattern: Matrix Manipulation + In-place Rotation + Mathematical Transformation
Mixed Patterns: 2D Array + Layer-by-layer Processing + Coordinate Transformation

You are given an n x n 2D matrix representing an image, rotate the image by 90
degrees (clockwise).

You have to rotate the image in-place, which means you have to modify the input
2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.

Example 1:
  Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
  Output: [[7,4,1],[8,5,2],[9,6,3]]

  Rotation:
  1 2 3    7 4 1
  4 5 6 => 8 5 2
  7 8 9    9 6 3

Example 2:
  Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
  Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]

Example 3:
  Input: matrix = [[1]]
  Output: [[1]]

Example 4:
  Input: matrix = [[1,2],[3,4]]
  Output: [[3,1],[4,2]]

Constraints:
  - n == matrix.length == matrix[i].length
  - 1 <= n <= 20
  - -1000 <= matrix[i][j] <= 1000

Time Complexity: O(n²) where n is matrix dimension
Space Complexity: O(1) - in-place rotation

Pattern Notes:
  - Two main approaches: transpose + reverse, layer-by-layer rotation
  - Transpose + reverse: easier to understand and implement
  - Layer rotation: more complex but direct transformation
  - Handle odd/even matrix sizes for center elements
  - Mathematical relationship: (i,j) → (j, n-1-i) for 90° clockwise

Interview Notes:
  - Follow-up: Rotate counter-clockwise (270° clockwise)
  - Follow-up: Rotate by arbitrary angle (not just 90°)
  - Follow-up: Rotate rectangular matrix (not just square)
  - Follow-up: Rotate multiple times efficiently
*/

export const functionName = 'rotate';

export const tests = [
  {
    input: [[[1,2,3],[4,5,6],[7,8,9]]],
    expected: [[7,4,1],[8,5,2],[9,6,3]]
  },
  {
    input: [[[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]],
    expected: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
  },
  {
    input: [[[1]]],
    expected: [[1]]
  },
  {
    input: [[[1,2],[3,4]]],
    expected: [[3,1],[4,2]]
  },
  {
    input: [[[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]],
    expected: [[13,9,5,1],[14,10,6,2],[15,11,7,3],[16,12,8,4]]
  }
];

/**
 * Rotates matrix 90 degrees clockwise in-place using transpose + reverse
 * @param {number[][]} matrix - n x n matrix to rotate
 * @return {void} Do not return anything, modify matrix in-place instead
 */
function rotate(matrix) {
    const n = matrix.length;

    // Step 1: Transpose the matrix (swap along diagonal)
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }

    // Step 2: Reverse each row
    for (let i = 0; i < n; i++) {
        matrix[i].reverse();
    }
}

/**
 * Alternative: Layer-by-layer rotation approach
 * @param {number[][]} matrix - n x n matrix to rotate
 * @return {void} Modify matrix in-place
 */
function rotateLayerByLayer(matrix) {
    const n = matrix.length;

    // Process each layer (concentric squares)
    for (let layer = 0; layer < Math.floor(n / 2); layer++) {
        const first = layer;
        const last = n - 1 - layer;

        // Rotate elements in current layer
        for (let i = first; i < last; i++) {
            const offset = i - first;

            // Save top element
            const top = matrix[first][i];

            // Move left to top
            matrix[first][i] = matrix[last - offset][first];

            // Move bottom to left
            matrix[last - offset][first] = matrix[last][last - offset];

            // Move right to bottom
            matrix[last][last - offset] = matrix[i][last];

            // Move top to right
            matrix[i][last] = top;
        }
    }
}

/**
 * Alternative: Direct coordinate transformation
 * @param {number[][]} matrix - n x n matrix to rotate
 * @return {void} Modify matrix in-place
 */
function rotateCoordinateTransform(matrix) {
    const n = matrix.length;

    // Create a copy to avoid overwriting during transformation
    const temp = matrix.map(row => [...row]);

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            // 90° clockwise: (i,j) → (j, n-1-i)
            matrix[j][n - 1 - i] = temp[i][j];
        }
    }
}

/**
 * Extended: Rotate counter-clockwise (270° clockwise)
 * @param {number[][]} matrix - n x n matrix to rotate
 * @return {void} Modify matrix in-place
 */
function rotateCounterClockwise(matrix) {
    const n = matrix.length;

    // Transpose the matrix
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }

    // Reverse each column (instead of each row)
    for (let j = 0; j < n; j++) {
        let top = 0, bottom = n - 1;
        while (top < bottom) {
            [matrix[top][j], matrix[bottom][j]] = [matrix[bottom][j], matrix[top][j]];
            top++;
            bottom--;
        }
    }
}

/**
 * Extended: Rotate by arbitrary 90-degree increments
 * @param {number[][]} matrix - n x n matrix to rotate
 * @param {number} times - Number of 90° clockwise rotations
 * @return {void} Modify matrix in-place
 */
function rotateMultiple(matrix, times) {
    // Normalize times to 0-3 range
    times = ((times % 4) + 4) % 4;

    for (let i = 0; i < times; i++) {
        rotate(matrix);
    }
}

/**
 * Extended: Rotate with new matrix return (not in-place)
 * @param {number[][]} matrix - n x n matrix to rotate
 * @return {number[][]} New rotated matrix
 */
function rotateNewMatrix(matrix) {
    const n = matrix.length;
    const rotated = Array(n).fill().map(() => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            rotated[j][n - 1 - i] = matrix[i][j];
        }
    }

    return rotated;
}

/**
 * Extended: Rotate rectangular matrix (m x n)
 * @param {number[][]} matrix - m x n matrix to rotate
 * @return {number[][]} New rotated matrix (n x m)
 */
function rotateRectangular(matrix) {
    if (!matrix || matrix.length === 0) return [];

    const m = matrix.length;
    const n = matrix[0].length;
    const rotated = Array(n).fill().map(() => Array(m).fill(0));

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            rotated[j][m - 1 - i] = matrix[i][j];
        }
    }

    return rotated;
}

/**
 * Extended: Rotate with performance tracking
 * @param {number[][]} matrix - n x n matrix to rotate
 * @return {Object} Rotation result with performance stats
 */
function rotateWithStats(matrix) {
    const n = matrix.length;
    const startTime = performance.now();
    let swaps = 0;

    // Count swaps during transpose
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
            swaps++;
        }
    }

    // Count swaps during row reversal
    for (let i = 0; i < n; i++) {
        let left = 0, right = n - 1;
        while (left < right) {
            [matrix[i][left], matrix[i][right]] = [matrix[i][right], matrix[i][left]];
            swaps++;
            left++;
            right--;
        }
    }

    const endTime = performance.now();

    return {
        matrix,
        stats: {
            matrixSize: n,
            totalSwaps: swaps,
            executionTime: endTime - startTime,
            elementsProcessed: n * n
        }
    };
}

/**
 * Helper: Print matrix in readable format
 * @param {number[][]} matrix - Matrix to print
 * @return {string} Formatted matrix string
 */
function printMatrix(matrix) {
    return matrix.map(row => row.join(' ')).join('\n');
}

export default rotate;