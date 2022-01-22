import { useState, useEffect } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";

import "./resizable.css";

type Direction = "horizontal" | "vertical";

interface GetResizableBoxPropsArgs {
  direction: Direction;
  innerWidth: number;
  innerHeight: number;
}

interface ResizableProps {
  direction: Direction;
}

function getResizableBoxProps({
  direction,
  innerWidth,
  innerHeight,
}: GetResizableBoxPropsArgs): ResizableBoxProps {
  if (direction === "horizontal") {
    return {
      className: "resizable--horizontal",
      width: innerWidth * 0.75,
      height: Infinity,
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.75, Infinity],
      resizeHandles: ["e"],
    };
  }

  return {
    width: Infinity,
    height: 300,
    minConstraints: [Infinity, 24],
    maxConstraints: [Infinity, innerHeight * 0.75],
    resizeHandles: ["s"],
  };
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);

  useEffect(() => {
    const resizeHandler = () => {
      setInnerWidth(window.innerWidth);
      setInnerHeight(window.innerHeight);
    };

    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <ResizableBox
      {...getResizableBoxProps({ direction, innerHeight, innerWidth })}
    >
      {children}
    </ResizableBox>
  );
};

export default Resizable;
