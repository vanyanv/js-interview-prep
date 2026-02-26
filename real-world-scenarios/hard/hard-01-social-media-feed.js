/*
Problem: Social Media Feed
Difficulty: Hard
Category: Real World - Social Platform

Build a social media platform with posts, likes, comments, followers, and an algorithmic feed.

Example 1:
  Input: platform.createPost('user1', 'Hello world!') → platform.likePost('user2', 1)
  Output: Post created and liked

Example 2:
  Input: platform.getFeed('user1')
  Output: Posts from followed users, sorted by recency and engagement

Requirements:
  - User management: create users, follow/unfollow
  - Create posts with text content
  - Like and unlike posts
  - Add comments to posts (nested replies)
  - Generate personalized feed (posts from followed users)
  - Feed ranking: combine recency and engagement (likes + comments)
  - Get user profile with post count, follower/following counts
  - Pagination support for feeds
  - Prevent self-follows and duplicate follows

Time Complexity: O(n log n) for feed generation (sort), O(1) for like/follow
Space Complexity: O(u + p + c) where u=users, p=posts, c=comments

Hints:
  - Use Maps for users, posts, and comments
  - Follow relationships: Map<userId, Set<followedUserIds>>
  - Feed algorithm: filter posts by followed users, score by (likes * 2 + comments + recency_bonus)
  - For pagination, use offset/limit pattern
  - Nested comments: store parentCommentId for threading
*/

export const functionName = 'createSocialPlatform';

export const tests = [
  {
    input: [
      [
        ['createUser', 'alice', 'Alice Smith'],
        ['createUser', 'bob', 'Bob Jones'],
        ['follow', 'alice', 'bob'],
        ['getProfile', 'alice']
      ]
    ],
    expected: { userId: 'alice', name: 'Alice Smith', posts: 0, followers: 0, following: 1 }
  },
  {
    input: [
      [
        ['createUser', 'alice', 'Alice'],
        ['createUser', 'bob', 'Bob'],
        ['createPost', 'alice', 'Hello from Alice!'],
        ['createPost', 'bob', 'Hello from Bob!'],
        ['follow', 'alice', 'bob'],
        ['getFeed', 'alice']
      ]
    ],
    expected: [
      { id: 2, author: 'bob', content: 'Hello from Bob!', likes: 0, commentCount: 0 }
    ]
  },
  {
    input: [
      [
        ['createUser', 'alice', 'Alice'],
        ['createUser', 'bob', 'Bob'],
        ['createPost', 'bob', 'Post 1'],
        ['createPost', 'bob', 'Post 2'],
        ['follow', 'alice', 'bob'],
        ['likePost', 'alice', 1],
        ['likePost', 'alice', 1]
      ]
    ],
    expected: { error: 'Already liked' }
  },
  {
    input: [
      [
        ['createUser', 'alice', 'Alice'],
        ['createUser', 'bob', 'Bob'],
        ['createPost', 'bob', 'Great post'],
        ['addComment', 'alice', 1, 'Nice!'],
        ['addComment', 'alice', 1, 'Really great!'],
        ['getComments', 1]
      ]
    ],
    expected: [
      { id: 1, postId: 1, author: 'alice', content: 'Nice!', parentId: null },
      { id: 2, postId: 1, author: 'alice', content: 'Really great!', parentId: null }
    ]
  },
  {
    input: [
      [
        ['createUser', 'alice', 'Alice'],
        ['createUser', 'bob', 'Bob'],
        ['createUser', 'charlie', 'Charlie'],
        ['createPost', 'bob', 'Low engagement'],
        ['createPost', 'charlie', 'High engagement'],
        ['follow', 'alice', 'bob'],
        ['follow', 'alice', 'charlie'],
        ['likePost', 'bob', 2],
        ['likePost', 'alice', 2],
        ['addComment', 'bob', 2, 'Great!'],
        ['getFeed', 'alice']
      ]
    ],
    expected: [
      { id: 2, author: 'charlie', content: 'High engagement', likes: 2, commentCount: 1 },
      { id: 1, author: 'bob', content: 'Low engagement', likes: 0, commentCount: 0 }
    ]
  },
  {
    input: [
      [
        ['createUser', 'alice', 'Alice'],
        ['follow', 'alice', 'alice']
      ]
    ],
    expected: { error: 'Cannot follow yourself' }
  },
  {
    input: [
      [
        ['createUser', 'alice', 'Alice'],
        ['createUser', 'bob', 'Bob'],
        ['createPost', 'bob', 'Post 1'],
        ['createPost', 'bob', 'Post 2'],
        ['createPost', 'bob', 'Post 3'],
        ['follow', 'alice', 'bob'],
        ['getFeed', 'alice', { limit: 2, offset: 0 }]
      ]
    ],
    expected: [
      { id: 3, author: 'bob', content: 'Post 3', likes: 0, commentCount: 0 },
      { id: 2, author: 'bob', content: 'Post 2', likes: 0, commentCount: 0 }
    ]
  },
  {
    input: [
      [
        ['createUser', 'alice', 'Alice'],
        ['createUser', 'bob', 'Bob'],
        ['follow', 'alice', 'bob'],
        ['unfollow', 'alice', 'bob'],
        ['getProfile', 'alice']
      ]
    ],
    expected: { userId: 'alice', name: 'Alice', posts: 0, followers: 0, following: 0 }
  }
];
