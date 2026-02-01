/*
Problem: API Response Data Transformation
Difficulty: Medium
Category: TypeScript API - Data Processing

Create a function that transforms API response data into a standardized format.

Example 1:
  Input: 
    url = 'https://jsonplaceholder.typicode.com/users'
    transform = user => ({ id: user.id, name: user.name, email: user.email })
  Output: [{ id: 1, name: "Leanne Graham", email: "..." }, ...]

Example 2:
  Input:
    url = 'https://jsonplaceholder.typicode.com/posts'
    transform = post => ({ title: post.title, content: post.body, author: post.userId })
  Output: [{ title: "...", content: "...", author: 1 }, ...]

Requirements:
  - Fetch data from API endpoint
  - Apply transformation function to response
  - Handle arrays and single objects
  - Support nested data transformation
  - Return transformed result

Time Complexity: O(n) where n is items in response
Space Complexity: O(n)

Hints:
  - Use Array.map() for array responses
  - Check if response is array vs single object
  - Apply transform function consistently
  - Handle nested objects if needed
  - Preserve data types after transformation
*/

export const functionName = 'fetchAndTransform';

export const tests = [
  {
    input: [
      'https://jsonplaceholder.typicode.com/users/1',
      (user) => ({ id: user.id, fullName: user.name, username: user.username })
    ],
    expected: { id: 1, fullName: "Leanne Graham", username: "Bret" }
  },
  {
    input: [
      'https://jsonplaceholder.typicode.com/posts/1',
      (post) => ({ title: post.title, content: post.body, author: post.userId })
    ],
    expected: { title: expect.any(String), content: expect.any(String), author: 1 }
  },
  {
    input: [
      'https://jsonplaceholder.typicode.com/users/1',
      (user) => user.name.toUpperCase()
    ],
    expected: "LEANNE GRAHAM"
  }
];