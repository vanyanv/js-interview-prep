# Mini State Store (Redux-lite)

**Difficulty:** Medium
**Category:** Frontend State / Design Patterns
**Estimated Time:** 35–45 minutes

---

## Problem

Implement a minimal Redux-like state store from scratch.

### Signature

```typescript
type Reducer<S, A> = (state: S, action: A) => S;

interface Store<S, A> {
  getState(): S;
  dispatch(action: A): void;
  subscribe(listener: () => void): () => void; // returns an unsubscribe function
}

function createStore<S, A>(reducer: Reducer<S, A>, initialState: S): Store<S, A>
```

---

## Requirements

- `getState()` returns the current state (do not mutate the returned value)
- `dispatch(action)` calls the reducer with the current state and action, updates state
- `subscribe(listener)` registers a listener that's called after every `dispatch`
- `subscribe` returns an **unsubscribe** function — calling it removes the listener
- State must not be directly mutatable from outside — use a closure or private field
- Listeners should not be called if state didn't change (optional: implement reference equality check)

---

## Examples

```typescript
interface AppState {
  count: number;
  user: string | null;
}

type Action =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'SET_USER'; payload: string };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'SET_USER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

const store = createStore(reducer, { count: 0, user: null });

const unsubscribe = store.subscribe(() => {
  console.log('state changed:', store.getState());
});

store.dispatch({ type: 'INCREMENT' }); // logs state
store.dispatch({ type: 'SET_USER', payload: 'Alice' }); // logs state

unsubscribe(); // stop listening
store.dispatch({ type: 'INCREMENT' }); // no log
```

---

## Hints

<details>
<summary>Hint 1</summary>

State lives in a closure variable. The `getState`, `dispatch`, and `subscribe` functions all close over the same state variable.

</details>

<details>
<summary>Hint 2</summary>

Store listeners in an array. `subscribe` adds to the array and returns a function that removes the listener from the array.

</details>

<details>
<summary>Hint 3</summary>

When dispatching, notify listeners **after** updating state, so they can call `getState()` and see the new state.

</details>

---

## Extension Challenges

After passing the tests, try these:

1. **Middleware** — implement `applyMiddleware` that lets you intercept dispatches (how Redux `thunk` works)
2. **Selectors** — add a `select(selectorFn)` method that only calls listeners when the selected value changes
3. **Time travel** — keep a history of all states to enable undo/redo

---

## Running Tests

```bash
npx vitest run problems/medium/mini-state-store/mini-state-store.test.ts
```

---

## Reflection

1. **What was difficult?**

2. **Why does the reducer receive the current state rather than mutating it?** (immutability, pure functions, time travel debugging)

3. **What happens if a listener throws an error during dispatch?**

4. **How does this compare to React's `useReducer` hook?**

5. **What does Redux's `combineReducers` do and how would you implement it?**
