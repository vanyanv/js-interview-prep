/**
 * Helper function to check if a character is a vowel
 * @param {string} char - Character to check
 * @return {boolean} True if character is a vowel
 */
function isVowel(char) {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
    return vowels.has(char);
}

/**
 * Reverses only the vowels in a string using two pointers
 * @param {string} s - Input string
 * @return {string} String with vowels reversed
 */
export function reverseVowels(s) {
    // Convert string to array for easier manipulation
    const chars = Array.from(s);
    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        // Move left pointer to next vowel
        while (left < right && !isVowel(chars[left])) {
            left++;
        }

        // Move right pointer to previous vowel
        while (left < right && !isVowel(chars[right])) {
            right--;
        }

        // Swap vowels if both pointers found vowels
        if (left < right) {
            [chars[left], chars[right]] = [chars[right], chars[left]];
            left++;
            right--;
        }
    }

    return chars.join('');
}

/**
 * Alternative: Using regex for vowel checking
 * @param {string} s - Input string
 * @return {string} String with vowels reversed
 */
export function reverseVowelsRegex(s) {
    const chars = Array.from(s);
    let left = 0;
    let right = s.length - 1;
    const vowelRegex = /[aeiouAEIOU]/;

    while (left < right) {
        // Move left pointer to next vowel
        while (left < right && !vowelRegex.test(chars[left])) {
            left++;
        }

        // Move right pointer to previous vowel
        while (left < right && !vowelRegex.test(chars[right])) {
            right--;
        }

        // Swap vowels
        if (left < right) {
            [chars[left], chars[right]] = [chars[right], chars[left]];
            left++;
            right--;
        }
    }

    return chars.join('');
}

/**
 * Alternative: Extract vowels and reverse them
 * @param {string} s - Input string
 * @return {string} String with vowels reversed
 */
export function reverseVowelsExtract(s) {
    // Extract all vowels
    const vowels = [];
    for (let char of s) {
        if (isVowel(char)) {
            vowels.push(char);
        }
    }

    // Reverse the vowels array
    vowels.reverse();

    // Rebuild string with reversed vowels
    let vowelIndex = 0;
    let result = '';

    for (let char of s) {
        if (isVowel(char)) {
            result += vowels[vowelIndex++];
        } else {
            result += char;
        }
    }

    return result;
}

/**
 * Alternative: Using stack data structure
 * @param {string} s - Input string
 * @return {string} String with vowels reversed
 */
export function reverseVowelsStack(s) {
    // First pass: collect all vowels in a stack
    const vowelStack = [];
    for (let char of s) {
        if (isVowel(char)) {
            vowelStack.push(char);
        }
    }

    // Second pass: replace vowels with popped vowels (reverse order)
    let result = '';
    for (let char of s) {
        if (isVowel(char)) {
            result += vowelStack.pop();
        } else {
            result += char;
        }
    }

    return result;
}