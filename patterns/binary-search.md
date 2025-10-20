# Binary Search Pattern

## When to Use
- Array is sorted (or can be sorted)
- Searching for a specific value or condition
- Finding insertion position
- Optimizing from O(n) to O(log n)
- Search on answer space
- Finding boundaries (first/last occurrence)

## Basic Template
```javascript
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1; // Not found
}
```

## Common Variations

### 1. Find Insert Position
```javascript
function searchInsert(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left; // Insert position
}
```

### 2. Find First/Last Occurrence
```javascript
function findFirst(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let result = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      result = mid;
      right = mid - 1; // Continue searching left
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result;
}

function findLast(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let result = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      result = mid;
      left = mid + 1; // Continue searching right
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result;
}
```

### 3. Search in Rotated Array
```javascript
function searchRotated(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) return mid;

    // Left half is sorted
    if (nums[left] <= nums[mid]) {
      if (target >= nums[left] && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    // Right half is sorted
    else {
      if (target > nums[mid] && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1;
}
```

### 4. Binary Search on Answer Space
```javascript
function kokoEatingBananas(piles, h) {
  function canFinish(speed) {
    let hours = 0;
    for (const pile of piles) {
      hours += Math.ceil(pile / speed);
    }
    return hours <= h;
  }

  let left = 1;
  let right = Math.max(...piles);

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (canFinish(mid)) {
      right = mid; // Try smaller speed
    } else {
      left = mid + 1; // Need faster speed
    }
  }

  return left;
}
```

## Advanced Patterns

### Peak Finding
```javascript
function findPeakElement(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] > nums[mid + 1]) {
      right = mid; // Peak is in left half
    } else {
      left = mid + 1; // Peak is in right half
    }
  }

  return left;
}
```

### Search 2D Matrix
```javascript
function searchMatrix(matrix, target) {
  if (!matrix.length || !matrix[0].length) return false;

  const m = matrix.length;
  const n = matrix[0].length;
  let left = 0;
  let right = m * n - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const row = Math.floor(mid / n);
    const col = mid % n;
    const value = matrix[row][col];

    if (value === target) {
      return true;
    } else if (value < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return false;
}
```

### Minimize Maximum
```javascript
function shipWithinDays(weights, days) {
  function canShip(capacity) {
    let currentWeight = 0;
    let daysNeeded = 1;

    for (const weight of weights) {
      if (currentWeight + weight > capacity) {
        daysNeeded++;
        currentWeight = weight;
      } else {
        currentWeight += weight;
      }
    }

    return daysNeeded <= days;
  }

  let left = Math.max(...weights);
  let right = weights.reduce((sum, w) => sum + w, 0);

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (canShip(mid)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}
```

## Problem Categories

### 1. Basic Search
- Binary search
- Search insert position
- Find first and last position
- Search in rotated sorted array

### 2. Search on Answer Space
- Koko eating bananas
- Capacity to ship packages
- Split array largest sum
- Minimum number of days to make bouquets

### 3. Peak/Valley Finding
- Find peak element
- Find minimum in rotated sorted array
- Peak index in mountain array

### 4. 2D Problems
- Search 2D matrix
- Search 2D matrix II
- Find K closest elements

### 5. Mathematical Problems
- Sqrt(x)
- Pow(x, n)
- Divide two integers

## Key Decision Points

### Loop Condition
- Use `left <= right` for exact search
- Use `left < right` for boundary search

### Mid Calculation
```javascript
// Prefer this to avoid overflow
const mid = left + Math.floor((right - left) / 2);
// Or
const mid = Math.floor((left + right) / 2);
```

### Update Rules
- **Finding exact value:** `left = mid + 1` or `right = mid - 1`
- **Finding boundary:** `left = mid + 1` or `right = mid`

## Tips
- Always consider the search space carefully
- Think about what you're searching for (value, position, answer)
- Use helper functions for complex conditions
- Be careful with integer overflow in mid calculation
- Test with small examples to verify logic
- Remember: if array size is n, you need at most log₂(n) comparisons