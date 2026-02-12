/*
Problem: Validate Stack Sequences
Difficulty: Medium
Category: Stack, Array, Simulation
LeetCode: #946
Pattern: Stack (Sequence Validation)

Given two integer arrays pushed and popped each with distinct values,
return true if this could have been the result of a sequence of push and pop
operations on an initially empty stack, or false otherwise.

Example 1:
  Input: pushed = [1,2,3,4,5], popped = [4,5,3,2,1]
  Output: true
  Explanation: We might do the following sequence:
  push(1), push(2), push(3), push(4), pop() -> 4,
  push(5), pop() -> 5, pop() -> 3, pop() -> 2, pop() -> 1

Example 2:
  Input: pushed = [1,2,3,4,5], popped = [4,3,5,1,2]
  Output: false
  Explanation: 1 cannot be popped before 2.

Example 3:
  Input: pushed = [1,2], popped = [1,2]
  Output: true

Example 4:
  Input: pushed = [1,2], popped = [2,1]
  Output: true

Example 5:
  Input: pushed = [0], popped = [0]
  Output: true

Constraints:
  - 1 <= pushed.length <= 1000
  - 0 <= pushed[i] <= 1000
  - All the elements of pushed are unique.
  - popped.length == pushed.length
  - popped is a permutation of pushed.

Time Complexity: O(n)
Space Complexity: O(n) for the stack

Pattern Notes:
  - Simulate the stack operations with actual stack
  - Process pushed array, pushing elements to stack
  - After each push, try to pop matching elements from popped array
  - If we can match all popped elements, sequences are valid
  - Stack should be empty at the end for valid sequences
  - This pattern validates whether a sequence could be produced by stack operations
*/

export const functionName = 'validateStackSequences';

export const tests = [
  {
    input: [[1,2,3,4,5], [4,5,3,2,1]],
    expected: true
  },
  {
    input: [[1,2,3,4,5], [4,3,5,1,2]],
    expected: false
  },
  {
    input: [[1,2], [1,2]],
    expected: true
  },
  {
    input: [[1,2], [2,1]],
    expected: true
  },
  {
    input: [[0], [0]],
    expected: true
  },
  {
    input: [[1,0], [1,0]],
    expected: true
  },
  {
    input: [[1,0,2], [2,1,0]],
    expected: false
  },
  {
    input: [[2,1,0], [0,1,2]],
    expected: true
  }
];

/**
 * Validates if popped sequence can be produced from pushed sequence using stack
 * @param {number[]} pushed - Array of pushed elements
 * @param {number[]} popped - Array of popped elements
 * @return {boolean} True if sequences are valid
 */
function validateStackSequences(pushed, popped) {
    const stack = [];
    let popIndex = 0;

    for (let num of pushed) {
        // Push current number
        stack.push(num);

        // Try to pop as many elements as possible
        while (stack.length > 0 &&
               popIndex < popped.length &&
               stack[stack.length - 1] === popped[popIndex]) {
            stack.pop();
            popIndex++;
        }
    }

    // Valid if we've matched all elements in popped array
    // (which means stack should be empty)
    return popIndex === popped.length;
}

export default validateStackSequences;