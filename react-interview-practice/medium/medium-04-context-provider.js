/*
Problem: Context Provider Pattern
Difficulty: Medium
Category: React Patterns - Context API

Create a context provider with hooks for state management across components.

Example 1:
  Input: initialState = { theme: 'light', user: null }
  Output: { Provider, useTheme, useUser, useAppContext }

Example 2:
  Input: initialState = { cart: [], totalItems: 0 }
  Output: { Provider, useCart, useCartActions, useCartContext }

Requirements:
  - Create context with provider component
  - Provide custom hooks for consuming context
  - Handle context state updates
  - Support nested providers
  - Include helpful error messages for missing providers

Time Complexity: O(1)
Space Complexity: O(1)

Hints:
  - Use createContext to create context
  - Create provider component with state management
  - Create custom hooks that use useContext
  - Add error checking for missing context
  - Use useReducer or useState for state management
*/

export const functionName = 'createAppContext';

export const tests = [
  {
    input: [{ theme: 'light', user: null }],
    expected: {
      Provider: expect.any(Function),
      useContext: expect.any(Function),
      useTheme: expect.any(Function),
      useUser: expect.any(Function),
      Context: expect.any(Object)
    }
  },
  {
    input: [{ count: 0, items: [] }],
    expected: {
      Provider: expect.any(Function),
      useContext: expect.any(Function),
      useCount: expect.any(Function),
      useItems: expect.any(Function),
      Context: expect.any(Object)
    }
  }
];