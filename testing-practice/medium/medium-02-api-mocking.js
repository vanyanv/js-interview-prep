/*
Problem: API Response Mocking
Difficulty: Medium
Category: Testing - Mocking

Create a system to mock API responses for testing HTTP requests.

Example 1:
  Input: mock.get('/api/users/1', { id: 1, name: 'John' })
  Output: Fetch to /api/users/1 returns mocked data

Example 2:
  Input: mock.post('/api/users', (req) => ({ id: Date.now(), ...req.body }))
  Output: Dynamic response based on request data

Requirements:
  - Mock different HTTP methods (GET, POST, PUT, DELETE)
  - Support static and dynamic responses
  - Handle request matching with URL patterns
  - Provide request verification capabilities
  - Support response delays and errors

Time Complexity: O(1) per mock lookup
Space Complexity: O(n) where n is number of mocks

Hints:
  - Intercept fetch or XMLHttpRequest
  - Use URL pattern matching for flexibility
  - Store request history for verification
  - Support async response functions
  - Handle network errors and timeouts
*/

export const functionName = 'createApiMock';

export const tests = [
  {
    input: [],
    expected: {
      get: expect.any(Function),
      post: expect.any(Function),
      put: expect.any(Function),
      delete: expect.any(Function),
      reset: expect.any(Function),
      getRequests: expect.any(Function)
    }
  }
];