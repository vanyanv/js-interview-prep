/**
 * RACE WITH TIMEOUT
 *
 * Race a promise against a timeout. Return the value if the promise
 * resolves first, or reject with TimeoutError if it takes too long.
 * Clean up the timer to prevent memory leaks.
 */

export class TimeoutError extends Error {
  constructor(
    message: string,
    public readonly timeoutMs: number
  ) {
    super(message);
    this.name = 'TimeoutError';
  }
}

export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  message?: string
): Promise<T> {
  // TODO: implement withTimeout with proper cleanup
  throw new Error('Not implemented');
}
