/*
Problem: Koko Eating Bananas
Difficulty: Medium
Category: Binary Search, Array
LeetCode: #875
Pattern: Binary Search on Answer Space

Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas.
The guards have gone and will come back in h hours.

Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile
of bananas and eats k bananas from that pile. If the pile has less than k bananas,
she eats all of them for that hour and will not eat any more bananas during that hour.

Koko likes to eat slowly but still wants to finish eating all the bananas before the guards come back.

Return the minimum integer k such that she can eat all the bananas within h hours.

Example 1:
  Input: piles = [3,6,7,11], h = 8
  Output: 4
  Explanation: With speed 4, she can eat all bananas in 1+2+2+3 = 8 hours

Example 2:
  Input: piles = [30,11,23,4,20], h = 5
  Output: 30
  Explanation: With speed 30, she can eat all bananas in 1+1+1+1+1 = 5 hours

Example 3:
  Input: piles = [30,11,23,4,20], h = 6
  Output: 23
  Explanation: With speed 23, she can eat all bananas in 2+1+1+1+1 = 6 hours

Example 4:
  Input: piles = [1,1,1,1], h = 4
  Output: 1
  Explanation: With speed 1, she can eat all bananas in 1+1+1+1 = 4 hours

Example 5:
  Input: piles = [805306368,805306368,805306368], h = 1000000000
  Output: 3
  Explanation: Large numbers test case

Constraints:
  - 1 <= piles.length <= 10^4
  - piles.length <= h <= 10^9
  - 1 <= piles[i] <= 10^9

Time Complexity: O(n * log(max(piles))) where n is the number of piles
Space Complexity: O(1)

Pattern Notes:
  - Binary search on the eating speed k
  - Minimum possible speed is 1, maximum is max(piles)
  - For each speed k, calculate total hours needed
  - Hours for pile i = Math.ceil(piles[i] / k)
  - If total hours <= h, try smaller speed (right = mid)
  - If total hours > h, need faster speed (left = mid + 1)
  - Use while (left < right) to find minimum valid speed
*/

export const functionName = 'minEatingSpeed';

export const tests = [
  {
    input: [[3,6,7,11], 8],
    expected: 4
  },
  {
    input: [[30,11,23,4,20], 5],
    expected: 30
  },
  {
    input: [[30,11,23,4,20], 6],
    expected: 23
  },
  {
    input: [[1,1,1,1], 4],
    expected: 1
  },
  {
    input: [[805306368,805306368,805306368], 1000000000],
    expected: 3
  },
  {
    input: [[3,6,7,11], 4],
    expected: 11
  },
  {
    input: [[1], 1],
    expected: 1
  },
  {
    input: [[1000000000], 2],
    expected: 500000000
  }
];

/**
 * Calculate total hours needed to eat all bananas at given speed
 * @param {number[]} piles - Array of banana piles
 * @param {number} speed - Eating speed (bananas per hour)
 * @return {number} Total hours needed
 */
function calculateHours(piles, speed) {
    let totalHours = 0;
    for (const pile of piles) {
        totalHours += Math.ceil(pile / speed);
    }
    return totalHours;
}

/**
 * Find minimum eating speed to finish all bananas within h hours
 * @param {number[]} piles - Array of banana piles
 * @param {number} h - Maximum hours available
 * @return {number} Minimum eating speed
 */
function minEatingSpeed(piles, h) {
    let left = 1;
    let right = Math.max(...piles);

    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        const hoursNeeded = calculateHours(piles, mid);

        if (hoursNeeded <= h) {
            // Can finish in time with this speed, try slower
            right = mid;
        } else {
            // Cannot finish in time, need faster speed
            left = mid + 1;
        }
    }

    return left;
}

export default minEatingSpeed;