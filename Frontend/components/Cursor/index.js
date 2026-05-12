import * as React from "react";
import Router from "next/router";
import CursorJS from "../../lib/cursor";
import { isDesktop } from "../../lib/utils";
import useFirstRender from "../../hooks/useFirstRenderHook";
import uiEvents from "../../lib/uiEvents";
// import ArrowRight from "../../public/icons/arrow.svg";
import { useWindowSize } from "../ResizeContainer";

const Cursor = () => {
  const isInit = useFirstRender();
  const { width } = useWindowSize();

  React.useEffect(() => {
    if (isInit && isDesktop()) {
      CursorJS.init({
        elementId: "cursor-circle-wrapper",
        container: "cursor-container",
      });

      const restoreCursor = () => CursorJS.unHoverCursor();

      const hoverCursor = (props) => {
        CursorJS.hoverCursor(props);
      };

      Router.events.on("routeChangeComplete", restoreCursor);
      uiEvents.on("cursorHover", hoverCursor);
      uiEvents.on("cursorUnHover", restoreCursor);

      return () => {
        CursorJS.destroy();
        Router.events.off("routeChangeComplete", restoreCursor);
        uiEvents.off("cursorHover", hoverCursor);
        uiEvents.off("cursorUnHover", restoreCursor);
      };
    }
  }, [isInit, width]);

  if (!isInit) return null;

  return (
    <>
      <div id="cursor-circle-wrapper" />
      <div id="cursor-container">
        <div className="cursor-text">
          <span />
        </div>
        <div className="cursor-plus">
          <span />
        </div>
        <div className="cursor-image">
          {/* <ArrowRight /> */}
        </div>
      </div>
    </>
  );
};

export default Cursor;
