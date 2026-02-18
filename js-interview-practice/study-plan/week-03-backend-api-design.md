# Week 3 — Backend & API Design

> **Goal:** Design and implement clean, production-ready API logic. Understand middleware, pagination, caching, and rate limiting patterns.

---

## Problems This Week

| Problem | Key Concept | Why It Matters |
|---------|-------------|----------------|
| `rate-limiter` | Sliding window, token bucket | Prevent abuse, protect infra |
| `paginated-api` | Cursor vs offset pagination | Every data-heavy API needs this |
| `data-validation-layer` | Type-safe validation | Stop invalid data at the boundary |
| `lru-cache` | Eviction policy | Cache with bounded memory |
| `cache-with-ttl` | Expiry, invalidation | Production caching patterns |

---

## Core Concepts

### Rate Limiting Algorithms

#### Fixed Window
Count requests in a time window. Simple but allows burst at window boundary.
```
Window: 0–60s → limit 100 requests
Window: 60–120s → limit 100 requests
Problem: 100 at t=59s + 100 at t=61s = 200 requests in 2 seconds
```

#### Sliding Window
Track timestamps of recent requests. Accurate but memory-intensive.
```
At any point in time, count requests in the last N seconds.
More accurate — no boundary burst problem.
```

#### Token Bucket
Tokens replenish at rate R. Each request consumes 1 token. Allows bursting up to bucket capacity.

#### Leaky Bucket
Queue requests and process at fixed rate. Smooths out bursts.

### Pagination Patterns

#### Offset Pagination
```
GET /users?page=2&limit=20
SELECT * FROM users LIMIT 20 OFFSET 40
```
- Simple, allows jumping to any page
- Problem: inconsistent results if data changes between pages, slow for deep pages

#### Cursor Pagination
```
GET /users?cursor=eyJpZCI6MTB9&limit=20
WHERE id > :cursor LIMIT 20
```
- Consistent results even as data changes
- Efficient for sequential traversal
- Cannot jump to arbitrary pages

### Middleware Pattern
Express middleware is just `(req, res, next) => void`. Chain them.
```typescript
const rateLimiter = (req: Request, res: Response, next: NextFunction): void => {
  if (isLimited(req.ip)) {
    res.status(429).json({ error: 'Too Many Requests' });
    return;
  }
  next();
};
```

### Caching Hierarchy
```
In-memory (Map/object) → Redis → CDN → Database
Fastest/smallest      →        →     → Slowest/largest
```

For interview purposes, in-memory cache implementations are sufficient to demonstrate the pattern.

---

## API Design Best Practices

### HTTP Status Codes to Know
| Code | Meaning | When to Use |
|------|---------|-------------|
| 200 | OK | Successful GET, PUT, PATCH |
| 201 | Created | Successful POST |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Validation error |
| 401 | Unauthorized | Not authenticated |
| 403 | Forbidden | Authenticated but not allowed |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Duplicate resource |
| 422 | Unprocessable Entity | Semantic validation error |
| 429 | Too Many Requests | Rate limited |
| 500 | Internal Server Error | Unhandled exception |

### Error Response Shape
Pick a consistent shape and stick to it:
```typescript
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "field": "email"  // optional: field-level context
  }
}
```

### RESTful Resource Naming
```
GET    /users         → list users
POST   /users         → create user
GET    /users/:id     → get user
PUT    /users/:id     → replace user
PATCH  /users/:id     → partial update
DELETE /users/:id     → delete user

GET    /users/:id/posts  → user's posts (nested resource)
```

---

## Interview Questions to Practice

1. "How would you implement rate limiting for an API that serves millions of users?"
2. "What's the tradeoff between cursor and offset pagination?"
3. "When would you use a cache? What are the risks?"
4. "How do you validate request bodies in a type-safe way?"
5. "What's the N+1 query problem and how do you solve it?"
6. "How would you design an API for a feed that needs to show newest items first but also supports real-time updates?"

---

## Caching Gotchas

- **Cache invalidation** — one of the two hard problems in CS
- **Cache stampede** — many requests hit the DB simultaneously when cache expires
- **Stale-while-revalidate** — serve stale data, refresh in background
- **Cache poisoning** — attacker inserts malicious data into cache
- **Memory limits** — always cap cache size with an eviction policy

---

## Resources

- [High Scalability — Rate Limiting](http://highscalability.com/blog/2015/12/14/how-real-time-trending-topics-work-at-twitter.html)
- [Stripe API Design](https://stripe.com/docs/api) — excellent example of real-world API design
- [RFC 7231 — HTTP Semantics](https://tools.ietf.org/html/rfc7231)
