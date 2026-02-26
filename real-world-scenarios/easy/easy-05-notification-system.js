/*
Problem: Notification System
Difficulty: Easy
Category: Real World - Event-Driven Architecture

Create a notification system with subscribe/publish pattern and notification management.

Example 1:
  Input: system.subscribe('info', callback) → system.notify('info', 'Server started')
  Output: callback is called with { type: 'info', message: 'Server started', ... }

Example 2:
  Input: system.getAll()
  Output: [{ id: 1, type: 'info', message: 'Server started', read: false, timestamp: Date }]

Requirements:
  - Subscribe to notification types (info, warning, error, success)
  - Publish notifications to subscribers
  - Store notification history
  - Mark notifications as read
  - Get unread count
  - Clear all notifications
  - Unsubscribe from notification types

Time Complexity: O(k) per notify where k is subscribers for that type
Space Complexity: O(n) where n is total notifications stored

Hints:
  - Use a Map or object to store subscribers per type
  - Each notification gets a unique ID
  - Subscribers are callback functions
  - Consider returning unsubscribe function from subscribe
*/

export const functionName = 'createNotificationSystem';

export const tests = [
  {
    input: [[]],
    expected: { notifications: [], unreadCount: 0 }
  },
  {
    input: [
      [
        ['notify', 'info', 'Server started'],
        ['notify', 'error', 'Connection failed'],
        ['getAll']
      ]
    ],
    expected: {
      notifications: [
        { id: 1, type: 'info', message: 'Server started', read: false },
        { id: 2, type: 'error', message: 'Connection failed', read: false }
      ],
      unreadCount: 2
    }
  },
  {
    input: [
      [
        ['notify', 'info', 'Hello'],
        ['markAsRead', 1],
        ['getAll']
      ]
    ],
    expected: {
      notifications: [
        { id: 1, type: 'info', message: 'Hello', read: true }
      ],
      unreadCount: 0
    }
  },
  {
    input: [
      [
        ['notify', 'info', 'First'],
        ['notify', 'warning', 'Second'],
        ['notify', 'error', 'Third'],
        ['getByType', 'error']
      ]
    ],
    expected: {
      notifications: [
        { id: 3, type: 'error', message: 'Third', read: false }
      ],
      unreadCount: 3
    }
  },
  {
    input: [
      [
        ['notify', 'info', 'First'],
        ['notify', 'info', 'Second'],
        ['clear'],
        ['getAll']
      ]
    ],
    expected: {
      notifications: [],
      unreadCount: 0
    }
  },
  {
    input: [
      [
        ['notify', 'success', 'Saved'],
        ['notify', 'info', 'Updated'],
        ['markAsRead', 1],
        ['getUnread']
      ]
    ],
    expected: {
      notifications: [
        { id: 2, type: 'info', message: 'Updated', read: false }
      ],
      unreadCount: 1
    }
  }
];
