/*
Problem: Maximum Points You Can Obtain from Cards
Difficulty: Medium
Category: Array, Sliding Window, Prefix Sum
LeetCode: #1423
Pattern: Fixed Window Sliding Window

There are several cards arranged in a row, and each card has an associated number of points. The points are given in the integer array cardPoints.

In one step, you can take one card from the beginning or from the end of the row. You have to take exactly k cards.

Your score is the sum of the points of the cards you have taken.

Given the integer array cardPoints and the integer k, return the maximum score you can obtain.

Example 1:
  Input: cardPoints = [1,2,3,4,5,6,1], k = 3
  Output: 12
  Explanation: After the first step, your score will always be 1. However, choosing the rightmost card first will maximize your total score. The optimal strategy is to take the three cards on the right, giving a final score of 1 + 6 + 5 = 12.

Example 2:
  Input: cardPoints = [2,2,2], k = 2
  Output: 4
  Explanation: Regardless of which two cards you take, your score will always be 4.

Example 3:
  Input: cardPoints = [9,7,7,9,7,7,9], k = 7
  Output: 55
  Explanation: You have to take all the cards. Your score is the sum of points of all cards.

Example 4:
  Input: cardPoints = [1,1000,1], k = 1
  Output: 1
  Explanation: You cannot take the card in the middle. Your best score is 1.

Constraints:
  - 1 <= cardPoints.length <= 10^5
  - 1 <= cardPoints[i] <= 10^4
  - 1 <= k <= cardPoints.length

Time Complexity: O(k)
Space Complexity: O(1)

Pattern Notes:
  - We can take i cards from left and k-i cards from right (0 <= i <= k)
  - Instead of calculating all combinations, use sliding window approach
  - Calculate prefix sum for first k cards, then slide window by removing from left and adding from right
  - Alternative: Find minimum sum subarray of length n-k, subtract from total
*/

export const functionName = 'maxScore';

export const tests = [
  {
    input: [[1,2,3,4,5,6,1], 3],
    expected: 12
  },
  {
    input: [[2,2,2], 2],
    expected: 4
  },
  {
    input: [[9,7,7,9,7,7,9], 7],
    expected: 55
  },
  {
    input: [[1,1000,1], 1],
    expected: 1
  },
  {
    input: [[1,79,80,1,1,1,200,1], 3],
    expected: 202
  },
  {
    input: [[100], 1],
    expected: 100
  },
  {
    input: [[1,2,3,4,5], 4],
    expected: 14
  },
  {
    input: [[11,49,100,20,86,29,72], 4],
    expected: 232
  }
];

/**
 * Finds maximum score by taking k cards from ends
 * @param {number[]} cardPoints - Points for each card
 * @param {number} k - Number of cards to take
 * @return {number} Maximum possible score
 */
function maxScore(cardPoints, k) {
    const n = cardPoints.length;

    // Take first k cards from left
    let currentScore = 0;
    for (let i = 0; i < k; i++) {
        currentScore += cardPoints[i];
    }

    let maxScore = currentScore;

    // Try all combinations: i cards from left, k-i cards from right
    // We achieve this by removing cards from left and adding cards from right
    for (let i = 1; i <= k; i++) {
        // Remove one card from left (at position k-i)
        currentScore -= cardPoints[k - i];
        // Add one card from right (at position n-i)
        currentScore += cardPoints[n - i];

        maxScore = Math.max(maxScore, currentScore);
    }

    return maxScore;
}

export default maxScore;