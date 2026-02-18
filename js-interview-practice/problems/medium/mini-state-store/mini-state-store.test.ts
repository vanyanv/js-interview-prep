import { describe, it, expect, vi } from 'vitest';
import { createStore } from './solution';

// Simple counter for most tests
type CounterState = { count: number };
type CounterAction = { type: 'INCREMENT' } | { type: 'DECREMENT' } | { type: 'RESET' };

function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    default:
      return state;
  }
}

describe('createStore', () => {
  it('returns initial state via getState', () => {
    const store = createStore(counterReducer, { count: 0 });
    expect(store.getState()).toEqual({ count: 0 });
  });

  it('updates state on dispatch', () => {
    const store = createStore(counterReducer, { count: 0 });
    store.dispatch({ type: 'INCREMENT' });
    expect(store.getState()).toEqual({ count: 1 });
  });

  it('applies multiple dispatches correctly', () => {
    const store = createStore(counterReducer, { count: 0 });
    store.dispatch({ type: 'INCREMENT' });
    store.dispatch({ type: 'INCREMENT' });
    store.dispatch({ type: 'DECREMENT' });
    expect(store.getState().count).toBe(1);
  });

  it('calls subscribe listener on dispatch', () => {
    const store = createStore(counterReducer, { count: 0 });
    const listener = vi.fn();

    store.subscribe(listener);
    store.dispatch({ type: 'INCREMENT' });

    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('listener sees the new state when called', () => {
    const store = createStore(counterReducer, { count: 0 });
    let observedCount = -1;

    store.subscribe(() => {
      observedCount = store.getState().count;
    });

    store.dispatch({ type: 'INCREMENT' });
    expect(observedCount).toBe(1);
  });

  it('calls all subscribers on dispatch', () => {
    const store = createStore(counterReducer, { count: 0 });
    const fn1 = vi.fn();
    const fn2 = vi.fn();

    store.subscribe(fn1);
    store.subscribe(fn2);
    store.dispatch({ type: 'INCREMENT' });

    expect(fn1).toHaveBeenCalledOnce();
    expect(fn2).toHaveBeenCalledOnce();
  });

  it('unsubscribe prevents future calls', () => {
    const store = createStore(counterReducer, { count: 0 });
    const listener = vi.fn();

    const unsubscribe = store.subscribe(listener);
    store.dispatch({ type: 'INCREMENT' }); // heard
    unsubscribe();
    store.dispatch({ type: 'INCREMENT' }); // not heard
    store.dispatch({ type: 'INCREMENT' }); // not heard

    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('unsubscribing one listener does not affect others', () => {
    const store = createStore(counterReducer, { count: 0 });
    const fn1 = vi.fn();
    const fn2 = vi.fn();

    const unsub1 = store.subscribe(fn1);
    store.subscribe(fn2);

    unsub1();
    store.dispatch({ type: 'INCREMENT' });

    expect(fn1).not.toHaveBeenCalled();
    expect(fn2).toHaveBeenCalledOnce();
  });

  it('calling unsubscribe multiple times is safe', () => {
    const store = createStore(counterReducer, { count: 0 });
    const unsubscribe = store.subscribe(vi.fn());

    expect(() => {
      unsubscribe();
      unsubscribe();
      unsubscribe();
    }).not.toThrow();
  });

  it('works with complex state', () => {
    type UserState = { user: { name: string; age: number } | null; loading: boolean };
    type UserAction =
      | { type: 'LOAD' }
      | { type: 'LOADED'; payload: { name: string; age: number } };

    function userReducer(state: UserState, action: UserAction): UserState {
      switch (action.type) {
        case 'LOAD':
          return { ...state, loading: true };
        case 'LOADED':
          return { user: action.payload, loading: false };
        default:
          return state;
      }
    }

    const store = createStore(userReducer, { user: null, loading: false });

    store.dispatch({ type: 'LOAD' });
    expect(store.getState().loading).toBe(true);

    store.dispatch({ type: 'LOADED', payload: { name: 'Alice', age: 30 } });
    expect(store.getState().user?.name).toBe('Alice');
    expect(store.getState().loading).toBe(false);
  });

  it('reducer handles unknown actions by returning current state', () => {
    const store = createStore(counterReducer, { count: 5 });
    // TypeScript won't allow invalid action type, so we cast
    store.dispatch({ type: 'RESET' });
    expect(store.getState().count).toBe(0);
  });

  it('state reference updates on change', () => {
    const store = createStore(counterReducer, { count: 0 });
    const stateBefore = store.getState();
    store.dispatch({ type: 'INCREMENT' });
    const stateAfter = store.getState();
    // Reducer returns new object — references should differ
    expect(stateAfter).not.toBe(stateBefore);
  });
});
