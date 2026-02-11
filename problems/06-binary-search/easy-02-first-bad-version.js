/*
Problem: First Bad Version
Difficulty: Easy
Category: Binary Search, Interactive
LeetCode: #278
Pattern: Binary Search for First Occurrence

You are a product manager and currently leading a team to develop a new product.
Unfortunately, the latest version of your product fails the quality check.
Since each version is developed based on the previous version, all the versions
after a bad version are also bad.

Suppose you have n versions [1, 2, ..., n] and you want to find out the first bad one,
which causes all the following ones to be bad.

You are given an API bool isBadVersion(version) which returns whether version is bad.
Implement a function to find the first bad version. You should minimize the number of
calls to the API.

Example 1:
  Input: n = 5, bad = 4
  Output: 4
  Explanation:
    call isBadVersion(3) -> false
    call isBadVersion(5) -> true
    call isBadVersion(4) -> true
    Then 4 is the first bad version.

Example 2:
  Input: n = 1, bad = 1
  Output: 1
  Explanation: Only one version, and it's bad

Example 3:
  Input: n = 10, bad = 7
  Output: 7
  Explanation: First bad version is 7

Example 4:
  Input: n = 2, bad = 1
  Output: 1
  Explanation: First version is bad

Constraints:
  - 1 <= bad <= n <= 2^31 - 1

Time Complexity: O(log n) where n is the total number of versions
Space Complexity: O(1)

Pattern Notes:
  - Binary search for finding the first occurrence of a condition
  - Use while (left < right) to find leftmost boundary
  - When isBadVersion(mid) is false, bad version is to the right: left = mid + 1
  - When isBadVersion(mid) is true, bad version might be mid or to the left: right = mid
  - Final left pointer will be the first bad version
  - This is the "find leftmost" binary search template
*/

export const functionName = 'solution';

export const tests = [
  {
    input: [5, 4],
    expected: 4
  },
  {
    input: [1, 1],
    expected: 1
  },
  {
    input: [10, 7],
    expected: 7
  },
  {
    input: [2, 1],
    expected: 1
  },
  {
    input: [3, 2],
    expected: 2
  },
  {
    input: [100, 50],
    expected: 50
  },
  {
    input: [1000, 1],
    expected: 1
  },
  {
    input: [1000, 999],
    expected: 999
  },
  // --- Additional rigorous test cases ---
  {
    // All versions are bad (first version is bad)
    input: [50, 1],
    expected: 1
  },
  {
    // Only the last version is bad
    input: [50, 50],
    expected: 50
  },
  {
    // Large n, bad version in the middle
    input: [10000, 5000],
    expected: 5000
  },
  {
    // Two versions, second is bad
    input: [2, 2],
    expected: 2
  }
];

/**
 * Creates a solution function that uses the isBadVersion API
 * @param {function} isBadVersion - API function that returns whether version is bad
 * @return {function} Solution function that finds first bad version
 */
function solution(isBadVersion) {
    /**
     * Find the first bad version
     * @param {number} n - Total number of versions
     * @return {number} First bad version number
     */
    return function(n) {
        let left = 1;
        let right = n;

        while (left < right) {
            // Use Math.floor to avoid potential integer overflow
            const mid = Math.floor((left + right) / 2);

            if (isBadVersion(mid)) {
                // Bad version found, but there might be an earlier one
                right = mid;
            } else {
                // Good version, bad version must be to the right
                left = mid + 1;
            }
        }

        return left;
    };
}

/**
 * Mock isBadVersion function for testing
 * @param {number} badVersion - The first bad version number
 * @return {function} isBadVersion function for testing
 */
function createMockIsBadVersion(badVersion) {
    return function(version) {
        return version >= badVersion;
    };
}

/**
 * Test wrapper that simulates the LeetCode environment
 * @param {number} n - Total number of versions
 * @param {number} bad - First bad version
 * @return {number} Result from the solution
 */
function testFirstBadVersion(n, bad) {
    const isBadVersion = createMockIsBadVersion(bad);
    const firstBadVersion = solution(isBadVersion);
    return firstBadVersion(n);
}

// Export the test function as the main function for our test system
export default testFirstBadVersion;