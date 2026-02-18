/**
 * ⚠️  SOLUTION FILE — Do not open until you've attempted starter.ts!
 * ─────────────────────────────────────────────────────────────────
 */

export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; errors: string[] };

export interface Validator<T> {
  parse(value: unknown, path?: string): ValidationResult<T>;
}

// ─── String Validator ────────────────────────────────────────────────────────

class StringValidator implements Validator<string> {
  private _optional = false;
  private _minLength?: number;
  private _maxLength?: number;
  private _isEmail = false;

  optional(): StringValidator {
    const clone = new StringValidator();
    clone._optional = true;
    clone._minLength = this._minLength;
    clone._maxLength = this._maxLength;
    clone._isEmail = this._isEmail;
    return clone;
  }

  minLength(n: number): StringValidator {
    const clone = new StringValidator();
    Object.assign(clone, this);
    clone._minLength = n;
    return clone;
  }

  maxLength(n: number): StringValidator {
    const clone = new StringValidator();
    Object.assign(clone, this);
    clone._maxLength = n;
    return clone;
  }

  email(): StringValidator {
    const clone = new StringValidator();
    Object.assign(clone, this);
    clone._isEmail = true;
    return clone;
  }

  parse(value: unknown, path = 'value'): ValidationResult<string> {
    const errors: string[] = [];

    if (value === undefined || value === null) {
      if (this._optional) return { success: true, data: value as unknown as string };
      errors.push(`${path}: required`);
      return { success: false, errors };
    }

    if (typeof value !== 'string') {
      errors.push(`${path}: expected string, got ${typeof value}`);
      return { success: false, errors };
    }

    if (this._minLength !== undefined && value.length < this._minLength) {
      errors.push(`${path}: must be at least ${this._minLength} characters`);
    }

    if (this._maxLength !== undefined && value.length > this._maxLength) {
      errors.push(`${path}: must be at most ${this._maxLength} characters`);
    }

    if (this._isEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errors.push(`${path}: invalid email format`);
      }
    }

    if (errors.length > 0) return { success: false, errors };
    return { success: true, data: value };
  }
}

// ─── Number Validator ────────────────────────────────────────────────────────

class NumberValidator implements Validator<number> {
  private _optional = false;
  private _min?: number;
  private _max?: number;
  private _integer = false;

  optional(): NumberValidator {
    const clone = new NumberValidator();
    Object.assign(clone, this);
    clone._optional = true;
    return clone;
  }

  min(n: number): NumberValidator {
    const clone = new NumberValidator();
    Object.assign(clone, this);
    clone._min = n;
    return clone;
  }

  max(n: number): NumberValidator {
    const clone = new NumberValidator();
    Object.assign(clone, this);
    clone._max = n;
    return clone;
  }

  integer(): NumberValidator {
    const clone = new NumberValidator();
    Object.assign(clone, this);
    clone._integer = true;
    return clone;
  }

  parse(value: unknown, path = 'value'): ValidationResult<number> {
    const errors: string[] = [];

    if (value === undefined || value === null) {
      if (this._optional) return { success: true, data: value as unknown as number };
      errors.push(`${path}: required`);
      return { success: false, errors };
    }

    if (typeof value !== 'number' || isNaN(value)) {
      errors.push(`${path}: expected number, got ${typeof value}`);
      return { success: false, errors };
    }

    if (this._min !== undefined && value < this._min) {
      errors.push(`${path}: must be >= ${this._min}`);
    }

    if (this._max !== undefined && value > this._max) {
      errors.push(`${path}: must be <= ${this._max}`);
    }

    if (this._integer && !Number.isInteger(value)) {
      errors.push(`${path}: must be an integer`);
    }

    if (errors.length > 0) return { success: false, errors };
    return { success: true, data: value };
  }
}

// ─── Boolean Validator ───────────────────────────────────────────────────────

class BooleanValidator implements Validator<boolean> {
  private _optional = false;

  optional(): BooleanValidator {
    const clone = new BooleanValidator();
    clone._optional = true;
    return clone;
  }

  parse(value: unknown, path = 'value'): ValidationResult<boolean> {
    if (value === undefined || value === null) {
      if (this._optional) return { success: true, data: value as unknown as boolean };
      return { success: false, errors: [`${path}: required`] };
    }

    if (typeof value !== 'boolean') {
      return { success: false, errors: [`${path}: expected boolean, got ${typeof value}`] };
    }

    return { success: true, data: value };
  }
}

// ─── Object Validator ────────────────────────────────────────────────────────

type SchemaType<S extends Record<string, Validator<unknown>>> = {
  [K in keyof S]: S[K] extends Validator<infer T> ? T : never;
};

class ObjectValidator<S extends Record<string, Validator<unknown>>>
  implements Validator<SchemaType<S>>
{
  constructor(private readonly schema: S) {}

  parse(value: unknown, path = ''): ValidationResult<SchemaType<S>> {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
      return { success: false, errors: [`${path || 'value'}: expected object`] };
    }

    const errors: string[] = [];
    const data: Record<string, unknown> = {};
    const record = value as Record<string, unknown>;

    for (const [key, validator] of Object.entries(this.schema)) {
      const fieldPath = path ? `${path}.${key}` : key;
      const result = validator.parse(record[key], fieldPath);

      if (result.success) {
        data[key] = result.data;
      } else {
        errors.push(...result.errors);
      }
    }

    if (errors.length > 0) return { success: false, errors };
    return { success: true, data: data as SchemaType<S> };
  }
}

// ─── Array Validator ─────────────────────────────────────────────────────────

class ArrayValidator<T> implements Validator<T[]> {
  constructor(private readonly itemValidator: Validator<T>) {}

  parse(value: unknown, path = 'value'): ValidationResult<T[]> {
    if (!Array.isArray(value)) {
      return { success: false, errors: [`${path}: expected array`] };
    }

    const errors: string[] = [];
    const data: T[] = [];

    for (let i = 0; i < value.length; i++) {
      const result = this.itemValidator.parse(value[i], `${path}[${i}]`);
      if (result.success) {
        data.push(result.data);
      } else {
        errors.push(...result.errors);
      }
    }

    if (errors.length > 0) return { success: false, errors };
    return { success: true, data };
  }
}

// ─── Public API ──────────────────────────────────────────────────────────────

export const v = {
  string(): StringValidator {
    return new StringValidator();
  },
  number(): NumberValidator {
    return new NumberValidator();
  },
  boolean(): BooleanValidator {
    return new BooleanValidator();
  },
  object<S extends Record<string, Validator<unknown>>>(schema: S): ObjectValidator<S> {
    return new ObjectValidator(schema);
  },
  array<T>(itemValidator: Validator<T>): ArrayValidator<T> {
    return new ArrayValidator(itemValidator);
  },
};
