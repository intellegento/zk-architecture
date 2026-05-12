export default class Parser {
  constructor(options = {}) {
    this.options = {
      mask: '',
      placeholderSymbol: '*',
      rxmask: [],
      value: '',
      cursorPos: 0,
      allowedCharacters: '.',
      maxMaskLength: 0,
      trailing: true
    };
    this.errors = [];
    this._output = '';
    this._parsedValue = '';
    this._prevValue = '';
    this._isRemovingSymbols = false;
    this._actualCursorPos = 0;
    this._finalCursorPos = 0;
    this.setOptions(options);
    this.parseMask();
  }
  get output() {
    return this._output;
  }
  get parsedValue() {
    return this._parsedValue;
  }
  get finalCursorPos() {
    return this._finalCursorPos;
  }

  setOptions({ mask = '', placeholderSymbol = '*', rxmask = '', allowedCharacters = '.', maxMaskLength = '0', trailing = 'true', value = '', cursorPos = 0 }) {
    this.options.mask = mask;
    this.options.placeholderSymbol = placeholderSymbol;
    this.options.rxmask = this.strToRxmask(rxmask);
    this.options.allowedCharacters = allowedCharacters;
    this.options.maxMaskLength = Number(maxMaskLength);
    this.options.trailing = trailing === 'true';
    this.options.value = value;
    this.options.cursorPos = cursorPos;
    // Parse rxmask in the end
    if (this.options.rxmask.length === 0) {
      this.options.rxmask = this.options?.mask?.split('').map(char => {
        if (char === this.options.placeholderSymbol)
          return '[^]';
        return char;
      });
    }
  }

  parseMask() {
    this.errors = [];
    const noMaskValue = this.parseOutMask();
    const parsedValue = this.parseRxmask(noMaskValue);
    this._parsedValue = parsedValue;
    this._output = this.getOutput(parsedValue);
    this._prevValue = this._output;
  }

  parseOutMask() {
    const { value, cursorPos, rxmask, placeholderSymbol, allowedCharacters } = this.options;
    // Get length diff between old and current value
    const diff = value.length - this._prevValue.length;
    this._isRemovingSymbols = diff >= 0 ? false : true;
    let parsedAllowedCharacters = /./;
    try {
      parsedAllowedCharacters = new RegExp(allowedCharacters);
    }
    catch (error) {
      console.error('Wrong regex for allowedCharacters!');
    }
    // Get value after cursor without mask symbols
    let afterCursor = '';
    for (let i = cursorPos; i < value.length; i++) {
      // Diff used here to "shift" mask to position where it supposed to be
      if (value[i] !== rxmask[i - diff] && value[i] !== placeholderSymbol && value[i].match(parsedAllowedCharacters)) {
        afterCursor += value[i];
      }
    }
    // Get value before cursor without mask symbols
    let beforeCursor = '';
    for (let i = 0; i < cursorPos; i++) {
      if (value[i] !== rxmask[i]) {
        if (value[i] !== placeholderSymbol && value[i].match(parsedAllowedCharacters)) {
          // If parsed value length before cursor so far less than
          // amount of allowed symbols in rxmask minus parsed value length after cursor, add symbol
          if (beforeCursor.length < rxmask.filter(pattern => pattern.match(/\[.*\]/)).length - afterCursor.length) {
            beforeCursor += value[i];
          }
          else {
            this.errors.push({ symbol: value[i], position: i, type: 'length' });
          }
        }
        else if (value[i] !== placeholderSymbol && !value[i].match(parsedAllowedCharacters)) {
          this.errors.push({ symbol: value[i], position: i, type: 'allowedCharacters' });
        }
      }
    }
    this._actualCursorPos = beforeCursor.length; // it holds position of cursor after input was parsed
    return beforeCursor + afterCursor;
  }
  parseRxmask([...noMaskValue]) {
    const { rxmask } = this.options;
    let parsedValue = '';
    const filteredRxmask = rxmask.filter(pattern => pattern.match(/\[.*\]/));
    let correctCount = 0;
    let incorrectCount = 0;
    while (noMaskValue.length > 0 && correctCount < noMaskValue.length) {
      let regexChar = /./;
      try {
        regexChar = new RegExp(filteredRxmask[correctCount]);
      }
      catch (error) {
        console.error('Wrong regex for rxmask!');
      }
      if (noMaskValue[correctCount].match(regexChar)) {
        parsedValue += noMaskValue[correctCount];
        correctCount++;
      }
      else {
        this.errors.push({
          symbol: noMaskValue[correctCount],
          position: correctCount + incorrectCount,
          type: 'rxmask'
        });
        noMaskValue.shift();
        incorrectCount++;
        // This line returns cursor to appropriate position according to removed elements
        if (this._actualCursorPos > correctCount)
          this._actualCursorPos--;
      }
    }
    return parsedValue;
  }
  getOutput([...parsedValue]) {
    const { rxmask, maxMaskLength, placeholderSymbol, trailing } = this.options;
    this._finalCursorPos = 0; // Reset value
    let output = '';
    const parsedValueEmpty = parsedValue.length === 0;
    const isMaskFilled = rxmask.filter(pattern => pattern.match(/\[.*\]/)).length === parsedValue.length;
    let encounteredPlaceholder = false; // stores if loop found a placeholder at least once
    for (let i = 0; i < rxmask.length; i++) {
      // This condition checks if placeholder was found
      if (rxmask[i].match(/\[.*\]/)) {
        if (parsedValue.length > 0) {
          output += parsedValue.shift();
        }
        else if (maxMaskLength > i) {
          output += placeholderSymbol;
          encounteredPlaceholder = true;
        }
        else {
          break;
        }
        if (this._actualCursorPos > 0)
          this._finalCursorPos++;
        this._actualCursorPos--; // reduce this because one symbol or placeholder was added
      }
      else {
        // Add mask symbol if
        if (
          // mask is not fully shown according to this.maxMaskLength
          maxMaskLength > i ||
          // OR there's some parsed characters left to add
          parsedValue.length > 0 ||
          // OR this mask symbol is following parsedValue character AND user just added symbols (not removed)
          // AND (trailing should be enabled OR mask is filled, then add trailing symbols anyway) - see example in README under `trailing` option
          ((trailing || isMaskFilled) && !encounteredPlaceholder && !this._isRemovingSymbols)) {
          output += rxmask[i];
        }
        else {
          break;
        }
        // Add 1 to cursorPos if
        if (
          // no placeholder was encountered AND parsedValue is empty AND this mask symbol should be shown
          // (this ensures that cursor position will be always set just before first placeholder if parsedValue is empty)
          (!encounteredPlaceholder && parsedValueEmpty && maxMaskLength > i) ||
          // OR according to _actualCursorPos not all characters from parsedValue before cursorPos were added yet
          this._actualCursorPos > 0 ||
          // OR all characters from parsedValue before cursorPos were added AND no placeholders yet (or _actualCursorPos will be negative)
          // AND user just added symbols (see example in README under `trailing` option)
          (trailing && this._actualCursorPos === 0 && !this._isRemovingSymbols)) {
          this._finalCursorPos++;
        }
      }
    }
    return output;
  }

  strToRxmask(str) {
    return (str || '').match(/(\[.*?\])|(.)/g) || [];
  }
}
