/*
Problem: Infinite Scroll with Virtualization
Difficulty: Hard
Category: React Performance - Large Lists

Create an infinite scroll component with virtual scrolling for performance.

Example 1:
  Input: items = [...1000items], itemHeight = 50, containerHeight = 400
  Output: Renders only visible items + buffer, loads more on scroll

Example 2:
  Input: fetchMore = async (page) => {...}, hasMore = true
  Output: Automatically fetches next page when near bottom

Requirements:
  - Implement virtual scrolling for large lists
  - Load more data when approaching bottom
  - Handle dynamic item heights
  - Provide smooth scrolling experience
  - Optimize re-renders and memory usage

Time Complexity: O(k) where k is visible items
Space Complexity: O(n) for all loaded data

Hints:
  - Use Intersection Observer or scroll events
  - Calculate visible items based on scroll position
  - Implement buffer zones above/below viewport
  - Use absolute positioning for virtual items
  - Debounce scroll events for performance
*/

export const functionName = 'useInfiniteScroll';

export const tests = [
  {
    input: [{ itemHeight: 50, containerHeight: 400, totalItems: 1000 }],
    expected: {
      visibleItems: expect.any(Array),
      containerProps: expect.any(Object),
      isLoading: false,
      hasMore: true,
      loadMore: expect.any(Function)
    }
  },
  {
    input: [{ itemHeight: 80, containerHeight: 600, totalItems: 500 }],
    expected: {
      visibleItems: expect.any(Array),
      containerProps: expect.any(Object),
      isLoading: false,
      hasMore: true,
      loadMore: expect.any(Function)
    }
  }
];