/*
Problem: Simple Cache Implementation
Difficulty: Easy
Category: System Design - Caching

Implement a simple cache with get, set, and delete operations.

Example 1:
  Input: cache.set("key1", "value1"), cache.get("key1")
  Output: "value1"

Example 2:
  Input: cache.set("user", {id: 1, name: "John"}), cache.get("user")
  Output: {id: 1, name: "John"}

Example 3:
  Input: cache.get("nonexistent")
  Output: null

Requirements:
  - Store key-value pairs
  - Return null for missing keys
  - Support any value type
  - Provide clear, delete operations

Time Complexity: O(1) for all operations
Space Complexity: O(n) where n is number of items

Hints:
  - Use Map or Object for storage
  - Handle undefined vs null properly
  - Provide size/clear methods
  - Consider memory management
*/

export const functionName = 'createSimpleCache';

export const tests = [
  {
    input: [],
    expected: {
      get: expect.any(Function),
      set: expect.any(Function),
      delete: expect.any(Function),
      clear: expect.any(Function),
      size: expect.any(Function)
    }
  }
];