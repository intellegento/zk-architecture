import * as React from "react";
import CursorJS from "../../lib/cursor";
import { isDesktop } from "../../lib/utils";
import useFirstRender from "../../hooks/useFirstRenderHook";

const onMouseOver = (label, type, blendMode) => {
  CursorJS.hoverCursor({
    type: type || "text",
    text: label,
    blendMode: blendMode || "difference"
  });
};

const onMouseOut = () => {
  CursorJS.unHoverCursor();
};

const CursorHover = ({ children, label = "", onClick, className, type, blendMode }) => {
  const isInit = useFirstRender();

  if (isInit && isDesktop()) {
    return (
      <div
        className={className}
        onMouseOver={() => onMouseOver(label, type, blendMode)}
        onMouseOut={onMouseOut}
        onClick={onClick}
      >
        {children}
      </div>
    );
  }

  return <div className={className}>{children}</div>;
};

export default CursorHover;
