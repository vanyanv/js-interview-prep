/**
 * CANCELABLE ASYNC OPERATIONS
 *
 * Implement cancelable async operations using AbortController.
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
  // TODO: implement makeCancelable
  throw new Error('Not implemented');
}

export async function createCancelableTask<T>(
  steps: (() => T | Promise<T>)[],
  signal: AbortSignal
): Promise<T[]> {
  // TODO: run each step, checking signal.aborted before each one
  throw new Error('Not implemented');
}
