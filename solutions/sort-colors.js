/**
 * Sorts colors (0, 1, 2) in-place using Dutch National Flag algorithm
 * @param {number[]} nums - Array of 0s, 1s, and 2s
 * @return {void} Do not return anything, modify nums in-place instead.
 */
export function sortColors(nums) {
    let left = 0;           // Pointer for placing 0s
    let current = 0;        // Current element being examined
    let right = nums.length - 1;  // Pointer for placing 2s

    while (current <= right) {
        if (nums[current] === 0) {
            // Swap 0 to the left section
            [nums[left], nums[current]] = [nums[current], nums[left]];
            left++;
            current++;
        } else if (nums[current] === 2) {
            // Swap 2 to the right section
            [nums[current], nums[right]] = [nums[right], nums[current]];
            right--;
            // Don't advance current - need to check swapped element
        } else {
            // nums[current] === 1, just move forward
            current++;
        }
    }
}

/**
 * Alternative: Two-pass counting approach
 * @param {number[]} nums - Array of 0s, 1s, and 2s
 * @return {void} Do not return anything, modify nums in-place instead.
 */
export function sortColorsCountingSort(nums) {
    // Count occurrences of each color
    let count0 = 0, count1 = 0, count2 = 0;

    for (let num of nums) {
        if (num === 0) count0++;
        else if (num === 1) count1++;
        else count2++;
    }

    // Fill the array with sorted colors
    let index = 0;

    // Fill 0s
    for (let i = 0; i < count0; i++) {
        nums[index++] = 0;
    }

    // Fill 1s
    for (let i = 0; i < count1; i++) {
        nums[index++] = 1;
    }

    // Fill 2s
    for (let i = 0; i < count2; i++) {
        nums[index++] = 2;
    }
}

/**
 * Alternative: Partition approach (separates 0s, then separates 1s from 2s)
 * @param {number[]} nums - Array of 0s, 1s, and 2s
 * @return {void} Do not return anything, modify nums in-place instead.
 */
export function sortColorsPartition(nums) {
    // First partition: move all 0s to the left
    let j = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) {
            [nums[i], nums[j]] = [nums[j], nums[i]];
            j++;
        }
    }

    // Second partition: move all 1s to the left (after 0s)
    for (let i = j; i < nums.length; i++) {
        if (nums[i] === 1) {
            [nums[i], nums[j]] = [nums[j], nums[i]];
            j++;
        }
    }
    // 2s will naturally be at the end
}

/**
 * Alternative: Recursive approach (not recommended for this problem)
 * @param {number[]} nums - Array of 0s, 1s, and 2s
 * @return {void} Do not return anything, modify nums in-place instead.
 */
export function sortColorsRecursive(nums) {
    function quickSort(arr, low, high) {
        if (low < high) {
            const pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    function partition(arr, low, high) {
        const pivot = arr[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        return i + 1;
    }

    quickSort(nums, 0, nums.length - 1);
}