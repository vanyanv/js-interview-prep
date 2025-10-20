/**
 * Checks if a string is a palindrome (ignoring case and non-alphanumeric characters)
 * @param {string} s - Input string to check
 * @return {boolean} True if string is a palindrome, false otherwise
 */
export function isPalindrome(s) {
    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        // Skip non-alphanumeric characters from left
        while (left < right && !isAlphanumeric(s[left])) {
            left++;
        }

        // Skip non-alphanumeric characters from right
        while (left < right && !isAlphanumeric(s[right])) {
            right--;
        }

        // Compare characters (case-insensitive)
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }

        left++;
        right--;
    }

    return true;
}

/**
 * Helper function to check if character is alphanumeric
 * @param {string} char - Character to check
 * @return {boolean} True if alphanumeric, false otherwise
 */
function isAlphanumeric(char) {
    return /[a-zA-Z0-9]/.test(char);
}

/**
 * Alternative: Clean string first, then compare
 * @param {string} s - Input string to check
 * @return {boolean} True if string is a palindrome, false otherwise
 */
export function isPalindromeCleanFirst(s) {
    // Clean the string: remove non-alphanumeric and convert to lowercase
    const cleaned = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

    // Compare with its reverse
    return cleaned === cleaned.split('').reverse().join('');
}

/**
 * Alternative: Using two pointers on cleaned string
 * @param {string} s - Input string to check
 * @return {boolean} True if string is a palindrome, false otherwise
 */
export function isPalindromeCleanedTwoPointers(s) {
    const cleaned = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    let left = 0;
    let right = cleaned.length - 1;

    while (left < right) {
        if (cleaned[left] !== cleaned[right]) {
            return false;
        }
        left++;
        right--;
    }

    return true;
}