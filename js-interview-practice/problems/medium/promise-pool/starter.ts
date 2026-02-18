/**
 * PROMISE POOL
 *
 * Execute async tasks with a maximum concurrency limit.
 * At most `concurrency` tasks run at the same time.
 * Results are returned in input order.
 */

export async function promisePool<T>(
  tasks: (() => Promise<T>)[],
  concurrency: number
): Promise<T[]> {
  // TODO: implement promisePool
  throw new Error('Not implemented');
}
