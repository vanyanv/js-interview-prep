/*
Problem: Min Stack
Difficulty: Medium
Category: Stack, Design
LeetCode: #155
Pattern: Stack (Design with Auxiliary Data)

Design a stack that supports push, pop, top, and retrieving the minimum element
in constant time.

Implement the MinStack class:
- MinStack() initializes the stack object.
- void push(int val) pushes the element val onto the stack.
- void pop() removes the element on the top of the stack.
- int top() gets the top element of the stack.
- int getMin() retrieves the minimum element in the stack.

You must implement a solution with O(1) time complexity for each function.

Example 1:
  Input:
  ["MinStack","push","push","push","getMin","pop","top","getMin"]
  [[],[-2],[0],[-3],[],[],[],[]]

  Output:
  [null,null,null,null,-3,null,0,-2]

  Explanation:
  MinStack minStack = new MinStack();
  minStack.push(-2);
  minStack.push(0);
  minStack.push(-3);
  minStack.getMin(); // return -3
  minStack.pop();
  minStack.top();    // return 0
  minStack.getMin(); // return -2

Constraints:
  - -2^31 <= val <= 2^31 - 1
  - Methods pop, top and getMin operations will always be called on non-empty stacks.
  - At most 3 * 10^4 calls will be made to push, pop, top, and getMin.

Time Complexity: O(1) for all operations
Space Complexity: O(n) for storing elements

Pattern Notes:
  - Use auxiliary stack to track minimums
  - Main stack stores all elements
  - Min stack stores minimum at each level
  - When pushing: compare with current min
  - When popping: remove from both stacks
  - Alternative: Store pairs (value, min_so_far) in single stack
*/

export const functionName = 'MinStack';

export const tests = [
  {
    input: [["MinStack","push","push","push","getMin","pop","top","getMin"], [[],[-2],[0],[-3],[],[],[],[]]],
    expected: [null,null,null,null,-3,null,0,-2]
  },
  {
    input: [["MinStack","push","push","getMin","push","getMin"], [[],[2],[3],[],[1],[]]],
    expected: [null,null,null,2,null,1]
  },
  {
    input: [["MinStack","push","getMin","push","getMin","top"], [[],[1],[],[2],[],[]]],
    expected: [null,null,1,null,1,2]
  },
  {
    input: [["MinStack","push","push","top","getMin","pop","getMin"], [[],[1],[1],[],[],[],[]]],
    expected: [null,null,null,1,1,null,1]
  },
  {
    input: [["MinStack","push","push","push","top","pop","getMin","pop","getMin","pop","push","top","getMin","push","top","getMin","pop","getMin"], [[],[2],[0],[3],[],[],[],[],[],[],[1],[],[],[1],[],[],[],[]]],
    expected: [null,null,null,null,3,null,0,null,0,null,null,1,1,null,1,1,null,1]
  }
];

/**
 * Design a stack with O(1) min operation
 */
class MinStack {
    constructor() {
        this.stack = [];
        this.minStack = [];
    }

    /**
     * Push element onto stack
     * @param {number} val - Value to push
     */
    push(val) {
        this.stack.push(val);

        // Push to min stack if it's empty or val is <= current minimum
        if (this.minStack.length === 0 || val <= this.minStack[this.minStack.length - 1]) {
            this.minStack.push(val);
        }
    }

    /**
     * Remove top element from stack
     */
    pop() {
        const popped = this.stack.pop();

        // If popped element was the minimum, remove from min stack too
        if (popped === this.minStack[this.minStack.length - 1]) {
            this.minStack.pop();
        }
    }

    /**
     * Get top element of stack
     * @return {number} Top element
     */
    top() {
        return this.stack[this.stack.length - 1];
    }

    /**
     * Get minimum element in stack
     * @return {number} Minimum element
     */
    getMin() {
        return this.minStack[this.minStack.length - 1];
    }
}

export default MinStack;