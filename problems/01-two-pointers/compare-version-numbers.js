/*
Problem: Compare Version Numbers
Difficulty: Medium
Category: Two Pointers, String
LeetCode: #165
Pattern: Two Pointers (String Parsing)

Given two version numbers, version1 and version2, compare them.

Version numbers consist of one or more revisions joined by a dot '.'. Each revision
consists of digits and may contain leading zeros. Every revision contains at least
one character. Revisions are 0-indexed from left to right, with the leftmost revision
being revision 0, the next revision being revision 1, and so on.

To compare version numbers, compare their revisions in left-to-right order. Revisions
are compared numerically. If one version number has fewer revisions than the other,
treat the missing revisions as 0.

Return the following:
- If version1 < version2, return -1.
- If version1 > version2, return 1.
- Otherwise, return 0.

Example 1:
  Input: version1 = "1.01", version2 = "1.001"
  Output: 0
  Explanation: Ignoring leading zeroes, both "01" and "001" represent the same integer "1".

Example 2:
  Input: version1 = "1.0", version2 = "1.0.0"
  Output: 0
  Explanation: version1 does not specify revision 2, which means it is treated as "0".

Example 3:
  Input: version1 = "0.1", version2 = "1.1"
  Output: -1
  Explanation: version1's revision 0 is "0", while version2's revision 0 is "1". 0 < 1, so version1 < version2.

Constraints:
  - 1 <= version1.length, version2.length <= 500
  - version1 and version2 only contain digits and '.'.
  - version1 and version2 are valid version numbers.
  - All the given revisions in version1 and version2 can be stored in a 32-bit integer.

Time Complexity: O(n + m) where n and m are lengths of version strings
Space Complexity: O(1)

Pattern Notes:
  - Use two pointers to parse each version string
  - Extract numeric values between dots
  - Compare corresponding revisions numerically
  - Handle missing revisions as 0
  - Continue until both strings are fully processed
*/

export const functionName = 'compareVersion';

export const tests = [
  {
    input: ["1.01", "1.001"],
    expected: 0
  },
  {
    input: ["1.0", "1.0.0"],
    expected: 0
  },
  {
    input: ["0.1", "1.1"],
    expected: -1
  },
  {
    input: ["1.0.1", "1"],
    expected: 1
  },
  {
    input: ["7.5.2.4", "7.5.3"],
    expected: -1
  },
  {
    input: ["1.2", "1.10"],
    expected: -1
  },
  {
    input: ["1.01.1", "1.1.1"],
    expected: 0
  },
  {
    input: ["2.0", "1.9.9.9.9.9.9"],
    expected: 1
  }
];

/**
 * Helper function to get next revision number from version string
 * @param {string} version - Version string
 * @param {number} start - Starting index
 * @return {object} Object containing revision number and next index
 */
function getNextRevision(version, start) {
    if (start >= version.length) {
        return { revision: 0, nextIndex: version.length };
    }

    let num = 0;
    let i = start;

    // Parse digits until we hit a dot or end of string
    while (i < version.length && version[i] !== '.') {
        num = num * 10 + parseInt(version[i]);
        i++;
    }

    // Skip the dot if we found one
    if (i < version.length && version[i] === '.') {
        i++;
    }

    return { revision: num, nextIndex: i };
}

/**
 * Compares two version numbers
 * @param {string} version1 - First version number
 * @param {string} version2 - Second version number
 * @return {number} -1 if version1 < version2, 1 if version1 > version2, 0 if equal
 */
function compareVersion(version1, version2) {
    let i = 0; // Pointer for version1
    let j = 0; // Pointer for version2

    while (i < version1.length || j < version2.length) {
        // Get next revision from both versions
        const rev1Info = getNextRevision(version1, i);
        const rev2Info = getNextRevision(version2, j);

        const rev1 = rev1Info.revision;
        const rev2 = rev2Info.revision;

        // Compare current revisions
        if (rev1 < rev2) {
            return -1;
        } else if (rev1 > rev2) {
            return 1;
        }

        // Move to next revisions
        i = rev1Info.nextIndex;
        j = rev2Info.nextIndex;
    }

    return 0; // Versions are equal
}

export default compareVersion;