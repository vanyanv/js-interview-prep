/*
Problem: Make The String Great
Difficulty: Easy
Category: Stack, String
LeetCode: #1544
Pattern: Stack (Character Cancellation)

Given a string s of lower and upper case English letters.

A good string is a string which doesn't have two adjacent characters s[i] and s[i+1] where:
- 0 <= i <= s.length-2
- s[i] is a lower-case letter and s[i+1] is the same letter but in upper-case or vice-versa.

To make the string good, you can choose two adjacent characters that make the string bad
and remove them. You can keep doing this until the string becomes good.

Return the string after making it good. The answer is guaranteed to be unique under
the given constraints.

Notice that an empty string is also good.

Example 1:
  Input: s = "leEeetcode"
  Output: "leetcode"
  Explanation: In the first step, either you choose i = 1 or i = 2, both will result "leEeetcode" to "leetcode".

Example 2:
  Input: s = "abBAcC"
  Output: ""
  Explanation: We have many possible scenarios, and all lead to the same answer. For example:
  "abBAcC" --> "aAcC" --> "cC" --> ""
  "abBAcC" --> "abBA" --> "aA" --> ""

Example 3:
  Input: s = "s"
  Output: "s"

Example 4:
  Input: s = "Pp"
  Output: ""

Example 5:
  Input: s = "abcd"
  Output: "abcd"

Constraints:
  - 1 <= s.length <= 100
  - s contains only lower and upper case English letters.

Time Complexity: O(n)
Space Complexity: O(n) for the stack

Pattern Notes:
  - Stack for character cancellation pattern
  - Adjacent opposite case letters cancel each other
  - Check if current char and stack top are same letter different case
  - Use stack.pop() when cancellation occurs
  - Stack maintains valid characters after all cancellations
*/

export const functionName = 'makeGood';

export const tests = [
  {
    input: ["leEeetcode"],
    expected: "leetcode"
  },
  {
    input: ["abBAcC"],
    expected: ""
  },
  {
    input: ["s"],
    expected: "s"
  },
  {
    input: ["Pp"],
    expected: ""
  },
  {
    input: ["abcd"],
    expected: "abcd"
  },
  {
    input: [""],
    expected: ""
  },
  {
    input: ["AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz"],
    expected: ""
  },
  {
    input: ["aAbBcCdD"],
    expected: ""
  }
];

/**
 * Makes string good by removing adjacent opposite case letters
 * @param {string} s - Input string
 * @return {string} String after making it good
 */
function makeGood(s) {
    const stack = [];

    for (let char of s) {
        // Check if stack is not empty and top element makes a bad pair with current char
        if (stack.length > 0 && areOppositeCases(stack[stack.length - 1], char)) {
            // Remove the bad pair
            stack.pop();
        } else {
            // Add current character to stack
            stack.push(char);
        }
    }

    return stack.join('');
}

/**
 * Helper function to check if two characters are same letter but opposite cases
 * @param {string} a - First character
 * @param {string} b - Second character
 * @return {boolean} True if they are opposite cases of same letter
 */
function areOppositeCases(a, b) {
    return a.toLowerCase() === b.toLowerCase() && a !== b;
}

export default makeGood;