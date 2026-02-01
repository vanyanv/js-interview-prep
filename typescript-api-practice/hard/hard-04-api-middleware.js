/*
Problem: API Request/Response Middleware
Difficulty: Hard
Category: TypeScript API - Architecture

Create a middleware system for API requests with interceptors, logging, and transformation.

Example 1:
  Input: middleware = [authMiddleware, loggingMiddleware, transformMiddleware]
  Output: { 
    request: interceptedRequest, 
    response: transformedResponse,
    logs: [...requestLogs...],
    duration: 234 
  }

Example 2:
  Input: middleware = [retryMiddleware, cacheMiddleware]
  Output: { 
    request: retriedRequest, 
    response: cachedResponse,
    retries: 2,
    fromCache: true 
  }

Requirements:
  - Chain multiple middleware functions
  - Support request and response interceptors
  - Handle middleware errors gracefully
  - Allow middleware to modify requests/responses
  - Provide execution order control

Time Complexity: O(n) where n is middleware count
Space Complexity: O(n)

Hints:
  - Use function composition for middleware chain
  - Each middleware receives (request, next) parameters
  - Support async middleware functions
  - Handle middleware failures without breaking chain
  - Allow middleware to short-circuit the chain
*/

export const functionName = 'createApiMiddleware';

export const tests = [
  {
    input: [
      [
        (req, next) => { req.timestamp = Date.now(); return next(req); },
        (req, next) => { req.userId = '123'; return next(req); }
      ]
    ],
    expected: { 
      use: expect.any(Function),
      execute: expect.any(Function),
      getMiddleware: expect.any(Function),
      clear: expect.any(Function)
    }
  },
  {
    input: [
      [
        (req, next) => { req.auth = 'Bearer token'; return next(req); }
      ]
    ],
    expected: { 
      use: expect.any(Function),
      execute: expect.any(Function),
      getMiddleware: expect.any(Function),
      clear: expect.any(Function)
    }
  }
];