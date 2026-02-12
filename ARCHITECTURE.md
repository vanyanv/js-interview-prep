# System Architecture

## Real-Time Collaboration

This project uses **Liveblocks** and **Yjs** to enable real-time collaborative coding, similar to Google Docs or VS Code LiveShare.

### Technology Stack
-   **Liveblocks**: Provides the WebSocket infrastructure and "Room" concept for connecting users.
-   **Yjs**: A CRDT (Conflict-free Replicated Data Type) library. It handles the shared data structure (the code document) and ensures that all users eventually see the same state, even if they edit simultaneously.
-   **y-monaco**: A binding library that syncs the Yjs document state with the Monaco Editor instance in the browser.

### Data Flow
1.  **Room Connection**: When a user visits a problem page (e.g., `/problems/arrays/two-sum`), the `CollaborationProvider` connects to a Liveblocks room ID specific to that problem (`arrays-two-sum`).
2.  **Yjs Document**: Inside `CodeEditor.tsx`, a `Y.Doc` (Yjs Document) is created and linked to the Liveblocks room via `LiveblocksYjsProvider`.
3.  **Monaco Binding**: The `MonacoBinding` listens for changes in the Monaco editor. When a user types:
    -   The change is applied to the local Yjs document.
    -   Liveblocks broadcasts this change as a robust CRDT update to other users in the room.
    -   Other users receive the update, apply it to their Yjs document, and the binding updates their Monaco editor content.

## Code Execution (Serverless)

To allow users to run code securely in a serverless environment (like Vercel), we moved away from spawning child processes.

### Execution Flow
1.  **Input**: The user submits code and the problem slug to `/api/run`.
2.  **Problem Loading**: The API reads the problem file (which contains test cases and function signatures) from `web/problems`.
3.  **VM Sandbox**: We use the Node.js `vm` module to create a sandboxed context.
    -   The user's code is compiled and run in this isolated context.
    -   The problem's test cases are executed against the user's function within the same context.
4.  **Security**: This prevents the user from accessing the server's file system or environment variables directly, unlike `eval` or `child_process.exec`.

## Database (Planned - Phase 3)
Currently, user progress is stored in-memory (resets on deployment) or a local JSON file (read-only in Vercel). Phase 3 will introduce Supabase (PostgreSQL) to persist:
-   User Accounts
-   Solved Problems
-   Submission History
