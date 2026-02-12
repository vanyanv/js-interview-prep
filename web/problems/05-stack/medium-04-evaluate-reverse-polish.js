/*
Problem: Evaluate Reverse Polish Notation
Difficulty: Medium
Category: Stack, Array, Math
LeetCode: #150
Pattern: Stack (Expression Evaluation)

Evaluate the value of an arithmetic expression in Reverse Polish Notation.

Valid operators are +, -, *, and /. Each operand may be an integer or another expression.

Note that division between two integers should truncate toward zero.

It is guaranteed that the given RPN expression is always valid. That means the expression
would always evaluate to a result, and there will not be any division by zero operation.

Example 1:
  Input: tokens = ["2","1","+","3","*"]
  Output: 9
  Explanation: ((2 + 1) * 3) = 9

Example 2:
  Input: tokens = ["4","13","5","/","+"]
  Output: 6
  Explanation: (4 + (13 / 5)) = 6

Example 3:
  Input: tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
  Output: 22
  Explanation: ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
  = ((10 * (6 / (12 * -11))) + 17) + 5
  = ((10 * (6 / -132)) + 17) + 5
  = ((10 * 0) + 17) + 5
  = (0 + 17) + 5
  = 17 + 5
  = 22

Example 4:
  Input: tokens = ["3","11","+","5","-"]
  Output: 9

Example 5:
  Input: tokens = ["18"]
  Output: 18

Constraints:
  - 1 <= tokens.length <= 10^4
  - tokens[i] is either an operator: "+", "-", "*", or "/", or an integer in the range [-200, 200].

Time Complexity: O(n)
Space Complexity: O(n) for the stack

Pattern Notes:
  - Stack is perfect for postfix notation evaluation
  - Push operands onto stack
  - For operators: pop two operands, compute, push result
  - Order matters: second_popped operator first_popped
  - Integer division truncates toward zero
  - Final stack contains single element: the result
*/

export const functionName = 'evalRPN';

export const tests = [
  {
    input: [["2","1","+","3","*"]],
    expected: 9
  },
  {
    input: [["4","13","5","/","+"]],
    expected: 6
  },
  {
    input: [["10","6","9","3","+","-11","*","/","*","17","+","5","+"]],
    expected: 22
  },
  {
    input: [["3","11","+","5","-"]],
    expected: 9
  },
  {
    input: [["18"]],
    expected: 18
  },
  {
    input: [["13","5","/"]],
    expected: 2
  },
  {
    input: [["-78","-33","196","+","-19","-","115","*","-","-99","/","-18","8","*","-86","-","-","16","/","26","-14","-","-","47","-","101","-","163","*","143","-","0","*","-","60","+","18","*","/","62","3","/","+"]],
    expected: -165
  },
  {
    input: [["4","-5","/"]],
    expected: 0
  }
];

/**
 * Evaluates expression in Reverse Polish Notation
 * @param {string[]} tokens - Array of tokens (numbers and operators)
 * @return {number} Result of the expression
 */
function evalRPN(tokens) {
    const stack = [];
    const operators = new Set(['+', '-', '*', '/']);

    for (let token of tokens) {
        if (operators.has(token)) {
            // Pop two operands (order matters!)
            const b = stack.pop();
            const a = stack.pop();

            let result;
            switch (token) {
                case '+':
                    result = a + b;
                    break;
                case '-':
                    result = a - b;
                    break;
                case '*':
                    result = a * b;
                    break;
                case '/':
                    // Division truncates toward zero
                    result = Math.trunc(a / b);
                    break;
            }

            stack.push(result);
        } else {
            // It's a number, push to stack
            stack.push(parseInt(token));
        }
    }

    // Stack should contain exactly one element: the result
    return stack[0];
}

export default evalRPN;