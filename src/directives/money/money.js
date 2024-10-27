export default class {
  defaultOptions = {
    prefix: '',
    suffix: '',
    thousands: ',',
    decimal: '.',
    precision: 2
  }

  options = {};

  constructor(opts) {
    opts = opts || {};
    this.options =  Object.keys(this.defaultOptions).concat(Object.keys(opts)).reduce( (newOpts, val) => {
      newOpts[val] = opts[val] === undefined ? this.defaultOptions[val] : opts[val]
      return newOpts;
    }, {})
  }

  format (input, opt = this.defaultOptions) {
    if (typeof input === 'number') {
      input = input.toFixed(this.fixed(opt.precision))
    }
    let negative = input.indexOf('-') >= 0 ? '-' : ''
  
    let numbers = this.onlyNumbers(input)
    let currency = this.numbersToCurrency(numbers, opt.precision)
    let parts = this.toStr(currency).split('.')
    let integer = parts[0]
    let decimal = parts[1]
    integer = this.addThousandSeparator(integer, opt.thousands)
    return opt.prefix + negative + this.joinIntegerAndDecimal(integer, decimal, opt.decimal) + opt.suffix
  }
  
  unformat (input, precision) {
    let negative = input.indexOf('-') >= 0 ? -1 : 1
    let numbers = this.onlyNumbers(input)
    let currency = this.numbersToCurrency(numbers, precision)
    return parseFloat(currency) * negative
  }
  
  onlyNumbers (input) {
    return this.toStr(input).replace(/\D+/g, '') || '0'
  }
  
  // Uncaught RangeError: toFixed() digits argument must be between 0 and 20 at Number.toFixed
  fixed (precision) {
    return this.between(0, precision, 20)
  }
  
  between (min, n, max) {
    return Math.max(min, Math.min(n, max))
  }
  
  numbersToCurrency (numbers, precision) {
    let exp = Math.pow(10, precision)
    let float = parseFloat(numbers) / exp
    return float.toFixed(this.fixed(precision))
  }
  
  addThousandSeparator (integer, separator) {
    return integer.replace(/(\d)(?=(?:\d{3})+\b)/gm, `$1${separator}`)
  }
  
  currencyToIntegerAndDecimal (float) {
    return this.toStr(float).split('.')
  }
  
  joinIntegerAndDecimal (integer, decimal, separator) {
    return decimal ? integer + separator + decimal : integer
  }
  
  toStr (value) {
    return value ? value.toString() : ''
  }
  
  setCursor (el, position) {
    let setSelectionRange = function () { el.setSelectionRange(position, position) }
    if (el === document.activeElement) {
      setSelectionRange()
      setTimeout(setSelectionRange, 1) // Android Fix
    }
  }

  event (name) {
    let evt = new Event(name, { bubbles: true, cancelable: true });
    return evt
  }
}