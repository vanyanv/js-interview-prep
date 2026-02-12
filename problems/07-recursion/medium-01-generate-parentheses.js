/*
Problem: Generate Parentheses
Difficulty: Medium
Category: Recursion, String, Backtracking
LeetCode: #22
Pattern: Backtracking Recursion

Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

Example 1:
  Input: n = 3
  Output: ["((()))","(()())","(())()","()(())","()()()"]
  Explanation: All valid combinations with 3 pairs

Example 2:
  Input: n = 1
  Output: ["()"]
  Explanation: Only one valid combination with 1 pair

Example 3:
  Input: n = 2
  Output: ["(())","()()"]
  Explanation: Two valid combinations with 2 pairs

Example 4:
  Input: n = 0
  Output: [""]
  Explanation: Empty string for 0 pairs

Constraints:
  - 1 <= n <= 8

Time Complexity: O(4^n / √n) - Catalan number growth
Space Complexity: O(4^n / √n) for result storage + O(n) for recursion stack

Recursion Pattern Notes:
  - Base case: when we've used all n pairs, add current string to result
  - Recursive case: try adding '(' or ')' if valid
  - This is a "backtracking" pattern where we explore all valid paths
  - Rules: can add '(' if we haven't used n yet, can add ')' if more '(' than ')'

Backtracking Rules:
  - Add '(' if openCount < n
  - Add ')' if closeCount < openCount
  - When openCount == closeCount == n, we have a valid combination

Hints:
  - Track how many open and close parentheses you've used
  - When can you add an opening parenthesis?
  - When can you add a closing parenthesis?
  - What's the base case for a complete valid string?
  - Think about building the string character by character
*/

export const functionName = 'generateParenthesis';

export const tests = [
  {
    input: [1],
    expected: ["()"]
  },
  {
    input: [2],
    expected: ["(())","()()"]
  },
  {
    input: [3],
    expected: ["((()))","(()())","(())()","()(())","()()()"]
  },
  {
    input: [0],
    expected: [""]
  },
  {
    input: [4],
    expected: ["(((())))","((()()))","((())())","((()))()","(()(()))","(()()())","(()())()","(())(())","(())()()","()((()))","()(()())","()(())()","()()(())","()()()()"]
  }
];

/**
 * Generate all combinations of well-formed parentheses
 * @param {number} n - Number of pairs of parentheses
 * @return {string[]} Array of all valid combinations
 */
function generateParenthesis(n) {
    const result = [];

    function backtrack(current, openCount, closeCount) {
        // Base case: we've used all n pairs
        if (openCount === n && closeCount === n) {
            result.push(current);
            return;
        }

        // Add opening parenthesis if we haven't used all n
        if (openCount < n) {
            backtrack(current + '(', openCount + 1, closeCount);
        }

        // Add closing parenthesis if it would still be valid
        // (more opening than closing so far)
        if (closeCount < openCount) {
            backtrack(current + ')', openCount, closeCount + 1);
        }
    }

    // Handle edge case
    if (n === 0) {
        return [""];
    }

    backtrack("", 0, 0);
    return result;
}

export default generateParenthesis;