/**
 * Merges two sorted arrays in-place
 * @param {number[]} nums1 - First sorted array with extra space
 * @param {number} m - Number of elements in nums1
 * @param {number[]} nums2 - Second sorted array
 * @param {number} n - Number of elements in nums2
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
export function merge(nums1, m, nums2, n) {
    // Three pointers approach - work backwards to avoid overwriting
    let p1 = m - 1;      // Pointer for last element in nums1
    let p2 = n - 1;      // Pointer for last element in nums2
    let p = m + n - 1;   // Pointer for last position in merged array

    // Merge from the back to avoid overwriting unprocessed elements
    while (p1 >= 0 && p2 >= 0) {
        if (nums1[p1] > nums2[p2]) {
            nums1[p] = nums1[p1];
            p1--;
        } else {
            nums1[p] = nums2[p2];
            p2--;
        }
        p--;
    }

    // Copy remaining elements from nums2 (if any)
    // No need to copy remaining from nums1 as they're already in place
    while (p2 >= 0) {
        nums1[p] = nums2[p2];
        p2--;
        p--;
    }
}

/**
 * Alternative: Forward merge with auxiliary space
 * @param {number[]} nums1 - First sorted array with extra space
 * @param {number} m - Number of elements in nums1
 * @param {number[]} nums2 - Second sorted array
 * @param {number} n - Number of elements in nums2
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
export function mergeForward(nums1, m, nums2, n) {
    // Create copy of nums1's actual elements
    const nums1Copy = nums1.slice(0, m);

    let p1 = 0; // Pointer for nums1Copy
    let p2 = 0; // Pointer for nums2
    let p = 0;  // Pointer for writing to nums1

    // Compare elements and merge
    while (p1 < m && p2 < n) {
        if (nums1Copy[p1] <= nums2[p2]) {
            nums1[p] = nums1Copy[p1];
            p1++;
        } else {
            nums1[p] = nums2[p2];
            p2++;
        }
        p++;
    }

    // Copy remaining elements
    while (p1 < m) {
        nums1[p] = nums1Copy[p1];
        p1++;
        p++;
    }

    while (p2 < n) {
        nums1[p] = nums2[p2];
        p2++;
        p++;
    }
}

/**
 * Alternative: Using built-in sort (less efficient)
 * @param {number[]} nums1 - First sorted array with extra space
 * @param {number} m - Number of elements in nums1
 * @param {number[]} nums2 - Second sorted array
 * @param {number} n - Number of elements in nums2
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
export function mergeWithSort(nums1, m, nums2, n) {
    // Copy nums2 elements to the end of nums1
    for (let i = 0; i < n; i++) {
        nums1[m + i] = nums2[i];
    }

    // Sort the entire array
    nums1.sort((a, b) => a - b);
}