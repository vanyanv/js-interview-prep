/*
Problem: Remove All Adjacent Duplicates In String
Difficulty: Easy
Category: Stack, String
LeetCode: #1047
Pattern: Stack (Character Removal)

You are given a string s consisting of lowercase English letters.
A duplicate removal consists of choosing two adjacent and equal letters
and removing them.

We repeatedly make duplicate removals on s until we no longer can.

Return the final string after all such duplicate removals have been made.
It can be proven that the answer is unique.

Example 1:
  Input: s = "abbaca"
  Output: "ca"
  Explanation:
  For example, in "abbaca" we could remove "bb" since the letters are adjacent and equal,
  and this is the only possible move. The result of this move is that the string is "aaca",
  of which only "aa" is possible, so the final string is "ca".

Example 2:
  Input: s = "azxxzy"
  Output: "ay"
  Explanation: Remove "xx" to get "azzy", then remove "zz" to get "ay".

Example 3:
  Input: s = "aabbcc"
  Output: ""
  Explanation: Remove "aa" to get "bbcc", remove "bb" to get "cc", remove "cc" to get "".

Constraints:
  - 1 <= s.length <= 10^5
  - s consists of lowercase English letters.

Time Complexity: O(n)
Space Complexity: O(n) for the stack

Pattern Notes:
  - Stack naturally handles the "most recent" character comparison
  - If current character matches stack top, it's a duplicate - remove both
  - If different, push current character to stack
  - Stack contents form the final result
  - This is a classic "cancel out" pattern using stack
*/

export const functionName = 'removeDuplicates';

export const tests = [
  {
    input: ["abbaca"],
    expected: "ca"
  },
  {
    input: ["azxxzy"],
    expected: "ay"
  },
  {
    input: ["aabbcc"],
    expected: ""
  },
  {
    input: ["a"],
    expected: "a"
  },
  {
    input: ["aa"],
    expected: ""
  },
  {
    input: ["abccba"],
    expected: ""
  },
  {
    input: ["abcddcba"],
    expected: ""
  },
  {
    input: ["abcd"],
    expected: "abcd"
  }
];

/**
 * Removes all adjacent duplicate characters
 * @param {string} s - Input string of lowercase letters
 * @return {string} String after removing adjacent duplicates
 */
function removeDuplicates(s) {
    const stack = [];

    for (let char of s) {
        if (stack.length > 0 && stack[stack.length - 1] === char) {
            // Found adjacent duplicate, remove both
            stack.pop();
        } else {
            // No duplicate, add to stack
            stack.push(char);
        }
    }

    return stack.join('');
}

export default removeDuplicates;