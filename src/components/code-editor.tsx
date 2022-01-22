import React, { useCallback, useRef } from "react";

import MonacoEditor, { OnMount } from "@monaco-editor/react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

import prettier from "prettier";
import parser from "prettier/parser-babel";
import useSave from "../hooks/useSave";

import JSXHighlighter from "../utils/JSXHighlighter";
import "./syntax-highlights.css";
import "./code-editor.css";

interface CodeEditorProps {
  initialValue?: string;
  autoFormat?: boolean;
  onChange: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue = "",
  autoFormat = true,
  onChange,
}) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();

  const prettifyContent = useCallback(() => {
    const editor = editorRef.current;
    if (!editor) return;

    const model = editor.getModel();
    if (!model) return;

    const formatted = prettier.format(model.getValue(), {
      parser: "babel",
      plugins: [parser],
      useTabs: false,
      semi: true,
    });

    editor.setValue(formatted);
    editor.setPosition({ lineNumber: model.getLineCount() + 1, column: 0 });
  }, [editorRef]);

  useSave(() => {
    if (autoFormat) prettifyContent();
  });

  const onEditorMount: OnMount = (monacoEditor) => {
    const jsxHighlighter = new JSXHighlighter(monacoEditor);

    monacoEditor.onDidChangeModelContent(() => {
      onChange(monacoEditor.getValue());
      jsxHighlighter.highlightJSX();
    });
    const model = monacoEditor.getModel();
    if (!model) return;

    model.updateOptions({ tabSize: 2 });

    editorRef.current = monacoEditor;
  };

  return (
    <div className="editor">
      <MonacoEditor
        theme="vs-dark"
        defaultLanguage="javascript"
        defaultValue={initialValue}
        onMount={onEditorMount}
        height="100%"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
        wrapperProps={{ className: "editor-wrapper" }}
      />
    </div>
  );
};

export default CodeEditor;
