/*
Problem: Palindrome Number
Difficulty: Easy
Category: Math, String, Two Pointers
LeetCode: #9
Pattern: Mathematical Operations + Two Pointers
Mixed Patterns: Math Manipulation + String/Two Pointers + Edge Case Handling

Given an integer x, return true if x is palindrome integer.

An integer is a palindrome when it reads the same backward as forward.

Example 1:
  Input: x = 121
  Output: true
  Explanation: 121 reads as 121 from left to right and from right to left.

Example 2:
  Input: x = -121
  Output: false
  Explanation: From left to right, it reads -121. From right to left, it becomes 121-.

Example 3:
  Input: x = 10
  Output: false
  Explanation: Reads 01 from right to left. Therefore it is not a palindrome.

Example 4:
  Input: x = 0
  Output: true
  Explanation: Single digit numbers are palindromes.

Constraints:
  - -2^31 <= x <= 2^31 - 1

Time Complexity: O(log n) where n is the input number
Space Complexity: O(1) for math approach, O(log n) for string approach

Pattern Notes:
  - Multiple approaches: String conversion + Two Pointers, Math reversal
  - String approach: Convert to string, use two pointers from ends
  - Math approach: Reverse half the number, compare with other half
  - Edge cases: Negative numbers, numbers ending in 0
  - Focus on mathematical manipulation vs string processing

Interview Notes:
  - Follow-up: Solve without converting to string (math approach)
  - Follow-up: What about very large numbers that might overflow?
  - Discuss space complexity trade-offs between approaches
  - Common optimization: Only reverse half the number
*/

export const functionName = 'isPalindrome';

export const tests = [
  {
    input: [121],
    expected: true
  },
  {
    input: [-121],
    expected: false
  },
  {
    input: [10],
    expected: false
  },
  {
    input: [0],
    expected: true
  },
  {
    input: [1],
    expected: true
  },
  {
    input: [12321],
    expected: true
  },
  {
    input: [123321],
    expected: true
  },
  {
    input: [1234],
    expected: false
  }
];

/**
 * Checks if a number is palindrome using mathematical approach
 * @param {number} x - Input number
 * @return {boolean} True if number is palindrome
 */
function isPalindrome(x) {
    // Negative numbers and numbers ending in 0 (except 0) are not palindromes
    if (x < 0 || (x % 10 === 0 && x !== 0)) {
        return false;
    }

    // Single digit numbers are palindromes
    if (x < 10) {
        return true;
    }

    // Reverse half of the number
    let reversedHalf = 0;
    let original = x;

    // Continue until original becomes smaller than or equal to reversedHalf
    while (original > reversedHalf) {
        reversedHalf = reversedHalf * 10 + original % 10;
        original = Math.floor(original / 10);
    }

    // For even length: original === reversedHalf
    // For odd length: original === Math.floor(reversedHalf / 10)
    return original === reversedHalf || original === Math.floor(reversedHalf / 10);
}

/**
 * Alternative: String + Two Pointers approach
 * @param {number} x - Input number
 * @return {boolean} True if number is palindrome
 */
function isPalindromeString(x) {
    // Negative numbers are not palindromes
    if (x < 0) {
        return false;
    }

    const str = x.toString();
    let left = 0;
    let right = str.length - 1;

    while (left < right) {
        if (str[left] !== str[right]) {
            return false;
        }
        left++;
        right--;
    }

    return true;
}

/**
 * Alternative: Full number reversal approach
 * @param {number} x - Input number
 * @return {boolean} True if number is palindrome
 */
function isPalindromeReverse(x) {
    // Negative numbers are not palindromes
    if (x < 0) {
        return false;
    }

    let reversed = 0;
    let original = x;

    // Reverse the entire number
    while (original > 0) {
        reversed = reversed * 10 + original % 10;
        original = Math.floor(original / 10);
    }

    return x === reversed;
}

export default isPalindrome;