# Paginated API

**Difficulty:** Medium
**Category:** Backend / Express
**Estimated Time:** 35–45 minutes

---

## Problem

Build a paginated REST API endpoint using Express and implement **cursor-based pagination**.

You'll implement both:
1. A pure `paginate` function (testable without HTTP)
2. An Express router using it

---

## The Paginate Function

```typescript
interface PaginateOptions<T> {
  items: T[];
  cursor?: string;  // Encoded cursor from previous response (base64)
  limit: number;
  getId: (item: T) => string; // How to extract the ID from an item
}

interface PaginatedResult<T> {
  data: T[];
  nextCursor: string | null; // null if no more pages
  hasMore: boolean;
  total: number;
}

function paginate<T>(options: PaginateOptions<T>): PaginatedResult<T>
```

---

## Cursor Format

The cursor is a **base64-encoded ID** of the last item on the current page:

```
cursor = btoa(lastItem.id)  →  "eyJpZCI6IjEwIn0="
nextPage cursor = btoa(nextFirstItem.id - 1 effectively)
```

For simplicity, the cursor encodes the **ID of the last item seen**. The next page starts from items after that ID.

---

## API Endpoint

```
GET /users?limit=10             → first page
GET /users?limit=10&cursor=...  → next page

Response:
{
  "data": [...],
  "nextCursor": "abc123" | null,
  "hasMore": true | false,
  "total": 100
}
```

---

## Why Cursor Over Offset?

| | Offset | Cursor |
|-|--------|--------|
| Implementation | Simple | Slightly complex |
| Deep pages | Slow (OFFSET 1000 scans 1000 rows) | Fast (WHERE id > cursor) |
| Consistency | New items shift results | Stable (items added during fetch don't affect cursor) |
| Random access | Yes (jump to page 5) | No (must traverse sequentially) |

---

## Hints

<details>
<summary>Hint 1</summary>

For the cursor: encode the ID of the last item returned. On the next request, find that item's position in the array and return items after it.

</details>

<details>
<summary>Hint 2</summary>

`Buffer.from(str).toString('base64')` for encoding and `Buffer.from(str, 'base64').toString('utf-8')` for decoding in Node.js.

</details>

---

## Running Tests

```bash
npx vitest run problems/medium/paginated-api/paginated-api.test.ts
```

---

## Reflection

1. **What was difficult?**

2. **What happens if items are deleted between page requests?** (Cursor vs offset behavior differs here)

3. **How would you implement "previous page" with cursors?**

4. **What is the N+1 problem and how does pagination relate to it?**

5. **How would you add sorting (e.g., by `createdAt` desc) to cursor pagination?**
