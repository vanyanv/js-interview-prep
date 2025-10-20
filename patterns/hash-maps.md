# Hash Maps/Sets Pattern

## When to Use
- Need O(1) lookup, insertion, or deletion
- Finding duplicates or checking existence
- Counting frequency of elements
- Grouping elements by some property
- Optimizing from O(n²) to O(n) with extra space

## Types

### 1. Basic Lookup (Map/Set)
```javascript
// Using Set for existence checking
function containsDuplicate(nums) {
  const seen = new Set();

  for (const num of nums) {
    if (seen.has(num)) return true;
    seen.add(num);
  }

  return false;
}

// Using Map for value storage
function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
}
```

### 2. Frequency Counting
```javascript
function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const freq = {};

  // Count frequency
  for (const char of s) {
    freq[char] = (freq[char] || 0) + 1;
  }

  // Decrement and check
  for (const char of t) {
    if (!freq[char]) return false;
    freq[char]--;
  }

  return true;
}
```

### 3. Grouping
```javascript
function groupAnagrams(strs) {
  const groups = new Map();

  for (const str of strs) {
    const sorted = str.split('').sort().join('');

    if (!groups.has(sorted)) {
      groups.set(sorted, []);
    }
    groups.get(sorted).push(str);
  }

  return Array.from(groups.values());
}
```

## Data Structure Choice

### Map vs Object vs Set
```javascript
// Use Map when:
// - Keys are not strings
// - Need size property
// - Frequent additions/deletions
const map = new Map();
map.set(1, 'one');
map.set('1', 'string one');

// Use Object when:
// - Keys are always strings
// - Need JSON serialization
// - Simple key-value storage
const obj = {};
obj['key'] = 'value';

// Use Set when:
// - Only need to track existence
// - Avoid duplicates
// - Mathematical set operations
const set = new Set([1, 2, 3]);
```

## Classic Problems
1. **Two Sum** - Basic hash map lookup
2. **Group Anagrams** - Grouping by sorted key
3. **Valid Anagram** - Frequency counting
4. **Contains Duplicate** - Set for existence
5. **First Unique Character** - Frequency + single pass
6. **Intersection of Arrays** - Set operations
7. **LRU Cache** - Map + doubly linked list

## Advanced Patterns

### Prefix Sum + Hash Map
```javascript
function subarraySum(nums, k) {
  const map = new Map([[0, 1]]); // prefix sum -> count
  let prefixSum = 0;
  let count = 0;

  for (const num of nums) {
    prefixSum += num;

    if (map.has(prefixSum - k)) {
      count += map.get(prefixSum - k);
    }

    map.set(prefixSum, (map.get(prefixSum) || 0) + 1);
  }

  return count;
}
```

### Index Mapping
```javascript
function findDuplicates(nums) {
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    const index = Math.abs(nums[i]) - 1;

    if (nums[index] < 0) {
      result.push(index + 1);
    } else {
      nums[index] = -nums[index];
    }
  }

  return result;
}
```

## Tips
- Consider space-time tradeoffs
- Use Map for non-string keys or when order matters
- Use Set for simple existence checking
- Remember that hash operations are O(1) average, O(n) worst case
- For frequency counting, consider using `map.get(key) || 0` pattern