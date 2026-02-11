/*
Problem: Backspace String Compare
Difficulty: Easy
Category: Two Pointers, String, Stack, Simulation
LeetCode: #844
Pattern: Two Pointers (Reverse Traversal)

Given two strings s and t, return true if they are equal when both are typed into
empty text editors. '#' means a backspace character.

Note that after backspacing an empty text, the text will continue empty.

Example 1:
  Input: s = "ab#c", t = "ad#c"
  Output: true
  Explanation: Both s and t become "ac".

Example 2:
  Input: s = "ab##", t = "#a#c"
  Output: true
  Explanation: Both s and t become "".

Example 3:
  Input: s = "a##c", t = "#a#c"
  Output: true
  Explanation: Both s and t become "c".

Example 4:
  Input: s = "a#c", t = "b"
  Output: false
  Explanation: s becomes "c" while t becomes "b".

Constraints:
  - 1 <= s.length, t.length <= 200
  - s and t only contain lowercase letters and '#' characters.

Time Complexity: O(m + n) where m and n are lengths of s and t
Space Complexity: O(1)

Pattern Notes:
  - Process strings from right to left (reverse traversal)
  - Use counters to track how many characters to skip due to backspaces
  - Find next valid character in each string
  - Compare valid characters from both strings
  - Handle different string lengths properly
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
    input: ["a##c", "#a#c"],
    expected: true
  },
  {
    input: ["a#c", "b"],
    expected: false
  },
  {
    input: ["", ""],
    expected: true
  },
  {
    input: ["#", ""],
    expected: true
  },
  {
    input: ["abc", "abc"],
    expected: true
  },
  {
    input: ["bxj##tw", "bxj###tw"],
    expected: false
  },
  {
    input: ["####", "####"],
    expected: true
  },
  {
    input: ["a#b#c#d#", ""],
    expected: true
  },
  {
    input: ["abc###", "def###"],
    expected: true
  },
  {
    input: ["abcdefghij", "abcdefghij"],
    expected: true
  },
  {
    input: ["ab#c#de#fg#h", "adfh"],
    expected: false
  }
];

/**
 * Helper function to get next valid character index from right
 * @param {string} s - Input string
 * @param {number} index - Current index
 * @return {number} Next valid character index or -1
 */
function getNextValidChar(s, index) {
    let backspaceCount = 0;

    while (index >= 0) {
        if (s[index] === '#') {
            backspaceCount++;
        } else if (backspaceCount > 0) {
            backspaceCount--;
        } else {
            // Found valid character
            return index;
        }
        index--;
    }

    return -1; // No more valid characters
}

/**
 * Compares two strings after processing backspace characters
 * @param {string} s - First string
 * @param {string} t - Second string
 * @return {boolean} True if strings are equal after backspace processing
 */
function backspaceCompare(s, t) {
    let i = s.length - 1;
    let j = t.length - 1;

    while (i >= 0 || j >= 0) {
        // Get next valid character from both strings
        i = getNextValidChar(s, i);
        j = getNextValidChar(t, j);

        // If one string ended but other didn't
        if (i < 0 && j >= 0) return false;
        if (i >= 0 && j < 0) return false;

        // If both strings ended
        if (i < 0 && j < 0) return true;

        // Compare current valid characters
        if (s[i] !== t[j]) return false;

        // Move to next characters
        i--;
        j--;
    }

    return true;
}

export default backspaceCompare;