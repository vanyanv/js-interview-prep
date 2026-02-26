/*
Problem: Grumpy Bookstore Owner
Difficulty: Easy
Category: Array, Sliding Window
LeetCode: #1052
Pattern: Fixed Window Sliding Window

There is a bookstore owner that has a store open for n minutes. Every minute, some number of
customers enter the store. You are given an integer array customers where customers[i] is the
number of customers that enter the store at the start of the ith minute, and an integer array
grumpy where grumpy[i] is 1 if the bookstore owner is grumpy during the ith minute, or 0
otherwise.

When the bookstore owner is grumpy, the customers of that minute are not satisfied, otherwise
they are satisfied.

The bookstore owner knows a secret technique that makes them not grumpy for minutes consecutive
minutes, but can only use it once.

Return the maximum number of customers that can be satisfied throughout the day.

Example 1:
  Input: customers = [1, 0, 1, 2, 1, 1, 7, 5], grumpy = [0, 1, 0, 1, 0, 1, 0, 1], minutes = 3
  Output: 16
  Explanation:
    The bookstore owner keeps themselves not grumpy for the last 3 minutes (index 5,6,7).
    Already satisfied (grumpy=0): customers[0]=1, customers[2]=1, customers[4]=1, customers[6]=7 -> 10
    Extra from technique (grumpy=1 in window [5,6,7]): customers[5]=1, customers[7]=5 -> 6
    (customers[6] is already satisfied since grumpy[6]=0)
    Total = 10 + 6 = 16

Example 2:
  Input: customers = [1], grumpy = [0], minutes = 1
  Output: 1
  Explanation: Owner is not grumpy, so the 1 customer is satisfied.

Example 3:
  Input: customers = [4, 10, 10], grumpy = [1, 1, 0], minutes = 2
  Output: 24
  Explanation:
    Already satisfied (grumpy=0): customers[2]=10 -> 10
    Best window of size 2: [0,1] gains customers[0]=4 + customers[1]=10 = 14
    Total = 10 + 14 = 24

Constraints:
  - n == customers.length == grumpy.length
  - 1 <= minutes <= n <= 2 * 10^4
  - 0 <= customers[i] <= 1000
  - grumpy[i] is either 0 or 1

Time Complexity: O(n)
Space Complexity: O(1)

Pattern Notes:
  - Two-pass approach: first calculate base satisfaction (grumpy=0), then use sliding window
  - The sliding window finds the window of size `minutes` that maximizes extra customers
    gained from grumpy minutes within the window
  - Extra gain for a window = sum of customers[i] where grumpy[i]==1 in that window
  - Final answer = base satisfaction + maximum extra gain
*/

export const functionName = 'maxSatisfied';

export const tests = [
  {
    // Base (grumpy=0): c[0]=1 + c[2]=1 + c[4]=1 + c[6]=7 = 10
    // Windows of size 3 (extra from grumpy=1 slots):
    //   [0,1,2]: c[1]=0 -> 0
    //   [1,2,3]: c[1]=0 + c[3]=2 -> 2
    //   [2,3,4]: c[3]=2 -> 2
    //   [3,4,5]: c[3]=2 + c[5]=1 -> 3
    //   [4,5,6]: c[5]=1 -> 1
    //   [5,6,7]: c[5]=1 + c[7]=5 -> 6
    // Max extra = 6, total = 10 + 6 = 16
    input: [[1, 0, 1, 2, 1, 1, 7, 5], [0, 1, 0, 1, 0, 1, 0, 1], 3],
    expected: 16
  },
  {
    // Base: c[0]=1 (grumpy=0) -> 1, no grumpy minutes -> technique doesn't help
    input: [[1], [0], 1],
    expected: 1
  },
  {
    // Base (grumpy=0): c[2]=10 -> 10
    // Windows of size 2:
    //   [0,1]: c[0]=4 + c[1]=10 = 14 (both grumpy)
    //   [1,2]: c[1]=10 (grumpy=1) -> 10
    // Max extra = 14, total = 10 + 14 = 24
    input: [[4, 10, 10], [1, 1, 0], 2],
    expected: 24
  },
  {
    // All grumpy=0: base = 1+2+3+4+5=15, extra from any window=0 -> 15
    input: [[1, 2, 3, 4, 5], [0, 0, 0, 0, 0], 2],
    expected: 15
  },
  {
    // All grumpy=1: base=0
    // Windows of size 3: [10,10,10]=30, [10,10,10]=30, [10,10,10]=30 -> max extra=30
    // Total = 0 + 30 = 30
    input: [[10, 10, 10, 10, 10], [1, 1, 1, 1, 1], 3],
    expected: 30
  },
  {
    // minutes = array length, so we can suppress all grumpy minutes
    // All grumpy=1: base=0, window covers entire array -> extra = 3+5+2+7 = 17
    input: [[3, 5, 2, 7], [1, 1, 1, 1], 4],
    expected: 17
  },
  {
    // Base (grumpy=0): c[0]=5 + c[3]=3 = 8
    // Windows of size 2 (grumpy=1 slots only):
    //   [0,1]: c[1]=8 -> 8
    //   [1,2]: c[1]=8 + c[2]=2 -> 10
    //   [2,3]: c[2]=2 -> 2
    //   [3,4]: c[4]=1 -> 1
    // Max extra=10, total = 8 + 10 = 18
    input: [[5, 8, 2, 3, 1], [0, 1, 1, 0, 1], 2],
    expected: 18
  },
  {
    // All customers are 0 -> 0
    input: [[0, 0, 0, 0], [1, 0, 1, 0], 2],
    expected: 0
  },
  {
    // Base (grumpy=0): c[1]=2 + c[2]=3 + c[4]=5 = 10
    // Windows of size 1 (only grumpy=1 slots matter):
    //   [0]: c[0]=1 -> 1
    //   [1]: 0 (grumpy=0)
    //   [2]: 0 (grumpy=0)
    //   [3]: c[3]=4 -> 4
    //   [4]: 0 (grumpy=0)
    // Max extra=4, total=10+4=14
    input: [[1, 2, 3, 4, 5], [1, 0, 0, 1, 0], 1],
    expected: 14
  },
  {
    // Base (grumpy=0): c[0]=100 -> 100
    // Window of size 4 covers [0..3] or [1..4]:
    //   [0,1,2,3]: c[1]=200 + c[2]=300 + c[3]=400 = 900 (c[0] is grumpy=0 so not extra)
    //   [1,2,3,4]: c[1]=200 + c[2]=300 + c[3]=400 + c[4]=500 = 1400
    // Max extra=1400, total = 100 + 1400 = 1500
    input: [[100, 200, 300, 400, 500], [0, 1, 1, 1, 1], 4],
    expected: 1500
  },
  {
    // Single element, grumpy: base=0, window=[0] -> extra=c[0]=42 -> total=42
    input: [[42], [1], 1],
    expected: 42
  },
  {
    // Base (grumpy=0): c[0]=1 + c[1]=1 + c[2]=1 + c[3]=1 + c[4]=1 + c[5]=1 = 6
    // No grumpy minutes, all extra = 0 -> total=6
    input: [[1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0], 3],
    expected: 6
  },
];

/**
 * Returns the maximum number of satisfied customers using the secret technique once
 * @param {number[]} customers - Number of customers at each minute
 * @param {number[]} grumpy - 1 if owner is grumpy at that minute, 0 otherwise
 * @param {number} minutes - Duration of the secret technique
 * @return {number} Maximum number of satisfied customers
 */
function maxSatisfied(customers, grumpy, minutes) {
    const n = customers.length;

    // Calculate base satisfaction (customers during non-grumpy minutes)
    let baseSatisfied = 0;
    for (let i = 0; i < n; i++) {
        if (grumpy[i] === 0) {
            baseSatisfied += customers[i];
        }
    }

    // Calculate extra gain from the first window of size `minutes`
    let extraGain = 0;
    for (let i = 0; i < minutes; i++) {
        if (grumpy[i] === 1) {
            extraGain += customers[i];
        }
    }

    let maxExtraGain = extraGain;

    // Slide the window
    for (let i = minutes; i < n; i++) {
        // Add new element entering the window (only if grumpy)
        if (grumpy[i] === 1) {
            extraGain += customers[i];
        }
        // Remove element leaving the window (only if grumpy)
        if (grumpy[i - minutes] === 1) {
            extraGain -= customers[i - minutes];
        }
        maxExtraGain = Math.max(maxExtraGain, extraGain);
    }

    return baseSatisfied + maxExtraGain;
}

export default maxSatisfied;
