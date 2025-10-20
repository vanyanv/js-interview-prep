/*
Problem: Valid Parentheses Extended
Difficulty: Easy
Category: Stack, String, Hash Map
LeetCode: #20 (Extended)
Pattern: Stack + Hash Map + String Processing
Mixed Patterns: Stack (LIFO) + Hash Map Lookup + Character Matching

Given a string s containing just the characters '(', ')', '{', '}', '[' and ']',
determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

Example 1:
  Input: s = "()"
  Output: true
  Explanation: Valid single pair.

Example 2:
  Input: s = "()[]{}"
  Output: true
  Explanation: Multiple valid pairs in order.

Example 3:
  Input: s = "(]"
  Output: false
  Explanation: Mismatched bracket types.

Example 4:
  Input: s = "([)]"
  Output: false
  Explanation: Incorrect nesting order.

Example 5:
  Input: s = "{[]}"
  Output: true
  Explanation: Properly nested brackets.

Constraints:
  - 1 <= s.length <= 10^4
  - s consists of parentheses only '()[]{}'

Time Complexity: O(n) where n is length of string
Space Complexity: O(n) for the stack in worst case

Pattern Notes:
  - Use stack to track opening brackets
  - Use hash map to match closing brackets with opening brackets
  - For each character: if opening, push to stack; if closing, check match
  - Stack should be empty at end for valid string
  - Early termination: if closing bracket without matching opening

Interview Notes:
  - Follow-up: What if we have other characters mixed in?
  - Follow-up: Return the index of first invalid character
  - Follow-up: Count minimum insertions to make string valid
  - Common mistakes: Not checking empty stack before popping
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
    input: ["("],
    expected: false
  },
  {
    input: [")"],
    expected: false
  },
  {
    input: ["(((("],
    expected: false
  },
  {
    input: ["))))"],
    expected: false
  }
];

/**
 * Validates parentheses using stack and hash map
 * @param {string} s - String containing parentheses
 * @return {boolean} True if valid parentheses
 */
function isValid(s) {
    // Map closing brackets to their corresponding opening brackets
    const bracketMap = new Map([
        [')', '('],
        ['}', '{'],
        [']', '[']
    ]);

    const stack = [];

    for (const char of s) {
        if (bracketMap.has(char)) {
            // It's a closing bracket
            if (stack.length === 0 || stack.pop() !== bracketMap.get(char)) {
                return false;
            }
        } else {
            // It's an opening bracket
            stack.push(char);
        }
    }

    // Valid if stack is empty (all brackets matched)
    return stack.length === 0;
}

/**
 * Alternative: Using object instead of Map
 * @param {string} s - String containing parentheses
 * @return {boolean} True if valid parentheses
 */
function isValidObject(s) {
    const pairs = {
        ')': '(',
        '}': '{',
        ']': '['
    };

    const stack = [];

    for (const char of s) {
        if (char in pairs) {
            // Closing bracket
            if (stack.length === 0 || stack.pop() !== pairs[char]) {
                return false;
            }
        } else {
            // Opening bracket
            stack.push(char);
        }
    }

    return stack.length === 0;
}

/**
 * Alternative: Explicit opening bracket check
 * @param {string} s - String containing parentheses
 * @return {boolean} True if valid parentheses
 */
function isValidExplicit(s) {
    const stack = [];
    const openBrackets = new Set(['(', '{', '[']);
    const bracketPairs = {
        ')': '(',
        '}': '{',
        ']': '['
    };

    for (const char of s) {
        if (openBrackets.has(char)) {
            stack.push(char);
        } else if (char in bracketPairs) {
            if (stack.length === 0 || stack.pop() !== bracketPairs[char]) {
                return false;
            }
        }
        // Ignore any other characters (if extended to handle mixed strings)
    }

    return stack.length === 0;
}

/**
 * Extended version: Returns index of first invalid character
 * @param {string} s - String containing parentheses
 * @return {number} Index of first invalid character, -1 if valid
 */
function findInvalidIndex(s) {
    const bracketMap = {
        ')': '(',
        '}': '{',
        ']': '['
    };

    const stack = [];

    for (let i = 0; i < s.length; i++) {
        const char = s[i];

        if (char in bracketMap) {
            // Closing bracket
            if (stack.length === 0 || stack.pop() !== bracketMap[char]) {
                return i; // Invalid character found
            }
        } else {
            // Opening bracket
            stack.push(char);
        }
    }

    // If stack not empty, return length (indicates missing closing brackets)
    return stack.length === 0 ? -1 : s.length;
}

export default isValid;