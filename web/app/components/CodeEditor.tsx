'use client';

import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  code: string;
  onChange: (value: string | undefined) => void;
  language: 'javascript' | 'typescript';
}

export default function CodeEditor({ code, onChange, language }: CodeEditorProps) {
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
