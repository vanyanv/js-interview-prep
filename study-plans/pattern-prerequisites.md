# Pattern Prerequisites: What You Need to Understand Before Solving Problems

This guide covers the **conceptual foundations** behind three core interview patterns. Read this before jumping into problems — understanding the "why" will make patterns click faster than memorizing templates.

---

## 1. Two Pointers

### Why This Pattern Exists

The brute force approach to most array pair/triplet problems is nested loops — O(n^2) or worse. Two pointers reduce this to O(n) by using **structure in the data** (usually sorted order) to skip unnecessary comparisons.

The core idea: instead of checking every possible pair, use two pointers that systematically eliminate large chunks of the search space with each step.

### Mental Model

Imagine you have a sorted array and need to find two numbers that sum to a target:

```
[1, 3, 5, 7, 9]   target = 10
 ^              ^
 L              R
```

- `1 + 9 = 10` — found it!
- If the sum was too small, moving `L` right makes it bigger (next element is larger)
- If the sum was too big, moving `R` left makes it smaller (previous element is smaller)

**This only works because the array is sorted.** Each pointer movement eliminates an entire row/column of possibilities — you're not just skipping one pair, you're skipping many.

### Prerequisites You Must Know

**Array indexing**: Access elements by position, understand 0-based indexing
```javascript
const arr = [10, 20, 30];
arr[0]              // 10 (first)
arr[arr.length - 1] // 30 (last)
```

**Sorting**: Many two-pointer problems require sorting first
```javascript
arr.sort((a, b) => a - b);  // numeric ascending — ALWAYS use comparator
// Without comparator, [10, 9, 2] sorts to [10, 2, 9] (lexicographic!)
```

**While loops with multiple conditions**: Pointers move independently
```javascript
while (left < right) {
  // Both pointers are valid, haven't crossed
}
```

**Swap pattern**: Many problems require in-place swaps
```javascript
[arr[i], arr[j]] = [arr[j], arr[i]];  // destructuring swap
```

### The Three Variations You'll See

**1. Opposite ends (converging)**
Start at both ends, move inward. Used when you need to find pairs in sorted data.
```
[1, 2, 3, 4, 5]
 ^           ^      → pointers move toward each other
 L           R
```
- Move `L` right when you need a larger value
- Move `R` left when you need a smaller value
- Stop when `L >= R`

**2. Same direction (fast/slow)**
Both pointers start at the beginning. The fast pointer scans ahead while the slow pointer marks a position.
```
[0, 1, 0, 3, 0, 5]
 ^                    → slow marks where to write
 ^                    → fast scans every element
```
- Use when partitioning, removing elements, or finding duplicates in-place
- The slow pointer only moves when the fast pointer finds something interesting

**3. Anchored + scan**
Fix one pointer, use two more to scan the rest. This is how Three Sum works.
```
for (i = 0; i < arr.length; i++) {  // anchor
  let left = i + 1;
  let right = arr.length - 1;
  // two-pointer scan on remaining elements
}
```
- Reduces O(n^3) brute force to O(n^2)
- The outer loop is the anchor, inner two pointers do the searching

### Key Decision: When Do I Move Which Pointer?

This is the most important thing to understand. Ask yourself:

- **"Is my current result too small?"** → Move the pointer that will make it bigger (usually left pointer forward in sorted array)
- **"Is my current result too big?"** → Move the pointer that will make it smaller (usually right pointer backward)
- **"Did I find a match?"** → Process it, then move BOTH pointers (or just one depending on whether duplicates are allowed)

### Common Mistakes

1. **Forgetting to sort first** — Two pointer convergence only works on sorted data
2. **Using `<=` instead of `<`** — When `left === right` you're pointing at the same element, which usually isn't a valid pair
3. **Not handling duplicates** — In Three Sum, if `arr[i] === arr[i-1]`, skip it to avoid duplicate triplets
4. **Off-by-one on array boundaries** — Always check `left >= 0` and `right < arr.length`

---

## 2. Hash Maps

### Why This Pattern Exists

Many problems boil down to: "For each element, I need to quickly check if some related value exists." Without a hash map, that check is O(n) (scan the whole array). With a hash map, it's O(1).

This is the most common interview pattern because it's the foundation of the **space-time tradeoff**: use extra memory to avoid repeated work.

### Mental Model

Think of a hash map as a **lookup table you build as you go**. For every element you process, you either:
1. **Ask**: "Have I seen what I need before?" (lookup)
2. **Store**: "I'll remember this for later" (insert)

The Two Sum problem is the perfect example:
```
nums = [2, 7, 11, 15], target = 9

Processing 2: "Do I need 2? I need 9-2=7. Have I seen 7? No. Store {2: index 0}"
Processing 7: "Do I need 7? I need 9-7=2. Have I seen 2? YES at index 0!"
```

You're storing **what you've seen** and checking for **what you need** — this is the complement pattern.

### Prerequisites You Must Know

**Objects as hash maps** — The quickest way to do key-value storage:
```javascript
const map = {};
map['key'] = 'value';      // set
map['key']                  // get → 'value'
'key' in map                // check existence → true
delete map['key'];          // remove
Object.keys(map)            // all keys as array
```

**Map vs Object** — When to use which:
```javascript
// Use Object when keys are always strings (most interview problems)
const freq = {};
freq[char] = (freq[char] || 0) + 1;

// Use Map when keys might be non-strings, or you need .size
const map = new Map();
map.set(key, value);
map.get(key);
map.has(key);
map.size;
```

**Set for existence-only checks** — When you don't need to store a value, just track presence:
```javascript
const seen = new Set();
seen.add(element);
seen.has(element);    // O(1) lookup
seen.delete(element);
seen.size;
```

**The frequency counter pattern** — You'll use this constantly:
```javascript
const freq = {};
for (const char of string) {
  freq[char] = (freq[char] || 0) + 1;
}
// freq is now { 'a': 2, 'b': 1, ... }
```

**Iterating objects/maps:**
```javascript
for (const [key, value] of Object.entries(obj)) { }  // object
for (const [key, value] of map) { }                   // Map
for (const value of set) { }                          // Set
```

### The Four Hash Map Sub-Patterns

**1. Complement lookup** (Two Sum pattern)
Store elements as you iterate, check if the complement exists.
- Key insight: Store `value → index` so you can return positions
- "What do I need?" is the question, not "What do I have?"

**2. Frequency counting**
Count occurrences, then use the counts to answer the question.
- Anagram checking: both strings must have identical frequency maps
- Ransom note: target frequencies must be <= source frequencies
- Majority element: find the element with count > n/2

**3. Grouping**
Group elements by some computed key.
- Group Anagrams: sort each string to get a canonical key → `"eat" → "aet"`
- All strings with the same sorted form are anagrams

**4. Existence/deduplication**
Track what you've seen to detect duplicates or unique elements.
- Contains Duplicate: `if (set.has(num)) return true; set.add(num);`
- First Unique Character: build frequency map, then scan for count === 1

### Key Decision: Object, Map, or Set?

| Use this... | When... |
|-------------|---------|
| `{}` (Object) | Keys are strings, simple frequency counting, most interview problems |
| `new Map()` | Keys are non-strings (numbers, objects), need `.size`, need insertion order |
| `new Set()` | Only tracking existence (no associated value), removing duplicates |

### Common Mistakes

1. **Accessing a missing key** — `obj[key]` returns `undefined`, not 0. Use `(obj[key] \|\| 0)` for counting
2. **Using `===` with objects** — `{} === {}` is `false`. Objects are compared by reference, not value
3. **Forgetting that `Map.get()` returns `undefined` for missing keys** — Always check with `.has()` first or use a default
4. **Not initializing arrays in grouping** — Before pushing to a group, check if the array exists:
   ```javascript
   if (!groups[key]) groups[key] = [];
   groups[key].push(item);
   ```

---

## 3. Sliding Window

### Why This Pattern Exists

When you need to examine **contiguous subarrays or substrings**, the brute force is to check every possible start and end position — O(n^2). Sliding window reduces this to O(n) by **reusing computation from the previous window**.

Instead of recalculating from scratch when you move to the next subarray, you:
- **Add** the new element entering the window
- **Remove** the old element leaving the window

### Mental Model

Picture a window sliding across your data, one element at a time:

```
Array: [1, 3, 2, 6, -1, 4, 1, 8, 2]
Window size 3:

Step 1: [1, 3, 2] 6, -1, 4, 1, 8, 2    sum = 6
Step 2:  1, [3, 2, 6] -1, 4, 1, 8, 2    sum = 6 - 1 + 6 = 11
Step 3:  1, 3, [2, 6, -1] 4, 1, 8, 2    sum = 11 - 3 + (-1) = 7
```

Each step: `newSum = oldSum - leftElement + rightElement`. One subtraction and one addition instead of summing k elements from scratch.

### Prerequisites You Must Know

**Subarrays vs subsequences** — This distinction matters a lot:
```javascript
// Array:      [1, 2, 3, 4, 5]
// Subarray:   [2, 3, 4]         → contiguous, maintains order AND adjacency
// Subsequence: [1, 3, 5]        → maintains order but NOT adjacency
// Sliding window is for SUBARRAYS (contiguous elements only)
```

**Running sum / running state** — Maintaining a value that updates incrementally:
```javascript
let sum = 0;
// Adding element:    sum += arr[right]
// Removing element:  sum -= arr[left]
// This is O(1) per step instead of O(k) to recompute
```

**Window boundaries** — Understanding what `left` and `right` mean:
```javascript
// Window contains elements from index left to right (inclusive)
// Window size = right - left + 1
// Adding to window: process arr[right], then right++
// Removing from window: process arr[left], then left++
```

**When to use a hash map inside the window** — Many sliding window problems track character frequencies or element counts inside the window:
```javascript
const windowMap = {};
// Expanding: windowMap[arr[right]] = (windowMap[arr[right]] || 0) + 1
// Shrinking: windowMap[arr[left]]--; if (windowMap[arr[left]] === 0) delete windowMap[arr[left]]
```

### The Two Variations

**1. Fixed-size window**
Window size `k` is given. You build the first window, then slide.

```javascript
// Build first window of size k
for (let i = 0; i < k; i++) {
  windowSum += arr[i];
}

// Slide: remove left element, add right element
for (let i = k; i < arr.length; i++) {
  windowSum = windowSum - arr[i - k] + arr[i];
  // arr[i - k] is the element leaving the window
  // arr[i] is the element entering the window
}
```

When to use: "Find the maximum/minimum/average of all subarrays of size k"

**2. Variable-size window**
No fixed size. The window expands and contracts based on a condition.

```javascript
let left = 0;

for (let right = 0; right < arr.length; right++) {
  // EXPAND: add arr[right] to window state

  // CONTRACT: while window is invalid, shrink from left
  while (windowIsInvalid()) {
    // remove arr[left] from window state
    left++;
  }

  // UPDATE: window is now valid, update your answer
  // e.g., maxLength = Math.max(maxLength, right - left + 1)
}
```

When to use: "Find the longest/shortest subarray/substring that satisfies condition X"

### Key Decision: When to Expand vs Contract

This is the hardest part of sliding window. The template is always:
1. **Expand** right pointer every iteration (always)
2. **Check** if the window violates the constraint
3. **Contract** left pointer until the window is valid again
4. **Update** your answer with the current valid window

The tricky part is defining "valid" and "invalid":
- "Longest substring with at most K distinct characters" → Invalid when distinct count > K
- "Minimum window containing all characters of T" → Valid when all characters of T are covered
- "Longest substring without repeating characters" → Invalid when a character appears twice

### The Expand-Contract Cycle Visualized

```
"Longest substring without repeating characters"
Input: "abcabcbb"

right=0: [a]bcabcbb       window="a"     valid → length=1
right=1: [ab]cabcbb       window="ab"    valid → length=2
right=2: [abc]abcbb       window="abc"   valid → length=3
right=3: [abca]bcbb       window="abca"  INVALID (duplicate 'a')
          → contract: move left until valid
         a[bca]bcbb       window="bca"   valid → length=3
right=4: a[bcab]cbb       INVALID (duplicate 'b')
          → contract...
         ab[cab]cbb       valid → length=3
...
Answer: 3
```

### Common Mistakes

1. **Not updating window state when contracting** — When you move `left`, you must remove `arr[left]` from your window state (sum, frequency map, set, etc.)
2. **Using `if` instead of `while` for contraction** — You might need to shrink by more than one element to make the window valid
3. **Off-by-one on window size** — Window size is `right - left + 1`, not `right - left`
4. **Forgetting to handle empty input** — Check `arr.length === 0` or `k > arr.length` before starting
5. **Not knowing what to track** — Before coding, clearly define: What makes a window valid? What state do I need to track?

---

## 4. How These Patterns Connect

### Sliding Window Uses Hash Maps

Variable-size sliding window problems almost always need a hash map inside the window to track state:
- "Longest substring without repeating" → Set to track characters in window
- "Find all anagrams" → Frequency map to compare with target
- "Longest substring with K distinct" → Map to count distinct characters

If you see a sliding window problem with characters or elements to track, you'll need a hash map.

### Two Pointers and Sliding Window Are Related

Both use `left` and `right` pointers. The difference:
- **Two Pointers**: Pointers converge from opposite ends, or fast/slow from same end. Often on sorted data.
- **Sliding Window**: Both pointers move in the same direction (left to right). `right` always advances. Focus is on the contiguous subarray between them.

### Pattern Recognition Cheat Sheet

| Problem says... | Think about... |
|----------------|---------------|
| "sorted array" + "find pair/triplet" | Two Pointers (converging) |
| "in-place" + "remove/partition" | Two Pointers (fast/slow) |
| "subarray of size k" | Sliding Window (fixed) |
| "longest/shortest subarray/substring" | Sliding Window (variable) |
| "find if exists" / "count occurrences" | Hash Map (lookup) |
| "anagram" / "permutation" | Hash Map (frequency) + possibly Sliding Window |
| "duplicate" / "unique" | Hash Set |
| "two numbers that sum to X" (unsorted) | Hash Map (complement) |
| "two numbers that sum to X" (sorted) | Two Pointers (converging) |
| "group by property" | Hash Map (grouping) |
| "contiguous" + "optimal" | Sliding Window |

---

## 5. Before You Start Each Problem

Use this checklist:

1. **Read the problem twice.** Identify: What's the input? What's the output? What are the constraints?
2. **Identify the pattern.** Use the cheat sheet above. What clues point to which pattern?
3. **Define your variables.** What pointers do you need? What state do you track?
4. **Walk through an example by hand.** Trace through the algorithm with the first example before writing code.
5. **Handle edge cases.** Empty array? Single element? All duplicates? This is what interviewers look for.
6. **Code it.** Only after steps 1-5.
7. **Test with `node test.js <problem-name>`** to verify.

Good luck with the problems. Understanding *why* these patterns work is more valuable than memorizing templates — it's what lets you adapt when a problem doesn't perfectly match a template.
