/**
 * These tests import from ./broken — fix broken.ts to make them pass.
 * Do NOT modify this test file.
 */
import { describe, it, expect } from 'vitest';
import { processUserData } from './broken';

describe('processUserData (fix the bugs in broken.ts)', () => {
  it('resolves with a user object (not a Promise)', async () => {
    const result = await processUserData(1);

    // If Bug 1 is not fixed, result.user will be a Promise object
    expect(result.user).not.toBeInstanceOf(Promise);
    expect(typeof result.user).toBe('object');
  });

  it('returns user with correct id', async () => {
    const result = await processUserData(42);
    expect(result.user.id).toBe(42);
  });

  it('returns user with correct name and email', async () => {
    const result = await processUserData(5);
    expect(result.user.name).toBe('User 5');
    expect(result.user.email).toBe('user5@example.com');
  });

  it('fetches posts for the correct userId', async () => {
    const result = await processUserData(7);
    // If Bug 2 is not fixed, posts will be fetched for userId=undefined
    result.posts.forEach((_post) => {
      // Posts are linked to the user — they should all exist
      expect(_post).toBeDefined();
    });
    expect(result.posts.length).toBeGreaterThan(0);
  });

  it('returns enriched posts (not promises)', async () => {
    const result = await processUserData(1);

    // If Bug 3 is not fixed, each post will be a Promise object
    result.posts.forEach((post) => {
      expect(post).not.toBeInstanceOf(Promise);
      expect(typeof post.wordCount).toBe('number');
    });
  });

  it('enriched posts have correct wordCount', async () => {
    const result = await processUserData(1);

    // 'Hello World' post has 7 words: "This is my first post about coding"
    const firstPost = result.posts.find((p) => p.title === 'Hello World');
    expect(firstPost).toBeDefined();
    expect(firstPost?.wordCount).toBe(7);

    // 'TypeScript Tips' post has 6 words: "Use strict mode for better type safety"
    const secondPost = result.posts.find((p) => p.title === 'TypeScript Tips');
    expect(secondPost).toBeDefined();
    expect(secondPost?.wordCount).toBe(7);
  });

  it('returns processedAt as a valid ISO date string', async () => {
    const result = await processUserData(1);
    expect(typeof result.processedAt).toBe('string');
    expect(() => new Date(result.processedAt)).not.toThrow();
    expect(new Date(result.processedAt).toString()).not.toBe('Invalid Date');
  });

  it('returns posts array (not undefined or null)', async () => {
    const result = await processUserData(1);
    expect(Array.isArray(result.posts)).toBe(true);
    expect(result.posts.length).toBe(2);
  });
});
