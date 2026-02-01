/*
Problem: Render Props Pattern
Difficulty: Hard
Category: React Patterns - Component Composition

Create components using render props pattern for flexible composition.

Example 1:
  Input: <DataProvider render={({data, loading}) => <UI data={data} />} />
  Output: Flexible data fetching with custom UI

Example 2:
  Input: <Mouse render={({x, y}) => <Cursor x={x} y={y} />} />
  Output: Mouse tracking with custom rendering

Requirements:
  - Implement render props pattern
  - Support both render prop and children function
  - Handle complex state sharing scenarios
  - Provide clean separation of concerns
  - Compare with hooks alternative

Time Complexity: O(1)
Space Complexity: O(1)

Hints:
  - Accept render function as prop or children
  - Call render function with shared data/methods
  - Handle both function children and render props
  - Consider performance implications
  - Show migration path to hooks
*/

export const functionName = 'createRenderPropsComponents';

export const tests = [
  {
    input: ['MouseTracker'],
    expected: {
      MouseTracker: expect.any(Function),
      DataProvider: expect.any(Function),
      WindowSize: expect.any(Function),
      Toggle: expect.any(Function)
    }
  }
];