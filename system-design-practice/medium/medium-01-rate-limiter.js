/*
Problem: Rate Limiter Implementation
Difficulty: Medium
Category: System Design - Rate Limiting

Implement a rate limiter that allows a maximum number of requests within a time window.

Example 1:
  Input: limiter = createRateLimiter(3, 60000), call 3 times within 60s
  Output: [true, true, true] (all allowed)

Example 2:
  Input: limiter = createRateLimiter(2, 1000), call 3 times quickly
  Output: [true, true, false] (third call blocked)

Requirements:
  - Track requests per time window
  - Reset counter after time window
  - Support different limits and windows
  - Return boolean for allow/deny

Time Complexity: O(1) per request
Space Complexity: O(1)

Hints:
  - Use sliding window approach
  - Track timestamps of requests
  - Clean up old requests
  - Handle edge cases properly
*/

export const functionName = 'createRateLimiter';

export const tests = [
  {
    input: [5, 1000], // 5 requests per second
    expected: {
      isAllowed: expect.any(Function),
      reset: expect.any(Function),
      getRemaining: expect.any(Function)
    }
  },
  {
    input: [2, 60000], // 2 requests per minute
    expected: {
      isAllowed: expect.any(Function),
      reset: expect.any(Function),
      getRemaining: expect.any(Function)
    }
  }
];