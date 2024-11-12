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

const toStr = (value) => {
  return typeof value === 'string' ? value : value.toString();
}

const pad = (num) => {
  return ("0" + num).slice(-2);
}

const formatDate = (dateObj, dateFormat) => {
  let formattedDate = '';
  let formats = {
    d: () =>  {
      return pad( formats.j() );
    },
    D: () =>  {
      return l10n.weekdays.shorthand[ formats.w() ];
    },
    j: () =>  {
      return dateObj.getDate();
    },
    l: () =>  {
      return l10n.weekdays.longhand[ formats.w() ];
    },
    w: () =>  {
      return dateObj.getDay();
    },
    F: () =>  {
      return toStr( formats.n() - 1 );
    },
    m: () =>  {
      return pad( formats.n() );
    },
    M: () =>  {
      return toStr( formats.n() - 1, true );
    },
    n: () =>  {
      return dateObj.getMonth() + 1;
    },
    U: () =>  {
      return dateObj.getTime() / 1000;
    },
    y: () =>  {
      return String( formats.Y() ).substring(2);
    },
    Y: () =>  {
      return dateObj.getFullYear();
    },

    h: () => {
      return dateObj.getHours()%12 ? dateObj.getHours()%12 : 12;
    },

    H: () => {
      return pad(dateObj.getHours());
    },

    i: () => {
      return pad( dateObj.getMinutes() );
    },

    K: () => {
      return dateObj.getHours() > 11 ? "PM" : "AM";
    }
  }
    
  let formatPieces = dateFormat.split('');

  [].forEach.call(formatPieces, (formatPiece, index) => {

      if (formats[formatPiece] && formatPieces[index - 1] !== '\\'){
        formattedDate += formats[formatPiece]();
      } else if (formatPiece !== '\\') {
        formattedDate += formatPiece;
      }
  });

  return formattedDate;
};

export {
  l10n,
  defaultConfig,
  isEqualDates,
  toStr,
  pad,
  formatDate,
}