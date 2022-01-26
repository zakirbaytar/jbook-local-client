import React from "react";
import { useActions } from "../hooks/useActions";

import "./add-cell.css";

interface AddCellProps {
  previousCellId?: string;
}

const AddCell: React.FC<AddCellProps> = ({ previousCellId }) => {
  const { insertCellAfter } = useActions();

  return (
    <section className="add-cell">
      <div className="add-buttons">
        <button
          className="btn btn--primary btn--rounded"
          onClick={() => insertCellAfter({ id: previousCellId, type: "code" })}
        >
          <i>+</i>
          Code
        </button>
        <button
          className="btn btn--primary btn--rounded"
          onClick={() =>
            insertCellAfter({ id: previousCellId, type: "markdown" })
          }
        >
          <i>+</i>
          Text
        </button>{" "}
      </div>
      <div className="divider" />
    </section>
  );
};

export default AddCell;
