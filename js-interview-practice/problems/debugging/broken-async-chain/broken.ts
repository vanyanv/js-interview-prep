/**
 * DEBUGGING CHALLENGE — Broken Async Chain
 *
 * This file has 3 subtle async bugs. Find and fix them.
 * The tests import from this file. Do NOT modify the test file.
 *
 * Run tests to see what's failing:
 *   npx vitest run problems/debugging/broken-async-chain/broken-async-chain.test.ts
 */

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface EnrichedPost {
  id: number;
  title: string;
  wordCount: number;
}

export interface UserResult {
  user: User;
  posts: EnrichedPost[];
  processedAt: string;
}

// These "API" functions simulate async data fetching
export async function fetchUser(id: number): Promise<User> {
  return {
    id,
    name: `User ${id}`,
    email: `user${id}@example.com`,
  };
}

export async function fetchPosts(userId: number): Promise<Post[]> {
  return [
    { id: 1, userId, title: 'Hello World', body: 'This is my first post about coding' },
    { id: 2, userId, title: 'TypeScript Tips', body: 'Use strict mode for better type safety' },
  ];
}

export async function enrichPost(post: Post): Promise<EnrichedPost> {
  return {
    id: post.id,
    title: post.title,
    wordCount: post.body.split(' ').length,
  };
}

// ─── BUG IS IN THIS FUNCTION ─────────────────────────────────────

export async function processUserData(userId: number): Promise<UserResult> {
  // Bug 1: missing await — user is a Promise<User>, not a User
  const user = fetchUser(userId);

  // Bug 2: user.id doesn't exist on a Promise — this will be undefined
  const posts = await fetchPosts(user.id);

  // Bug 3: enrichPost is async — map returns Promise<EnrichedPost>[], not EnrichedPost[]
  const enrichedPosts = posts.map((post) => enrichPost(post));

  return {
    user,
    posts: enrichedPosts,
    processedAt: new Date().toISOString(),
  };
}
