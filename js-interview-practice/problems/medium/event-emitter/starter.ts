/**
 * EVENT EMITTER
 *
 * Implement a type-safe EventEmitter with on/off/once/emit.
 * Method chaining (returning `this`) should work.
 */

export type EventMap = Record<string, unknown[]>;

export class EventEmitter<Events extends EventMap> {
  // TODO: add storage for listeners

  on<K extends keyof Events>(event: K, listener: (...args: Events[K]) => void): this {
    // TODO: register listener
    throw new Error('Not implemented');
  }

  off<K extends keyof Events>(event: K, listener: (...args: Events[K]) => void): this {
    // TODO: remove specific listener
    throw new Error('Not implemented');
  }

  once<K extends keyof Events>(event: K, listener: (...args: Events[K]) => void): this {
    // TODO: listener fires once then auto-removes
    throw new Error('Not implemented');
  }

  emit<K extends keyof Events>(event: K, ...args: Events[K]): void {
    // TODO: call all listeners for this event
    throw new Error('Not implemented');
  }

  listenerCount<K extends keyof Events>(event: K): number {
    // TODO: return number of listeners
    throw new Error('Not implemented');
  }

  removeAllListeners(event?: keyof Events): this {
    // TODO: remove all listeners for event, or all events if undefined
    throw new Error('Not implemented');
  }
}
