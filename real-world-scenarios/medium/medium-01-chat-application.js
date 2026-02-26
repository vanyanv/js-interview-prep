/*
Problem: Chat Application
Difficulty: Medium
Category: Real World - Real-Time Communication

Build a chat application that supports rooms, users, and messaging.

Example 1:
  Input: app.createRoom('general') → app.joinRoom('general', 'Alice')
  Output: Room created, Alice joins

Example 2:
  Input: app.sendMessage('general', 'Alice', 'Hello everyone!')
  Output: { id: 1, room: 'general', sender: 'Alice', text: 'Hello everyone!', timestamp: Date }

Requirements:
  - Create and delete chat rooms
  - Users can join and leave rooms
  - Send messages to rooms (only if user is in room)
  - Get message history for a room
  - Get list of users in a room
  - Support direct messages between users
  - Get unread message count per room per user
  - Prevent duplicate room names and duplicate joins

Time Complexity: O(1) for send/join, O(n) for history retrieval
Space Complexity: O(r * m) where r is rooms and m is messages

Hints:
  - Use Map for rooms with room name as key
  - Each room stores members (Set) and messages (Array)
  - Track last-read message index per user per room for unread counts
  - Direct messages can be a special room between two users
*/

export const functionName = 'createChatApp';

export const tests = [
  {
    input: [
      [
        ['createRoom', 'general'],
        ['createRoom', 'random'],
        ['getRooms']
      ]
    ],
    expected: ['general', 'random']
  },
  {
    input: [
      [
        ['createRoom', 'general'],
        ['joinRoom', 'general', 'Alice'],
        ['joinRoom', 'general', 'Bob'],
        ['getUsers', 'general']
      ]
    ],
    expected: ['Alice', 'Bob']
  },
  {
    input: [
      [
        ['createRoom', 'general'],
        ['joinRoom', 'general', 'Alice'],
        ['sendMessage', 'general', 'Alice', 'Hello!'],
        ['sendMessage', 'general', 'Alice', 'How is everyone?'],
        ['getMessages', 'general']
      ]
    ],
    expected: [
      { id: 1, room: 'general', sender: 'Alice', text: 'Hello!' },
      { id: 2, room: 'general', sender: 'Alice', text: 'How is everyone?' }
    ]
  },
  {
    input: [
      [
        ['createRoom', 'general'],
        ['sendMessage', 'general', 'Alice', 'Hello!']
      ]
    ],
    expected: { error: 'User not in room' }
  },
  {
    input: [
      [
        ['createRoom', 'general'],
        ['joinRoom', 'general', 'Alice'],
        ['joinRoom', 'general', 'Bob'],
        ['sendMessage', 'general', 'Alice', 'Hi Bob!'],
        ['sendMessage', 'general', 'Bob', 'Hi Alice!'],
        ['leaveRoom', 'general', 'Alice'],
        ['getUsers', 'general']
      ]
    ],
    expected: ['Bob']
  },
  {
    input: [
      [
        ['createRoom', 'general'],
        ['createRoom', 'general']
      ]
    ],
    expected: { error: 'Room already exists' }
  },
  {
    input: [
      [
        ['createRoom', 'dev'],
        ['joinRoom', 'dev', 'Alice'],
        ['sendMessage', 'dev', 'Alice', 'msg1'],
        ['sendMessage', 'dev', 'Alice', 'msg2'],
        ['sendMessage', 'dev', 'Alice', 'msg3'],
        ['joinRoom', 'dev', 'Bob'],
        ['getUnreadCount', 'dev', 'Bob']
      ]
    ],
    expected: 3
  }
];
