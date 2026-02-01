/*
Problem: Paginated API Response Handling
Difficulty: Medium
Category: TypeScript API - Data Management

Create a function that handles paginated API responses and fetches all pages.

Example 1:
  Input: baseUrl = 'https://jsonplaceholder.typicode.com/posts', pageSize = 10
  Output: { 
    data: [...all posts...], 
    totalPages: 10, 
    totalItems: 100, 
    pagesFetched: 10 
  }

Example 2:
  Input: baseUrl = 'https://jsonplaceholder.typicode.com/users', pageSize = 5
  Output: { 
    data: [...all users...], 
    totalPages: 2, 
    totalItems: 10, 
    pagesFetched: 2 
  }

Requirements:
  - Fetch all pages of paginated data
  - Handle different pagination styles (page/limit, offset/limit)
  - Combine results from all pages
  - Return metadata about pagination
  - Stop when no more data available

Time Complexity: O(n) where n is total items
Space Complexity: O(n)

Hints:
  - Start with page 1 or offset 0
  - Check response length to detect last page
  - Use Promise.all for parallel requests if possible
  - Handle different API pagination patterns
  - Accumulate data across pages
*/

export const functionName = 'fetchPaginatedData';

export const tests = [
  {
    input: ['https://jsonplaceholder.typicode.com/posts', { _page: 1, _limit: 10 }],
    expected: { 
      data: expect.any(Array), 
      currentPage: 1,
      hasMore: true,
      itemsPerPage: 10 
    }
  },
  {
    input: ['https://jsonplaceholder.typicode.com/users', { _page: 1, _limit: 5 }],
    expected: { 
      data: expect.any(Array), 
      currentPage: 1,
      hasMore: true,
      itemsPerPage: 5 
    }
  },
  {
    input: ['https://jsonplaceholder.typicode.com/posts', { _page: 2, _limit: 50 }],
    expected: { 
      data: expect.any(Array), 
      currentPage: 2,
      hasMore: true,
      itemsPerPage: 50 
    }
  }
];