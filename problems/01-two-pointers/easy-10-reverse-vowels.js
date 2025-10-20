/*
Problem: Reverse Vowels of a String
Difficulty: Easy
Category: Strings, Two Pointers
LeetCode: #345
Pattern: Two Pointers (Opposite Direction)

Given a string s, reverse only all the vowels in the string and return it.

The vowels are 'a', 'e', 'i', 'o', 'u', and they can appear in both lower and upper cases.

Example 1:
  Input: s = "hello"
  Output: "holle"

Example 2:
  Input: s = "leetcode"
  Output: "leotcede"

Example 3:
  Input: s = "aA"
  Output: "Aa"

Example 4:
  Input: s = "race car"
  Output: "race car"

Constraints:
  - 1 <= s.length <= 3 * 10^5
  - s consist of printable ASCII characters.

Time Complexity: O(n)
Space Complexity: O(n) for string conversion, O(1) if input is mutable

Pattern Notes:
  - Use two pointers from opposite ends
  - Move left pointer until it finds a vowel
  - Move right pointer until it finds a vowel
  - Swap vowels when both pointers find them
  - Continue until pointers meet
*/

export const functionName = 'reverseVowels';

export const tests = [
  {
    input: ["hello"],
    expected: "holle"
  },
  {
    input: ["leetcode"],
    expected: "leotcede"
  },
  {
    input: ["aA"],
    expected: "Aa"
  },
  {
    input: ["race car"],
    expected: "race car"
  },
  {
    input: ["a"],
    expected: "a"
  },
  {
    input: ["bcdfg"],
    expected: "bcdfg"
  },
  {
    input: ["AeIoU"],
    expected: "UoIeA"
  },
  {
    input: ["programming"],
    expected: "prigrammong"
  }
];

/**
 * Helper function to check if a character is a vowel
 * @param {string} char - Character to check
 * @return {boolean} True if character is a vowel
 */
function isVowel(char) {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
    return vowels.has(char);
}

/**
 * Reverses only the vowels in a string
 * @param {string} s - Input string
 * @return {string} String with vowels reversed
 */
function reverseVowels(s) {
    // Convert string to array for easier manipulation
    const chars = Array.from(s);
    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        // Move left pointer to next vowel
        while (left < right && !isVowel(chars[left])) {
            left++;
        }

        // Move right pointer to previous vowel
        while (left < right && !isVowel(chars[right])) {
            right--;
        }

        // Swap vowels if both pointers found vowels
        if (left < right) {
            [chars[left], chars[right]] = [chars[right], chars[left]];
            left++;
            right--;
        }
    }

    return chars.join('');
}

export default reverseVowels;