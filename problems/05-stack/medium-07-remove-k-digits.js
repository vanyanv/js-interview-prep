/*
Problem: Remove K Digits
Difficulty: Medium
Category: Stack, String, Greedy
LeetCode: #402
Pattern: Stack (Monotonic Stack - Greedy Selection)

Given string num representing a non-negative integer num, and an integer k,
return the smallest possible integer after removing k digits from num.

Example 1:
  Input: num = "1432219", k = 3
  Output: "1219"
  Explanation: Remove the three digits 4, 3, and 2 to form the new number 1219 which is the smallest.

Example 2:
  Input: num = "10200", k = 1
  Output: "200"
  Explanation: Remove the leading 1 and the number is 200. Note that the output must not contain leading zeroes.

Example 3:
  Input: num = "10", k = 2
  Output: "0"
  Explanation: Remove all the digits from the number and it is left with nothing which is 0.

Example 4:
  Input: num = "1234567890", k = 9
  Output: "0"

Example 5:
  Input: num = "54321", k = 2
  Output: "321"

Constraints:
  - 1 <= k <= num.length <= 10^5
  - num consists of only digits.
  - num does not have any leading zeros except for the zero itself.

Time Complexity: O(n)
Space Complexity: O(n) for the stack

Pattern Notes:
  - Greedy approach: remove larger digits from left when possible
  - Monotonic increasing stack maintains the smallest sequence
  - If current digit < stack top and removals left, remove stack top
  - After processing, remove remaining digits from end if needed
  - Handle leading zeros in final result
  - Edge case: if all digits removed, return "0"
*/

export const functionName = 'removeKdigits';

export const tests = [
  {
    input: ["1432219", 3],
    expected: "1219"
  },
  {
    input: ["10200", 1],
    expected: "200"
  },
  {
    input: ["10", 2],
    expected: "0"
  },
  {
    input: ["1234567890", 9],
    expected: "0"
  },
  {
    input: ["54321", 2],
    expected: "321"
  },
  {
    input: ["12345", 3],
    expected: "12"
  },
  {
    input: ["100", 1],
    expected: "0"
  },
  {
    input: ["112", 1],
    expected: "11"
  }
];

/**
 * Remove k digits to get smallest possible number
 * @param {string} num - String representing non-negative integer
 * @param {number} k - Number of digits to remove
 * @return {string} Smallest possible number after removal
 */
function removeKdigits(num, k) {
    const stack = [];
    let toRemove = k;

    for (let digit of num) {
        // While we can remove digits and current digit < stack top
        while (toRemove > 0 && stack.length > 0 && stack[stack.length - 1] > digit) {
            stack.pop();
            toRemove--;
        }

        stack.push(digit);
    }

    // If we still need to remove digits, remove from the end
    while (toRemove > 0) {
        stack.pop();
        toRemove--;
    }

    // Build result and remove leading zeros
    let result = stack.join('');

    // Remove leading zeros
    let i = 0;
    while (i < result.length && result[i] === '0') {
        i++;
    }

    result = result.substring(i);

    // If result is empty, return "0"
    return result === '' ? '0' : result;
}

export default removeKdigits;