/**
 * REFACTORING CHALLENGE — Write Your TypeScript Version Here
 *
 * Migrate analytics.js to strict TypeScript.
 * The tests import from this file.
 */

// ─── Domain Types ─────────────────────────────────────────────────────────────

export interface TrackedEvent {
  id: string;
  name: string;
  properties: Record<string, unknown>;
  userId: string | null;
  timestamp: string; // ISO 8601
}

export interface EventReport {
  totalEvents: number;
  uniqueEventTypes: number;
  eventCounts: Record<string, number>;
  uniqueUserCount: number;
  generatedAt: string; // ISO 8601
}

// ─── Implementation ───────────────────────────────────────────────────────────

/**
 * Track a user event and return the recorded event.
 * TypeScript enforces the parameter types — no runtime `typeof` checks needed
 * for callers within TypeScript code. We still validate `eventName` being
 * non-empty since that's a value constraint, not a type constraint.
 */
export function trackEvent(
  eventName: string,
  properties?: Record<string, unknown>,
  userId?: string
): TrackedEvent {
  if (!eventName.trim()) {
    throw new Error('eventName must be a non-empty string');
  }

  return {
    id: Math.random().toString(36).slice(2),
    name: eventName,
    properties: properties ?? {},
    userId: userId ?? null,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Filter events to only those that occurred within [startDate, endDate].
 */
export function filterEventsByDateRange(
  events: TrackedEvent[],
  startDate: Date,
  endDate: Date
): TrackedEvent[] {
  if (startDate > endDate) {
    throw new Error('startDate must be before or equal to endDate');
  }

  return events.filter((event) => {
    const eventDate = new Date(event.timestamp);
    return eventDate >= startDate && eventDate <= endDate;
  });
}

/**
 * Generate an aggregate report from a list of events.
 */
export function generateReport(events: TrackedEvent[]): EventReport {
  const eventCounts: Record<string, number> = {};
  const uniqueUsers = new Set<string>();

  for (const event of events) {
    eventCounts[event.name] = (eventCounts[event.name] ?? 0) + 1;

    if (event.userId !== null) {
      uniqueUsers.add(event.userId);
    }
  }

  return {
    totalEvents: events.length,
    uniqueEventTypes: Object.keys(eventCounts).length,
    eventCounts,
    uniqueUserCount: uniqueUsers.size,
    generatedAt: new Date().toISOString(),
  };
}
