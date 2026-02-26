/*
Problem: Blog CMS
Difficulty: Medium
Category: Real World - Content Management

Build a blog content management system with posts, tags, drafts, and publishing workflow.

Example 1:
  Input: cms.createPost({ title: 'Hello World', content: 'My first post', tags: ['intro'] })
  Output: { id: 1, title: 'Hello World', status: 'draft', tags: ['intro'], ... }

Example 2:
  Input: cms.publish(1) → cms.getPublished()
  Output: [{ id: 1, title: 'Hello World', status: 'published', publishedAt: Date, ... }]

Requirements:
  - Create posts with title, content, author, and tags
  - Posts start as 'draft' status
  - Publish and unpublish posts
  - Edit post content (only drafts can be edited, published posts must be unpublished first)
  - Search posts by title or content (case-insensitive)
  - Filter posts by tag
  - Filter posts by status (draft, published)
  - Get all unique tags across posts
  - Delete posts

Time Complexity: O(n) for search/filter, O(1) for CRUD by ID
Space Complexity: O(n * m) where n is posts and m is average content size

Hints:
  - Use Map for O(1) post lookup by ID
  - Status enum: draft, published
  - Track createdAt, updatedAt, publishedAt timestamps
  - Tags are arrays, use Set for unique tag aggregation
*/

export const functionName = 'createBlogCMS';

export const tests = [
  {
    input: [
      [
        ['createPost', { title: 'First Post', content: 'Hello world', author: 'Alice', tags: ['intro', 'general'] }],
        ['createPost', { title: 'JS Tips', content: 'Use const by default', author: 'Bob', tags: ['javascript', 'tips'] }],
        ['getAllPosts']
      ]
    ],
    expected: [
      { id: 1, title: 'First Post', content: 'Hello world', author: 'Alice', tags: ['intro', 'general'], status: 'draft' },
      { id: 2, title: 'JS Tips', content: 'Use const by default', author: 'Bob', tags: ['javascript', 'tips'], status: 'draft' }
    ]
  },
  {
    input: [
      [
        ['createPost', { title: 'My Post', content: 'Content here', author: 'Alice', tags: ['test'] }],
        ['publish', 1],
        ['getPublished']
      ]
    ],
    expected: [
      { id: 1, title: 'My Post', content: 'Content here', author: 'Alice', tags: ['test'], status: 'published' }
    ]
  },
  {
    input: [
      [
        ['createPost', { title: 'Draft Post', content: 'WIP', author: 'Alice', tags: [] }],
        ['publish', 1],
        ['editPost', 1, { content: 'Updated' }]
      ]
    ],
    expected: { error: 'Cannot edit published post' }
  },
  {
    input: [
      [
        ['createPost', { title: 'Draft Post', content: 'WIP', author: 'Alice', tags: [] }],
        ['editPost', 1, { content: 'Updated content', tags: ['updated'] }],
        ['getPost', 1]
      ]
    ],
    expected: { id: 1, title: 'Draft Post', content: 'Updated content', author: 'Alice', tags: ['updated'], status: 'draft' }
  },
  {
    input: [
      [
        ['createPost', { title: 'JavaScript Guide', content: 'Learn JS', author: 'Alice', tags: ['javascript'] }],
        ['createPost', { title: 'Python Guide', content: 'Learn Python', author: 'Bob', tags: ['python'] }],
        ['createPost', { title: 'Advanced JavaScript', content: 'Deep dive into JS', author: 'Alice', tags: ['javascript', 'advanced'] }],
        ['searchPosts', 'javascript']
      ]
    ],
    expected: [
      { id: 1, title: 'JavaScript Guide', content: 'Learn JS', author: 'Alice', tags: ['javascript'], status: 'draft' },
      { id: 3, title: 'Advanced JavaScript', content: 'Deep dive into JS', author: 'Alice', tags: ['javascript', 'advanced'], status: 'draft' }
    ]
  },
  {
    input: [
      [
        ['createPost', { title: 'Post A', content: 'A', author: 'Alice', tags: ['js', 'react'] }],
        ['createPost', { title: 'Post B', content: 'B', author: 'Bob', tags: ['python'] }],
        ['createPost', { title: 'Post C', content: 'C', author: 'Alice', tags: ['js'] }],
        ['getByTag', 'js']
      ]
    ],
    expected: [
      { id: 1, title: 'Post A', content: 'A', author: 'Alice', tags: ['js', 'react'], status: 'draft' },
      { id: 3, title: 'Post C', content: 'C', author: 'Alice', tags: ['js'], status: 'draft' }
    ]
  },
  {
    input: [
      [
        ['createPost', { title: 'A', content: 'a', author: 'X', tags: ['one', 'two'] }],
        ['createPost', { title: 'B', content: 'b', author: 'Y', tags: ['two', 'three'] }],
        ['getAllTags']
      ]
    ],
    expected: ['one', 'two', 'three']
  },
  {
    input: [
      [
        ['createPost', { title: 'To Delete', content: 'bye', author: 'Alice', tags: [] }],
        ['deletePost', 1],
        ['getAllPosts']
      ]
    ],
    expected: []
  }
];
