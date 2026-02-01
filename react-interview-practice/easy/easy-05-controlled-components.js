/*
Problem: Controlled Form Input Handler
Difficulty: Easy
Category: React Patterns - Form Management

Create a hook that manages controlled form inputs with validation.

Example 1:
  Input: initialValues = { email: '', password: '' }
  Output: { 
    values: { email: '', password: '' }, 
    handleChange: function, 
    reset: function 
  }

Example 2:
  Input: initialValues = { name: 'John', age: 25 }
  Output: { 
    values: { name: 'John', age: 25 }, 
    handleChange: function, 
    reset: function 
  }

Requirements:
  - Manage multiple form field values
  - Provide onChange handler for inputs
  - Support resetting form to initial values
  - Handle different input types (text, number, checkbox)
  - Return current values and helper functions

Time Complexity: O(1) per field update
Space Complexity: O(n) where n is number of fields

Hints:
  - Use useState to store form values object
  - Create generic handleChange function using field names
  - Use computed property names [name]: value
  - Handle event.target.name and event.target.value
  - Support different input types appropriately
*/

export const functionName = 'useControlledForm';

export const tests = [
  {
    input: [{ name: '', email: '' }],
    expected: {
      values: { name: '', email: '' },
      handleChange: expect.any(Function),
      reset: expect.any(Function),
      setValue: expect.any(Function)
    }
  },
  {
    input: [{ username: 'test', active: false }],
    expected: {
      values: { username: 'test', active: false },
      handleChange: expect.any(Function),
      reset: expect.any(Function),
      setValue: expect.any(Function)
    }
  },
  {
    input: [{}],
    expected: {
      values: {},
      handleChange: expect.any(Function),
      reset: expect.any(Function),
      setValue: expect.any(Function)
    }
  }
];