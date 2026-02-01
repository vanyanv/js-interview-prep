/*
Problem: API Performance Optimization
Difficulty: Hard
Category: TypeScript API - Performance

Create an optimized API client with connection pooling, request deduplication, and caching.

Example 1:
  Input: requests = [sameUrl, sameUrl, sameUrl], options = { dedupe: true }
  Output: { 
    responses: [data, data, data], 
    actualRequests: 1,
    deduped: 2,
    cacheHits: 2 
  }

Example 2:
  Input: requests = [...many...], options = { poolSize: 5, cache: true }
  Output: { 
    responses: [...results...], 
    poolUtilization: 0.8,
    cacheHitRate: 0.6,
    averageLatency: 145 
  }

Requirements:
  - Implement request deduplication for identical requests
  - Use connection pooling for HTTP optimization
  - Cache responses intelligently
  - Measure and optimize performance metrics
  - Handle concurrent request optimization

Time Complexity: O(1) for cache hits, O(n) for new requests
Space Complexity: O(n) for cache and pool management

Hints:
  - Use Map for request deduplication by URL+params
  - Implement connection reuse for HTTP/1.1 and HTTP/2
  - Cache responses with appropriate TTL
  - Track metrics: latency, cache hit rate, pool usage
  - Optimize for both throughput and latency
*/

export const functionName = 'createOptimizedApiClient';

export const tests = [
  {
    input: [{ dedupe: true, cache: true, poolSize: 3 }],
    expected: { 
      get: expect.any(Function),
      post: expect.any(Function),
      getMetrics: expect.any(Function),
      clearCache: expect.any(Function),
      destroy: expect.any(Function)
    }
  },
  {
    input: [{ dedupe: false, cache: false, poolSize: 1 }],
    expected: { 
      get: expect.any(Function),
      post: expect.any(Function),
      getMetrics: expect.any(Function),
      clearCache: expect.any(Function),
      destroy: expect.any(Function)
    }
  }
];