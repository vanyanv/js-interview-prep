/*
Problem: Basic Calculator
Difficulty: Hard
Category: Stack, String, Math
LeetCode: #224
Pattern: Stack (Expression Parsing with Parentheses)

Given a string s representing a valid expression, implement a basic calculator to evaluate it,
and return the result of the evaluation.

Note: You are not allowed to use any built-in function which evaluates strings as mathematical expressions, such as eval().

Example 1:
  Input: s = "1 + 1"
  Output: 2

Example 2:
  Input: s = " 2-1 + 2 "
  Output: 3

Example 3:
  Input: s = "(1+(4+5+2)-3)+(6+8)"
  Output: 23

Example 4:
  Input: s = "2147483647"
  Output: 2147483647

Example 5:
  Input: s = "- (3 + (4 + 5))"
  Output: -12

Constraints:
  - 1 <= s.length <= 3 * 10^5
  - s consists of digits, '+', '-', '(', ')', and ' '.
  - s represents a valid expression.
  - '+' is not used as a unary operation (i.e., "+1" and "+(2 + 3)" is invalid).
  - '-' could be used as a unary operation (i.e., "-1" and "-(2 + 3)" is valid).
  - There will be no two consecutive operators in the input.
  - Every number and running calculation will fit in a signed 32-bit integer.

Time Complexity: O(n)
Space Complexity: O(n) for the stack

Pattern Notes:
  - Stack handles nested parentheses and maintains state
  - Track current result and sign for each level
  - When '(': push current state to stack, reset for new level
  - When ')': pop previous state, apply to current result
  - Handle spaces, multi-digit numbers, and unary minus
  - Each stack entry stores (previous_result, previous_sign)
*/

export const functionName = 'calculate';

export const tests = [
  {
    input: ["1 + 1"],
    expected: 2
  },
  {
    input: [" 2-1 + 2 "],
    expected: 3
  },
  {
    input: ["(1+(4+5+2)-3)+(6+8)"],
    expected: 23
  },
  {
    input: ["2147483647"],
    expected: 2147483647
  },
  {
    input: ["- (3 + (4 + 5))"],
    expected: -12
  },
  {
    input: ["1-(     -2)"],
    expected: 3
  },
  {
    input: ["(2)"],
    expected: 2
  },
  {
    input: ["0"],
    expected: 0
  }
];

/**
 * Evaluates basic mathematical expression with parentheses
 * @param {string} s - Mathematical expression string
 * @return {number} Result of the expression
 */
function calculate(s) {
    const stack = [];
    let result = 0;
    let sign = 1; // 1 for positive, -1 for negative
    let num = 0;

    for (let i = 0; i < s.length; i++) {
        const char = s[i];

        if (char >= '0' && char <= '9') {
            // Build multi-digit number
            num = num * 10 + parseInt(char);
        } else if (char === '+') {
            // Apply previous number with its sign
            result += sign * num;
            sign = 1;
            num = 0;
        } else if (char === '-') {
            // Apply previous number with its sign
            result += sign * num;
            sign = -1;
            num = 0;
        } else if (char === '(') {
            // Start new level: push current state
            stack.push(result);
            stack.push(sign);
            // Reset for new parentheses level
            result = 0;
            sign = 1;
        } else if (char === ')') {
            // End current level: apply current number
            result += sign * num;
            num = 0;

            // Pop previous state
            const prevSign = stack.pop();
            const prevResult = stack.pop();

            // Apply current result to previous level
            result = prevResult + prevSign * result;
        }
        // Ignore spaces
    }

    // Apply the last number
    result += sign * num;
    return result;
}

export default calculate;