# Week 5 — Debugging & Refactoring

> **Goal:** Be the person on your team who can methodically track down any bug and improve any codebase without breaking it.

---

## Problems This Week

| Problem | Key Concept | Why It Matters |
|---------|-------------|----------------|
| `memory-leak-emitter` | Listener cleanup | Most common Node.js memory leak |
| `race-condition-fix` | Async state guards | Data integrity in concurrent code |
| `legacy-user-service` | Separation of concerns | Real codebases are messy |
| `js-to-typescript` | Type safety migration | Migration is a common task |
| `callback-hell-to-async` | Modernization | Converting legacy patterns |

---

## Debugging Methodology

### The Scientific Method for Code
1. **Observe** — What is actually happening? (not what you think should happen)
2. **Hypothesize** — What could cause this?
3. **Predict** — If your hypothesis is correct, what else would be true?
4. **Test** — Add logging, write a failing test, check your prediction
5. **Conclude** — Was your hypothesis right? Update mental model

### Tools for Node.js Debugging

```bash
# Debug with node inspector
node --inspect-brk dist/server.js

# Then open: chrome://inspect

# Heap snapshot for memory leaks
node --inspect dist/server.js
# In Chrome DevTools: Memory tab → Take heap snapshot
```

### Memory Leak Detection
```typescript
// Check active handles and timers
process._getActiveHandles().length  // open sockets, timers
process._getActiveRequests().length

// Monitor memory over time
setInterval(() => {
  const used = process.memoryUsage();
  console.log(`Heap: ${Math.round(used.heapUsed / 1024 / 1024)}MB`);
}, 5000);
```

### Common Node.js Memory Leaks

| Leak Type | Example | Fix |
|-----------|---------|-----|
| Event listeners | `.on()` without `.off()` | Call `removeListener` / use `once` |
| Closures | Large objects captured in long-lived closures | Null out references |
| Timers | `setInterval` never cleared | Store ID, call `clearInterval` |
| Global caches | Unbounded Maps/arrays | Add size limit + eviction |
| Circular references | Objects referencing each other | WeakMap, WeakRef |

---

## Refactoring Principles

### The Boy Scout Rule
"Always leave the code a little better than you found it."

### SOLID in Practice
- **S**ingle Responsibility — one reason to change
- **O**pen/Closed — open for extension, closed for modification
- **L**iskov Substitution — subtypes must be substitutable
- **I**nterface Segregation — small, focused interfaces
- **D**ependency Inversion — depend on abstractions

For interviews, you don't need to recite these — you need to apply them:
- Can you split this 200-line function into 3 focused functions?
- Can you extract the database logic from the business logic?
- Can you make this testable by injecting dependencies?

### The Refactoring Loop
1. **Ensure tests exist** — if they don't, write them first (characterization tests)
2. **Make one change at a time**
3. **Run tests after each change**
4. **Commit when tests pass**
5. **Repeat**

Never refactor and add features simultaneously.

### Characterization Tests
When you have untested legacy code, write tests that capture *current* behavior (even if it's wrong) before changing anything:

```typescript
// I don't know if this is right, but this is what it does right now
it('returns null for empty input', () => {
  expect(processUser(null)).toBeNull(); // document current behavior
});
```

### Converting JS to TypeScript

Migration strategy for a large file:
1. Rename `.js` to `.ts`
2. Fix all compilation errors with explicit types (not `any`)
3. Replace `any` usages with real types
4. Enable strict mode one flag at a time
5. Add type guards at runtime boundaries (API responses, JSON.parse)

```typescript
// Type guard pattern
function isUser(x: unknown): x is User {
  return (
    typeof x === 'object' &&
    x !== null &&
    'id' in x &&
    'name' in x
  );
}
```

---

## Code Smells to Recognize

| Smell | Symptom | Fix |
|-------|---------|-----|
| Long function | >30 lines | Extract sub-functions |
| Deep nesting | >3 levels | Early returns, extract |
| Magic numbers | `if (status === 4)` | Named constants/enums |
| Repeated code | Same logic in 3 places | Extract utility |
| Huge class | Class with 20 methods | Split responsibilities |
| Feature envy | Method uses another class's data more than its own | Move method |
| God object | One object knows everything | Decompose |
| Boolean parameter | `processUser(user, true)` | Two functions or options object |

---

## Interview Questions

1. "How would you find a memory leak in a Node.js application?"
2. "What steps would you take before refactoring a legacy function?"
3. "How do you refactor without breaking existing behavior?"
4. "What's the difference between a bug and a code smell?"
5. "How would you migrate a JavaScript codebase to TypeScript incrementally?"
6. "What makes code 'testable'?"

---

## Resources

- [Martin Fowler — Refactoring](https://refactoring.com/catalog/) — catalog of refactoring patterns
- [Node.js Diagnostics](https://nodejs.org/en/docs/guides/debugging-getting-started)
- [TypeScript Migration Guide](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html)
