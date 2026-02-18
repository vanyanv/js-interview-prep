# Memory Leak: Event Emitter

**Difficulty:** Debugging
**Category:** Memory Management / Node.js
**Estimated Time:** No strict limit — methodically investigate

---

## Problem

The `UserNotificationService` has a **memory leak**: event listeners are being registered but never removed.

**Your task:** Find and fix the leak in `broken.ts` without modifying the test file.

---

## The Buggy Code

```typescript
class UserNotificationService {
  private emitter: EventEmitter;

  constructor(emitter: EventEmitter) {
    this.emitter = emitter;
  }

  // Called every time a user session starts
  startSession(userId: string, onNotification: (msg: string) => void): void {
    // Bug: registers a new listener every call, never removes it
    this.emitter.on(`notification:${userId}`, onNotification);
  }

  sendNotification(userId: string, message: string): void {
    this.emitter.emit(`notification:${userId}`, message);
  }

  // Called when user session ends
  endSession(userId: string, onNotification: (msg: string) => void): void {
    // Bug: this method is empty — listeners are never cleaned up
  }
}
```

---

## Symptoms of This Bug

```
MaxListenersExceededWarning: Possible EventEmitter memory leak detected.
11 notification:user-1 listeners added to [EventEmitter]. Use emitter.setMaxListeners() to increase limit
```

This warning appears when >10 listeners are registered for the same event. The fix isn't to raise the limit — it's to remove listeners when you're done with them.

---

## How to Debug Memory Leaks

```typescript
// Check listener count
emitter.listenerCount('event-name'); // how many listeners?

// Enable verbose warning trace
process.on('warning', (warning) => {
  console.warn(warning.name, warning.message);
  console.trace(); // shows where the listener was added
});
```

---

## Running Tests

```bash
npx vitest run problems/debugging/memory-leak-emitter/memory-leak-emitter.test.ts
```

The tests import from `./broken`. Fix `broken.ts`.

---

## Hints

<details>
<summary>Hint 1</summary>

`endSession` is empty. What should it do? How do you remove a listener from an EventEmitter?

</details>

<details>
<summary>Hint 2</summary>

`EventEmitter.off(event, listener)` removes a specific listener — but it must be the same **function reference**. If you pass a new `() => {}` each time, it won't match.

</details>

---

## Reflection

1. **How did you verify the memory leak existed?** (listener count growing)

2. **Why does `emitter.off(event, () => {})` not work?** (different function reference)

3. **What pattern does React's `useEffect` use to prevent this?**

4. **What is `emitter.once()` and how does it help?**

5. **When would you use `WeakRef` or `WeakMap` to help with memory management?**
