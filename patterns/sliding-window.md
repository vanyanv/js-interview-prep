# Sliding Window Pattern

## When to Use
- Dealing with subarrays or substrings
- Need to find optimal contiguous elements
- Looking for longest/shortest/maximum/minimum window

## Types

### 1. Fixed Size Window
```javascript
function fixedWindow(arr, k) {
  let windowSum = 0;
  let maxSum = 0;

  // Build first window
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  maxSum = windowSum;

  // Slide window
  for (let i = k; i < arr.length; i++) {
    windowSum = windowSum - arr[i - k] + arr[i];
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}
```

### 2. Variable Size Window
```javascript
function variableWindow(s, condition) {
  let left = 0;
  let result = 0;
  let windowState = {}; // Track window contents

  for (let right = 0; right < s.length; right++) {
    // Expand window
    updateWindowState(s[right]);

    // Contract window if invalid
    while (!isValidWindow(windowState)) {
      removeFromWindow(s[left]);
      left++;
    }

    // Update result
    result = Math.max(result, right - left + 1);
  }

  return result;
}
```

## Classic Problems
1. **Maximum Sum Subarray of Size K** - Fixed window
2. **Longest Substring Without Repeating** - Variable window with Set
3. **Minimum Window Substring** - Variable window with frequency map
4. **Longest Substring with K Distinct** - Variable window with counter

## Tips
- Use hash maps/sets to track window contents
- Expand first, then contract to maintain validity
- Keep track of window boundaries carefully