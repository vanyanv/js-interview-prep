/**
 * ⚠️  SOLUTION FILE — Do not open until you've attempted starter.ts!
 * ─────────────────────────────────────────────────────────────────
 */

export async function promisePool<T>(
  tasks: (() => Promise<T>)[],
  concurrency: number
): Promise<T[]> {
  if (tasks.length === 0) return [];

  const results: T[] = new Array(tasks.length);
  let nextIndex = 0;

  /**
   * A "worker" coroutine. Each worker repeatedly picks the next task
   * and runs it. When there are no more tasks, the worker finishes.
   */
  async function worker(): Promise<void> {
    while (nextIndex < tasks.length) {
      // Claim the next task index atomically
      // (safe because JS is single-threaded — no race conditions here)
      const index = nextIndex++;
      const task = tasks[index];
      if (task === undefined) break;

      // eslint-disable-next-line no-await-in-loop -- intentional sequential within each worker
      results[index] = await task();
    }
  }

  // Launch `concurrency` workers simultaneously
  const workers = Array.from({ length: Math.min(concurrency, tasks.length) }, () => worker());

  // Wait for all workers to finish — any rejection bubbles up here
  await Promise.all(workers);

  return results;
}
