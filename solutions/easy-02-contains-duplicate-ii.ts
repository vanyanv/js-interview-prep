/*
Problem: Contains Duplicate II
Difficulty: Easy
Category: Array, Hash Table, Sliding Window
LeetCode: #219
Pattern: Fixed Window Sliding Window

Given an integer array nums and an integer k, return true if there are two distinct indices i and j in the array such that nums[i] == nums[j] and abs(i - j) <= k.

Example 1:
  Input: nums = [1,2,3,1], k = 3
  Output: true
  Explanation: nums[0] and nums[3] are equal and 3-0 = 3 <= 3.

Example 2:
  Input: nums = [1,0,1,1], k = 1
  Output: true
  Explanation: nums[2] and nums[3] are equal and 3-2 = 1 <= 1.

Example 3:
  Input: nums = [1,2,3,1,2,3], k = 2
  Output: false
  Explanation: No two equal elements are within distance 2.

Example 4:
  Input: nums = [1,2,1], k = 0
  Output: false
  Explanation: Distance must be > 0, but k = 0.

Constraints:
  - 1 <= nums.length <= 10^5
  - -10^9 <= nums[i] <= 10^9
  - 0 <= k <= 10^5

Time Complexity: O(n)
Space Complexity: O(min(n, k))

Pattern Notes:
  - Use a sliding window of size k+1 (to allow distance <= k)
  - Maintain a Set of elements in the current window
  - If we see a duplicate in the current window, return true
  - Slide the window by removing the leftmost element and adding the next element
  - Alternative approach: Use a hash map to store element -> last seen index
*/

export const containsNearbyDuplicate = (nums: number[], k: number): boolean => {
  // if (nums.length < 2) return false;
  // // we will be working with a sliding window

  // // track left index
  // let left = 0;
  // // track right index
  // let right = left;

  // // increment the left index and continue
  // for (let i = left; i < nums.length - k; left++) {
  //   right = left + 1;

  //   // while the difference between indices is less than k + 1,
  //   while (right - left <= k) {
  //     // make comparisons
  //     if (nums[left] === nums[right]) {
  //       // if there's a match, return true
  //       return true;
  //     } else {
  //       // increment the right index
  //       right++;
  //     }
  //   }
  // }

  // // return false
  // return false;

  if (nums.length < 2) return false;

  const windowSet = new Set<number>();
  
  for (let i = 0; i < nums.length; i++) {
    const left = nums[i - k]; //undefined
    const right = nums[i]; //
    if (windowSet.has(right)) return true;
    //adding
    windowSet.add(right);

    //
    if (windowSet.size > k) windowSet.delete(left);
  }

  return false;
};
