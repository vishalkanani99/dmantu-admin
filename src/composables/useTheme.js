import { ref, shallowRef, watchEffect } from "vue";

const activeColor = shallowRef('danger');
const activeColors = ref();

export function useTheme(){
  const colors = {
    'theme': { default: 'theme', dark: 'theme-primary', inverse: 'theme-inverse' },
    'info': { default: 'info', dark: 'info-primary', inverse: 'info-inverse' }, 
    'danger': { default: 'danger', dark: 'danger-primary', inverse: 'danger-inverse' }, 
    'black': { default: 'black', dark: 'black-primary', inverse: 'black-inverse' },
    'white': { default: 'white', dark: 'white-primary', inverse: 'white-inverse' }, 
    'gray': { default: 'gray', dark: 'gray-primary', inverse: 'gray-inverse' }, 
    'success': { default: 'success', dark: 'success-primary', inverse: 'success-inverse' }, 
    'warning': { default: 'warning', dark: 'warning-primary', inverse: 'warning-inverse' }
  };

  const getColorInverse = (color) => {
    color = color ? color.split('-') : [];
    if(colors[color[0]] && colors[color[0]]['inverse']) {
      return colors[color[0]]['inverse'];
    }
    return;
  }

  watchEffect(() => {
    activeColors.value = colors[activeColor.value];
    for (const key in colors) {
      document.body.classList.remove(key);
    }
    document.body.classList.add(activeColor.value);
  });

  return {
    colors,
    activeColors,
    getColorInverse, 
  };
}