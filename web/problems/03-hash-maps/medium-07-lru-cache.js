/*
Problem: LRU Cache
Difficulty: Medium
Category: Design, Hash Map, Doubly Linked List
LeetCode: #146
Pattern: Hash Map + Doubly Linked List

Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the LRUCache class:

- LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
- int get(int key) Return the value of the key if the key exists, otherwise return -1.
- void put(int key, int value) Update the value of the key if the key exists.
  Otherwise, add the key-value pair to the cache. If the number of keys exceeds
  the capacity from this operation, evict the least recently used key.

The functions get and put must each run in O(1) average time complexity.

Example 1:
  Input
  ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
  [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
  Output
  [null, null, null, 1, null, -1, null, -1, 3, 4]

  Explanation
  LRUCache lRUCache = new LRUCache(2);
  lRUCache.put(1, 1); // cache is {1=1}
  lRUCache.put(2, 2); // cache is {1=1, 2=2}
  lRUCache.get(1);    // return 1
  lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
  lRUCache.get(2);    // returns -1 (not found)
  lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {3=3, 4=4}
  lRUCache.get(1);    // return -1 (not found)
  lRUCache.get(3);    // return 3
  lRUCache.get(4);    // return 4

Constraints:
  - 1 <= capacity <= 3000
  - 0 <= key <= 10^4
  - 0 <= value <= 10^5
  - At most 2 * 10^5 calls will be made to get and put.

Time Complexity: O(1) for both get and put
Space Complexity: O(capacity)

Hash Map + Doubly Linked List Pattern Notes:
  - Map stores key -> node mapping for O(1) lookup
  - Doubly linked list maintains order (most recent to least recent)
  - Head = most recently used, Tail = least recently used
  - Move node to head on access, remove from tail when over capacity
  - Dummy head/tail nodes simplify edge cases
*/

export const functionName = 'LRUCache';

export const tests = [
  {
    input: [["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"], [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]],
    expected: [null, null, null, 1, null, -1, null, -1, 3, 4]
  },
  {
    input: [["LRUCache", "put", "get", "put", "get", "get"], [[1], [2, 1], [2], [3, 2], [2], [3]]],
    expected: [null, null, 1, null, -1, 2]
  },
  {
    input: [["LRUCache", "put", "put", "put", "put", "get", "get"], [[2], [1, 1], [2, 2], [3, 3], [4, 4], [1], [2]]],
    expected: [null, null, null, null, null, -1, -1]
  },
  {
    input: [["LRUCache", "get", "put", "get", "put", "put", "get", "get"], [[2], [2], [2, 6], [1], [1, 5], [1, 2], [1], [2]]],
    expected: [null, -1, null, -1, null, null, 2, 6]
  },
  {
    input: [["LRUCache", "put", "put", "get", "get", "put", "get", "get", "get"], [[2], [2, 1], [1, 1], [2], [1], [2, 3], [2], [1], [1]]],
    expected: [null, null, null, 1, 1, null, 3, -1, -1]
  }
];