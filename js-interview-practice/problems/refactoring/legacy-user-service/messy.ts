/**
 * REFACTORING CHALLENGE — Legacy User Service
 *
 * This is a "God class" that mixes too many concerns.
 * Study what it does, then write a clean version in refactored.ts.
 *
 * Code smells to notice:
 * 1. `any` types everywhere
 * 2. throws a string instead of Error
 * 3. cache, validation, transformation, and fetching all inline
 * 4. magic string for error
 * 5. no type safety on the User object
 * 6. private state is directly mutated
 * 7. no separation of concerns
 */

export class MessyUserService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private cache: any = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private db: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(db: any) {
    this.db = db;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getUser(id: any): Promise<any> {
    // Validation
    if (!id || id <= 0 || typeof id !== 'number') {
      throw 'INVALID_ID'; // bad: throwing a string
    }

    // Check cache
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (this.cache[id]) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      return this.cache[id];
    }

    // Fetch from db
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const rawUser = await this.db.findById(id);

    if (!rawUser) {
      throw 'USER_NOT_FOUND'; // bad: throwing a string
    }

    // Transform
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    rawUser.fullName = rawUser.firstName + ' ' + rawUser.lastName;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    rawUser.age = new Date().getFullYear() - new Date(rawUser.birthYear as number).getFullYear();

    // Cache and return
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    this.cache[id] = rawUser;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return rawUser;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async updateUser(id: any, data: any): Promise<any> {
    // No validation, no type safety
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const updated = await this.db.update(id, data);
    // Bust cache
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    delete this.cache[id];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return updated;
  }
}
