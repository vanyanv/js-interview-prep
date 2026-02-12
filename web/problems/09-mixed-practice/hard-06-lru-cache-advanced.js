/*
Problem: LRU Cache Advanced
Difficulty: Hard
Category: Hash Map, Linked List, Design
LeetCode: #146 (Enhanced)
Pattern: Hash Map + Doubly Linked List + Data Structure Design
Mixed Patterns: Hash Map + Linked List + Cache Design + O(1) Operations

Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the LRUCache class:
- LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
- int get(int key) Return the value of the key if exists, otherwise return -1.
- void put(int key, int value) Update the value if key exists. Otherwise, add the key-value pair.
  If the number of keys exceeds capacity, evict the least recently used key.

The functions get and put must each run in O(1) average time complexity.

Enhanced features:
- Support for TTL (Time To Live)
- Cache statistics tracking
- Multiple eviction policies
- Batch operations

Example 1:
  Input: ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
         [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
  Output: [null, null, null, 1, null, -1, null, -1, 3, 4]

Time Complexity: O(1) for all operations
Space Complexity: O(capacity)

Pattern Notes:
  - Doubly linked list for O(1) insertion/deletion at any position
  - Hash map for O(1) key lookup to list nodes
  - Maintain head (most recent) and tail (least recent) pointers
  - Move accessed nodes to head, evict from tail
  - Handle edge cases: capacity 1, empty cache, duplicate keys

Interview Notes:
  - Follow-up: Support for different eviction policies (LFU, FIFO)
  - Follow-up: Thread-safe implementation
  - Follow-up: Persistent storage integration
  - Follow-up: Cache hierarchy with multiple levels
*/

export const functionName = 'LRUCache';

export const tests = [
  {
    input: [["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"], [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]],
    expected: [null, null, null, 1, null, -1, null, -1, 3, 4]
  },
  {
    input: [["LRUCache", "put", "get", "put", "get", "get"], [[1], [2, 1], [2], [3, 2], [2], [3]]],
    expected: [null, null, 1, null, -1, 2]
  },
  {
    input: [["LRUCache", "get", "put", "get"], [[1], [1], [1, 1], [1]]],
    expected: [null, -1, null, 1]
  }
];

/**
 * Advanced LRU Cache implementation with enhanced features
 */
class LRUCache {
    constructor(capacity, options = {}) {
        this.capacity = capacity;
        this.ttl = options.ttl || null; // Time to live in milliseconds
        this.evictionPolicy = options.evictionPolicy || 'LRU';
        this.enableStats = options.enableStats || false;

        // Core data structures
        this.cache = new Map(); // key -> node
        this.head = new ListNode(0, 0);
        this.tail = new ListNode(0, 0);
        this.head.next = this.tail;
        this.tail.prev = this.head;

        // Statistics
        this.stats = {
            hits: 0,
            misses: 0,
            evictions: 0,
            puts: 0,
            totalOperations: 0
        };

        // For LFU policy
        this.frequencies = new Map();
        this.minFrequency = 0;
    }

    /**
     * Gets value by key, returns -1 if not found
     * @param {number} key - Key to lookup
     * @return {number} Value associated with key, -1 if not found
     */
    get(key) {
        this.stats.totalOperations++;

        if (!this.cache.has(key)) {
            this.stats.misses++;
            return -1;
        }

        const node = this.cache.get(key);

        // Check TTL expiration
        if (this.ttl && Date.now() - node.timestamp > this.ttl) {
            this.cache.delete(key);
            this.removeNode(node);
            this.stats.misses++;
            return -1;
        }

        this.stats.hits++;

        // Update based on eviction policy
        if (this.evictionPolicy === 'LRU') {
            this.moveToHead(node);
        } else if (this.evictionPolicy === 'LFU') {
            this.updateFrequency(node);
        }

        node.timestamp = Date.now(); // Update access time
        return node.value;
    }

    /**
     * Puts key-value pair in cache
     * @param {number} key - Key to insert/update
     * @param {number} value - Value to associate with key
     * @return {void}
     */
    put(key, value) {
        this.stats.totalOperations++;
        this.stats.puts++;

        if (this.cache.has(key)) {
            // Update existing key
            const node = this.cache.get(key);
            node.value = value;
            node.timestamp = Date.now();

            if (this.evictionPolicy === 'LRU') {
                this.moveToHead(node);
            } else if (this.evictionPolicy === 'LFU') {
                this.updateFrequency(node);
            }
        } else {
            // Add new key
            const newNode = new ListNode(key, value);
            newNode.timestamp = Date.now();

            if (this.cache.size >= this.capacity) {
                this.evict();
            }

            this.cache.set(key, newNode);

            if (this.evictionPolicy === 'LRU') {
                this.addToHead(newNode);
            } else if (this.evictionPolicy === 'LFU') {
                this.addWithFrequency(newNode, 1);
                this.minFrequency = 1;
            } else { // FIFO
                this.addToHead(newNode);
            }
        }
    }

    /**
     * Evicts least recently/frequently used item based on policy
     */
    evict() {
        let nodeToRemove;

        if (this.evictionPolicy === 'LFU') {
            const minFreqList = this.frequencies.get(this.minFrequency);
            nodeToRemove = minFreqList.tail.prev;
            this.removeFromFrequency(nodeToRemove);
        } else {
            // LRU or FIFO - remove from tail
            nodeToRemove = this.tail.prev;
            this.removeNode(nodeToRemove);
        }

        this.cache.delete(nodeToRemove.key);
        this.stats.evictions++;
    }

    /**
     * Moves node to head (most recently used)
     * @param {ListNode} node - Node to move
     */
    moveToHead(node) {
        this.removeNode(node);
        this.addToHead(node);
    }

    /**
     * Adds node to head of list
     * @param {ListNode} node - Node to add
     */
    addToHead(node) {
        node.prev = this.head;
        node.next = this.head.next;
        this.head.next.prev = node;
        this.head.next = node;
    }

    /**
     * Removes node from list
     * @param {ListNode} node - Node to remove
     */
    removeNode(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    /**
     * Updates frequency for LFU policy
     * @param {ListNode} node - Node to update
     */
    updateFrequency(node) {
        const oldFreq = node.frequency;
        const newFreq = oldFreq + 1;

        // Remove from old frequency list
        this.removeFromFrequency(node);

        // Add to new frequency list
        this.addWithFrequency(node, newFreq);

        // Update minimum frequency if needed
        if (oldFreq === this.minFrequency &&
            (!this.frequencies.has(oldFreq) || this.frequencies.get(oldFreq).size === 0)) {
            this.minFrequency++;
        }
    }

    /**
     * Adds node with specific frequency
     * @param {ListNode} node - Node to add
     * @param {number} frequency - Frequency value
     */
    addWithFrequency(node, frequency) {
        node.frequency = frequency;

        if (!this.frequencies.has(frequency)) {
            const newList = new DoublyLinkedList();
            this.frequencies.set(frequency, newList);
        }

        this.frequencies.get(frequency).addToHead(node);
    }

    /**
     * Removes node from frequency list
     * @param {ListNode} node - Node to remove
     */
    removeFromFrequency(node) {
        const freq = node.frequency;
        const freqList = this.frequencies.get(freq);
        freqList.removeNode(node);

        if (freqList.size === 0) {
            this.frequencies.delete(freq);
        }
    }

    /**
     * Gets cache statistics
     * @return {Object} Statistics object
     */
    getStats() {
        const hitRate = this.stats.totalOperations > 0 ?
            this.stats.hits / this.stats.totalOperations : 0;

        return {
            ...this.stats,
            hitRate: Math.round(hitRate * 10000) / 100 + '%',
            size: this.cache.size,
            capacity: this.capacity,
            utilizationRate: Math.round((this.cache.size / this.capacity) * 10000) / 100 + '%'
        };
    }

    /**
     * Clears all cache entries
     */
    clear() {
        this.cache.clear();
        this.head.next = this.tail;
        this.tail.prev = this.head;
        this.frequencies.clear();
        this.minFrequency = 0;

        // Reset stats
        this.stats = {
            hits: 0,
            misses: 0,
            evictions: 0,
            puts: 0,
            totalOperations: 0
        };
    }

    /**
     * Gets all cache keys in order (most to least recent)
     * @return {number[]} Array of keys
     */
    keys() {
        const result = [];
        let current = this.head.next;

        while (current !== this.tail) {
            result.push(current.key);
            current = current.next;
        }

        return result;
    }

    /**
     * Batch get operation
     * @param {number[]} keys - Array of keys to get
     * @return {Object} Map of key -> value for found keys
     */
    batchGet(keys) {
        const result = {};
        for (const key of keys) {
            const value = this.get(key);
            if (value !== -1) {
                result[key] = value;
            }
        }
        return result;
    }

    /**
     * Batch put operation
     * @param {Object} keyValuePairs - Object with key-value pairs
     */
    batchPut(keyValuePairs) {
        for (const [key, value] of Object.entries(keyValuePairs)) {
            this.put(parseInt(key), value);
        }
    }

    /**
     * Sets TTL for the cache
     * @param {number} ttl - Time to live in milliseconds
     */
    setTTL(ttl) {
        this.ttl = ttl;
    }

    /**
     * Manually expires entries based on TTL
     */
    expireEntries() {
        if (!this.ttl) return;

        const now = Date.now();
        const keysToDelete = [];

        for (const [key, node] of this.cache.entries()) {
            if (now - node.timestamp > this.ttl) {
                keysToDelete.push(key);
            }
        }

        for (const key of keysToDelete) {
            const node = this.cache.get(key);
            this.cache.delete(key);
            this.removeNode(node);
        }
    }
}

/**
 * Node class for doubly linked list
 */
class ListNode {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
        this.frequency = 0;
        this.timestamp = Date.now();
    }
}

/**
 * Doubly linked list for LFU implementation
 */
class DoublyLinkedList {
    constructor() {
        this.head = new ListNode(0, 0);
        this.tail = new ListNode(0, 0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
        this.size = 0;
    }

    addToHead(node) {
        node.prev = this.head;
        node.next = this.head.next;
        this.head.next.prev = node;
        this.head.next = node;
        this.size++;
    }

    removeNode(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
        this.size--;
    }
}

export default LRUCache;