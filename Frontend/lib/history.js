class History {
  constructor() {
    this.history = [];
    this.prevPosition = [];
    this.scrollRestore = false;
  }

  get scrollRestore() {
    return this._scrollRestore;
  }

  set scrollRestore(isScrollRestore) {
    this._scrollRestore = isScrollRestore;
  }

  getPrevious() {
    return this.history[this.history.length-2];
  }

  addToHistory(path) {
    this.history.push(path)
  }

  savePosition(position) {
    this.prevPosition.push(position)
  }

  getPrevPosition() {
    return this.prevPosition[this.prevPosition.length-2] || 0;
  }
}

const history = new History()

export default history
