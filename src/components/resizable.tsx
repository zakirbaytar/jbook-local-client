import { ResizableBox, ResizableBoxProps } from "react-resizable";

import "./resizable.css";

type Direction = "horizontal" | "vertical";

interface ResizableProps {
  direction: Direction;
}

function getResizableBoxProps(direction: Direction): ResizableBoxProps {
  if (direction === "horizontal") {
    return {
      className: "resizable--horizontal",
      width: window.innerWidth * 0.75,
      height: Infinity,
      minConstraints: [window.innerWidth * 0.2, Infinity],
      maxConstraints: [window.innerWidth * 0.75, Infinity],
      resizeHandles: ["e"],
    };
  }

  return {
    width: Infinity,
    height: 300,
    minConstraints: [Infinity, 24],
    maxConstraints: [Infinity, window.innerHeight * 0.75],
    resizeHandles: ["s"],
  };
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  return (
    <ResizableBox {...getResizableBoxProps(direction)}>{children}</ResizableBox>
  );
};

export default Resizable;
