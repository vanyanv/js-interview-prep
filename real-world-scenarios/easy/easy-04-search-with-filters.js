/*
Problem: Search with Filters
Difficulty: Easy
Category: Real World - Data Querying

Create a search engine that can search and filter a dataset by multiple criteria.

Example 1:
  Input: search(products, { query: 'laptop', category: 'electronics' })
  Output: [{ name: 'Gaming Laptop', category: 'electronics', price: 999 }]

Example 2:
  Input: search(products, { minPrice: 50, maxPrice: 200 })
  Output: [matching products within price range]

Requirements:
  - Text search across specified fields (case-insensitive)
  - Filter by exact match on category
  - Filter by numeric range (min/max price)
  - Support combining multiple filters (AND logic)
  - Sort results by a specified field (asc/desc)
  - Return empty array when no matches

Time Complexity: O(n * m) where n is items and m is search fields
Space Complexity: O(n) for results

Hints:
  - Use Array.filter with combined conditions
  - Normalize strings to lowercase for case-insensitive search
  - Apply each filter sequentially or combine into a single predicate
  - Use Array.sort for ordering results
*/

export const functionName = 'searchWithFilters';

const sampleData = [
  { id: 1, name: 'Gaming Laptop', category: 'electronics', price: 999, rating: 4.5 },
  { id: 2, name: 'Wireless Mouse', category: 'electronics', price: 29, rating: 4.2 },
  { id: 3, name: 'JavaScript Book', category: 'books', price: 39, rating: 4.8 },
  { id: 4, name: 'Standing Desk', category: 'furniture', price: 450, rating: 4.0 },
  { id: 5, name: 'Laptop Stand', category: 'furniture', price: 79, rating: 4.3 },
  { id: 6, name: 'React Handbook', category: 'books', price: 29, rating: 4.6 },
  { id: 7, name: 'Mechanical Keyboard', category: 'electronics', price: 149, rating: 4.7 },
  { id: 8, name: 'Node.js Guide', category: 'books', price: 45, rating: 4.1 }
];

export const tests = [
  {
    input: [sampleData, { query: 'laptop' }],
    expected: [
      { id: 1, name: 'Gaming Laptop', category: 'electronics', price: 999, rating: 4.5 },
      { id: 5, name: 'Laptop Stand', category: 'furniture', price: 79, rating: 4.3 }
    ]
  },
  {
    input: [sampleData, { category: 'books' }],
    expected: [
      { id: 3, name: 'JavaScript Book', category: 'books', price: 39, rating: 4.8 },
      { id: 6, name: 'React Handbook', category: 'books', price: 29, rating: 4.6 },
      { id: 8, name: 'Node.js Guide', category: 'books', price: 45, rating: 4.1 }
    ]
  },
  {
    input: [sampleData, { minPrice: 50, maxPrice: 200 }],
    expected: [
      { id: 5, name: 'Laptop Stand', category: 'furniture', price: 79, rating: 4.3 },
      { id: 7, name: 'Mechanical Keyboard', category: 'electronics', price: 149, rating: 4.7 }
    ]
  },
  {
    input: [sampleData, { query: 'laptop', category: 'electronics' }],
    expected: [
      { id: 1, name: 'Gaming Laptop', category: 'electronics', price: 999, rating: 4.5 }
    ]
  },
  {
    input: [sampleData, { category: 'books', sortBy: 'price', order: 'asc' }],
    expected: [
      { id: 6, name: 'React Handbook', category: 'books', price: 29, rating: 4.6 },
      { id: 3, name: 'JavaScript Book', category: 'books', price: 39, rating: 4.8 },
      { id: 8, name: 'Node.js Guide', category: 'books', price: 45, rating: 4.1 }
    ]
  },
  {
    input: [sampleData, { query: 'nonexistent' }],
    expected: []
  },
  {
    input: [sampleData, {}],
    expected: sampleData
  }
];
