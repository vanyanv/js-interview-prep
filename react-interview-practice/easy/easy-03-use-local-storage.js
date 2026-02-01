/*
Problem: Custom useLocalStorage Hook
Difficulty: Easy
Category: React Hooks - State Persistence

Create a custom hook that syncs state with localStorage for data persistence.

Example 1:
  Input: key = 'username', initialValue = ''
  Output: { value: '', setValue: function, clear: function }

Example 2:
  Input: key = 'settings', initialValue = { theme: 'light' }
  Output: { value: { theme: 'light' }, setValue: function, clear: function }

Requirements:
  - Read initial value from localStorage
  - Update localStorage when state changes
  - Handle JSON serialization/deserialization
  - Provide clear function to remove item
  - Handle localStorage errors gracefully

Time Complexity: O(1)
Space Complexity: O(1)

Hints:
  - Use useState with lazy initial state
  - Use useEffect to sync changes to localStorage
  - Use JSON.stringify/parse for objects
  - Handle localStorage being unavailable
  - Return current value and setter function
*/

export const functionName = 'useLocalStorage';

// Mock localStorage for testing
const mockLocalStorage = {
  store: {},
  getItem: function(key) { return this.store[key] || null; },
  setItem: function(key, value) { this.store[key] = value; },
  removeItem: function(key) { delete this.store[key]; },
  clear: function() { this.store = {}; }
};

export const tests = [
  {
    input: ['testKey', 'defaultValue'],
    expected: {
      value: 'defaultValue',
      setValue: expect.any(Function),
      clear: expect.any(Function)
    }
  },
  {
    input: ['userPrefs', { theme: 'dark', lang: 'en' }],
    expected: {
      value: { theme: 'dark', lang: 'en' },
      setValue: expect.any(Function),
      clear: expect.any(Function)
    }
  },
  {
    input: ['counter', 0],
    expected: {
      value: 0,
      setValue: expect.any(Function),
      clear: expect.any(Function)
    }
  }
];