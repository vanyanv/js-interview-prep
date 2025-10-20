# Recursion Pattern

## When to Use
- Problem can be broken into smaller similar subproblems
- Tree or graph traversal
- Divide and conquer algorithms
- Backtracking problems
- Mathematical computations (factorial, Fibonacci)
- When iteration becomes complex but recursion is natural

## Core Components
Every recursive function needs:
1. **Base case** - stopping condition
2. **Recursive case** - function calls itself with modified input
3. **Progress toward base case** - input gets smaller/simpler

## Basic Template
```javascript
function recursiveFunction(input) {
  // Base case - stopping condition
  if (/* base condition */) {
    return /* base result */;
  }

  // Recursive case - break down problem
  const smallerInput = /* modify input */;
  const result = recursiveFunction(smallerInput);

  // Combine results (if needed)
  return /* combine result with current level */;
}
```

## Common Patterns

### 1. Linear Recursion
```javascript
function factorial(n) {
  // Base case
  if (n <= 1) return 1;

  // Recursive case
  return n * factorial(n - 1);
}

function fibonacci(n) {
  // Base cases
  if (n <= 1) return n;

  // Recursive case
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```

### 2. Tree Traversal
```javascript
// Inorder traversal
function inorderTraversal(root) {
  const result = [];

  function traverse(node) {
    if (!node) return; // Base case

    traverse(node.left);    // Left subtree
    result.push(node.val);  // Process current
    traverse(node.right);   // Right subtree
  }

  traverse(root);
  return result;
}

// Maximum depth
function maxDepth(root) {
  // Base case
  if (!root) return 0;

  // Recursive case
  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  return Math.max(leftDepth, rightDepth) + 1;
}
```

### 3. Divide and Conquer
```javascript
function mergeSort(arr) {
  // Base case
  if (arr.length <= 1) return arr;

  // Divide
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  // Conquer
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}
```

### 4. Backtracking
```javascript
function generateParentheses(n) {
  const result = [];

  function backtrack(current, open, close) {
    // Base case - valid combination found
    if (current.length === 2 * n) {
      result.push(current);
      return;
    }

    // Add opening parenthesis
    if (open < n) {
      backtrack(current + '(', open + 1, close);
    }

    // Add closing parenthesis
    if (close < open) {
      backtrack(current + ')', open, close + 1);
    }
  }

  backtrack('', 0, 0);
  return result;
}
```

## Advanced Patterns

### Memoization (Top-Down DP)
```javascript
function fibonacciMemo(n, memo = {}) {
  // Base cases
  if (n <= 1) return n;
  if (n in memo) return memo[n];

  // Recursive case with memoization
  memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
  return memo[n];
}
```

### Path Finding
```javascript
function hasPathSum(root, targetSum) {
  // Base case - null node
  if (!root) return false;

  // Base case - leaf node
  if (!root.left && !root.right) {
    return root.val === targetSum;
  }

  // Recursive case
  const remainingSum = targetSum - root.val;
  return hasPathSum(root.left, remainingSum) ||
         hasPathSum(root.right, remainingSum);
}
```

### String Processing
```javascript
function reverseString(s) {
  // Base case
  if (s.length <= 1) return s;

  // Recursive case
  return reverseString(s.slice(1)) + s[0];
}

function isPalindrome(s, left = 0, right = s.length - 1) {
  // Base case
  if (left >= right) return true;

  // Recursive case
  if (s[left] !== s[right]) return false;
  return isPalindrome(s, left + 1, right - 1);
}
```

## Tree Problems

### Validation
```javascript
function isValidBST(root) {
  function validate(node, min, max) {
    // Base case
    if (!node) return true;

    // Check BST property
    if (node.val <= min || node.val >= max) return false;

    // Recursive case
    return validate(node.left, min, node.val) &&
           validate(node.right, node.val, max);
  }

  return validate(root, -Infinity, Infinity);
}
```

### Tree Construction
```javascript
function sortedArrayToBST(nums) {
  // Base case
  if (nums.length === 0) return null;

  // Find middle
  const mid = Math.floor(nums.length / 2);
  const root = new TreeNode(nums[mid]);

  // Recursive case
  root.left = sortedArrayToBST(nums.slice(0, mid));
  root.right = sortedArrayToBST(nums.slice(mid + 1));

  return root;
}
```

## Optimization Techniques

### Tail Recursion
```javascript
function factorialTail(n, accumulator = 1) {
  // Base case
  if (n <= 1) return accumulator;

  // Tail recursive case
  return factorialTail(n - 1, n * accumulator);
}
```

### Mutual Recursion
```javascript
function isEven(n) {
  if (n === 0) return true;
  return isOdd(n - 1);
}

function isOdd(n) {
  if (n === 0) return false;
  return isEven(n - 1);
}
```

## Common Pitfalls

### Stack Overflow
```javascript
// Bad - no base case
function infiniteRecursion(n) {
  return infiniteRecursion(n - 1);
}

// Good - proper base case
function properRecursion(n) {
  if (n <= 0) return 0; // Base case
  return properRecursion(n - 1);
}
```

### Exponential Time Complexity
```javascript
// Bad - O(2^n)
function slowFib(n) {
  if (n <= 1) return n;
  return slowFib(n - 1) + slowFib(n - 2);
}

// Good - O(n) with memoization
function fastFib(n, memo = {}) {
  if (n <= 1) return n;
  if (n in memo) return memo[n];
  memo[n] = fastFib(n - 1, memo) + fastFib(n - 2, memo);
  return memo[n];
}
```

## When NOT to Use Recursion
- Simple iterative solutions exist
- Deep recursion might cause stack overflow
- Performance is critical and iteration is faster
- Memory usage is a concern

## Converting Recursion to Iteration
```javascript
// Recursive
function inorderRecursive(root) {
  const result = [];

  function traverse(node) {
    if (!node) return;
    traverse(node.left);
    result.push(node.val);
    traverse(node.right);
  }

  traverse(root);
  return result;
}

// Iterative using stack
function inorderIterative(root) {
  const result = [];
  const stack = [];
  let current = root;

  while (current || stack.length > 0) {
    while (current) {
      stack.push(current);
      current = current.left;
    }

    current = stack.pop();
    result.push(current.val);
    current = current.right;
  }

  return result;
}
```

## Tips
- Always identify base case first
- Ensure progress toward base case
- Consider memoization for overlapping subproblems
- Draw recursion tree for complex problems
- Test with small inputs first
- Be aware of stack overflow for deep recursion
- Consider iterative solutions for performance-critical code