/*
Problem: Collaborative Editor
Difficulty: Hard
Category: Real World - Real-Time Collaboration

Build a collaborative document editor that handles concurrent edits, version history, and conflict resolution.

Example 1:
  Input: editor.insert('user1', 0, 'Hello') → editor.insert('user2', 5, ' World')
  Output: document content: 'Hello World'

Example 2:
  Input: editor.getHistory()
  Output: [{ version: 1, author: 'user1', operation: 'insert', ... }, ...]

Requirements:
  - Insert text at a position
  - Delete text at a position with length
  - Replace text at a position
  - Track version history with author and timestamp
  - Undo last operation by a specific user
  - Get document content at any version
  - Get diff between two versions
  - Track cursor positions per user
  - Handle concurrent edits (adjust positions when earlier inserts/deletes shift text)

Time Complexity: O(n) for insert/delete where n is document length, O(v) for history
Space Complexity: O(n + v) for document content and version history

Hints:
  - Store document as a string or array of characters
  - Each operation: { type, position, text/length, author, version }
  - For operational transform: when applying an operation, adjust position based on prior operations
  - Version history is an array of operations that can be replayed
  - Diff: compare two version strings character by character
*/

export const functionName = 'createCollaborativeEditor';

export const tests = [
  {
    input: [
      [
        ['insert', 'user1', 0, 'Hello'],
        ['getContent']
      ]
    ],
    expected: 'Hello'
  },
  {
    input: [
      [
        ['insert', 'user1', 0, 'Hello'],
        ['insert', 'user2', 5, ' World'],
        ['getContent']
      ]
    ],
    expected: 'Hello World'
  },
  {
    input: [
      [
        ['insert', 'user1', 0, 'Hello World'],
        ['delete', 'user1', 5, 6],
        ['getContent']
      ]
    ],
    expected: 'Hello'
  },
  {
    input: [
      [
        ['insert', 'user1', 0, 'Hello World'],
        ['replace', 'user1', 6, 5, 'JavaScript'],
        ['getContent']
      ]
    ],
    expected: 'Hello JavaScript'
  },
  {
    input: [
      [
        ['insert', 'user1', 0, 'Hello'],
        ['insert', 'user2', 5, ' World'],
        ['getHistory']
      ]
    ],
    expected: [
      { version: 1, author: 'user1', type: 'insert', position: 0, text: 'Hello' },
      { version: 2, author: 'user2', type: 'insert', position: 5, text: ' World' }
    ]
  },
  {
    input: [
      [
        ['insert', 'user1', 0, 'Hello'],
        ['insert', 'user1', 5, ' World'],
        ['undo', 'user1'],
        ['getContent']
      ]
    ],
    expected: 'Hello'
  },
  {
    input: [
      [
        ['insert', 'user1', 0, 'Hello'],
        ['insert', 'user2', 5, ' World'],
        ['insert', 'user1', 0, 'Say: '],
        ['getContentAtVersion', 2]
      ]
    ],
    expected: 'Hello World'
  },
  {
    input: [
      [
        ['insert', 'user1', 0, 'ABCDEF'],
        ['delete', 'user1', 2, 2],
        ['getDiff', 1, 2]
      ]
    ],
    expected: { removed: 'CD', addedAt: null, from: 'ABCDEF', to: 'ABEF' }
  },
  {
    input: [
      [
        ['insert', 'user1', 0, 'ABC'],
        ['setCursor', 'user1', 3],
        ['setCursor', 'user2', 1],
        ['getCursors']
      ]
    ],
    expected: { user1: 3, user2: 1 }
  }
];
