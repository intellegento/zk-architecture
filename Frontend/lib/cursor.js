import { gsap } from "./gsap";
import { getHeight } from "./utils";

const CURSOR_DURATION = 0.2;

function CursorClass() {
  this.move = (element) => {
    const xTo = gsap.quickTo(element, "x", { duration: CURSOR_DURATION, ease: "power3" });
    const yTo = gsap.quickTo(element, "y", { duration: CURSOR_DURATION, ease: "power3" });

    return (x, y) => {
      xTo(x);
      yTo(y);
    };
  };

  this.createMoveCursor = (element) => {
    return this.move(element);
  };

  this.createMoveText = (element) => {
    return this.move(element);
  };

  this.scale = (element, scale) => {
    gsap.to(element, {
      duration: CURSOR_DURATION,
      scale,
    });
  };

  this.fadeInOut = (element, autoAlpha) => {
    gsap.to(element, {
      duration: CURSOR_DURATION,
      autoAlpha,
    });
  };

  this.onMove = (event) => {
    this.moveCursor(event.clientX - this.offset, event.clientY - this.offset);
    this.moveText(event.clientX - this.offset, event.clientY - this.offset);
  };

  this.init = ({ elementId, container }) => {
    this.cursorElement = document.getElementById(elementId);
    this.containerElement = document.getElementById(container);
    this.offset = getHeight(this.cursorElement) / 2;
    this.moveCursor = this.createMoveCursor(this.cursorElement);
    this.moveText = this.createMoveText(this.containerElement);
    this.showCursor();
    window.addEventListener("mousemove", this.onMove);
  };

  this.destroy = () => {
    this.hideCursor();
    window.removeEventListener("mousemove", this.onMove);
  };

  this.hideCursor = () => {
    this.fadeInOut(this.cursorElement, 0);
    this.fadeInOut(this.containerElement, 0);
  };

  this.showCursor = () => {
    this.fadeInOut(this.cursorElement, 1);
    this.fadeInOut(this.containerElement, 1);
  };

  // this.hoverCursor = (cursor) => {
  //   if (cursor.type === "text") {
  //     this.containerElement.querySelector(".cursor-text > span").textContent = cursor.text;
  //   }

  //   if (cursor.type === "plus") {
  //         this.containerElement.querySelector(".cursor-plus > span").textContent = cursor.text;
  //       }

  //   if (cursor.type === "arrow") {
  //     const arrow = this.containerElement.querySelector(".cursor-image > svg");
  //     arrow.style.opacity = 1;
  //     if (cursor.direction === "left") {
  //       arrow.style.transform = "matrix(-1, 0, 0, 1, 0, 0)";
  //     } else {
  //       arrow.style.transform = null;
  //     }
  //   }

  //   this.scale(this.cursorElement, 1);
  //   this.scale(this.containerElement, 1);
  // };

  this.hoverCursor = (cursor) => {
    if (cursor.type === "text") {
      this.containerElement.querySelector(".cursor-text > span").textContent = cursor.text;
      
    }

    if (cursor.type === "plus") {
      this.containerElement.querySelector(".cursor-plus > span").textContent = cursor.text;
    }

    if (cursor.type === "arrow") {
      const arrow = this.containerElement.querySelector(".cursor-image > svg");
      arrow.style.opacity = 1;
      if (cursor.direction === "left") {
        arrow.style.transform = "matrix(-1, 0, 0, 1, 0, 0)";
      } else {
        arrow.style.transform = null;
      }
    }
    if (cursor.blendMode == "normal") {
      const cursorCircleWrapper = this.containerElement.querySelector("#cursor-circle-wrapper");

      this.cursorElement = document.getElementById("cursor-circle-wrapper");
      this.containerElement.querySelector(".cursor-text > span").style.color = "black";

      if (this.cursorElement) {
        this.cursorElement.style.mixBlendMode = cursor.blendMode;
      }
    }

    this.scale(this.cursorElement, 1);
    this.scale(this.containerElement, 1);
  };

  this.unHoverCursor = () => {
    // remove text
    this.containerElement.querySelector(".cursor-text > span").textContent = "";
    this.containerElement.querySelector(".cursor-text > span").style.color = "white";

    // remove plus
    this.containerElement.querySelector(".cursor-plus > span").textContent = "";

    const cursorCircleWrapper = this.containerElement.querySelector("#cursor-circle-wrapper");
    if (this.cursorElement) {
      this.cursorElement.style.mixBlendMode = "difference";
      // this.cursorElement.style.background = "white";
    }
    // remove image
    // this.containerElement.querySelector(".cursor-image > svg").styles.opacity = 0;

    this.scale(this.cursorElement, 0.4);
    this.scale(this.containerElement, 0.4);
  };
}

const Cursor = new CursorClass();

export default Cursor;
