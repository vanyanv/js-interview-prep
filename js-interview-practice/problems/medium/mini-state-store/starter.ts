/**
 * MINI STATE STORE
 *
 * Implement a minimal Redux-like store:
 * createStore(reducer, initialState) → { getState, dispatch, subscribe }
 */

export type Reducer<S, A> = (state: S, action: A) => S;

export interface Store<S, A> {
  getState(): S;
  dispatch(action: A): void;
  subscribe(listener: () => void): () => void;
}

export function createStore<S, A>(reducer: Reducer<S, A>, initialState: S): Store<S, A> {
  // TODO: implement
  throw new Error('Not implemented');
}
