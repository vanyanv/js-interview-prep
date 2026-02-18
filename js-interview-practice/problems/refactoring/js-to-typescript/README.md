# Refactor: JavaScript → Strict TypeScript

**Difficulty:** Refactoring
**Category:** TypeScript / Type Safety
**Estimated Time:** 25–35 minutes

---

## Problem

The `analytics.js` file is loosely-typed JavaScript with runtime type checks scattered throughout. Migrate it to `analytics.ts` with **strict TypeScript** — replacing runtime guards with compile-time types.

**Your task:** Write a clean TypeScript version in `analytics.ts`. The tests must pass.

---

## The Messy JS Code

```javascript
// analytics.js (simplified)
function trackEvent(eventName, properties, userId) {
  if (!eventName || typeof eventName !== 'string') {
    throw new Error('eventName is required');
  }
  if (properties && typeof properties !== 'object') {
    throw new Error('properties must be an object');
  }
  // ...
}

function generateReport(events, startDate, endDate) {
  if (!Array.isArray(events)) throw new Error('events must be array');
  // ...
}
```

---

## Requirements

- No `any` types — all inputs and outputs fully typed
- Replace runtime `typeof` checks with TypeScript types where possible
- Keep runtime validation only at true system boundaries (external input)
- Use interfaces and type aliases to model the domain clearly
- All 3 functions must be exported with correct signatures

---

## The Three Functions

```typescript
// 1. Track a user event
function trackEvent(
  eventName: string,
  properties?: Record<string, unknown>,
  userId?: string
): TrackedEvent

// 2. Filter events by date range
function filterEventsByDateRange(
  events: TrackedEvent[],
  startDate: Date,
  endDate: Date
): TrackedEvent[]

// 3. Generate a summary report
function generateReport(events: TrackedEvent[]): EventReport
```

---

## The Migration Strategy

1. Define all types/interfaces first
2. Write function signatures
3. Replace runtime `typeof` checks with TypeScript types
4. Keep validation for external data (unknown inputs from APIs/users)
5. Use `unknown` instead of `any` at boundaries, then narrow with type guards

---

## Running Tests

```bash
npx vitest run problems/refactoring/js-to-typescript/js-to-typescript.test.ts
```

The tests import from `./analytics`. Write your TypeScript there.

---

## Reflection

1. **Which runtime checks were you able to eliminate with TypeScript?**

2. **Which runtime checks did you keep, and why?**
   (Hint: TypeScript doesn't validate JSON responses from APIs at runtime)

3. **What is the difference between `unknown` and `any`?**

4. **What is a type guard? Write an example.**

5. **How would you validate an API response safely?** (Zod, type guards, `as` cast — discuss tradeoffs)
