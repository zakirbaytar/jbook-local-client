import React, { useState } from "react";

import Resizable from "./resizable";
import CodeEditor from "./code-editor";
import Preview from "./preview";

import { bundle } from "../bundler";
import { debounce } from "../utils";

import "./code-cell.css";

const CodeCell: React.FC = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);

  const onChange = debounce<any>(async (value) => {
    const output = await bundle(value);
    if (!output) return;

    setCode(output.code);
    setError(output.error);
  }, 2000);

  return (
    <div className="container">
      <Resizable direction="vertical">
        <section className="code-cell">
          <Resizable direction="horizontal">
            <CodeEditor onChange={onChange} />
          </Resizable>
          <Preview code={code} error={error} />
        </section>
      </Resizable>
    </div>
  );
};

export default CodeCell;
