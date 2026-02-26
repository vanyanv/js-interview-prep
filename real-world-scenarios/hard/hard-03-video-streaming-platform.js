/*
Problem: Video Streaming Platform
Difficulty: Hard
Category: Real World - Media Platform

Build a video streaming platform with playlists, watch progress, and content recommendations.

Example 1:
  Input: platform.addVideo({ title: 'JS Tutorial', duration: 600, tags: ['javascript'] })
  Output: { id: 1, title: 'JS Tutorial', duration: 600, views: 0, ... }

Example 2:
  Input: platform.getRecommendations('user1', 5)
  Output: Top 5 videos based on user's watch history and preferences

Requirements:
  - Add videos with title, duration (seconds), tags, and creator
  - Create and manage playlists (add/remove/reorder videos)
  - Track watch progress per user per video (timestamp in seconds)
  - Resume playback from last position
  - Record video views and calculate view counts
  - Generate recommendations based on: watch history tags, popular videos, unwatched content
  - Search videos by title or tags
  - Get trending videos (most views in recent period)
  - Rate videos (1-5 stars) and calculate average rating

Time Complexity: O(n log n) for recommendations (sort by score), O(n) for search
Space Complexity: O(v + u * v) where v=videos and u=users

Hints:
  - Videos: Map<id, videoData>
  - Playlists: Map<playlistId, { name, videos: [] }>
  - Watch progress: Map<`${userId}-${videoId}`, { timestamp, completed }>
  - Recommendations: score = tag_match_count * 3 + views * 0.1 + rating * 2
  - A video is "trending" if it has high views relative to its age
*/

export const functionName = 'createStreamingPlatform';

export const tests = [
  {
    input: [
      [
        ['addVideo', { title: 'JS Basics', duration: 600, tags: ['javascript', 'tutorial'], creator: 'alice' }],
        ['addVideo', { title: 'React Hooks', duration: 900, tags: ['react', 'javascript'], creator: 'bob' }],
        ['addVideo', { title: 'CSS Grid', duration: 480, tags: ['css', 'tutorial'], creator: 'alice' }],
        ['searchVideos', 'javascript']
      ]
    ],
    expected: [
      { id: 1, title: 'JS Basics', duration: 600, tags: ['javascript', 'tutorial'], creator: 'alice', views: 0 },
      { id: 2, title: 'React Hooks', duration: 900, tags: ['react', 'javascript'], creator: 'bob', views: 0 }
    ]
  },
  {
    input: [
      [
        ['addVideo', { title: 'Video A', duration: 300, tags: ['js'], creator: 'alice' }],
        ['createPlaylist', 'user1', 'Favorites'],
        ['addToPlaylist', 1, 1],
        ['getPlaylist', 1]
      ]
    ],
    expected: { id: 1, name: 'Favorites', owner: 'user1', videos: [1] }
  },
  {
    input: [
      [
        ['addVideo', { title: 'Long Video', duration: 3600, tags: ['course'], creator: 'alice' }],
        ['watch', 'user1', 1, 120],
        ['getProgress', 'user1', 1]
      ]
    ],
    expected: { videoId: 1, timestamp: 120, duration: 3600, percentComplete: 3.33, completed: false }
  },
  {
    input: [
      [
        ['addVideo', { title: 'Short Video', duration: 60, tags: ['quick'], creator: 'alice' }],
        ['watch', 'user1', 1, 60],
        ['getProgress', 'user1', 1]
      ]
    ],
    expected: { videoId: 1, timestamp: 60, duration: 60, percentComplete: 100, completed: true }
  },
  {
    input: [
      [
        ['addVideo', { title: 'JS Basics', duration: 600, tags: ['javascript'], creator: 'alice' }],
        ['addVideo', { title: 'Advanced JS', duration: 900, tags: ['javascript'], creator: 'bob' }],
        ['addVideo', { title: 'CSS Intro', duration: 300, tags: ['css'], creator: 'alice' }],
        ['addVideo', { title: 'Node.js', duration: 720, tags: ['javascript', 'node'], creator: 'charlie' }],
        ['watch', 'user1', 1, 600],
        ['watch', 'user1', 2, 450],
        ['getRecommendations', 'user1', 2]
      ]
    ],
    expected: [
      { id: 4, title: 'Node.js', score: 3 },
      { id: 3, title: 'CSS Intro', score: 0 }
    ]
  },
  {
    input: [
      [
        ['addVideo', { title: 'Video A', duration: 300, tags: ['js'], creator: 'a' }],
        ['rateVideo', 'user1', 1, 5],
        ['rateVideo', 'user2', 1, 3],
        ['getAverageRating', 1]
      ]
    ],
    expected: 4
  },
  {
    input: [
      [
        ['addVideo', { title: 'Popular', duration: 300, tags: ['viral'], creator: 'a' }],
        ['addVideo', { title: 'Normal', duration: 300, tags: ['chill'], creator: 'b' }],
        ['watch', 'u1', 1, 300],
        ['watch', 'u2', 1, 300],
        ['watch', 'u3', 1, 300],
        ['watch', 'u1', 2, 300],
        ['getTrending', 2]
      ]
    ],
    expected: [
      { id: 1, title: 'Popular', views: 3 },
      { id: 2, title: 'Normal', views: 1 }
    ]
  }
];
