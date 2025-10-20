/*
Problem: Wildcard Pattern Matching
Difficulty: Hard
Category: String, Dynamic Programming, Greedy, Backtracking
LeetCode: #44
Pattern: Dynamic Programming + String Processing + Greedy Optimization
Mixed Patterns: DP + Greedy + Two Pointers + Backtracking + Pattern Matching

Given an input string (s) and a pattern (p), implement wildcard pattern matching
with support for '?' and '*' where:
- '?' Matches any single character
- '*' Matches any sequence of characters (including the empty sequence)

The matching should cover the entire input string (not partial).

Example 1:
  Input: s = "aa", p = "a"
  Output: false
  Explanation: "a" does not match the entire string "aa".

Example 2:
  Input: s = "aa", p = "*"
  Output: true
  Explanation: '*' matches any sequence.

Example 3:
  Input: s = "cb", p = "?a"
  Output: false
  Explanation: '?' matches 'c', but 'b' does not match 'a'.

Example 4:
  Input: s = "adceb", p = "*a*b*"
  Output: true
  Explanation: First '*' matches empty, 'a' matches 'a', second '*' matches "dce", 'b' matches 'b', third '*' matches empty.

Example 5:
  Input: s = "acdcb", p = "a*c?b"
  Output: false

Constraints:
  - 0 <= s.length, p.length <= 2000
  - s contains only lowercase English letters
  - p contains only lowercase English letters, '?' or '*'

Time Complexity: O(m * n) for DP, O(m + n) for optimized greedy
Space Complexity: O(m * n) for DP, O(1) for greedy

Pattern Notes:
  - Different from regex: '*' matches any sequence, not just preceding char
  - DP approach: similar to regex but simpler '*' handling
  - Greedy approach: use backtracking only when necessary
  - Two pointers with backtracking for optimal solution
  - Handle consecutive '*' characters efficiently

Interview Notes:
  - Follow-up: Optimize space complexity
  - Follow-up: Support for additional wildcards
  - Follow-up: Case-insensitive matching
  - Common mistakes: Inefficient '*' handling, wrong backtracking logic
*/

export const functionName = 'isMatch';

export const tests = [
  {
    input: ["aa", "a"],
    expected: false
  },
  {
    input: ["aa", "*"],
    expected: true
  },
  {
    input: ["cb", "?a"],
    expected: false
  },
  {
    input: ["adceb", "*a*b*"],
    expected: true
  },
  {
    input: ["acdcb", "a*c?b"],
    expected: false
  },
  {
    input: ["", ""],
    expected: true
  },
  {
    input: ["", "*"],
    expected: true
  },
  {
    input: ["abc", "abc"],
    expected: true
  }
];

/**
 * Wildcard pattern matching using dynamic programming
 * @param {string} s - Input string
 * @param {string} p - Pattern with '?' and '*'
 * @return {boolean} True if pattern matches string
 */
function isMatch(s, p) {
    const m = s.length;
    const n = p.length;

    // dp[i][j] = can s[0...i-1] match p[0...j-1]
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(false));

    // Base case: empty string matches empty pattern
    dp[0][0] = true;

    // Handle patterns starting with '*'
    for (let j = 1; j <= n; j++) {
        if (p[j - 1] === '*') {
            dp[0][j] = dp[0][j - 1];
        }
    }

    // Fill DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const sChar = s[i - 1];
            const pChar = p[j - 1];

            if (pChar === '*') {
                // '*' can match empty sequence or any character
                dp[i][j] = dp[i][j - 1] ||  // Match empty sequence
                           dp[i - 1][j] ||  // Match current char and continue
                           dp[i - 1][j - 1]; // Match current char and advance pattern
            } else if (pChar === '?' || pChar === sChar) {
                // Character match or wildcard '?'
                dp[i][j] = dp[i - 1][j - 1];
            }
            // If characters don't match, dp[i][j] remains false
        }
    }

    return dp[m][n];
}

/**
 * Alternative: Optimized greedy approach with backtracking
 * @param {string} s - Input string
 * @param {string} p - Pattern
 * @return {boolean} True if pattern matches string
 */
function isMatchGreedy(s, p) {
    let sIndex = 0, pIndex = 0;
    let starIndex = -1, match = 0;

    while (sIndex < s.length) {
        // Characters match or pattern has '?'
        if (pIndex < p.length && (p[pIndex] === '?' || s[sIndex] === p[pIndex])) {
            sIndex++;
            pIndex++;
        }
        // Pattern has '*'
        else if (pIndex < p.length && p[pIndex] === '*') {
            starIndex = pIndex;
            match = sIndex;
            pIndex++;
        }
        // No match, but we have seen '*' before
        else if (starIndex !== -1) {
            pIndex = starIndex + 1;
            match++;
            sIndex = match;
        }
        // No match and no '*' to backtrack
        else {
            return false;
        }
    }

    // Skip trailing '*' in pattern
    while (pIndex < p.length && p[pIndex] === '*') {
        pIndex++;
    }

    return pIndex === p.length;
}

/**
 * Alternative: Recursive approach with memoization
 * @param {string} s - Input string
 * @param {string} p - Pattern
 * @return {boolean} True if pattern matches string
 */
function isMatchRecursive(s, p) {
    const memo = new Map();

    function helper(i, j) {
        const key = `${i},${j}`;
        if (memo.has(key)) return memo.get(key);

        // Base cases
        if (j === p.length) {
            return i === s.length;
        }

        if (i === s.length) {
            // Check if remaining pattern is all '*'
            for (let k = j; k < p.length; k++) {
                if (p[k] !== '*') return false;
            }
            return true;
        }

        let result;
        if (p[j] === '*') {
            // '*' can match empty, one char, or multiple chars
            result = helper(i, j + 1) ||     // Match empty
                     helper(i + 1, j) ||     // Match one and continue with '*'
                     helper(i + 1, j + 1);   // Match one and advance pattern
        } else if (p[j] === '?' || p[j] === s[i]) {
            result = helper(i + 1, j + 1);
        } else {
            result = false;
        }

        memo.set(key, result);
        return result;
    }

    return helper(0, 0);
}

/**
 * Alternative: Space-optimized DP (O(n) space)
 * @param {string} s - Input string
 * @param {string} p - Pattern
 * @return {boolean} True if pattern matches string
 */
function isMatchOptimized(s, p) {
    const m = s.length;
    const n = p.length;

    // Use only two arrays instead of full 2D table
    let prev = Array(n + 1).fill(false);
    let curr = Array(n + 1).fill(false);

    prev[0] = true;

    // Initialize first row
    for (let j = 1; j <= n; j++) {
        if (p[j - 1] === '*') {
            prev[j] = prev[j - 1];
        }
    }

    for (let i = 1; i <= m; i++) {
        curr.fill(false);

        for (let j = 1; j <= n; j++) {
            const sChar = s[i - 1];
            const pChar = p[j - 1];

            if (pChar === '*') {
                curr[j] = curr[j - 1] || prev[j] || prev[j - 1];
            } else if (pChar === '?' || pChar === sChar) {
                curr[j] = prev[j - 1];
            }
        }

        [prev, curr] = [curr, prev];
    }

    return prev[n];
}

/**
 * Extended: Find all matching substrings
 * @param {string} s - Input string
 * @param {string} p - Pattern
 * @return {string[]} All substrings that match pattern
 */
function findAllWildcardMatches(s, p) {
    const matches = [];

    for (let i = 0; i < s.length; i++) {
        for (let j = i + 1; j <= s.length; j++) {
            const substring = s.slice(i, j);
            if (isMatchGreedy(substring, p)) {
                matches.push(substring);
            }
        }
    }

    return matches;
}

/**
 * Extended: Pattern preprocessing for optimization
 * @param {string} p - Pattern to preprocess
 * @return {string} Optimized pattern
 */
function preprocessPattern(p) {
    // Remove consecutive '*' characters
    let result = '';
    let prevStar = false;

    for (const char of p) {
        if (char === '*') {
            if (!prevStar) {
                result += char;
                prevStar = true;
            }
        } else {
            result += char;
            prevStar = false;
        }
    }

    return result;
}

/**
 * Extended: Case-insensitive wildcard matching
 * @param {string} s - Input string
 * @param {string} p - Pattern
 * @return {boolean} True if pattern matches string (case-insensitive)
 */
function isMatchCaseInsensitive(s, p) {
    return isMatchGreedy(s.toLowerCase(), p.toLowerCase());
}

/**
 * Extended: Match with performance metrics
 * @param {string} s - Input string
 * @param {string} p - Pattern
 * @return {Object} Match result with performance data
 */
function isMatchWithMetrics(s, p) {
    const startTime = performance.now();

    // Try different approaches and compare
    const dpResult = isMatch(s, p);
    const dpTime = performance.now() - startTime;

    const greedyStart = performance.now();
    const greedyResult = isMatchGreedy(s, p);
    const greedyTime = performance.now() - greedyStart;

    return {
        result: dpResult,
        algorithms: {
            dp: { result: dpResult, time: dpTime },
            greedy: { result: greedyResult, time: greedyTime }
        },
        inputSize: { stringLength: s.length, patternLength: p.length },
        recommendation: greedyTime < dpTime ? 'greedy' : 'dp'
    };
}

/**
 * Extended: Validate pattern syntax
 * @param {string} p - Pattern to validate
 * @return {boolean} True if pattern is syntactically valid
 */
function isValidWildcardPattern(p) {
    // Basic validation - wildcard patterns are generally always valid
    // Could add more sophisticated checks if needed
    return typeof p === 'string';
}

/**
 * Extended: Generate test strings for pattern
 * @param {string} p - Pattern
 * @param {number} count - Number of test strings to generate
 * @return {string[]} Array of strings that should match the pattern
 */
function generateMatchingStrings(p, count = 5) {
    const results = [];

    // Simple generation - replace ? with 'a' and * with various strings
    for (let i = 0; i < count; i++) {
        let generated = '';
        for (const char of p) {
            if (char === '?') {
                generated += String.fromCharCode(97 + Math.floor(Math.random() * 26));
            } else if (char === '*') {
                const length = Math.floor(Math.random() * 4);
                for (let j = 0; j < length; j++) {
                    generated += String.fromCharCode(97 + Math.floor(Math.random() * 26));
                }
            } else {
                generated += char;
            }
        }
        results.push(generated);
    }

    return results;
}

export default isMatch;