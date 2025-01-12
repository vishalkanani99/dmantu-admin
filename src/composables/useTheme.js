import { ref, watchEffect } from "vue";

const themeColors = {
  'theme': { default: 'theme', dark: 'theme-primary', inverse: 'theme-inverse' },
  'info': { default: 'info', dark: 'info-primary', inverse: 'info-inverse' }, 
  'danger': { default: 'danger', dark: 'danger-primary', inverse: 'danger-inverse' }, 
  'black': { default: 'black', dark: 'black-primary', inverse: 'black-inverse' },
  'white': { default: 'white', dark: 'white-primary', inverse: 'white-inverse' }, 
  'gray': { default: 'gray', dark: 'gray-primary', inverse: 'gray-inverse' }, 
  'success': { default: 'success', dark: 'success-primary', inverse: 'success-inverse' }, 
  'warning': { default: 'warning', dark: 'warning-primary', inverse: 'warning-inverse' }
};

const activeColors = ref();

export function useTheme(){

  const getColorInverse = (color) => {
    color = color ? color.split('-') : [];
    if(themeColors[color[0]]) {
      if(color[1] && color[1] === 'inverse') {
        return themeColors[color[0]]['default'];
      }
      return themeColors[color[0]]['inverse'];
    }
    return;
  }

  const setActiveColor = (color) => {
    activeColors.value = themeColors[color];

    for (const key in themeColors) {
      document.body.classList.remove(key);
    }
    document.body.classList.add(color);
  }
  
  watchEffect(() => {
    setActiveColor('warning');
  });

  return {
    themeColors,
    activeColors,
    setActiveColor,
    getColorInverse, 
  };
}