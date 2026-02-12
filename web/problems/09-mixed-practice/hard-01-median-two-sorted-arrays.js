/*
Problem: Median of Two Sorted Arrays
Difficulty: Hard
Category: Array, Binary Search, Divide and Conquer
LeetCode: #4
Pattern: Binary Search + Array Partitioning + Mathematical Logic
Mixed Patterns: Binary Search + Two Pointers + Divide and Conquer + Edge Case Handling

Given two sorted arrays nums1 and nums2 of size m and n respectively, return
the median of the two arrays.

The overall run time complexity should be O(log (m+n)).

Example 1:
  Input: nums1 = [1,3], nums2 = [2]
  Output: 2.00000
  Explanation: merged array = [1,2,3] and median is 2.

Example 2:
  Input: nums1 = [1,2], nums2 = [3,4]
  Output: 2.50000
  Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.

Example 3:
  Input: nums1 = [0,0], nums2 = [0,0]
  Output: 0.00000

Example 4:
  Input: nums1 = [], nums2 = [1]
  Output: 1.00000

Example 5:
  Input: nums1 = [2], nums2 = []
  Output: 2.00000

Constraints:
  - nums1.length == m
  - nums2.length == n
  - 0 <= m <= 1000
  - 0 <= n <= 1000
  - 1 <= m + n <= 2000
  - -10^6 <= nums1[i], nums2[i] <= 10^6

Time Complexity: O(log(min(m, n)))
Space Complexity: O(1)

Pattern Notes:
  - Binary search on smaller array for optimal partitioning
  - Partition both arrays such that left half ≤ right half
  - Key insight: median is average of max(left) and min(right)
  - Handle odd/even total length cases
  - Critical edge cases: empty arrays, unequal partitions

Interview Notes:
  - Follow-up: What if arrays aren't sorted?
  - Follow-up: Find kth element in merged arrays
  - Follow-up: Multiple arrays instead of two
  - Common mistakes: Wrong partition validation, edge case handling
*/

export const functionName = 'findMedianSortedArrays';

export const tests = [
  {
    input: [[1,3], [2]],
    expected: 2.0
  },
  {
    input: [[1,2], [3,4]],
    expected: 2.5
  },
  {
    input: [[0,0], [0,0]],
    expected: 0.0
  },
  {
    input: [[], [1]],
    expected: 1.0
  },
  {
    input: [[2], []],
    expected: 2.0
  },
  {
    input: [[1,2,3,4,5], [6,7,8,9,10]],
    expected: 5.5
  },
  {
    input: [[1,3,8,9,15], [7,11,18,19,21,25]],
    expected: 11.0
  }
];

/**
 * Finds median of two sorted arrays using binary search
 * @param {number[]} nums1 - First sorted array
 * @param {number[]} nums2 - Second sorted array
 * @return {number} Median of combined arrays
 */
function findMedianSortedArrays(nums1, nums2) {
    // Ensure nums1 is smaller for optimization
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
    }

    const m = nums1.length;
    const n = nums2.length;
    const halfLength = Math.floor((m + n + 1) / 2);

    let left = 0;
    let right = m;

    while (left <= right) {
        const partition1 = Math.floor((left + right) / 2);
        const partition2 = halfLength - partition1;

        // Elements just before and after partition in both arrays
        const maxLeft1 = partition1 === 0 ? -Infinity : nums1[partition1 - 1];
        const minRight1 = partition1 === m ? Infinity : nums1[partition1];

        const maxLeft2 = partition2 === 0 ? -Infinity : nums2[partition2 - 1];
        const minRight2 = partition2 === n ? Infinity : nums2[partition2];

        // Check if partition is correct
        if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
            // Found correct partition
            if ((m + n) % 2 === 1) {
                // Odd total length
                return Math.max(maxLeft1, maxLeft2);
            } else {
                // Even total length
                return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2;
            }
        } else if (maxLeft1 > minRight2) {
            // Partition1 is too large, move left
            right = partition1 - 1;
        } else {
            // Partition1 is too small, move right
            left = partition1 + 1;
        }
    }

    throw new Error("Input arrays are not sorted");
}

/**
 * Alternative: Merge approach (O(m+n) time, simpler to understand)
 * @param {number[]} nums1 - First sorted array
 * @param {number[]} nums2 - Second sorted array
 * @return {number} Median of combined arrays
 */
function findMedianSortedArraysMerge(nums1, nums2) {
    const merged = [];
    let i = 0, j = 0;

    // Merge arrays
    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] <= nums2[j]) {
            merged.push(nums1[i++]);
        } else {
            merged.push(nums2[j++]);
        }
    }

    // Add remaining elements
    while (i < nums1.length) merged.push(nums1[i++]);
    while (j < nums2.length) merged.push(nums2[j++]);

    const total = merged.length;
    if (total % 2 === 1) {
        return merged[Math.floor(total / 2)];
    } else {
        const mid = total / 2;
        return (merged[mid - 1] + merged[mid]) / 2;
    }
}

/**
 * Alternative: Optimized merge (only find median elements)
 * @param {number[]} nums1 - First sorted array
 * @param {number[]} nums2 - Second sorted array
 * @return {number} Median of combined arrays
 */
function findMedianOptimizedMerge(nums1, nums2) {
    const total = nums1.length + nums2.length;
    const isOdd = total % 2 === 1;
    const targetIndex = Math.floor(total / 2);

    let i = 0, j = 0, count = 0;
    let prev = 0, curr = 0;

    while (count <= targetIndex) {
        prev = curr;

        if (i < nums1.length && (j >= nums2.length || nums1[i] <= nums2[j])) {
            curr = nums1[i++];
        } else {
            curr = nums2[j++];
        }

        count++;
    }

    return isOdd ? curr : (prev + curr) / 2;
}

/**
 * Extended: Find kth element in two sorted arrays
 * @param {number[]} nums1 - First sorted array
 * @param {number[]} nums2 - Second sorted array
 * @param {number} k - Position (1-indexed)
 * @return {number} Kth element in merged arrays
 */
function findKthElement(nums1, nums2, k) {
    // Ensure nums1 is smaller
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
    }

    const m = nums1.length;
    const n = nums2.length;

    if (k > m + n) return null;

    let left = Math.max(0, k - n);
    let right = Math.min(k, m);

    while (left <= right) {
        const cut1 = Math.floor((left + right) / 2);
        const cut2 = k - cut1;

        const left1 = cut1 === 0 ? -Infinity : nums1[cut1 - 1];
        const left2 = cut2 === 0 ? -Infinity : nums2[cut2 - 1];

        const right1 = cut1 === m ? Infinity : nums1[cut1];
        const right2 = cut2 === n ? Infinity : nums2[cut2];

        if (left1 <= right2 && left2 <= right1) {
            return Math.max(left1, left2);
        } else if (left1 > right2) {
            right = cut1 - 1;
        } else {
            left = cut1 + 1;
        }
    }

    return null;
}

/**
 * Extended: Median of multiple sorted arrays
 * @param {number[][]} arrays - Array of sorted arrays
 * @return {number} Median of all elements
 */
function findMedianMultipleArrays(arrays) {
    // Merge all arrays first (can be optimized with priority queue)
    const merged = [];

    for (const arr of arrays) {
        merged.push(...arr);
    }

    merged.sort((a, b) => a - b);

    const total = merged.length;
    if (total === 0) return 0;

    if (total % 2 === 1) {
        return merged[Math.floor(total / 2)];
    } else {
        const mid = total / 2;
        return (merged[mid - 1] + merged[mid]) / 2;
    }
}

/**
 * Extended: Binary search solution with detailed steps
 * @param {number[]} nums1 - First sorted array
 * @param {number[]} nums2 - Second sorted array
 * @return {Object} Median with step-by-step breakdown
 */
function findMedianWithSteps(nums1, nums2) {
    const steps = [];

    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
        steps.push("Swapped arrays to ensure nums1 is smaller");
    }

    const m = nums1.length;
    const n = nums2.length;
    const halfLength = Math.floor((m + n + 1) / 2);

    let left = 0;
    let right = m;
    let iterations = 0;

    while (left <= right) {
        iterations++;
        const partition1 = Math.floor((left + right) / 2);
        const partition2 = halfLength - partition1;

        const maxLeft1 = partition1 === 0 ? -Infinity : nums1[partition1 - 1];
        const minRight1 = partition1 === m ? Infinity : nums1[partition1];
        const maxLeft2 = partition2 === 0 ? -Infinity : nums2[partition2 - 1];
        const minRight2 = partition2 === n ? Infinity : nums2[partition2];

        steps.push({
            iteration: iterations,
            partition1,
            partition2,
            maxLeft1,
            minRight1,
            maxLeft2,
            minRight2,
            validPartition: maxLeft1 <= minRight2 && maxLeft2 <= minRight1
        });

        if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
            const median = (m + n) % 2 === 1 ?
                Math.max(maxLeft1, maxLeft2) :
                (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2;

            return {
                median,
                steps,
                totalIterations: iterations,
                timeComplexity: `O(log(min(${m}, ${n})))`
            };
        } else if (maxLeft1 > minRight2) {
            right = partition1 - 1;
        } else {
            left = partition1 + 1;
        }
    }

    return { median: null, steps, error: "Invalid input" };
}

export default findMedianSortedArrays;