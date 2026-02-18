/**
 * REFACTORING CHALLENGE — Write Your Clean Version Here
 *
 * Implement UserService with the same behavior as MessyUserService,
 * but with clean, strict TypeScript and good separation of concerns.
 *
 * The tests will import from this file.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RawUser {
  id: number;
  firstName: string;
  lastName: string;
  birthYear: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  birthYear: number;
  fullName: string;
  age: number;
}

export interface UserRepository {
  findById(id: number): Promise<RawUser | null>;
  update(id: number, data: Partial<RawUser>): Promise<RawUser>;
}

// ─── Errors ───────────────────────────────────────────────────────────────────

export class InvalidIdError extends Error {
  constructor(id: unknown) {
    super(`Invalid user ID: ${String(id)}`);
    this.name = 'InvalidIdError';
  }
}

export class UserNotFoundError extends Error {
  constructor(id: number) {
    super(`User not found: ${id}`);
    this.name = 'UserNotFoundError';
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function validateId(id: unknown): asserts id is number {
  if (typeof id !== 'number' || !Number.isInteger(id) || id <= 0) {
    throw new InvalidIdError(id);
  }
}

function computeAge(birthYear: number): number {
  return new Date().getFullYear() - birthYear;
}

function toUser(raw: RawUser): User {
  return {
    ...raw,
    fullName: `${raw.firstName} ${raw.lastName}`,
    age: computeAge(raw.birthYear),
  };
}

// ─── Service ──────────────────────────────────────────────────────────────────

export class UserService {
  private readonly cache = new Map<number, User>();

  constructor(private readonly repo: UserRepository) {}

  async getUser(id: number): Promise<User> {
    validateId(id);

    const cached = this.cache.get(id);
    if (cached) return cached;

    const raw = await this.repo.findById(id);
    if (!raw) throw new UserNotFoundError(id);

    const user = toUser(raw);
    this.cache.set(id, user);
    return user;
  }

  async updateUser(id: number, data: Partial<RawUser>): Promise<User> {
    validateId(id);
    const raw = await this.repo.update(id, data);
    const user = toUser(raw);
    // Invalidate cache after update
    this.cache.delete(id);
    return user;
  }
}
