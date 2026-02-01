/*
Problem: Request Timeout and Cancellation
Difficulty: Medium
Category: TypeScript API - Performance

Create a function that implements request timeout with proper cancellation.

Example 1:
  Input: url = 'https://jsonplaceholder.typicode.com/users/1', timeout = 5000
  Output: { success: true, data: { id: 1, name: "Leanne Graham" }, duration: 234 }

Example 2:
  Input: url = 'https://slow-endpoint.com/api', timeout = 1000
  Output: { success: false, error: "Request timeout", duration: 1000 }

Requirements:
  - Implement request timeout using AbortController
  - Cancel request if timeout is reached
  - Measure actual request duration
  - Return success/failure with timing info
  - Handle both timeout and network errors

Time Complexity: O(1)
Space Complexity: O(1)

Hints:
  - Use AbortController for request cancellation
  - Set timeout with setTimeout
  - Use performance.now() for duration measurement
  - Handle timeout and other errors separately
  - Clean up timeout when request completes
*/

export const functionName = 'fetchWithTimeout';

export const tests = [
  {
    input: ['https://jsonplaceholder.typicode.com/users/1', 5000],
    expected: { 
      success: true, 
      data: { id: 1, name: "Leanne Graham", username: "Bret" }, 
      duration: expect.any(Number) 
    }
  },
  {
    input: ['https://jsonplaceholder.typicode.com/posts/1', 10000],
    expected: { 
      success: true, 
      data: { userId: 1, id: 1, title: expect.any(String) }, 
      duration: expect.any(Number) 
    }
  },
  {
    input: ['https://httpstat.us/200?sleep=10000', 1000],
    expected: { 
      success: false, 
      error: expect.stringContaining('timeout'), 
      duration: expect.any(Number) 
    }
  }
];