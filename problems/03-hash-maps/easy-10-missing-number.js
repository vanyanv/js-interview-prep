/*
Problem: Missing Number
Difficulty: Easy
Category: Arrays, Math, Hash Set
LeetCode: #268
Pattern: Set Membership vs Expected Range

Given an array nums containing n distinct numbers in the range [0, n],
return the only number in the range that is missing from the array.

Example 1:
  Input: nums = [3,0,1]
  Output: 2
  Explanation: n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number in the range since it does not appear in nums.

Example 2:
  Input: nums = [0,1]
  Output: 2
  Explanation: n = 2 since there are 2 numbers, so all numbers are in the range [0,2]. 2 is the missing number in the range since it does not appear in nums.

Example 3:
  Input: nums = [9,6,4,2,3,5,7,0,1]
  Output: 8
  Explanation: n = 9 since there are 9 numbers, so all numbers are in the range [0,9]. 8 is the missing number in the range since it does not appear in nums.

Constraints:
  - n == nums.length
  - 1 <= n <= 10^4
  - 0 <= nums[i] <= n
  - All the numbers of nums are unique.

Time Complexity: O(n)
Space Complexity: O(n) for Set solution, O(1) for math solution

Hash Set Pattern Notes:
  - Convert array to Set for O(1) lookup
  - Check each number from 0 to n for membership
  - Alternative solutions: sum formula, XOR, sorting
  - Set solution is straightforward and readable
  - Math solution: expected_sum - actual_sum
*/

export const functionName = 'missingNumber';

export const tests = [
  {
    input: [[3, 0, 1]],
    expected: 2
  },
  {
    input: [[0, 1]],
    expected: 2
  },
  {
    input: [[9, 6, 4, 2, 3, 5, 7, 0, 1]],
    expected: 8
  },
  {
    input: [[0]],
    expected: 1
  },
  {
    input: [[1]],
    expected: 0
  },
  {
    input: [[1, 2, 3, 4, 5]],
    expected: 0
  },
  {
    input: [[0, 1, 2, 3, 4]],
    expected: 5
  },
  {
    input: [[2, 0]],
    expected: 1
  },
  // Larger sequential array missing a middle value
  {
    input: [[0, 1, 2, 3, 4, 5, 6, 7, 9, 10]],
    expected: 8
  },
  // All elements present except 0 (boundary: missing is 0)
  {
    input: [[3, 1, 2]],
    expected: 0
  },
  // Missing the last number (n)
  {
    input: [[0, 1, 2, 3, 4, 5, 6, 7, 8]],
    expected: 9
  },
  // Single element [0], missing 1
  {
    input: [[0]],
    expected: 1
  }
];