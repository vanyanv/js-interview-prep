/*
Problem: Todo List Manager
Difficulty: Easy
Category: Real World - CRUD Operations

Create a todo list manager that can add, remove, toggle, and filter todos.

Example 1:
  Input: manager.addTodo("Buy groceries")
  Output: { id: 1, text: "Buy groceries", completed: false, createdAt: Date }

Example 2:
  Input: manager.toggleTodo(1)
  Output: Todo with id 1 is marked as completed

Requirements:
  - Add todos with unique IDs
  - Toggle completion status
  - Remove todos by ID
  - Filter by completion status
  - Return todo list

Time Complexity: O(1) for add/toggle, O(n) for filter
Space Complexity: O(n) where n is number of todos

Hints:
  - Use array to store todos
  - Generate unique IDs (timestamp or counter)
  - Use find/filter for operations
  - Return immutable data when possible
*/

export const functionName = 'createTodoManager';

export const tests = [
  {
    input: [],
    expected: {
      addTodo: expect.any(Function),
      removeTodo: expect.any(Function),
      toggleTodo: expect.any(Function),
      getTodos: expect.any(Function),
      getCompleted: expect.any(Function),
      getPending: expect.any(Function)
    }
  }
];