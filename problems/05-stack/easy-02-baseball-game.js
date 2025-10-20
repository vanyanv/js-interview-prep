/*
Problem: Baseball Game
Difficulty: Easy
Category: Stack, Array, Simulation
LeetCode: #682
Pattern: Stack (Operation History)

You are keeping the scores for a baseball game with strange rules.
At the beginning of the game, you start with an empty record.

You are given a list of strings operations, where operations[i] is the ith
operation you must apply to the record and is one of the following:

- An integer x: Record a new score of x.
- '+': Record a new score that is the sum of the previous two scores.
- 'D': Record a new score that is double the previous score.
- 'C': Cancel the previous score, removing it from the record.

Return the sum of all the scores on the record after applying all operations.

Example 1:
  Input: ops = ["5","2","C","D","+"]
  Output: 30
  Explanation:
  "5" - Add 5 to the record, record is now [5].
  "2" - Add 2 to the record, record is now [5, 2].
  "C" - Invalidate and remove the previous score, record is now [5].
  "D" - Add 2 * 5 = 10 to the record, record is now [5, 10].
  "+" - Add 5 + 10 = 15 to the record, record is now [5, 10, 15].
  The total sum is 5 + 10 + 15 = 30.

Example 2:
  Input: ops = ["5","-2","4","C","D","9","+","+"]
  Output: 27
  Explanation:
  "5" - Add 5 to the record, record is now [5].
  "-2" - Add -2 to the record, record is now [5, -2].
  "4" - Add 4 to the record, record is now [5, -2, 4].
  "C" - Invalidate and remove the previous score, record is now [5, -2].
  "D" - Add 2 * -2 = -4 to the record, record is now [5, -2, -4].
  "9" - Add 9 to the record, record is now [5, -2, -4, 9].
  "+" - Add -4 + 9 = 5 to the record, record is now [5, -2, -4, 9, 5].
  "+" - Add 9 + 5 = 14 to the record, record is now [5, -2, -4, 9, 5, 14].
  The total sum is 5 + -2 + -4 + 9 + 5 + 14 = 27.

Example 3:
  Input: ops = ["1","C"]
  Output: 0
  Explanation:
  "1" - Add 1 to the record, record is now [1].
  "C" - Invalidate and remove the previous score, record is now [].
  Since the record is empty, the total sum is 0.

Constraints:
  - 1 <= operations.length <= 1000
  - operations[i] is "C", "D", "+", or a string representing an integer.
  - For operation "+", there will always be at least two previous scores on the record.
  - For operations "C" and "D", there will always be at least one previous score on the record.

Time Complexity: O(n)
Space Complexity: O(n) for the stack

Pattern Notes:
  - Stack maintains score history
  - Operations need access to most recent scores (LIFO perfect for this)
  - 'C' operation demonstrates classic stack pop
  - '+' and 'D' operations need to peek at recent values
  - Stack size varies as operations are applied
*/

export const functionName = 'calPoints';

export const tests = [
  {
    input: [["5","2","C","D","+"]],
    expected: 30
  },
  {
    input: [["5","-2","4","C","D","9","+","+"]],
    expected: 27
  },
  {
    input: [["1","C"]],
    expected: 0
  },
  {
    input: [["1"]],
    expected: 1
  },
  {
    input: [["1","2","+","C"]],
    expected: 3
  },
  {
    input: [["10","20","30","C","D","+"]],
    expected: 90
  },
  {
    input: [["5","C","2","D","+"]],
    expected: 10
  },
  {
    input: [["36","28","70","65","C","+","33","-46","84","C"]],
    expected: 257
  }
];

/**
 * Calculates final score after baseball game operations
 * @param {string[]} operations - Array of operations
 * @return {number} Sum of all scores on record
 */
function calPoints(operations) {
    const stack = [];

    for (let op of operations) {
        if (op === 'C') {
            // Cancel previous score
            stack.pop();
        } else if (op === 'D') {
            // Double the previous score
            stack.push(2 * stack[stack.length - 1]);
        } else if (op === '+') {
            // Sum of previous two scores
            const len = stack.length;
            stack.push(stack[len - 1] + stack[len - 2]);
        } else {
            // It's a number, add to record
            stack.push(parseInt(op));
        }
    }

    // Sum all scores in the stack
    return stack.reduce((sum, score) => sum + score, 0);
}

export default calPoints;