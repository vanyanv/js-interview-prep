/*
Problem: Word Pattern
Difficulty: Easy
Category: Strings, Hash Map
LeetCode: #290
Pattern: Bidirectional Word-Character Mapping

Given a pattern and a string s, find if s follows the same pattern.

Here follow means a full match, such that there is a bijection between
a letter in pattern and a non-empty word in s.

Example 1:
  Input: pattern = "abba", s = "dog cat cat dog"
  Output: true

Example 2:
  Input: pattern = "abba", s = "dog cat cat fish"
  Output: false

Example 3:
  Input: pattern = "aaaa", s = "dog cat cat dog"
  Output: false

Example 4:
  Input: pattern = "abba", s = "dog dog dog dog"
  Output: false

Constraints:
  - 1 <= pattern.length <= 300
  - pattern contains only lower-case English letters.
  - 1 <= s.length <= 3000
  - s contains only lowercase English letters and spaces ' '.
  - s does not contain any leading or trailing spaces.
  - All the words in s are separated by a single space.

Time Complexity: O(n + m) where n is pattern length, m is s length
Space Complexity: O(w) where w is number of unique words

Hash Map Pattern Notes:
  - Split string into words array
  - Check if pattern length equals words length
  - Use two Maps: char->word and word->char
  - Ensure bijection (one-to-one mapping)
  - Similar to isomorphic strings but with words instead of characters
*/

export const functionName = 'wordPattern';

export const wordPattern = (pattern: string, s: string): boolean => {
  //i need to split s into an array and compare its lenght to the length of pattern
  const sArray = s.split(' ');
  //i need to check to se if the leghts of the pattern and s match
  if (pattern.length !== sArray.length) return false;

  //i need to create a map for pattern
  const patternMap = new Map<string, string>();
  //also need a map for s
  const sMap = new Map<string, string>();

  //go thru pattern and match it with s
  for (let i = 0; i < pattern.length; i++) {
    const current = pattern[i];

    if (patternMap.has(current)) {
      if (patternMap.get(current) !== sArray[i]) {
        return false;
      }
    } else {
      patternMap.set(current, sArray[i]);
    }
  }

  //go thru s and match it with pattern
  for (let j = 0; j < sArray.length; j++) {
    const current = sArray[j];

    if (sMap.has(current)) {
      if (sMap.get(current) !== pattern[j]) return false;
    } else {
      sMap.set(current, pattern[j]);
    }
  }

  return true;
};

export const tests = [
  {
    input: ['abba', 'dog cat cat dog'],
    expected: true,
  },
  {
    input: ['abba', 'dog cat cat fish'],
    expected: false,
  },
  {
    input: ['aaaa', 'dog cat cat dog'],
    expected: false,
  },
  {
    input: ['abba', 'dog dog dog dog'],
    expected: false,
  },
  {
    input: ['abc', 'dog cat fish'],
    expected: true,
  },
  {
    input: ['aaa', 'aa aa aa aa'],
    expected: false,
  },
  {
    input: ['a', 'dog'],
    expected: true,
  },
  {
    input: ['ab', 'happy hacking'],
    expected: true,
  },
];
