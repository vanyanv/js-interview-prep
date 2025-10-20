/**
 * Removes all occurrences of val from nums in-place
 * @param {number[]} nums - Array to modify
 * @param {number} val - Value to remove
 * @return {number} Number of elements in nums which are not equal to val
 */
export function removeElement(nums, val) {
    let slow = 0; // Pointer for next position to place valid element

    // Fast pointer scans through array
    for (let fast = 0; fast < nums.length; fast++) {
        // If current element is not the value to remove
        if (nums[fast] !== val) {
            nums[slow] = nums[fast];
            slow++;
        }
    }

    return slow;
}

/**
 * Alternative: Remove from end approach (when order doesn't matter)
 * @param {number[]} nums - Array to modify
 * @param {number} val - Value to remove
 * @return {number} Number of elements in nums which are not equal to val
 */
export function removeElementFromEnd(nums, val) {
    let i = 0;
    let n = nums.length;

    while (i < n) {
        if (nums[i] === val) {
            // Replace current element with last element and reduce array size
            nums[i] = nums[n - 1];
            n--;
        } else {
            i++;
        }
    }

    return n;
}

/**
 * Alternative: Using filter (creates new array - not in-place)
 * @param {number[]} nums - Array to filter
 * @param {number} val - Value to remove
 * @return {number[]} New array without val elements
 */
export function removeElementFilter(nums, val) {
    return nums.filter(num => num !== val);
}

/**
 * Alternative: Two pointers with swap
 * @param {number[]} nums - Array to modify
 * @param {number} val - Value to remove
 * @return {number} Number of elements in nums which are not equal to val
 */
export function removeElementSwap(nums, val) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        if (nums[left] === val) {
            // Swap with element from right
            [nums[left], nums[right]] = [nums[right], nums[left]];
            right--;
        } else {
            left++;
        }
    }

    return left;
}