/*
Problem: Sliding Window Maximum Advanced
Difficulty: Hard
Category: Array, Queue, Sliding Window, Heap, Deque
LeetCode: #239 (Enhanced)
Pattern: Sliding Window + Deque + Multiple Optimization Approaches
Mixed Patterns: Sliding Window + Monotonic Deque + Heap + Segment Tree

You are given an array of integers nums, there is a sliding window of size k
which is moving from the very left of the array to the very right. You can
only see the k numbers in the window. Each time the sliding window moves
right by one position.

Return the max sliding window.

Enhanced features:
- Support for different window operations (min, max, sum, avg)
- Multiple query processing
- Range update support

Example 1:
  Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
  Output: [3,3,5,5,6,7]
  Explanation:
  Window position                Max
  ---------------               -----
  [1  3  -1] -3  5  3  6  7       3
   1 [3  -1  -3] 5  3  6  7       3
   1  3 [-1  -3  5] 3  6  7       5
   1  3  -1 [-3  5  3] 6  7       5
   1  3  -1  -3 [5  3  6] 7       6
   1  3  -1  -3  5 [3  6  7]      7

Example 2:
  Input: nums = [1], k = 1
  Output: [1]

Example 3:
  Input: nums = [1,-1], k = 1
  Output: [1,-1]

Constraints:
  - 1 <= nums.length <= 10^5
  - -10^4 <= nums[i] <= 10^4
  - 1 <= k <= nums.length

Time Complexity: O(n) for deque approach, O(n log k) for heap approach
Space Complexity: O(k) for window storage

Pattern Notes:
  - Monotonic deque maintains decreasing order for maximum queries
  - Remove elements outside current window from front
  - Remove smaller elements from back before adding new element
  - Multiple approaches: deque, heap, segment tree, sparse table
  - Deque approach is optimal for single-pass processing

Interview Notes:
  - Follow-up: Support for minimum sliding window
  - Follow-up: Multiple simultaneous queries (min, max, sum)
  - Follow-up: Dynamic window size changes
  - Follow-up: 2D sliding window maximum
*/

export const functionName = 'maxSlidingWindow';

export const tests = [
  {
    input: [[1,3,-1,-3,5,3,6,7], 3],
    expected: [3,3,5,5,6,7]
  },
  {
    input: [[1], 1],
    expected: [1]
  },
  {
    input: [[1,-1], 1],
    expected: [1,-1]
  },
  {
    input: [[9,11], 2],
    expected: [11]
  },
  {
    input: [[4,-2], 2],
    expected: [4]
  },
  {
    input: [[1,3,1,2,0,5], 3],
    expected: [3,3,2,5]
  }
];

/**
 * Finds maximum in sliding windows using monotonic deque
 * @param {number[]} nums - Array of integers
 * @param {number} k - Window size
 * @return {number[]} Array of window maximums
 */
function maxSlidingWindow(nums, k) {
    if (!nums || nums.length === 0 || k <= 0) return [];
    if (k === 1) return nums;

    const result = [];
    const deque = []; // Store indices, maintaining decreasing order of values

    for (let i = 0; i < nums.length; i++) {
        // Remove indices outside current window
        while (deque.length > 0 && deque[0] < i - k + 1) {
            deque.shift();
        }

        // Remove smaller elements from back
        while (deque.length > 0 && nums[deque[deque.length - 1]] <= nums[i]) {
            deque.pop();
        }

        deque.push(i);

        // Add maximum to result once window is fully formed
        if (i >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }

    return result;
}

/**
 * Alternative: Using max heap approach
 * @param {number[]} nums - Array of integers
 * @param {number} k - Window size
 * @return {number[]} Array of window maximums
 */
function maxSlidingWindowHeap(nums, k) {
    if (!nums || nums.length === 0 || k <= 0) return [];

    const result = [];
    const heap = new MaxHeap();

    // Initialize heap with first window
    for (let i = 0; i < k; i++) {
        heap.insert([nums[i], i]);
    }

    result.push(heap.peek()[0]);

    // Process remaining elements
    for (let i = k; i < nums.length; i++) {
        heap.insert([nums[i], i]);

        // Remove elements outside current window
        while (heap.size() > 0 && heap.peek()[1] <= i - k) {
            heap.extractMax();
        }

        result.push(heap.peek()[0]);
    }

    return result;
}

/**
 * Advanced sliding window processor supporting multiple operations
 */
class SlidingWindowProcessor {
    constructor(nums, k) {
        this.nums = nums;
        this.k = k;
        this.maxDeque = [];
        this.minDeque = [];
        this.sum = 0;
    }

    /**
     * Processes all windows and returns comprehensive statistics
     * @return {Object} Object containing max, min, sum, and avg arrays
     */
    processAllWindows() {
        const maxResults = [];
        const minResults = [];
        const sumResults = [];
        const avgResults = [];

        // Initialize first window
        for (let i = 0; i < this.k && i < this.nums.length; i++) {
            this.addElement(i);
        }

        if (this.nums.length >= this.k) {
            maxResults.push(this.getMax());
            minResults.push(this.getMin());
            sumResults.push(this.sum);
            avgResults.push(this.sum / this.k);
        }

        // Process remaining elements
        for (let i = this.k; i < this.nums.length; i++) {
            this.removeElement(i - this.k);
            this.addElement(i);

            maxResults.push(this.getMax());
            minResults.push(this.getMin());
            sumResults.push(this.sum);
            avgResults.push(this.sum / this.k);
        }

        return {
            max: maxResults,
            min: minResults,
            sum: sumResults,
            avg: avgResults
        };
    }

    addElement(index) {
        const value = this.nums[index];
        this.sum += value;

        // Maintain max deque (decreasing order)
        while (this.maxDeque.length > 0 &&
               this.nums[this.maxDeque[this.maxDeque.length - 1]] <= value) {
            this.maxDeque.pop();
        }
        this.maxDeque.push(index);

        // Maintain min deque (increasing order)
        while (this.minDeque.length > 0 &&
               this.nums[this.minDeque[this.minDeque.length - 1]] >= value) {
            this.minDeque.pop();
        }
        this.minDeque.push(index);
    }

    removeElement(index) {
        this.sum -= this.nums[index];

        if (this.maxDeque.length > 0 && this.maxDeque[0] === index) {
            this.maxDeque.shift();
        }

        if (this.minDeque.length > 0 && this.minDeque[0] === index) {
            this.minDeque.shift();
        }
    }

    getMax() {
        return this.maxDeque.length > 0 ? this.nums[this.maxDeque[0]] : 0;
    }

    getMin() {
        return this.minDeque.length > 0 ? this.nums[this.minDeque[0]] : 0;
    }
}

/**
 * Max heap implementation for sliding window
 */
class MaxHeap {
    constructor() {
        this.heap = [];
    }

    insert(element) {
        this.heap.push(element);
        this.heapifyUp(this.heap.length - 1);
    }

    extractMax() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return max;
    }

    peek() {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

    size() {
        return this.heap.length;
    }

    heapifyUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index][0] <= this.heap[parentIndex][0]) break;

            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }

    heapifyDown(index) {
        while (true) {
            let largest = index;
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;

            if (leftChild < this.heap.length &&
                this.heap[leftChild][0] > this.heap[largest][0]) {
                largest = leftChild;
            }

            if (rightChild < this.heap.length &&
                this.heap[rightChild][0] > this.heap[largest][0]) {
                largest = rightChild;
            }

            if (largest === index) break;

            [this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]];
            index = largest;
        }
    }
}

/**
 * Extended: 2D sliding window maximum
 * @param {number[][]} matrix - 2D matrix
 * @param {number} k - Window size (k x k)
 * @return {number[][]} Matrix of window maximums
 */
function maxSlidingWindow2D(matrix, k) {
    if (!matrix || matrix.length === 0 || k <= 0) return [];

    const m = matrix.length;
    const n = matrix[0].length;
    const result = [];

    for (let i = 0; i <= m - k; i++) {
        const row = [];
        for (let j = 0; j <= n - k; j++) {
            let max = -Infinity;

            // Find max in k x k window
            for (let x = i; x < i + k; x++) {
                for (let y = j; y < j + k; y++) {
                    max = Math.max(max, matrix[x][y]);
                }
            }

            row.push(max);
        }
        result.push(row);
    }

    return result;
}

/**
 * Extended: Dynamic window size support
 * @param {number[]} nums - Array of integers
 * @param {number[]} windowSizes - Array of window sizes for each position
 * @return {number[]} Array of maximums for dynamic windows
 */
function maxSlidingWindowDynamic(nums, windowSizes) {
    const result = [];

    for (let i = 0; i < nums.length; i++) {
        const k = windowSizes[i];
        const start = Math.max(0, i - k + 1);
        const end = i + 1;

        let max = -Infinity;
        for (let j = start; j < end; j++) {
            max = Math.max(max, nums[j]);
        }

        result.push(max);
    }

    return result;
}

/**
 * Extended: Sliding window with custom comparator
 * @param {number[]} nums - Array of integers
 * @param {number} k - Window size
 * @param {Function} compareFn - Custom comparison function
 * @return {number[]} Array of optimal values based on comparator
 */
function slidingWindowCustom(nums, k, compareFn) {
    if (!nums || nums.length === 0 || k <= 0) return [];

    const result = [];
    const deque = [];

    for (let i = 0; i < nums.length; i++) {
        // Remove indices outside window
        while (deque.length > 0 && deque[0] < i - k + 1) {
            deque.shift();
        }

        // Remove elements that don't satisfy custom comparison
        while (deque.length > 0 &&
               compareFn(nums[deque[deque.length - 1]], nums[i]) <= 0) {
            deque.pop();
        }

        deque.push(i);

        if (i >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }

    return result;
}

/**
 * Extended: Batch sliding window queries
 * @param {number[]} nums - Array of integers
 * @param {Array<{start: number, end: number, k: number}>} queries - Batch queries
 * @return {number[][]} Results for each query
 */
function batchSlidingWindowMax(nums, queries) {
    const results = [];

    for (const query of queries) {
        const { start, end, k } = query;
        const subArray = nums.slice(start, end + 1);
        const windowMax = maxSlidingWindow(subArray, k);
        results.push(windowMax);
    }

    return results;
}

export default maxSlidingWindow;