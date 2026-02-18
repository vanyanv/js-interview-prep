/**
 * ⚠️  SOLUTION FILE — Do not open until you've attempted starter.ts!
 * ─────────────────────────────────────────────────────────────────
 */

export interface RetryOptions {
  maxAttempts: number;
  baseDelayMs: number;
  maxDelayMs?: number;
  jitter?: boolean;
  shouldRetry?: (error: unknown) => boolean;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function computeDelay(attempt: number, options: RetryOptions): number {
  const { baseDelayMs, maxDelayMs, jitter = true } = options;

  // Exponential backoff: base * 2^attempt
  let delay = baseDelayMs * Math.pow(2, attempt);

  // Cap at maxDelayMs if specified
  if (maxDelayMs !== undefined) {
    delay = Math.min(delay, maxDelayMs);
  }

  // Full jitter: add random amount in [0, baseDelayMs]
  if (jitter) {
    delay += Math.random() * baseDelayMs;
  }

  return delay;
}

export async function retry<T>(fn: () => Promise<T>, options: RetryOptions): Promise<T> {
  const { maxAttempts, shouldRetry = () => true } = options;

  if (maxAttempts < 1) {
    throw new Error('maxAttempts must be at least 1');
  }

  let lastError: unknown;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      // eslint-disable-next-line no-await-in-loop -- intentional sequential retry
      return await fn();
    } catch (error) {
      lastError = error;

      // Check if we should retry (custom predicate)
      if (!shouldRetry(error)) {
        throw error;
      }

      // Don't wait after the last attempt
      if (attempt < maxAttempts - 1) {
        const delay = computeDelay(attempt, options);
        // eslint-disable-next-line no-await-in-loop -- intentional backoff between retries
        await sleep(delay);
      }
    }
  }

  // All attempts exhausted — rethrow the last error
  throw lastError;
}
