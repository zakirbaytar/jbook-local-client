import React, { useState, useEffect } from "react";

import Resizable from "./resizable";
import CodeEditor from "./code-editor";
import Preview from "./preview";

import { bundle } from "../bundler";

import "./code-cell.css";
import { Cell } from "../state";
import { useActions } from "../hooks/useActions";

const CodeCell: React.FC<Cell> = ({ id, content }) => {
  const { updateCell } = useActions();
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(content);
      setCode(output.code);
      setError(output.error);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [content]);

  return (
    <Resizable direction="vertical">
      <div className="code-cell">
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={content}
            onChange={(value) => updateCell(id, value)}
          />
        </Resizable>
        <Preview code={code} error={error} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
