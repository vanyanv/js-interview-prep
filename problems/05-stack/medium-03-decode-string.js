/*
Problem: Decode String
Difficulty: Medium
Category: Stack, String, Recursion
LeetCode: #394
Pattern: Stack (Nested Structure Processing)

Given an encoded string, return its decoded string.

The encoding rule is: k[encoded_string], where the encoded_string inside the square
brackets is being repeated exactly k times. Note that k is guaranteed to be a positive integer.

You may assume that the input string is always valid; there are no extra white spaces,
square brackets are well-formed, etc. Furthermore, you may assume that the original data
does not contain any digits and that digits are only for those repeat numbers, k.
For example, there will not be input like 3a or 2[4].

Example 1:
  Input: s = "3[a]2[bc]"
  Output: "aaabcbc"

Example 2:
  Input: s = "3[a2[c]]"
  Output: "accaccacc"

Example 3:
  Input: s = "2[abc]3[cd]ef"
  Output: "abcabccdcdcdef"

Example 4:
  Input: s = "abc3[cd]xyz"
  Output: "abccdcdcdxyz"

Example 5:
  Input: s = "100[leetcode]"
  Output: "leetcodeleetcode..." (repeated 100 times)

Constraints:
  - 1 <= s.length <= 30
  - s consists of lowercase English letters, digits, and square brackets '[]'.
  - s is guaranteed to be a valid input.
  - All the integers in s are in the range [1, 300].

Time Complexity: O(n * m) where n is string length, m is max repetition
Space Complexity: O(n) for the stack

Pattern Notes:
  - Stack handles nested brackets structure
  - Track both count and string being built
  - When '[': push current state, start new
  - When ']': pop previous state, repeat current string, append to previous
  - Use two stacks (counts and strings) or stack of pairs
  - This pattern handles nested structures with repetition
*/

export const functionName = 'decodeString';

export const tests = [
  {
    input: ["3[a]2[bc]"],
    expected: "aaabcbc"
  },
  {
    input: ["3[a2[c]]"],
    expected: "accaccacc"
  },
  {
    input: ["2[abc]3[cd]ef"],
    expected: "abcabccdcdcdef"
  },
  {
    input: ["abc3[cd]xyz"],
    expected: "abccdcdcdxyz"
  },
  {
    input: ["100[leetcode]"],
    expected: "leetcode".repeat(100)
  },
  {
    input: [""],
    expected: ""
  },
  {
    input: ["abc"],
    expected: "abc"
  },
  {
    input: ["2[2[2[a]]]"],
    expected: "aaaaaaaa"
  }
];

/**
 * Decodes string with nested repetition patterns
 * @param {string} s - Encoded string
 * @return {string} Decoded string
 */
function decodeString(s) {
    const countStack = [];
    const stringStack = [];
    let currentString = '';
    let currentCount = 0;

    for (let char of s) {
        if (char >= '0' && char <= '9') {
            // Build the repetition count (can be multiple digits)
            currentCount = currentCount * 10 + parseInt(char);
        } else if (char === '[') {
            // Start new nested level
            countStack.push(currentCount);
            stringStack.push(currentString);
            currentCount = 0;
            currentString = '';
        } else if (char === ']') {
            // End current level, repeat and append to previous level
            const repeatCount = countStack.pop();
            const previousString = stringStack.pop();
            currentString = previousString + currentString.repeat(repeatCount);
        } else {
            // Regular character, add to current string
            currentString += char;
        }
    }

    return currentString;
}

export default decodeString;