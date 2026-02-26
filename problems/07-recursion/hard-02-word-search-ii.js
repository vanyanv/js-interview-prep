/*
Problem: Word Search II
Difficulty: Hard
Category: Recursion, Backtracking, Trie, Matrix
LeetCode: #212
Pattern: Trie-Optimized Backtracking on a Grid

Given an m x n board of characters and a list of strings words, return all words on the board.

Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells
are horizontally or vertically neighboring. The same letter cell may not be used more than once
in a word.

Example 1:
  Input: board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]],
         words = ["oath","pea","eat","rain"]
  Output: ["eat","oath"]
  Explanation: "oath" and "eat" can be found on the board

Example 2:
  Input: board = [["a","b"],["c","d"]], words = ["abcb"]
  Output: []
  Explanation: "abcb" cannot be formed — would need to reuse the 'b' cell

Example 3:
  Input: board = [["a"]], words = ["a"]
  Output: ["a"]
  Explanation: Single cell matches single character word

Constraints:
  - m == board.length
  - n == board[i].length
  - 1 <= m, n <= 12
  - board[i][j] is a lowercase English letter
  - 1 <= words.length <= 3 * 10^4
  - 1 <= words[i].length <= 10
  - words[i] consists of lowercase English letters
  - All the strings of words are unique

Time Complexity: O(m * n * 4^L) where L is the max word length, but Trie pruning makes it
                 much faster in practice
Space Complexity: O(N) where N is total characters across all words (for the Trie)

Recursion Pattern Notes:
  - Naive approach: for each word, run DFS from every cell — too slow for many words
  - Optimization: build a Trie from all words, then DFS the board against the Trie
  - At each cell, only continue DFS if the Trie has a matching prefix
  - Mark visited cells to avoid reuse (restore after backtracking)
  - When a Trie node marks end of word, add it to results
  - Prune: remove found words from Trie to avoid duplicate results

Hints:
  - A Trie (prefix tree) lets you search for all words simultaneously
  - Build the Trie from the word list, then DFS from each board cell
  - At each step, check if the current path matches a Trie prefix
  - Mark cells as visited by temporarily changing their value (e.g., to '#')
  - When you find a complete word, add it to results and remove from Trie
  - The 4 directions are up, down, left, right
*/

export const functionName = 'findWords';

export const tests = [
  {
    input: [
      [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]],
      ["oath","pea","eat","rain"]
    ],
    expected: ["eat","oath"]
  },
  {
    input: [
      [["a","b"],["c","d"]],
      ["abcb"]
    ],
    expected: []
  },
  {
    input: [
      [["a"]],
      ["a"]
    ],
    expected: ["a"]
  },
  {
    input: [
      [["a","b"],["c","d"]],
      ["abcd","abdc","acdb","acbd"]
    ],
    expected: ["abdc","acdb"]
  },
  {
    input: [
      [["a","a"]],
      ["aaa"]
    ],
    expected: []
  },
  {
    input: [
      [["a","b","c"],["a","e","d"],["a","f","g"]],
      ["abcdefg","gfedcba","abcdeaa","aefc"]
    ],
    expected: ["abcdeaa","abcdefg","gfedcba"]
  },
  {
    input: [
      [["o","a","b","n"],["o","t","a","e"],["a","h","k","r"],["a","f","l","v"]],
      ["oa","oaa","oath","that","hate"]
    ],
    expected: ["oa","oaa","oath"]
  },
  {
    input: [
      [["x","y"],["z","w"]],
      ["abc","def"]
    ],
    expected: []
  }
];

/**
 * Find all words from the word list that exist on the board.
 * Uses a Trie built from the word list combined with DFS backtracking on the board.
 * @param {character[][]} board - m x n grid of characters
 * @param {string[]} words - List of words to search for
 * @return {string[]} All words found on the board, sorted alphabetically
 */
function findWords(board, words) {
    const rows = board.length;
    const cols = board[0].length;
    const result = [];

    // Build Trie
    const root = {};
    for (const word of words) {
        let node = root;
        for (const ch of word) {
            if (!node[ch]) node[ch] = {};
            node = node[ch];
        }
        node.word = word; // mark end of word
    }

    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    function dfs(r, c, node) {
        const ch = board[r][c];
        if (!node[ch]) return;

        const nextNode = node[ch];

        // Found a complete word
        if (nextNode.word) {
            result.push(nextNode.word);
            nextNode.word = null; // avoid duplicates
        }

        // Mark as visited
        board[r][c] = '#';

        // Explore neighbors
        for (const [dr, dc] of directions) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] !== '#') {
                dfs(nr, nc, nextNode);
            }
        }

        // Restore cell
        board[r][c] = ch;

        // Prune: if this Trie node has no more children, remove it
        if (Object.keys(nextNode).length === 0) {
            delete node[ch];
        }
    }

    // Start DFS from every cell
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            dfs(r, c, root);
        }
    }

    return result.sort();
}

export default findWords;
