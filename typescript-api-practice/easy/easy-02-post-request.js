/*
Problem: Basic POST Request
Difficulty: Easy
Category: TypeScript API - HTTP Methods

Create a function that makes a POST request with JSON data and returns the response.

Example 1:
  Input: 
    url = 'https://jsonplaceholder.typicode.com/posts'
    data = { title: 'foo', body: 'bar', userId: 1 }
  Output: { id: 101, title: 'foo', body: 'bar', userId: 1 }

Example 2:
  Input: 
    url = 'https://jsonplaceholder.typicode.com/users'
    data = { name: 'John', email: 'john@test.com' }
  Output: { id: 11, name: 'John', email: 'john@test.com' }

Constraints:
  - Use fetch() with POST method
  - Set appropriate headers for JSON
  - Send data as JSON string in body
  - Return parsed JSON response

Time Complexity: O(1)
Space Complexity: O(1)

Hints:
  - Set Content-Type header to 'application/json'
  - Use JSON.stringify() for the body
  - Include method: 'POST' in fetch options
*/

export const functionName = 'postRequest';

export const tests = [
  {
    input: [
      'https://jsonplaceholder.typicode.com/posts',
      { title: 'foo', body: 'bar', userId: 1 }
    ],
    expected: { id: 101, title: 'foo', body: 'bar', userId: 1 }
  },
  {
    input: [
      'https://jsonplaceholder.typicode.com/users',
      { name: 'John', email: 'john@test.com' }
    ],
    expected: { id: 11, name: 'John', email: 'john@test.com' }
  }
];