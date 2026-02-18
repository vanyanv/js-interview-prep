import { describe, it, expect, vi } from 'vitest';
import { promisePool } from './solution';

// Helper: creates a delayed task
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function makeTask<T>(value: T, delayMs = 0): () => Promise<T> {
  return async () => {
    await delay(delayMs);
    return value;
  };
}

describe('promisePool', () => {
  it('returns results in input order', async () => {
    const tasks = [makeTask(1), makeTask(2), makeTask(3)];
    const results = await promisePool(tasks, 2);
    expect(results).toEqual([1, 2, 3]);
  });

  it('returns empty array for no tasks', async () => {
    const results = await promisePool([], 3);
    expect(results).toEqual([]);
  });

  it('respects concurrency limit', async () => {
    let running = 0;
    let maxRunning = 0;

    function makeTrackedTask(): () => Promise<void> {
      return async () => {
        running++;
        maxRunning = Math.max(maxRunning, running);
        await delay(50);
        running--;
      };
    }

    const tasks = Array.from({ length: 10 }, makeTrackedTask);
    await promisePool(tasks, 3);

    expect(maxRunning).toBeLessThanOrEqual(3);
  });

  it('starts new tasks as soon as a slot opens up', async () => {
    const startTimes: number[] = [];
    const start = Date.now();

    // Each task takes 100ms, concurrency = 2
    // Tasks 0,1 start at t=0
    // Tasks 2,3 start at t≈100ms
    function makeTimedTask(): () => Promise<void> {
      return async () => {
        startTimes.push(Date.now() - start);
        await delay(100);
      };
    }

    const tasks = Array.from({ length: 4 }, makeTimedTask);
    await promisePool(tasks, 2);

    // First two start near t=0
    expect(startTimes[0]).toBeLessThan(20);
    expect(startTimes[1]).toBeLessThan(20);
    // Next two start after first batch completes
    expect(startTimes[2]).toBeGreaterThan(80);
    expect(startTimes[3]).toBeGreaterThan(80);
  });

  it('works with concurrency of 1 (sequential)', async () => {
    const order: number[] = [];

    const tasks = [0, 1, 2].map((i) => async () => {
      order.push(i);
      await delay(10);
      return i;
    });

    const results = await promisePool(tasks, 1);
    expect(results).toEqual([0, 1, 2]);
    expect(order).toEqual([0, 1, 2]);
  });

  it('works when concurrency exceeds task count', async () => {
    const tasks = [makeTask('a'), makeTask('b')];
    const results = await promisePool(tasks, 100);
    expect(results).toEqual(['a', 'b']);
  });

  it('rejects if any task rejects', async () => {
    const tasks = [
      makeTask(1),
      async (): Promise<number> => {
        await delay(10);
        throw new Error('task failed');
      },
      makeTask(3),
    ];

    await expect(promisePool(tasks, 2)).rejects.toThrow('task failed');
  });

  it('handles tasks that resolve with different types', async () => {
    const stringTasks = [makeTask('hello'), makeTask('world')];
    const results = await promisePool(stringTasks, 2);
    expect(results).toEqual(['hello', 'world']);
  });

  it('calls each task factory exactly once', async () => {
    const factories = Array.from({ length: 5 }, (_, i) => vi.fn(makeTask(i)));
    await promisePool(factories, 2);
    factories.forEach((factory) => expect(factory).toHaveBeenCalledTimes(1));
  });

  it('maintains correct order even with varying task durations', async () => {
    // Task 0 is slow, tasks 1 and 2 are fast
    // With concurrency=2: task 0 and task 1 start simultaneously
    // Task 1 finishes first, then task 2 starts
    // Despite different completion order, results should match input order
    const tasks = [
      async () => {
        await delay(100);
        return 'slow';
      },
      async () => {
        await delay(10);
        return 'fast-1';
      },
      async () => {
        await delay(10);
        return 'fast-2';
      },
    ];

    const results = await promisePool(tasks, 2);
    expect(results).toEqual(['slow', 'fast-1', 'fast-2']);
  });
});
