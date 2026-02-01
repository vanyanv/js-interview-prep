/*
Problem: Compound Component Pattern
Difficulty: Hard
Category: React Patterns - Component Architecture

Create a flexible compound component system like <Select><Option></Select>.

Example 1:
  Input: <Modal><Modal.Header><Modal.Body><Modal.Footer>
  Output: Flexible modal with composable parts

Example 2:
  Input: <Tabs><Tabs.List><Tabs.Panel>
  Output: Accessible tabs with shared state

Requirements:
  - Share state between parent and child components
  - Use React context for communication
  - Support flexible composition patterns
  - Handle accessibility requirements
  - Provide clean, intuitive API

Time Complexity: O(1)
Space Complexity: O(1)

Hints:
  - Use React.Children utilities for component detection
  - Create context for shared state between compounds
  - Use static properties for sub-components
  - Clone elements to pass props when needed
  - Handle keyboard navigation and ARIA attributes
*/

export const functionName = 'createCompoundComponents';

export const tests = [
  {
    input: ['Modal'],
    expected: {
      Modal: expect.any(Function),
      ModalHeader: expect.any(Function),
      ModalBody: expect.any(Function),
      ModalFooter: expect.any(Function),
      ModalContext: expect.any(Object)
    }
  },
  {
    input: ['Tabs'],
    expected: {
      Tabs: expect.any(Function),
      TabsList: expect.any(Function),
      TabsTrigger: expect.any(Function),
      TabsContent: expect.any(Function),
      TabsContext: expect.any(Object)
    }
  }
];