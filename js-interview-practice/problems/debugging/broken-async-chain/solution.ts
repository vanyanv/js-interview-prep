/**
 * ⚠️  SOLUTION FILE — Do not open until you've fixed broken.ts!
 * ─────────────────────────────────────────────────────────────────
 *
 * Fixed version of processUserData.
 * The 3 bugs were:
 * 1. Missing `await` on fetchUser — user was a Promise, not a User
 * 2. Accessing .id on a Promise (undefined) — caused fetchPosts to get wrong userId
 * 3. posts.map(enrichPost) returns Promise<EnrichedPost>[] — need Promise.all to resolve
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

export async function processUserData(userId: number): Promise<UserResult> {
  // Fix 1: await fetchUser
  const user = await fetchUser(userId);

  // Fix 2: user.id now correctly resolves to the user's ID
  const posts = await fetchPosts(user.id);

  // Fix 3: use Promise.all to resolve all enriched posts
  const enrichedPosts = await Promise.all(posts.map((post) => enrichPost(post)));

  return {
    user,
    posts: enrichedPosts,
    processedAt: new Date().toISOString(),
  };
}
