# 🎯 JavaScript Fundamentals - Master These First!

## 📚 Core JavaScript Concepts You MUST Know

### 1. Arrays - The Foundation
```javascript
// CREATION
const arr1 = [1, 2, 3];                // Literal
const arr2 = new Array(5);             // Empty array of size 5
const arr3 = Array.from("hello");      // ['h','e','l','l','o']
const arr4 = [...arr1];                 // Spread operator (copy)

// ACCESSING - O(1)
arr[0]          // First element
arr[arr.length - 1]  // Last element
arr.at(-1)      // Last element (ES2022)

// ADDING/REMOVING
arr.push(4)     // Add to end - O(1)
arr.pop()       // Remove from end - O(1)
arr.unshift(0)  // Add to beginning - O(n)
arr.shift()     // Remove from beginning - O(n)

// SEARCHING
arr.indexOf(2)      // Find index of element (-1 if not found)
arr.includes(2)     // Boolean check
arr.find(x => x > 2)    // Find first element matching condition
arr.findIndex(x => x > 2)  // Find index of first match

// TRANSFORMING (creates new array)
arr.map(x => x * 2)        // Transform each element
arr.filter(x => x > 1)     // Keep elements matching condition
arr.reduce((sum, x) => sum + x, 0)  // Reduce to single value

// MUTATING METHODS (changes original)
arr.sort((a, b) => a - b)  // Sort in place
arr.reverse()               // Reverse in place
arr.splice(1, 2, 'a', 'b') // Remove and/or add elements

// NON-MUTATING METHODS (returns new array)
arr.slice(1, 3)     // Extract portion
arr.concat([4, 5])  // Combine arrays
[...arr1, ...arr2]  // Spread to combine

// ITERATION
for (let i = 0; i < arr.length; i++) { }  // Classic
for (const val of arr) { }                // Values
for (const [idx, val] of arr.entries()) { } // Index + Value
arr.forEach((val, idx) => { })            // Functional
```

### 2. Strings - Immutable Sequences
```javascript
// CREATION
const str1 = "hello";
const str2 = 'world';
const str3 = `Hello ${str2}`;  // Template literal

// ACCESSING - O(1)
str[0]          // 'h'
str.charAt(0)   // 'h'
str.charCodeAt(0) // ASCII value

// SEARCHING
str.indexOf('l')     // First occurrence
str.lastIndexOf('l') // Last occurrence
str.includes('ell')  // Boolean check
str.startsWith('he') // Check beginning
str.endsWith('lo')   // Check end

// EXTRACTING
str.substring(1, 4)  // Extract portion (start, end)
str.slice(1, 4)      // Same but supports negative indices
str.slice(-3)        // Last 3 characters

// TRANSFORMING
str.toUpperCase()    // 'HELLO'
str.toLowerCase()    // 'hello'
str.trim()           // Remove whitespace
str.repeat(3)        // 'hellohellohello'
str.padStart(10, '0') // '00000hello'

// SPLITTING/JOINING
str.split('')        // Convert to array: ['h','e','l','l','o']
str.split(' ')       // Split by space
arr.join('')         // Array to string
arr.join('-')        // Join with separator

// REPLACING
str.replace('l', 'L')     // Replace first
str.replaceAll('l', 'L')  // Replace all (ES2021)
str.replace(/l/g, 'L')    // Replace all using regex

// STRING TO ARRAY
[...str]             // ['h','e','l','l','o']
Array.from(str)      // Same
str.split('')        // Same
```

### 3. Objects/Hash Maps - O(1) Lookups
```javascript
// CREATION
const obj1 = { a: 1, b: 2 };
const obj2 = new Object();
const obj3 = Object.create(null);  // No prototype

// ACCESSING
obj.a              // Dot notation
obj['a']           // Bracket notation (use for dynamic keys)
obj[variable]      // Dynamic key access

// ADDING/UPDATING
obj.c = 3;         // Add/update property
obj['d'] = 4;      // Same with bracket

// DELETING
delete obj.a;      // Remove property

// CHECKING EXISTENCE
'a' in obj         // Check if key exists
obj.hasOwnProperty('a')  // Same, but only own properties
obj.a !== undefined      // Check value (careful with undefined values)

// ITERATION
Object.keys(obj)    // ['a', 'b'] - array of keys
Object.values(obj)  // [1, 2] - array of values
Object.entries(obj) // [['a',1], ['b',2]] - array of pairs

for (const key in obj) { }           // Iterate keys
for (const [key, val] of Object.entries(obj)) { }  // Key-value pairs

// USEFUL PATTERNS
// Frequency counter
const freq = {};
for (const char of str) {
  freq[char] = (freq[char] || 0) + 1;
}

// Grouping
const grouped = {};
for (const item of items) {
  const key = item.category;
  if (!grouped[key]) grouped[key] = [];
  grouped[key].push(item);
}
```

### 4. Sets - Unique Values
```javascript
// CREATION
const set = new Set();
const set2 = new Set([1, 2, 3, 3]); // {1, 2, 3}

// OPERATIONS
set.add(4)        // Add element
set.has(2)        // Check existence - O(1)
set.delete(2)     // Remove element
set.clear()       // Remove all
set.size          // Number of elements

// CONVERSION
[...set]          // Set to array
Array.from(set)   // Same

// USE CASES
// Remove duplicates
const unique = [...new Set(array)];

// Track seen elements
const seen = new Set();
for (const num of nums) {
  if (seen.has(num)) return true;  // Found duplicate
  seen.add(num);
}
```

### 5. Maps - Better than Objects for Hash Maps
```javascript
// CREATION
const map = new Map();
const map2 = new Map([['a', 1], ['b', 2]]);

// OPERATIONS
map.set('c', 3)   // Add/update
map.get('a')      // Get value
map.has('a')      // Check existence
map.delete('a')   // Remove
map.clear()       // Remove all
map.size          // Number of entries

// ITERATION
for (const [key, val] of map) { }
map.forEach((val, key) => { })

// ADVANTAGES OVER OBJECTS
// 1. Any type as key (not just strings)
// 2. Maintains insertion order
// 3. Better performance for frequent additions/deletions
// 4. size property
```

---

## 🔥 Essential Patterns for Fundamentals

### Pattern 1: Two Pointers
```javascript
// Meeting in the middle
function isPalindrome(s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }
  return true;
}

// Same direction (slow/fast)
function removeDuplicates(arr) {
  let slow = 0;

  for (let fast = 1; fast < arr.length; fast++) {
    if (arr[fast] !== arr[slow]) {
      slow++;
      arr[slow] = arr[fast];
    }
  }
  return slow + 1;
}
```

### Pattern 2: Frequency Counter
```javascript
// Count occurrences
function isAnagram(s1, s2) {
  if (s1.length !== s2.length) return false;

  const freq = {};

  for (const char of s1) {
    freq[char] = (freq[char] || 0) + 1;
  }

  for (const char of s2) {
    if (!freq[char]) return false;
    freq[char]--;
  }

  return true;
}
```

### Pattern 3: Sliding Window
```javascript
// Fixed size window
function maxSumSubarray(arr, k) {
  let maxSum = 0;
  let windowSum = 0;

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

### Pattern 4: Hash Map for Lookup
```javascript
// Two Sum pattern
function twoSum(nums, target) {
  const map = {};

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (complement in map) {
      return [map[complement], i];
    }

    map[nums[i]] = i;
  }

  return [];
}
```

---

## 💪 Practice Problems by Concept

### Arrays Only (Start Here!)
1. Find maximum element
2. Find second largest
3. Reverse array in place
4. Rotate array by k steps
5. Move zeros to end

### Strings Only
1. Reverse string
2. Check palindrome
3. Count vowels
4. First unique character
5. Valid anagram

### Hash Maps Only
1. Two sum
2. First duplicate
3. Group anagrams
4. Frequency sort
5. Isomorphic strings

### Mixed Fundamentals
1. Valid parentheses (Stack)
2. Merge sorted arrays (Two pointers)
3. Longest substring without repeating (Sliding window + Set)
4. Best time to buy/sell stock (Greedy)
5. FizzBuzz (Basic logic)

---

## 📊 Complexity Cheat Sheet

| Operation | Array | Object | Set | Map |
|-----------|-------|--------|-----|-----|
| Access by index | O(1) | - | - | - |
| Access by key | - | O(1) | - | O(1) |
| Search | O(n) | O(1) | O(1) | O(1) |
| Insert (end) | O(1) | O(1) | O(1) | O(1) |
| Insert (beginning) | O(n) | O(1) | O(1) | O(1) |
| Delete | O(n) | O(1) | O(1) | O(1) |

---

## 🎯 Your Learning Path

### Week 1: Arrays & Strings
- Day 1-2: Array methods mastery
- Day 3-4: String manipulation
- Day 5-7: Combine both

### Week 2: Hash Maps & Sets
- Day 8-9: Object as hash map
- Day 10-11: Set operations
- Day 12-14: Map vs Object

### Week 3: Basic Patterns
- Day 15-16: Two pointers
- Day 17-18: Frequency counter
- Day 19-21: Sliding window

Remember: **Fundamentals are your foundation!** Master these before moving to complex algorithms.