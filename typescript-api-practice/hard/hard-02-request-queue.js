/*
Problem: Request Queue Management
Difficulty: Hard
Category: TypeScript API - Concurrency

Create a request queue system that manages API calls with rate limiting and batching.

Example 1:
  Input: requests = [url1, url2, url3], options = { concurrency: 2, rateLimit: 100 }
  Output: { 
    results: [response1, response2, response3], 
    totalTime: 450, 
    errors: [],
    processed: 3 
  }

Example 2:
  Input: requests = [batch1, batch2], options = { batchSize: 5, delay: 200 }
  Output: { 
    results: [...batchedResults...], 
    batches: 2, 
    totalTime: 600,
    processed: 10 
  }

Requirements:
  - Queue requests with configurable concurrency
  - Implement rate limiting between requests
  - Support request batching for efficiency
  - Handle failures with retry logic
  - Return comprehensive execution statistics

Time Complexity: O(n) where n is number of requests
Space Complexity: O(n)

Hints:
  - Use Promise pool pattern for concurrency control
  - Implement delay between batches for rate limiting
  - Track request states (pending, completed, failed)
  - Handle queue overflow and backpressure
  - Provide detailed execution metrics
*/

export const functionName = 'createRequestQueue';

export const tests = [
  {
    input: [
      ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2'],
      { concurrency: 2, rateLimit: 100 }
    ],
    expected: { 
      results: expect.any(Array),
      totalTime: expect.any(Number), 
      errors: expect.any(Array),
      processed: 2 
    }
  },
  {
    input: [
      ['https://jsonplaceholder.typicode.com/users/1'],
      { concurrency: 1, rateLimit: 0 }
    ],
    expected: { 
      results: expect.any(Array),
      totalTime: expect.any(Number), 
      errors: expect.any(Array),
      processed: 1 
    }
  }
];