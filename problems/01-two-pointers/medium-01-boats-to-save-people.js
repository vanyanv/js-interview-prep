/*
Problem: Boats to Save People
Difficulty: Medium
Category: Array, Two Pointers, Greedy
LeetCode: #881
Pattern: Two Pointers (Opposite Direction - Greedy)

You are given an array people where people[i] is the weight of the ith person,
and an infinite number of boats where each boat can carry a maximum weight of limit.
Each boat carries at most two people at the same time, provided the sum of the
weight of those people is at most limit.

Return the minimum number of boats to carry every given person.

Example 1:
  Input: people = [1,2], limit = 3
  Output: 1
  Explanation: 1 boat (1, 2)

Example 2:
  Input: people = [3,2,2,1], limit = 3
  Output: 3
  Explanation: 3 boats (1, 2), (2) and (3)

Example 3:
  Input: people = [3,5,3,4], limit = 5
  Output: 4
  Explanation: 4 boats (3), (3), (4), (5)

Example 4:
  Input: people = [5,1,4,2], limit = 6
  Output: 2
  Explanation: 2 boats (1, 5), (2, 4)

Constraints:
  - 1 <= people.length <= 5 * 10^4
  - 1 <= people[i] <= limit <= 3 * 10^4

Time Complexity: O(n log n) due to sorting
Space Complexity: O(1)

Pattern Notes:
  - Sort people by weight first
  - Use two pointers: lightest and heaviest person
  - If both can fit together, take both (move both pointers)
  - Otherwise, take only the heaviest person (move right pointer)
  - Always increment boat count
  - Greedy approach: always try to pair lightest with heaviest
*/

export const functionName = 'numRescueBoats';

export const tests = [
  {
    input: [[1,2], 3],
    expected: 1
  },
  {
    input: [[3,2,2,1], 3],
    expected: 3
  },
  {
    input: [[3,5,3,4], 5],
    expected: 4
  },
  {
    input: [[5,1,4,2], 6],
    expected: 2
  },
  {
    input: [[1], 2],
    expected: 1
  },
  {
    input: [[10,10,10,10], 10],
    expected: 4
  },
  {
    input: [[1,2,2,3,3], 3],
    expected: 4
  },
  {
    input: [[44,10,29,12,49,41,23,5,17,26], 50],
    expected: 6
  }
];

/**
 * Calculates minimum number of boats needed to rescue all people
 * @param {number[]} people - Array of people's weights
 * @param {number} limit - Maximum weight capacity per boat
 * @return {number} Minimum number of boats needed
 */
function numRescueBoats(people, limit) {
    // Sort people by weight
    people.sort((a, b) => a - b);

    let left = 0;                    // Lightest person
    let right = people.length - 1;   // Heaviest person
    let boats = 0;

    while (left <= right) {
        // Check if both lightest and heaviest can fit together
        if (people[left] + people[right] <= limit) {
            // Both can fit, move left pointer (take lightest person too)
            left++;
        }

        // Always take the heaviest person (move right pointer)
        right--;

        // Increment boat count (we use one boat per iteration)
        boats++;
    }

    return boats;
}

export default numRescueBoats;