import React, { useState } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";

import { bundle } from "../bundler";

const CodeCell: React.FC = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const onClick = async () => {
    const output = await bundle(input);
    if (!output) return;

    setCode(output);
  };

  return (
    <div>
      <CodeEditor onChange={(value) => setInput(value)} />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

export default CodeCell;
