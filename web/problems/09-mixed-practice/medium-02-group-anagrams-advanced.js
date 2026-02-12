/*
Problem: Group Anagrams Advanced
Difficulty: Medium
Category: Hash Map, String, Sorting, Array
LeetCode: #49
Pattern: Hash Map + String Processing + Multiple Grouping Strategies
Mixed Patterns: Hash Map + String Sorting + Character Counting + Prime Numbers

Given an array of strings strs, group the anagrams together. You can return the
answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different
word or phrase, typically using all the original letters exactly once.

Example 1:
  Input: strs = ["eat","tea","tan","ate","nat","bat"]
  Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

Example 2:
  Input: strs = [""]
  Output: [[""]]

Example 3:
  Input: strs = ["a"]
  Output: [["a"]]

Example 4:
  Input: strs = ["abc","bca","cab","xyz","zyx","yxz"]
  Output: [["abc","bca","cab"],["xyz","zyx","yxz"]]

Constraints:
  - 1 <= strs.length <= 10^4
  - 0 <= strs[i].length <= 100
  - strs[i] consists of lowercase English letters only

Time Complexity: O(n * k * log k) where n = number of strings, k = max string length
Space Complexity: O(n * k) for storing all strings

Pattern Notes:
  - Multiple approaches: Sorted string key, character count key, prime product
  - Sorted string: Sort characters to create canonical form
  - Character count: Use frequency array/map as key
  - Prime product: Assign prime to each letter, multiply for unique signature
  - Hash map groups strings with same signature

Interview Notes:
  - Follow-up: What if strings contain Unicode characters?
  - Follow-up: Memory optimization for very long strings
  - Follow-up: Find largest anagram group
  - Follow-up: Case-insensitive anagram grouping
*/

export const functionName = 'groupAnagrams';

export const tests = [
  {
    input: [["eat","tea","tan","ate","nat","bat"]],
    expected: [["bat"],["nat","tan"],["ate","eat","tea"]]
  },
  {
    input: [[""]],
    expected: [[""]]
  },
  {
    input: [["a"]],
    expected: [["a"]]
  },
  {
    input: [["abc","bca","cab","xyz","zyx","yxz"]],
    expected: [["abc","bca","cab"],["xyz","zyx","yxz"]]
  },
  {
    input: [["ab","ba"]],
    expected: [["ab","ba"]]
  },
  {
    input: [["ac","c"]],
    expected: [["ac"],["c"]]
  },
  {
    input: [["abbbbbbbbbbb","babbbbbbbbb"]],
    expected: [["abbbbbbbbbbb","babbbbbbbbb"]]
  }
];

/**
 * Groups anagrams using sorted string as key
 * @param {string[]} strs - Array of strings
 * @return {string[][]} Array of anagram groups
 */
function groupAnagrams(strs) {
    const groups = new Map();

    for (const str of strs) {
        // Create canonical form by sorting characters
        const key = str.split('').sort().join('');

        if (!groups.has(key)) {
            groups.set(key, []);
        }
        groups.get(key).push(str);
    }

    return Array.from(groups.values());
}

/**
 * Alternative: Using character count as key
 * @param {string[]} strs - Array of strings
 * @return {string[][]} Array of anagram groups
 */
function groupAnagramsCharCount(strs) {
    const groups = new Map();

    for (const str of strs) {
        // Create character count array
        const count = new Array(26).fill(0);
        for (const char of str) {
            count[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }

        // Use count array as key (convert to string)
        const key = count.join(',');

        if (!groups.has(key)) {
            groups.set(key, []);
        }
        groups.get(key).push(str);
    }

    return Array.from(groups.values());
}

/**
 * Alternative: Using prime number product as key
 * @param {string[]} strs - Array of strings
 * @return {string[][]} Array of anagram groups
 */
function groupAnagramsPrime(strs) {
    // Prime numbers for each letter a-z
    const primes = [
        2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47,
        53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101
    ];

    const groups = new Map();

    for (const str of strs) {
        // Calculate prime product
        let product = 1;
        for (const char of str) {
            product *= primes[char.charCodeAt(0) - 'a'.charCodeAt(0)];
        }

        if (!groups.has(product)) {
            groups.set(product, []);
        }
        groups.get(product).push(str);
    }

    return Array.from(groups.values());
}

/**
 * Alternative: Using Map with custom hash function
 * @param {string[]} strs - Array of strings
 * @return {string[][]} Array of anagram groups
 */
function groupAnagramsCustomHash(strs) {
    const groups = new Map();

    function createHash(str) {
        const count = {};
        for (const char of str) {
            count[char] = (count[char] || 0) + 1;
        }

        // Create hash from character counts
        return Object.keys(count)
            .sort()
            .map(char => `${char}${count[char]}`)
            .join('');
    }

    for (const str of strs) {
        const hash = createHash(str);

        if (!groups.has(hash)) {
            groups.set(hash, []);
        }
        groups.get(hash).push(str);
    }

    return Array.from(groups.values());
}

/**
 * Extended: Case-insensitive anagram grouping
 * @param {string[]} strs - Array of strings (mixed case)
 * @return {string[][]} Array of anagram groups
 */
function groupAnagramsCaseInsensitive(strs) {
    const groups = new Map();

    for (const str of strs) {
        const key = str.toLowerCase().split('').sort().join('');

        if (!groups.has(key)) {
            groups.set(key, []);
        }
        groups.get(key).push(str);
    }

    return Array.from(groups.values());
}

/**
 * Extended: Group anagrams with additional information
 * @param {string[]} strs - Array of strings
 * @return {Object[]} Array of anagram group objects with metadata
 */
function groupAnagramsWithInfo(strs) {
    const groups = new Map();

    for (const str of strs) {
        const key = str.split('').sort().join('');

        if (!groups.has(key)) {
            groups.set(key, {
                anagrams: [],
                signature: key,
                length: str.length,
                count: 0
            });
        }

        const group = groups.get(key);
        group.anagrams.push(str);
        group.count++;
    }

    return Array.from(groups.values()).sort((a, b) => b.count - a.count);
}

/**
 * Extended: Find largest anagram group
 * @param {string[]} strs - Array of strings
 * @return {string[]} Largest anagram group
 */
function findLargestAnagramGroup(strs) {
    const groups = groupAnagrams(strs);

    let largestGroup = [];
    for (const group of groups) {
        if (group.length > largestGroup.length) {
            largestGroup = group;
        }
    }

    return largestGroup;
}

/**
 * Extended: Anagram statistics
 * @param {string[]} strs - Array of strings
 * @return {Object} Statistics about anagram groups
 */
function getAnagramStats(strs) {
    const groups = groupAnagrams(strs);

    const groupSizes = groups.map(group => group.length);
    const totalGroups = groups.length;
    const largestGroupSize = Math.max(...groupSizes);
    const avgGroupSize = groupSizes.reduce((sum, size) => sum + size, 0) / totalGroups;

    // Count groups by size
    const sizeDistribution = {};
    for (const size of groupSizes) {
        sizeDistribution[size] = (sizeDistribution[size] || 0) + 1;
    }

    return {
        totalStrings: strs.length,
        totalGroups,
        largestGroupSize,
        avgGroupSize: Math.round(avgGroupSize * 100) / 100,
        sizeDistribution,
        singletonGroups: sizeDistribution[1] || 0,
        multipleAnagramGroups: totalGroups - (sizeDistribution[1] || 0),
        groups
    };
}

/**
 * Extended: Memory-optimized version for very long strings
 * @param {string[]} strs - Array of strings
 * @return {string[][]} Array of anagram groups
 */
function groupAnagramsMemoryOptimized(strs) {
    const groups = new Map();

    for (let i = 0; i < strs.length; i++) {
        const str = strs[i];

        // Use character frequency instead of sorting for long strings
        const freq = new Array(26).fill(0);
        for (let j = 0; j < str.length; j++) {
            freq[str.charCodeAt(j) - 97]++; // 97 is 'a'.charCodeAt(0)
        }

        // Create compact key
        let key = '';
        for (let j = 0; j < 26; j++) {
            if (freq[j] > 0) {
                key += String.fromCharCode(97 + j) + freq[j];
            }
        }

        if (!groups.has(key)) {
            groups.set(key, []);
        }
        groups.get(key).push(str);
    }

    return Array.from(groups.values());
}

export default groupAnagrams;