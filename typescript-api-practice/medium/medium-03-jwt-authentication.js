/*
Problem: JWT Token Management
Difficulty: Medium
Category: TypeScript API - Authentication

Create a function that manages JWT tokens with automatic refresh and secure storage.

Example 1:
  Input: credentials = { username: 'user', password: 'pass' }
  Output: { accessToken: 'jwt-token', refreshToken: 'refresh-token', expiresIn: 3600 }

Example 2:
  Input: existingToken = 'expired-jwt', refreshToken = 'valid-refresh'
  Output: { accessToken: 'new-jwt-token', refreshToken: 'new-refresh', expiresIn: 3600 }

Requirements:
  - Decode JWT to check expiration
  - Automatically refresh when token expires
  - Store tokens securely
  - Handle refresh token rotation
  - Return token status and data

Time Complexity: O(1)
Space Complexity: O(1)

Hints:
  - Use atob() to decode JWT payload (base64)
  - Check 'exp' field for expiration timestamp
  - Implement token refresh before expiration
  - Store tokens in memory or secure storage
  - Handle refresh token expiration
*/

export const functionName = 'manageJWTToken';

export const tests = [
  {
    input: [{ username: 'testuser', password: 'testpass' }],
    expected: {
      accessToken: expect.any(String),
      refreshToken: expect.any(String),
      expiresIn: expect.any(Number),
      isValid: true
    }
  },
  {
    input: [{ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ' }],
    expected: {
      isValid: expect.any(Boolean),
      decoded: expect.any(Object),
      needsRefresh: expect.any(Boolean)
    }
  }
];