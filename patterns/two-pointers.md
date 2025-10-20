# Two Pointers Pattern

## When to Use
- Array/string is sorted or partially sorted
- Need to find pairs, triplets, or subarrays with specific properties
- Want to avoid nested loops (optimize from O(n²) to O(n))

## Common Variations

### 1. Start and End Pointers
```javascript
function twoPointers(arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    // Process elements at arr[left] and arr[right]

    if (condition) {
      left++;
    } else {
      right--;
    }
  }
}
```

### 2. Same Direction (Fast and Slow)
```javascript
function fastSlow(arr) {
  let slow = 0;
  let fast = 0;

  while (fast < arr.length) {
    if (condition) {
      // Process or swap
      arr[slow] = arr[fast];
      slow++;
    }
    fast++;
  }
}
```

## Classic Problems
1. **Two Sum (sorted array)** - Start/End pointers
2. **Container With Most Water** - Start/End, move smaller height
3. **Remove Duplicates** - Fast/Slow pointers
4. **Three Sum** - Fix one, use two pointers for rest
5. **Palindrome Check** - Start/End moving toward center

## Tips
- Always check pointer bounds
- Think about when to move which pointer
- Consider sorting first if it helps