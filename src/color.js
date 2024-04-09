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
  hover: function(type, isLight = false) {
    let bg =  {
      'theme-dark': isLight ? 'hover:bg-theme-600' : 'hover:bg-theme-900',
      'theme': isLight ? 'hover:bg-theme-300' : 'hover:bg-theme-600',
      'theme-light': isLight ? 'hover:bg-theme-300' : 'hover:bg-theme-100',
      'white': isLight ? 'hover:bg-slate-100' : 'hover:bg-white',
      'black': isLight ? 'hover:bg-slate-500' : 'hover:bg-black',
      'gray': isLight ? 'hover:bg-gray-500' : 'hover:bg-gray-600',
      'info': isLight ? 'hover:bg-blue-500' :'hover:bg-blue-600',
      'success': isLight ? 'hover:bg-green-500' : 'hover:bg-green-600',
      'warning': isLight ? 'hover:bg-yellow-500' : 'hover:bg-yellow-600',
      'danger': isLight ? 'hover:bg-red-500' : 'hover:bg-red-600',
    }
    return bg[type];
  }
}

const border = {
  'theme-dark': 'border border-theme-900',
  'theme': 'border border-theme-600',
  'theme-light': 'border border-theme-100',
  'white': 'border border-white',
  'black': 'border border-black',
  'gray': 'border border-gray-600',
  'info': 'border border-blue-600',
  'success': 'border border-green-600',
  'warning': 'border border-yellow-600',
  'danger': 'border border-red-600',
}

const ring = {
  focus: {
    'theme-dark': 'focus:ring-1 focus:ring-theme-900',
    'theme': 'focus:ring-1 focus:ring-theme-600',
    'theme-light': 'focus:ring-1 focus:ring-theme-100',
    'white': 'focus:ring-1 focus:ring-white',
    'black': 'focus:ring-1 focus:ring-black',
    'gray': 'focus:ring-1 focus:ring-gray-600',
    'info': 'focus:ring-1 focus:ring-blue-600',
    'success': 'focus:ring-1 focus:ring-green-600',
    'warning': 'focus:ring-1 focus:ring-yellow-600',
    'danger': 'focus:ring-1 focus:ring-red-600',
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
  }
}

const getButtonColor = (type = 'theme', isOutline = false) => {

  let textColor = text['white'];
  let textColorOnHover = text.hover['white'];
  
  if( type === 'white' ) {
    textColor = text['black'];
    textColorOnHover = text.hover['black'];
  }

  if( type === 'theme-light' ) {
    textColor = text['theme-dark'];
    textColorOnHover = text.hover['theme-dark'];
  }

  if( type === 'theme-dark' || type === 'theme' ) {
    textColor = text['theme-light'];
    textColorOnHover = text.hover['theme-light'];
  }
  
  let color = [
    border[type],
    ring.focus[type],
    isOutline ? 'bg-transparent' : background[type], 
    isOutline ? text[type] : textColor,
    isOutline ? background.hover(type) : background.hover(type, true),
    isOutline ? textColorOnHover : '',
  ];
  
  return color;
}

export { background, border, ring, text, getButtonColor };