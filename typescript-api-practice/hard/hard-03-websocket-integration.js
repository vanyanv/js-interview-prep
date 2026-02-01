/*
Problem: WebSocket API Integration
Difficulty: Hard
Category: TypeScript API - Real-time

Create a WebSocket client that integrates with REST APIs for real-time updates.

Example 1:
  Input: wsUrl = 'wss://echo.websocket.org/', apiUrl = '/api/updates'
  Output: { 
    connected: true, 
    messages: [...receivedMessages...], 
    apiSync: true,
    lastUpdate: timestamp 
  }

Example 2:
  Input: wsUrl = 'wss://test-socket.com', reconnect = true
  Output: { 
    connected: true, 
    reconnected: 2, 
    messageCount: 15,
    uptime: 30000 
  }

Requirements:
  - Establish WebSocket connection with error handling
  - Sync WebSocket messages with REST API calls
  - Implement automatic reconnection logic
  - Handle connection state management
  - Queue messages during disconnection

Time Complexity: O(1) per message
Space Complexity: O(n) where n is queued messages

Hints:
  - Use WebSocket API for real-time connection
  - Implement exponential backoff for reconnection
  - Queue API calls when WebSocket is disconnected
  - Handle different WebSocket ready states
  - Sync local state with server on reconnect
*/

export const functionName = 'createWebSocketClient';

export const tests = [
  {
    input: ['wss://echo.websocket.org/', { reconnect: true, maxRetries: 3 }],
    expected: { 
      connect: expect.any(Function),
      disconnect: expect.any(Function),
      send: expect.any(Function),
      onMessage: expect.any(Function),
      getState: expect.any(Function)
    }
  },
  {
    input: ['wss://echo.websocket.org/', { reconnect: false }],
    expected: { 
      connect: expect.any(Function),
      disconnect: expect.any(Function),
      send: expect.any(Function),
      onMessage: expect.any(Function),
      getState: expect.any(Function)
    }
  }
];