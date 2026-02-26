/*
Problem: Project Management Tool
Difficulty: Hard
Category: Real World - Team Collaboration

Build a project management tool with projects, tasks, dependencies, sprints, and team tracking.

Example 1:
  Input: pm.createTask('Build API', { priority: 'high', assignee: 'alice', estimate: 8 })
  Output: { id: 1, title: 'Build API', status: 'todo', priority: 'high', ... }

Example 2:
  Input: pm.addDependency(2, 1) // task 2 depends on task 1
  Output: Dependency created. Task 2 cannot start until task 1 is done.

Requirements:
  - Create projects with name, description, and team members
  - Create tasks with title, description, priority, assignee, estimate (hours)
  - Task statuses: todo, in-progress, blocked, done
  - Add dependencies between tasks (task B depends on task A)
  - Detect circular dependencies
  - Sprint management: create sprints, assign tasks to sprints
  - Get sprint progress (completed vs total story points)
  - Auto-block tasks whose dependencies aren't met
  - Get critical path (longest chain of dependent tasks)
  - Team workload: hours assigned per team member

Time Complexity: O(V + E) for dependency graph operations
Space Complexity: O(V + E) for tasks and dependencies

Hints:
  - Tasks are nodes, dependencies are directed edges
  - Use adjacency list for dependency graph
  - Circular dependency detection: DFS with visited/in-stack tracking
  - Critical path: longest path in DAG using topological sort
  - Sprint velocity: sum of completed task estimates
*/

export const functionName = 'createProjectManager';

export const tests = [
  {
    input: [
      [
        ['createProject', 'Web App', ['alice', 'bob']],
        ['createTask', 1, { title: 'Design UI', priority: 'high', assignee: 'alice', estimate: 8 }],
        ['createTask', 1, { title: 'Build API', priority: 'high', assignee: 'bob', estimate: 16 }],
        ['createTask', 1, { title: 'Write Tests', priority: 'medium', assignee: 'alice', estimate: 6 }],
        ['getProjectTasks', 1]
      ]
    ],
    expected: [
      { id: 1, title: 'Design UI', status: 'todo', priority: 'high', assignee: 'alice', estimate: 8 },
      { id: 2, title: 'Build API', status: 'todo', priority: 'high', assignee: 'bob', estimate: 16 },
      { id: 3, title: 'Write Tests', status: 'todo', priority: 'medium', assignee: 'alice', estimate: 6 }
    ]
  },
  {
    input: [
      [
        ['createProject', 'App', ['alice']],
        ['createTask', 1, { title: 'Task A', priority: 'high', assignee: 'alice', estimate: 4 }],
        ['createTask', 1, { title: 'Task B', priority: 'high', assignee: 'alice', estimate: 8 }],
        ['addDependency', 2, 1],
        ['updateStatus', 2, 'in-progress']
      ]
    ],
    expected: { error: 'Blocked by incomplete dependencies' }
  },
  {
    input: [
      [
        ['createProject', 'App', ['alice']],
        ['createTask', 1, { title: 'Task A', priority: 'high', assignee: 'alice', estimate: 4 }],
        ['createTask', 1, { title: 'Task B', priority: 'high', assignee: 'alice', estimate: 8 }],
        ['createTask', 1, { title: 'Task C', priority: 'high', assignee: 'alice', estimate: 2 }],
        ['addDependency', 2, 1],
        ['addDependency', 3, 2],
        ['addDependency', 1, 3]
      ]
    ],
    expected: { error: 'Circular dependency detected' }
  },
  {
    input: [
      [
        ['createProject', 'App', ['alice', 'bob']],
        ['createTask', 1, { title: 'Design', priority: 'high', assignee: 'alice', estimate: 4 }],
        ['createTask', 1, { title: 'Frontend', priority: 'high', assignee: 'alice', estimate: 8 }],
        ['createTask', 1, { title: 'Backend', priority: 'high', assignee: 'bob', estimate: 12 }],
        ['createTask', 1, { title: 'Testing', priority: 'medium', assignee: 'alice', estimate: 6 }],
        ['addDependency', 2, 1],
        ['addDependency', 3, 1],
        ['addDependency', 4, 2],
        ['addDependency', 4, 3],
        ['getCriticalPath', 1]
      ]
    ],
    expected: [1, 3, 4]
  },
  {
    input: [
      [
        ['createProject', 'App', ['alice', 'bob']],
        ['createTask', 1, { title: 'Task A', priority: 'high', assignee: 'alice', estimate: 8 }],
        ['createTask', 1, { title: 'Task B', priority: 'medium', assignee: 'bob', estimate: 4 }],
        ['createTask', 1, { title: 'Task C', priority: 'low', assignee: 'alice', estimate: 6 }],
        ['createSprint', 1, 'Sprint 1', [1, 2]],
        ['updateStatus', 1, 'done'],
        ['getSprintProgress', 1]
      ]
    ],
    expected: { sprintName: 'Sprint 1', totalPoints: 12, completedPoints: 8, progress: 66.67 }
  },
  {
    input: [
      [
        ['createProject', 'App', ['alice', 'bob']],
        ['createTask', 1, { title: 'Task A', priority: 'high', assignee: 'alice', estimate: 8 }],
        ['createTask', 1, { title: 'Task B', priority: 'medium', assignee: 'bob', estimate: 4 }],
        ['createTask', 1, { title: 'Task C', priority: 'low', assignee: 'alice', estimate: 6 }],
        ['getWorkload', 1]
      ]
    ],
    expected: { alice: 14, bob: 4 }
  },
  {
    input: [
      [
        ['createProject', 'App', ['alice']],
        ['createTask', 1, { title: 'Task A', priority: 'high', assignee: 'alice', estimate: 4 }],
        ['createTask', 1, { title: 'Task B', priority: 'high', assignee: 'alice', estimate: 8 }],
        ['addDependency', 2, 1],
        ['updateStatus', 1, 'done'],
        ['updateStatus', 2, 'in-progress'],
        ['getProjectTasks', 1]
      ]
    ],
    expected: [
      { id: 1, title: 'Task A', status: 'done', priority: 'high', assignee: 'alice', estimate: 4 },
      { id: 2, title: 'Task B', status: 'in-progress', priority: 'high', assignee: 'alice', estimate: 8 }
    ]
  }
];
