/**
 * Reverses a string in-place using two pointers
 * @param {character[]} s - Array of characters to reverse
 * @return {void} Do not return anything, modify s in-place instead.
 */
export function reverseString(s) {
    let left = 0;
    let right = s.length - 1;

    // Use two pointers moving toward each other
    while (left < right) {
        // Swap characters at left and right positions
        [s[left], s[right]] = [s[right], s[left]];
        left++;
        right--;
    }
}

/**
 * Alternative: Using built-in reverse method (less optimal for interviews)
 * @param {character[]} s - Array of characters to reverse
 * @return {void} Do not return anything, modify s in-place instead.
 */
export function reverseStringBuiltIn(s) {
    s.reverse();
}

/**
 * Alternative: Using recursion (less space efficient)
 * @param {character[]} s - Array of characters to reverse
 * @return {void} Do not return anything, modify s in-place instead.
 */
export function reverseStringRecursive(s) {
    function helper(left, right) {
        if (left >= right) return;

        [s[left], s[right]] = [s[right], s[left]];
        helper(left + 1, right - 1);
    }

    helper(0, s.length - 1);
}