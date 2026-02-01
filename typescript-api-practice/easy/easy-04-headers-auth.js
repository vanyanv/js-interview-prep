/*
Problem: Request Headers and Authentication
Difficulty: Easy
Category: TypeScript API - Headers

Create a function that makes an authenticated request with custom headers.

Example 1:
  Input: 
    url = 'https://jsonplaceholder.typicode.com/posts/1'
    headers = { 'Authorization': 'Bearer token123', 'Content-Type': 'application/json' }
  Output: { id: 1, title: "...", body: "...", userId: 1 }

Example 2:
  Input:
    url = 'https://jsonplaceholder.typicode.com/users/1' 
    headers = { 'X-API-Key': 'key123' }
  Output: { id: 1, name: "Leanne Graham", username: "Bret", ... }

Constraints:
  - Use fetch() with custom headers
  - Support different header types
  - Return parsed JSON response
  - Handle authorization patterns

Time Complexity: O(1)
Space Complexity: O(1)

Hints:
  - Pass headers in fetch options object
  - Headers should be an object with string values
  - Common headers: Authorization, Content-Type, X-API-Key
  - Merge default headers with custom ones if needed
*/

export const functionName = 'fetchWithHeaders';

export const tests = [
  {
    input: [
      'https://jsonplaceholder.typicode.com/posts/1',
      { 'Authorization': 'Bearer token123', 'Content-Type': 'application/json' }
    ],
    expected: { id: 1, title: expect.any(String), body: expect.any(String), userId: 1 }
  },
  {
    input: [
      'https://jsonplaceholder.typicode.com/users/1',
      { 'X-API-Key': 'key123' }
    ],
    expected: { id: 1, name: "Leanne Graham", username: "Bret" }
  },
  {
    input: [
      'https://jsonplaceholder.typicode.com/posts/1',
      { 'User-Agent': 'MyApp/1.0' }
    ],
    expected: { id: 1, title: expect.any(String), body: expect.any(String), userId: 1 }
  }
];