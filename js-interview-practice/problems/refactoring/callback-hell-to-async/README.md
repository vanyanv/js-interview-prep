# Refactor: Callback Hell to Async/Await

**Difficulty:** Refactoring
**Category:** Async / Code Modernization
**Estimated Time:** 20–30 minutes

---

## Problem

The `processOrder` function in `messy.ts` uses deeply nested callbacks — the classic "callback hell" or "pyramid of doom." Refactor it in `refactored.ts` to use `async/await` while maintaining identical behavior.

---

## The Messy Code

```typescript
// messy.ts (simplified)
function processOrder(
  orderId: string,
  callback: (err: Error | null, result?: OrderResult) => void
): void {
  fetchOrder(orderId, (err, order) => {
    if (err) { callback(err); return; }

    validateOrder(order!, (err, isValid) => {
      if (err) { callback(err); return; }
      if (!isValid) { callback(new Error('Invalid order')); return; }

      chargeCustomer(order!.customerId, order!.total, (err, chargeId) => {
        if (err) { callback(err); return; }

        sendConfirmation(order!.customerId, chargeId!, (err) => {
          if (err) { callback(err); return; }
          callback(null, { orderId, chargeId: chargeId!, status: 'completed' });
        });
      });
    });
  });
}
```

---

## Requirements

- Convert all callback-based operations to `async/await`
- The **same operations** must occur in the same order
- Error handling must be identical (if any step fails, the whole operation fails)
- The promisified versions of the callback functions are provided — use those
- Return `Promise<OrderResult>` instead of using a callback

---

## Why This Matters

Callback hell is still common in:
- Legacy Node.js code (pre-async/await era)
- Some database drivers
- OS-level Node.js APIs (`fs`, `crypto`, `child_process`)

Being able to refactor it cleanly is a real engineering skill.

---

## Running Tests

```bash
npx vitest run problems/refactoring/callback-hell-to-async/callback-hell-to-async.test.ts
```

The tests import from `./refactored`. Write your clean implementation there.

---

## Reflection

1. **What was the hardest part to convert?**

2. **How does error handling change between callbacks and async/await?**
   - Callbacks: pass `err` as first argument
   - async/await: errors are thrown and caught with try/catch

3. **When do you still need callbacks in modern Node.js?**

4. **What is `util.promisify` and when would you use it?**

5. **What's the difference between `Promise.all` and sequential awaits?** When would you use each?
