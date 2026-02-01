/*
Problem: Ref Forwarding and useImperativeHandle
Difficulty: Medium
Category: React Patterns - Refs

Create components that properly forward refs and expose imperative APIs.

Example 1:
  Input: CustomInput component with forwarded ref
  Output: Component that can be controlled via ref.current.focus()

Example 2:
  Input: Modal component with imperative controls
  Output: Component exposing { open, close, toggle } methods

Requirements:
  - Use forwardRef to pass refs through components
  - Implement useImperativeHandle for custom ref APIs
  - Handle ref forwarding in custom components
  - Provide imperative methods when needed
  - Maintain component encapsulation

Time Complexity: O(1)
Space Complexity: O(1)

Hints:
  - Use React.forwardRef wrapper
  - Use useImperativeHandle to customize ref object
  - Forward refs to DOM elements or expose custom methods
  - Consider when imperative APIs are appropriate
  - Combine with other hooks for full functionality
*/

export const functionName = 'createRefForwardingComponents';

export const tests = [
  {
    input: [{ placeholder: 'Enter text' }],
    expected: {
      InputComponent: expect.any(Function),
      ModalComponent: expect.any(Function),
      ScrollableComponent: expect.any(Function)
    }
  },
  {
    input: [{ label: 'Custom Input' }],
    expected: {
      InputComponent: expect.any(Function),
      ModalComponent: expect.any(Function),
      ScrollableComponent: expect.any(Function)
    }
  }
];