/*
Problem: Minimum Difference Between Highest and Lowest of K Scores
Difficulty: Easy
Category: Array, Sliding Window
LeetCode: #1984
Pattern: Fixed Window Sliding Window

You are given a 0-indexed integer array nums, where nums[i] represents the score of the ith
student. You are also given an integer k.

Pick the scores of any k students from the array so that the difference between the highest
and the lowest of the k scores is minimized.

Return the minimum possible difference.

Example 1:
  Input: nums = [90], k = 1
  Output: 0
  Explanation: There is one way to pick score(s) of one student: [90]. The difference is 90 - 90 = 0.

Example 2:
  Input: nums = [9, 4, 1, 7], k = 2
  Output: 2
  Explanation: After sorting: [1, 4, 7, 9]. Pick [7, 9], difference = 9 - 7 = 2.

Example 3:
  Input: nums = [87, 68, 92, 67, 72, 53], k = 3
  Output: 5
  Explanation: After sorting: [53, 67, 68, 72, 87, 92]. Pick [67, 68, 72], difference = 72 - 67 = 5.

Constraints:
  - 1 <= k <= nums.length <= 1000
  - 0 <= nums[i] <= 10^5

Time Complexity: O(n log n) — dominated by sorting
Space Complexity: O(1) — or O(n) depending on sort implementation

Pattern Notes:
  - Sort the array first so that elements close in value are adjacent
  - After sorting, any k consecutive elements form a valid group with minimum possible spread
  - Use a sliding window of size k over the sorted array
  - The difference in each window is nums[i + k - 1] - nums[i]
  - Track the minimum difference across all windows
*/

export const functionName = 'minimumDifference';

export const tests = [
  {
    // Single element, difference is always 0
    input: [[90], 1],
    expected: 0
  },
  {
    // Sorted: [1,4,7,9]. Windows of size 2: 4-1=3, 7-4=3, 9-7=2 -> min=2
    input: [[9, 4, 1, 7], 2],
    expected: 2
  },
  {
    // Sorted: [53,67,68,72,87,92]. Windows of size 3: 68-53=15, 72-67=5, 87-68=19, 92-72=20 -> min=5
    input: [[87, 68, 92, 67, 72, 53], 3],
    expected: 5
  },
  {
    // k=1 -> difference is always 0
    input: [[5, 3, 8, 1], 1],
    expected: 0
  },
  {
    // k = array length. Sorted: [1,3,5,8]. Only one window: 8-1=7
    input: [[5, 3, 8, 1], 4],
    expected: 7
  },
  {
    // All same values -> difference is 0
    input: [[5, 5, 5, 5, 5], 3],
    expected: 0
  },
  {
    // Sorted: [1,2,3,4,5]. Windows of size 2: 2-1=1, 3-2=1, 4-3=1, 5-4=1 -> min=1
    input: [[1, 2, 3, 4, 5], 2],
    expected: 1
  },
  {
    // Sorted: [1,100]. Only window: 100-1=99
    input: [[100, 1], 2],
    expected: 99
  },
  {
    // Sorted: [0,0,0,1,100000]. Windows of size 3: 0-0=0, 1-0=1, 100000-0=100000 -> min=0
    input: [[100000, 0, 0, 0, 1], 3],
    expected: 0
  },
  {
    // Sorted: [2,4,6,8,10]. Windows of size 3: 6-2=4, 8-4=4, 10-6=4 -> min=4
    input: [[10, 2, 8, 4, 6], 3],
    expected: 4
  },
  {
    // Sorted: [1,3,5,7,9,11]. Windows of size 4: 7-1=6, 9-3=6, 11-5=6 -> min=6
    input: [[11, 9, 7, 5, 3, 1], 4],
    expected: 6
  },
  {
    // Sorted: [1,1,3,5,5]. Windows of size 2: 1-1=0, 3-1=2, 5-3=2, 5-5=0 -> min=0
    input: [[5, 1, 5, 3, 1], 2],
    expected: 0
  },
];

/**
 * Returns the minimum difference between highest and lowest of k scores
 * @param {number[]} nums - Array of student scores
 * @param {number} k - Number of students to pick
 * @return {number} Minimum possible difference
 */
function minimumDifference(nums, k) {
    if (k === 1) return 0;

    nums.sort((a, b) => a - b);

    let minDiff = Infinity;

    // Slide a window of size k over the sorted array
    for (let i = 0; i <= nums.length - k; i++) {
        const diff = nums[i + k - 1] - nums[i];
        minDiff = Math.min(minDiff, diff);
    }

    return minDiff;
}

export default minimumDifference;
