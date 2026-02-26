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
// There are a few bugs in the solution:
// 1. toggleTodo — missing return and mutation
// typescript// ❌ Bug: arrow function body uses {} but no return, also doesn't mutate todos
// toggleTodo(id: string) {
//   return todos.map((todo) => {
//     todo.id === id ? { ...todo, completed: !todo.completed } : todo;
//   });
// },

// // ✅ Fix: mutate in place (or reassign todos)
// toggleTodo(id: string) {
//   const todo = todos.find((todo) => todo.id === id);
//   if (todo) todo.completed = !todo.completed;
//   return todo;
// },
// 2. getCompleted and getPending — same missing return issue
// typescript// ❌ Bug: filter callback has {} but no return, always returns undefined (falsy)
// getCompleted() {
//   return todos.filter((todo) => {
//     todo.completed === true; // expression is evaluated but not returned
//   });
// },

// // ✅ Fix: use implicit return or add return keyword
// getCompleted() {
//   return todos.filter((todo) => todo.completed === true);
// },

// getPending() {
//   return todos.filter((todo) => todo.completed === false);
// },
// Summary of issues:
// MethodBugFixtoggleTodomap doesn't mutate todos, callback missing returnFind and mutate in placegetCompletedCallback missing returnUse implicit arrow returngetPendingCallback missing returnUse implicit arrow return
// The addTodo, removeTodo, and getTodos methods are all correct. The classic trap here is using curly braces {} in arrow functions without a return statement — easy mistake to make.

export const functionName = 'createTodoManager';
type Todos = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
};
export const createTodoManager = () => {
  let todos: Todos[] = [];

  return {
    //add todos
    addTodo(todo: string) {
      const newTodo = {
        id: crypto.randomUUID(),
        text: todo,
        completed: false,
        createdAt: new Date(),
      };
      todos.push(newTodo);
      return newTodo;
    },
    //remove todos
    removeTodo(id: string) {
      const removed = todos.find((todos) => todos.id === id);
      todos = todos.filter((todo) => todo.id !== id);

      return removed;
    },
    //toggleTodo
    toggleTodo(id: string) {
      const todo = todos.find((todo) => todo.id === id);
      if (todo) todo.completed = !todo.completed;
      return todo;
    },
    //getTodos
    getTodos() {
      return todos;
    },
    //getCompleted
    getCompleted() {
      return todos.filter((todo) => todo.completed === true);
    },
    //getPending
    getPending() {
      return todos.filter((todo) => todo.completed === false);
    },
  };
};

export const tests = [
  {
    input: [],
    expected: {
      addTodo: expect.any(Function),
      removeTodo: expect.any(Function),
      toggleTodo: expect.any(Function),
      getTodos: expect.any(Function),
      getCompleted: expect.any(Function),
      getPending: expect.any(Function),
    },
  },
];
