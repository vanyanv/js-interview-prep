/*
Problem: Set Mismatch
Difficulty: Easy
Category: Arrays, Hash Set, Math
LeetCode: #645
Pattern: Missing and Duplicate Detection

You have a set of integers s, which originally contains all the numbers
from 1 to n. Unfortunately, due to some error, one of the numbers in s
got duplicated to another number in the set, which results in repetition
of one number and loss of another number.

You are given an integer array nums representing the data status of this
set after the error.

Find the number that occurs twice and the number that is missing and
return them in the form of an array.

Example 1:
  Input: nums = [1,2,2,4]
  Output: [2,3]

Example 2:
  Input: nums = [1,1]
  Output: [1,2]

Example 3:
  Input: nums = [2,2]
  Output: [2,1]

Example 4:
  Input: nums = [3,2,3,4,6,5]
  Output: [3,1]

Constraints:
  - 2 <= nums.length <= 10^4
  - 1 <= nums[i] <= 10^4

Time Complexity: O(n)
Space Complexity: O(n)

Hash Set Pattern Notes:
  - Use Set to track seen numbers and find duplicate
  - Calculate expected sum (1 + 2 + ... + n) and actual sum
  - Duplicate = number that appears twice in array
  - Missing = expected_sum - actual_sum + duplicate
  - Alternative: frequency counting with Map
*/

export const functionName = 'findErrorNums';

export const tests = [
  {
    input: [[1, 2, 2, 4]],
    expected: [2, 3]
  },
  {
    input: [[1, 1]],
    expected: [1, 2]
  },
  {
    input: [[2, 2]],
    expected: [2, 1]
  },
  {
    input: [[3, 2, 3, 4, 6, 5]],
    expected: [3, 1]
  },
  {
    input: [[1, 2, 3, 4, 4]],
    expected: [4, 5]
  },
  {
    input: [[2, 3, 2]],
    expected: [2, 1]
  },
  {
    input: [[1, 5, 3, 2, 2, 7, 6, 4, 8, 9]],
    expected: [2, 10]
  },
  {
    input: [[37, 62, 43, 27, 12, 66, 36, 18, 39, 54, 61, 65, 47, 32, 23, 2, 46, 8, 4, 24, 29, 38, 63, 39, 25, 1, 6, 64, 48, 49, 9, 22, 57, 52, 31, 53, 68, 26, 35, 11, 15, 56, 34, 5, 16, 59, 67, 50, 10, 19, 13, 41, 58, 42, 60, 40, 51, 17, 55, 37, 20, 7, 14, 21, 45, 28, 44, 3, 30, 33]],
    expected: [37, 69]
  }
];