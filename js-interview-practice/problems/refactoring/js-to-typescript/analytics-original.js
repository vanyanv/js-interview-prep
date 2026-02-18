/**
 * REFACTORING CHALLENGE — JS → TypeScript
 *
 * This is the original JavaScript file to migrate.
 * Study it, then write a clean TypeScript version in analytics.ts.
 * The tests import from analytics.ts, not this file.
 *
 * Code smells to notice:
 * 1. Runtime `typeof` checks that TypeScript would catch at compile time
 * 2. No return types documented
 * 3. `properties` is untyped — any object allowed
 * 4. Date comparisons done with raw strings (fragile)
 * 5. Report generation has no documented output shape
 * 6. Magic strings for event categories
 */

// No types — just hope callers pass the right things
function trackEvent(eventName, properties, userId) {
  // Runtime type checks — TypeScript would catch these at compile time
  if (!eventName || typeof eventName !== 'string') {
    throw new Error('eventName must be a non-empty string');
  }
  if (properties !== undefined && (typeof properties !== 'object' || Array.isArray(properties))) {
    throw new Error('properties must be a plain object');
  }
  if (userId !== undefined && typeof userId !== 'string') {
    throw new Error('userId must be a string');
  }

  return {
    id: Math.random().toString(36).slice(2),
    name: eventName,
    properties: properties || {},
    userId: userId || null,
    timestamp: new Date().toISOString(),
  };
}

function filterEventsByDateRange(events, startDate, endDate) {
  // No type safety — caller could pass anything
  if (!Array.isArray(events)) {
    throw new Error('events must be an array');
  }
  if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
    throw new Error('startDate and endDate must be Date objects');
  }
  if (startDate > endDate) {
    throw new Error('startDate must be before endDate');
  }

  return events.filter(function(event) {
    var eventDate = new Date(event.timestamp);
    return eventDate >= startDate && eventDate <= endDate;
  });
}

function generateReport(events) {
  if (!Array.isArray(events)) {
    throw new Error('events must be an array');
  }

  // Count by event name
  var eventCounts = {};
  events.forEach(function(event) {
    if (!eventCounts[event.name]) {
      eventCounts[event.name] = 0;
    }
    eventCounts[event.name]++;
  });

  // Unique users
  var uniqueUsers = new Set();
  events.forEach(function(event) {
    if (event.userId) {
      uniqueUsers.add(event.userId);
    }
  });

  return {
    totalEvents: events.length,
    uniqueEventTypes: Object.keys(eventCounts).length,
    eventCounts: eventCounts,
    uniqueUserCount: uniqueUsers.size,
    generatedAt: new Date().toISOString(),
  };
}

module.exports = { trackEvent, filterEventsByDateRange, generateReport };
