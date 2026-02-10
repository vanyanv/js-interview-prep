# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

JavaScript/TypeScript interview preparation system with 300+ problems organized by algorithmic pattern and difficulty. Uses ES modules (`"type": "module"` in package.json).

## Commands

```bash
# Install dependencies
npm install

# Run tests for a specific problem
node test.js <problem-name>
# Example: node test.js easy-01-count-occurrences

# Run tests in watch mode
npm run test:watch

# Jest (for React component testing)
npm run test:coverage

# Lint
npm run lint

# Type check
npm run type-check
```

## Architecture

### Custom Test Runner (`test.js`)

The core of the system. It:
1. Takes a problem name as a CLI argument
2. Searches all subdirectories under `problems/` for a matching `.js` file
3. Imports the problem file to get `functionName` and `tests` array
4. Imports the matching solution from `solutions/<problem-name>.ts` (preferred) or `.js`
5. Calls the exported function with each test's `input` (spread as arguments) and compares against `expected` using deep equality

### Problem Files (`problems/<category>/<problem-name>.js`)

Each problem file exports:
- `functionName` (string) — the name of the function the solution must export
- `tests` (array) — test cases with `{ input: [...args], expected: value }`

Problems are organized into numbered category directories (e.g., `00-warmup/`, `01-two-pointers/`, `08-dynamic-programming/`).

### Solution Files (`solutions/<problem-name>.js` or `.ts`)

Solutions can be written in JavaScript (`.js`) or TypeScript (`.ts`). The test runner checks for `.ts` first, then `.js`. The file name must match the problem file name exactly, and solutions must export a named function matching the problem's `functionName`.

```javascript
// solutions/easy-01-count-occurrences.js
export const countOccurrences = (array, target) => {
  // implementation
};
```

```typescript
// solutions/easy-01-count-occurrences.ts
export const countOccurrences = (array: number[], target: number): number => {
  // implementation
};
```

TypeScript solutions are transpiled on the fly via `tsx` (esbuild). Run `npm run type-check` to verify types separately.

### Advanced Practice Directories

Separate top-level directories for specialized topics, each with their own `easy/`, `medium/`, `hard/` structure:
- `typescript-api-practice/` — API/backend patterns
- `react-interview-practice/` — React hooks and components
- `testing-practice/` — Jest/TDD patterns
- `system-design-practice/` — Scalability and architecture
- `performance-optimization/` — Optimization techniques
- `real-world-scenarios/` — Full feature implementations

### Reference Materials

- `patterns/` — Guides for each algorithmic pattern (two-pointers, sliding-window, etc.)
- `PROBLEM_SOLVING_GUIDE.md` — UMPIRE method (Understand, Match, Plan, Implement, Review, Evaluate)
- `FUNDAMENTALS_FIRST.md` — JS fundamentals and method complexity reference
- `progress.md` — Per-problem completion tracking
