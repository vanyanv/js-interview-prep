import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { makeCancelable, createCancelableTask, CancelError } from './solution';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe('makeCancelable', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('resolves with the result if not canceled', async () => {
    const { promise } = makeCancelable(async (_signal) => {
      return 'result';
    });

    const result = await promise;
    expect(result).toBe('result');
  });

  it('rejects with CancelError when canceled', async () => {
    const { promise, cancel } = makeCancelable(async (_signal) => {
      await delay(5000);
      return 'result';
    });

    cancel();
    vi.advanceTimersByTime(0);

    await expect(promise).rejects.toBeInstanceOf(CancelError);
  });

  it('cancel() sets canceled to true', () => {
    const cancelable = makeCancelable(async () => 'x');
    expect(cancelable.canceled).toBe(false);
    cancelable.cancel();
    expect(cancelable.canceled).toBe(true);
  });

  it('canceled stays false until cancel() is called', () => {
    const { canceled } = makeCancelable(async () => 'x');
    expect(canceled).toBe(false);
  });

  it('calling cancel() multiple times is safe', () => {
    const { cancel } = makeCancelable(async () => 'x');
    expect(() => {
      cancel();
      cancel();
      cancel();
    }).not.toThrow();
  });

  it('resolved promise is not affected by a later cancel', async () => {
    const { promise, cancel } = makeCancelable(async () => 'fast');
    const result = await promise;
    expect(result).toBe('fast');

    // Cancel after resolution — should be a no-op
    expect(() => cancel()).not.toThrow();
  });

  it('passes signal to the function', async () => {
    let receivedSignal: AbortSignal | null = null;
    const { promise } = makeCancelable(async (signal) => {
      receivedSignal = signal;
      return 'ok';
    });

    await promise;
    expect(receivedSignal).toBeInstanceOf(AbortSignal);
  });

  it('signal is aborted when cancel() is called', async () => {
    let capturedSignal: AbortSignal | undefined;

    const { promise, cancel } = makeCancelable(async (signal) => {
      capturedSignal = signal;
      await delay(5000);
      return 'x';
    });

    cancel();
    vi.advanceTimersByTime(0);

    try {
      await promise;
    } catch {
      // expected
    }

    expect(capturedSignal?.aborted).toBe(true);
  });
});

describe('createCancelableTask', () => {
  it('runs all steps and returns results', async () => {
    const controller = new AbortController();
    const steps = [() => 1, () => 2, () => 3];
    const results = await createCancelableTask(steps, controller.signal);
    expect(results).toEqual([1, 2, 3]);
  });

  it('supports async steps', async () => {
    const controller = new AbortController();
    const steps = [
      async () => {
        await Promise.resolve();
        return 'a';
      },
      async () => 'b',
    ];
    const results = await createCancelableTask(steps, controller.signal);
    expect(results).toEqual(['a', 'b']);
  });

  it('throws CancelError if signal is aborted before first step', async () => {
    const controller = new AbortController();
    controller.abort('canceled early');

    const steps = [() => 1, () => 2];
    await expect(createCancelableTask(steps, controller.signal)).rejects.toBeInstanceOf(
      CancelError
    );
  });

  it('throws CancelError mid-task when aborted between steps', async () => {
    const controller = new AbortController();
    const executedSteps: number[] = [];

    const steps = [
      () => {
        executedSteps.push(1);
        return 'step1';
      },
      () => {
        controller.abort('canceled between steps');
        executedSteps.push(2);
        return 'step2';
      },
      () => {
        executedSteps.push(3); // should NOT run
        return 'step3';
      },
    ];

    await expect(createCancelableTask(steps, controller.signal)).rejects.toBeInstanceOf(
      CancelError
    );

    // Step 3 should not have been executed
    expect(executedSteps).toContain(1);
    expect(executedSteps).toContain(2);
    expect(executedSteps).not.toContain(3);
  });

  it('returns empty array for empty steps', async () => {
    const controller = new AbortController();
    const results = await createCancelableTask([], controller.signal);
    expect(results).toEqual([]);
  });
});
