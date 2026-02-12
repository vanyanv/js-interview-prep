/*
Problem: String Compression
Difficulty: Easy
Category: String, Two Pointers, Array
LeetCode: #443
Pattern: Two Pointers + String Processing + In-place Modification
Mixed Patterns: Two Pointers + Character Counting + Array Manipulation

Given an array of characters chars, compress it using the following algorithm:

Begin with an empty string s. For each group of consecutive repeating characters
in chars:
- If the group's length is 1, append the character to s.
- Otherwise, append the character followed by the group's length.

The compressed string s should not be returned separately, but instead, be stored
in the input character array chars. Note that group lengths that are 10 or longer
will be split into multiple characters in chars array.

After you are done modifying the input array, return the new length of the array.

Example 1:
  Input: chars = ["a","a","b","b","c","c","c"]
  Output: Return 6, and the first 6 characters of chars are ["a","2","b","2","c","3"]
  Explanation: Groups are "aa", "bb", "ccc". This compresses to "a2b2c3".

Example 2:
  Input: chars = ["a"]
  Output: Return 1, and the first 1 character of chars is ["a"]
  Explanation: Only one character, no compression needed.

Example 3:
  Input: chars = ["a","b","b","b","b","b","b","b","b","b","b","b","b"]
  Output: Return 4, and the first 4 characters of chars are ["a","b","1","2"]
  Explanation: Groups are "a", "bbbbbbbbbbbb". This compresses to "ab12".

Constraints:
  - 1 <= chars.length <= 2000
  - chars[i] is a lowercase English letter, uppercase English letter, or a digit
  - chars[i] has ASCII value in [33, 126]

Time Complexity: O(n) where n is length of chars array
Space Complexity: O(1) - in-place modification

Pattern Notes:
  - Use two pointers: read pointer and write pointer
  - Count consecutive characters using read pointer
  - Write compressed result using write pointer
  - Handle numbers > 9 by converting to string and writing each digit
  - Modify array in-place to achieve O(1) space complexity

Interview Notes:
  - Follow-up: What if we need to handle Unicode characters?
  - Follow-up: Decompress the compressed string back to original
  - Follow-up: What if compression makes string longer? (optional compression)
  - Common mistake: Not handling multi-digit numbers correctly
*/

export const functionName = 'compress';

export const tests = [
  {
    input: [["a","a","b","b","c","c","c"]],
    expected: 6
  },
  {
    input: [["a"]],
    expected: 1
  },
  {
    input: [["a","b","b","b","b","b","b","b","b","b","b","b","b"]],
    expected: 4
  },
  {
    input: [["a","a","a","b","b","a","a"]],
    expected: 6
  },
  {
    input: [["a","a","a","a","a","a","a","a","a","a","a","a"]],
    expected: 3
  },
  {
    input: [["a","b","c"]],
    expected: 3
  },
  {
    input: [["a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a"]],
    expected: 3
  }
];

/**
 * Compresses character array in-place
 * @param {string[]} chars - Array of characters
 * @return {number} New length of compressed array
 */
function compress(chars) {
    let writeIndex = 0; // Position to write compressed result
    let readIndex = 0;  // Position to read original characters

    while (readIndex < chars.length) {
        const currentChar = chars[readIndex];
        let count = 0;

        // Count consecutive occurrences of current character
        while (readIndex < chars.length && chars[readIndex] === currentChar) {
            readIndex++;
            count++;
        }

        // Write the character
        chars[writeIndex] = currentChar;
        writeIndex++;

        // Write the count if greater than 1
        if (count > 1) {
            const countStr = count.toString();
            for (const digit of countStr) {
                chars[writeIndex] = digit;
                writeIndex++;
            }
        }
    }

    return writeIndex;
}

/**
 * Alternative: More explicit count handling
 * @param {string[]} chars - Array of characters
 * @return {number} New length of compressed array
 */
function compressExplicit(chars) {
    if (chars.length === 0) return 0;

    let write = 0;
    let i = 0;

    while (i < chars.length) {
        const char = chars[i];
        let count = 1;

        // Count consecutive characters
        while (i + count < chars.length && chars[i + count] === char) {
            count++;
        }

        // Write character
        chars[write++] = char;

        // Write count if > 1
        if (count > 1) {
            const digits = count.toString().split('');
            for (const digit of digits) {
                chars[write++] = digit;
            }
        }

        i += count; // Move to next different character
    }

    return write;
}

/**
 * Alternative: Using helper function for count conversion
 * @param {string[]} chars - Array of characters
 * @return {number} New length of compressed array
 */
function compressWithHelper(chars) {
    let writePos = 0;
    let readPos = 0;

    while (readPos < chars.length) {
        const currentChar = chars[readPos];
        const startPos = readPos;

        // Find end of current character group
        while (readPos < chars.length && chars[readPos] === currentChar) {
            readPos++;
        }

        const count = readPos - startPos;

        // Write character
        chars[writePos++] = currentChar;

        // Write count if needed
        if (count > 1) {
            writePos += writeCount(chars, writePos, count);
        }
    }

    return writePos;
}

/**
 * Helper function to write count digits to array
 * @param {string[]} chars - Array to write to
 * @param {number} pos - Starting position
 * @param {number} count - Count to write
 * @return {number} Number of positions used
 */
function writeCount(chars, pos, count) {
    const countStr = count.toString();
    for (let i = 0; i < countStr.length; i++) {
        chars[pos + i] = countStr[i];
    }
    return countStr.length;
}

/**
 * Extended: Decompress a compressed character array
 * @param {string[]} compressed - Compressed character array
 * @return {string[]} Decompressed character array
 */
function decompress(compressed) {
    const result = [];
    let i = 0;

    while (i < compressed.length) {
        const char = compressed[i];
        i++;

        // Check if next characters form a number
        let countStr = '';
        while (i < compressed.length && /\d/.test(compressed[i])) {
            countStr += compressed[i];
            i++;
        }

        const count = countStr === '' ? 1 : parseInt(countStr);

        // Add character 'count' times
        for (let j = 0; j < count; j++) {
            result.push(char);
        }
    }

    return result;
}

/**
 * Extended: Compress only if it results in shorter array
 * @param {string[]} chars - Array of characters
 * @return {number} Length of result (original or compressed)
 */
function compressOptional(chars) {
    const originalLength = chars.length;
    const originalChars = [...chars]; // Save original

    const compressedLength = compress(chars);

    // If compression doesn't save space, restore original
    if (compressedLength >= originalLength) {
        for (let i = 0; i < originalLength; i++) {
            chars[i] = originalChars[i];
        }
        return originalLength;
    }

    return compressedLength;
}

/**
 * Extended: Get compression statistics
 * @param {string[]} chars - Array of characters
 * @return {Object} Compression stats
 */
function compressWithStats(chars) {
    const originalLength = chars.length;
    const originalChars = [...chars];

    const compressedLength = compress(chars);
    const compressionRatio = (originalLength - compressedLength) / originalLength;

    return {
        originalLength,
        compressedLength,
        spaceSaved: originalLength - compressedLength,
        compressionRatio: Math.round(compressionRatio * 100) / 100,
        compressed: chars.slice(0, compressedLength),
        worthCompressing: compressedLength < originalLength
    };
}

export default compress;