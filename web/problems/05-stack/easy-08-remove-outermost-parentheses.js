/*
Problem: Remove Outermost Parentheses
Difficulty: Easy
Category: Stack, String
LeetCode: #1021
Pattern: Stack (Balance Tracking)

A valid parentheses string is either empty "", "(" + A + ")", or A + B,
where A and B are valid parentheses strings, and + represents string concatenation.

For example, "", "()", "(())()", and "(()(()))" are all valid parentheses strings.

A valid parentheses string s is primitive if it cannot be written as A + B
where A and B are both nonempty valid parentheses strings.

Given a valid parentheses string s, consider its primitive decomposition:
s = P1 + P2 + ... + Pk, where each Pi is a primitive valid parentheses string.

Return s after removing the outermost parentheses of every primitive string
in the primitive decomposition of s.

Example 1:
  Input: s = "(()())(())"
  Output: "()()()"
  Explanation:
  The input string is "(()())(())", with primitive decomposition "(()())" + "(())".
  After removing outer parentheses of each part, this is "()()" + "()" = "()()()".

Example 2:
  Input: s = "(()())(())(()(()))"
  Output: "()()()()(())"
  Explanation:
  The input string is "(()())(())(()(()))", with primitive decomposition "(()())" + "(())" + "(()(()))".
  After removing outer parentheses of each part, this is "()()" + "()" + "()(())" = "()()()()(())".

Example 3:
  Input: s = "()()"
  Output: ""
  Explanation:
  The input string is "()()", with primitive decomposition "()" + "()".
  After removing outer parentheses of each part, this is "" + "" = "".

Constraints:
  - 1 <= s.length <= 10^5
  - s[i] is either '(' or ')'.
  - s is a valid parentheses string.

Time Complexity: O(n)
Space Complexity: O(n) for result string

Pattern Notes:
  - Track balance to identify primitive components
  - When balance becomes 0, we've completed a primitive string
  - Skip the first '(' and last ')' of each primitive string
  - Use counter instead of stack for efficiency
  - Balance tracking pattern is common in parentheses problems
*/

export const functionName = 'removeOuterParentheses';

export const tests = [
  {
    input: ["(()())(())"],
    expected: "()()()"
  },
  {
    input: ["(()())(())(()(()))"],
    expected: "()()()()(())"
  },
  {
    input: ["()()"],
    expected: ""
  },
  {
    input: ["((()))"],
    expected: "(())"
  },
  {
    input: ["()"],
    expected: ""
  },
  {
    input: ["(())(())"],
    expected: "()()"
  },
  {
    input: ["((()()))"],
    expected: "(()())"
  },
  {
    input: ["()(())"],
    expected: "()"
  }
];

/**
 * Removes outermost parentheses from primitive parentheses strings
 * @param {string} s - Valid parentheses string
 * @return {string} String with outer parentheses removed
 */
function removeOuterParentheses(s) {
    let result = '';
    let balance = 0;

    for (let char of s) {
        if (char === '(') {
            // Only add '(' if it's not the outermost opening parenthesis
            if (balance > 0) {
                result += char;
            }
            balance++;
        } else { // char === ')'
            balance--;
            // Only add ')' if it's not the outermost closing parenthesis
            if (balance > 0) {
                result += char;
            }
        }
    }

    return result;
}

export default removeOuterParentheses;