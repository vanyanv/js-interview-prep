/*
Problem: Word Ladder
Difficulty: Medium
Category: BFS, Hash Set, String, Graph
LeetCode: #127
Pattern: BFS + Graph Traversal + String Manipulation
Mixed Patterns: BFS (Shortest Path) + Hash Set + String Processing + Graph Building

A transformation sequence from word beginWord to word endWord using a dictionary
wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:
- Every adjacent pair of words differs by exactly one letter
- Every si for 1 <= i <= k is in wordList (beginWord may not be in wordList)
- sk == endWord

Return the length of the shortest transformation sequence from beginWord to endWord,
or 0 if no such sequence exists.

Example 1:
  Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
  Output: 5
  Explanation: "hit" -> "hot" -> "dot" -> "dog" -> "cog"

Example 2:
  Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
  Output: 0
  Explanation: endWord "cog" is not in wordList.

Example 3:
  Input: beginWord = "a", endWord = "c", wordList = ["a","b","c"]
  Output: 2
  Explanation: "a" -> "c"

Constraints:
  - 1 <= beginWord.length <= 10
  - endWord.length == beginWord.length
  - 1 <= wordList.length <= 5000
  - wordList[i].length == beginWord.length
  - All strings consist of lowercase English letters
  - beginWord != endWord
  - All words in wordList are unique

Time Complexity: O(M² × N) where M = word length, N = wordList size
Space Complexity: O(M × N) for BFS queue and visited set

Pattern Notes:
  - Model as graph: words are nodes, edges connect words differing by 1 letter
  - BFS finds shortest path (minimum transformations)
  - Use hash set for O(1) word lookup and visited tracking
  - Generate neighbors by changing each character position
  - Alternative: Bidirectional BFS for optimization

Interview Notes:
  - Follow-up: Return the actual transformation sequence (Word Ladder II)
  - Follow-up: Allow multiple character changes with different costs
  - Follow-up: Find all shortest transformation sequences
  - Optimization: Bidirectional BFS, pre-processing word patterns
*/

export const functionName = 'ladderLength';

export const tests = [
  {
    input: ["hit", "cog", ["hot","dot","dog","lot","log","cog"]],
    expected: 5
  },
  {
    input: ["hit", "cog", ["hot","dot","dog","lot","log"]],
    expected: 0
  },
  {
    input: ["a", "c", ["a","b","c"]],
    expected: 2
  },
  {
    input: ["hot", "dog", ["hot","dog"]],
    expected: 0
  },
  {
    input: ["hot", "dog", ["hot","cog","dog","tot","hog","hop","pot","dot"]],
    expected: 3
  },
  {
    input: ["qa", "sq", ["si","go","se","cm","so","ph","mt","db","mb","sb","kr","ln","tm","le","av","sm","ar","ci","ca","br","ti","ba","to","ra","fa","yo","ow","sn","ya","cr","po","fe","ho","ma","re","or","rn","au","ur","rh","sr","tc","lt","lo","as","fr","nb","yb","if","pb","ge","th","pm","rb","sh","co","ga","li","ha","hz","no","bi","di","hi","qa","pi","os","uh","wm","an","me","mo","na","la","st","er","sc","ne","mn","mi","am","ex","pt","io","be","fm","ta","tb","ni","mr","pa","he","lr","sq","ye"]],
    expected: 5
  }
];

/**
 * Finds shortest word transformation sequence using BFS
 * @param {string} beginWord - Starting word
 * @param {string} endWord - Target word
 * @param {string[]} wordList - List of valid intermediate words
 * @return {number} Length of shortest transformation sequence, 0 if impossible
 */
function ladderLength(beginWord, endWord, wordList) {
    // Convert to set for O(1) lookup
    const wordSet = new Set(wordList);

    // Early exit if endWord not in wordList
    if (!wordSet.has(endWord)) {
        return 0;
    }

    const queue = [[beginWord, 1]]; // [word, length]
    const visited = new Set([beginWord]);

    while (queue.length > 0) {
        const [currentWord, length] = queue.shift();

        // Generate all possible next words
        for (let i = 0; i < currentWord.length; i++) {
            for (let c = 97; c <= 122; c++) { // 'a' to 'z'
                const char = String.fromCharCode(c);
                if (char === currentWord[i]) continue;

                const nextWord = currentWord.slice(0, i) + char + currentWord.slice(i + 1);

                // Found target word
                if (nextWord === endWord) {
                    return length + 1;
                }

                // Add to queue if valid and unvisited
                if (wordSet.has(nextWord) && !visited.has(nextWord)) {
                    visited.add(nextWord);
                    queue.push([nextWord, length + 1]);
                }
            }
        }
    }

    return 0; // No transformation sequence found
}

/**
 * Alternative: Bidirectional BFS for optimization
 * @param {string} beginWord - Starting word
 * @param {string} endWord - Target word
 * @param {string[]} wordList - List of valid words
 * @return {number} Length of shortest transformation sequence
 */
function ladderLengthBidirectional(beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;

    let beginSet = new Set([beginWord]);
    let endSet = new Set([endWord]);
    let visited = new Set();
    let length = 1;

    while (beginSet.size > 0 && endSet.size > 0) {
        // Always expand the smaller set for efficiency
        if (beginSet.size > endSet.size) {
            [beginSet, endSet] = [endSet, beginSet];
        }

        const nextSet = new Set();

        for (const word of beginSet) {
            for (let i = 0; i < word.length; i++) {
                for (let c = 97; c <= 122; c++) {
                    const char = String.fromCharCode(c);
                    if (char === word[i]) continue;

                    const nextWord = word.slice(0, i) + char + word.slice(i + 1);

                    // Found intersection - path exists
                    if (endSet.has(nextWord)) {
                        return length + 1;
                    }

                    if (wordSet.has(nextWord) && !visited.has(nextWord)) {
                        visited.add(nextWord);
                        nextSet.add(nextWord);
                    }
                }
            }
        }

        beginSet = nextSet;
        length++;
    }

    return 0;
}

/**
 * Alternative: Pre-process word patterns for optimization
 * @param {string} beginWord - Starting word
 * @param {string} endWord - Target word
 * @param {string[]} wordList - List of valid words
 * @return {number} Length of shortest transformation sequence
 */
function ladderLengthOptimized(beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;

    // Pre-process: create pattern -> words mapping
    const patterns = new Map();

    for (const word of wordList) {
        for (let i = 0; i < word.length; i++) {
            const pattern = word.slice(0, i) + '*' + word.slice(i + 1);
            if (!patterns.has(pattern)) {
                patterns.set(pattern, []);
            }
            patterns.get(pattern).push(word);
        }
    }

    const queue = [[beginWord, 1]];
    const visited = new Set([beginWord]);

    while (queue.length > 0) {
        const [currentWord, length] = queue.shift();

        // Generate patterns for current word
        for (let i = 0; i < currentWord.length; i++) {
            const pattern = currentWord.slice(0, i) + '*' + currentWord.slice(i + 1);

            if (patterns.has(pattern)) {
                for (const nextWord of patterns.get(pattern)) {
                    if (nextWord === endWord) {
                        return length + 1;
                    }

                    if (!visited.has(nextWord)) {
                        visited.add(nextWord);
                        queue.push([nextWord, length + 1]);
                    }
                }
            }
        }
    }

    return 0;
}

/**
 * Extended: Return actual transformation path
 * @param {string} beginWord - Starting word
 * @param {string} endWord - Target word
 * @param {string[]} wordList - List of valid words
 * @return {string[]} Shortest transformation sequence, empty if none exists
 */
function findLadderPath(beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return [];

    const queue = [[beginWord, [beginWord]]];
    const visited = new Set([beginWord]);

    while (queue.length > 0) {
        const [currentWord, path] = queue.shift();

        for (let i = 0; i < currentWord.length; i++) {
            for (let c = 97; c <= 122; c++) {
                const char = String.fromCharCode(c);
                if (char === currentWord[i]) continue;

                const nextWord = currentWord.slice(0, i) + char + currentWord.slice(i + 1);

                if (nextWord === endWord) {
                    return [...path, nextWord];
                }

                if (wordSet.has(nextWord) && !visited.has(nextWord)) {
                    visited.add(nextWord);
                    queue.push([nextWord, [...path, nextWord]]);
                }
            }
        }
    }

    return [];
}

/**
 * Extended: Find all shortest paths
 * @param {string} beginWord - Starting word
 * @param {string} endWord - Target word
 * @param {string[]} wordList - List of valid words
 * @return {string[][]} All shortest transformation sequences
 */
function findAllLadders(beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return [];

    const results = [];
    const queue = [[beginWord, [beginWord]]];
    const visited = new Set();
    let found = false;
    let level = 1;

    while (queue.length > 0 && !found) {
        const levelSize = queue.length;
        const levelVisited = new Set();

        for (let i = 0; i < levelSize; i++) {
            const [currentWord, path] = queue.shift();

            for (let j = 0; j < currentWord.length; j++) {
                for (let c = 97; c <= 122; c++) {
                    const char = String.fromCharCode(c);
                    if (char === currentWord[j]) continue;

                    const nextWord = currentWord.slice(0, j) + char + currentWord.slice(j + 1);

                    if (nextWord === endWord) {
                        results.push([...path, nextWord]);
                        found = true;
                    } else if (wordSet.has(nextWord) && !visited.has(nextWord)) {
                        levelVisited.add(nextWord);
                        queue.push([nextWord, [...path, nextWord]]);
                    }
                }
            }
        }

        // Add level visited to global visited
        for (const word of levelVisited) {
            visited.add(word);
        }
        level++;
    }

    return results;
}

export default ladderLength;