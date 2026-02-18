# Data Validation Layer

**Difficulty:** Real-World
**Category:** Backend / Type Safety
**Estimated Time:** 40–50 minutes

---

## Problem

Build a type-safe validation library that validates unknown data against a schema. Think of it as a minimal Zod — just enough to demonstrate the pattern.

### What You're Building

```typescript
// Define a schema
const UserSchema = v.object({
  name: v.string().minLength(1).maxLength(100),
  email: v.string().email(),
  age: v.number().min(0).max(150).optional(),
});

// Validate unknown data
const result = UserSchema.parse(req.body);

if (result.success) {
  const user = result.data; // fully typed
} else {
  console.log(result.errors); // ['name: required', 'email: invalid format']
}
```

---

## Signature

```typescript
type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; errors: string[] };

interface Validator<T> {
  parse(value: unknown): ValidationResult<T>;
}

// Validators to implement:
const v = {
  string(): StringValidator,
  number(): NumberValidator,
  boolean(): BooleanValidator,
  object<S extends Record<string, Validator<unknown>>>(schema: S): ObjectValidator<S>,
  array<T>(itemValidator: Validator<T>): ArrayValidator<T>,
}
```

---

## Requirements

Implement these validators:

| Validator | Methods |
|-----------|---------|
| `string()` | `.minLength(n)`, `.maxLength(n)`, `.email()`, `.optional()` |
| `number()` | `.min(n)`, `.max(n)`, `.integer()`, `.optional()` |
| `boolean()` | `.optional()` |
| `object(schema)` | validates each key against its validator |
| `array(itemValidator)` | validates each element |

- Collect ALL errors (don't stop at first)
- Nest field paths in errors: `"address.city: required"`
- `.optional()` means the field may be absent or `undefined`

---

## Examples

```typescript
const schema = v.object({
  name: v.string().minLength(2),
  age: v.number().min(0).optional(),
  tags: v.array(v.string()),
});

schema.parse({ name: 'Alice', tags: ['js', 'ts'] });
// { success: true, data: { name: 'Alice', age: undefined, tags: ['js', 'ts'] } }

schema.parse({ name: 'A', age: -1, tags: [1, 'ts'] });
// { success: false, errors: ['name: must be at least 2 characters', 'age: must be >= 0', 'tags[0]: expected string'] }
```

---

## Running Tests

```bash
npx vitest run problems/real-world/data-validation-layer/data-validation-layer.test.ts
```

---

## Reflection

1. **What was difficult?**

2. **How does Zod's `.parse()` differ from your implementation?** (It throws on failure vs. returning a result)

3. **What is the "parse, don't validate" philosophy?**

4. **How would you add `.transform()` to convert/coerce values after validation?**

5. **What are the performance implications of validation on every request?**
