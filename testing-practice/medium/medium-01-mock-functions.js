/*
Problem: Mock Function Implementation
Difficulty: Medium
Category: Testing - Mocking

Create a mock function implementation that tracks calls, arguments, and return values.

Example 1:
  Input: mockFn = createMock(), call mockFn(1, 2)
  Output: { calls: [[1, 2]], returnValues: [undefined], callCount: 1 }

Example 2:
  Input: mockFn with implementation, mockFn.mockReturnValue(42), call mockFn(5)
  Output: { calls: [[5]], returnValues: [42], callCount: 1 }

Requirements:
  - Track all function calls with arguments
  - Track return values
  - Provide mockReturnValue method
  - Provide mockImplementation method
  - Count total calls

Time Complexity: O(1) per call
Space Complexity: O(n) where n is number of calls

Hints:
  - Use closure to maintain state
  - Store calls and return values in arrays
  - Allow setting custom implementation
  - Return mock metadata on inspection
*/

export const functionName = 'createMockFunction';

export const tests = [
  {
    input: [],
    expected: {
      fn: expect.any(Function),
      getCalls: expect.any(Function),
      getReturnValues: expect.any(Function),
      getCallCount: expect.any(Function)
    }
  }
];