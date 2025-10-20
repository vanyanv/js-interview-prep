/*
Problem: Long Pressed Name
Difficulty: Easy
Category: Two Pointers, String
LeetCode: #925
Pattern: Two Pointers (Same Direction)

Your friend is typing his name into a keyboard. Sometimes, when typing a character c,
the key might get long pressed, and the character will be typed 1 or more times.

You examine the typed characters and return True if it is possible that it was your
friend's name, with some characters (possibly none) being long pressed.

Example 1:
  Input: name = "alex", typed = "aaleex"
  Output: true
  Explanation: 'a' and 'e' in 'alex' were long pressed.

Example 2:
  Input: name = "saeed", typed = "ssaaedd"
  Output: false
  Explanation: 'e' must have been pressed twice, but it was not in the original name.

Example 3:
  Input: name = "leelee", typed = "lleeelee"
  Output: true

Example 4:
  Input: name = "laiden", typed = "laiden"
  Output: true

Constraints:
  - 1 <= name.length, typed.length <= 1000
  - name and typed consist of only lowercase English letters.

Time Complexity: O(n + m) where n and m are lengths of name and typed
Space Complexity: O(1)

Pattern Notes:
  - Use two pointers, one for each string
  - When characters match, advance both pointers
  - When characters don't match, check if typed char equals previous char
  - If so, advance only typed pointer (long press scenario)
  - If not, return false
  - Ensure all characters in name are matched
*/

export const functionName = 'isLongPressedName';

export const tests = [
  {
    input: ["alex", "aaleex"],
    expected: true
  },
  {
    input: ["saeed", "ssaaedd"],
    expected: false
  },
  {
    input: ["leelee", "lleeelee"],
    expected: true
  },
  {
    input: ["laiden", "laiden"],
    expected: true
  },
  {
    input: ["alex", "aaleexa"],
    expected: false
  },
  {
    input: ["alex", "alex"],
    expected: true
  },
  {
    input: ["pyplrz", "ppyypllr"],
    expected: false
  },
  {
    input: ["vtkgn", "vttkgnn"],
    expected: true
  }
];

/**
 * Checks if typed string could be the result of long pressing keys while typing name
 * @param {string} name - The intended name
 * @param {string} typed - The actually typed string
 * @return {boolean} True if typed could be result of long pressing
 */
function isLongPressedName(name, typed) {
    let i = 0; // Pointer for name
    let j = 0; // Pointer for typed

    while (j < typed.length) {
        if (i < name.length && name[i] === typed[j]) {
            // Characters match, advance both pointers
            i++;
            j++;
        } else if (j > 0 && typed[j] === typed[j - 1]) {
            // Current typed char is same as previous (long press)
            j++;
        } else {
            // Characters don't match and it's not a long press
            return false;
        }
    }

    // Check if we've matched all characters in name
    return i === name.length;
}

export default isLongPressedName;