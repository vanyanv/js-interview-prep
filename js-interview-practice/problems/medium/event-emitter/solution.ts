/**
 * ⚠️  SOLUTION FILE — Do not open until you've attempted starter.ts!
 * ─────────────────────────────────────────────────────────────────
 */

export type EventMap = Record<string, unknown[]>;

type Listener<Args extends unknown[]> = (...args: Args) => void;

export class EventEmitter<Events extends EventMap> {
  // Map from event name → array of active listeners
  private readonly listeners = new Map<keyof Events, Listener<unknown[]>[]>();

  // Map from original listener → wrapper (used for once() cleanup)
  private readonly onceWrappers = new WeakMap<
    Listener<unknown[]>,
    Listener<unknown[]>
  >();

  on<K extends keyof Events>(event: K, listener: Listener<Events[K]>): this {
    const existing = this.listeners.get(event) ?? [];
    existing.push(listener as Listener<unknown[]>);
    this.listeners.set(event, existing);
    return this;
  }

  off<K extends keyof Events>(event: K, listener: Listener<Events[K]>): this {
    const existing = this.listeners.get(event);
    if (!existing) return this;

    // Check if this was a `once` listener — remove the wrapper
    const wrapped = this.onceWrappers.get(listener as Listener<unknown[]>);
    const toRemove = wrapped ?? (listener as Listener<unknown[]>);

    const updated = existing.filter((l) => l !== toRemove);
    this.listeners.set(event, updated);
    return this;
  }

  once<K extends keyof Events>(event: K, listener: Listener<Events[K]>): this {
    // Create a wrapper that fires the original listener, then removes itself
    const wrapper: Listener<unknown[]> = (...args) => {
      this.off(event, listener);
      (listener as Listener<unknown[]>)(...args);
    };

    // Store mapping so off() can find the wrapper given the original
    this.onceWrappers.set(listener as Listener<unknown[]>, wrapper);

    const existing = this.listeners.get(event) ?? [];
    existing.push(wrapper);
    this.listeners.set(event, existing);
    return this;
  }

  emit<K extends keyof Events>(event: K, ...args: Events[K]): void {
    const existing = this.listeners.get(event);
    if (!existing) return;

    // Copy the array before iterating — listeners may modify the array during emit (e.g., once)
    [...existing].forEach((listener) => listener(...(args as unknown[])));
  }

  listenerCount<K extends keyof Events>(event: K): number {
    return this.listeners.get(event)?.length ?? 0;
  }

  removeAllListeners(event?: keyof Events): this {
    if (event !== undefined) {
      this.listeners.delete(event);
    } else {
      this.listeners.clear();
    }
    return this;
  }
}
