# Week 4 — Frontend Logic & State

> **Goal:** Understand how state management, event systems, and UI data flow work — without hiding behind a framework.

---

## Problems This Week

| Problem | Key Concept | Why It Matters |
|---------|-------------|----------------|
| `event-emitter` | Observer pattern | Node.js EventEmitter, React custom events |
| `mini-state-store` | Flux/Redux pattern | Understand what React state management solves |
| `normalize-api-data` | Data modeling | Avoid deeply nested state |
| `list-diff-reconciler` | Diffing algorithms | How React's reconciler works |
| `callback-hell-to-async` | Code evolution | Legacy codebase migration skill |

---

## Core Concepts

### Observer / Pub-Sub Pattern
```typescript
interface EventEmitter {
  on(event: string, listener: (...args: unknown[]) => void): this;
  off(event: string, listener: (...args: unknown[]) => void): this;
  emit(event: string, ...args: unknown[]): void;
  once(event: string, listener: (...args: unknown[]) => void): this;
}
```
Used everywhere: Node.js EventEmitter, React synthetic events, WebSockets, BroadcastChannel.

**Common Memory Leak:** Adding listeners without removing them. Each `.on` call registers a new listener. If you call it in a component mount without cleanup, you accumulate listeners on every re-render.

### State Management (Flux Architecture)
```
Action → Dispatcher → Store → View → (User triggers) → Action
```

Redux simplified:
```typescript
type Reducer<S, A> = (state: S, action: A) => S;

interface Store<S, A> {
  getState(): S;
  dispatch(action: A): void;
  subscribe(listener: () => void): () => void; // returns unsubscribe
}
```

The key insight: **state is derived from a sequence of actions applied to a reducer**. This makes state predictable and debuggable.

### Data Normalization
Nested API data creates pain:
```typescript
// Deeply nested — hard to update, lots of duplication
const state = {
  user: {
    id: 1,
    posts: [
      { id: 10, comments: [{ id: 100, userId: 2, user: { id: 2, name: 'Bob' } }] }
    ]
  }
};

// Normalized — each entity type has its own map by ID
const state = {
  users: { 1: { id: 1 }, 2: { id: 2, name: 'Bob' } },
  posts: { 10: { id: 10, userId: 1, commentIds: [100] } },
  comments: { 100: { id: 100, userId: 2, postId: 10 } }
};
```

This is what [normalizr](https://github.com/paularmstrong/normalizr) does, and what Redux Toolkit's `createEntityAdapter` does.

### Virtual DOM Diffing (Simplified)
React's reconciler:
1. Render new virtual tree
2. Diff against previous tree
3. Produce minimal list of DOM mutations
4. Apply mutations in one batch

Key insight: O(n) tree diffing (not O(n³) like naive approach) by assuming:
- Elements of different types produce different trees
- Keys hint at stable elements across re-renders

---

## Common Frontend Interview Questions

1. "What's the difference between `event.stopPropagation()` and `event.preventDefault()`?"
2. "How does React's useEffect cleanup prevent memory leaks?"
3. "What is a controlled vs. uncontrolled component?"
4. "How would you prevent unnecessary re-renders in a React app?"
5. "What's a selector in the context of state management?"
6. "How would you implement undo/redo with a state store?"

---

## State Management Tradeoffs

| Approach | Pros | Cons |
|----------|------|------|
| Local component state | Simple, collocated | Prop drilling, hard to share |
| Context API | Built-in, no dep | Re-renders whole tree on change |
| Redux/Zustand | Predictable, debuggable | Boilerplate (Redux), learning curve |
| Server state (SWR/React Query) | Cache, sync, invalidation built-in | Extra dependency, different mental model |

---

## Performance Patterns

### Memoization in UI
```typescript
// Expensive computed value
const sortedItems = useMemo(() => items.sort(compareFn), [items]);

// Stable callback reference
const handleClick = useCallback((id: string) => {
  dispatch({ type: 'SELECT', id });
}, [dispatch]);
```

### Virtualization
For lists with 1000+ items, only render what's visible. Libraries: `react-window`, `react-virtual`.

### Batching
React 18 batches all state updates, including in async code. Older React only batched in event handlers.

---

## Resources

- [Dan Abramov — You Might Not Need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)
- [Redux Docs — Normalizing State Shape](https://redux.js.org/usage/structuring-reducers/normalizing-state-shape)
- [Preact — Virtual DOM Reconciliation](https://preactjs.com/guide/v10/whats-new/)
