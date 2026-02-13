'use client';

import { useEffect, useState } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { useRoom } from '@liveblocks/react/suspense';
import * as Y from 'yjs';
import { LiveblocksYjsProvider } from '@liveblocks/yjs';
import { MonacoBinding } from 'y-monaco';

interface CodeEditorProps {
  code: string;
  onChange: (value: string | undefined) => void;
  language: 'javascript' | 'typescript';
}

function CollaborativeEditor({ code, onChange, language }: CodeEditorProps) {
  const room = useRoom();
  const [provider, setProvider] = useState<LiveblocksYjsProvider>();
  const [editor, setEditor] = useState<any>();
  const [doc, setDoc] = useState<Y.Doc>();
  const [isCollabReady, setIsCollabReady] = useState(false);

  // Initialize Yjs provider
  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksYjsProvider(room, yDoc);
    setProvider(yProvider);
    setDoc(yDoc);

    return () => {
      yDoc.destroy();
      yProvider.destroy();
    };
  }, [room]);

  const handleOnMount: OnMount = (editorInstance) => {
    setEditor(editorInstance);
  };

  // Bind Yjs to Monaco
  useEffect(() => {
    if (provider && editor && doc) {
      const yText = doc.getText('codemirror'); // using 'codemirror' as standard field name or 'monaco'

      // Check if there is existing content in Yjs, if not, initialize with prop
      if (yText.toString() === '') {
          yText.insert(0, code);
      }

      // Set user awareness (cursor color and name)
      const userColor = '#' + Math.floor(Math.random()*16777215).toString(16);
      const userName = `User ${Math.floor(Math.random() * 100)}`;
      
      provider.awareness.setLocalStateField('user', {
        name: userName,
        color: userColor
      });

      const binding = new MonacoBinding(
        yText,
        editor.getModel()!,
        new Set([editor]),
        provider.awareness as any
      );
      
      setIsCollabReady(true);

      return () => {
        binding.destroy();
        setIsCollabReady(false);
      };
    }
  }, [provider, editor, doc]);

  // Sync back to parent for running code
  // We need to capture changes. The binding handles the editor <-> yjs sync.
  // We just need to update the parent state so 'Run' uses the latest code.
  useEffect(() => {
    if (editor) {
        const disposable = editor.onDidChangeModelContent(() => {
            onChange(editor.getValue());
        });
        return () => disposable.dispose();
    }
  }, [editor, onChange]);

  return (
    <div className="h-full w-full border border-gray-700 rounded-lg overflow-hidden bg-[#1e1e1e] relative">
      {!isCollabReady && (
         <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10 text-white">
            Initializing collaboration...
         </div>
      )}
      <Editor
        height="100%"
        language={language}
        // value={code} // Managed by Yjs binding now
        defaultValue={code} 
        onMount={handleOnMount}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 16 },
        }}
      />
    </div>
  );
}

// Wrapper to handle case where no room provider exists (e.g. if key is missing)
export default function CodeEditor(props: CodeEditorProps) {
    try {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useRoom(); 
        return <CollaborativeEditor {...props} />;
    } catch (e) {
        // Fallback to standard editor if not in a room context
        return <StandardEditor {...props} />;
    }
}

function StandardEditor({ code, onChange, language }: CodeEditorProps) {
  return (
    <div className="h-full w-full border border-gray-700 rounded-lg overflow-hidden bg-[#1e1e1e]">
      <Editor
        height="100%"
        language={language}
        value={code}
        onChange={onChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 16 },
        }}
      />
    </div>
  );
}
