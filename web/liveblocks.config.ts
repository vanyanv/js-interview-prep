
// Define the presence and storage types
declare global {
  interface Liveblocks {
    // Custom user info set when authenticating with a secret key
    UserMeta: {
      id: string;
      info: {
        // Example properties, for use with LiveblocksResolver
        name: string;
        color: string;
        avatar: string;
      };
    };

    // The Presence used by RoomProvider
    Presence: {
      cursor: { x: number; y: number } | null;
    };

    // The Storage used by RoomProvider
    Storage: {
      // Used by Yjs
      // y-monaco expects a Yjs doc, which Liveblocks handles internally via YjsProvider
    };
  }
}

export {};
