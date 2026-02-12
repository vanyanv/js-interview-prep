/*
Problem: Backspace String Compare
Difficulty: Easy
Category: Stack, String, Two Pointers
LeetCode: #844
Pattern: Stack (Character Building)

Given two strings s and t, return true if they are equal when both are typed
into empty text editors. '#' means a backspace character.

Note that after backspacing an empty text editor, the text will continue empty.

Example 1:
  Input: s = "ab#c", t = "ad#c"
  Output: true
  Explanation: Both s and t become "ac".

Example 2:
  Input: s = "ab##", t = "#a#c"
  Output: true
  Explanation: Both s and t become "".

Example 3:
  Input: s = "a#c", t = "b"
  Output: false
  Explanation: s becomes "c" while t becomes "b".

Example 4:
  Input: s = "a##c", t = "#a#c"
  Output: true
  Explanation: Both s and t become "c".

Example 5:
  Input: s = "a#b#c#d#", t = ""
  Output: true
  Explanation: Both s and t become "".

Constraints:
  - 1 <= s.length, t.length <= 200
  - s and t only contain lowercase letters and '#' characters.

Time Complexity: O(m + n) where m, n are string lengths
Space Complexity: O(m + n) for the stacks

Pattern Notes:
  - Stack perfectly simulates text editor with backspace
  - Push regular characters, pop for backspace
  - Handle backspace on empty stack gracefully
  - Compare final stack contents for equality
  - Alternative: Two pointers from end (O(1) space)
*/

export const functionName = 'backspaceCompare';

export const tests = [
  {
    input: ["ab#c", "ad#c"],
    expected: true
  },
  {
    input: ["ab##", "#a#c"],
    expected: true
  },
  {
    input: ["a#c", "b"],
    expected: false
  },
  {
    input: ["a##c", "#a#c"],
    expected: true
  },
  {
    input: ["a#b#c#d#", ""],
    expected: true
  },
  {
    input: ["", ""],
    expected: true
  },
  {
    input: ["ab", "ab"],
    expected: true
  },
  {
    input: ["ab", "a#b"],
    expected: false
  },
  // Edge: many consecutive backspaces beyond string length
  {
    input: ["####", "######"],
    expected: true
  },
  // Larger input: both reduce to same string via different paths
  {
    input: ["abc##de#f", "af"],
    expected: true
  },
  // All-same characters with selective backspaces
  {
    input: ["aaa###a", "a"],
    expected: true
  },
  // Longer strings that differ only at the end after processing
  {
    input: ["abcdef", "abcdeg#f"],
    expected: true
  },
  // Backspace at very start vs normal string
  {
    input: ["#a#b#c", "c"],
    expected: true
  }
];

/**
 * Compares two strings after processing backspaces
 * @param {string} s - First string with possible backspaces
 * @param {string} t - Second string with possible backspaces
 * @return {boolean} True if final strings are equal
 */
function backspaceCompare(s, t) {
    // Helper function to build final string using stack
    function buildString(str) {
        const stack = [];

        for (let char of str) {
            if (char === '#') {
                // Backspace: remove last character if stack not empty
                if (stack.length > 0) {
                    stack.pop();
                }
            } else {
                // Regular character: add to stack
                stack.push(char);
            }
        }

        return stack.join('');
    }

    return buildString(s) === buildString(t);
}

export default backspaceCompare;