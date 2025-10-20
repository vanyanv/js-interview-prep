# Stack Pattern

## When to Use
- Need Last-In-First-Out (LIFO) behavior
- Matching/pairing problems (parentheses, brackets)
- Function call simulation or backtracking
- When you need to "undo" operations
- Processing nested structures
- Finding next greater/smaller elements

## Core Operations
```javascript
const stack = [];
stack.push(item);    // Add to top
const item = stack.pop();  // Remove from top
const top = stack[stack.length - 1];  // Peek at top
const isEmpty = stack.length === 0;   // Check if empty
```

## Common Patterns

### 1. Matching/Pairing
```javascript
function isValid(s) {
  const stack = [];
  const pairs = { ')': '(', '}': '{', ']': '[' };

  for (const char of s) {
    if (char in pairs) {
      // Closing bracket
      if (stack.length === 0 || stack.pop() !== pairs[char]) {
        return false;
      }
    } else {
      // Opening bracket
      stack.push(char);
    }
  }

  return stack.length === 0;
}
```

### 2. Monotonic Stack (Next Greater Element)
```javascript
function nextGreaterElements(nums) {
  const result = new Array(nums.length).fill(-1);
  const stack = []; // Store indices

  for (let i = 0; i < nums.length; i++) {
    // Pop elements smaller than current
    while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[i]) {
      const index = stack.pop();
      result[index] = nums[i];
    }
    stack.push(i);
  }

  return result;
}
```

### 3. Expression Evaluation
```javascript
function evalRPN(tokens) {
  const stack = [];
  const operators = {
    '+': (b, a) => a + b,
    '-': (b, a) => a - b,
    '*': (b, a) => a * b,
    '/': (b, a) => Math.trunc(a / b)
  };

  for (const token of tokens) {
    if (token in operators) {
      const b = stack.pop();
      const a = stack.pop();
      stack.push(operators[token](b, a));
    } else {
      stack.push(parseInt(token));
    }
  }

  return stack[0];
}
```

### 4. Histogram Problems
```javascript
function largestRectangleArea(heights) {
  const stack = [];
  let maxArea = 0;

  for (let i = 0; i <= heights.length; i++) {
    const currentHeight = i === heights.length ? 0 : heights[i];

    while (stack.length > 0 && heights[stack[stack.length - 1]] > currentHeight) {
      const height = heights[stack.pop()];
      const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, height * width);
    }

    stack.push(i);
  }

  return maxArea;
}
```

## Stack Variations

### Min/Max Stack
```javascript
class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = [];
  }

  push(val) {
    this.stack.push(val);
    if (this.minStack.length === 0 || val <= this.getMin()) {
      this.minStack.push(val);
    }
  }

  pop() {
    const val = this.stack.pop();
    if (val === this.getMin()) {
      this.minStack.pop();
    }
    return val;
  }

  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}
```

### Using Stack to Simulate Recursion
```javascript
function iterativeInorder(root) {
  const result = [];
  const stack = [];
  let current = root;

  while (current || stack.length > 0) {
    // Go to leftmost node
    while (current) {
      stack.push(current);
      current = current.left;
    }

    // Process current node
    current = stack.pop();
    result.push(current.val);

    // Move to right subtree
    current = current.right;
  }

  return result;
}
```

## Problem Types

### 1. Matching Problems
- Valid parentheses
- Remove outermost parentheses
- Generate parentheses
- Minimum add to make valid

### 2. Monotonic Stack Problems
- Next greater element
- Daily temperatures
- Largest rectangle in histogram
- Trapping rain water

### 3. Expression Problems
- Basic calculator
- Evaluate reverse polish notation
- Decode string
- Remove K digits

### 4. String Processing
- Remove adjacent duplicates
- Backspace string compare
- Make the string great
- Simplify path

### 5. Simulation Problems
- Baseball game
- Asteroid collision
- 132 pattern
- Online stock span

## Advanced Patterns

### Decode String
```javascript
function decodeString(s) {
  const countStack = [];
  const stringStack = [];
  let currentString = '';
  let currentCount = 0;

  for (const char of s) {
    if (char >= '0' && char <= '9') {
      currentCount = currentCount * 10 + parseInt(char);
    } else if (char === '[') {
      countStack.push(currentCount);
      stringStack.push(currentString);
      currentCount = 0;
      currentString = '';
    } else if (char === ']') {
      const count = countStack.pop();
      const prevString = stringStack.pop();
      currentString = prevString + currentString.repeat(count);
    } else {
      currentString += char;
    }
  }

  return currentString;
}
```

### Asteroid Collision
```javascript
function asteroidCollision(asteroids) {
  const stack = [];

  for (const asteroid of asteroids) {
    let alive = true;

    while (alive && asteroid < 0 && stack.length > 0 && stack[stack.length - 1] > 0) {
      const top = stack[stack.length - 1];

      if (top < -asteroid) {
        stack.pop(); // Top asteroid explodes
      } else if (top === -asteroid) {
        stack.pop(); // Both explode
        alive = false;
      } else {
        alive = false; // Current asteroid explodes
      }
    }

    if (alive) {
      stack.push(asteroid);
    }
  }

  return stack;
}
```

## Tips
- Always check if stack is empty before popping
- Consider using indices instead of values in monotonic stacks
- For matching problems, push opening elements and match with closing
- Use dummy elements to simplify edge cases
- Stack can help convert recursive solutions to iterative ones
- Monotonic stacks maintain elements in increasing/decreasing order