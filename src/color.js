import { before } from "lodash";

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
  hover: function(color, isLight = false) {
    let bg =  {
      'theme-dark': isLight ? 'hover:bg-theme-900/[0.9]' : 'hover:bg-theme-900',
      'theme': isLight ? 'hover:bg-theme-600/[0.9]' : 'hover:bg-theme-600',
      'theme-light': isLight ? 'hover:bg-theme-100/[0.9]' : 'hover:bg-theme-100',
      'white': isLight ? 'hover:bg-white/[0.9]' : 'hover:bg-white',
      'black': isLight ? 'hover:bg-black/[0.9]' : 'hover:bg-black',
      'gray': isLight ? 'hover:bg-gray-600/[0.9]' : 'hover:bg-gray-600',
      'info': isLight ? 'hover:bg-blue-600/[0.9]' :'hover:bg-blue-600',
      'success': isLight ? 'hover:bg-green-600/[0.9]' : 'hover:bg-green-600',
      'warning': isLight ? 'hover:bg-yellow-600/[0.9]' : 'hover:bg-yellow-600',
      'danger': isLight ? 'hover:bg-red-600/[0.9]' : 'hover:bg-red-600',
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
    'theme-dark': 'focus:ring-theme-900',
    'theme': 'focus:ring-theme-600',
    'theme-light': 'focus:ring-theme-100',
    'white': 'focus:ring-white',
    'black': 'focus:ring-black',
    'gray': 'focus:ring-gray-600',
    'info': 'focus:ring-blue-600',
    'success': 'focus:ring-green-600',
    'warning': 'focus:ring-yellow-600',
    'danger': 'focus:ring-red-600',
  },
  'peer-focus': {
    'theme-dark': 'peer-focus:ring-theme-900/[0.5]',
    'theme': 'peer-focus:ring-theme-600/[0.5]',
    'theme-light': 'peer-focus:ring-theme-100/[0.5]',
    'white': 'peer-focus:ring-white/[0.5]',
    'black': 'peer-focus:ring-black/[0.5]',
    'gray': 'peer-focus:ring-gray-600/[0.5]',
    'info': 'peer-focus:ring-blue-600/[0.5]',
    'success': 'peer-focus:ring-green-600/[0.5]',
    'warning': 'peer-focus:ring-yellow-600/[0.5]',
    'danger': 'peer-focus:ring-red-600/[0.5]',
  }
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

const getDefaultTextStyle = (color = 'theme') => {
  let textColor = text['white'];
  let textColorOnHover = text.hover['white'];
  
  if( color === 'white' ) {
    textColor = text['black'];
    textColorOnHover = text.hover['black'];
  }

  if( color === 'theme-light' ) {
    textColor = text['theme-dark'];
    textColorOnHover = text.hover['theme-dark'];
  }

  if( color === 'theme-dark' || color === 'theme' ) {
    textColor = text['theme-light'];
    textColorOnHover = text.hover['theme-light'];
  }

  return {
    textColor,
    textColorOnHover,
  }
}

const getButtonStyle = (color = 'theme', isOutline = false, borderWidth = 'border', ringWidth ='focus:ring-1') => {
  
  let defaultTextStyle = getDefaultTextStyle(color);
  
  let style = [
    borderWidth,
    border[color],
    ringWidth,
    ring.focus[color],
    isOutline ? 'bg-transparent' : background[color], 
    isOutline ? text[color] : defaultTextStyle.textColor,
    isOutline ? background.hover(color) : background.hover(color, true),
    isOutline ? defaultTextStyle.textColorOnHover : '',
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