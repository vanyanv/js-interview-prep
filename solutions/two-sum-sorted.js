/**
 * Finds two numbers in a sorted array that add up to target
 * @param {number[]} numbers - Sorted array of numbers (1-indexed in problem description)
 * @param {number} target - Target sum
 * @return {number[]} Array of 1-indexed positions [index1, index2]
 */
export function twoSum(numbers, target) {
    let left = 0;
    let right = numbers.length - 1;

    while (left < right) {
        const sum = numbers[left] + numbers[right];

        if (sum === target) {
            // Return 1-indexed positions as required
            return [left + 1, right + 1];
        } else if (sum < target) {
            // Sum too small, need larger value - move left pointer right
            left++;
        } else {
            // Sum too large, need smaller value - move right pointer left
            right--;
        }
    }

    // Should never reach here given problem constraints guarantee solution exists
    return [-1, -1];
}

/**
 * Alternative: Hash map approach (less efficient for sorted arrays)
 * @param {number[]} numbers - Sorted array of numbers
 * @param {number} target - Target sum
 * @return {number[]} Array of 1-indexed positions [index1, index2]
 */
export function twoSumHashMap(numbers, target) {
    const map = new Map();

    for (let i = 0; i < numbers.length; i++) {
        const complement = target - numbers[i];

        if (map.has(complement)) {
            return [map.get(complement) + 1, i + 1]; // 1-indexed
        }

        map.set(numbers[i], i);
    }

    return [-1, -1];
}

/**
 * Alternative: Binary search approach for each element
 * @param {number[]} numbers - Sorted array of numbers
 * @param {number} target - Target sum
 * @return {number[]} Array of 1-indexed positions [index1, index2]
 */
export function twoSumBinarySearch(numbers, target) {
    for (let i = 0; i < numbers.length - 1; i++) {
        const complement = target - numbers[i];

        // Binary search for complement in remaining array
        let left = i + 1;
        let right = numbers.length - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);

            if (numbers[mid] === complement) {
                return [i + 1, mid + 1]; // 1-indexed
            } else if (numbers[mid] < complement) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }

    return [-1, -1];
}