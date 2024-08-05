const background = {
  'theme-dark': 'bg-theme-900',
  'theme': 'bg-theme-600',
  'theme-light': 'bg-theme-100',
  'white': 'bg-white',
  'black': 'bg-black',
  'gray': 'bg-gray-600',
  'info': 'bg-blue-600',
  'success': 'bg-green-600',
  'warning': 'bg-yellow-600',
  'danger': 'bg-red-600',
  'before': {
    'theme-dark': 'before:bg-theme-900',
    'theme': 'before:bg-theme-600',
    'theme-light': 'before:bg-theme-100',
    'white': 'before:bg-white',
    'black': 'before:bg-black',
    'gray': 'before:bg-gray-600',
    'info': 'before:bg-blue-600',
    'success': 'before:bg-green-600',
    'warning': 'before:bg-yellow-600',
    'danger': 'before:bg-red-600',
  },
  'peer-checked': {
    'theme-dark': 'peer-checked:bg-theme-900',
    'theme': 'peer-checked:bg-theme-600',
    'theme-light': 'peer-checked:bg-theme-100',
    'white': 'peer-checked:bg-white',
    'black': 'peer-checked:bg-black',
    'gray': 'peer-checked:bg-gray-600',
    'info': 'peer-checked:bg-blue-600',
    'success': 'peer-checked:bg-green-600',
    'warning': 'peer-checked:bg-yellow-600',
    'danger': 'peer-checked:bg-red-600',
  },
  'active': {
    'theme-dark': 'bg-theme-700',
    'theme': 'bg-theme-500',
    'theme-light': 'bg-theme-200',
    'white': 'bg-slate-200',
    'black': 'bg-slate-700',
    'gray': 'bg-gray-400',
    'info': 'bg-blue-400',
    'success': 'bg-green-400',
    'warning': 'bg-yellow-400',
    'danger': 'bg-red-400',
  }, 
  hover: function(color, isLight = false) {
    let bg =  {
      'theme-dark': isLight ? 'hover:bg-theme-700' : 'hover:bg-theme-900',
      'theme': isLight ? 'hover:bg-theme-500' : 'hover:bg-theme-600',
      'theme-light': isLight ? 'hover:bg-theme-50' : 'hover:bg-theme-100',
      'white': isLight ? 'hover:bg-gray-100' : 'hover:bg-white',
      'black': isLight ? 'hover:bg-slate-700' : 'hover:bg-black',
      'gray': isLight ? 'hover:bg-gray-500' : 'hover:bg-gray-600',
      'info': isLight ? 'hover:bg-blue-500' :'hover:bg-blue-600',
      'success': isLight ? 'hover:bg-green-500' : 'hover:bg-green-600',
      'warning': isLight ? 'hover:bg-yellow-500' : 'hover:bg-yellow-600',
      'danger': isLight ? 'hover:bg-red-500' : 'hover:bg-red-600',
    }
    return bg[color];
  }
}

const border = {
  'theme-dark': 'border-theme-900',
  'theme': 'border-theme-600',
  'theme-light': 'border-theme-100',
  'white': 'border-white',
  'black': 'border-black',
  'gray': 'border-gray-600',
  'info': 'border-blue-600',
  'success': 'border-green-600',
  'warning': 'border-yellow-600',
  'danger': 'border-red-600',
  before: {
    'theme-dark': 'before:border-theme-900',
    'theme': 'before:border-theme-600',
    'theme-light': 'before:border-theme-100',
    'white': 'before:border-white',
    'black': 'before:border-black',
    'gray': 'before:border-gray-600',
    'info': 'before:border-blue-600',
    'success': 'before:border-green-600',
    'warning': 'before:border-yellow-600',
    'danger': 'before:border-red-600',
  },
  'peer-checked': {
    'theme-dark': 'peer-checked:border-theme-900',
    'theme': 'peer-checked:border-theme-600',
    'theme-light': 'peer-checked:border-theme-100',
    'white': 'peer-checked:border-white',
    'black': 'peer-checked:border-black',
    'gray': 'peer-checked:border-gray-600',
    'info': 'peer-checked:border-blue-600',
    'success': 'peer-checked:border-green-600',
    'warning': 'peer-checked:border-yellow-600',
    'danger': 'peer-checked:border-red-600',
  },
  'peer-checked:before': {
    'theme-dark': 'peer-checked:before:border-theme-900',
    'theme': 'peer-checked:before:border-theme-600',
    'theme-light': 'peer-checked:before:border-theme-100',
    'white': 'peer-checked:before:border-white',
    'black': 'peer-checked:before:border-black',
    'gray': 'peer-checked:before:border-gray-600',
    'info': 'peer-checked:before:border-blue-600',
    'success': 'peer-checked:before:border-green-600',
    'warning': 'peer-checked:before:border-yellow-600',
    'danger': 'peer-checked:before:border-red-600',
  }
}

const ring = {
  focus: {
    'theme-dark': 'focus:ring-theme-500',
    'theme': 'focus:ring-theme-300',
    'theme-light': 'focus:ring-theme-200',
    'white': 'focus:ring-gray-100',
    'black': 'focus:ring-slate-400',
    'gray': 'focus:ring-gray-300',
    'info': 'focus:ring-blue-300',
    'success': 'focus:ring-green-300',
    'warning': 'focus:ring-yellow-300',
    'danger': 'focus:ring-red-300',
  },
  'peer-focus': {
    'theme-dark': 'peer-focus:ring-theme-500',
    'theme': 'peer-focus:ring-theme-300',
    'theme-light': 'peer-focus:ring-theme-200',
    'white': 'peer-focus:ring-gray-100',
    'black': 'peer-focus:ring-slate-400',
    'gray': 'peer-focus:ring-gray-300',
    'info': 'peer-focus:ring-blue-300',
    'success': 'peer-focus:ring-green-300',
    'warning': 'peer-focus:ring-yellow-300',
    'danger': 'peer-focus:ring-red-300',
  },
}

const text = {
  'theme-dark': 'text-theme-900',
  'theme': 'text-theme-600',
  'theme-light': 'text-theme-100',
  'white': 'text-white',
  'black': 'text-black',
  'gray': 'text-gray-600',
  'info': 'text-blue-600',
  'success': 'text-green-600',
  'warning': 'text-yellow-600',
  'danger': 'text-red-600',
  'peer-checked': {
    'theme-dark': 'peer-checked:text-theme-900',
    'theme': 'peer-checked:text-theme-600',
    'theme-light': 'peer-checked:text-theme-100',
    'white': 'peer-checked:text-white',
    'black': 'peer-checked:text-black',
    'gray': 'peer-checked:text-gray-600',
    'info': 'peer-checked:text-blue-600',
    'success': 'peer-checked:text-green-600',
    'warning': 'peer-checked:text-yellow-600',
    'danger': 'peer-checked:text-red-600',
  },
  hover: {
    'theme-dark': 'hover:text-theme-900',
    'theme': 'hover:text-theme-600',
    'theme-light': 'hover:text-theme-100',
    'white': 'hover:text-white',
    'black': 'hover:text-black',
    'gray': 'hover:text-gray-600',
    'info': 'hover:text-blue-600',
    'success': 'hover:text-green-600',
    'warning': 'hover:text-yellow-600',
    'danger': 'hover:text-red-600',
  },
  placeholder: {
    'theme-dark': 'placeholder:text-theme-900',
    'theme': 'placeholder:text-theme-600',
    'theme-light': 'placeholder:text-theme-100',
    'white': 'placeholder:text-white',
    'black': 'placeholder:text-black',
    'gray': 'placeholder:text-gray-600',
    'info': 'placeholder:text-blue-600',
    'success': 'placeholder:text-green-600',
    'warning': 'placeholder:text-yellow-600',
    'danger': 'placeholder:text-red-600',
  },
}

const isLightColor = ( color ) => color === 'white' || color === 'theme-light';
const isThemetColor = ( color ) => color === 'theme' || color === 'theme-dark' || color === 'theme-light';

const getDefaultTextStyle = (color) => {
  const isStyleDark = !isLightColor(color);
  const isThemeColor = isThemetColor(color);

  let style = {
    color: isStyleDark ? text['white'] : text['black'],
    colorOnHover: isStyleDark ? text.hover['white'] : text.hover['black'],
    colorOnActive: isStyleDark ? text['black'] : text['white'],
  }

  if( isThemeColor ) {
    style.color = isStyleDark ? text['theme-light'] : text['theme-dark'];
    style.colorOnHover = isStyleDark ? text.hover['theme-light'] : text.hover['theme-dark'];
    style.colorOnActive = isStyleDark ? text['theme-dark'] : text['theme-light'];
  }

  return style
}

const getButtonStyle = (color = 'theme', isOutline = false, borderWidth = 'border', ringWidth ='focus:ring') => {
  
  let textStyle = getDefaultTextStyle(color);
  let borderStyle = borderWidth ? [ borderWidth, border[color]] : [];
  let ringStyle = ringWidth ? [ ringWidth, ringWidth ? ring.focus[color] : ''] : [];

  let style = [
    ...borderStyle,
    ...ringStyle,
    isOutline ? 'bg-transparent' : background[color], 
    isOutline ? text[color] : textStyle.color,
    isOutline ? background.hover(color) : background.hover(color, true),
    isOutline ? textStyle.colorOnHover : '',
  ];
  
  return style;
}

export { 
  background, 
  border, 
  ring, 
  text,
  getDefaultTextStyle, 
  getButtonStyle 
};