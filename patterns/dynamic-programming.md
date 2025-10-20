# Dynamic Programming Pattern

## When to Use
- Problem has overlapping subproblems
- Problem has optimal substructure
- Recursive solution exists but is inefficient
- Optimization problems (min/max, count ways)
- Decision problems with multiple choices
- Can be broken into subproblems that build up to solution

## Core Principles
1. **Overlapping Subproblems** - Same subproblems solved multiple times
2. **Optimal Substructure** - Optimal solution contains optimal solutions to subproblems
3. **Memoization** - Store results to avoid recomputation

## Approaches

### 1. Top-Down (Memoization)
```javascript
function fibMemo(n, memo = {}) {
  // Base cases
  if (n <= 1) return n;
  if (n in memo) return memo[n];

  // Recursive case with memoization
  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
}
```

### 2. Bottom-Up (Tabulation)
```javascript
function fibTab(n) {
  if (n <= 1) return n;

  const dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}
```

### 3. Space Optimized
```javascript
function fibOptimized(n) {
  if (n <= 1) return n;

  let prev2 = 0;
  let prev1 = 1;

  for (let i = 2; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}
```

## Common DP Patterns

### 1. Linear DP (1D)
```javascript
// Climbing stairs
function climbStairs(n) {
  if (n <= 2) return n;

  const dp = new Array(n + 1);
  dp[1] = 1;
  dp[2] = 2;

  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}

// House robber
function rob(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  const dp = new Array(nums.length);
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);

  for (let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
  }

  return dp[nums.length - 1];
}
```

### 2. Grid DP (2D)
```javascript
// Unique paths
function uniquePaths(m, n) {
  const dp = Array(m).fill().map(() => Array(n).fill(1));

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }

  return dp[m - 1][n - 1];
}

// Minimum path sum
function minPathSum(grid) {
  const m = grid.length;
  const n = grid[0].length;
  const dp = Array(m).fill().map(() => Array(n).fill(0));

  // Initialize first cell
  dp[0][0] = grid[0][0];

  // Initialize first row
  for (let j = 1; j < n; j++) {
    dp[0][j] = dp[0][j - 1] + grid[0][j];
  }

  // Initialize first column
  for (let i = 1; i < m; i++) {
    dp[i][0] = dp[i - 1][0] + grid[i][0];
  }

  // Fill the rest
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
    }
  }

  return dp[m - 1][n - 1];
}
```

### 3. String DP
```javascript
// Longest common subsequence
function longestCommonSubsequence(text1, text2) {
  const m = text1.length;
  const n = text2.length;
  const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
}

// Edit distance
function minDistance(word1, word2) {
  const m = word1.length;
  const n = word2.length;
  const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));

  // Initialize base cases
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,     // Delete
          dp[i][j - 1] + 1,     // Insert
          dp[i - 1][j - 1] + 1  // Replace
        );
      }
    }
  }

  return dp[m][n];
}
```

### 4. Knapsack Problems
```javascript
// 0/1 Knapsack
function knapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= capacity; w++) {
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(
          dp[i - 1][w], // Don't take item
          dp[i - 1][w - weights[i - 1]] + values[i - 1] // Take item
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  return dp[n][capacity];
}

// Coin change
function coinChange(coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}
```

### 5. Subsequence DP
```javascript
// Longest increasing subsequence
function lengthOfLIS(nums) {
  if (nums.length === 0) return 0;

  const dp = Array(nums.length).fill(1);

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  return Math.max(...dp);
}
```

## State Design Patterns

### State Definition
```javascript
// dp[i] = optimal solution for first i elements
// dp[i][j] = optimal solution for first i elements with constraint j
// dp[i][j][k] = optimal solution with multiple constraints
```

### State Transitions
```javascript
// Linear: dp[i] = f(dp[i-1], dp[i-2], ...)
// Grid: dp[i][j] = f(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
// Choice: dp[i] = min/max(choice1, choice2, ...)
```

## Advanced Techniques

### State Compression
```javascript
// Instead of 2D array, use 1D
function uniquePathsOptimized(m, n) {
  let dp = Array(n).fill(1);

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[j] += dp[j - 1];
    }
  }

  return dp[n - 1];
}
```

### Range DP
```javascript
function longestPalindromeSubseq(s) {
  const n = s.length;
  const dp = Array(n).fill().map(() => Array(n).fill(0));

  // Base case: single characters
  for (let i = 0; i < n; i++) {
    dp[i][i] = 1;
  }

  // Fill by length
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;

      if (s[i] === s[j]) {
        dp[i][j] = dp[i + 1][j - 1] + 2;
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[0][n - 1];
}
```

## Problem Categories

### 1. Counting Problems
- Climbing stairs, unique paths
- Number of ways to decode
- Combination sum IV

### 2. Optimization Problems
- Maximum subarray, house robber
- Best time to buy/sell stock
- Minimum path sum

### 3. Decision Problems
- Partition equal subset sum
- Word break, palindrome partitioning

### 4. String Problems
- Edit distance, longest common subsequence
- Regular expression matching
- Interleaving string

## DP Problem-Solving Steps

1. **Identify if it's a DP problem**
   - Optimal substructure?
   - Overlapping subproblems?

2. **Define the state**
   - What does dp[i] represent?
   - What are the dimensions?

3. **Find the recurrence relation**
   - How to calculate dp[i] from previous states?

4. **Determine base cases**
   - What are the smallest subproblems?

5. **Decide the order of computation**
   - Bottom-up or top-down?

6. **Optimize space if possible**
   - Can we reduce dimensions?

## Tips
- Start with recursive solution, then add memoization
- Draw state transition diagram for complex problems
- Consider both time and space complexity
- Practice identifying DP patterns in problems
- Use meaningful variable names for states
- Test with small examples first