/*
Problem: Course Schedule
Difficulty: Medium
Category: Graph, DFS, BFS, Topological Sort
LeetCode: #207
Pattern: Topological Sort + Cycle Detection + Graph Traversal
Mixed Patterns: DFS/BFS + Graph Building + Cycle Detection + Topological Ordering

There are a total of numCourses courses you have to take, labeled from 0 to
numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi]
indicates that you must take course bi first if you want to take course ai.

Return true if you can finish all courses. Otherwise, return false.

Example 1:
  Input: numCourses = 2, prerequisites = [[1,0]]
  Output: true
  Explanation: Take course 0, then course 1.

Example 2:
  Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
  Output: false
  Explanation: Circular dependency - impossible to complete.

Example 3:
  Input: numCourses = 3, prerequisites = [[1,0],[2,1]]
  Output: true
  Explanation: Take course 0, then 1, then 2.

Constraints:
  - 1 <= numCourses <= 2000
  - 0 <= prerequisites.length <= 5000
  - prerequisites[i].length == 2
  - 0 <= ai, bi < numCourses
  - All pairs are unique

Time Complexity: O(V + E) where V = courses, E = prerequisites
Space Complexity: O(V + E) for adjacency list and auxiliary data structures

Pattern Notes:
  - Model as directed graph: courses are nodes, prerequisites are edges
  - Problem reduces to cycle detection in directed graph
  - Multiple approaches: DFS with recursion stack, BFS with in-degree (Kahn's)
  - DFS: Use three states (unvisited, visiting, visited) to detect cycles
  - BFS: Remove nodes with in-degree 0, update neighbors

Interview Notes:
  - Follow-up: Return actual course order (Course Schedule II)
  - Follow-up: Find minimum semesters needed
  - Follow-up: Handle course credits and prerequisites
  - Common mistake: Not handling self-loops or duplicate edges
*/

export const functionName = 'canFinish';

export const tests = [
  {
    input: [2, [[1,0]]],
    expected: true
  },
  {
    input: [2, [[1,0],[0,1]]],
    expected: false
  },
  {
    input: [3, [[1,0],[2,1]]],
    expected: true
  },
  {
    input: [4, [[1,0],[2,1],[3,2]]],
    expected: true
  },
  {
    input: [4, [[1,0],[2,1],[3,2],[0,3]]],
    expected: false
  },
  {
    input: [1, []],
    expected: true
  },
  {
    input: [5, [[1,4],[2,4],[3,1],[3,2]]],
    expected: true
  }
];

/**
 * Determines if all courses can be finished using DFS cycle detection
 * @param {number} numCourses - Total number of courses
 * @param {number[][]} prerequisites - Array of prerequisite pairs [course, prereq]
 * @return {boolean} True if all courses can be finished
 */
function canFinish(numCourses, prerequisites) {
    // Build adjacency list
    const graph = Array(numCourses).fill().map(() => []);
    for (const [course, prereq] of prerequisites) {
        graph[prereq].push(course);
    }

    // States: 0 = unvisited, 1 = visiting, 2 = visited
    const state = new Array(numCourses).fill(0);

    // DFS to detect cycle
    function hasCycle(course) {
        if (state[course] === 1) return true;  // Back edge - cycle found
        if (state[course] === 2) return false; // Already processed

        state[course] = 1; // Mark as visiting

        // Check all neighbors
        for (const neighbor of graph[course]) {
            if (hasCycle(neighbor)) return true;
        }

        state[course] = 2; // Mark as visited
        return false;
    }

    // Check each course for cycles
    for (let i = 0; i < numCourses; i++) {
        if (state[i] === 0 && hasCycle(i)) {
            return false;
        }
    }

    return true;
}

/**
 * Alternative: BFS approach using Kahn's algorithm (topological sort)
 * @param {number} numCourses - Total number of courses
 * @param {number[][]} prerequisites - Array of prerequisite pairs
 * @return {boolean} True if all courses can be finished
 */
function canFinishBFS(numCourses, prerequisites) {
    // Build graph and calculate in-degrees
    const graph = Array(numCourses).fill().map(() => []);
    const inDegree = new Array(numCourses).fill(0);

    for (const [course, prereq] of prerequisites) {
        graph[prereq].push(course);
        inDegree[course]++;
    }

    // Queue with courses having no prerequisites
    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) {
            queue.push(i);
        }
    }

    let completed = 0;

    while (queue.length > 0) {
        const course = queue.shift();
        completed++;

        // Process all courses that depend on current course
        for (const dependent of graph[course]) {
            inDegree[dependent]--;
            if (inDegree[dependent] === 0) {
                queue.push(dependent);
            }
        }
    }

    return completed === numCourses;
}

/**
 * Extended: Return actual course order (Course Schedule II)
 * @param {number} numCourses - Total number of courses
 * @param {number[][]} prerequisites - Array of prerequisite pairs
 * @return {number[]} Course order, empty array if impossible
 */
function findOrder(numCourses, prerequisites) {
    const graph = Array(numCourses).fill().map(() => []);
    const inDegree = new Array(numCourses).fill(0);

    for (const [course, prereq] of prerequisites) {
        graph[prereq].push(course);
        inDegree[course]++;
    }

    const queue = [];
    const result = [];

    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) {
            queue.push(i);
        }
    }

    while (queue.length > 0) {
        const course = queue.shift();
        result.push(course);

        for (const dependent of graph[course]) {
            inDegree[dependent]--;
            if (inDegree[dependent] === 0) {
                queue.push(dependent);
            }
        }
    }

    return result.length === numCourses ? result : [];
}

/**
 * Extended: Find minimum semesters needed
 * @param {number} numCourses - Total number of courses
 * @param {number[][]} prerequisites - Array of prerequisite pairs
 * @return {number} Minimum semesters, -1 if impossible
 */
function minimumSemesters(numCourses, prerequisites) {
    const graph = Array(numCourses).fill().map(() => []);
    const inDegree = new Array(numCourses).fill(0);

    for (const [course, prereq] of prerequisites) {
        graph[prereq].push(course);
        inDegree[course]++;
    }

    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) {
            queue.push(i);
        }
    }

    let semesters = 0;
    let completed = 0;

    while (queue.length > 0) {
        const currentLevel = queue.length;
        semesters++;

        // Process all courses in current semester
        for (let i = 0; i < currentLevel; i++) {
            const course = queue.shift();
            completed++;

            for (const dependent of graph[course]) {
                inDegree[dependent]--;
                if (inDegree[dependent] === 0) {
                    queue.push(dependent);
                }
            }
        }
    }

    return completed === numCourses ? semesters : -1;
}

/**
 * Extended: Course scheduling with credits
 * @param {number} numCourses - Total number of courses
 * @param {number[][]} prerequisites - Array of prerequisite pairs
 * @param {number[]} credits - Credits for each course
 * @param {number} maxCreditsPerSemester - Maximum credits per semester
 * @return {number[][]} Course schedule by semester
 */
function scheduleCoursesWithCredits(numCourses, prerequisites, credits, maxCreditsPerSemester) {
    const graph = Array(numCourses).fill().map(() => []);
    const inDegree = new Array(numCourses).fill(0);

    for (const [course, prereq] of prerequisites) {
        graph[prereq].push(course);
        inDegree[course]++;
    }

    const available = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) {
            available.push(i);
        }
    }

    const schedule = [];

    while (available.length > 0) {
        const semester = [];
        let semesterCredits = 0;
        const nextAvailable = [];

        // Sort by credits (take lighter courses first if needed)
        available.sort((a, b) => credits[a] - credits[b]);

        for (const course of available) {
            if (semesterCredits + credits[course] <= maxCreditsPerSemester) {
                semester.push(course);
                semesterCredits += credits[course];

                // Update dependencies
                for (const dependent of graph[course]) {
                    inDegree[dependent]--;
                    if (inDegree[dependent] === 0) {
                        nextAvailable.push(dependent);
                    }
                }
            } else {
                nextAvailable.push(course);
            }
        }

        if (semester.length === 0 && available.length > 0) {
            // Cannot fit any more courses
            return null;
        }

        if (semester.length > 0) {
            schedule.push(semester);
        }

        available.splice(0, available.length, ...nextAvailable);
    }

    return schedule;
}

export default canFinish;