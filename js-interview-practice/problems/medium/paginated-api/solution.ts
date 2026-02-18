/**
 * ⚠️  SOLUTION FILE — Do not open until you've attempted starter.ts!
 * ─────────────────────────────────────────────────────────────────
 */
import { Router, Request, Response } from 'express';

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

function encodeCursor(id: string): string {
  return Buffer.from(id).toString('base64');
}

function decodeCursor(cursor: string): string {
  return Buffer.from(cursor, 'base64').toString('utf-8');
}

export function paginate<T>(options: PaginateOptions<T>): PaginatedResult<T> {
  const { items, cursor, limit, getId } = options;
  const total = items.length;

  let startIndex = 0;

  if (cursor) {
    const lastSeenId = decodeCursor(cursor);
    const lastSeenIndex = items.findIndex((item) => getId(item) === lastSeenId);

    if (lastSeenIndex === -1) {
      // Cursor points to a deleted/unknown item — start from beginning
      startIndex = 0;
    } else {
      startIndex = lastSeenIndex + 1;
    }
  }

  const pageItems = items.slice(startIndex, startIndex + limit);
  const hasMore = startIndex + limit < total;
  const lastItem = pageItems[pageItems.length - 1];
  const nextCursor = hasMore && lastItem ? encodeCursor(getId(lastItem)) : null;

  return {
    data: pageItems,
    nextCursor,
    hasMore,
    total,
  };
}

// Sample data
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

  router.get('/', (req: Request, res: Response): void => {
    const limit = Math.min(parseInt(String(req.query['limit'] ?? '10'), 10), 100);
    const cursor = req.query['cursor'] ? String(req.query['cursor']) : undefined;

    if (isNaN(limit) || limit <= 0) {
      res.status(400).json({ error: 'limit must be a positive integer' });
      return;
    }

    const result = paginate({
      items: users,
      cursor,
      limit,
      getId: (u) => u.id,
    });

    res.json(result);
  });

  return router;
}
