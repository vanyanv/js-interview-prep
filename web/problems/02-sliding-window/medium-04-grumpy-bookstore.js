/*
Problem: Grumpy Bookstore Owner
Difficulty: Medium
Category: Array, Sliding Window
LeetCode: #1052
Pattern: Fixed Window Sliding Window

There is a bookstore owner that has a store open for n minutes. Every minute, some number of customers enter the store. You are given an integer array customers of length n where customers[i] is the number of customers that enter the store at the ith minute and all those customers leave after the end of that minute.

On some minutes, the bookstore owner is grumpy. You are given a binary array grumpy where grumpy[i] is 1 if the bookstore owner is grumpy during the ith minute, and is 0 otherwise.

When the bookstore owner is grumpy, the customers of that minute are not satisfied, otherwise, they are satisfied.

The bookstore owner knows a secret technique to keep themselves not grumpy for minutes consecutive minutes, but can only use it once.

Return the maximum number of customers that can be satisfied throughout the day.

Example 1:
  Input: customers = [1,0,1,2,1,1,7,5], grumpy = [0,1,0,1,0,1,0,1], minutes = 3
  Output: 16
  Explanation: The bookstore owner keeps themselves not grumpy for the last 3 minutes.
  The maximum number of customers that can be satisfied = 1 + 1 + 1 + 1 + 7 + 5 = 16.

Example 2:
  Input: customers = [1], grumpy = [0], minutes = 1
  Output: 1

Example 3:
  Input: customers = [4,10,10], grumpy = [1,1,0], minutes = 2
  Output: 24
  Explanation: Keep not grumpy for first 2 minutes: 4 + 10 + 10 = 24.

Constraints:
  - n == customers.length == grumpy.length
  - 1 <= minutes <= n <= 2 * 10^4
  - 0 <= customers[i] <= 1000
  - grumpy[i] is either 0 or 1

Time Complexity: O(n)
Space Complexity: O(1)

Pattern Notes:
  - Two-step approach: calculate base satisfaction + find best window to apply technique
  - Base satisfaction: sum of customers when owner is not grumpy
  - Use sliding window of size 'minutes' to find maximum additional customers we can satisfy
  - Additional customers in a window = sum of customers[i] where grumpy[i] = 1 in that window
*/

export const functionName = 'maxSatisfied';

export const tests = [
  {
    input: [[1,0,1,2,1,1,7,5], [0,1,0,1,0,1,0,1], 3],
    expected: 16
  },
  {
    input: [[1], [0], 1],
    expected: 1
  },
  {
    input: [[4,10,10], [1,1,0], 2],
    expected: 24
  },
  {
    input: [[2,6,6,9], [0,0,1,1], 1],
    expected: 17
  },
  {
    input: [[3,8,2,5], [1,0,1,1], 2],
    expected: 16
  },
  {
    input: [[1,2,3,4,5], [1,1,1,1,1], 5],
    expected: 15
  },
  {
    input: [[5,5,5,5,5], [0,0,0,0,0], 3],
    expected: 25
  },
  {
    input: [[1,2,3,4,5,6], [1,0,1,0,1,0], 2],
    expected: 19
  },
  {
    input: [[10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10], [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], 5],
    expected: 50
  },
  {
    input: [[0,0,0,0,0], [1,1,1,1,1], 3],
    expected: 0
  },
  {
    input: [[100,200,300,400,500], [0,0,0,0,0], 1],
    expected: 1500
  },
  {
    input: [[1000], [1], 1],
    expected: 1000
  }
];

/**
 * Finds maximum customers that can be satisfied with the secret technique
 * @param {number[]} customers - Number of customers each minute
 * @param {number[]} grumpy - Whether owner is grumpy each minute (1=grumpy, 0=not grumpy)
 * @param {number} minutes - Duration of secret technique
 * @return {number} Maximum satisfied customers
 */
function maxSatisfied(customers, grumpy, minutes) {
    const n = customers.length;

    // Calculate base satisfaction (when owner is naturally not grumpy)
    let baseSatisfied = 0;
    for (let i = 0; i < n; i++) {
        if (grumpy[i] === 0) {
            baseSatisfied += customers[i];
        }
    }

    // Find the best window to apply the technique
    // Calculate additional customers we can satisfy in first window
    let additionalCustomers = 0;
    for (let i = 0; i < minutes; i++) {
        if (grumpy[i] === 1) {
            additionalCustomers += customers[i];
        }
    }

    let maxAdditional = additionalCustomers;

    // Slide the window to find maximum additional customers
    for (let i = minutes; i < n; i++) {
        // Remove the customer going out of window (if owner was grumpy)
        if (grumpy[i - minutes] === 1) {
            additionalCustomers -= customers[i - minutes];
        }

        // Add the customer coming into window (if owner is grumpy)
        if (grumpy[i] === 1) {
            additionalCustomers += customers[i];
        }

        maxAdditional = Math.max(maxAdditional, additionalCustomers);
    }

    return baseSatisfied + maxAdditional;
}

export default maxSatisfied;