/*
Problem: Analytics Dashboard
Difficulty: Medium
Category: Real World - Data Analysis

Build an analytics engine that processes event data, aggregates metrics, and supports filtering.

Example 1:
  Input: analytics.track('page_view', { page: '/home', userId: 'u1' })
  Output: Event recorded

Example 2:
  Input: analytics.query({ event: 'page_view', groupBy: 'page' })
  Output: { '/home': 5, '/about': 3, '/contact': 1 }

Requirements:
  - Track events with name, properties, and timestamp
  - Query events with filters (event name, date range, property values)
  - Group by a property and count occurrences
  - Calculate metrics: count, unique users, average of numeric property
  - Get top N values for a property
  - Get time-series data (events per day/hour)
  - Support multiple aggregation functions

Time Complexity: O(n) for queries where n is total events
Space Complexity: O(n) for event storage

Hints:
  - Store events in an array with timestamps
  - Use reduce for aggregation
  - Filter first, then aggregate
  - For time-series, group by date string truncated to desired granularity
*/

export const functionName = 'createAnalytics';

const sampleEvents = [
  { event: 'page_view', props: { page: '/home', userId: 'u1' }, timestamp: '2024-01-15 10:00' },
  { event: 'page_view', props: { page: '/home', userId: 'u2' }, timestamp: '2024-01-15 11:00' },
  { event: 'page_view', props: { page: '/about', userId: 'u1' }, timestamp: '2024-01-15 12:00' },
  { event: 'click', props: { element: 'buy-btn', userId: 'u1' }, timestamp: '2024-01-15 12:05' },
  { event: 'page_view', props: { page: '/home', userId: 'u3' }, timestamp: '2024-01-16 09:00' },
  { event: 'purchase', props: { amount: 99, userId: 'u1' }, timestamp: '2024-01-16 10:00' },
  { event: 'purchase', props: { amount: 149, userId: 'u2' }, timestamp: '2024-01-16 11:00' },
  { event: 'page_view', props: { page: '/about', userId: 'u2' }, timestamp: '2024-01-16 14:00' }
];

export const tests = [
  {
    input: [
      sampleEvents,
      [
        ['count', { event: 'page_view' }]
      ]
    ],
    expected: 5
  },
  {
    input: [
      sampleEvents,
      [
        ['groupBy', { event: 'page_view', property: 'page' }]
      ]
    ],
    expected: { '/home': 3, '/about': 2 }
  },
  {
    input: [
      sampleEvents,
      [
        ['uniqueUsers', { event: 'page_view' }]
      ]
    ],
    expected: 3
  },
  {
    input: [
      sampleEvents,
      [
        ['average', { event: 'purchase', property: 'amount' }]
      ]
    ],
    expected: 124
  },
  {
    input: [
      sampleEvents,
      [
        ['count', { event: 'page_view', dateRange: ['2024-01-15', '2024-01-15'] }]
      ]
    ],
    expected: 3
  },
  {
    input: [
      sampleEvents,
      [
        ['topN', { event: 'page_view', property: 'page', n: 1 }]
      ]
    ],
    expected: [{ value: '/home', count: 3 }]
  },
  {
    input: [
      sampleEvents,
      [
        ['timeSeries', { event: 'page_view', granularity: 'day' }]
      ]
    ],
    expected: { '2024-01-15': 3, '2024-01-16': 2 }
  },
  {
    input: [
      [],
      [
        ['track', { event: 'click', props: { element: 'btn', userId: 'u1' }, timestamp: '2024-01-20 10:00' }],
        ['track', { event: 'click', props: { element: 'btn', userId: 'u2' }, timestamp: '2024-01-20 11:00' }],
        ['count', { event: 'click' }]
      ]
    ],
    expected: 2
  }
];
