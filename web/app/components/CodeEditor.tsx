'use client';

import { useEffect, useState, useCallback } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { useRoom } from '@liveblocks/react/suspense';
import * as Y from 'yjs';
import { LiveblocksYjsProvider } from '@liveblocks/yjs';
import { MonacoBinding } from 'y-monaco';

interface CodeEditorProps {
  code: string;
  onChange: (value: string | undefined) => void;
  language: 'javascript' | 'typescript';
  onRun?: () => void;
}

const AWARENESS_COLORS = [
  '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b',
  '#22c55e', '#06b6d4', '#f97316', '#a855f7',
];

const AWARENESS_NAMES = [
  'Alice', 'Bob', 'Charlie', 'Diana',
  'Eve', 'Frank', 'Grace', 'Hank',
];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const EDITOR_OPTIONS = {
  minimap: { enabled: false },
  fontSize: 14,
  fontFamily: "'JetBrains Mono', monospace",
  fontLigatures: true,
  scrollBeyondLastLine: false,
  automaticLayout: true,
  padding: { top: 16, bottom: 16 },
  // IntelliSense
  suggestOnTriggerCharacters: true,
  quickSuggestions: { other: true, comments: false, strings: true },
  parameterHints: { enabled: true },
  wordBasedSuggestions: 'currentDocument' as const,
  snippetSuggestions: 'inline' as const,
  // Bracket matching
  bracketPairColorization: { enabled: true },
  autoClosingBrackets: 'always' as const,
  autoClosingQuotes: 'always' as const,
  autoSurround: 'languageDefined' as const,
  // Visual polish
  smoothScrolling: true,
  cursorBlinking: 'smooth' as const,
  cursorSmoothCaretAnimation: 'on' as const,
  renderLineHighlight: 'gutter' as const,
  renderWhitespace: 'none' as const,
  guides: { bracketPairs: true, indentation: true },
  lineNumbers: 'on' as const,
  glyphMargin: false,
  folding: true,
  lineDecorationsWidth: 0,
  lineNumbersMinChars: 3,
  tabSize: 2,
};

function registerThemeAndSetup(monacoInstance: any, editorInstance: any, onRun?: () => void) {
  // Custom theme matching the app's design
  monacoInstance.editor.defineTheme('interview-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '52525b', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'c084fc' },
      { token: 'string', foreground: '86efac' },
      { token: 'number', foreground: 'fbbf24' },
      { token: 'type', foreground: '67e8f9' },
      { token: 'function', foreground: '93c5fd' },
      { token: 'variable', foreground: 'e4e4e7' },
    ],
    colors: {
      'editor.background': '#0f0f11',
      'editor.foreground': '#e4e4e7',
      'editor.lineHighlightBackground': '#ffffff06',
      'editor.selectionBackground': '#3b82f630',
      'editor.inactiveSelectionBackground': '#3b82f615',
      'editorLineNumber.foreground': '#3f3f46',
      'editorLineNumber.activeForeground': '#71717a',
      'editorCursor.foreground': '#3b82f6',
      'editorBracketMatch.background': '#3b82f620',
      'editorBracketMatch.border': '#3b82f640',
      'editorIndentGuide.background': '#ffffff08',
      'editorIndentGuide.activeBackground': '#ffffff14',
      'editor.selectionHighlightBackground': '#3b82f615',
      'editorSuggestWidget.background': '#18181b',
      'editorSuggestWidget.border': '#ffffff10',
      'editorSuggestWidget.selectedBackground': '#ffffff10',
      'editorWidget.background': '#18181b',
      'editorWidget.border': '#ffffff10',
      'input.background': '#111113',
      'scrollbarSlider.background': '#ffffff08',
      'scrollbarSlider.hoverBackground': '#ffffff12',
      'scrollbarSlider.activeBackground': '#ffffff18',
    },
  });
  monacoInstance.editor.setTheme('interview-dark');

  // TypeScript/JavaScript compiler options for better IntelliSense
  monacoInstance.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
  });
  monacoInstance.languages.typescript.javascriptDefaults.setCompilerOptions({
    target: monacoInstance.languages.typescript.ScriptTarget.ES2020,
    allowNonTsExtensions: true,
    moduleResolution: monacoInstance.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monacoInstance.languages.typescript.ModuleKind.ESNext,
    allowJs: true,
    strict: false,
  });
  monacoInstance.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monacoInstance.languages.typescript.ScriptTarget.ES2020,
    allowNonTsExtensions: true,
    moduleResolution: monacoInstance.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monacoInstance.languages.typescript.ModuleKind.ESNext,
    strict: true,
  });

  // Register Cmd/Ctrl+Enter to run code
  if (onRun) {
    editorInstance.addAction({
      id: 'run-code',
      label: 'Run Code',
      keybindings: [
        monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyCode.Enter,
      ],
      run: () => onRun(),
    });
  }
}

function CollaborativeEditor({ code, onChange, language, onRun }: CodeEditorProps) {
  const room = useRoom();
  const [provider, setProvider] = useState<LiveblocksYjsProvider>();
  const [editor, setEditor] = useState<any>();
  const [doc, setDoc] = useState<Y.Doc>();
  const [isCollabReady, setIsCollabReady] = useState(false);

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

  const handleOnMount: OnMount = useCallback((editorInstance, monaco) => {
    registerThemeAndSetup(monaco, editorInstance, onRun);
    setEditor(editorInstance);
  }, [onRun]);

  // Bind Yjs to Monaco
  useEffect(() => {
    if (provider && editor && doc) {
      const yText = doc.getText('codemirror');

      if (yText.toString() === '') {
        yText.insert(0, code);
      }

      const userColor = getRandomItem(AWARENESS_COLORS);
      const userName = getRandomItem(AWARENESS_NAMES);

      provider.awareness.setLocalStateField('user', {
        name: userName,
        color: userColor,
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

  useEffect(() => {
    if (editor) {
      const disposable = editor.onDidChangeModelContent(() => {
        onChange(editor.getValue());
      });
      return () => disposable.dispose();
    }
  }, [editor, onChange]);

  return (
    <div className="h-full w-full rounded-xl border border-white/[0.06] overflow-hidden bg-[#0f0f11] relative">
      {!isCollabReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <div className="w-4 h-4 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
            Syncing...
          </div>
        </div>
      )}
      <Editor
        height="100%"
        language={language}
        defaultValue={code}
        onMount={handleOnMount}
        theme="vs-dark"
        options={EDITOR_OPTIONS}
      />
    </div>
  );
}

export default function CodeEditor(props: CodeEditorProps) {
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useRoom();
    return <CollaborativeEditor {...props} />;
  } catch (e) {
    return <StandardEditor {...props} />;
  }
}

function StandardEditor({ code, onChange, language, onRun }: CodeEditorProps) {
  const handleOnMount: OnMount = useCallback((editorInstance, monaco) => {
    registerThemeAndSetup(monaco, editorInstance, onRun);
  }, [onRun]);

  return (
    <div className="h-full w-full rounded-xl border border-white/[0.06] overflow-hidden bg-[#0f0f11]">
      <Editor
        height="100%"
        language={language}
        value={code}
        onChange={onChange}
        onMount={handleOnMount}
        theme="vs-dark"
        options={EDITOR_OPTIONS}
      />
    </div>
  );
}
