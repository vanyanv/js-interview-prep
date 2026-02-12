/*
Problem: Roman to Integer
Difficulty: Easy
Category: Hash Map, String, Math
LeetCode: #13
Pattern: Hash Map + String Processing + Mathematical Logic
Mixed Patterns: Hash Map Lookup + String Traversal + Conditional Logic

Roman numerals are represented by seven different symbols:
I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1000

Roman numerals are usually written largest to smallest from left to right.
However, there are special cases for subtraction:
- I before V (4) and X (9)
- X before L (40) and C (90)
- C before D (400) and M (900)

Given a roman numeral, convert it to an integer.

Example 1:
  Input: s = "III"
  Output: 3
  Explanation: III = 3.

Example 2:
  Input: s = "LVIII"
  Output: 58
  Explanation: L = 50, V = 5, III = 3. Total = 58.

Example 3:
  Input: s = "MCMXC"
  Output: 1990
  Explanation: M = 1000, CM = 900, XC = 90. Total = 1990.

Example 4:
  Input: s = "MMCDXLIV"
  Output: 2444
  Explanation: MM = 2000, CD = 400, XL = 40, IV = 4. Total = 2444.

Constraints:
  - 1 <= s.length <= 15
  - s contains only characters ('I', 'V', 'X', 'L', 'C', 'D', 'M')
  - It is guaranteed that s is a valid roman numeral in range [1, 3999]

Time Complexity: O(n) where n is length of string
Space Complexity: O(1) - constant space for hash map

Pattern Notes:
  - Use hash map to store roman symbol values
  - Process string from left to right
  - If current symbol < next symbol, subtract current (subtraction case)
  - Otherwise, add current symbol to result
  - Handle edge case where current is last character

Interview Notes:
  - Follow-up: Convert integer to roman numeral (LeetCode #12)
  - Follow-up: Validate if roman numeral is properly formed
  - Discuss the subtraction rule and how to detect it
  - Common mistake: Not handling the last character properly
*/

export const functionName = 'romanToInt';

export const tests = [
  {
    input: ["III"],
    expected: 3
  },
  {
    input: ["LVIII"],
    expected: 58
  },
  {
    input: ["MCMXC"],
    expected: 1990
  },
  {
    input: ["MMCDXLIV"],
    expected: 2444
  },
  {
    input: ["IV"],
    expected: 4
  },
  {
    input: ["IX"],
    expected: 9
  },
  {
    input: ["XL"],
    expected: 40
  },
  {
    input: ["XC"],
    expected: 90
  },
  {
    input: ["CD"],
    expected: 400
  },
  {
    input: ["CM"],
    expected: 900
  }
];

/**
 * Converts roman numeral to integer
 * @param {string} s - Roman numeral string
 * @return {number} Integer representation
 */
function romanToInt(s) {
    // Map roman symbols to their values
    const romanMap = new Map([
        ['I', 1],
        ['V', 5],
        ['X', 10],
        ['L', 50],
        ['C', 100],
        ['D', 500],
        ['M', 1000]
    ]);

    let result = 0;

    for (let i = 0; i < s.length; i++) {
        const current = romanMap.get(s[i]);
        const next = i + 1 < s.length ? romanMap.get(s[i + 1]) : 0;

        // If current symbol is smaller than next, it's a subtraction case
        if (current < next) {
            result -= current;
        } else {
            result += current;
        }
    }

    return result;
}

/**
 * Alternative: Process from right to left
 * @param {string} s - Roman numeral string
 * @return {number} Integer representation
 */
function romanToIntRightToLeft(s) {
    const romanMap = {
        'I': 1, 'V': 5, 'X': 10, 'L': 50,
        'C': 100, 'D': 500, 'M': 1000
    };

    let result = 0;
    let prevValue = 0;

    // Process from right to left
    for (let i = s.length - 1; i >= 0; i--) {
        const currentValue = romanMap[s[i]];

        // If current value is less than previous, subtract it
        if (currentValue < prevValue) {
            result -= currentValue;
        } else {
            result += currentValue;
        }

        prevValue = currentValue;
    }

    return result;
}

/**
 * Alternative: Handle special cases explicitly
 * @param {string} s - Roman numeral string
 * @return {number} Integer representation
 */
function romanToIntExplicit(s) {
    const values = {
        'I': 1, 'V': 5, 'X': 10, 'L': 50,
        'C': 100, 'D': 500, 'M': 1000,
        // Special subtraction cases
        'IV': 4, 'IX': 9, 'XL': 40, 'XC': 90,
        'CD': 400, 'CM': 900
    };

    let result = 0;
    let i = 0;

    while (i < s.length) {
        // Check for two-character subtraction cases first
        if (i + 1 < s.length && values[s.slice(i, i + 2)]) {
            result += values[s.slice(i, i + 2)];
            i += 2;
        } else {
            result += values[s[i]];
            i++;
        }
    }

    return result;
}

export default romanToInt;