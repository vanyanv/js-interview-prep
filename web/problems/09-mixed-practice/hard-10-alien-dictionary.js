/*
Problem: Alien Dictionary
Difficulty: Hard
Category: Graph, DFS, BFS, Topological Sort, String
LeetCode: #269
Pattern: Topological Sort + Graph Construction + String Analysis
Mixed Patterns: Graph Building + DFS/BFS + Cycle Detection + Character Ordering

There is a new alien language that uses the English alphabet. However, the order
among the letters is unknown to you.

You are given a list of strings words from the alien language's dictionary,
where the strings in words are sorted lexicographically by the rules of this
new language.

Return a string of the unique letters in the new alien language sorted in
lexicographically increasing order by the new language's rules. If there is
no solution, return "". If there are multiple solutions, return any of them.

Example 1:
  Input: words = ["wrt","wrf","er","ett","rftt"]
  Output: "wertf"
  Explanation: From "wrt" and "wrf", we get 't' < 'f'.
               From "wrf" and "er", we get 'w' < 'e'.
               From "er" and "ett", we get 'r' < 't'.
               From "ett" and "rftt", we get 'e' < 'r'.
               So the order is "wertf".

Example 2:
  Input: words = ["z","x"]
  Output: "zx"

Example 3:
  Input: words = ["z","x","z"]
  Output: ""
  Explanation: Order is invalid, so return "".

Constraints:
  - 1 <= words.length <= 100
  - 1 <= words[i].length <= 100
  - words[i] consists of only lowercase English letters

Time Complexity: O(C) where C is total length of all words
Space Complexity: O(1) since at most 26 letters in English alphabet

Pattern Notes:
  - Build directed graph from character ordering constraints
  - Use topological sort to find valid character ordering
  - Detect cycles which indicate invalid ordering
  - Handle edge cases: empty input, single character, duplicate words
  - Compare adjacent words to extract ordering relationships

Interview Notes:
  - Follow-up: What if words can contain any Unicode characters?
  - Follow-up: Handle case where dictionary is not minimal
  - Follow-up: Return all possible valid orderings
  - Common mistakes: Not handling invalid orderings, incorrect graph building
*/

export const functionName = 'alienOrder';

export const tests = [
  {
    input: [["wrt","wrf","er","ett","rftt"]],
    expected: "wertf"
  },
  {
    input: [["z","x"]],
    expected: "zx"
  },
  {
    input: [["z","x","z"]],
    expected: ""
  },
  {
    input: [["abc","ab"]],
    expected: ""
  },
  {
    input: [["a","b","a"]],
    expected: ""
  },
  {
    input: [["ab","adc"]],
    expected: "abcd"
  }
];

/**
 * Determines alien language character order using topological sort
 * @param {string[]} words - Array of words in alien dictionary
 * @return {string} Character order, empty string if invalid
 */
function alienOrder(words) {
    if (!words || words.length === 0) return "";

    // Build graph and in-degree map
    const graph = new Map();
    const inDegree = new Map();

    // Initialize graph with all characters
    for (const word of words) {
        for (const char of word) {
            if (!graph.has(char)) {
                graph.set(char, new Set());
                inDegree.set(char, 0);
            }
        }
    }

    // Build edges by comparing adjacent words
    for (let i = 0; i < words.length - 1; i++) {
        const word1 = words[i];
        const word2 = words[i + 1];

        // Check for invalid case: word1 is prefix of word2 but longer
        if (word1.length > word2.length && word1.startsWith(word2)) {
            return "";
        }

        // Find first different character
        for (let j = 0; j < Math.min(word1.length, word2.length); j++) {
            const char1 = word1[j];
            const char2 = word2[j];

            if (char1 !== char2) {
                // Add edge: char1 -> char2 (char1 comes before char2)
                if (!graph.get(char1).has(char2)) {
                    graph.get(char1).add(char2);
                    inDegree.set(char2, inDegree.get(char2) + 1);
                }
                break; // Only first difference matters
            }
        }
    }

    // Topological sort using Kahn's algorithm
    const queue = [];
    const result = [];

    // Add characters with no incoming edges
    for (const [char, degree] of inDegree.entries()) {
        if (degree === 0) {
            queue.push(char);
        }
    }

    while (queue.length > 0) {
        const char = queue.shift();
        result.push(char);

        // Process neighbors
        for (const neighbor of graph.get(char)) {
            inDegree.set(neighbor, inDegree.get(neighbor) - 1);
            if (inDegree.get(neighbor) === 0) {
                queue.push(neighbor);
            }
        }
    }

    // Check if all characters are included (no cycles)
    return result.length === inDegree.size ? result.join('') : "";
}

/**
 * Alternative: DFS-based topological sort
 * @param {string[]} words - Array of words in alien dictionary
 * @return {string} Character order, empty string if invalid
 */
function alienOrderDFS(words) {
    if (!words || words.length === 0) return "";

    const graph = new Map();
    const visited = new Map(); // 0: unvisited, 1: visiting, 2: visited

    // Initialize graph
    for (const word of words) {
        for (const char of word) {
            if (!graph.has(char)) {
                graph.set(char, new Set());
                visited.set(char, 0);
            }
        }
    }

    // Build edges
    for (let i = 0; i < words.length - 1; i++) {
        const word1 = words[i];
        const word2 = words[i + 1];

        if (word1.length > word2.length && word1.startsWith(word2)) {
            return "";
        }

        for (let j = 0; j < Math.min(word1.length, word2.length); j++) {
            const char1 = word1[j];
            const char2 = word2[j];

            if (char1 !== char2) {
                graph.get(char1).add(char2);
                break;
            }
        }
    }

    const result = [];

    function dfs(char) {
        if (visited.get(char) === 1) return false; // Cycle detected
        if (visited.get(char) === 2) return true;  // Already processed

        visited.set(char, 1); // Mark as visiting

        for (const neighbor of graph.get(char)) {
            if (!dfs(neighbor)) return false;
        }

        visited.set(char, 2); // Mark as visited
        result.push(char);
        return true;
    }

    // Run DFS for all characters
    for (const char of graph.keys()) {
        if (visited.get(char) === 0) {
            if (!dfs(char)) return "";
        }
    }

    return result.reverse().join('');
}

/**
 * Extended: Find all possible valid orderings
 * @param {string[]} words - Array of words in alien dictionary
 * @return {string[]} All valid character orderings
 */
function allAlienOrders(words) {
    if (!words || words.length === 0) return [""];

    const graph = new Map();
    const inDegree = new Map();

    // Build graph (same as main solution)
    for (const word of words) {
        for (const char of word) {
            if (!graph.has(char)) {
                graph.set(char, new Set());
                inDegree.set(char, 0);
            }
        }
    }

    for (let i = 0; i < words.length - 1; i++) {
        const word1 = words[i];
        const word2 = words[i + 1];

        if (word1.length > word2.length && word1.startsWith(word2)) {
            return [];
        }

        for (let j = 0; j < Math.min(word1.length, word2.length); j++) {
            const char1 = word1[j];
            const char2 = word2[j];

            if (char1 !== char2) {
                if (!graph.get(char1).has(char2)) {
                    graph.get(char1).add(char2);
                    inDegree.set(char2, inDegree.get(char2) + 1);
                }
                break;
            }
        }
    }

    const results = [];

    function backtrack(currentOrder, remainingInDegree) {
        if (currentOrder.length === inDegree.size) {
            results.push(currentOrder.join(''));
            return;
        }

        // Find all characters with in-degree 0
        const candidates = [];
        for (const [char, degree] of remainingInDegree.entries()) {
            if (degree === 0 && !currentOrder.includes(char)) {
                candidates.push(char);
            }
        }

        for (const char of candidates) {
            currentOrder.push(char);

            // Update in-degrees
            const newInDegree = new Map(remainingInDegree);
            for (const neighbor of graph.get(char)) {
                newInDegree.set(neighbor, newInDegree.get(neighbor) - 1);
            }

            backtrack(currentOrder, newInDegree);
            currentOrder.pop();
        }
    }

    backtrack([], new Map(inDegree));
    return results;
}

/**
 * Extended: Validate alien dictionary ordering
 * @param {string[]} words - Array of words
 * @param {string} order - Character ordering to validate
 * @return {boolean} True if words follow the given order
 */
function isAlienSorted(words, order) {
    const orderMap = new Map();
    for (let i = 0; i < order.length; i++) {
        orderMap.set(order[i], i);
    }

    function compare(word1, word2) {
        const minLen = Math.min(word1.length, word2.length);

        for (let i = 0; i < minLen; i++) {
            const pos1 = orderMap.get(word1[i]);
            const pos2 = orderMap.get(word2[i]);

            if (pos1 < pos2) return -1;
            if (pos1 > pos2) return 1;
        }

        return word1.length - word2.length;
    }

    for (let i = 0; i < words.length - 1; i++) {
        if (compare(words[i], words[i + 1]) > 0) {
            return false;
        }
    }

    return true;
}

/**
 * Extended: Get minimum character set needed
 * @param {string[]} words - Array of words
 * @return {Set<string>} Set of characters that must be ordered
 */
function getRequiredCharacters(words) {
    const required = new Set();

    for (let i = 0; i < words.length - 1; i++) {
        const word1 = words[i];
        const word2 = words[i + 1];

        for (let j = 0; j < Math.min(word1.length, word2.length); j++) {
            if (word1[j] !== word2[j]) {
                required.add(word1[j]);
                required.add(word2[j]);
                break;
            }
        }
    }

    return required;
}

/**
 * Extended: Build constraint graph with detailed information
 * @param {string[]} words - Array of words
 * @return {Object} Detailed graph information
 */
function buildConstraintGraph(words) {
    const graph = new Map();
    const constraints = [];
    const characters = new Set();

    // Initialize
    for (const word of words) {
        for (const char of word) {
            characters.add(char);
            if (!graph.has(char)) {
                graph.set(char, new Set());
            }
        }
    }

    // Build constraints
    for (let i = 0; i < words.length - 1; i++) {
        const word1 = words[i];
        const word2 = words[i + 1];

        for (let j = 0; j < Math.min(word1.length, word2.length); j++) {
            const char1 = word1[j];
            const char2 = word2[j];

            if (char1 !== char2) {
                if (!graph.get(char1).has(char2)) {
                    graph.get(char1).add(char2);
                    constraints.push({
                        from: char1,
                        to: char2,
                        source: `${word1} -> ${word2}`,
                        position: j
                    });
                }
                break;
            }
        }
    }

    return {
        graph,
        constraints,
        characters,
        totalCharacters: characters.size,
        totalConstraints: constraints.length
    };
}

export default alienOrder;