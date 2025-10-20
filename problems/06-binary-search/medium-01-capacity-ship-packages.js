/*
Problem: Capacity To Ship Packages Within D Days
Difficulty: Medium
Category: Binary Search, Array
LeetCode: #1011
Pattern: Binary Search on Answer Space

A conveyor belt has packages that must be shipped from one port to another within days days.
The ith package on the conveyor belt has a weight of weights[i]. Each day, we load the ship
with packages on the conveyor belt (in the order given by weights). We may not load more
weight than the maximum weight capacity of the ship.

Return the least weight capacity of the ship that will result in all the packages on the
conveyor belt being shipped within days days.

Example 1:
  Input: weights = [1,2,3,4,5,6,7,8,9,10], days = 5
  Output: 15
  Explanation: A ship capacity of 15 is the minimum to ship all packages in 5 days:
    Day 1: 1,2,3,4,5 (15 weight)
    Day 2: 6,7 (13 weight)
    Day 3: 8 (8 weight)
    Day 4: 9 (9 weight)
    Day 5: 10 (10 weight)

Example 2:
  Input: weights = [3,2,2,4,1,4], days = 3
  Output: 6
  Explanation: A ship capacity of 6 is the minimum to ship all packages in 3 days:
    Day 1: 3,2 (5 weight)
    Day 2: 2,4 (6 weight)
    Day 3: 1,4 (5 weight)

Example 3:
  Input: weights = [1,2,3,1,1], days = 4
  Output: 3
  Explanation: Ship capacity of 3 allows shipping in 4 days

Example 4:
  Input: weights = [10], days = 1
  Output: 10
  Explanation: Single package, minimum capacity is its weight

Example 5:
  Input: weights = [1,2,3,4,5], days = 1
  Output: 15
  Explanation: All packages in one day, capacity must be sum of all weights

Constraints:
  - 1 <= days <= weights.length <= 5 * 10^4
  - 1 <= weights[i] <= 500

Time Complexity: O(n * log(sum(weights))) where n is the number of packages
Space Complexity: O(1)

Pattern Notes:
  - Binary search on ship capacity
  - Minimum capacity is max(weights) (heaviest single package)
  - Maximum capacity is sum(weights) (all packages at once)
  - For each capacity, simulate loading to count days needed
  - If days needed <= target days, try smaller capacity
  - If days needed > target days, need larger capacity
  - Use greedy approach to pack packages into each day
*/

export const functionName = 'shipWithinDays';

export const tests = [
  {
    input: [[1,2,3,4,5,6,7,8,9,10], 5],
    expected: 15
  },
  {
    input: [[3,2,2,4,1,4], 3],
    expected: 6
  },
  {
    input: [[1,2,3,1,1], 4],
    expected: 3
  },
  {
    input: [[10], 1],
    expected: 10
  },
  {
    input: [[1,2,3,4,5], 1],
    expected: 15
  },
  {
    input: [[1,2,3,4,5], 5],
    expected: 5
  },
  {
    input: [[1,2,3,4,5,6,7,8,9,10], 1],
    expected: 55
  },
  {
    input: [[500,500,500], 2],
    expected: 1000
  }
];

/**
 * Calculate number of days needed with given ship capacity
 * @param {number[]} weights - Array of package weights
 * @param {number} capacity - Ship capacity
 * @return {number} Number of days needed
 */
function calculateDays(weights, capacity) {
    let days = 1;
    let currentWeight = 0;

    for (const weight of weights) {
        if (currentWeight + weight > capacity) {
            // Start a new day
            days++;
            currentWeight = weight;
        } else {
            currentWeight += weight;
        }
    }

    return days;
}

/**
 * Find minimum ship capacity to ship all packages within given days
 * @param {number[]} weights - Array of package weights
 * @param {number} days - Maximum number of days allowed
 * @return {number} Minimum ship capacity needed
 */
function shipWithinDays(weights, days) {
    let left = Math.max(...weights);  // Minimum capacity (heaviest package)
    let right = weights.reduce((sum, weight) => sum + weight, 0);  // Maximum capacity (all packages)

    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        const daysNeeded = calculateDays(weights, mid);

        if (daysNeeded <= days) {
            // Can ship within time limit, try smaller capacity
            right = mid;
        } else {
            // Cannot ship within time limit, need larger capacity
            left = mid + 1;
        }
    }

    return left;
}

export default shipWithinDays;