/**
 * Returns squares of sorted array elements, sorted in non-decreasing order
 * @param {number[]} nums - Sorted array of integers
 * @return {number[]} Array of squares sorted in non-decreasing order
 */
export function sortedSquares(nums) {
    const n = nums.length;
    const result = new Array(n);
    let left = 0;
    let right = n - 1;
    let position = n - 1; // Fill result array from right to left

    while (left <= right) {
        const leftSquare = nums[left] * nums[left];
        const rightSquare = nums[right] * nums[right];

        // Place the larger square at current position
        if (leftSquare > rightSquare) {
            result[position] = leftSquare;
            left++;
        } else {
            result[position] = rightSquare;
            right--;
        }
        position--;
    }

    return result;
}

/**
 * Alternative: Square first, then sort (less efficient)
 * @param {number[]} nums - Sorted array of integers
 * @return {number[]} Array of squares sorted in non-decreasing order
 */
export function sortedSquaresBruteForce(nums) {
    const squares = nums.map(num => num * num);
    return squares.sort((a, b) => a - b);
}

/**
 * Alternative: Find pivot point and merge
 * @param {number[]} nums - Sorted array of integers
 * @return {number[]} Array of squares sorted in non-decreasing order
 */
export function sortedSquaresPivot(nums) {
    const n = nums.length;

    // Find the pivot point where numbers change from negative to positive
    let pivot = 0;
    while (pivot < n && nums[pivot] < 0) {
        pivot++;
    }

    // If all numbers are negative
    if (pivot === n) {
        return nums.map(num => num * num).reverse();
    }

    // If all numbers are non-negative
    if (pivot === 0) {
        return nums.map(num => num * num);
    }

    // Merge squares of negative and positive parts
    const result = [];
    let left = pivot - 1; // Last negative number
    let right = pivot;    // First non-negative number

    while (left >= 0 && right < n) {
        const leftSquare = nums[left] * nums[left];
        const rightSquare = nums[right] * nums[right];

        if (leftSquare < rightSquare) {
            result.push(leftSquare);
            left--;
        } else {
            result.push(rightSquare);
            right++;
        }
    }

    // Add remaining squares
    while (left >= 0) {
        result.push(nums[left] * nums[left]);
        left--;
    }

    while (right < n) {
        result.push(nums[right] * nums[right]);
        right++;
    }

    return result;
}

/**
 * Alternative: Using absolute values for comparison
 * @param {number[]} nums - Sorted array of integers
 * @return {number[]} Array of squares sorted in non-decreasing order
 */
export function sortedSquaresAbsValue(nums) {
    const n = nums.length;
    const result = new Array(n);
    let left = 0;
    let right = n - 1;

    for (let i = n - 1; i >= 0; i--) {
        // Compare absolute values
        if (Math.abs(nums[left]) > Math.abs(nums[right])) {
            result[i] = nums[left] * nums[left];
            left++;
        } else {
            result[i] = nums[right] * nums[right];
            right--;
        }
    }

    return result;
}