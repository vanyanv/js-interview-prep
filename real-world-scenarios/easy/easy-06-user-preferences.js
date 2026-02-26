/*
Problem: User Preferences Manager
Difficulty: Easy
Category: Real World - Settings Management

Create a preferences manager that handles user settings with defaults, overrides, and persistence.

Example 1:
  Input: prefs.get('theme')
  Output: 'light' (default value)

Example 2:
  Input: prefs.set('theme', 'dark') → prefs.get('theme')
  Output: 'dark'

Requirements:
  - Initialize with default preferences
  - Get individual preference values
  - Set individual preferences
  - Reset individual preference to default
  - Reset all preferences to defaults
  - Get all current preferences (merged defaults + overrides)
  - Validate preference values against allowed options

Time Complexity: O(1) for get/set, O(n) for getAll/resetAll
Space Complexity: O(n) where n is number of preferences

Hints:
  - Keep defaults and user overrides separate
  - Merge overrides on top of defaults when reading
  - Use a schema to define allowed values per preference
  - Spread operator is useful for merging objects
*/

export const functionName = 'createPreferencesManager';

const defaultPrefs = {
  theme: 'light',
  fontSize: 16,
  language: 'en',
  notifications: true,
  autoSave: true
};

export const tests = [
  {
    input: [defaultPrefs, []],
    expected: {
      theme: 'light',
      fontSize: 16,
      language: 'en',
      notifications: true,
      autoSave: true
    }
  },
  {
    input: [defaultPrefs, [['set', 'theme', 'dark']]],
    expected: {
      theme: 'dark',
      fontSize: 16,
      language: 'en',
      notifications: true,
      autoSave: true
    }
  },
  {
    input: [
      defaultPrefs,
      [
        ['set', 'theme', 'dark'],
        ['set', 'fontSize', 20],
        ['get', 'theme']
      ]
    ],
    expected: 'dark'
  },
  {
    input: [
      defaultPrefs,
      [
        ['set', 'theme', 'dark'],
        ['reset', 'theme'],
        ['get', 'theme']
      ]
    ],
    expected: 'light'
  },
  {
    input: [
      defaultPrefs,
      [
        ['set', 'theme', 'dark'],
        ['set', 'fontSize', 24],
        ['resetAll']
      ]
    ],
    expected: {
      theme: 'light',
      fontSize: 16,
      language: 'en',
      notifications: true,
      autoSave: true
    }
  },
  {
    input: [defaultPrefs, [['get', 'nonexistent']]],
    expected: undefined
  },
  {
    input: [
      defaultPrefs,
      [
        ['set', 'language', 'fr'],
        ['set', 'notifications', false],
        ['getAll']
      ]
    ],
    expected: {
      theme: 'light',
      fontSize: 16,
      language: 'fr',
      notifications: false,
      autoSave: true
    }
  }
];
