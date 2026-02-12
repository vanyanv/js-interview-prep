/*
Problem: Implement Queue using Stacks
Difficulty: Easy
Category: Stack, Queue, Design
LeetCode: #232
Pattern: Stack (Design Conversion)

Implement a first in first out (FIFO) queue using only two stacks.
The implemented queue should support all the functions of a normal queue
(push, peek, pop, and empty).

Implement the MyQueue class:
- void push(int x) Pushes element x to the back of the queue.
- int pop() Removes the element from the front of the queue and returns it.
- int peek() Returns the element at the front of the queue.
- boolean empty() Returns true if the queue is empty, false otherwise.

Notes:
- You must use only standard operations of a stack, which means only push to top,
  peek/pop from top, size, and is empty operations are valid.
- Depending on your language, the stack may not be supported natively.

Example 1:
  Input:
  ["MyQueue", "push", "push", "peek", "pop", "empty"]
  [[], [1], [2], [], [], []]
  Output:
  [null, null, null, 1, 1, false]

  Explanation:
  MyQueue myQueue = new MyQueue();
  myQueue.push(1); // queue is: [1]
  myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
  myQueue.peek(); // return 1
  myQueue.pop(); // return 1, queue is [2]
  myQueue.empty(); // return false

Constraints:
  - 1 <= x <= 9
  - At most 100 calls will be made to push, pop, peek, and empty.
  - All the calls to pop and peek are valid.

Time Complexity:
  - push: O(1)
  - pop: Amortized O(1)
  - peek: Amortized O(1)
  - empty: O(1)
Space Complexity: O(n)

Pattern Notes:
  - Use two stacks: input stack and output stack
  - Push always goes to input stack
  - Pop/peek from output stack (transfer from input if needed)
  - Transfer reverses order, converting LIFO to FIFO
  - Amortized analysis: each element transferred at most once
*/

export const functionName = 'MyQueue';

export const tests = [
  {
    input: [["MyQueue", "push", "push", "peek", "pop", "empty"], [[], [1], [2], [], [], []]],
    expected: [null, null, null, 1, 1, false]
  },
  {
    input: [["MyQueue", "push", "peek", "pop", "empty"], [[], [1], [], [], []]],
    expected: [null, null, 1, 1, true]
  },
  {
    input: [["MyQueue", "push", "push", "push", "pop", "pop", "pop", "empty"], [[], [1], [2], [3], [], [], [], []]],
    expected: [null, null, null, null, 1, 2, 3, true]
  },
  {
    input: [["MyQueue", "push", "pop", "push", "push", "peek", "pop"], [[], [1], [], [2], [3], [], []]],
    expected: [null, null, 1, null, null, 2, 2]
  },
  {
    input: [["MyQueue", "empty"], [[], []]],
    expected: [null, true]
  }
];

/**
 * Implement queue using two stacks
 */
class MyQueue {
    constructor() {
        this.inputStack = [];   // For push operations
        this.outputStack = [];  // For pop/peek operations
    }

    /**
     * Push element to back of queue
     * @param {number} x - Element to push
     */
    push(x) {
        this.inputStack.push(x);
    }

    /**
     * Remove and return front element
     * @return {number} Front element
     */
    pop() {
        this._moveInputToOutput();
        return this.outputStack.pop();
    }

    /**
     * Return front element without removing
     * @return {number} Front element
     */
    peek() {
        this._moveInputToOutput();
        return this.outputStack[this.outputStack.length - 1];
    }

    /**
     * Check if queue is empty
     * @return {boolean} True if empty
     */
    empty() {
        return this.inputStack.length === 0 && this.outputStack.length === 0;
    }

    /**
     * Helper: Move elements from input to output stack
     * @private
     */
    _moveInputToOutput() {
        // Only move if output stack is empty
        if (this.outputStack.length === 0) {
            while (this.inputStack.length > 0) {
                this.outputStack.push(this.inputStack.pop());
            }
        }
    }
}

export default MyQueue;