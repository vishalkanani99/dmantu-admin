const l10n = {
  weekdays: {
    shorthand: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    longhand: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  },
  months: {
    shorthand: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    longhand: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  },
  daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
};

const defaultConfig = {
  dateFormat: 'Y-m-d',
  altInput: false,
  altFormat: "F j, Y",
  defaultDate: null,
  minDate: null,
  maxDate: null,
  disable: [],
  shorthandCurrentMonth: false,
  inline: false,
  prevArrow: '&lt;',
  nextArrow: '&gt;',
  enableTime: false,
  timeFormat: "h:i K",
  hourIncrement: 1,
  minuteIncrement: 5,
};

const isEqualDates = (date1, date2) => {
  return  date1.getFullYear() === date2.getFullYear() &&
          date1.getMonth() === date2.getMonth() &&
          date1.getDate() === date2.getDate();
}

export {
  l10n,
  defaultConfig,
  isEqualDates,
}