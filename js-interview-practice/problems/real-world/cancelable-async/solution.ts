/**
 * ⚠️  SOLUTION FILE — Do not open until you've attempted starter.ts!
 * ─────────────────────────────────────────────────────────────────
 */

export class CancelError extends Error {
  constructor(public readonly reason: string = 'Canceled') {
    super(reason);
    this.name = 'CancelError';
  }
}

export interface CancelablePromise<T> {
  promise: Promise<T>;
  cancel(reason?: string): void;
  readonly canceled: boolean;
}

export function makeCancelable<T>(
  fn: (signal: AbortSignal) => Promise<T>
): CancelablePromise<T> {
  const controller = new AbortController();
  let _canceled = false;

  // Create a promise that rejects when the signal is aborted
  const cancelPromise = new Promise<never>((_, reject) => {
    controller.signal.addEventListener('abort', () => {
      reject(new CancelError(controller.signal.reason as string | undefined ?? 'Canceled'));
    });
  });

  // Race between the actual work and the cancel signal
  const promise = Promise.race([fn(controller.signal), cancelPromise]);

  return {
    promise,
    cancel(reason = 'Canceled'): void {
      if (!_canceled) {
        _canceled = true;
        controller.abort(reason);
      }
    },
    get canceled(): boolean {
      return _canceled;
    },
  };
}

export async function createCancelableTask<T>(
  steps: (() => T | Promise<T>)[],
  signal: AbortSignal
): Promise<T[]> {
  const results: T[] = [];

  for (const step of steps) {
    // Check cancellation before each step
    if (signal.aborted) {
      throw new CancelError(signal.reason as string | undefined ?? 'Canceled');
    }

    // eslint-disable-next-line no-await-in-loop -- intentional sequential steps
    const result = await step();
    results.push(result);
  }

  return results;
}
