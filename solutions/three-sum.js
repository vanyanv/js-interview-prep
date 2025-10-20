/**
 * Finds all unique triplets in array that sum to zero
 * @param {number[]} nums - Array of integers
 * @return {number[][]} Array of triplets that sum to zero
 */
export function threeSum(nums) {
    const result = [];

    // Sort array to enable two pointers technique and skip duplicates
    nums.sort((a, b) => a - b);

    for (let i = 0; i < nums.length - 2; i++) {
        // Skip duplicate values for first element
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        let left = i + 1;
        let right = nums.length - 1;

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];

            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);

                // Skip duplicates for second element
                while (left < right && nums[left] === nums[left + 1]) {
                    left++;
                }

                // Skip duplicates for third element
                while (left < right && nums[right] === nums[right - 1]) {
                    right--;
                }

                left++;
                right--;
            } else if (sum < 0) {
                left++; // Need larger sum
            } else {
                right--; // Need smaller sum
            }
        }
    }

    return result;
}

/**
 * Alternative: Brute force approach (O(n^3) - not optimal)
 * @param {number[]} nums - Array of integers
 * @return {number[][]} Array of triplets that sum to zero
 */
export function threeSumBruteForce(nums) {
    const result = [];
    const seen = new Set();

    for (let i = 0; i < nums.length - 2; i++) {
        for (let j = i + 1; j < nums.length - 1; j++) {
            for (let k = j + 1; k < nums.length; k++) {
                if (nums[i] + nums[j] + nums[k] === 0) {
                    const triplet = [nums[i], nums[j], nums[k]].sort((a, b) => a - b);
                    const tripletStr = triplet.join(',');

                    if (!seen.has(tripletStr)) {
                        seen.add(tripletStr);
                        result.push(triplet);
                    }
                }
            }
        }
    }

    return result;
}

/**
 * Alternative: Using hash set for two sum
 * @param {number[]} nums - Array of integers
 * @return {number[][]} Array of triplets that sum to zero
 */
export function threeSumHashSet(nums) {
    const result = [];
    nums.sort((a, b) => a - b);

    for (let i = 0; i < nums.length - 2; i++) {
        // Skip duplicates for first element
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        const seen = new Set();
        const target = -nums[i];

        for (let j = i + 1; j < nums.length; j++) {
            const complement = target - nums[j];

            if (seen.has(complement)) {
                result.push([nums[i], complement, nums[j]]);

                // Skip duplicates for second element
                while (j + 1 < nums.length && nums[j] === nums[j + 1]) {
                    j++;
                }
            }

            seen.add(nums[j]);
        }
    }

    return result;
}