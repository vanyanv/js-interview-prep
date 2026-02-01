/*
Problem: Response Caching Strategy
Difficulty: Medium
Category: TypeScript API - Performance

Create a function that implements intelligent response caching with TTL and cache invalidation.

Example 1:
  Input: url = 'https://jsonplaceholder.typicode.com/users/1', ttl = 60000
  Output: { data: { id: 1, name: "..." }, fromCache: false, cachedAt: timestamp }

Example 2:
  Input: Same URL within TTL period
  Output: { data: { id: 1, name: "..." }, fromCache: true, cachedAt: timestamp }

Requirements:
  - Cache API responses with TTL (Time To Live)
  - Return cached data when available and fresh
  - Invalidate expired cache entries
  - Support cache key generation from URL + params
  - Track cache hit/miss statistics

Time Complexity: O(1) for cache operations
Space Complexity: O(n) where n is cached responses

Hints:
  - Use Map or object for cache storage
  - Store timestamp with cached data
  - Check Date.now() against cache timestamp + TTL
  - Generate unique cache keys from request details
  - Clean up expired entries periodically
*/

export const functionName = 'fetchWithCache';

export const tests = [
  {
    input: ['https://jsonplaceholder.typicode.com/users/1', { ttl: 60000 }],
    expected: { 
      data: { id: 1, name: "Leanne Graham", username: "Bret" },
      fromCache: false, 
      cachedAt: expect.any(Number) 
    }
  },
  {
    input: ['https://jsonplaceholder.typicode.com/posts/1', { ttl: 30000 }],
    expected: { 
      data: { userId: 1, id: 1, title: expect.any(String) },
      fromCache: false, 
      cachedAt: expect.any(Number) 
    }
  },
  {
    input: ['https://jsonplaceholder.typicode.com/users/2', { ttl: 120000 }],
    expected: { 
      data: { id: 2, name: "Ervin Howell" },
      fromCache: false, 
      cachedAt: expect.any(Number) 
    }
  }
];