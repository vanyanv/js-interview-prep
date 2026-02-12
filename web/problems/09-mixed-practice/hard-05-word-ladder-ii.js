/*
Problem: Word Ladder II
Difficulty: Hard
Category: BFS, DFS, Hash Set, String, Graph, Backtracking
LeetCode: #126
Pattern: BFS + DFS + Graph Construction + Path Reconstruction
Mixed Patterns: BFS (Shortest Path) + DFS (Path Enumeration) + Graph Building + Backtracking

A transformation sequence from word beginWord to word endWord using a dictionary
wordList is a sequence of words such that:
- Every adjacent pair differs by exactly one letter
- Every word in the sequence is in wordList
- beginWord may not be in wordList

Given two words, beginWord and endWord, and a dictionary wordList, return all
the shortest transformation sequences from beginWord to endWord.

Example 1:
  Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
  Output: [["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]

Example 2:
  Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
  Output: []
  Explanation: endWord "cog" is not in wordList.

Example 3:
  Input: beginWord = "a", endWord = "c", wordList = ["a","b","c"]
  Output: [["a","c"]]

Constraints:
  - 1 <= beginWord.length <= 5
  - endWord.length == beginWord.length
  - 1 <= wordList.length <= 500
  - wordList[i].length == beginWord.length
  - All words consist of lowercase English letters
  - All words in wordList are unique

Time Complexity: O(N * M * 26) for BFS + O(K) for DFS where K is number of paths
Space Complexity: O(N * M) for graph storage

Pattern Notes:
  - Two-phase approach: BFS to find shortest distance, DFS to enumerate paths
  - Build neighbor graph and track distances from start
  - Use BFS to ensure we only consider shortest paths
  - DFS from end to start using distance constraints
  - Handle word transformations and path reconstruction carefully

Interview Notes:
  - Follow-up: Memory optimization for large graphs
  - Follow-up: Return just the count of shortest paths
  - Follow-up: Handle case-insensitive transformations
  - Common mistakes: Not filtering for shortest paths only, TLE on large inputs
*/

export const functionName = 'findLadders';

export const tests = [
  {
    input: ["hit", "cog", ["hot","dot","dog","lot","log","cog"]],
    expected: [["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]
  },
  {
    input: ["hit", "cog", ["hot","dot","dog","lot","log"]],
    expected: []
  },
  {
    input: ["a", "c", ["a","b","c"]],
    expected: [["a","c"]]
  },
  {
    input: ["hot", "dog", ["hot","dog"]],
    expected: []
  },
  {
    input: ["leet", "code", ["lest","leet","lose","code","lode","robe","lost"]],
    expected: [["leet","lest","lost","lose","lode","code"]]
  }
];

/**
 * Finds all shortest word transformation paths
 * @param {string} beginWord - Starting word
 * @param {string} endWord - Target word
 * @param {string[]} wordList - List of valid intermediate words
 * @return {string[][]} All shortest transformation sequences
 */
function findLadders(beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return [];

    // Build neighbor graph
    const neighbors = new Map();
    const words = [beginWord, ...wordList];

    for (const word of words) {
        neighbors.set(word, []);
    }

    for (let i = 0; i < words.length; i++) {
        for (let j = i + 1; j < words.length; j++) {
            if (isOneEditDistance(words[i], words[j])) {
                neighbors.get(words[i]).push(words[j]);
                neighbors.get(words[j]).push(words[i]);
            }
        }
    }

    // BFS to find shortest distances
    const distances = new Map();
    const queue = [beginWord];
    distances.set(beginWord, 0);
    let found = false;

    while (queue.length > 0 && !found) {
        const levelSize = queue.length;

        // Process current level
        for (let i = 0; i < levelSize; i++) {
            const word = queue.shift();
            const dist = distances.get(word);

            for (const neighbor of neighbors.get(word) || []) {
                if (neighbor === endWord) {
                    found = true;
                }

                if (!distances.has(neighbor)) {
                    distances.set(neighbor, dist + 1);
                    queue.push(neighbor);
                }
            }
        }
    }

    if (!distances.has(endWord)) return [];

    // DFS to build all shortest paths
    const result = [];

    function dfs(word, path, targetDist) {
        if (targetDist === 0) {
            if (word === beginWord) {
                result.push([...path].reverse());
            }
            return;
        }

        for (const neighbor of neighbors.get(word) || []) {
            if (distances.has(neighbor) && distances.get(neighbor) === targetDist - 1) {
                path.push(neighbor);
                dfs(neighbor, path, targetDist - 1);
                path.pop();
            }
        }
    }

    dfs(endWord, [endWord], distances.get(endWord));
    return result;
}

/**
 * Helper function to check if two words differ by exactly one character
 * @param {string} word1 - First word
 * @param {string} word2 - Second word
 * @return {boolean} True if words differ by exactly one character
 */
function isOneEditDistance(word1, word2) {
    if (word1.length !== word2.length) return false;

    let differences = 0;
    for (let i = 0; i < word1.length; i++) {
        if (word1[i] !== word2[i]) {
            differences++;
            if (differences > 1) return false;
        }
    }

    return differences === 1;
}

/**
 * Alternative: Optimized approach with pattern matching
 * @param {string} beginWord - Starting word
 * @param {string} endWord - Target word
 * @param {string[]} wordList - List of valid words
 * @return {string[][]} All shortest transformation sequences
 */
function findLaddersOptimized(beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return [];

    // Build pattern -> words mapping
    const patterns = new Map();
    const allWords = [beginWord, ...wordList];

    for (const word of allWords) {
        for (let i = 0; i < word.length; i++) {
            const pattern = word.slice(0, i) + '*' + word.slice(i + 1);
            if (!patterns.has(pattern)) {
                patterns.set(pattern, []);
            }
            patterns.get(pattern).push(word);
        }
    }

    // BFS with level tracking
    const visited = new Set([beginWord]);
    const queue = [[beginWord, [beginWord]]];
    const result = [];
    let foundPaths = false;

    while (queue.length > 0 && !foundPaths) {
        const levelSize = queue.length;
        const levelVisited = new Set();

        for (let i = 0; i < levelSize; i++) {
            const [word, path] = queue.shift();

            // Generate all possible next words
            for (let j = 0; j < word.length; j++) {
                const pattern = word.slice(0, j) + '*' + word.slice(j + 1);

                if (patterns.has(pattern)) {
                    for (const nextWord of patterns.get(pattern)) {
                        if (nextWord === endWord) {
                            result.push([...path, nextWord]);
                            foundPaths = true;
                        } else if (!visited.has(nextWord)) {
                            levelVisited.add(nextWord);
                            queue.push([nextWord, [...path, nextWord]]);
                        }
                    }
                }
            }
        }

        // Add level visited to global visited
        for (const word of levelVisited) {
            visited.add(word);
        }
    }

    return result;
}

/**
 * Alternative: Bidirectional BFS approach
 * @param {string} beginWord - Starting word
 * @param {string} endWord - Target word
 * @param {string[]} wordList - List of valid words
 * @return {string[][]} All shortest transformation sequences
 */
function findLaddersBidirectional(beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return [];

    let beginSet = new Set([beginWord]);
    let endSet = new Set([endWord]);
    const neighbors = new Map();
    let found = false;
    let reverse = false;

    // Initialize neighbors map
    for (const word of [beginWord, ...wordList]) {
        neighbors.set(word, []);
    }

    while (beginSet.size > 0 && endSet.size > 0 && !found) {
        // Always expand the smaller set
        if (beginSet.size > endSet.size) {
            [beginSet, endSet] = [endSet, beginSet];
            reverse = !reverse;
        }

        const nextSet = new Set();

        for (const word of beginSet) {
            for (let i = 0; i < word.length; i++) {
                for (let c = 97; c <= 122; c++) { // 'a' to 'z'
                    const char = String.fromCharCode(c);
                    if (char === word[i]) continue;

                    const nextWord = word.slice(0, i) + char + word.slice(i + 1);

                    if (endSet.has(nextWord)) {
                        found = true;
                        if (reverse) {
                            neighbors.get(nextWord).push(word);
                        } else {
                            neighbors.get(word).push(nextWord);
                        }
                    }

                    if (wordSet.has(nextWord) && !endSet.has(nextWord)) {
                        nextSet.add(nextWord);
                        if (reverse) {
                            neighbors.get(nextWord).push(word);
                        } else {
                            neighbors.get(word).push(nextWord);
                        }
                    }
                }
            }
        }

        beginSet = nextSet;
    }

    // Build paths using DFS
    const result = [];

    function dfs(word, target, path) {
        if (word === target) {
            result.push([...path]);
            return;
        }

        for (const neighbor of neighbors.get(word) || []) {
            path.push(neighbor);
            dfs(neighbor, target, path);
            path.pop();
        }
    }

    if (found) {
        dfs(beginWord, endWord, [beginWord]);
    }

    return result;
}

/**
 * Extended: Count shortest paths without storing them
 * @param {string} beginWord - Starting word
 * @param {string} endWord - Target word
 * @param {string[]} wordList - List of valid words
 * @return {number} Number of shortest transformation sequences
 */
function countLadders(beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;

    // BFS to find distances
    const distances = new Map();
    const queue = [beginWord];
    distances.set(beginWord, 0);

    while (queue.length > 0) {
        const word = queue.shift();
        const dist = distances.get(word);

        for (let i = 0; i < word.length; i++) {
            for (let c = 97; c <= 122; c++) {
                const char = String.fromCharCode(c);
                if (char === word[i]) continue;

                const nextWord = word.slice(0, i) + char + word.slice(i + 1);

                if (wordSet.has(nextWord) && !distances.has(nextWord)) {
                    distances.set(nextWord, dist + 1);
                    queue.push(nextWord);
                }
            }
        }
    }

    if (!distances.has(endWord)) return 0;

    // Count paths using DP
    const pathCount = new Map();
    pathCount.set(beginWord, 1);

    const sortedWords = Array.from(distances.keys()).sort((a, b) => distances.get(a) - distances.get(b));

    for (const word of sortedWords) {
        if (word === beginWord) continue;

        let count = 0;
        const currentDist = distances.get(word);

        for (let i = 0; i < word.length; i++) {
            for (let c = 97; c <= 122; c++) {
                const char = String.fromCharCode(c);
                if (char === word[i]) continue;

                const prevWord = word.slice(0, i) + char + word.slice(i + 1);

                if (distances.has(prevWord) && distances.get(prevWord) === currentDist - 1) {
                    count += pathCount.get(prevWord) || 0;
                }
            }
        }

        pathCount.set(word, count);
    }

    return pathCount.get(endWord) || 0;
}

/**
 * Extended: Find ladders with path length limit
 * @param {string} beginWord - Starting word
 * @param {string} endWord - Target word
 * @param {string[]} wordList - List of valid words
 * @param {number} maxLength - Maximum allowed path length
 * @return {string[][]} All transformation sequences within length limit
 */
function findLaddersWithLimit(beginWord, endWord, wordList, maxLength) {
    const allPaths = findLadders(beginWord, endWord, wordList);
    return allPaths.filter(path => path.length <= maxLength);
}

export default findLadders;