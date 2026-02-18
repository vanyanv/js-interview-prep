# Event Emitter

**Difficulty:** Medium
**Category:** Design Patterns / Frontend Logic
**Estimated Time:** 30–40 minutes

---

## Problem

Implement a type-safe `EventEmitter` class that supports subscribing to events, emitting them, and removing listeners.

### Signature

```typescript
type EventMap = Record<string, unknown[]>;

class EventEmitter<Events extends EventMap> {
  on<K extends keyof Events>(event: K, listener: (...args: Events[K]) => void): this;
  off<K extends keyof Events>(event: K, listener: (...args: Events[K]) => void): this;
  once<K extends keyof Events>(event: K, listener: (...args: Events[K]) => void): this;
  emit<K extends keyof Events>(event: K, ...args: Events[K]): void;
  listenerCount<K extends keyof Events>(event: K): number;
  removeAllListeners(event?: keyof Events): this;
}
```

---

## Requirements

- `on(event, listener)` — registers a listener, returns `this` for chaining
- `off(event, listener)` — removes a specific listener (by reference)
- `once(event, listener)` — listener fires once, then auto-removes
- `emit(event, ...args)` — calls all listeners for the event in registration order
- `listenerCount(event)` — returns number of active listeners for an event
- `removeAllListeners(event?)` — removes all listeners for an event, or all events if none specified
- Method chaining should work: `emitter.on('x', fn).on('y', fn2)`

---

## Examples

```typescript
type AppEvents = {
  'data': [payload: { id: number; name: string }];
  'error': [err: Error];
  'close': [];
};

const emitter = new EventEmitter<AppEvents>();

emitter.on('data', ({ id, name }) => {
  console.log(`User ${id}: ${name}`);
});

emitter.emit('data', { id: 1, name: 'Alice' });
// logs: "User 1: Alice"

const onError = (err: Error) => console.error(err.message);
emitter.on('error', onError);
emitter.off('error', onError); // remove it
```

---

## Hints

<details>
<summary>Hint 1</summary>

Store listeners in a `Map<keyof Events, Array<Function>>`. Each event name maps to an array of listener functions.

</details>

<details>
<summary>Hint 2</summary>

For `once`, create a wrapper function that calls the original listener and then calls `off` to remove itself. Store the wrapper, but expose the original for `off`.

</details>

<details>
<summary>Hint 3</summary>

Be careful with `off` — you need to remove by reference. If you stored a wrapper for `once`, you need to find it. Consider storing a mapping from original → wrapper.

</details>

---

## Memory Leak Warning

This is the #1 memory leak in Node.js apps:

```typescript
// WRONG — adding listener in a loop without cleanup
function fetchData() {
  emitter.on('data', processData); // new listener added every call!
}
fetchData(); fetchData(); fetchData(); // 3 listeners, growing unboundedly
```

Always pair `on` with `off` in lifecycle hooks (React useEffect cleanup, component unmount).

---

## Running Tests

```bash
npx vitest run problems/medium/event-emitter/event-emitter.test.ts
```

---

## Reflection

1. **What was difficult?**

2. **How does `once` work under the hood in your implementation?**

3. **What's the memory leak risk and how do you prevent it in a React component?**

4. **How does Node.js's built-in EventEmitter handle the `once` method?**

5. **What's the difference between EventEmitter and a pub/sub system?**
