/*
Problem: Valid Palindrome II
Difficulty: Easy
Category: Strings, Two Pointers
LeetCode: #680
Pattern: Two Pointers (Opposite Direction)

Given a string s, return true if the s can be palindrome after deleting at most
one character from it.

Example 1:
  Input: s = "aba"
  Output: true

Example 2:
  Input: s = "abca"
  Output: true
  Explanation: You could delete the character 'c'.

Example 3:
  Input: s = "abc"
  Output: false

Example 4:
  Input: s = "raceacar"
  Output: true
  Explanation: You could delete the character 'e'.

Constraints:
  - 1 <= s.length <= 10^5
  - s consists of lowercase English letters.

Time Complexity: O(n)
Space Complexity: O(1)

Pattern Notes:
  - Use two pointers from opposite ends
  - When characters don't match, try removing left OR right character
  - Check if remaining substring is palindrome in both cases
  - Helper function to check palindrome of substring
  - At most one deletion allowed
*/

export const functionName = 'validPalindrome';

export const tests = [
  {
    input: ["aba"],
    expected: true
  },
  {
    input: ["abca"],
    expected: true
  },
  {
    input: ["abc"],
    expected: false
  },
  {
    input: ["raceacar"],
    expected: true
  },
  {
    input: ["a"],
    expected: true
  },
  {
    input: ["ab"],
    expected: true
  },
  {
    input: ["deeee"],
    expected: true
  },
  {
    input: ["abcddcbea"],
    expected: true
  },
  // Boundary: two identical chars (already palindrome)
  {
    input: ["aa"],
    expected: true
  },
  // All same characters (15 elements)
  {
    input: ["aaaaaaaaaaaaaaa"],
    expected: true
  },
  // Needs to remove first or last char
  {
    input: ["cbbcc"],
    expected: true
  },
  // Larger input: clearly not fixable with one deletion
  {
    input: ["abcdefghij"],
    expected: false
  },
  // Alternating pattern that fails
  {
    input: ["ababababab"],
    expected: false
  }
];

/**
 * Helper function to check if a substring is a palindrome
 * @param {string} s - The string
 * @param {number} left - Left index
 * @param {number} right - Right index
 * @return {boolean} True if substring is palindrome
 */
function isPalindromeRange(s, left, right) {
    while (left < right) {
        if (s[left] !== s[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}

/**
 * Determines if string can be palindrome after deleting at most one character
 * @param {string} s - Input string
 * @return {boolean} True if valid palindrome after at most one deletion
 */
function validPalindrome(s) {
    let left = 0;
    let right = s.length - 1;

    // Use two pointers to find the first mismatch
    while (left < right) {
        if (s[left] !== s[right]) {
            // Try removing left character OR right character
            // Check if either results in a palindrome
            return isPalindromeRange(s, left + 1, right) ||
                   isPalindromeRange(s, left, right - 1);
        }
        left++;
        right--;
    }

    // If no mismatch found, it's already a palindrome
    return true;
}

export default validPalindrome;