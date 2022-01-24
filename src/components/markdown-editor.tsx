import React, { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";

import "./markdown-editor.css";

interface MarkdownEditorProps {}

const MarkdownEditor: React.FC<MarkdownEditorProps> = () => {
  const markdownRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(true);
  const [input, setInput] = useState("");

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        markdownRef.current &&
        event.target &&
        markdownRef.current.contains(event.target as Node)
      ) {
        return;
      }

      setIsEditing(false);
    };
    document.addEventListener("click", handleClick, { capture: true });

    return () => {
      document.addEventListener("click", handleClick, { capture: true });
    };
  }, []);

  if (isEditing) {
    return (
      <div className="markdown-editor" ref={markdownRef}>
        <MDEditor value={input} onChange={(value) => setInput(value ?? "")} />
      </div>
    );
  }

  return (
    <div className="markdown-editor preview" onClick={() => setIsEditing(true)}>
      <MDEditor.Markdown source={input} />
    </div>
  );
};

export default MarkdownEditor;
