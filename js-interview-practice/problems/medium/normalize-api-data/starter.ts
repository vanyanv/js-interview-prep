/**
 * NORMALIZE API DATA
 *
 * Transform a nested API response into flat, normalized state.
 * Replace nested entities with ID references.
 */

export interface User {
  id: number;
  name: string;
}

export interface Comment {
  id: number;
  text: string;
  author: User;
}

export interface Post {
  id: number;
  title: string;
  author: User;
  comments: Comment[];
}

export interface NormalizedPost {
  id: number;
  title: string;
  authorId: number;
  commentIds: number[];
}

export interface NormalizedComment {
  id: number;
  text: string;
  authorId: number;
}

export interface NormalizedData {
  posts: Record<number, NormalizedPost>;
  users: Record<number, User>;
  comments: Record<number, NormalizedComment>;
}

export function normalize(posts: Post[]): NormalizedData {
  // TODO: implement normalize
  throw new Error('Not implemented');
}
