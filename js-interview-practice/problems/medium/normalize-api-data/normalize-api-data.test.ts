import { describe, it, expect } from 'vitest';
import { normalize, Post } from './solution';

const alice: { id: number; name: string } = { id: 10, name: 'Alice' };
const bob: { id: number; name: string } = { id: 11, name: 'Bob' };

const samplePosts: Post[] = [
  {
    id: 1,
    title: 'Hello World',
    author: alice,
    comments: [
      { id: 100, text: 'Nice post!', author: bob },
      { id: 101, text: 'Thanks', author: alice },
    ],
  },
  {
    id: 2,
    title: 'Another Post',
    author: bob,
    comments: [{ id: 102, text: 'Interesting', author: alice }],
  },
];

describe('normalize', () => {
  it('returns posts, users, and comments keys', () => {
    const result = normalize(samplePosts);
    expect(result).toHaveProperty('posts');
    expect(result).toHaveProperty('users');
    expect(result).toHaveProperty('comments');
  });

  it('normalizes posts by ID', () => {
    const result = normalize(samplePosts);
    expect(result.posts[1]).toBeDefined();
    expect(result.posts[2]).toBeDefined();
  });

  it('replaces nested author with authorId in posts', () => {
    const result = normalize(samplePosts);
    expect(result.posts[1]?.authorId).toBe(10);
    expect(result.posts[2]?.authorId).toBe(11);
    // No nested author object
    expect(result.posts[1]).not.toHaveProperty('author');
  });

  it('replaces nested comments with commentIds in posts', () => {
    const result = normalize(samplePosts);
    expect(result.posts[1]?.commentIds).toEqual([100, 101]);
    expect(result.posts[2]?.commentIds).toEqual([102]);
    // No nested comments array
    expect(result.posts[1]).not.toHaveProperty('comments');
  });

  it('normalizes comments by ID', () => {
    const result = normalize(samplePosts);
    expect(result.comments[100]).toEqual({ id: 100, text: 'Nice post!', authorId: 11 });
    expect(result.comments[101]).toEqual({ id: 101, text: 'Thanks', authorId: 10 });
    expect(result.comments[102]).toEqual({ id: 102, text: 'Interesting', authorId: 10 });
  });

  it('deduplicates users — same user referenced multiple times stored once', () => {
    const result = normalize(samplePosts);
    // Alice appears as post author, comment author twice
    // Bob appears as post author and comment author
    expect(Object.keys(result.users)).toHaveLength(2);
    expect(result.users[10]).toEqual({ id: 10, name: 'Alice' });
    expect(result.users[11]).toEqual({ id: 11, name: 'Bob' });
  });

  it('handles empty posts array', () => {
    const result = normalize([]);
    expect(result.posts).toEqual({});
    expect(result.users).toEqual({});
    expect(result.comments).toEqual({});
  });

  it('handles a post with no comments', () => {
    const post: Post = {
      id: 5,
      title: 'No Comments',
      author: alice,
      comments: [],
    };

    const result = normalize([post]);
    expect(result.posts[5]?.commentIds).toEqual([]);
    expect(result.users[10]).toBeDefined();
  });

  it('handles a single post with a single comment', () => {
    const post: Post = {
      id: 99,
      title: 'Solo',
      author: alice,
      comments: [{ id: 999, text: 'Only comment', author: bob }],
    };

    const result = normalize([post]);
    expect(result.posts[99]?.commentIds).toEqual([999]);
    expect(result.comments[999]?.authorId).toBe(11);
  });

  it('preserves post title', () => {
    const result = normalize(samplePosts);
    expect(result.posts[1]?.title).toBe('Hello World');
    expect(result.posts[2]?.title).toBe('Another Post');
  });
});
