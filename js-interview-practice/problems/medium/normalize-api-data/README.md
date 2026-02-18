# Normalize API Data

**Difficulty:** Medium
**Category:** Data Modeling / Frontend
**Estimated Time:** 30–40 minutes

---

## Problem

Implement a `normalize` function that transforms nested API response data into a flat, normalized structure.

This mirrors what libraries like [normalizr](https://github.com/paularmstrong/normalizr) do.

### Input (Nested API Response)

```typescript
interface Post {
  id: number;
  title: string;
  author: User;
  comments: Comment[];
}

interface User {
  id: number;
  name: string;
}

interface Comment {
  id: number;
  text: string;
  author: User;
}
```

### Output (Normalized)

```typescript
interface NormalizedData {
  posts: Record<number, NormalizedPost>;
  users: Record<number, User>;
  comments: Record<number, NormalizedComment>;
}

interface NormalizedPost {
  id: number;
  title: string;
  authorId: number;
  commentIds: number[];
}

interface NormalizedComment {
  id: number;
  text: string;
  authorId: number;
}
```

---

## Requirements

- Replace nested `author` objects with `authorId` references
- Replace nested `comments` arrays with `commentIds` arrays
- Deduplicate users (same user referenced in multiple posts/comments → stored once)
- Preserve all IDs correctly

---

## Why This Matters

Deeply nested state is painful:
```typescript
// To update user's name, you'd have to update it in EVERY post and comment:
state.posts[0].author.name = 'Bob';
state.posts[0].comments[1].author.name = 'Bob';
// ...and 50 other places

// With normalized state, update once:
state.users[userId].name = 'Bob';
// All references automatically point to the updated user
```

---

## Examples

```typescript
const posts: Post[] = [
  {
    id: 1,
    title: 'Hello World',
    author: { id: 10, name: 'Alice' },
    comments: [
      { id: 100, text: 'Nice!', author: { id: 11, name: 'Bob' } },
      { id: 101, text: 'Thanks', author: { id: 10, name: 'Alice' } },
    ],
  },
];

const result = normalize(posts);

// result.posts = { 1: { id: 1, title: 'Hello World', authorId: 10, commentIds: [100, 101] } }
// result.users = { 10: { id: 10, name: 'Alice' }, 11: { id: 11, name: 'Bob' } }
// result.comments = { 100: { id: 100, text: 'Nice!', authorId: 11 }, 101: { ... } }
```

---

## Running Tests

```bash
npx vitest run problems/medium/normalize-api-data/normalize-api-data.test.ts
```

---

## Reflection

1. **What was difficult?**

2. **Why is deduplication of users important?**

3. **What happens in your implementation if two users have the same ID but different data?** (Which one wins? Is that correct?)

4. **How does this pattern relate to SQL's normalization (1NF, 2NF, 3NF)?**

5. **What are the tradeoffs of normalized vs. denormalized state in a frontend app?**
