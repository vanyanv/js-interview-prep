/*
Problem: Basic Fetch Request
Difficulty: Easy
Category: TypeScript API - Fundamentals

Create a function that makes a GET request to fetch user data and returns the parsed JSON response.

Example 1:
  Input: url = 'https://jsonplaceholder.typicode.com/users/1'
  Output: { id: 1, name: "Leanne Graham", username: "Bret", ... }

Example 2:
  Input: url = 'https://jsonplaceholder.typicode.com/posts/1'
  Output: { userId: 1, id: 1, title: "...", body: "..." }

Constraints:
  - Use fetch() API
  - Handle valid JSON responses
  - Assume successful HTTP responses (200)
  - Return parsed JSON object

Time Complexity: O(1) for the function logic
Space Complexity: O(1) for the function logic

Hints:
  - Use async/await for cleaner code
  - Call .json() on the response to parse
  - The fetch API returns a Promise
*/

export const functionName = 'basicFetch';

export const tests = [
  {
    input: ['https://jsonplaceholder.typicode.com/users/1'],
    expected: { id: 1, name: "Leanne Graham", username: "Bret" }
  },
  {
    input: ['https://jsonplaceholder.typicode.com/posts/1'],
    expected: { userId: 1, id: 1, title: expect.any(String), body: expect.any(String) }
  }
];