/*
Problem: Remove Element
Difficulty: Easy
Category: Arrays, Two Pointers
LeetCode: #27
Pattern: Two Pointers (Same Direction - Fast/Slow)

Given an integer array nums and an integer val, remove all occurrences of
val in nums in-place. The order of the elements may be changed. Then return
the number of elements in nums which are not equal to val.

Consider the number of elements in nums which are not equal to val be k,
to get accepted, you need to do the following things:
- Change the array nums such that the first k elements of nums contain the
  elements which are not equal to val.
- Return k.

Example 1:
  Input: nums = [3,2,2,3], val = 3
  Output: 2, nums = [2,2,_,_]

Example 2:
  first = 2
  second = 4
  Input: nums = [0,1,2,2,3,0,4,2], val = 2
  Output: 5, nums = [0,1,4,0,3,_,_,_]

Constraints:
  - 0 <= nums.length <= 100
  - 0 <= nums[i] <= 50
  - 0 <= val <= 100

Time Complexity: O(n)
Space Complexity: O(1)

Pattern Notes:
 
*/

export const functionName = 'removeElement';

export const removeElement = (nums: (number|string)[], val: number): number => {
  if (nums.length < 2) return 0;

  // two pointers, fast and slow
  let left = 0;
  let right = nums.length -1;

  while (left < right) {
    if (nums[right] === val) {
      nums[right] = "_";
      right--;
    } else {
      if (nums[left] === val) {
        [nums[left], nums[right]] = [nums[right], "_"];
        left++;
        right--;
      } else {
        left++;
      }
    }
  }

  return right + 1;
}

export const tests = [
  {
    input: [[3, 2, 2, 3], 3],
    expected: 2,
  },
  {
    input: [[0, 1, 2, 2, 3, 0, 4, 2], 2],
    expected: 5,
  },
  {
    input: [[1], 1],
    expected: 0,
  },
  {
    input: [[1, 2, 3, 4], 5],
    expected: 4,
  },
  {
    input: [[], 1],
    expected: 0,
  },
];
