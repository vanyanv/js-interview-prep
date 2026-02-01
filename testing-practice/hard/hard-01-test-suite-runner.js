/*
Problem: Test Suite Runner
Difficulty: Hard
Category: Testing - Test Framework

Create a mini test framework that can run multiple test suites with setup/teardown.

Example 1:
  Input: suite with setup, tests, and teardown functions
  Output: { 
    passed: 2, 
    failed: 1, 
    total: 3, 
    results: [{ name: "test1", passed: true }, ...] 
  }

Requirements:
  - Run setup before each test
  - Run teardown after each test
  - Execute all tests and collect results
  - Handle async tests
  - Provide detailed test results

Time Complexity: O(n) where n is number of tests
Space Complexity: O(n) for results storage

Hints:
  - Use async/await for test execution
  - Handle setup/teardown errors
  - Catch test function errors
  - Maintain test isolation
  - Return comprehensive results
*/

export const functionName = 'runTestSuite';

export const tests = [
  {
    input: [{
      setup: () => ({ counter: 0 }),
      teardown: () => {},
      tests: [
        {
          name: "increment test",
          fn: (context) => context.counter + 1 === 1
        },
        {
          name: "decrement test", 
          fn: (context) => context.counter - 1 === -1
        }
      ]
    }],
    expected: {
      passed: 2,
      failed: 0,
      total: 2,
      results: expect.any(Array)
    }
  }
];