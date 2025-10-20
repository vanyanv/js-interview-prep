/**
 * Helper function to check if a substring is a palindrome
 * @param {string} s - The string
 * @param {number} left - Left index
 * @param {number} right - Right index
 * @return {boolean} True if substring is palindrome
 */
function isPalindromeRange(s, left, right) {
    while (left < right) {
        if (s[left] !== s[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}

/**
 * Determines if string can be palindrome after deleting at most one character
 * @param {string} s - Input string
 * @return {boolean} True if valid palindrome after at most one deletion
 */
export function validPalindrome(s) {
    let left = 0;
    let right = s.length - 1;

    // Use two pointers to find the first mismatch
    while (left < right) {
        if (s[left] !== s[right]) {
            // Try removing left character OR right character
            // Check if either results in a palindrome
            return isPalindromeRange(s, left + 1, right) ||
                   isPalindromeRange(s, left, right - 1);
        }
        left++;
        right--;
    }

    // If no mismatch found, it's already a palindrome
    return true;
}

/**
 * Alternative: Recursive approach with deletion count
 * @param {string} s - Input string
 * @return {boolean} True if valid palindrome after at most one deletion
 */
export function validPalindromeRecursive(s) {
    function helper(left, right, deletions) {
        // Base case: used too many deletions
        if (deletions > 1) return false;

        // Check palindrome
        while (left < right) {
            if (s[left] !== s[right]) {
                // Try deleting left or right character
                return helper(left + 1, right, deletions + 1) ||
                       helper(left, right - 1, deletions + 1);
            }
            left++;
            right--;
        }

        return true;
    }

    return helper(0, s.length - 1, 0);
}

/**
 * Alternative: Check all possible single deletions (less efficient)
 * @param {string} s - Input string
 * @return {boolean} True if valid palindrome after at most one deletion
 */
export function validPalindromeBruteForce(s) {
    // First check if already palindrome
    if (isPalindromeRange(s, 0, s.length - 1)) {
        return true;
    }

    // Try deleting each character and check if result is palindrome
    for (let i = 0; i < s.length; i++) {
        const modified = s.slice(0, i) + s.slice(i + 1);
        if (isPalindromeRange(modified, 0, modified.length - 1)) {
            return true;
        }
    }

    return false;
}

/**
 * Alternative: Using string manipulation
 * @param {string} s - Input string
 * @return {boolean} True if valid palindrome after at most one deletion
 */
export function validPalindromeStringMethod(s) {
    function isPalindrome(str) {
        return str === str.split('').reverse().join('');
    }

    // Check if already palindrome
    if (isPalindrome(s)) return true;

    // Try removing each character
    for (let i = 0; i < s.length; i++) {
        const modified = s.slice(0, i) + s.slice(i + 1);
        if (isPalindrome(modified)) {
            return true;
        }
    }

    return false;
}