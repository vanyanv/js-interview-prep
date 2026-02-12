/*
Problem: Product of Array Except Self
Difficulty: Medium
Category: Array, Prefix Sum, Math
LeetCode: #238
Pattern: Prefix/Suffix Product + Two-Pass Algorithm
Mixed Patterns: Prefix Sum + Mathematical Properties + Space Optimization

Given an integer array nums, return an array answer such that answer[i] is equal
to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operator.

Example 1:
  Input: nums = [1,2,3,4]
  Output: [24,12,8,6]
  Explanation: [2*3*4, 1*3*4, 1*2*4, 1*2*3]

Example 2:
  Input: nums = [-1,1,0,-3,3]
  Output: [0,0,9,0,0]
  Explanation: Product contains zero, so most results are zero.

Example 3:
  Input: nums = [2,3,4,5]
  Output: [60,40,30,24]

Example 4:
  Input: nums = [1,0]
  Output: [0,1]

Constraints:
  - 2 <= nums.length <= 10^5
  - -30 <= nums[i] <= 30
  - The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer

Time Complexity: O(n) where n is length of array
Space Complexity: O(1) extra space (not counting output array)

Pattern Notes:
  - Two-pass algorithm: left products, then right products
  - Left pass: Store product of all elements to the left
  - Right pass: Multiply by product of all elements to the right
  - Handle zeros carefully - they propagate through products
  - Cannot use division due to zero handling and problem constraints

Interview Notes:
  - Follow-up: What if division was allowed? (total product / current element)
  - Follow-up: Handle overflow for very large products
  - Follow-up: Optimize space usage (constant extra space)
  - Common mistake: Not handling zeros correctly
*/

export const functionName = 'productExceptSelf';

export const tests = [
  {
    input: [[1,2,3,4]],
    expected: [24,12,8,6]
  },
  {
    input: [[-1,1,0,-3,3]],
    expected: [0,0,9,0,0]
  },
  {
    input: [[2,3,4,5]],
    expected: [60,40,30,24]
  },
  {
    input: [[1,0]],
    expected: [0,1]
  },
  {
    input: [[0,0]],
    expected: [0,0]
  },
  {
    input: [[1,2]],
    expected: [2,1]
  },
  {
    input: [[-1,-2,-3]],
    expected: [6,3,2]
  },
  {
    input: [[5,0,3,0,2]],
    expected: [0,0,0,0,0]
  }
];

/**
 * Calculates product of array except self using two-pass approach
 * @param {number[]} nums - Array of integers
 * @return {number[]} Array where result[i] = product of all nums except nums[i]
 */
function productExceptSelf(nums) {
    const n = nums.length;
    const result = new Array(n);

    // First pass: calculate left products
    result[0] = 1;
    for (let i = 1; i < n; i++) {
        result[i] = result[i - 1] * nums[i - 1];
    }

    // Second pass: calculate right products and combine
    let rightProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        result[i] *= rightProduct;
        rightProduct *= nums[i];
    }

    return result;
}

/**
 * Alternative: Using separate left and right arrays (easier to understand)
 * @param {number[]} nums - Array of integers
 * @return {number[]} Array of products except self
 */
function productExceptSelfTwoArrays(nums) {
    const n = nums.length;
    const left = new Array(n);
    const right = new Array(n);
    const result = new Array(n);

    // Calculate left products
    left[0] = 1;
    for (let i = 1; i < n; i++) {
        left[i] = left[i - 1] * nums[i - 1];
    }

    // Calculate right products
    right[n - 1] = 1;
    for (let i = n - 2; i >= 0; i--) {
        right[i] = right[i + 1] * nums[i + 1];
    }

    // Combine left and right products
    for (let i = 0; i < n; i++) {
        result[i] = left[i] * right[i];
    }

    return result;
}

/**
 * Alternative: Division approach (when allowed and no zeros)
 * @param {number[]} nums - Array of integers (no zeros)
 * @return {number[]} Array of products except self
 */
function productExceptSelfDivision(nums) {
    // Calculate total product
    let totalProduct = 1;
    for (const num of nums) {
        totalProduct *= num;
    }

    // Divide total by each element
    return nums.map(num => totalProduct / num);
}

/**
 * Alternative: Handle division with zeros
 * @param {number[]} nums - Array of integers
 * @return {number[]} Array of products except self
 */
function productExceptSelfDivisionWithZeros(nums) {
    let zeroCount = 0;
    let productWithoutZeros = 1;

    // Count zeros and calculate product of non-zeros
    for (const num of nums) {
        if (num === 0) {
            zeroCount++;
        } else {
            productWithoutZeros *= num;
        }
    }

    const result = new Array(nums.length);

    for (let i = 0; i < nums.length; i++) {
        if (zeroCount > 1) {
            // Multiple zeros - all results are 0
            result[i] = 0;
        } else if (zeroCount === 1) {
            // One zero - only that position gets the product
            result[i] = nums[i] === 0 ? productWithoutZeros : 0;
        } else {
            // No zeros - regular division
            result[i] = productWithoutZeros / nums[i];
        }
    }

    return result;
}

/**
 * Extended: Product except self with modulo
 * @param {number[]} nums - Array of integers
 * @param {number} mod - Modulo value
 * @return {number[]} Array of products modulo mod
 */
function productExceptSelfMod(nums, mod) {
    const n = nums.length;
    const result = new Array(n);

    // Calculate modular multiplicative inverse if needed
    function modInverse(a, m) {
        // Extended Euclidean Algorithm for modular inverse
        function extendedGCD(a, b) {
            if (a === 0) return [b, 0, 1];
            const [gcd, x1, y1] = extendedGCD(b % a, a);
            const x = y1 - Math.floor(b / a) * x1;
            const y = x1;
            return [gcd, x, y];
        }

        const [gcd, x] = extendedGCD(a % m, m);
        return gcd === 1 ? ((x % m) + m) % m : -1;
    }

    // First pass: left products
    result[0] = 1;
    for (let i = 1; i < n; i++) {
        result[i] = (result[i - 1] * nums[i - 1]) % mod;
    }

    // Second pass: right products
    let rightProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        result[i] = (result[i] * rightProduct) % mod;
        rightProduct = (rightProduct * nums[i]) % mod;
    }

    return result;
}

/**
 * Extended: Product except self for very large numbers (BigInt)
 * @param {BigInt[]} nums - Array of BigInt numbers
 * @return {BigInt[]} Array of products except self
 */
function productExceptSelfBigInt(nums) {
    const n = nums.length;
    const result = new Array(n);

    // First pass: left products
    result[0] = 1n;
    for (let i = 1; i < n; i++) {
        result[i] = result[i - 1] * nums[i - 1];
    }

    // Second pass: right products
    let rightProduct = 1n;
    for (let i = n - 1; i >= 0; i--) {
        result[i] *= rightProduct;
        rightProduct *= nums[i];
    }

    return result;
}

/**
 * Extended: Product except self with statistics
 * @param {number[]} nums - Array of integers
 * @return {Object} Result with statistics
 */
function productExceptSelfWithStats(nums) {
    const result = productExceptSelf([...nums]);

    let zeroCount = 0;
    let negativeCount = 0;
    let maxProduct = -Infinity;
    let minProduct = Infinity;

    for (const num of nums) {
        if (num === 0) zeroCount++;
        if (num < 0) negativeCount++;
    }

    for (const product of result) {
        maxProduct = Math.max(maxProduct, product);
        minProduct = Math.min(minProduct, product);
    }

    return {
        result,
        stats: {
            zeroCount,
            negativeCount,
            maxProduct,
            minProduct,
            allPositive: result.every(x => x >= 0),
            hasZeros: result.includes(0)
        }
    };
}

export default productExceptSelf;