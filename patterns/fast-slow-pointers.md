# Fast & Slow Pointers Pattern

## When to Use
- Linked list problems involving cycles
- Finding middle of linked list
- Detecting patterns in sequences
- Problems requiring "gap" between pointers
- When you need to traverse at different speeds

## Core Concept
Use two pointers moving at different speeds to solve problems efficiently.

## Common Variations

### 1. Cycle Detection (Floyd's Algorithm)
```javascript
function hasCycle(head) {
  if (!head || !head.next) return false;

  let slow = head;
  let fast = head;

  // Move pointers at different speeds
  while (fast && fast.next) {
    slow = slow.next;        // Move 1 step
    fast = fast.next.next;   // Move 2 steps

    if (slow === fast) {
      return true; // Cycle detected
    }
  }

  return false;
}
```

### 2. Finding Middle Element
```javascript
function findMiddle(head) {
  if (!head) return null;

  let slow = head;
  let fast = head;

  // When fast reaches end, slow is at middle
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow; // Middle node
}
```

### 3. Finding Cycle Start
```javascript
function detectCycle(head) {
  if (!head || !head.next) return null;

  let slow = head;
  let fast = head;

  // Phase 1: Detect if cycle exists
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) break;
  }

  if (!fast || !fast.next) return null; // No cycle

  // Phase 2: Find cycle start
  slow = head;
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }

  return slow; // Cycle start
}
```

### 4. Gap Technique (Remove Nth from End)
```javascript
function removeNthFromEnd(head, n) {
  let dummy = { next: head };
  let slow = dummy;
  let fast = dummy;

  // Create gap of n+1 between pointers
  for (let i = 0; i <= n; i++) {
    fast = fast.next;
  }

  // Move both until fast reaches end
  while (fast) {
    slow = slow.next;
    fast = fast.next;
  }

  // Remove the nth node
  slow.next = slow.next.next;
  return dummy.next;
}
```

## Non-Linked List Applications

### Happy Number
```javascript
function isHappy(n) {
  function getNext(num) {
    let sum = 0;
    while (num > 0) {
      const digit = num % 10;
      sum += digit * digit;
      num = Math.floor(num / 10);
    }
    return sum;
  }

  let slow = n;
  let fast = n;

  do {
    slow = getNext(slow);
    fast = getNext(getNext(fast));
  } while (slow !== fast);

  return slow === 1;
}
```

### Array Cycle Detection
```javascript
function findDuplicate(nums) {
  // Phase 1: Find intersection point
  let slow = nums[0];
  let fast = nums[0];

  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);

  // Phase 2: Find entrance to cycle
  slow = nums[0];
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }

  return slow;
}
```

## Key Patterns

### Speed Ratios
- **1:2 ratio** - Most common (slow: 1 step, fast: 2 steps)
- **1:k ratio** - For specific requirements
- **Variable speed** - Adjust based on conditions

### Problem Types
1. **Cycle Detection** - Does a cycle exist?
2. **Cycle Start** - Where does the cycle begin?
3. **Middle Finding** - What's the middle element?
4. **Gap Problems** - nth from end, palindrome checking
5. **Intersection** - Where do two paths meet?

## Classic Problems
1. **Linked List Cycle** - Basic cycle detection
2. **Linked List Cycle II** - Find cycle start
3. **Middle of Linked List** - Find middle node
4. **Remove Nth Node from End** - Gap technique
5. **Palindrome Linked List** - Middle + reverse
6. **Happy Number** - Cycle detection in sequences
7. **Find Duplicate Number** - Array as linked list

## Advanced Techniques

### Palindrome Checking
```javascript
function isPalindrome(head) {
  if (!head || !head.next) return true;

  // Find middle
  let slow = head;
  let fast = head;
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // Reverse second half
  let secondHalf = reverseList(slow.next);

  // Compare both halves
  let firstHalf = head;
  while (secondHalf) {
    if (firstHalf.val !== secondHalf.val) return false;
    firstHalf = firstHalf.next;
    secondHalf = secondHalf.next;
  }

  return true;
}
```

## Tips
- Always check for null pointers
- Fast pointer should check both `fast` and `fast.next`
- Use dummy nodes for edge cases
- Consider what happens when list length is odd vs even
- Pattern often involves two phases: detection + finding specific position