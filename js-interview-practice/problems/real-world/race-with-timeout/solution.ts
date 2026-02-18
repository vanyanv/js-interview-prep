/**
 * ⚠️  SOLUTION FILE — Do not open until you've attempted starter.ts!
 * ─────────────────────────────────────────────────────────────────
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
  let timerId: ReturnType<typeof setTimeout> | undefined;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timerId = setTimeout(() => {
      reject(
        new TimeoutError(
          message ? `${message} timed out after ${timeoutMs}ms` : `Timed out after ${timeoutMs}ms`,
          timeoutMs
        )
      );
    }, timeoutMs);
  });

  try {
    // Race: whichever settles first wins
    const result = await Promise.race([promise, timeoutPromise]);
    return result;
  } finally {
    // Always clear the timer — whether promise resolved, rejected, or timed out
    // Prevents the timer from holding the Node.js event loop open
    clearTimeout(timerId);
  }
}
