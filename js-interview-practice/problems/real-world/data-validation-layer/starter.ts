/**
 * DATA VALIDATION LAYER
 *
 * Build a minimal type-safe validation library.
 * Implement v.string(), v.number(), v.boolean(), v.object(), v.array()
 * with chainable constraint methods.
 */

export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; errors: string[] };

export interface Validator<T> {
  parse(value: unknown, path?: string): ValidationResult<T>;
}

// TODO: implement StringValidator, NumberValidator, BooleanValidator,
// ObjectValidator, ArrayValidator, and the `v` namespace

export const v = {
  string(): never {
    throw new Error('Not implemented');
  },
  number(): never {
    throw new Error('Not implemented');
  },
  boolean(): never {
    throw new Error('Not implemented');
  },
  object<S extends Record<string, Validator<unknown>>>(
    _schema: S
  ): never {
    throw new Error('Not implemented');
  },
  array<T>(_itemValidator: Validator<T>): never {
    throw new Error('Not implemented');
  },
};
