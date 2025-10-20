/*
Problem: Valid Parentheses
Difficulty: Easy
Category: Stack, String
LeetCode: #20
Pattern: Stack (Matching Pairs)

Given a string s containing just the characters '(', ')', '{', '}', '[' and ']',
determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

Example 1:
  Input: s = "()"
  Output: true

Example 2:
  Input: s = "()[]{}"
  Output: true

Example 3:
  Input: s = "(]"
  Output: false

Example 4:
  Input: s = "([)]"
  Output: false

Example 5:
  Input: s = "{[]}"
  Output: true

Constraints:
  - 1 <= s.length <= 10^4
  - s consists of parentheses only '()[]{}'.

Time Complexity: O(n)
Space Complexity: O(n) for the stack

Pattern Notes:
  - Use stack to track opening brackets
  - Push opening brackets onto stack
  - For closing brackets, check if they match the most recent opening bracket
  - Stack should be empty at the end for valid string
  - LIFO nature of stack perfectly matches bracket matching problem
*/

export const functionName = 'isValid';

export const tests = [
  {
    input: ["()"],
    expected: true
  },
  {
    input: ["()[]{]"],
    expected: true
  },
  {
    input: ["(]"],
    expected: false
  },
  {
    input: ["([)]"],
    expected: false
  },
  {
    input: ["{[]}"],
    expected: true
  },
  {
    input: [""],
    expected: true
  },
  {
    input: ["((("],
    expected: false
  },
  {
    input: ["))"],
    expected: false
  }
];

/**
 * Determines if parentheses are valid
 * @param {string} s - String containing only parentheses
 * @return {boolean} True if valid, false otherwise
 */
function isValid(s) {
    const stack = [];
    const pairs = {
        ')': '(',
        '}': '{',
        ']': '['
    };

    for (let char of s) {
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);
        } else if (char === ')' || char === '}' || char === ']') {
            if (stack.length === 0 || stack.pop() !== pairs[char]) {
                return false;
            }
        }
    }

    return stack.length === 0;
}

export default isValid;