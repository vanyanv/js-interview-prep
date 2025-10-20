/*
Problem: Time Based Key-Value Store
Difficulty: Medium
Category: Binary Search, Hash Table, String, Design
LeetCode: #981
Pattern: Binary Search with Data Structure Design

Design a time-based key-value data structure that can store multiple values for the same key
at different time stamps and retrieve the key's value at a certain timestamp.

Implement the TimeMap class:
- TimeMap() Initializes the object of the data structure
- void set(String key, String value, int timestamp) Stores the key and value pair at the given time timestamp
- String get(String key, int timestamp) Returns a value such that set was called previously,
  with timestamp_prev <= timestamp. If there are multiple such values, it returns the one with the largest timestamp_prev.
  If there are no values, it returns ""

Example 1:
  Input: ["TimeMap", "set", "get", "get", "set", "get", "get"]
         [[], ["foo", "bar", 1], ["foo", 1], ["foo", 3], ["foo", "bar2", 4], ["foo", 4], ["foo", 5]]
  Output: [null, null, "bar", "bar", null, "bar2", "bar2"]
  Explanation:
    TimeMap timeMap = new TimeMap();
    timeMap.set("foo", "bar", 1);  // store the key "foo" and value "bar" along with timestamp = 1
    timeMap.get("foo", 1);         // return "bar"
    timeMap.get("foo", 3);         // return "bar", since there is no value at timestamp 3 and 2, then the only value is at timestamp 1 is "bar"
    timeMap.set("foo", "bar2", 4); // store the key "foo" and value "bar2" along with timestamp = 4
    timeMap.get("foo", 4);         // return "bar2"
    timeMap.get("foo", 5);         // return "bar2"

Constraints:
  - 1 <= key.length, value.length <= 100
  - key and value consist of lowercase English letters and digits
  - 1 <= timestamp <= 10^7
  - All the timestamps of set are strictly increasing
  - At most 2 * 10^5 calls will be made to set and get

Time Complexity:
  - set: O(1)
  - get: O(log n) where n is the number of timestamps for the key
Space Complexity: O(N) where N is the total number of set operations

Pattern Notes:
  - Use hash map where each key maps to an array of [timestamp, value] pairs
  - Since timestamps are strictly increasing, the array is naturally sorted
  - Use binary search to find the largest timestamp <= query timestamp
  - Binary search for "largest value <= target" pattern
  - Handle edge case where no valid timestamp exists
*/

export const functionName = 'TimeMap';

export const tests = [
  {
    input: [
      ["TimeMap", "set", "get", "get", "set", "get", "get"],
      [[], ["foo", "bar", 1], ["foo", 1], ["foo", 3], ["foo", "bar2", 4], ["foo", 4], ["foo", 5]]
    ],
    expected: [null, null, "bar", "bar", null, "bar2", "bar2"]
  },
  {
    input: [
      ["TimeMap", "set", "set", "get", "get", "get", "get", "get"],
      [[], ["love", "high", 10], ["love", "low", 20], ["love", 5], ["love", 10], ["love", 15], ["love", 20], ["love", 25]]
    ],
    expected: [null, null, null, "", "high", "high", "low", "low"]
  },
  {
    input: [
      ["TimeMap", "set", "get", "set", "get", "get"],
      [[], ["a", "bar", 1], ["a", 1], ["a", "baz", 3], ["a", 3], ["a", 2]]
    ],
    expected: [null, null, "bar", null, "baz", "bar"]
  }
];

/**
 * Time-based key-value store implementation
 */
class TimeMap {
    constructor() {
        // Map from key to array of [timestamp, value] pairs
        this.store = new Map();
    }

    /**
     * Store key-value pair at given timestamp
     * @param {string} key - The key
     * @param {string} value - The value
     * @param {number} timestamp - The timestamp
     */
    set(key, value, timestamp) {
        if (!this.store.has(key)) {
            this.store.set(key, []);
        }
        // Since timestamps are strictly increasing, we can just push
        this.store.get(key).push([timestamp, value]);
    }

    /**
     * Get value for key at or before given timestamp
     * @param {string} key - The key to lookup
     * @param {number} timestamp - The target timestamp
     * @return {string} The value at largest timestamp <= target, or "" if none exists
     */
    get(key, timestamp) {
        if (!this.store.has(key)) {
            return "";
        }

        const values = this.store.get(key);
        let left = 0;
        let right = values.length - 1;
        let result = "";

        // Binary search for largest timestamp <= target
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            const [midTimestamp, midValue] = values[mid];

            if (midTimestamp <= timestamp) {
                result = midValue; // This could be our answer
                left = mid + 1; // Look for a larger valid timestamp
            } else {
                right = mid - 1; // Look for smaller timestamp
            }
        }

        return result;
    }
}

/**
 * Test function that simulates the LeetCode test format
 * @param {string[]} operations - Array of operation names
 * @param {any[][]} operands - Array of operation parameters
 * @return {any[]} Array of results from each operation
 */
function testTimeMap(operations, operands) {
    const results = [];
    let timeMap = null;

    for (let i = 0; i < operations.length; i++) {
        const operation = operations[i];
        const operand = operands[i];

        if (operation === "TimeMap") {
            timeMap = new TimeMap();
            results.push(null);
        } else if (operation === "set") {
            timeMap.set(operand[0], operand[1], operand[2]);
            results.push(null);
        } else if (operation === "get") {
            results.push(timeMap.get(operand[0], operand[1]));
        }
    }

    return results;
}

export default testTimeMap;