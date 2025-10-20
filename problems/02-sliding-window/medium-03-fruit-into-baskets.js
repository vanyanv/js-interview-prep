/*
Problem: Fruit Into Baskets
Difficulty: Medium
Category: Array, Hash Table, Sliding Window
LeetCode: #904
Pattern: Variable Window Sliding Window

You are visiting a farm that has a single row of fruit trees arranged from left to right. The trees are represented by an integer array fruits where fruits[i] is the type of fruit the ith tree produces.

You want to collect as much fruit as possible. However, the owner has some strict rules that you must follow:

- You only have two baskets, and each basket can only hold a single type of fruit. There is no limit on the amount of fruit each basket can hold.
- Starting from any tree of your choice, you must pick exactly one fruit from every tree (including the start tree) while moving to the right. The picked fruits must fit in one of your baskets.
- Once you reach a tree with fruit that cannot fit in your baskets, you must stop.

Given the integer array fruits, return the maximum number of fruits you can pick.

Example 1:
  Input: fruits = [1,2,1]
  Output: 3
  Explanation: We can pick from all 3 trees.

Example 2:
  Input: fruits = [0,1,2,2]
  Output: 3
  Explanation: We can pick from trees [1,2,2]. If we had started at the first tree, we would only pick from trees [0,1].

Example 3:
  Input: fruits = [1,2,3,2,2]
  Output: 4
  Explanation: We can pick from trees [2,3,2,2]. If we had started at the first tree, we would only pick from trees [1,2].

Example 4:
  Input: fruits = [3,3,3,1,2,1,1,2,3,3,4]
  Output: 5
  Explanation: We can pick from trees [1,2,1,1,2].

Constraints:
  - 1 <= fruits.length <= 10^5
  - 0 <= fruits[i] < fruits.length

Time Complexity: O(n)
Space Complexity: O(1) since at most 3 distinct fruits in map

Pattern Notes:
  - This is equivalent to "longest subarray with at most 2 distinct elements"
  - Use variable window sliding window with at most 2 distinct fruit types
  - Expand window by moving right pointer
  - When more than 2 fruit types, shrink window from left
  - Track maximum window size that contains at most 2 distinct fruits
*/

export const functionName = 'totalFruit';

export const tests = [
  {
    input: [[1,2,1]],
    expected: 3
  },
  {
    input: [[0,1,2,2]],
    expected: 3
  },
  {
    input: [[1,2,3,2,2]],
    expected: 4
  },
  {
    input: [[3,3,3,1,2,1,1,2,3,3,4]],
    expected: 5
  },
  {
    input: [[1,1,1,1]],
    expected: 4
  },
  {
    input: [[1,2,3,4,5]],
    expected: 2
  },
  {
    input: [[1]],
    expected: 1
  },
  {
    input: [[1,0,1,4,1,4,1,2,3]],
    expected: 5
  }
];

/**
 * Finds maximum fruits that can be collected with 2 baskets
 * @param {number[]} fruits - Array representing fruit types
 * @return {number} Maximum number of fruits that can be collected
 */
function totalFruit(fruits) {
    const fruitCount = new Map();
    let left = 0;
    let maxFruits = 0;

    for (let right = 0; right < fruits.length; right++) {
        const currentFruit = fruits[right];

        // Add current fruit to basket
        fruitCount.set(currentFruit, (fruitCount.get(currentFruit) || 0) + 1);

        // If we have more than 2 types of fruits, shrink window
        while (fruitCount.size > 2) {
            const leftFruit = fruits[left];
            fruitCount.set(leftFruit, fruitCount.get(leftFruit) - 1);

            // Remove fruit type if count becomes 0
            if (fruitCount.get(leftFruit) === 0) {
                fruitCount.delete(leftFruit);
            }

            left++;
        }

        // Update maximum fruits collected
        maxFruits = Math.max(maxFruits, right - left + 1);
    }

    return maxFruits;
}

export default totalFruit;