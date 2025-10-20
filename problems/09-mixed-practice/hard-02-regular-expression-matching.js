/*
Problem: Regular Expression Matching
Difficulty: Hard
Category: String, Dynamic Programming, Recursion, Backtracking
LeetCode: #10
Pattern: Dynamic Programming + String Processing + Pattern Matching
Mixed Patterns: DP + Recursion + Backtracking + State Management + Edge Cases

Given an input string s and a pattern p, implement regular expression matching
with support for '.' and '*' where:
- '.' Matches any single character
- '*' Matches zero or more of the preceding element

The matching should cover the entire input string (not partial).

Example 1:
  Input: s = "aa", p = "a"
  Output: false
  Explanation: "a" does not match the entire string "aa".

Example 2:
  Input: s = "aa", p = "a*"
  Output: true
  Explanation: '*' means zero or more of the preceding element, 'a'.

Example 3:
  Input: s = "ab", p = ".*"
  Output: true
  Explanation: ".*" means "zero or more (*) of any character (.)".

Example 4:
  Input: s = "aab", p = "c*a*b"
  Output: true
  Explanation: c* matches 0 'c's, a* matches 2 'a's, b matches 'b'.

Example 5:
  Input: s = "mississippi", p = "mis*is*p*."
  Output: false

Constraints:
  - 1 <= s.length <= 20
  - 1 <= p.length <= 30
  - s contains only lowercase English letters
  - p contains only lowercase English letters, '.', and '*'
  - It is guaranteed that '*' does not appear as the first character

Time Complexity: O(m * n) where m = s.length, n = p.length
Space Complexity: O(m * n) for DP table

Pattern Notes:
  - DP state: dp[i][j] = can s[0...i-1] match p[0...j-1]
  - Handle '*' carefully: can match 0 or more of preceding character
  - Base cases: empty string and pattern combinations
  - Recursive relation depends on current characters and '*' presence
  - Memoization crucial for avoiding redundant computations

Interview Notes:
  - Follow-up: Wildcard pattern matching (different '*' semantics)
  - Follow-up: Support for '+' (one or more) quantifier
  - Follow-up: Case-insensitive matching
  - Common mistakes: Incorrect '*' handling, wrong base cases
*/

export const functionName = 'isMatch';

export const tests = [
  {
    input: ["aa", "a"],
    expected: false
  },
  {
    input: ["aa", "a*"],
    expected: true
  },
  {
    input: ["ab", ".*"],
    expected: true
  },
  {
    input: ["aab", "c*a*b"],
    expected: true
  },
  {
    input: ["mississippi", "mis*is*p*."],
    expected: false
  },
  {
    input: ["", ""],
    expected: true
  },
  {
    input: ["", "a*"],
    expected: true
  },
  {
    input: ["ab", "a*b"],
    expected: true
  }
];

/**
 * Regular expression matching using dynamic programming
 * @param {string} s - Input string
 * @param {string} p - Pattern with '.' and '*'
 * @return {boolean} True if pattern matches entire string
 */
function isMatch(s, p) {
    const m = s.length;
    const n = p.length;

    // dp[i][j] = can s[0...i-1] match p[0...j-1]
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(false));

    // Base case: empty string matches empty pattern
    dp[0][0] = true;

    // Handle patterns like a*, a*b*, a*b*c* that can match empty string
    for (let j = 2; j <= n; j++) {
        if (p[j - 1] === '*') {
            dp[0][j] = dp[0][j - 2];
        }
    }

    // Fill DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const sChar = s[i - 1];
            const pChar = p[j - 1];

            if (pChar === '*') {
                // Current pattern character is '*'
                const prevChar = p[j - 2];

                // Case 1: Match zero occurrences of preceding character
                dp[i][j] = dp[i][j - 2];

                // Case 2: Match one or more occurrences
                if (prevChar === '.' || prevChar === sChar) {
                    dp[i][j] = dp[i][j] || dp[i - 1][j];
                }
            } else if (pChar === '.' || pChar === sChar) {
                // Characters match (literal or wildcard)
                dp[i][j] = dp[i - 1][j - 1];
            }
            // If characters don't match, dp[i][j] remains false
        }
    }

    return dp[m][n];
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

        const firstMatch = i < s.length && (p[j] === s[i] || p[j] === '.');

        let result;
        if (j + 1 < p.length && p[j + 1] === '*') {
            // Next character is '*'
            result = helper(i, j + 2) || // Match zero occurrences
                     (firstMatch && helper(i + 1, j)); // Match one or more
        } else {
            // No '*' following
            result = firstMatch && helper(i + 1, j + 1);
        }

        memo.set(key, result);
        return result;
    }

    return helper(0, 0);
}

/**
 * Alternative: Bottom-up DP with space optimization
 * @param {string} s - Input string
 * @param {string} p - Pattern
 * @return {boolean} True if pattern matches string
 */
function isMatchOptimized(s, p) {
    const m = s.length;
    const n = p.length;

    // Use only two rows instead of full table
    let prev = Array(n + 1).fill(false);
    let curr = Array(n + 1).fill(false);

    prev[0] = true; // Empty string matches empty pattern

    // Initialize first row
    for (let j = 2; j <= n; j++) {
        if (p[j - 1] === '*') {
            prev[j] = prev[j - 2];
        }
    }

    for (let i = 1; i <= m; i++) {
        curr.fill(false);

        for (let j = 1; j <= n; j++) {
            const sChar = s[i - 1];
            const pChar = p[j - 1];

            if (pChar === '*') {
                const prevChar = p[j - 2];
                curr[j] = curr[j - 2];

                if (prevChar === '.' || prevChar === sChar) {
                    curr[j] = curr[j] || prev[j];
                }
            } else if (pChar === '.' || pChar === sChar) {
                curr[j] = prev[j - 1];
            }
        }

        [prev, curr] = [curr, prev];
    }

    return prev[n];
}

/**
 * Extended: Pattern matching with additional features
 * @param {string} s - Input string
 * @param {string} p - Pattern with '.', '*', '+'
 * @return {boolean} True if pattern matches string
 */
function isMatchExtended(s, p) {
    const m = s.length;
    const n = p.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(false));

    dp[0][0] = true;

    // Initialize for patterns that can match empty string
    for (let j = 1; j <= n; j++) {
        if (p[j - 1] === '*') {
            dp[0][j] = dp[0][j - 2];
        }
    }

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const sChar = s[i - 1];
            const pChar = p[j - 1];

            if (pChar === '*') {
                const prevChar = p[j - 2];
                dp[i][j] = dp[i][j - 2]; // Zero matches

                if (prevChar === '.' || prevChar === sChar) {
                    dp[i][j] = dp[i][j] || dp[i - 1][j]; // One or more matches
                }
            } else if (pChar === '+') {
                // '+' means one or more of preceding character
                const prevChar = p[j - 2];
                if (prevChar === '.' || prevChar === sChar) {
                    dp[i][j] = dp[i - 1][j - 2] || dp[i - 1][j]; // One or more matches
                }
            } else if (pChar === '.' || pChar === sChar) {
                dp[i][j] = dp[i - 1][j - 1];
            }
        }
    }

    return dp[m][n];
}

/**
 * Extended: Get all matching substrings
 * @param {string} s - Input string
 * @param {string} p - Pattern
 * @return {string[]} All substrings that match the pattern
 */
function findAllMatches(s, p) {
    const matches = [];

    for (let i = 0; i < s.length; i++) {
        for (let j = i + 1; j <= s.length; j++) {
            const substring = s.slice(i, j);
            if (isMatch(substring, p)) {
                matches.push(substring);
            }
        }
    }

    return matches;
}

/**
 * Extended: Pattern validation
 * @param {string} p - Pattern to validate
 * @return {boolean} True if pattern is valid
 */
function isValidPattern(p) {
    // Check for invalid '*' placement
    for (let i = 0; i < p.length; i++) {
        if (p[i] === '*' && i === 0) {
            return false; // '*' cannot be first character
        }
    }

    // Check for consecutive '*'
    for (let i = 1; i < p.length; i++) {
        if (p[i] === '*' && p[i - 1] === '*') {
            return false; // Consecutive '*' not allowed
        }
    }

    return true;
}

/**
 * Extended: Match with detailed trace
 * @param {string} s - Input string
 * @param {string} p - Pattern
 * @return {Object} Match result with trace information
 */
function isMatchWithTrace(s, p) {
    const m = s.length;
    const n = p.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(false));
    const trace = [];

    dp[0][0] = true;

    for (let j = 2; j <= n; j++) {
        if (p[j - 1] === '*') {
            dp[0][j] = dp[0][j - 2];
        }
    }

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const sChar = s[i - 1];
            const pChar = p[j - 1];

            if (pChar === '*') {
                const prevChar = p[j - 2];
                dp[i][j] = dp[i][j - 2];

                if (prevChar === '.' || prevChar === sChar) {
                    dp[i][j] = dp[i][j] || dp[i - 1][j];
                }

                trace.push({
                    position: [i, j],
                    sChar,
                    pChar,
                    prevChar,
                    matched: dp[i][j],
                    reason: '*' + ' quantifier'
                });
            } else if (pChar === '.' || pChar === sChar) {
                dp[i][j] = dp[i - 1][j - 1];
                trace.push({
                    position: [i, j],
                    sChar,
                    pChar,
                    matched: dp[i][j],
                    reason: 'Character match'
                });
            }
        }
    }

    return {
        isMatch: dp[m][n],
        trace,
        dpTable: dp
    };
}

export default isMatch;