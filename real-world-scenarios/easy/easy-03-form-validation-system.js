/*
Problem: Form Validation System
Difficulty: Easy
Category: Real World - Input Validation

Create a form validation system that validates data against a set of rules.

Example 1:
  Input: validateForm(
    { email: { required: true, pattern: 'email' } },
    { email: 'user@example.com' }
  )
  Output: { valid: true, errors: {} }

Example 2:
  Input: validateForm(
    { email: { required: true, pattern: 'email' } },
    { email: 'not-an-email' }
  )
  Output: { valid: false, errors: { email: ['Invalid email format'] } }

Requirements:
  - Validate required fields
  - Validate minimum and maximum length
  - Validate email pattern
  - Validate numeric range (min, max)
  - Validate custom regex patterns
  - Return all errors per field (not just first)
  - Return overall valid/invalid status

Time Complexity: O(n * m) where n is fields and m is rules per field
Space Complexity: O(n) for error messages

Hints:
  - Use a rules object where keys are field names
  - Each rule can have multiple validators
  - Collect all errors before returning
  - Use regex for pattern matching
*/

export const functionName = 'validateForm';

export const tests = [
  {
    input: [
      { name: { required: true } },
      { name: 'John' }
    ],
    expected: { valid: true, errors: {} }
  },
  {
    input: [
      { name: { required: true } },
      { name: '' }
    ],
    expected: { valid: false, errors: { name: ['Field is required'] } }
  },
  {
    input: [
      { name: { required: true } },
      {}
    ],
    expected: { valid: false, errors: { name: ['Field is required'] } }
  },
  {
    input: [
      { email: { required: true, pattern: 'email' } },
      { email: 'user@example.com' }
    ],
    expected: { valid: true, errors: {} }
  },
  {
    input: [
      { email: { required: true, pattern: 'email' } },
      { email: 'not-an-email' }
    ],
    expected: { valid: false, errors: { email: ['Invalid email format'] } }
  },
  {
    input: [
      { password: { required: true, minLength: 8, maxLength: 20 } },
      { password: 'short' }
    ],
    expected: { valid: false, errors: { password: ['Must be at least 8 characters'] } }
  },
  {
    input: [
      { age: { required: true, min: 18, max: 120 } },
      { age: 15 }
    ],
    expected: { valid: false, errors: { age: ['Must be at least 18'] } }
  },
  {
    input: [
      {
        name: { required: true },
        email: { required: true, pattern: 'email' },
        age: { min: 0 }
      },
      { name: '', email: 'bad', age: -1 }
    ],
    expected: {
      valid: false,
      errors: {
        name: ['Field is required'],
        email: ['Invalid email format'],
        age: ['Must be at least 0']
      }
    }
  }
];
