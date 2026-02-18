# JS Interview Practice

A practical, real-world JavaScript/TypeScript interview prep repository for mid-level full-stack engineers targeting startup and product engineering roles.

> **Philosophy:** This is not a LeetCode grind repo. Every problem here mirrors something you'd encounter in a real codebase — debugging a broken async chain, refactoring a legacy service, designing a rate limiter, or building a pagination API.

---

## Overview

| Category     | Count | Focus                                              |
|--------------|-------|----------------------------------------------------|
| Easy         | 5     | Core utilities (debounce, throttle, memoize, etc.) |
| Medium       | 8     | Data structures, async patterns, API design        |
| Real-World   | 5     | End-to-end scenarios with realistic constraints    |
| Debugging    | 3     | Find and fix subtle bugs in broken code            |
| Refactoring  | 3     | Improve messy code while keeping tests green       |
| **Total**    | **24**|                                                    |

---

## Quick Start

```bash
# Install dependencies
npm install

# Run the interactive practice CLI
npm run practice

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Type check
npm run typecheck

# Lint
npm run lint
```

---

## How to Use This Repo

### The Practice Loop

1. **Pick a problem** — use the CLI (`npm run practice`) or browse `/problems/`
2. **Read the README** — understand constraints, expected inputs/outputs, and hints
3. **Open `starter.ts`** — this is your working file. Implement the solution here
4. **Run the tests** — `npx vitest run problems/<category>/<problem>/<problem>.test.ts`
5. **Check your solution** — only open `solution.ts` after you've solved it or spent 30+ minutes genuinely stuck
6. **Reflect** — answer the reflection questions at the bottom of each README

### Timing Yourself

- **Easy problems:** aim for 15–20 minutes
- **Medium problems:** aim for 30–45 minutes
- **Real-world:** aim for 45–60 minutes (these are interview take-home style)
- **Debugging:** no time limit — methodically investigate
- **Refactoring:** aim for 20–30 minutes

---

## Repo Structure

```
js-interview-practice/
├── README.md                    # This file
├── package.json
├── tsconfig.json
├── vitest.config.ts
├── practice.ts                  # Interactive CLI
│
├── study-plan/
│   ├── week-01-foundations.md
│   ├── week-02-async-and-promises.md
│   ├── week-03-backend-api-design.md
│   ├── week-04-frontend-logic-and-state.md
│   ├── week-05-debugging-and-refactoring.md
│   └── week-06-system-design-lite.md
│
└── problems/
    ├── easy/
    │   ├── debounce/
    │   ├── throttle/
    │   ├── deep-clone/
    │   ├── flatten-array/
    │   └── memoize/
    ├── medium/
    │   ├── rate-limiter/
    │   ├── promise-pool/
    │   ├── lru-cache/
    │   ├── event-emitter/
    │   ├── retry-with-backoff/
    │   ├── mini-state-store/
    │   ├── normalize-api-data/
    │   └── paginated-api/
    ├── real-world/
    │   ├── cache-with-ttl/
    │   ├── data-validation-layer/
    │   ├── race-with-timeout/
    │   ├── cancelable-async/
    │   └── list-diff-reconciler/
    ├── debugging/
    │   ├── broken-async-chain/
    │   ├── memory-leak-emitter/
    │   └── race-condition-fix/
    └── refactoring/
        ├── legacy-user-service/
        ├── callback-hell-to-async/
        └── js-to-typescript/
```

---

## 6–8 Week Study Plan

### Week 1 — JS Foundations
Core building blocks. If you can't write these from scratch, you'll struggle with the rest.

| Day | Problem | Category |
|-----|---------|----------|
| Mon | Debounce | Easy |
| Tue | Throttle | Easy |
| Wed | Deep Clone | Easy |
| Thu | Flatten Array | Easy |
| Fri | Memoize | Easy |
| Weekend | Review [week-01-foundations.md](study-plan/week-01-foundations.md) |

### Week 2 — Async & Promises
This is where most mid-level engineers have gaps.

| Day | Problem | Category |
|-----|---------|----------|
| Mon | Promise Pool | Medium |
| Tue | Retry with Backoff | Medium |
| Wed | Race with Timeout | Real-World |
| Thu | Cancelable Async | Real-World |
| Fri | Broken Async Chain | Debugging |
| Weekend | Review [week-02-async-and-promises.md](study-plan/week-02-async-and-promises.md) |

### Week 3 — Backend & API Design
Express, middleware, data modeling.

| Day | Problem | Category |
|-----|---------|----------|
| Mon | Rate Limiter | Medium |
| Tue | Paginated API | Medium |
| Wed | Data Validation Layer | Real-World |
| Thu | LRU Cache | Medium |
| Fri | Cache with TTL | Real-World |
| Weekend | Review [week-03-backend-api-design.md](study-plan/week-03-backend-api-design.md) |

### Week 4 — Frontend Logic & State
UI patterns without a framework.

| Day | Problem | Category |
|-----|---------|----------|
| Mon | Event Emitter | Medium |
| Tue | Mini State Store | Medium |
| Wed | Normalize API Data | Medium |
| Thu | List Diff Reconciler | Real-World |
| Fri | Callback Hell → Async | Refactoring |
| Weekend | Review [week-04-frontend-logic-and-state.md](study-plan/week-04-frontend-logic-and-state.md) |

### Week 5 — Debugging & Refactoring
This is what you'll actually do most days as an engineer.

| Day | Problem | Category |
|-----|---------|----------|
| Mon | Memory Leak Emitter | Debugging |
| Tue | Race Condition Fix | Debugging |
| Wed | Legacy User Service | Refactoring |
| Thu | JS to TypeScript | Refactoring |
| Fri | Free review / re-do a hard one | — |
| Weekend | Review [week-05-debugging-and-refactoring.md](study-plan/week-05-debugging-and-refactoring.md) |

### Week 6 — System Design Lite
Big picture thinking.

| Weekend | Read [week-06-system-design-lite.md](study-plan/week-06-system-design-lite.md) and practice verbal explanation |

### Weeks 7–8 — Mock Interviews
- Re-do 3 problems you found hardest — without looking at your solution
- Time yourself strictly
- Practice explaining your approach out loud as you code
- Do 1–2 mock interviews with a peer if possible

---

## How to Approach a Problem

Use this mental checklist before writing code:

1. **Clarify the interface** — What are the inputs? What's the output type? What are edge cases?
2. **State constraints** — Time complexity? Space complexity? What should happen on error?
3. **Write the signature first** — Type it strictly before implementing
4. **Start simple** — Get the happy path working before handling edge cases
5. **Run tests early and often** — Don't write the whole thing before testing
6. **Optimize last** — Correctness first, performance second

---

## Reflection Prompts

After every problem, answer these in the README or a notebook:

- What was the hardest part?
- Which edge cases did I miss on first try?
- What's the time and space complexity of my solution?
- Is there a simpler or faster approach I didn't consider?
- How would I explain this to an interviewer in 60 seconds?
- Would this solution hold up at 10,000 req/s? What would break first?

---

## Running Individual Problems

```bash
# Run a single problem's tests
npx vitest run problems/medium/rate-limiter/rate-limiter.test.ts

# Run all tests in a category
npx vitest run problems/easy

# Watch mode for a specific problem
npx vitest problems/medium/promise-pool/promise-pool.test.ts
```

---

## TypeScript Notes

- `strict: true` is enabled — no cutting corners
- `noUncheckedIndexedAccess: true` — array access returns `T | undefined`
- `exactOptionalPropertyTypes: true` — optional props must be explicitly `undefined`
- No `any` unless you have a comment explaining why

---

## Contributing / Tracking Progress

Add a `PROGRESS.md` file to track your work:

```markdown
## Progress Log

| Problem | Date | Time | Notes |
|---------|------|------|-------|
| debounce | 2024-03-01 | 18 min | Missed leading edge case |
| rate-limiter | 2024-03-03 | 42 min | Had to look at hint for sliding window |
```
