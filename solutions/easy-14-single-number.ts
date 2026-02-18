/*
Problem: Single Number
Difficulty: Easy
Category: Arrays, Bit Manipulation, Hash Set
LeetCode: #136
Pattern: Set Toggle (Add/Remove)

Given a non-empty array of integers nums, every element appears twice
except for one. Find that single one.

You must implement a solution with a linear runtime complexity and use
only constant extra space.

Example 1:
  Input: nums = [2,2,1]
  Output: 1

Example 2:
  Input: nums = [4,1,2,1,2]
  Output: 4

Example 3:
  Input: nums = [1]
  Output: 1

Example 4:
  Input: nums = [2,1,2]
  Output: 1

Constraints:
  - 1 <= nums.length <= 3 * 10^4
  - -3 * 10^4 <= nums[i] <= 3 * 10^4
  - Each element in the array appears twice except for one element which appears only once.

Time Complexity: O(n)
Space Complexity: O(n) for Set solution, O(1) for XOR solution

Hash Set Pattern Notes:
  - Use Set to toggle elements (add if not present, remove if present)
  - After processing all elements, Set contains only the single number
  - Alternative: XOR all numbers (a ^ a = 0, 0 ^ a = a)
  - Set solution is more intuitive but uses O(n) space
  - XOR solution uses O(1) space but requires bit manipulation knowledge
*/


// nums.reduce((acc, num) => acc ^ num, 0) XOR

// XOR cancels out duplicates (a ^ a = 0), leaving only the single number
export const functionName = 'singleNumber';

export const singleNumber = (nums: number[]): number => {
  //create a map to track vistied numbers and toggle on/off
  const map = new Map<number, number>();
  // iterate through the nums array
  nums.forEach((num) => {
    // check if the num has been visited
    if (map.has(num)) {
      // if so, toggle off (delete)
      map.delete(num);
    // else, add it to the map
    } else {
      map.set(num, num);
    }
  })
  // at the end of iteration, return the only value in the map    
  const answer = map.keys().next().value!;
  return answer;
}

export const tests = [
  {
    input: [[2, 2, 1]],
    expected: 1
  },
  {
    input: [[4, 1, 2, 1, 2]],
    expected: 4
  },
  {
    input: [[1]],
    expected: 1
  },
  {
    input: [[2, 1, 2]],
    expected: 1
  },
  {
    input: [[1, 3, 1, -1, 3]],
    expected: -1
  },
  {
    input: [[-1, 0, -1]],
    expected: 0
  },
  {
    input: [[1, 2, 3, 2, 1]],
    expected: 3
  },
  {
    input: [[5, 7, 5, 4, 7]],
    expected: 4
  }
];