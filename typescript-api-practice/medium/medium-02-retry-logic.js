/*
Problem: Request Retry Logic
Difficulty: Medium
Category: TypeScript API - Reliability

Create a function that retries failed requests with exponential backoff.

Example 1:
  Input: url = 'https://jsonplaceholder.typicode.com/users/1', maxRetries = 3
  Output: { success: true, data: { id: 1, name: "Leanne Graham" }, attempts: 1 }

Example 2:
  Input: url = 'https://failing-endpoint.com/api', maxRetries = 2
  Output: { success: false, error: "Max retries reached", attempts: 3 }

Requirements:
  - Retry on network errors or 5xx status codes
  - Use exponential backoff (1s, 2s, 4s, ...)
  - Don't retry on 4xx client errors
  - Track number of attempts made
  - Return success/failure result

Time Complexity: O(1) per attempt
Space Complexity: O(1)

Hints:
  - Use setTimeout for delays between retries
  - Implement exponential backoff: delay = baseDelay * 2^attempt
  - Check response.ok and response.status
  - Wrap in try/catch for network errors
*/

export const functionName = 'fetchWithRetry';

export const tests = [
  {
    input: ['https://jsonplaceholder.typicode.com/users/1', 3],
    expected: { 
      success: true, 
      data: { id: 1, name: "Leanne Graham", username: "Bret" }, 
      attempts: 1 
    }
  },
  {
    input: ['https://jsonplaceholder.typicode.com/posts/1', 2],
    expected: { 
      success: true, 
      data: { userId: 1, id: 1, title: expect.any(String) }, 
      attempts: 1 
    }
  },
  {
    input: ['https://httpstat.us/500', 2],
    expected: { 
      success: false, 
      error: expect.any(String), 
      attempts: 3 
    }
  }
];