/**
 * Determines if s is a subsequence of t using two pointers
 * @param {string} s - The subsequence string
 * @param {string} t - The target string
 * @return {boolean} True if s is a subsequence of t
 */
export function isSubsequence(s, t) {
    // Handle edge cases
    if (s.length === 0) return true;
    if (t.length === 0) return false;

    let sPointer = 0; // Pointer for string s
    let tPointer = 0; // Pointer for string t

    // Traverse through t and try to match characters with s
    while (tPointer < t.length && sPointer < s.length) {
        // If characters match, move s pointer
        if (s[sPointer] === t[tPointer]) {
            sPointer++;
        }

        // Always move t pointer
        tPointer++;

        // Early termination optimization
        // If remaining characters in t < remaining in s, impossible to match
        if (t.length - tPointer < s.length - sPointer) {
            break;
        }
    }

    // Check if we've matched all characters in s
    return sPointer === s.length;
}

/**
 * Alternative: Recursive approach
 * @param {string} s - The subsequence string
 * @param {string} t - The target string
 * @return {boolean} True if s is a subsequence of t
 */
export function isSubsequenceRecursive(s, t) {
    function helper(sIndex, tIndex) {
        // Base cases
        if (sIndex === s.length) return true; // All characters in s matched
        if (tIndex === t.length) return false; // Reached end of t without matching all of s

        // If characters match, advance both pointers
        if (s[sIndex] === t[tIndex]) {
            return helper(sIndex + 1, tIndex + 1);
        } else {
            // If no match, only advance t pointer
            return helper(sIndex, tIndex + 1);
        }
    }

    return helper(0, 0);
}

/**
 * Alternative: Using indexOf method
 * @param {string} s - The subsequence string
 * @param {string} t - The target string
 * @return {boolean} True if s is a subsequence of t
 */
export function isSubsequenceIndexOf(s, t) {
    let lastIndex = -1;

    for (let char of s) {
        // Find the next occurrence of char in t after lastIndex
        lastIndex = t.indexOf(char, lastIndex + 1);

        // If character not found, s is not a subsequence of t
        if (lastIndex === -1) {
            return false;
        }
    }

    return true;
}

/**
 * Alternative: Dynamic Programming approach (overkill for this problem)
 * @param {string} s - The subsequence string
 * @param {string} t - The target string
 * @return {boolean} True if s is a subsequence of t
 */
export function isSubsequenceDP(s, t) {
    const m = s.length;
    const n = t.length;

    // dp[i][j] represents if s[0...i-1] is subsequence of t[0...j-1]
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(false));

    // Empty string is subsequence of any string
    for (let j = 0; j <= n; j++) {
        dp[0][j] = true;
    }

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s[i - 1] === t[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = dp[i][j - 1];
            }
        }
    }

    return dp[m][n];
}