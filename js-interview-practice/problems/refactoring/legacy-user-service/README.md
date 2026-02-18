# Refactor: Legacy User Service

**Difficulty:** Refactoring
**Category:** Object-Oriented Design / Separation of Concerns
**Estimated Time:** 25–35 minutes

---

## Problem

The `UserService` in `messy.ts` is a classic "God class" — it mixes HTTP, business logic, caching, and validation all in one file. Refactor it to be clean, type-safe, and testable.

**Your task:** Rewrite the logic in `refactored.ts` without changing the exported behavior. The tests must continue to pass.

---

## The Messy Code

```typescript
// messy.ts (simplified)
class UserService {
  async getUser(id: any) {
    // validation mixed with fetching
    if (!id || id < 0) { /* ... */ }

    // in-memory cache logic inline
    if (this.cache[id]) return this.cache[id];

    // fetch logic inline
    const user = await this.db.findUser(id);
    if (!user) throw 'USER_NOT_FOUND'; // throwing a string!

    // transformation logic inline
    user.fullName = user.firstName + ' ' + user.lastName;

    // caching inline
    this.cache[id] = user;

    return user;
  }
}
```

---

## What "Good" Looks Like

After refactoring, your code should have:

- **Strict TypeScript** — no `any`, all types explicit
- **Single responsibility** — each function/class does one thing
- **Testable** — injectable dependencies (db, cache)
- **Proper error handling** — throw `Error` objects, not strings
- **Clear naming** — self-documenting code
- **No magic numbers/strings** — named constants

---

## Running Tests

```bash
npx vitest run problems/refactoring/legacy-user-service/legacy-user-service.test.ts
```

The tests import from `./refactored`. Write your clean implementation there.

---

## What NOT to Do

- Don't just rename variables — think about structure
- Don't add features that aren't in the original
- Don't over-engineer — use the simplest structure that passes tests

---

## Reflection

1. **What code smells did you identify in the original?**

2. **What changed structurally in your refactored version?**

3. **How did extracting functions make the code more testable?**

4. **What patterns did you use?** (Repository, Strategy, Factory?)

5. **Could you write tests for the messy version without changing it?** (What would make it hard?)
