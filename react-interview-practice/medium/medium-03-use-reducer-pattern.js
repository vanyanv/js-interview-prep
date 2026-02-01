/*
Problem: useReducer for Complex State
Difficulty: Medium
Category: React Hooks - State Management

Create a useReducer implementation for managing complex application state.

Example 1:
  Input: state = { count: 0, user: null, loading: false }
  Actions: { INCREMENT, SET_USER, SET_LOADING }
  Output: { state, dispatch, actions }

Example 2:
  Input: state = { todos: [], filter: 'all' }
  Actions: { ADD_TODO, TOGGLE_TODO, SET_FILTER }
  Output: { state, dispatch, actions }

Requirements:
  - Define reducer function with action types
  - Handle multiple action types appropriately
  - Provide action creator functions
  - Support payload data in actions
  - Implement immutable state updates

Time Complexity: O(1) per action
Space Complexity: O(n) for state size

Hints:
  - Use useReducer instead of multiple useState calls
  - Create action type constants
  - Handle unknown actions with default case
  - Use spread operator for immutable updates
  - Provide helper functions for common actions
*/

export const functionName = 'useComplexState';

export const tests = [
  {
    input: [{ count: 0, user: null }],
    expected: {
      state: { count: 0, user: null },
      dispatch: expect.any(Function),
      increment: expect.any(Function),
      decrement: expect.any(Function),
      setUser: expect.any(Function),
      reset: expect.any(Function)
    }
  },
  {
    input: [{ items: [], total: 0 }],
    expected: {
      state: { items: [], total: 0 },
      dispatch: expect.any(Function),
      addItem: expect.any(Function),
      removeItem: expect.any(Function),
      clearItems: expect.any(Function),
      updateTotal: expect.any(Function)
    }
  }
];