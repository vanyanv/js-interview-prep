/*
Problem: Kanban Board
Difficulty: Medium
Category: Real World - Task Management

Build a Kanban board with columns, cards, and drag-and-drop style operations.

Example 1:
  Input: board.addCard('todo', { title: 'Build API', priority: 'high' })
  Output: { id: 1, title: 'Build API', priority: 'high', column: 'todo' }

Example 2:
  Input: board.moveCard(1, 'in-progress')
  Output: Card 1 moved from 'todo' to 'in-progress'

Requirements:
  - Default columns: todo, in-progress, done
  - Add and remove custom columns
  - Add cards with title, description, priority, and assignee
  - Move cards between columns
  - Reorder cards within a column
  - Filter cards by assignee or priority
  - Get board summary (card counts per column)
  - Cannot remove columns that still have cards

Time Complexity: O(1) for add/move, O(n) for filter
Space Complexity: O(c + n) where c is columns and n is cards

Hints:
  - Use Map for columns, each containing an array of cards
  - Track card location for O(1) lookups when moving
  - Use splice for reordering within arrays
  - Priority levels: low, medium, high, urgent
*/

export const functionName = 'createKanbanBoard';

export const tests = [
  {
    input: [
      [
        ['getSummary']
      ]
    ],
    expected: { todo: 0, 'in-progress': 0, done: 0 }
  },
  {
    input: [
      [
        ['addCard', 'todo', { title: 'Build API', priority: 'high' }],
        ['addCard', 'todo', { title: 'Write tests', priority: 'medium' }],
        ['addCard', 'in-progress', { title: 'Design UI', priority: 'low' }],
        ['getSummary']
      ]
    ],
    expected: { todo: 2, 'in-progress': 1, done: 0 }
  },
  {
    input: [
      [
        ['addCard', 'todo', { title: 'Build API', priority: 'high' }],
        ['moveCard', 1, 'in-progress'],
        ['getSummary']
      ]
    ],
    expected: { todo: 0, 'in-progress': 1, done: 0 }
  },
  {
    input: [
      [
        ['addCard', 'todo', { title: 'Task A', priority: 'high', assignee: 'Alice' }],
        ['addCard', 'todo', { title: 'Task B', priority: 'low', assignee: 'Bob' }],
        ['addCard', 'in-progress', { title: 'Task C', priority: 'high', assignee: 'Alice' }],
        ['filterCards', { assignee: 'Alice' }]
      ]
    ],
    expected: [
      { id: 1, title: 'Task A', priority: 'high', assignee: 'Alice', column: 'todo' },
      { id: 3, title: 'Task C', priority: 'high', assignee: 'Alice', column: 'in-progress' }
    ]
  },
  {
    input: [
      [
        ['addCard', 'todo', { title: 'Task A', priority: 'high' }],
        ['addCard', 'todo', { title: 'Task B', priority: 'low' }],
        ['filterCards', { priority: 'high' }]
      ]
    ],
    expected: [
      { id: 1, title: 'Task A', priority: 'high', column: 'todo' }
    ]
  },
  {
    input: [
      [
        ['addColumn', 'review'],
        ['addCard', 'review', { title: 'PR Review', priority: 'medium' }],
        ['getSummary']
      ]
    ],
    expected: { todo: 0, 'in-progress': 0, done: 0, review: 1 }
  },
  {
    input: [
      [
        ['addCard', 'todo', { title: 'Task', priority: 'low' }],
        ['removeColumn', 'todo']
      ]
    ],
    expected: { error: 'Column is not empty' }
  },
  {
    input: [
      [
        ['moveCard', 999, 'done']
      ]
    ],
    expected: { error: 'Card not found' }
  }
];
