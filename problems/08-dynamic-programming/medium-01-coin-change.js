/*
Problem: Coin Change (LeetCode #322)
Difficulty: Medium
Category: Dynamic Programming
Pattern: 1D DP, Unbounded Knapsack

You are given an integer array coins representing coins of different denominations and an integer
amount representing a total amount of money. Return the fewest number of coins that you need to
make up that amount. If that amount of money cannot be made up by any combination of the coins,
return -1.

You may assume that you have an infinite number of each kind of coin.

Example 1:
  Input: coins = [1,3,4], amount = 6
  Output: 2
  Explanation: 6 = 3 + 3

Example 2:
  Input: coins = [2], amount = 3
  Output: -1
  Explanation: Cannot make amount 3 with only coins of denomination 2

Example 3:
  Input: coins = [1], amount = 0
  Output: 0
  Explanation: No coins needed to make amount 0

Example 4:
  Input: coins = [1,2,5], amount = 11
  Output: 3
  Explanation: 11 = 5 + 5 + 1

Example 5:
  Input: coins = [2,3,5], amount = 9
  Output: 3
  Explanation: 9 = 3 + 3 + 3

Constraints:
  - 1 <= coins.length <= 12
  - 1 <= coins[i] <= 2^31 - 1
  - 0 <= amount <= 10^4

Time Complexity: O(amount * coins.length) - we fill dp array of size amount+1, for each position we check all coins
Space Complexity: O(amount) for the dp array

Dynamic Programming Pattern Notes:
  - State: dp[i] represents minimum coins needed to make amount i
  - Recurrence: dp[i] = min(dp[i], dp[i - coin] + 1) for each coin where coin <= i
  - Base case: dp[0] = 0 (zero coins needed to make amount 0)
  - Initialize: dp[i] = amount + 1 (impossible value, larger than any valid answer)
  - This is an unbounded knapsack variation where we can use each coin unlimited times
  - Bottom-up approach builds solution from smaller amounts to target amount

Hints:
  - Think about building up the solution from amount 0 to target amount
  - For each amount, try using each coin and see which gives minimum coins
  - If we use a coin of value c to make amount i, we need dp[i-c] + 1 total coins
  - Initialize dp array with a value larger than any possible answer
  - Remember to check if a solution exists (dp[amount] should not be the initial impossible value)
  - This is similar to finding shortest path where each coin represents an edge with weight 1
*/

export const functionName = 'coinChange';

export const tests = [
  {
    input: [[1,3,4], 6],
    expected: 2
  },
  {
    input: [[2], 3],
    expected: -1
  },
  {
    input: [[1], 0],
    expected: 0
  },
  {
    input: [[1,2,5], 11],
    expected: 3
  },
  {
    input: [[2,3,5], 9],
    expected: 3
  },
  {
    input: [[1,3,4], 1],
    expected: 1
  },
  {
    input: [[2,3,5], 1],
    expected: -1
  },
  {
    input: [[1,2,3], 4],
    expected: 2
  }
];

/**
 * Find the minimum number of coins needed to make up the given amount
 * @param {number[]} coins - Array of coin denominations
 * @param {number} amount - Target amount to make
 * @return {number} Minimum number of coins needed, or -1 if impossible
 */
function coinChange(coins, amount) {
    if (amount === 0) return 0;
    if (!coins || coins.length === 0) return -1;

    // dp[i] represents minimum coins needed to make amount i
    // Initialize with amount + 1 (impossible value, since we need at most amount coins of denomination 1)
    const dp = new Array(amount + 1).fill(amount + 1);
    dp[0] = 0; // Base case: 0 coins needed to make amount 0

    // For each amount from 1 to target amount
    for (let i = 1; i <= amount; i++) {
        // Try each coin
        for (const coin of coins) {
            // If coin value is not greater than current amount
            if (coin <= i) {
                // Update minimum coins: either keep current value or use this coin + optimal solution for (i - coin)
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }

    // If dp[amount] is still the impossible value, no solution exists
    return dp[amount] > amount ? -1 : dp[amount];
}

export default coinChange;