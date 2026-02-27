import React from "react";
import { useCursor } from "../hooks/useCursor";

const Cursor: React.FC = () => {
  const { dot, ring, hovered } = useCursor();

  return (
    <>
      <div
        className="cur-dot"
        style={{ left: dot.x, top: dot.y }}
        aria-hidden="true"
      />
      <div
        className={`cur-ring${hovered ? " hovered" : ""}`}
        style={{ left: ring.x, top: ring.y }}
        aria-hidden="true"
      />
    </>
  );
};

export default Cursor;
