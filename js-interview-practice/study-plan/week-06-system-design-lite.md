# Week 6 — System Design Lite

> **Goal:** Speak confidently about how systems work at scale, without needing to have built them. Focus on the patterns, tradeoffs, and vocabulary.

---

## What "System Design Lite" Means

For mid-level engineers at startups, system design interviews are rarely about designing distributed databases from scratch. They're about:

- Can you think about tradeoffs?
- Do you know when to use common patterns?
- Can you identify where a simple system breaks under load?
- Can you design an API and data model for a real feature?

---

## The Framework (Use for Every System Design)

1. **Clarify requirements** (5 min)
   - Functional: what does it do?
   - Non-functional: how many users, how much data, latency requirements?
   - Out of scope: what are we NOT building?

2. **Estimate scale** (2 min)
   - Users, requests/sec, data volume
   - Back-of-envelope: 1M DAU × 10 actions/day = ~100 req/s

3. **Design the API** (5 min)
   - Endpoints, request/response shapes, auth
   - Error cases

4. **Design the data model** (5 min)
   - Tables/collections, key relationships
   - What needs to be indexed?

5. **High-level architecture** (10 min)
   - Draw boxes: Client → Load Balancer → App Servers → DB/Cache/Queue
   - Walk through the happy path request

6. **Deep dive one area** (10 min)
   - Pick the hardest/most interesting component
   - Handle the edge cases

7. **Discuss tradeoffs** (5 min)
   - What would break first at scale?
   - What would you change for 10x the load?

---

## Common System Design Topics

### URL Shortener (Classic Starter)
Key questions:
- How do you generate short codes? (Base62, hash, counter)
- How do you handle collisions?
- How do you scale reads? (Cache popular URLs)
- How do you track analytics?

```
POST /shorten { url: "https://long.com/..." } → { shortCode: "abc123" }
GET /abc123 → 302 redirect

Data model:
  urls: { shortCode, longUrl, userId, createdAt, clickCount }
```

### Rate Limiter (You've now implemented this)
- Token bucket vs. sliding window
- Distributed rate limiting requires Redis (not just in-memory)
- Rate limiting per IP vs. per user vs. per API key

### Notification System
- Push notifications, emails, SMS
- Fan-out problem: 1 tweet → notify 10M followers
- Queue-based async delivery
- Retry logic, dead letter queues

### Feed / Timeline
- Pull model: query on read (simple, slow for large followings)
- Push model: write to follower feeds on post (fast reads, expensive writes)
- Hybrid: push to active users, pull for inactive

### Search
- Full-text search requires inverted index
- Elasticsearch for most use cases
- Typeahead: prefix tries or Elasticsearch prefix queries

---

## Vocabulary to Know

| Term | Definition |
|------|-----------|
| Horizontal scaling | Add more machines |
| Vertical scaling | Bigger machine |
| Sharding | Partition data across DBs |
| Replication | Copy data across machines for redundancy |
| Eventual consistency | Replicas may be temporarily out of sync |
| Strong consistency | All reads see latest write |
| CAP theorem | Can't have Consistency + Availability + Partition tolerance simultaneously |
| CDN | Cache static assets geographically |
| Load balancer | Distribute requests across servers |
| Message queue | Decouple producers from consumers (Kafka, SQS, RabbitMQ) |
| Circuit breaker | Stop calling a failing service temporarily |
| Idempotency | Same request produces same result if called multiple times |
| Idempotency key | Client-provided ID to prevent duplicate processing |

---

## Numbers Every Engineer Should Know

| Operation | Approx. Time |
|-----------|-------------|
| L1 cache reference | 0.5 ns |
| Main memory reference | 100 ns |
| Read 1MB from memory | 250 µs |
| Round trip within data center | 500 µs |
| Read 1MB from SSD | 1 ms |
| HDD seek | 10 ms |
| Network round trip (CA → Netherlands) | 150 ms |

Implication: **cache hits are 1000x faster than DB reads**. Cache everything you can afford to.

---

## Practice Prompts

Design the following systems. Spend 30 minutes on each, following the framework above:

1. **Design a URL shortener** — Handle 100M URLs, 10B redirects/day
2. **Design a rate limiter** — Per API key, 1000 req/min, distributed across 10 servers
3. **Design a key-value store** — Persistent, supports TTL, handles 100k req/s
4. **Design a notification system** — Email + push, millions of users
5. **Design a file upload service** — Large files (up to 5GB), resumable uploads

---

## The "Startup Scale" Version

At a startup (< 50 engineers, < 10M users), most of these problems don't need the distributed solution. The right answer is often:

- One Postgres database with good indexes
- Redis for caching and sessions
- A simple task queue (Bull, or even just `setTimeout` + DB polling)
- Horizontal scaling when you actually need it (not before)

Interviewers at startups often want to see **pragmatism** over complexity. Know the big solutions, but argue for the simple one until you need to scale.

---

## Resources

- [System Design Primer (GitHub)](https://github.com/donnemartin/system-design-primer)
- [ByteByteGo Newsletter](https://blog.bytebytego.com/) — excellent visual explanations
- [Designing Data-Intensive Applications](https://dataintensive.net/) — the book for going deep
- [High Scalability Blog](http://highscalability.com/all-time-favorites/)
