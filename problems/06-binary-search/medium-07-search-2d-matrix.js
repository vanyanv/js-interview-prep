/*
Problem: Search a 2D Matrix
Difficulty: Medium
Category: Binary Search, Matrix
LeetCode: #74
Pattern: Binary Search on 2D Matrix

You are given an m x n integer matrix matrix with the following two properties:
- Each row is sorted in non-decreasing order
- The first integer of each row is greater than the last integer of the previous row

Given an integer target, return true if target is in matrix or false otherwise.

You must write a solution in O(log(m * n)) time complexity.

Example 1:
  Input: matrix = [[1,4,7,11],[2,5,8,12],[3,6,9,16],[10,13,14,17]], target = 5
  Output: true
  Explanation: 5 is found in the matrix

Example 2:
  Input: matrix = [[1,4,7,11],[2,5,8,12],[3,6,9,16],[10,13,14,17]], target = 13
  Output: true
  Explanation: 13 is found in the matrix

Example 3:
  Input: matrix = [[1,4,7,11],[2,5,8,12],[3,6,9,16],[10,13,14,17]], target = 20
  Output: false
  Explanation: 20 is not in the matrix

Example 4:
  Input: matrix = [[1]], target = 1
  Output: true
  Explanation: Single element matrix

Example 5:
  Input: matrix = [[1,3,5]], target = 3
  Output: true
  Explanation: Single row matrix

Constraints:
  - m == matrix.length
  - n == matrix[i].length
  - 1 <= m, n <= 100
  - -10^4 <= matrix[i][j], target <= 10^4

Time Complexity: O(log(m * n)) where m is rows and n is columns
Space Complexity: O(1)

Pattern Notes:
  - Treat 2D matrix as 1D sorted array using index mapping
  - Convert 1D index to 2D coordinates: row = index / cols, col = index % cols
  - Use standard binary search on virtual 1D array
  - Total elements = m * n, so search range is [0, m*n-1]
  - Alternative: First find row with binary search, then search within row
*/

export const functionName = 'searchMatrix';

export const tests = [
  {
    input: [[[1,4,7,11],[2,5,8,12],[3,6,9,16],[10,13,14,17]], 5],
    expected: true
  },
  {
    input: [[[1,4,7,11],[2,5,8,12],[3,6,9,16],[10,13,14,17]], 13],
    expected: true
  },
  {
    input: [[[1,4,7,11],[2,5,8,12],[3,6,9,16],[10,13,14,17]], 20],
    expected: false
  },
  {
    input: [[[1]], 1],
    expected: true
  },
  {
    input: [[[1,3,5]], 3],
    expected: true
  },
  {
    input: [[[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3],
    expected: true
  },
  {
    input: [[[1,3,5,7],[10,11,16,20],[23,30,34,60]], 11],
    expected: true
  },
  {
    input: [[[1,3,5,7],[10,11,16,20],[23,30,34,60]], 13],
    expected: false
  }
];

/**
 * Search for target in 2D matrix using binary search
 * @param {number[][]} matrix - 2D matrix sorted row-wise and column-wise
 * @param {number} target - Target value to search for
 * @return {boolean} True if target is found, false otherwise
 */
function searchMatrix(matrix, target) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
        return false;
    }

    const m = matrix.length;
    const n = matrix[0].length;
    let left = 0;
    let right = m * n - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        // Convert 1D index to 2D coordinates
        const row = Math.floor(mid / n);
        const col = mid % n;
        const midValue = matrix[row][col];

        if (midValue === target) {
            return true;
        } else if (midValue < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return false;
}

export default searchMatrix;