import { getWidth } from "./utils";
import debounce from "./utils/debounced";

const FPS = 16

const SCROLL_DIRECTION_FORWARD = 1
const SCROLL_DIRECTION_BACK = -1

const TOUCH_DIRECTION_DOWN = 1
const TOUCH_DIRECTION_UP = -1

const interpretEvent = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

const getMaxOffsetValue = (x, y, max) => {
  const posX = Math.abs(x);
  const poxY = Math.abs(y);
  const axis = posX >= poxY ? "x" : "y";

  if (posX >= max || poxY >= max) {
    if (axis === 'x') {
      const movement = (max * x) / max
      return {
        axis,
        movement,
      }
    } else {
      const movement = (max * y) / max
      return {
        axis,
        movement,
      }
    }
  }

  if (axis === 'x') {
    return {
      axis,
      movement: x,
    }
  } else {
    return {
      axis,
      movement: y,
    }
  }
};

const handleWheelEvent = (e, options) => {
  const { deltaX, deltaY } = e;
  const { axis, movement } = getMaxOffsetValue(deltaX, deltaY, options.maxScrollMovement);
  const normalizeMovement = movement * options.scrollVelocityRatio;
  return {
    axis,
    movement: normalizeMovement
  }
}

const handleTouchEvent = ([diffX, diffY], options) => {
  const posX = Math.abs(diffX);
  const poxY = Math.abs(diffY);
  const axis = posX >= poxY ? "x" : "y";

  if (axis === 'x') {
    const movement = diffX * options.touchVelocityRatio
    return {
      axis,
      movement,
    }
  } else {
    const movement = diffY * options.touchVelocityRatio
    return {
      axis,
      movement,
    }
  }
}

const calcContainerWidth = (container) => {
  const children = Array.from(container.children);
  const totalWidth = children.reduce((acc, child) => {
    const childWidth = getWidth(child);
    const computedStyle = window.getComputedStyle(child);
    const childOffset = parseInt(computedStyle.marginRight) || 0;
    return acc + childWidth + childOffset
  }, 0);
  return totalWidth
}

class MediaCarousel {
  constructor({ container, touchContainer, options = {} }) {
    this.options = {
      fps: FPS,
      speed: 100,
      scrollVelocityRatio: 1,
      touchVelocityRatio: 1.5,
      maxScrollMovement: 250,
      debounceWaitTime: 500,
      offsetPerTick: 1,
      ...options,
    };
    this.container = container;
    this.touchContainer = touchContainer;
    this.totalWidth = calcContainerWidth(container);
    this.animating = false;
    this.offset = 0;
    this.touchStartPosition = [0, 0];
    this.dragStartPosition = 0;
    this.dragInProgress = false;
    this.touchInProgress = false;
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragMove = this.onDragMove.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onWheel = this.onWheel.bind(this);
    this.connectObserver();
    this.trackUserEvents();
  }

  trackUserEvents() {
    this.listenTouchEvents();
    this.listenDragEvents();
    this.listenWheelEvent();
  }

  play() {
    this.animating = true;
    this.autoPlay = true;
    this.draw();
  }

  stop() {
    this.animating = false;
    this.autoPlay = false;
  }

  restoreAutoPlay = debounce(this.autoPlayStart.bind(this), 300);

  autoPlayStart() {
    this.autoPlay = true;
  }

  autoPlayStop() {
    this.autoPlay = false;
  }

  enableTransition() {
    this.container.style.transition = 'transform 0.1s linear';
  }

  disableTransition() {
    this.container.style.transition = '';
  }

  connectObserver() {
    if (window.ResizeObserver) {
      const onResize = debounce(
        this.update.bind(this),
        this.options.debounceWaitTime
      );
      this.resizeObserver = new ResizeObserver(onResize);
      this.resizeObserver.observe(this.container);
    }
  }

  disconnectObserver() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  update() {
    this.totalWidth = calcContainerWidth(this.container);
  }

  onTouchStart(e) {
    // interpretEvent(e);
    this.autoPlayStop();
    this.touchInProgress = true;
    const t = e.touches[0];
    this.touchStartPosition = [t.pageX, t.pageY];
  }

  onTouchMove(e) {
    if (this.touchInProgress) {
      const t = e.touches[0];
      const diffX = t.pageX - this.touchStartPosition[0];
      const diffY = t.pageY - this.touchStartPosition[1];
      this.touchStartPosition = [t.pageX, t.pageY];
      const { axis, movement } = handleTouchEvent([diffX, diffY], this.options);

      if (axis === 'y') return;

      interpretEvent(e);
      const nextPosition = this.offset + movement;
      this.setPosition(nextPosition);
    }
  }

  onTouchEnd(e) {
    // interpretEvent(e);
    if (this.touchInProgress) {
      this.touchInProgress = false;
      this.autoPlayStart();
    }
  }

  onDragStart(e) {
    interpretEvent(e);
    this.autoPlayStop();
    this.dragInProgress = true;
    this.dragStartPosition = e.pageX;
  }

  onDragMove(e) {
    // interpretEvent(e);
    if (this.dragInProgress) {
      const diffX = e.pageX - this.dragStartPosition;
      const nextPosition = this.offset + diffX;
      this.dragStartPosition = e.pageX;
      this.setPosition(nextPosition);
    }
  }

  onDragEnd(e) {
    // interpretEvent(e);
    if (this.dragInProgress) {
      this.dragInProgress = false;
      this.autoPlayStart();
    }
  }

  onWheel(e) {
    const { movement } = handleWheelEvent(e, this.options);
    interpretEvent(e);
    this.autoPlayStop();
    const nextPosition = this.offset - movement;
    this.setPosition(nextPosition);
    this.restoreAutoPlay();
  }

  listenTouchEvents() {
    this.touchContainer.addEventListener("touchstart", this.onTouchStart);
    this.touchContainer.addEventListener("touchmove", this.onTouchMove);
    this.touchContainer.addEventListener("touchend", this.onTouchEnd);
  }

  removeTouchEventsListener() {
    this.touchContainer.removeEventListener("touchstart", this.onTouchStart);
    this.touchContainer.removeEventListener("touchmove", this.onTouchMove);
    this.touchContainer.removeEventListener("touchend", this.onTouchEnd);
  }

  listenDragEvents() {
    this.touchContainer.addEventListener("mousedown", this.onDragStart);
    this.touchContainer.addEventListener("mousemove", this.onDragMove);
    this.touchContainer.addEventListener("mouseup", this.onDragEnd);
    this.touchContainer.addEventListener("mouseleave", this.onDragEnd);
  }

  removeDragEventsListener() {
    this.touchContainer.removeEventListener("mousedown", this.onDragStart);
    this.touchContainer.removeEventListener("mousemove", this.onDragMove);
    this.touchContainer.removeEventListener("mouseup", this.onDragEnd);
    this.touchContainer.removeEventListener("mouseleave", this.onDragEnd);
  }

  listenWheelEvent() {
    this.touchContainer.addEventListener("wheel", this.onWheel);
  }

  removeWheelEventListener() {
    this.touchContainer.removeEventListener("wheel", this.onWheel);
  }

  isMaxPositiveOffset(nextPosition) {
    return nextPosition >= 0;
  }

  isMaxNegativeOffset(nextPosition) {
    return Math.abs(nextPosition) >= (this.totalWidth - window.innerWidth);
  }

  setPosition(nextPosition) {
    if (this.isMaxPositiveOffset(nextPosition)) {
      this.offset = -(this.totalWidth / 2);
      return;
    }
    if (this.isMaxNegativeOffset(nextPosition)) {
      this.offset = -((this.totalWidth / 2) - window.innerWidth);
      return;
    }

    this.offset = nextPosition;
    return;
  }

  calcNextPosition() {
    const nextPosition = this.offset - this.options.offsetPerTick;
    this.setPosition(nextPosition);
  }

  draw() {
    if (this.animating) {
      this.timer = setTimeout(() => {
        this.container.style.transform = `translate3d(${this.offset}px, 0px, 0px)`;
        this.calcNextPosition();
        this.tickID = requestAnimationFrame(this.draw.bind(this));
      }, this.options.fps);
    }
  }

  destroy() {
    this.removeTouchEventsListener();
    this.removeDragEventsListener();
    this.removeWheelEventListener();
    this.stop();
    this.disconnectObserver();
    if (this.timer) clearTimeout(this.timer);
    if (this.tickID) cancelAnimationFrame(this.tickID);
  }
}

export default MediaCarousel;
