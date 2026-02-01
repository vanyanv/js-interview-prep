/*
Problem: Response Format Handling
Difficulty: Easy
Category: TypeScript API - Response Types

Create a function that handles different response content types (JSON, text, blob).

Example 1:
  Input: url = 'https://jsonplaceholder.typicode.com/users/1', format = 'json'
  Output: { id: 1, name: "Leanne Graham", username: "Bret", ... }

Example 2:
  Input: url = 'https://httpbin.org/robots.txt', format = 'text'
  Output: "User-agent: *\nDisallow: /deny\n"

Example 3:
  Input: url = 'https://jsonplaceholder.typicode.com/posts/1', format = 'json'
  Output: { userId: 1, id: 1, title: "...", body: "..." }

Constraints:
  - Support 'json', 'text', and 'blob' formats
  - Use appropriate response parsing method
  - Return data in correct format
  - Handle format parameter validation

Time Complexity: O(1)
Space Complexity: O(1)

Hints:
  - Use response.json(), response.text(), or response.blob()
  - Validate format parameter before parsing
  - Default to 'json' if format not specified
  - Consider error handling for invalid formats
*/

export const functionName = 'fetchWithFormat';

export const tests = [
  {
    input: ['https://jsonplaceholder.typicode.com/users/1', 'json'],
    expected: { id: 1, name: "Leanne Graham", username: "Bret" }
  },
  {
    input: ['https://jsonplaceholder.typicode.com/posts/1', 'json'],
    expected: { userId: 1, id: 1, title: expect.any(String), body: expect.any(String) }
  },
  {
    input: ['https://jsonplaceholder.typicode.com/users/1'],
    expected: { id: 1, name: "Leanne Graham", username: "Bret" }
  }
];