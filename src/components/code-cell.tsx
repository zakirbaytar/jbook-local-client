import React, { useState } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";

import { bundle } from "../bundler";
import Resizable from "./resizable";

import "./code-cell.css";

const CodeCell: React.FC = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const onClick = async () => {
    const output = await bundle(input);
    if (!output) return;

    setCode(output);
  };

  return (
    <React.Fragment>
      <Resizable direction="vertical">
        <section className="code-cell">
          <Resizable direction="horizontal">
            <CodeEditor onChange={(value) => setInput(value)} />
          </Resizable>
          <Preview code={code} />
        </section>
      </Resizable>
      <button onClick={onClick}>Submit</button>
    </React.Fragment>
  );
};

export default CodeCell;
