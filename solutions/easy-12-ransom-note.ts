/*
Problem: Ransom Note
Difficulty: Easy
Category: Strings, Hash Map
LeetCode: #383
Pattern: Character Frequency Matching

Given two strings ransomNote and magazine, return true if ransomNote can be
constructed by using the letters from magazine and false otherwise.

Each letter in magazine can only be used once in ransomNote.

Example 1:
  Input: ransomNote = "a", magazine = "b"
  Output: false

Example 2:
  Input: ransomNote = "aa", magazine = "ab"
  Output: false

Example 3:
  Input: ransomNote = "aa", magazine = "aab"
  Output: true

Example 4:
  Input: ransomNote = "aab", magazine = "baa"
  Output: true

Constraints:
  - 1 <= ransomNote.length, magazine.length <= 10^5
  - ransomNote and magazine consist of lowercase English letters only.

Time Complexity: O(n + m)
Space Complexity: O(1) - at most 26 characters

Hash Map Pattern Notes:
  - Count frequency of characters in magazine
  - For each character in ransomNote, check if available in magazine
  - Decrement count when using a character
  - Return false if any character is not available
  - Early termination when count goes negative
*/

export const functionName = 'canConstruct';

export const canConstruct = (ransomNote: string, magazine: string): boolean => {
  //create a map of the letters in magazine
  let hashMap = new Map<string, number>();

  for (let i = 0; i < magazine.length; i++) {
    let current = magazine[i];
    if (hashMap.has(current)) {
      hashMap.set(current, hashMap.get(current)! + 1);
    } else {
      hashMap.set(current, 1);
    }
  }
  //go thru ransom note

  for (let j = 0; j < ransomNote.length; j++) {
    let current = ransomNote[j];

    if (hashMap.has(current)) {
      hashMap.set(current, hashMap.get(current)! - 1);
      if (hashMap.get(current) === 0) hashMap.delete(current);
    } else {
      return false;
    }
  }

  //check if the character esists

  //decrement from the hashmap
  //if the count === 0 delete the character
  //else
  //return false

  //return true

  return true;
};

export const tests = [
  {
    input: ['a', 'b'],
    expected: false,
  },
  {
    input: ['aa', 'ab'],
    expected: false,
  },
  {
    input: ['aa', 'aab'],
    expected: true,
  },
  {
    input: ['aab', 'baa'],
    expected: true,
  },
  {
    input: ['', 'abc'],
    expected: true,
  },
  {
    input: ['abc', ''],
    expected: false,
  },
  {
    input: ['aabbc', 'aaabbbc'],
    expected: true,
  },
  {
    input: ['aabbc', 'aaabbc'],
    expected: true,
  },
];
