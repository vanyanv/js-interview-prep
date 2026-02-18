import { describe, it, expect } from 'vitest';
import { v } from './solution';

describe('v.string()', () => {
  it('accepts a valid string', () => {
    const result = v.string().parse('hello');
    expect(result.success).toBe(true);
    if (result.success) expect(result.data).toBe('hello');
  });

  it('rejects a non-string', () => {
    const result = v.string().parse(42);
    expect(result.success).toBe(false);
  });

  it('rejects undefined when required', () => {
    const result = v.string().parse(undefined);
    expect(result.success).toBe(false);
  });

  it('accepts undefined when optional', () => {
    const result = v.string().optional().parse(undefined);
    expect(result.success).toBe(true);
  });

  it('enforces minLength', () => {
    expect(v.string().minLength(3).parse('ab').success).toBe(false);
    expect(v.string().minLength(3).parse('abc').success).toBe(true);
  });

  it('enforces maxLength', () => {
    expect(v.string().maxLength(3).parse('abcd').success).toBe(false);
    expect(v.string().maxLength(3).parse('abc').success).toBe(true);
  });

  it('validates email format', () => {
    expect(v.string().email().parse('alice@example.com').success).toBe(true);
    expect(v.string().email().parse('not-an-email').success).toBe(false);
    expect(v.string().email().parse('@missinglocal.com').success).toBe(false);
  });
});

describe('v.number()', () => {
  it('accepts a valid number', () => {
    const result = v.number().parse(42);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data).toBe(42);
  });

  it('rejects a non-number', () => {
    expect(v.number().parse('42').success).toBe(false);
    expect(v.number().parse(NaN).success).toBe(false);
  });

  it('accepts undefined when optional', () => {
    expect(v.number().optional().parse(undefined).success).toBe(true);
  });

  it('enforces min', () => {
    expect(v.number().min(0).parse(-1).success).toBe(false);
    expect(v.number().min(0).parse(0).success).toBe(true);
  });

  it('enforces max', () => {
    expect(v.number().max(100).parse(101).success).toBe(false);
    expect(v.number().max(100).parse(100).success).toBe(true);
  });

  it('enforces integer', () => {
    expect(v.number().integer().parse(3.14).success).toBe(false);
    expect(v.number().integer().parse(3).success).toBe(true);
  });
});

describe('v.boolean()', () => {
  it('accepts true and false', () => {
    expect(v.boolean().parse(true).success).toBe(true);
    expect(v.boolean().parse(false).success).toBe(true);
  });

  it('rejects non-booleans', () => {
    expect(v.boolean().parse(1).success).toBe(false);
    expect(v.boolean().parse('true').success).toBe(false);
  });

  it('accepts undefined when optional', () => {
    expect(v.boolean().optional().parse(undefined).success).toBe(true);
  });
});

describe('v.object()', () => {
  const UserSchema = v.object({
    name: v.string().minLength(1),
    email: v.string().email(),
    age: v.number().min(0).optional(),
  });

  it('accepts a valid object', () => {
    const result = UserSchema.parse({ name: 'Alice', email: 'alice@example.com' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe('Alice');
      expect(result.data.email).toBe('alice@example.com');
    }
  });

  it('rejects an invalid object with all errors collected', () => {
    const result = UserSchema.parse({ name: '', email: 'not-email', age: -1 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.length).toBeGreaterThan(1); // multiple errors collected
    }
  });

  it('rejects non-object input', () => {
    expect(UserSchema.parse(null).success).toBe(false);
    expect(UserSchema.parse('string').success).toBe(false);
    expect(UserSchema.parse([]).success).toBe(false);
  });

  it('prefixes errors with field name', () => {
    const result = UserSchema.parse({ name: '', email: 'x@x.com' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.some((e) => e.startsWith('name:'))).toBe(true);
    }
  });

  it('handles nested objects with dot-path errors', () => {
    const schema = v.object({
      user: v.object({
        name: v.string(),
      }),
    });

    const result = schema.parse({ user: { name: 123 } });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.some((e) => e.includes('user.name'))).toBe(true);
    }
  });
});

describe('v.array()', () => {
  it('accepts a valid array', () => {
    const result = v.array(v.string()).parse(['a', 'b', 'c']);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data).toEqual(['a', 'b', 'c']);
  });

  it('rejects non-array input', () => {
    expect(v.array(v.string()).parse('not-array').success).toBe(false);
  });

  it('collects errors from invalid elements', () => {
    const result = v.array(v.number()).parse([1, 'two', 3, 'four']);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors).toHaveLength(2);
      expect(result.errors[0]).toContain('[1]');
      expect(result.errors[1]).toContain('[3]');
    }
  });

  it('accepts an empty array', () => {
    const result = v.array(v.string()).parse([]);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data).toEqual([]);
  });

  it('validates arrays of objects', () => {
    const schema = v.array(v.object({ id: v.number() }));
    expect(schema.parse([{ id: 1 }, { id: 2 }]).success).toBe(true);
    expect(schema.parse([{ id: 1 }, { id: 'bad' }]).success).toBe(false);
  });
});
