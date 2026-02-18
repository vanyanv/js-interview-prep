/**
 * PAGINATED API
 *
 * Implement cursor-based pagination logic and an Express router.
 */
import { Router } from 'express';

export interface PaginateOptions<T> {
  items: T[];
  cursor?: string;
  limit: number;
  getId: (item: T) => string;
}

export interface PaginatedResult<T> {
  data: T[];
  nextCursor: string | null;
  hasMore: boolean;
  total: number;
}

export function paginate<T>(options: PaginateOptions<T>): PaginatedResult<T> {
  // TODO: implement cursor pagination
  throw new Error('Not implemented');
}

// Sample data for the Express route
interface User {
  id: string;
  name: string;
  email: string;
}

const users: User[] = Array.from({ length: 50 }, (_, i) => ({
  id: String(i + 1),
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
}));

export function createUsersRouter(): Router {
  const router = Router();

  // GET /users?limit=10&cursor=...
  router.get('/', (req, res) => {
    // TODO: parse query params and call paginate()
    throw new Error('Not implemented');
  });

  return router;
}
