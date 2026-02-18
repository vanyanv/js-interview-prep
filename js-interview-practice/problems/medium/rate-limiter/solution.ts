/**
 * ⚠️  SOLUTION FILE — Do not open until you've attempted starter.ts!
 * ─────────────────────────────────────────────────────────────────
 */
import type { Request, Response, NextFunction, RequestHandler } from 'express';

export interface RateLimiterOptions {
  windowMs: number;
  maxRequests: number;
}

export class RateLimiter {
  private readonly options: RateLimiterOptions;
  // Map from clientId → sorted array of request timestamps (oldest first)
  private readonly timestamps = new Map<string, number[]>();

  constructor(options: RateLimiterOptions) {
    this.options = options;
  }

  /**
   * Prune timestamps outside the current window.
   * Returns the active timestamps for a client.
   */
  private getActiveTimestamps(clientId: string): number[] {
    const now = Date.now();
    const windowStart = now - this.options.windowMs;
    const existing = this.timestamps.get(clientId) ?? [];

    // Remove timestamps that have fallen outside the window
    const active = existing.filter((ts) => ts > windowStart);
    this.timestamps.set(clientId, active);
    return active;
  }

  isAllowed(clientId: string): boolean {
    const active = this.getActiveTimestamps(clientId);

    if (active.length >= this.options.maxRequests) {
      return false;
    }

    // Record this request
    active.push(Date.now());
    return true;
  }

  getRemainingRequests(clientId: string): number {
    const active = this.getActiveTimestamps(clientId);
    return Math.max(0, this.options.maxRequests - active.length);
  }

  reset(clientId: string): void {
    this.timestamps.delete(clientId);
  }
}

export function createRateLimitMiddleware(options: RateLimiterOptions): RequestHandler {
  const limiter = new RateLimiter(options);

  return (req: Request, res: Response, next: NextFunction): void => {
    // Use IP address as client identifier; fall back to a header or 'unknown'
    const clientId = req.ip ?? req.headers['x-forwarded-for']?.toString() ?? 'unknown';

    if (!limiter.isAllowed(clientId)) {
      res.status(429).json({
        error: 'Too Many Requests',
        retryAfter: Math.ceil(options.windowMs / 1000),
      });
      return;
    }

    res.setHeader('X-RateLimit-Remaining', limiter.getRemainingRequests(clientId));
    next();
  };
}
