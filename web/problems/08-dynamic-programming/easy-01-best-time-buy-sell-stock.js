/*
Problem: Best Time to Buy and Sell Stock (LeetCode #121)
Difficulty: Easy
Category: Dynamic Programming
Pattern: 1D DP, Kadane's Algorithm Variant

You are given an array prices where prices[i] is the price of a given stock on the ith day.
You want to maximize your profit by choosing a single day to buy one stock and choosing
a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

Example 1:
  Input: prices = [7,1,5,3,6,4]
  Output: 5
  Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.

Example 2:
  Input: prices = [7,6,4,3,1]
  Output: 0
  Explanation: In this case, no transactions are done and the max profit = 0.

Example 3:
  Input: prices = [1,2,3,4,5]
  Output: 4
  Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.

Example 4:
  Input: prices = [2,4,1]
  Output: 2
  Explanation: Buy on day 1 (price = 2) and sell on day 2 (price = 4), profit = 4-2 = 2.

Example 5:
  Input: prices = [3,2,6,5,0,3]
  Output: 4
  Explanation: Buy on day 2 (price = 2) and sell on day 3 (price = 6), profit = 6-2 = 4.

Constraints:
  - 1 <= prices.length <= 10^5
  - 0 <= prices[i] <= 10^4

Time Complexity: O(n) where n is the length of prices array
Space Complexity: O(1) - only tracking minimum price and maximum profit

Dynamic Programming Pattern Notes:
  - State tracking: keep track of minimum price seen so far and maximum profit
  - At each day, we can either buy (if it's the lowest price) or sell (for maximum profit)
  - Key insight: to maximize profit, buy at the lowest price before selling
  - This is similar to Kadane's algorithm for maximum subarray
  - Greedy approach: always track the minimum buying price and maximum profit possible
  - One-pass algorithm with constant space

Hints:
  - You need to buy before you sell, so track the minimum price seen so far
  - For each day, calculate profit if you sold on that day (current price - min price so far)
  - Keep track of the maximum profit seen so far
  - Think about this as finding the maximum difference between two elements where the larger element comes after the smaller one
  - This is essentially finding the maximum subarray sum in the array of daily price differences
  - Single pass solution: track minPrice and maxProfit simultaneously
*/

export const functionName = 'maxProfit';

export const tests = [
  {
    input: [[7,1,5,3,6,4]],
    expected: 5
  },
  {
    input: [[7,6,4,3,1]],
    expected: 0
  },
  {
    input: [[1,2,3,4,5]],
    expected: 4
  },
  {
    input: [[2,4,1]],
    expected: 2
  },
  {
    input: [[3,2,6,5,0,3]],
    expected: 4
  },
  {
    input: [[1]],
    expected: 0
  },
  {
    input: [[2,1,2,1,0,1,2]],
    expected: 2
  },
  {
    input: [[3,3,5,0,0,3,1,4]],
    expected: 4
  },
  {
    input: [[5,5,5,5,5]],
    expected: 0
  },
  {
    input: [[1,2]],
    expected: 1
  },
  {
    input: [[2,1]],
    expected: 0
  },
  {
    input: [[10,8,6,4,2,0]],
    expected: 0
  },
  {
    input: [[3,1,4,1,5,9,2,6,5,3,5,8,9,7,9,3,2,3,8,4,6,2,6,4,3,3,8,3,2,7,9]],
    expected: 8
  }
];

/**
 * Find maximum profit from buying and selling stock once
 * @param {number[]} prices - Array of stock prices by day
 * @return {number} Maximum profit achievable
 */
function maxProfit(prices) {
    if (!prices || prices.length < 2) return 0;

    let minPrice = prices[0];  // Minimum price seen so far (best buying opportunity)
    let maxProfit = 0;         // Maximum profit achievable so far

    for (let i = 1; i < prices.length; i++) {
        // Calculate profit if we sell today
        const currentProfit = prices[i] - minPrice;

        // Update maximum profit if current profit is better
        maxProfit = Math.max(maxProfit, currentProfit);

        // Update minimum price if today's price is lower (better buying opportunity)
        minPrice = Math.min(minPrice, prices[i]);
    }

    return maxProfit;
}

export default maxProfit;