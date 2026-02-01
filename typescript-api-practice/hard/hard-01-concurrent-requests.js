/*
Problem: Concurrent API Requests
Difficulty: Hard
Category: TypeScript API - Concurrency

Create a function that makes multiple API requests concurrently and combines their results.
Fetch user data and their posts, then combine them into a single object.

Example 1:
  Input: userId = 1
  Output: {
    user: { id: 1, name: "Leanne Graham", ... },
    posts: [{ id: 1, title: "...", userId: 1 }, ...],
    totalPosts: 10
  }

Example 2:
  Input: userId = 2
  Output: {
    user: { id: 2, name: "Ervin Howell", ... },
    posts: [{ id: 11, title: "...", userId: 2 }, ...],
    totalPosts: 10
  }

Constraints:
  - Make requests concurrently (not sequential)
  - Handle errors gracefully
  - Use Promise.all or Promise.allSettled
  - Return combined data structure

Time Complexity: O(1) for function logic
Space Complexity: O(n) where n is number of posts

Hints:
  - Use Promise.all for concurrent requests
  - Make separate requests for user and posts
  - Filter posts by userId
  - Handle partial failures appropriately
*/

export const functionName = 'fetchUserWithPosts';

export const tests = [
  {
    input: [1],
    expected: {
      user: { id: 1, name: "Leanne Graham" },
      posts: expect.any(Array),
      totalPosts: expect.any(Number)
    }
  },
  {
    input: [2],
    expected: {
      user: { id: 2, name: "Ervin Howell" },
      posts: expect.any(Array),
      totalPosts: expect.any(Number)
    }
  }
];