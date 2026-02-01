/*
Problem: API Error Handling
Difficulty: Medium
Category: TypeScript API - Error Handling

Create a function that makes API requests with proper error handling for different HTTP status codes.

Example 1:
  Input: url = 'https://jsonplaceholder.typicode.com/users/1'
  Output: { success: true, data: { id: 1, name: "Leanne Graham", ... }, error: null }

Example 2:
  Input: url = 'https://jsonplaceholder.typicode.com/users/999'
  Output: { success: false, data: null, error: "Resource not found" }

Example 3:
  Input: url = 'https://invalid-url-test.com/api'
  Output: { success: false, data: null, error: "Network error" }

Constraints:
  - Handle 404, 500, network errors
  - Return consistent response format
  - Use async/await
  - Don't throw exceptions

Time Complexity: O(1)
Space Complexity: O(1)

Hints:
  - Check response.ok for HTTP success
  - Use try/catch for network errors
  - Check response.status for specific codes
  - Return standardized error format
*/

export const functionName = 'fetchWithErrorHandling';

export const tests = [
  {
    input: ['https://jsonplaceholder.typicode.com/users/1'],
    expected: { 
      success: true, 
      data: { id: 1, name: "Leanne Graham", username: "Bret" }, 
      error: null 
    }
  },
  {
    input: ['https://jsonplaceholder.typicode.com/users/999'],
    expected: { 
      success: false, 
      data: null, 
      error: "Resource not found" 
    }
  },
  {
    input: ['https://invalid-url-definitely-doesnt-exist.com/api'],
    expected: { 
      success: false, 
      data: null, 
      error: "Network error" 
    }
  }
];