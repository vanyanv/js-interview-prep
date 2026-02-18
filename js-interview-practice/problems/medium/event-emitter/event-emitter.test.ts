import { describe, it, expect, vi } from 'vitest';
import { EventEmitter } from './solution';

type TestEvents = {
  data: [value: number];
  message: [text: string, sender: string];
  close: [];
};

describe('EventEmitter', () => {
  it('calls a registered listener when event is emitted', () => {
    const emitter = new EventEmitter<TestEvents>();
    const fn = vi.fn();

    emitter.on('data', fn);
    emitter.emit('data', 42);

    expect(fn).toHaveBeenCalledOnce();
    expect(fn).toHaveBeenCalledWith(42);
  });

  it('calls multiple listeners for the same event', () => {
    const emitter = new EventEmitter<TestEvents>();
    const fn1 = vi.fn();
    const fn2 = vi.fn();

    emitter.on('data', fn1);
    emitter.on('data', fn2);
    emitter.emit('data', 1);

    expect(fn1).toHaveBeenCalledOnce();
    expect(fn2).toHaveBeenCalledOnce();
  });

  it('calls listeners in registration order', () => {
    const emitter = new EventEmitter<TestEvents>();
    const order: number[] = [];

    emitter.on('data', () => order.push(1));
    emitter.on('data', () => order.push(2));
    emitter.on('data', () => order.push(3));
    emitter.emit('data', 0);

    expect(order).toEqual([1, 2, 3]);
  });

  it('passes multiple arguments correctly', () => {
    const emitter = new EventEmitter<TestEvents>();
    const fn = vi.fn();

    emitter.on('message', fn);
    emitter.emit('message', 'hello', 'Alice');

    expect(fn).toHaveBeenCalledWith('hello', 'Alice');
  });

  it('handles events with no arguments', () => {
    const emitter = new EventEmitter<TestEvents>();
    const fn = vi.fn();

    emitter.on('close', fn);
    emitter.emit('close');

    expect(fn).toHaveBeenCalledOnce();
  });

  it('does not call listeners for different events', () => {
    const emitter = new EventEmitter<TestEvents>();
    const dataFn = vi.fn();

    emitter.on('data', dataFn);
    emitter.emit('close'); // different event

    expect(dataFn).not.toHaveBeenCalled();
  });

  it('off removes a specific listener', () => {
    const emitter = new EventEmitter<TestEvents>();
    const fn = vi.fn();

    emitter.on('data', fn);
    emitter.off('data', fn);
    emitter.emit('data', 1);

    expect(fn).not.toHaveBeenCalled();
  });

  it('off only removes the specified listener, not others', () => {
    const emitter = new EventEmitter<TestEvents>();
    const fn1 = vi.fn();
    const fn2 = vi.fn();

    emitter.on('data', fn1);
    emitter.on('data', fn2);
    emitter.off('data', fn1);
    emitter.emit('data', 1);

    expect(fn1).not.toHaveBeenCalled();
    expect(fn2).toHaveBeenCalledOnce();
  });

  it('off is a no-op for an unregistered listener', () => {
    const emitter = new EventEmitter<TestEvents>();
    const fn = vi.fn();

    expect(() => emitter.off('data', fn)).not.toThrow();
  });

  it('once fires the listener exactly once', () => {
    const emitter = new EventEmitter<TestEvents>();
    const fn = vi.fn();

    emitter.once('data', fn);
    emitter.emit('data', 1);
    emitter.emit('data', 2);
    emitter.emit('data', 3);

    expect(fn).toHaveBeenCalledOnce();
    expect(fn).toHaveBeenCalledWith(1);
  });

  it('once listener can be removed with off before it fires', () => {
    const emitter = new EventEmitter<TestEvents>();
    const fn = vi.fn();

    emitter.once('data', fn);
    emitter.off('data', fn);
    emitter.emit('data', 1);

    expect(fn).not.toHaveBeenCalled();
  });

  it('listenerCount returns correct count', () => {
    const emitter = new EventEmitter<TestEvents>();
    const fn1 = vi.fn();
    const fn2 = vi.fn();

    expect(emitter.listenerCount('data')).toBe(0);
    emitter.on('data', fn1);
    expect(emitter.listenerCount('data')).toBe(1);
    emitter.on('data', fn2);
    expect(emitter.listenerCount('data')).toBe(2);
    emitter.off('data', fn1);
    expect(emitter.listenerCount('data')).toBe(1);
  });

  it('listenerCount decrements after once fires', () => {
    const emitter = new EventEmitter<TestEvents>();
    emitter.once('data', vi.fn());
    expect(emitter.listenerCount('data')).toBe(1);
    emitter.emit('data', 1);
    expect(emitter.listenerCount('data')).toBe(0);
  });

  it('removeAllListeners removes all listeners for a specific event', () => {
    const emitter = new EventEmitter<TestEvents>();
    const fn = vi.fn();

    emitter.on('data', fn);
    emitter.on('data', fn);
    emitter.removeAllListeners('data');
    emitter.emit('data', 1);

    expect(fn).not.toHaveBeenCalled();
  });

  it('removeAllListeners with no argument clears all events', () => {
    const emitter = new EventEmitter<TestEvents>();
    const dataFn = vi.fn();
    const closeFn = vi.fn();

    emitter.on('data', dataFn);
    emitter.on('close', closeFn);
    emitter.removeAllListeners();
    emitter.emit('data', 1);
    emitter.emit('close');

    expect(dataFn).not.toHaveBeenCalled();
    expect(closeFn).not.toHaveBeenCalled();
  });

  it('supports method chaining', () => {
    const emitter = new EventEmitter<TestEvents>();
    const fn = vi.fn();

    const result = emitter.on('data', fn).on('close', fn).removeAllListeners('close');
    expect(result).toBe(emitter);
  });

  it('emitting with no listeners does not throw', () => {
    const emitter = new EventEmitter<TestEvents>();
    expect(() => emitter.emit('data', 1)).not.toThrow();
  });
});
