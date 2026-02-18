/**
 * RETRY WITH EXPONENTIAL BACKOFF
 *
 * Retry a failing async operation with exponential backoff and optional jitter.
 */

export interface RetryOptions {
  maxAttempts: number;
  baseDelayMs: number;
  maxDelayMs?: number;
  jitter?: boolean;
  shouldRetry?: (error: unknown) => boolean;
}

export async function retry<T>(fn: () => Promise<T>, options: RetryOptions): Promise<T> {
  // TODO: implement retry with exponential backoff
  throw new Error('Not implemented');
}
