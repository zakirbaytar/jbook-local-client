import React, { useEffect } from "react";

import { useSelector } from "../hooks/useSelector";
import { useActions } from "../hooks/useActions";

import Resizable from "./resizable";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import ProgressBar from "./progress-bar";

import { Cell } from "../state";

import "./code-cell.css";

const CodeCell: React.FC<Cell> = ({ id, content }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useSelector((state) => state.bundles[id]);

  useEffect(() => {
    if (!bundle) {
      createBundle({ cellId: id, input: content });
      return;
    }

    const timer = setTimeout(async () => {
      createBundle({ cellId: id, input: content });
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createBundle, id, content]);

  return (
    <Resizable direction="vertical">
      <div className="code-cell">
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={content}
            onChange={(value) => updateCell(id, value)}
          />
        </Resizable>
        <aside className="preview-wrapper">
          {!bundle || bundle.loading ? (
            <ProgressBar
              wrapperClassName="progress-cover"
              color="primary"
              size="medium"
            />
          ) : (
            <Preview code={bundle.code} error={bundle.error} />
          )}
        </aside>
      </div>
    </Resizable>
  );
};

export default CodeCell;
