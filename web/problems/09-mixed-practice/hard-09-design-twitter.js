/*
Problem: Design Twitter
Difficulty: Hard
Category: Hash Map, Linked List, Design, Heap
LeetCode: #355
Pattern: Data Structure Design + Hash Map + Priority Queue + Time-based Operations
Mixed Patterns: Hash Map + Heap + Linked List + Social Graph + Timeline Aggregation

Design a simplified version of Twitter where users can post tweets, follow/unfollow
another user, and see the 10 most recent tweets in the user's news feed.

Implement the Twitter class:
- Twitter() Initializes your twitter object
- void postTweet(int userId, int tweetId) Composes a new tweet with ID tweetId by user userId
- List<Integer> getNewsFeed(int userId) Retrieves the 10 most recent tweet IDs in the user's news feed
- void follow(int followerId, int followeeId) The user with ID followerId started following user followeeId
- void unfollow(int followerId, int followeeId) The user with ID followerId started unfollowing user followeeId

Example 1:
  Input: ["Twitter", "postTweet", "getNewsFeed", "follow", "postTweet", "getNewsFeed", "unfollow", "getNewsFeed"]
         [[], [1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]]
  Output: [null, null, [5], null, null, [6, 5], null, [5]]

Constraints:
  - 1 <= userId, followeeId, tweetId <= 500
  - 0 <= followerId <= 500
  - At most 3 * 10^4 calls will be made to the functions

Time Complexity: O(k log n) for getNewsFeed where k is feed size, n is total tweets
Space Complexity: O(U + T) where U is users, T is total tweets

Pattern Notes:
  - Use timestamp for chronological ordering of tweets
  - Hash map for user relationships and tweets
  - Priority queue/heap for efficient feed aggregation
  - Handle self-following and duplicate relationships
  - Optimize for read-heavy workload (common in social media)

Interview Notes:
  - Follow-up: Handle very large number of users and tweets
  - Follow-up: Add support for retweets and likes
  - Follow-up: Implement trending topics
  - Follow-up: Add privacy settings and blocking
*/

export const functionName = 'Twitter';

export const tests = [
  {
    input: [["Twitter", "postTweet", "getNewsFeed", "follow", "postTweet", "getNewsFeed", "unfollow", "getNewsFeed"], [[], [1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]]],
    expected: [null, null, [5], null, null, [6, 5], null, [5]]
  },
  {
    input: [["Twitter", "postTweet", "postTweet", "getNewsFeed"], [[], [1, 1], [1, 2], [1]]],
    expected: [null, null, null, [2, 1]]
  }
];

/**
 * Twitter implementation with advanced features
 */
class Twitter {
    constructor() {
        this.tweets = new Map(); // userId -> array of {tweetId, timestamp}
        this.following = new Map(); // userId -> Set of followeeIds
        this.timestamp = 0;

        // Advanced features
        this.likes = new Map(); // tweetId -> Set of userIds who liked
        this.retweets = new Map(); // tweetId -> Set of userIds who retweeted
        this.blocked = new Map(); // userId -> Set of blocked userIds
        this.trending = new Map(); // hashtag -> count
    }

    /**
     * Posts a new tweet
     * @param {number} userId - User posting the tweet
     * @param {number} tweetId - Unique tweet identifier
     * @return {void}
     */
    postTweet(userId, tweetId) {
        if (!this.tweets.has(userId)) {
            this.tweets.set(userId, []);
        }

        this.tweets.get(userId).push({
            tweetId,
            timestamp: this.timestamp++,
            userId,
            type: 'tweet'
        });

        // Keep only recent tweets per user for memory efficiency
        const userTweets = this.tweets.get(userId);
        if (userTweets.length > 100) {
            userTweets.shift();
        }
    }

    /**
     * Gets news feed for user (10 most recent tweets)
     * @param {number} userId - User requesting news feed
     * @return {number[]} Array of tweet IDs in chronological order (newest first)
     */
    getNewsFeed(userId) {
        const heap = new MaxHeap();

        // Get user's own tweets
        if (this.tweets.has(userId)) {
            const userTweets = this.tweets.get(userId);
            for (let i = userTweets.length - 1; i >= 0; i--) {
                heap.insert(userTweets[i]);
                if (heap.size() > 10) heap.extractMax();
            }
        }

        // Get tweets from followed users
        if (this.following.has(userId)) {
            for (const followeeId of this.following.get(userId)) {
                if (this.tweets.has(followeeId)) {
                    const followeeTweets = this.tweets.get(followeeId);
                    for (let i = followeeTweets.length - 1; i >= 0; i--) {
                        // Skip blocked users' tweets
                        if (this.isBlocked(userId, followeeId)) continue;

                        heap.insert(followeeTweets[i]);
                        if (heap.size() > 10) heap.extractMax();
                    }
                }
            }
        }

        // Extract tweets in reverse chronological order
        const result = [];
        const tweets = [];

        while (heap.size() > 0) {
            tweets.push(heap.extractMax());
        }

        // Sort by timestamp descending
        tweets.sort((a, b) => b.timestamp - a.timestamp);
        return tweets.slice(0, 10).map(tweet => tweet.tweetId);
    }

    /**
     * User starts following another user
     * @param {number} followerId - User who wants to follow
     * @param {number} followeeId - User to be followed
     * @return {void}
     */
    follow(followerId, followeeId) {
        if (followerId === followeeId) return; // Can't follow yourself

        if (!this.following.has(followerId)) {
            this.following.set(followerId, new Set());
        }

        this.following.get(followerId).add(followeeId);
    }

    /**
     * User stops following another user
     * @param {number} followerId - User who wants to unfollow
     * @param {number} followeeId - User to be unfollowed
     * @return {void}
     */
    unfollow(followerId, followeeId) {
        if (!this.following.has(followerId)) return;

        this.following.get(followerId).delete(followeeId);
    }

    /**
     * Extended: Like a tweet
     * @param {number} userId - User liking the tweet
     * @param {number} tweetId - Tweet to like
     * @return {void}
     */
    likeTweet(userId, tweetId) {
        if (!this.likes.has(tweetId)) {
            this.likes.set(tweetId, new Set());
        }

        this.likes.get(tweetId).add(userId);
    }

    /**
     * Extended: Unlike a tweet
     * @param {number} userId - User unliking the tweet
     * @param {number} tweetId - Tweet to unlike
     * @return {void}
     */
    unlikeTweet(userId, tweetId) {
        if (this.likes.has(tweetId)) {
            this.likes.get(tweetId).delete(userId);
        }
    }

    /**
     * Extended: Retweet a tweet
     * @param {number} userId - User retweeting
     * @param {number} tweetId - Tweet to retweet
     * @return {void}
     */
    retweet(userId, tweetId) {
        if (!this.retweets.has(tweetId)) {
            this.retweets.set(tweetId, new Set());
        }

        this.retweets.get(tweetId).add(userId);

        // Add retweet to user's timeline
        if (!this.tweets.has(userId)) {
            this.tweets.set(userId, []);
        }

        this.tweets.get(userId).push({
            tweetId,
            timestamp: this.timestamp++,
            userId,
            type: 'retweet',
            originalTweetId: tweetId
        });
    }

    /**
     * Extended: Block a user
     * @param {number} userId - User doing the blocking
     * @param {number} blockedUserId - User to block
     * @return {void}
     */
    blockUser(userId, blockedUserId) {
        if (!this.blocked.has(userId)) {
            this.blocked.set(userId, new Set());
        }

        this.blocked.get(userId).add(blockedUserId);

        // Automatically unfollow blocked user
        this.unfollow(userId, blockedUserId);
        this.unfollow(blockedUserId, userId);
    }

    /**
     * Extended: Unblock a user
     * @param {number} userId - User doing the unblocking
     * @param {number} unblockedUserId - User to unblock
     * @return {void}
     */
    unblockUser(userId, unblockedUserId) {
        if (this.blocked.has(userId)) {
            this.blocked.get(userId).delete(unblockedUserId);
        }
    }

    /**
     * Helper: Check if user is blocked
     * @param {number} userId - User checking
     * @param {number} otherUserId - Other user
     * @return {boolean} True if blocked
     */
    isBlocked(userId, otherUserId) {
        return this.blocked.has(userId) && this.blocked.get(userId).has(otherUserId);
    }

    /**
     * Extended: Get tweet statistics
     * @param {number} tweetId - Tweet to get stats for
     * @return {Object} Tweet statistics
     */
    getTweetStats(tweetId) {
        return {
            likes: this.likes.has(tweetId) ? this.likes.get(tweetId).size : 0,
            retweets: this.retweets.has(tweetId) ? this.retweets.get(tweetId).size : 0
        };
    }

    /**
     * Extended: Get user's followers count
     * @param {number} userId - User to get followers for
     * @return {number} Number of followers
     */
    getFollowersCount(userId) {
        let count = 0;
        for (const [followerId, followeeSet] of this.following.entries()) {
            if (followeeSet.has(userId)) {
                count++;
            }
        }
        return count;
    }

    /**
     * Extended: Get user's following count
     * @param {number} userId - User to get following count for
     * @return {number} Number of users being followed
     */
    getFollowingCount(userId) {
        return this.following.has(userId) ? this.following.get(userId).size : 0;
    }

    /**
     * Extended: Get trending topics
     * @param {number} limit - Number of trending topics to return
     * @return {string[]} Array of trending hashtags
     */
    getTrendingTopics(limit = 10) {
        const trends = Array.from(this.trending.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, limit)
            .map(([hashtag]) => hashtag);

        return trends;
    }

    /**
     * Extended: Search tweets by keyword
     * @param {string} keyword - Keyword to search for
     * @param {number} limit - Maximum results to return
     * @return {number[]} Array of matching tweet IDs
     */
    searchTweets(keyword, limit = 20) {
        const results = [];

        for (const [userId, userTweets] of this.tweets.entries()) {
            for (const tweet of userTweets) {
                // Simple keyword matching (could be enhanced with actual text storage)
                if (tweet.tweetId.toString().includes(keyword)) {
                    results.push(tweet);
                }
            }
        }

        return results
            .sort((a, b) => b.timestamp - a.timestamp)
            .slice(0, limit)
            .map(tweet => tweet.tweetId);
    }
}

/**
 * Max heap for efficient feed generation
 */
class MaxHeap {
    constructor() {
        this.heap = [];
    }

    insert(tweet) {
        this.heap.push(tweet);
        this.heapifyUp(this.heap.length - 1);
    }

    extractMax() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return max;
    }

    size() {
        return this.heap.length;
    }

    heapifyUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index].timestamp <= this.heap[parentIndex].timestamp) break;

            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }

    heapifyDown(index) {
        while (true) {
            let largest = index;
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;

            if (leftChild < this.heap.length &&
                this.heap[leftChild].timestamp > this.heap[largest].timestamp) {
                largest = leftChild;
            }

            if (rightChild < this.heap.length &&
                this.heap[rightChild].timestamp > this.heap[largest].timestamp) {
                largest = rightChild;
            }

            if (largest === index) break;

            [this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]];
            index = largest;
        }
    }
}

export default Twitter;