/*
Problem: Custom useFetch Hook
Difficulty: Medium
Category: React Hooks - Data Fetching

Create a custom hook that handles API data fetching with loading states and error handling.

Example 1:
  Input: url = 'https://jsonplaceholder.typicode.com/users/1'
  Output: { data: null, loading: true, error: null, refetch: function }

Example 2:
  Input: url = 'https://jsonplaceholder.typicode.com/posts/1' (after load)
  Output: { data: {...postData}, loading: false, error: null, refetch: function }

Example 3:
  Input: url = 'https://invalid-url.com/api'
  Output: { data: null, loading: false, error: Error, refetch: function }

Requirements:
  - Manage loading, data, and error states
  - Fetch data on mount or URL change
  - Provide refetch function for manual refresh
  - Handle component unmount cleanup
  - Support custom fetch options

Time Complexity: O(1)
Space Complexity: O(1)

Hints:
  - Use useState for data, loading, error states
  - Use useEffect to trigger fetch on URL changes
  - Use AbortController to cancel requests on cleanup
  - Handle fetch errors and network failures
  - Return refetch function using useCallback
*/

export const functionName = 'useFetch';

export const tests = [
  {
    input: ['https://jsonplaceholder.typicode.com/users/1'],
    expected: {
      data: null,
      loading: true,
      error: null,
      refetch: expect.any(Function)
    }
  },
  {
    input: ['https://jsonplaceholder.typicode.com/posts/1'],
    expected: {
      data: null,
      loading: true,
      error: null,
      refetch: expect.any(Function)
    }
  },
  {
    input: [null],
    expected: {
      data: null,
      loading: false,
      error: null,
      refetch: expect.any(Function)
    }
  }
];