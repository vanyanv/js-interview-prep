/*
Problem: Merge Intervals
Difficulty: Medium
Category: Array, Sorting, Intervals
LeetCode: #56
Pattern: Interval Processing + Sorting + Merging Logic
Mixed Patterns: Sorting + Greedy + Array Manipulation + Overlap Detection

Given an array of intervals where intervals[i] = [starti, endi], merge all
overlapping intervals, and return an array of the non-overlapping intervals
that cover all the intervals in the input.

Example 1:
  Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
  Output: [[1,6],[8,10],[15,18]]
  Explanation: [1,3] and [2,6] overlap, so merge to [1,6].

Example 2:
  Input: intervals = [[1,4],[4,5]]
  Output: [[1,5]]
  Explanation: [1,4] and [4,5] overlap (touching counts as overlap).

Example 3:
  Input: intervals = [[1,4],[2,3]]
  Output: [[1,4]]
  Explanation: [2,3] is completely contained in [1,4].

Example 4:
  Input: intervals = [[1,3]]
  Output: [[1,3]]

Constraints:
  - 1 <= intervals.length <= 10^4
  - intervals[i].length == 2
  - 0 <= starti <= endi <= 10^4

Time Complexity: O(n log n) due to sorting
Space Complexity: O(1) or O(n) depending on output space counting

Pattern Notes:
  - Sort intervals by start time first
  - Iterate through sorted intervals, merging overlapping ones
  - Two intervals overlap if: start2 <= end1
  - Merge by taking min start and max end
  - Handle edge cases: single interval, no overlaps, complete overlap

Interview Notes:
  - Follow-up: Insert new interval into sorted intervals
  - Follow-up: Find minimum meeting rooms needed
  - Follow-up: Remove covered intervals
  - Follow-up: Find gaps between intervals
*/

export const functionName = 'merge';

export const tests = [
  {
    input: [[[1,3],[2,6],[8,10],[15,18]]],
    expected: [[1,6],[8,10],[15,18]]
  },
  {
    input: [[[1,4],[4,5]]],
    expected: [[1,5]]
  },
  {
    input: [[[1,4],[2,3]]],
    expected: [[1,4]]
  },
  {
    input: [[[1,3]]],
    expected: [[1,3]]
  },
  {
    input: [[[1,4],[0,4]]],
    expected: [[0,4]]
  },
  {
    input: [[[1,4],[0,0]]],
    expected: [[0,0],[1,4]]
  },
  {
    input: [[[2,3],[4,5],[6,7],[8,9],[1,10]]],
    expected: [[1,10]]
  }
];

/**
 * Merges overlapping intervals
 * @param {number[][]} intervals - Array of intervals [start, end]
 * @return {number[][]} Array of merged intervals
 */
function merge(intervals) {
    if (!intervals || intervals.length <= 1) {
        return intervals;
    }

    // Sort intervals by start time
    intervals.sort((a, b) => a[0] - b[0]);

    const merged = [intervals[0]];

    for (let i = 1; i < intervals.length; i++) {
        const current = intervals[i];
        const lastMerged = merged[merged.length - 1];

        // Check if current interval overlaps with last merged interval
        if (current[0] <= lastMerged[1]) {
            // Overlapping - merge by extending the end time
            lastMerged[1] = Math.max(lastMerged[1], current[1]);
        } else {
            // Non-overlapping - add as new interval
            merged.push(current);
        }
    }

    return merged;
}

/**
 * Alternative: Using stack approach
 * @param {number[][]} intervals - Array of intervals
 * @return {number[][]} Array of merged intervals
 */
function mergeStack(intervals) {
    if (!intervals || intervals.length <= 1) return intervals;

    intervals.sort((a, b) => a[0] - b[0]);
    const stack = [];

    for (const interval of intervals) {
        if (stack.length === 0 || stack[stack.length - 1][1] < interval[0]) {
            // No overlap - push new interval
            stack.push(interval);
        } else {
            // Overlap - merge with top of stack
            stack[stack.length - 1][1] = Math.max(stack[stack.length - 1][1], interval[1]);
        }
    }

    return stack;
}

/**
 * Extended: Insert interval into sorted list
 * @param {number[][]} intervals - Sorted array of intervals
 * @param {number[]} newInterval - New interval to insert
 * @return {number[][]} Array with new interval inserted and merged
 */
function insertInterval(intervals, newInterval) {
    const result = [];
    let i = 0;

    // Add all intervals that end before newInterval starts
    while (i < intervals.length && intervals[i][1] < newInterval[0]) {
        result.push(intervals[i]);
        i++;
    }

    // Merge overlapping intervals with newInterval
    while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    result.push(newInterval);

    // Add remaining intervals
    while (i < intervals.length) {
        result.push(intervals[i]);
        i++;
    }

    return result;
}

/**
 * Extended: Find gaps between intervals
 * @param {number[][]} intervals - Array of intervals
 * @return {number[][]} Array of gaps between intervals
 */
function findGaps(intervals) {
    if (!intervals || intervals.length <= 1) return [];

    const merged = merge([...intervals]);
    const gaps = [];

    for (let i = 1; i < merged.length; i++) {
        const prevEnd = merged[i - 1][1];
        const currentStart = merged[i][0];

        if (prevEnd < currentStart) {
            gaps.push([prevEnd, currentStart]);
        }
    }

    return gaps;
}

/**
 * Extended: Remove covered intervals
 * @param {number[][]} intervals - Array of intervals
 * @return {number} Number of remaining intervals after removing covered ones
 */
function removeCoveredIntervals(intervals) {
    // Sort by start time, then by end time in descending order
    intervals.sort((a, b) => a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]);

    let count = 0;
    let prevEnd = 0;

    for (const [start, end] of intervals) {
        // If current interval is not covered by previous
        if (end > prevEnd) {
            count++;
            prevEnd = end;
        }
    }

    return count;
}

/**
 * Extended: Minimum meeting rooms needed
 * @param {number[][]} intervals - Array of meeting intervals
 * @return {number} Minimum number of meeting rooms required
 */
function minMeetingRooms(intervals) {
    if (!intervals || intervals.length === 0) return 0;

    const starts = intervals.map(interval => interval[0]).sort((a, b) => a - b);
    const ends = intervals.map(interval => interval[1]).sort((a, b) => a - b);

    let startPtr = 0, endPtr = 0;
    let usedRooms = 0, maxRooms = 0;

    while (startPtr < intervals.length) {
        if (starts[startPtr] < ends[endPtr]) {
            // Meeting starts before another ends - need new room
            usedRooms++;
            startPtr++;
        } else {
            // Meeting ends before or when another starts - room freed
            usedRooms--;
            endPtr++;
        }

        maxRooms = Math.max(maxRooms, usedRooms);
    }

    return maxRooms;
}

/**
 * Extended: Interval intersection
 * @param {number[][]} firstList - First list of intervals
 * @param {number[][]} secondList - Second list of intervals
 * @return {number[][]} Intersection of the two interval lists
 */
function intervalIntersection(firstList, secondList) {
    const result = [];
    let i = 0, j = 0;

    while (i < firstList.length && j < secondList.length) {
        const [start1, end1] = firstList[i];
        const [start2, end2] = secondList[j];

        // Check for intersection
        const start = Math.max(start1, start2);
        const end = Math.min(end1, end2);

        if (start <= end) {
            result.push([start, end]);
        }

        // Move pointer of interval that ends first
        if (end1 < end2) {
            i++;
        } else {
            j++;
        }
    }

    return result;
}

/**
 * Extended: Merge intervals with statistics
 * @param {number[][]} intervals - Array of intervals
 * @return {Object} Merge result with statistics
 */
function mergeWithStats(intervals) {
    if (!intervals || intervals.length <= 1) {
        return {
            merged: intervals || [],
            stats: {
                originalCount: intervals ? intervals.length : 0,
                mergedCount: intervals ? intervals.length : 0,
                reductionCount: 0,
                totalCoverage: intervals && intervals.length > 0 ?
                    intervals[0][1] - intervals[0][0] : 0
            }
        };
    }

    const originalCount = intervals.length;
    const merged = merge([...intervals]);
    const mergedCount = merged.length;

    const totalCoverage = merged.reduce((sum, [start, end]) => sum + (end - start), 0);

    return {
        merged,
        stats: {
            originalCount,
            mergedCount,
            reductionCount: originalCount - mergedCount,
            reductionPercentage: Math.round(((originalCount - mergedCount) / originalCount) * 100),
            totalCoverage,
            averageIntervalLength: Math.round(totalCoverage / mergedCount * 100) / 100
        }
    };
}

export default merge;