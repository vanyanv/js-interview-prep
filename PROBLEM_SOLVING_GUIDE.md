# Problem Solving Guide

Your tactical reference for coding interviews. Use this during practice and review before interviews.

**Related resources in this project:**
- `FUNDAMENTALS_FIRST.md` — JavaScript methods, syntax, and complexity reference
- `PATTERN_MASTERY_TRACKER.md` — Daily routine, weekly goals, and progress tracking
- `patterns/` — Deep-dive guides for each algorithmic pattern

---

## The UMPIRE Method

**Total time budget: 30-45 minutes per problem**

### U - Understand (5-10 mins)
```
Ask yourself:

1. What is the input?
   - Data type? (array, string, number?)
   - Size constraints?
   - Can it be empty/null?

2. What is the output?
   - Data type? Format?

3. Work through examples BY HAND
   - Understand the transformation from input to output

4. Identify constraints:
   - Time/space requirements?
   - Can I modify the input?
   - Duplicates? Negative numbers? Sorted or unsorted?

5. Edge cases:
   - Empty input, single element, all same elements, very large input
```

**If you can't explain the problem in one sentence, you don't understand it yet.**

### M - Match (2-3 mins)

Use the Pattern Decision Tree below to identify which pattern fits.

### P - Plan (5-10 mins)
```
ALWAYS write pseudocode before coding!

Example for Two Sum:
1. Create empty hash map
2. For each number:
   - Calculate complement (target - current)
   - If complement exists in map, return indices
   - Otherwise, store current number with index
3. Return empty array (no solution)
```

Write your approach as comments in the function body before filling in code.

### I - Implement (15-20 mins)
```
Start with the simplest approach that works.

DO:
- Clear variable names (not i, j, k unless indices)
- One operation per line
- Early returns for edge cases

DON'T:
- Try to be clever
- Write hard-to-read one-liners
- Optimize prematurely
```

### R - Review (3-5 mins)
```
Test in this order:

1. Happy path (normal example from the problem)
2. Edge cases:
   - Empty: []
   - Single: [5]
   - Duplicates: [1, 1, 1]
   - Negative: [-1, -2, 3]
   - Zero: [0, 1, 0]
3. Walk through code line by line with actual values
```

### E - Evaluate (2-3 mins)
```
State time and space complexity:

Time:  Single loop = O(n), Nested loops = O(n²),
       Sorting = O(n log n), Hash lookup = O(1) avg
Space: Fixed variables = O(1), Hash map/array growing with input = O(n),
       Recursion = O(depth)
```

---

## Pattern Decision Tree

When you read a problem, scan these triggers to pick your pattern:

```
Input is SORTED?
├── Need pair/triplet summing to target? → Two Pointers (start + end)
├── Find specific value or boundary? → Binary Search
└── Optimize over a range? → Binary Search on answer space

SUBARRAY or SUBSTRING problem?
├── Fixed size window? → Sliding Window (fixed)
├── Shortest/longest with constraint? → Sliding Window (variable)
└── Count all subarrays? → Prefix Sum or DP

Need O(1) LOOKUP or COUNTING?
├── Count occurrences? → Hash Map (frequency counter)
├── Track seen elements? → Set
├── Group/categorize items? → Hash Map
└── Find pairs/complements? → Hash Map

LINKED LIST or CYCLE problem?
├── Detect cycle? → Fast/Slow Pointers
├── Find middle node? → Fast/Slow Pointers
└── In-place modification? → Fast/Slow Pointers

MATCHING, NESTING, or PAIRING?
├── Parentheses/brackets? → Stack
├── Next greater/smaller element? → Monotonic Stack
└── Undo/history operations? → Stack

TREE structure or GENERATE ALL combinations?
├── Tree traversal? → Recursion (DFS)
├── Generate subsets/permutations? → Recursion + Backtracking
└── Break into smaller identical subproblems? → Recursion

OPTIMIZATION or COUNTING PATHS?
├── Overlapping subproblems? → Dynamic Programming
├── "How many ways to...?" → DP
├── Min/max with sequential choices? → DP or Greedy
└── Can make locally optimal choice? → Greedy

Nothing obvious?
→ Start with brute force, then see Optimization Strategies below
```

See `patterns/` directory for detailed guides on each pattern.

---

## When You're Stuck

### After 5 minutes
- Re-read the problem. Did you miss a constraint?
- Work through the example by hand again. What are you doing mentally?
- Revisit the pattern decision tree. Did you pick the wrong pattern?

### After 15 minutes
- **Simplify**: Can you solve it for n=1? n=2? n=3? Build up from there.
- **Brute force it**: What's the obvious O(n^2) or O(2^n) solution? Write it. You can optimize later.
- **List what you know**: Write down every observation, constraint, and invariant.
- **Check the pattern guide**: `patterns/<pattern-name>.md` has worked examples.

### After 30 minutes
- **Work backwards**: Start from the desired output. What's the last step?
- **Try a different data structure**: Would a stack/set/map make this easier?
- **Take a 5-minute break**: Walk away. Seriously. Fresh eyes find solutions.
- **Look at the approach** (not the code): Read a hint or the first line of an editorial.

Being stuck is part of learning. The struggle is what builds the skill.

---

## Interview Communication

### Before Coding
- "Let me restate the problem to make sure I understand..."
- "The constraints are X and Y — I'm thinking [pattern] because..."
- "Can I modify the input array?" / "Are there space constraints?"
- "Let me walk through this example by hand first."

### While Planning
- "I see two approaches: X is O(n^2) time, Y is O(n) time with O(n) space. I'll go with Y."
- "I'll start with the brute force to verify correctness, then optimize."

### During Implementation
- Narrate key decisions, not every line
- "I'm using a hash map here for O(1) complement lookups..."
- "This edge case handles empty input..."

### When Stuck (Out Loud)
- "Let me think about what happens at this boundary..."
- "I think I need to reconsider my approach — let me step back."
- "Could you give me a hint on the expected time complexity?"
- **Never** go silent for more than 30 seconds
- **Never** say "I don't know" without first explaining what you've tried

### After Coding
- "Let me trace through with the first example..."
- "Edge case: what if the array is empty? My line 3 handles that."
- "Time complexity is O(n), space is O(n) for the hash map."

---

## Optimization Strategies

### Step 1: Start with what works
Write the brute force. Nested loops, repeated scans — whatever produces correct output. Understand *why* it's slow.

### Step 2: Identify the bottleneck
- **Repeated lookups?** → Cache in a Hash Map or Set
- **Recalculating same subproblems?** → Memoize (DP)
- **Checking all pairs?** → Sort + Two Pointers, or Hash Map
- **Scanning the whole array each iteration?** → Precompute (prefix sum, sorted structure)

### Step 3: Common upgrades
```
O(n²) → O(n):       Hash Map for lookups, Two Pointers, Sliding Window
O(n²) → O(n log n): Sort first, then linear scan or binary search
O(2^n) → O(n*2^n):  DP with bitmask
O(2^n) → O(n²):     DP (tabulation or memoization)
```

### Example
```
Two Sum brute force: Check every pair → O(n²)
Insight: For each number, I need its complement. That's a lookup problem.
Fix: Store seen numbers in hash map → O(n) time, O(n) space.
```

---

## Common Mistakes

### 1. Starting to Code Too Early
**Problem:** You code yourself into a corner.
**Fix:** Spend 40% of time on Understand + Plan.

### 2. Not Considering Edge Cases
**Problem:** Fails on empty/single element.
**Fix:** Always handle `[]`, `[x]`, `null`, `undefined` first.

### 3. Off-by-One Errors
**Problem:** Loop bounds are wrong.
**Fix:** Think carefully: `<` vs `<=`, `length` vs `length - 1`.

### 4. Modifying Input Without Checking
**Problem:** Some problems forbid input modification.
**Fix:** Ask "Can I modify the input array?" Use `[...arr].sort()` if not.

### 5. Overcomplicating
**Problem:** Trying clever one-liners.
**Fix:** Write readable code first, optimize later.

### 6. Forgetting to Return
**Problem:** Function ends without returning a value.
**Fix:** Trace every code path — does each one return something?

### 7. Infinite While Loops
**Problem:** Loop condition never becomes false.
**Fix:** Verify your loop variable changes on every iteration.

### 8. Treating 0 as Falsy
**Problem:** `if (count)` fails when `count` is legitimately `0`.
**Fix:** Be explicit: `if (count !== undefined)` or `if (count > 0)`.

### 9. Mutation vs Creation Confusion
**Problem:** `.sort()` mutates the original, `.map()` doesn't.
**Fix:** Know which methods mutate. When in doubt: `[...arr].sort()`.

### 10. Accessing Out of Bounds
**Problem:** `arr[i + 1]` when `i` is at the last index.
**Fix:** Loop to `arr.length - 1`, or add a bounds check.

---

## Problem-Solving Template

```javascript
/**
 * Problem: [Name]
 *
 * Understanding:
 * - Input:
 * - Output:
 * - Constraints:
 * - Edge cases:
 *
 * Approach:
 * 1.
 * 2.
 * 3.
 *
 * Time: O()
 * Space: O()
 */

function solutionName(input) {
  // Handle edge cases
  if (!input || input.length === 0) {
    return [];
  }

  // Main logic

  // Return result
}

// Test cases
console.log(solutionName([]));           // Edge: empty
console.log(solutionName([1]));          // Edge: single
console.log(solutionName([1, 2, 3]));    // Normal case
```

---

## Quick Reference

| Need | Go to |
|------|-------|
| JS array/string/object methods | `FUNDAMENTALS_FIRST.md` |
| Complexity cheat sheet | `FUNDAMENTALS_FIRST.md` |
| Daily routine & weekly goals | `PATTERN_MASTERY_TRACKER.md` |
| Progress tracking | `progress.md` |
| Two Pointers deep dive | `patterns/two-pointers.md` |
| Sliding Window deep dive | `patterns/sliding-window.md` |
| Hash Maps deep dive | `patterns/hash-maps.md` |
| Fast/Slow Pointers deep dive | `patterns/fast-slow-pointers.md` |
| Stack deep dive | `patterns/stack.md` |
| Binary Search deep dive | `patterns/binary-search.md` |
| Recursion deep dive | `patterns/recursion.md` |
| Dynamic Programming deep dive | `patterns/dynamic-programming.md` |

---

**You're not slow, you're thorough.**

Better to deeply understand 20 problems than rush through 100. The goal isn't to solve every problem perfectly the first time — it's to recognize patterns and apply them confidently.

```
1st attempt: Confused          → Normal
2nd attempt: Recognizing       → Growth
3rd attempt: Solving alone     → Mastery
```

Every expert was once a beginner who refused to give up.
