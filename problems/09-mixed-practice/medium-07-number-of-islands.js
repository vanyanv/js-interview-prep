/*
Problem: Number of Islands
Difficulty: Medium
Category: DFS, BFS, Matrix, Graph, Union Find
LeetCode: #200
Pattern: Graph Traversal + Connected Components + Matrix Navigation
Mixed Patterns: DFS/BFS + 2D Array + Flood Fill + Union Find

Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water),
return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands
horizontally or vertically. You may assume all four edges of the grid are surrounded by water.

Example 1:
  Input: grid = [
    ["1","1","1","1","0"],
    ["1","1","0","1","0"],
    ["1","1","0","0","0"],
    ["0","0","0","0","0"]
  ]
  Output: 1

Example 2:
  Input: grid = [
    ["1","1","0","0","0"],
    ["1","1","0","0","0"],
    ["0","0","1","0","0"],
    ["0","0","0","1","1"]
  ]
  Output: 3

Constraints:
  - m == grid.length
  - n == grid[i].length
  - 1 <= m, n <= 300
  - grid[i][j] is '0' or '1'

Time Complexity: O(m × n) where m and n are grid dimensions
Space Complexity: O(m × n) in worst case for recursion stack

Pattern Notes:
  - Multiple approaches: DFS (recursive/iterative), BFS, Union Find
  - DFS: Mark visited cells as '0' or use separate visited array
  - BFS: Use queue to explore connected components level by level
  - Union Find: Connect adjacent land cells, count unique parents
  - Each island is a connected component of '1' cells

Interview Notes:
  - Follow-up: Maximum island size
  - Follow-up: Number of islands after adding land
  - Follow-up: Count islands of different shapes
  - Optimization: Early termination, space optimization
*/

export const functionName = 'numIslands';

export const tests = [
  {
    input: [[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]],
    expected: 1
  },
  {
    input: [[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]],
    expected: 3
  },
  {
    input: [[["1"]]],
    expected: 1
  },
  {
    input: [[["0"]]],
    expected: 0
  },
  {
    input: [[["1","0","1"],["0","1","0"],["1","0","1"]]],
    expected: 5
  },
  {
    input: [[["1","1","1"],["0","1","0"],["1","1","1"]]],
    expected: 1
  }
];

/**
 * Counts number of islands using DFS
 * @param {string[][]} grid - 2D grid of '0' and '1'
 * @return {number} Number of islands
 */
function numIslands(grid) {
    if (!grid || grid.length === 0 || grid[0].length === 0) {
        return 0;
    }

    const m = grid.length;
    const n = grid[0].length;
    let islands = 0;

    function dfs(row, col) {
        // Base case: out of bounds or water
        if (row < 0 || row >= m || col < 0 || col >= n || grid[row][col] === '0') {
            return;
        }

        // Mark current cell as visited by setting to '0'
        grid[row][col] = '0';

        // Explore all 4 directions
        dfs(row + 1, col); // down
        dfs(row - 1, col); // up
        dfs(row, col + 1); // right
        dfs(row, col - 1); // left
    }

    // Scan entire grid
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1') {
                islands++;
                dfs(i, j); // Mark entire island as visited
            }
        }
    }

    return islands;
}

/**
 * Alternative: BFS approach
 * @param {string[][]} grid - 2D grid of '0' and '1'
 * @return {number} Number of islands
 */
function numIslandsBFS(grid) {
    if (!grid || grid.length === 0) return 0;

    const m = grid.length;
    const n = grid[0].length;
    let islands = 0;

    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1') {
                islands++;

                // BFS to mark entire island
                const queue = [[i, j]];
                grid[i][j] = '0';

                while (queue.length > 0) {
                    const [row, col] = queue.shift();

                    for (const [dr, dc] of directions) {
                        const newRow = row + dr;
                        const newCol = col + dc;

                        if (newRow >= 0 && newRow < m && newCol >= 0 && newCol < n &&
                            grid[newRow][newCol] === '1') {
                            grid[newRow][newCol] = '0';
                            queue.push([newRow, newCol]);
                        }
                    }
                }
            }
        }
    }

    return islands;
}

/**
 * Alternative: Union Find approach
 * @param {string[][]} grid - 2D grid of '0' and '1'
 * @return {number} Number of islands
 */
function numIslandsUnionFind(grid) {
    if (!grid || grid.length === 0) return 0;

    const m = grid.length;
    const n = grid[0].length;

    class UnionFind {
        constructor(size) {
            this.parent = Array(size).fill().map((_, i) => i);
            this.rank = Array(size).fill(0);
            this.count = 0;
        }

        find(x) {
            if (this.parent[x] !== x) {
                this.parent[x] = this.find(this.parent[x]); // Path compression
            }
            return this.parent[x];
        }

        union(x, y) {
            const rootX = this.find(x);
            const rootY = this.find(y);

            if (rootX !== rootY) {
                // Union by rank
                if (this.rank[rootX] < this.rank[rootY]) {
                    this.parent[rootX] = rootY;
                } else if (this.rank[rootX] > this.rank[rootY]) {
                    this.parent[rootY] = rootX;
                } else {
                    this.parent[rootY] = rootX;
                    this.rank[rootX]++;
                }
                this.count--;
            }
        }

        addLand() {
            this.count++;
        }
    }

    const uf = new UnionFind(m * n);

    // Add all land cells and connect adjacent ones
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1') {
                uf.addLand();

                // Check right neighbor
                if (j + 1 < n && grid[i][j + 1] === '1') {
                    uf.union(i * n + j, i * n + (j + 1));
                }

                // Check bottom neighbor
                if (i + 1 < m && grid[i + 1][j] === '1') {
                    uf.union(i * n + j, (i + 1) * n + j);
                }
            }
        }
    }

    return uf.count;
}

/**
 * Alternative: DFS without modifying input
 * @param {string[][]} grid - 2D grid of '0' and '1'
 * @return {number} Number of islands
 */
function numIslandsPreserveInput(grid) {
    if (!grid || grid.length === 0) return 0;

    const m = grid.length;
    const n = grid[0].length;
    const visited = Array(m).fill().map(() => Array(n).fill(false));
    let islands = 0;

    function dfs(row, col) {
        if (row < 0 || row >= m || col < 0 || col >= n ||
            grid[row][col] === '0' || visited[row][col]) {
            return;
        }

        visited[row][col] = true;

        dfs(row + 1, col);
        dfs(row - 1, col);
        dfs(row, col + 1);
        dfs(row, col - 1);
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1' && !visited[i][j]) {
                islands++;
                dfs(i, j);
            }
        }
    }

    return islands;
}

/**
 * Extended: Find maximum island size
 * @param {string[][]} grid - 2D grid of '0' and '1'
 * @return {number} Size of largest island
 */
function maxIslandSize(grid) {
    if (!grid || grid.length === 0) return 0;

    const m = grid.length;
    const n = grid[0].length;
    let maxSize = 0;

    function dfs(row, col) {
        if (row < 0 || row >= m || col < 0 || col >= n || grid[row][col] === '0') {
            return 0;
        }

        grid[row][col] = '0'; // Mark as visited
        return 1 + dfs(row + 1, col) + dfs(row - 1, col) +
                   dfs(row, col + 1) + dfs(row, col - 1);
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1') {
                const size = dfs(i, j);
                maxSize = Math.max(maxSize, size);
            }
        }
    }

    return maxSize;
}

/**
 * Extended: Get all island information
 * @param {string[][]} grid - 2D grid of '0' and '1'
 * @return {Object[]} Array of island objects with coordinates and size
 */
function getIslandInfo(grid) {
    if (!grid || grid.length === 0) return [];

    const m = grid.length;
    const n = grid[0].length;
    const islands = [];

    function dfs(row, col, island) {
        if (row < 0 || row >= m || col < 0 || col >= n || grid[row][col] === '0') {
            return;
        }

        grid[row][col] = '0';
        island.cells.push([row, col]);
        island.size++;

        dfs(row + 1, col, island);
        dfs(row - 1, col, island);
        dfs(row, col + 1, island);
        dfs(row, col - 1, island);
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1') {
                const island = {
                    id: islands.length,
                    size: 0,
                    cells: [],
                    startCell: [i, j]
                };
                dfs(i, j, island);
                islands.push(island);
            }
        }
    }

    return islands.sort((a, b) => b.size - a.size);
}

export default numIslands;