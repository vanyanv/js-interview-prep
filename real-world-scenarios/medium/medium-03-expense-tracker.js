/*
Problem: Expense Tracker
Difficulty: Medium
Category: Real World - Financial Data Management

Build an expense tracker with categories, budgets, and reporting.

Example 1:
  Input: tracker.addExpense({ amount: 50, category: 'food', description: 'Groceries' })
  Output: { id: 1, amount: 50, category: 'food', description: 'Groceries', date: '2024-01-15' }

Example 2:
  Input: tracker.getSummary()
  Output: { total: 150, byCategory: { food: 50, transport: 100 }, count: 2 }

Requirements:
  - Add expenses with amount, category, description, and date
  - Remove expenses by ID
  - Set budgets per category
  - Get spending summary (total, by category)
  - Get expenses filtered by date range
  - Get expenses filtered by category
  - Check if over budget for a category
  - Get top spending categories

Time Complexity: O(n) for summary/filter operations
Space Complexity: O(n) for expenses, O(c) for category budgets

Hints:
  - Use array for expenses, Map for budgets
  - Group by category using reduce
  - Date filtering with string comparison (ISO format)
  - Sort categories by total spending for top categories
*/

export const functionName = 'createExpenseTracker';

export const tests = [
  {
    input: [
      [
        ['addExpense', { amount: 50, category: 'food', description: 'Groceries', date: '2024-01-15' }],
        ['addExpense', { amount: 30, category: 'food', description: 'Restaurant', date: '2024-01-16' }],
        ['addExpense', { amount: 100, category: 'transport', description: 'Gas', date: '2024-01-15' }],
        ['getSummary']
      ]
    ],
    expected: {
      total: 180,
      byCategory: { food: 80, transport: 100 },
      count: 3
    }
  },
  {
    input: [
      [
        ['addExpense', { amount: 50, category: 'food', description: 'Lunch', date: '2024-01-10' }],
        ['addExpense', { amount: 75, category: 'food', description: 'Dinner', date: '2024-01-20' }],
        ['addExpense', { amount: 200, category: 'rent', description: 'Office', date: '2024-02-01' }],
        ['getByDateRange', '2024-01-01', '2024-01-31']
      ]
    ],
    expected: [
      { id: 1, amount: 50, category: 'food', description: 'Lunch', date: '2024-01-10' },
      { id: 2, amount: 75, category: 'food', description: 'Dinner', date: '2024-01-20' }
    ]
  },
  {
    input: [
      [
        ['addExpense', { amount: 50, category: 'food', description: 'Lunch', date: '2024-01-10' }],
        ['addExpense', { amount: 100, category: 'transport', description: 'Gas', date: '2024-01-10' }],
        ['getByCategory', 'food']
      ]
    ],
    expected: [
      { id: 1, amount: 50, category: 'food', description: 'Lunch', date: '2024-01-10' }
    ]
  },
  {
    input: [
      [
        ['setBudget', 'food', 100],
        ['addExpense', { amount: 60, category: 'food', description: 'Groceries', date: '2024-01-10' }],
        ['addExpense', { amount: 50, category: 'food', description: 'Restaurant', date: '2024-01-11' }],
        ['isOverBudget', 'food']
      ]
    ],
    expected: true
  },
  {
    input: [
      [
        ['setBudget', 'food', 200],
        ['addExpense', { amount: 50, category: 'food', description: 'Lunch', date: '2024-01-10' }],
        ['isOverBudget', 'food']
      ]
    ],
    expected: false
  },
  {
    input: [
      [
        ['addExpense', { amount: 500, category: 'rent', description: 'Apartment', date: '2024-01-01' }],
        ['addExpense', { amount: 200, category: 'food', description: 'Groceries', date: '2024-01-05' }],
        ['addExpense', { amount: 100, category: 'transport', description: 'Bus', date: '2024-01-10' }],
        ['getTopCategories', 2]
      ]
    ],
    expected: [
      { category: 'rent', total: 500 },
      { category: 'food', total: 200 }
    ]
  },
  {
    input: [
      [
        ['addExpense', { amount: 50, category: 'food', description: 'Lunch', date: '2024-01-10' }],
        ['removeExpense', 1],
        ['getSummary']
      ]
    ],
    expected: { total: 0, byCategory: {}, count: 0 }
  }
];
