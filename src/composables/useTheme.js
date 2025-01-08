
export function useTheme(){
  const darkColors = ['info', 'danger', 'black', 'gray', 'success', 'warning'];
  const lightColors = ['white'];

  const getColorInverse = (currentColor) => {
    if( darkColors.includes(currentColor) ) {
      return 'white';
    }
    return 'black';
  }

  return {
    darkColors,
    lightColors, 
    getColorInverse, 
  };
}