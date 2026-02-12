/*
Problem: Asteroid Collision
Difficulty: Medium
Category: Stack, Array, Simulation
LeetCode: #735
Pattern: Stack (Collision Detection)

We are given an array asteroids of integers representing asteroids in a row.

For each asteroid, the absolute value represents its size, and the sign represents
its direction (positive meaning right, negative meaning left). Each asteroid moves
at the same speed.

Find out the state of the asteroids after all collisions. If two asteroids meet,
the smaller one will explode. If both are the same size, both will explode.
Two asteroids moving in the same direction will never meet.

Example 1:
  Input: asteroids = [5,10,-5]
  Output: [5,10]
  Explanation: The 10 and -5 collide resulting in 10. The 5 and 10 never collide.

Example 2:
  Input: asteroids = [8,-8]
  Output: []
  Explanation: The 8 and -8 collide exploding each other.

Example 3:
  Input: asteroids = [10,2,-5]
  Output: [10]
  Explanation: The 2 and -5 collide resulting in -5. The 10 and -5 collide resulting in 10.

Example 4:
  Input: asteroids = [-2,-1,1,2]
  Output: [-2,-1,1,2]
  Explanation: The -2 and -1 are moving left, the 1 and 2 are moving right.
  Since asteroids moving the same direction never meet, no asteroids will meet each other.

Example 5:
  Input: asteroids = [-2,2,-1,-2]
  Output: [-2]

Constraints:
  - 2 <= asteroids.length <= 10^4
  - -1000 <= asteroids[i] <= 1000
  - asteroids[i] != 0

Time Complexity: O(n)
Space Complexity: O(n) for the stack

Pattern Notes:
  - Stack maintains stable asteroids moving right
  - Collision occurs when right-moving asteroid meets left-moving asteroid
  - Only asteroids in stack (right-moving) can collide with current left-moving asteroid
  - Process collisions until current asteroid explodes or all conflicting asteroids are resolved
  - Left-moving asteroids that survive go directly to result
  - Right-moving asteroids always go to stack (potential for future collisions)
*/

export const functionName = 'asteroidCollision';

export const tests = [
  {
    input: [[5,10,-5]],
    expected: [5,10]
  },
  {
    input: [[8,-8]],
    expected: []
  },
  {
    input: [[10,2,-5]],
    expected: [10]
  },
  {
    input: [[-2,-1,1,2]],
    expected: [-2,-1,1,2]
  },
  {
    input: [[-2,2,-1,-2]],
    expected: [-2]
  },
  {
    input: [[1,-1]],
    expected: []
  },
  {
    input: [[-1,1]],
    expected: [-1,1]
  },
  {
    input: [[1,1,-2,-2]],
    expected: [-2,-2]
  }
];

/**
 * Simulates asteroid collisions
 * @param {number[]} asteroids - Array of asteroids with size and direction
 * @return {number[]} Final state after all collisions
 */
function asteroidCollision(asteroids) {
    const stack = [];

    for (let asteroid of asteroids) {
        if (asteroid > 0) {
            // Right-moving asteroid, no immediate collision
            stack.push(asteroid);
        } else {
            // Left-moving asteroid, check for collisions
            let destroyed = false;

            while (stack.length > 0 && stack[stack.length - 1] > 0 && !destroyed) {
                const rightMoving = stack[stack.length - 1];
                const leftMoving = Math.abs(asteroid);

                if (rightMoving < leftMoving) {
                    // Right-moving asteroid explodes
                    stack.pop();
                } else if (rightMoving === leftMoving) {
                    // Both asteroids explode
                    stack.pop();
                    destroyed = true;
                } else {
                    // Left-moving asteroid explodes
                    destroyed = true;
                }
            }

            // If left-moving asteroid survived, add it to result
            if (!destroyed) {
                stack.push(asteroid);
            }
        }
    }

    return stack;
}

export default asteroidCollision;