import { describe, it, expect, vi } from 'vitest';
import {
  UserService,
  UserRepository,
  RawUser,
  InvalidIdError,
  UserNotFoundError,
} from './refactored';

function makeRepo(overrides?: Partial<UserRepository>): UserRepository {
  return {
    findById: vi.fn().mockResolvedValue(null),
    update: vi.fn().mockResolvedValue(null),
    ...overrides,
  };
}

const aliceRaw: RawUser = {
  id: 1,
  firstName: 'Alice',
  lastName: 'Smith',
  birthYear: 1990,
};

describe('UserService (refactored)', () => {
  describe('getUser', () => {
    it('returns a user with fullName computed', async () => {
      const repo = makeRepo({ findById: vi.fn().mockResolvedValue(aliceRaw) });
      const service = new UserService(repo);

      const user = await service.getUser(1);
      expect(user.fullName).toBe('Alice Smith');
    });

    it('returns a user with age computed', async () => {
      const repo = makeRepo({ findById: vi.fn().mockResolvedValue(aliceRaw) });
      const service = new UserService(repo);

      const user = await service.getUser(1);
      const expectedAge = new Date().getFullYear() - aliceRaw.birthYear;
      expect(user.age).toBe(expectedAge);
    });

    it('throws InvalidIdError for non-positive id', async () => {
      const service = new UserService(makeRepo());
      await expect(service.getUser(0)).rejects.toBeInstanceOf(InvalidIdError);
      await expect(service.getUser(-1)).rejects.toBeInstanceOf(InvalidIdError);
    });

    it('throws UserNotFoundError when user does not exist', async () => {
      const repo = makeRepo({ findById: vi.fn().mockResolvedValue(null) });
      const service = new UserService(repo);
      await expect(service.getUser(999)).rejects.toBeInstanceOf(UserNotFoundError);
    });

    it('throws Error objects (not strings)', async () => {
      const service = new UserService(makeRepo());
      try {
        await service.getUser(-1);
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
      }
    });

    it('caches the user after first fetch', async () => {
      const findById = vi.fn().mockResolvedValue(aliceRaw);
      const service = new UserService(makeRepo({ findById }));

      await service.getUser(1);
      await service.getUser(1);
      await service.getUser(1);

      // Only fetched from db once — subsequent calls use cache
      expect(findById).toHaveBeenCalledTimes(1);
    });

    it('returns the same data from cache as from db', async () => {
      const repo = makeRepo({ findById: vi.fn().mockResolvedValue(aliceRaw) });
      const service = new UserService(repo);

      const first = await service.getUser(1);
      const second = await service.getUser(1);
      expect(second.fullName).toBe(first.fullName);
      expect(second.age).toBe(first.age);
    });

    it('caches different users independently', async () => {
      const bobRaw: RawUser = { id: 2, firstName: 'Bob', lastName: 'Jones', birthYear: 1985 };
      const findById = vi
        .fn()
        .mockResolvedValueOnce(aliceRaw)
        .mockResolvedValueOnce(bobRaw);
      const service = new UserService(makeRepo({ findById }));

      const alice = await service.getUser(1);
      const bob = await service.getUser(2);

      expect(alice.fullName).toBe('Alice Smith');
      expect(bob.fullName).toBe('Bob Jones');
      expect(findById).toHaveBeenCalledTimes(2);
    });
  });

  describe('updateUser', () => {
    it('returns the updated user with computed fields', async () => {
      const updatedRaw: RawUser = { ...aliceRaw, lastName: 'Jones' };
      const repo = makeRepo({ update: vi.fn().mockResolvedValue(updatedRaw) });
      const service = new UserService(repo);

      const result = await service.updateUser(1, { lastName: 'Jones' });
      expect(result.fullName).toBe('Alice Jones');
    });

    it('invalidates cache after update', async () => {
      const updatedRaw: RawUser = { ...aliceRaw, firstName: 'Alicia' };
      const findById = vi
        .fn()
        .mockResolvedValueOnce(aliceRaw)
        .mockResolvedValueOnce(updatedRaw);
      const update = vi.fn().mockResolvedValue(updatedRaw);
      const service = new UserService(makeRepo({ findById, update }));

      await service.getUser(1); // caches alice
      await service.updateUser(1, { firstName: 'Alicia' }); // invalidates cache
      const user = await service.getUser(1); // fetches fresh from db

      expect(user.fullName).toBe('Alicia Smith');
      expect(findById).toHaveBeenCalledTimes(2); // called again after cache invalidation
    });

    it('throws InvalidIdError for invalid id', async () => {
      const service = new UserService(makeRepo());
      await expect(service.updateUser(-5, {})).rejects.toBeInstanceOf(InvalidIdError);
    });
  });
});
