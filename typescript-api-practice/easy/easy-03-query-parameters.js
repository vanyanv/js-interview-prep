/*
Problem: URL Query Parameters
Difficulty: Easy
Category: TypeScript API - URL Building

Create a function that builds a URL with query parameters from an object.

Example 1:
  Input: baseUrl = 'https://api.example.com/users', params = { page: 1, limit: 10 }
  Output: 'https://api.example.com/users?page=1&limit=10'

Example 2:
  Input: baseUrl = 'https://api.test.com/search', params = { q: 'javascript', type: 'tutorial' }
  Output: 'https://api.test.com/search?q=javascript&type=tutorial'

Example 3:
  Input: baseUrl = 'https://api.test.com/data', params = {}
  Output: 'https://api.test.com/data'

Constraints:
  - Handle empty parameters object
  - Properly encode parameter values
  - Support string and number values
  - Return valid URL string

Time Complexity: O(n) where n is number of parameters
Space Complexity: O(n)

Hints:
  - Use URLSearchParams for proper encoding
  - Check if params object has properties
  - Handle edge case of empty params
  - Use toString() to convert to query string
*/

export const functionName = 'buildUrlWithParams';

export const tests = [
  {
    input: ['https://api.example.com/users', { page: 1, limit: 10 }],
    expected: 'https://api.example.com/users?page=1&limit=10'
  },
  {
    input: ['https://api.test.com/search', { q: 'javascript', type: 'tutorial' }],
    expected: 'https://api.test.com/search?q=javascript&type=tutorial'
  },
  {
    input: ['https://api.test.com/data', {}],
    expected: 'https://api.test.com/data'
  },
  {
    input: ['https://jsonplaceholder.typicode.com/posts', { userId: 1 }],
    expected: 'https://jsonplaceholder.typicode.com/posts?userId=1'
  }
];