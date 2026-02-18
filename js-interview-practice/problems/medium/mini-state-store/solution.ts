/**
 * ⚠️  SOLUTION FILE — Do not open until you've attempted starter.ts!
 * ─────────────────────────────────────────────────────────────────
 */

export type Reducer<S, A> = (state: S, action: A) => S;

export interface Store<S, A> {
  getState(): S;
  dispatch(action: A): void;
  subscribe(listener: () => void): () => void;
}

export function createStore<S, A>(reducer: Reducer<S, A>, initialState: S): Store<S, A> {
  let currentState = initialState;
  const listeners = new Set<() => void>();

  function getState(): S {
    return currentState;
  }

  function dispatch(action: A): void {
    // Pure reducer transforms old state → new state
    currentState = reducer(currentState, action);

    // Notify all subscribers after state update
    // Copy Set to avoid issues if a listener unsubscribes during notification
    [...listeners].forEach((listener) => listener());
  }

  function subscribe(listener: () => void): () => void {
    listeners.add(listener);

    // Return an unsubscribe function
    return () => {
      listeners.delete(listener);
    };
  }

  return { getState, dispatch, subscribe };
}
