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

export const reverseVowels = (s: string): string => {
  const stringArray = s.split("");
  let left = 0;
  let right = s.length -1;

  while (left < right) {
    if (/[^aeiou]/i.test(stringArray[left])) {
      left++;
    } else if (/[^aeiou]/i.test(stringArray[right])) {
      right--;
    } else {
      [stringArray[left], stringArray[right]] = [stringArray[right], stringArray[left]];
      left++;
      right--;
    }
  }

  return stringArray.join("");
}

export const tests = [
  {
    input: ['hello'],
    expected: 'holle',
  },
  {
    input: ['leetcode'],
    expected: 'leotcede',
  },
  {
    input: ['aA'],
    expected: 'Aa',
  },
  {
    input: ['race car'],
    expected: 'race car',
  },
  {
    input: ['a'],
    expected: 'a',
  },
  {
    input: ['bcdfg'],
    expected: 'bcdfg',
  },
  {
    input: ['AeIoU'],
    expected: 'UoIeA',
  },
  {
    input: ['programming'],
    expected: 'prigrammong',
  },
  {
    input: ['b'],
    expected: 'b',
  },
  {
    input: ['aeiou'],
    expected: 'uoiea',
  },
  {
    input: ['bbbbb'],
    expected: 'bbbbb',
  },
  {
    input: ['abcdefghijklmnopqrstuvwxyz'],
    expected: 'ubcdofghijklmnepqrstavwxyz',
  },
];
