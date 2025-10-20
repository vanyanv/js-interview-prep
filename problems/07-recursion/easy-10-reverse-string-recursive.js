/*
Problem: Reverse String Recursive
Difficulty: Easy
Category: Recursion, String
Pattern: Basic Recursion

Write a function that reverses a string using recursion.
Do not use any built-in reverse methods.

Example 1:
  Input: s = "hello"
  Output: "olleh"
  Explanation: Reverse each character position

Example 2:
  Input: s = "world"
  Output: "dlrow"
  Explanation: Reverse the entire string

Example 3:
  Input: s = "a"
  Output: "a"
  Explanation: Single character remains the same

Example 4:
  Input: s = ""
  Output: ""
  Explanation: Empty string remains empty

Example 5:
  Input: s = "ab"
  Output: "ba"
  Explanation: Two characters swap positions

Constraints:
  - 0 <= s.length <= 1000
  - s consists of printable ASCII characters

Time Complexity: O(n) where n is the length of the string
Space Complexity: O(n) due to recursion call stack and string concatenation

Recursion Pattern Notes:
  - Base case: empty string or single character, return as is
  - Recursive case: last character + reverse of remaining string
  - This is a "divide and conquer" pattern where we split the string
  - Each recursive call processes one character and delegates the rest

Hints:
  - What's the simplest string to reverse? (base case)
  - How can you break down the string into smaller parts?
  - Think about taking the first character and reversing the rest
  - Or taking the last character and reversing the rest
  - String concatenation creates new strings in JavaScript
*/

export const functionName = 'reverseStringRecursive';

export const tests = [
  {
    input: ["hello"],
    expected: "olleh"
  },
  {
    input: ["world"],
    expected: "dlrow"
  },
  {
    input: ["a"],
    expected: "a"
  },
  {
    input: [""],
    expected: ""
  },
  {
    input: ["ab"],
    expected: "ba"
  },
  {
    input: ["abc"],
    expected: "cba"
  },
  {
    input: ["12345"],
    expected: "54321"
  },
  {
    input: ["racecar"],
    expected: "racecar"
  }
];

/**
 * Reverse a string using recursion
 * @param {string} s - String to reverse
 * @return {string} Reversed string
 */
function reverseStringRecursive(s) {
    // Base case: empty string or single character
    if (s.length <= 1) {
        return s;
    }

    // Recursive case: last character + reverse of remaining string
    return s[s.length - 1] + reverseStringRecursive(s.slice(0, -1));
}

export default reverseStringRecursive;