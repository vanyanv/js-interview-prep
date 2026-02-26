/*
Problem: File Manager
Difficulty: Medium
Category: Real World - File System Operations

Build a virtual file manager with a tree structure supporting CRUD operations and navigation.

Example 1:
  Input: fm.mkdir('/documents') → fm.createFile('/documents/readme.txt', 'Hello')
  Output: File created at /documents/readme.txt

Example 2:
  Input: fm.ls('/documents')
  Output: [{ name: 'readme.txt', type: 'file', size: 5 }]

Requirements:
  - Create directories (mkdir) with nested path support
  - Create files with content
  - Read file content
  - Delete files and directories (directories must be empty or use recursive delete)
  - List directory contents
  - Move files/directories to new locations
  - Search for files by name pattern (case-insensitive)
  - Get file/directory size (directories sum their contents)
  - Handle errors: path not found, already exists, not empty

Time Complexity: O(d) for path traversal where d is depth, O(n) for search
Space Complexity: O(n) for all files and directories

Hints:
  - Use a tree structure with nodes for files and directories
  - Each node: { name, type: 'file'|'dir', children: Map, content?, size }
  - Split paths by '/' to traverse the tree
  - Recursive delete traverses all children
*/

export const functionName = 'createFileManager';

export const tests = [
  {
    input: [
      [
        ['mkdir', '/documents'],
        ['mkdir', '/photos'],
        ['ls', '/']
      ]
    ],
    expected: [
      { name: 'documents', type: 'dir' },
      { name: 'photos', type: 'dir' }
    ]
  },
  {
    input: [
      [
        ['mkdir', '/docs'],
        ['createFile', '/docs/readme.txt', 'Hello World'],
        ['createFile', '/docs/notes.txt', 'My notes'],
        ['ls', '/docs']
      ]
    ],
    expected: [
      { name: 'notes.txt', type: 'file', size: 8 },
      { name: 'readme.txt', type: 'file', size: 11 }
    ]
  },
  {
    input: [
      [
        ['mkdir', '/docs'],
        ['createFile', '/docs/readme.txt', 'Hello'],
        ['readFile', '/docs/readme.txt']
      ]
    ],
    expected: 'Hello'
  },
  {
    input: [
      [
        ['mkdir', '/src'],
        ['createFile', '/src/index.js', 'console.log("hi")'],
        ['move', '/src/index.js', '/src/app.js'],
        ['ls', '/src']
      ]
    ],
    expected: [
      { name: 'app.js', type: 'file', size: 18 }
    ]
  },
  {
    input: [
      [
        ['mkdir', '/docs'],
        ['createFile', '/docs/file.txt', 'content'],
        ['delete', '/docs']
      ]
    ],
    expected: { error: 'Directory is not empty' }
  },
  {
    input: [
      [
        ['readFile', '/nonexistent.txt']
      ]
    ],
    expected: { error: 'Path not found' }
  },
  {
    input: [
      [
        ['mkdir', '/src'],
        ['mkdir', '/docs'],
        ['createFile', '/src/app.js', 'code'],
        ['createFile', '/src/app.test.js', 'test'],
        ['createFile', '/docs/app-guide.md', 'guide'],
        ['search', 'app']
      ]
    ],
    expected: ['/src/app.js', '/src/app.test.js', '/docs/app-guide.md']
  },
  {
    input: [
      [
        ['mkdir', '/project'],
        ['createFile', '/project/a.txt', 'aaa'],
        ['createFile', '/project/b.txt', 'bbbbbb'],
        ['getSize', '/project']
      ]
    ],
    expected: 9
  }
];
