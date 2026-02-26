/*
Problem: Calendar Scheduler
Difficulty: Medium
Category: Real World - Scheduling

Build a calendar scheduler that manages events, detects conflicts, and supports recurring events.

Example 1:
  Input: scheduler.addEvent({ title: 'Meeting', start: '2024-01-15 09:00', end: '2024-01-15 10:00' })
  Output: { id: 1, title: 'Meeting', start: '2024-01-15 09:00', end: '2024-01-15 10:00' }

Example 2:
  Input: scheduler.getConflicts('2024-01-15 09:30', '2024-01-15 10:30')
  Output: [{ id: 1, title: 'Meeting', ... }] // overlapping events

Requirements:
  - Add events with title, start time, end time, and optional description
  - Detect time conflicts when adding events
  - Get events for a specific date
  - Get events for a date range
  - Remove events
  - Support recurring events (daily, weekly, monthly)
  - Get free time slots for a given date
  - Validate that end time is after start time

Time Complexity: O(n) for conflict detection
Space Complexity: O(n) for events

Hints:
  - Store times as strings in ISO-like format for easy comparison
  - Two events conflict if one starts before the other ends and vice versa
  - For recurring events, generate instances within the queried date range
  - Free slots are gaps between events on a given day
*/

export const functionName = 'createScheduler';

export const tests = [
  {
    input: [
      [
        ['addEvent', { title: 'Meeting', start: '2024-01-15 09:00', end: '2024-01-15 10:00' }],
        ['addEvent', { title: 'Lunch', start: '2024-01-15 12:00', end: '2024-01-15 13:00' }],
        ['getEventsForDate', '2024-01-15']
      ]
    ],
    expected: [
      { id: 1, title: 'Meeting', start: '2024-01-15 09:00', end: '2024-01-15 10:00' },
      { id: 2, title: 'Lunch', start: '2024-01-15 12:00', end: '2024-01-15 13:00' }
    ]
  },
  {
    input: [
      [
        ['addEvent', { title: 'Meeting', start: '2024-01-15 09:00', end: '2024-01-15 10:00' }],
        ['getConflicts', '2024-01-15 09:30', '2024-01-15 10:30']
      ]
    ],
    expected: [
      { id: 1, title: 'Meeting', start: '2024-01-15 09:00', end: '2024-01-15 10:00' }
    ]
  },
  {
    input: [
      [
        ['addEvent', { title: 'Morning', start: '2024-01-15 09:00', end: '2024-01-15 10:00' }],
        ['addEvent', { title: 'Afternoon', start: '2024-01-15 14:00', end: '2024-01-15 15:00' }],
        ['getConflicts', '2024-01-15 10:00', '2024-01-15 14:00']
      ]
    ],
    expected: []
  },
  {
    input: [
      [
        ['addEvent', { title: 'Bad Event', start: '2024-01-15 10:00', end: '2024-01-15 09:00' }]
      ]
    ],
    expected: { error: 'End time must be after start time' }
  },
  {
    input: [
      [
        ['addEvent', { title: 'Jan Event', start: '2024-01-10 09:00', end: '2024-01-10 10:00' }],
        ['addEvent', { title: 'Jan Event 2', start: '2024-01-20 09:00', end: '2024-01-20 10:00' }],
        ['addEvent', { title: 'Feb Event', start: '2024-02-05 09:00', end: '2024-02-05 10:00' }],
        ['getEventsInRange', '2024-01-01', '2024-01-31']
      ]
    ],
    expected: [
      { id: 1, title: 'Jan Event', start: '2024-01-10 09:00', end: '2024-01-10 10:00' },
      { id: 2, title: 'Jan Event 2', start: '2024-01-20 09:00', end: '2024-01-20 10:00' }
    ]
  },
  {
    input: [
      [
        ['addEvent', { title: 'Meeting', start: '2024-01-15 09:00', end: '2024-01-15 10:00' }],
        ['removeEvent', 1],
        ['getEventsForDate', '2024-01-15']
      ]
    ],
    expected: []
  },
  {
    input: [
      [
        ['addEvent', { title: 'Morning', start: '2024-01-15 09:00', end: '2024-01-15 10:00' }],
        ['addEvent', { title: 'Afternoon', start: '2024-01-15 14:00', end: '2024-01-15 16:00' }],
        ['getFreeSlots', '2024-01-15', '08:00', '18:00']
      ]
    ],
    expected: [
      { start: '08:00', end: '09:00' },
      { start: '10:00', end: '14:00' },
      { start: '16:00', end: '18:00' }
    ]
  }
];
