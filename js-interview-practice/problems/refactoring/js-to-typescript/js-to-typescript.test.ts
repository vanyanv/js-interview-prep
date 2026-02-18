import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { trackEvent, filterEventsByDateRange, generateReport, TrackedEvent } from './analytics';

describe('trackEvent', () => {
  it('returns a TrackedEvent with correct name', () => {
    const event = trackEvent('page_view');
    expect(event.name).toBe('page_view');
  });

  it('returns a TrackedEvent with a unique id', () => {
    const e1 = trackEvent('click');
    const e2 = trackEvent('click');
    expect(e1.id).not.toBe(e2.id);
  });

  it('returns a timestamp as an ISO string', () => {
    const event = trackEvent('click');
    expect(() => new Date(event.timestamp)).not.toThrow();
    expect(new Date(event.timestamp).toString()).not.toBe('Invalid Date');
  });

  it('defaults properties to empty object when not provided', () => {
    const event = trackEvent('click');
    expect(event.properties).toEqual({});
  });

  it('uses provided properties', () => {
    const props = { page: '/home', button: 'signup' };
    const event = trackEvent('click', props);
    expect(event.properties).toEqual(props);
  });

  it('defaults userId to null when not provided', () => {
    const event = trackEvent('click');
    expect(event.userId).toBeNull();
  });

  it('uses provided userId', () => {
    const event = trackEvent('click', {}, 'user-42');
    expect(event.userId).toBe('user-42');
  });

  it('throws if eventName is empty string', () => {
    expect(() => trackEvent('')).toThrow();
    expect(() => trackEvent('   ')).toThrow();
  });

  it('returns an object matching TrackedEvent shape', () => {
    const event = trackEvent('test', { key: 'value' }, 'user-1');
    expect(event).toHaveProperty('id');
    expect(event).toHaveProperty('name');
    expect(event).toHaveProperty('properties');
    expect(event).toHaveProperty('userId');
    expect(event).toHaveProperty('timestamp');
  });
});

describe('filterEventsByDateRange', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  function makeEvent(isoTimestamp: string): TrackedEvent {
    return {
      id: Math.random().toString(),
      name: 'test',
      properties: {},
      userId: null,
      timestamp: isoTimestamp,
    };
  }

  it('returns events within the date range', () => {
    const events = [
      makeEvent('2024-01-01T00:00:00.000Z'),
      makeEvent('2024-01-15T00:00:00.000Z'),
      makeEvent('2024-02-01T00:00:00.000Z'),
    ];

    const result = filterEventsByDateRange(
      events,
      new Date('2024-01-01'),
      new Date('2024-01-31')
    );

    expect(result).toHaveLength(2);
  });

  it('excludes events outside the date range', () => {
    const events = [
      makeEvent('2023-12-31T00:00:00.000Z'), // before
      makeEvent('2024-01-15T00:00:00.000Z'), // in range
      makeEvent('2024-02-01T00:00:00.000Z'), // after
    ];

    const result = filterEventsByDateRange(
      events,
      new Date('2024-01-01'),
      new Date('2024-01-31')
    );

    expect(result).toHaveLength(1);
  });

  it('includes events exactly on the boundary dates', () => {
    const start = new Date('2024-01-01T00:00:00.000Z');
    const end = new Date('2024-01-31T23:59:59.999Z');
    const events = [
      makeEvent(start.toISOString()),
      makeEvent(end.toISOString()),
    ];

    const result = filterEventsByDateRange(events, start, end);
    expect(result).toHaveLength(2);
  });

  it('returns empty array when no events match', () => {
    const events = [makeEvent('2023-01-01T00:00:00.000Z')];
    const result = filterEventsByDateRange(
      events,
      new Date('2024-01-01'),
      new Date('2024-12-31')
    );
    expect(result).toHaveLength(0);
  });

  it('returns empty array for empty input', () => {
    const result = filterEventsByDateRange([], new Date('2024-01-01'), new Date('2024-12-31'));
    expect(result).toHaveLength(0);
  });

  it('throws if startDate is after endDate', () => {
    expect(() =>
      filterEventsByDateRange([], new Date('2024-12-31'), new Date('2024-01-01'))
    ).toThrow();
  });
});

describe('generateReport', () => {
  it('returns totalEvents equal to input array length', () => {
    const events = [trackEvent('a'), trackEvent('b'), trackEvent('c')];
    const report = generateReport(events);
    expect(report.totalEvents).toBe(3);
  });

  it('counts unique event types', () => {
    const events = [
      trackEvent('click'),
      trackEvent('click'),
      trackEvent('page_view'),
    ];
    const report = generateReport(events);
    expect(report.uniqueEventTypes).toBe(2);
  });

  it('eventCounts maps event name to occurrence count', () => {
    const events = [
      trackEvent('click'),
      trackEvent('click'),
      trackEvent('click'),
      trackEvent('page_view'),
    ];
    const report = generateReport(events);
    expect(report.eventCounts['click']).toBe(3);
    expect(report.eventCounts['page_view']).toBe(1);
  });

  it('counts unique users (null userIds excluded)', () => {
    const events = [
      trackEvent('click', {}, 'user-1'),
      trackEvent('click', {}, 'user-2'),
      trackEvent('click', {}, 'user-1'), // duplicate
      trackEvent('click'),               // no userId — null
    ];
    const report = generateReport(events);
    expect(report.uniqueUserCount).toBe(2);
  });

  it('returns 0 unique users when all events have null userId', () => {
    const events = [trackEvent('click'), trackEvent('click')];
    const report = generateReport(events);
    expect(report.uniqueUserCount).toBe(0);
  });

  it('returns empty report for empty events array', () => {
    const report = generateReport([]);
    expect(report.totalEvents).toBe(0);
    expect(report.uniqueEventTypes).toBe(0);
    expect(report.uniqueUserCount).toBe(0);
    expect(report.eventCounts).toEqual({});
  });

  it('returns generatedAt as a valid ISO string', () => {
    const report = generateReport([]);
    expect(() => new Date(report.generatedAt)).not.toThrow();
    expect(new Date(report.generatedAt).toString()).not.toBe('Invalid Date');
  });
});
