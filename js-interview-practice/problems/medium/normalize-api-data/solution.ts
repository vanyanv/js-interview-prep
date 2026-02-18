/**
 * ⚠️  SOLUTION FILE — Do not open until you've attempted starter.ts!
 * ─────────────────────────────────────────────────────────────────
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
  const result: NormalizedData = {
    posts: {},
    users: {},
    comments: {},
  };

  function addUser(user: User): void {
    // Users with the same ID are merged — first occurrence wins
    if (!result.users[user.id]) {
      result.users[user.id] = { id: user.id, name: user.name };
    }
  }

  for (const post of posts) {
    // Collect the post's author
    addUser(post.author);

    // Normalize comments
    const commentIds: number[] = [];
    for (const comment of post.comments) {
      addUser(comment.author);

      result.comments[comment.id] = {
        id: comment.id,
        text: comment.text,
        authorId: comment.author.id,
      };

      commentIds.push(comment.id);
    }

    // Normalize the post itself
    result.posts[post.id] = {
      id: post.id,
      title: post.title,
      authorId: post.author.id,
      commentIds,
    };
  }

  return result;
}
