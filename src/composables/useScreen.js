import { shallowRef, onMounted } from 'vue';

export function useScreen(){
  const isExtraSmallScreen = shallowRef(false);
  const isSmallScreen = shallowRef(false);
  const isMediumScreen = shallowRef(false);
  const isLargeScreen = shallowRef(false);
  const isExtraLargeScreen = shallowRef(false);

  onMounted(() => {
    if(screen.width > 1280) {
      isExtraLargeScreen.value = true;
    } else if(screen.width > 1024 && screen.width < 1280){
      isLargeScreen.value = true;
    } else if(screen.width > 786 && screen.width < 1024){
      isMediumScreen.value = true;
    } else if(screen.width > 360 && screen.width < 786){
      isSmallScreen.value = true;
    } else if(screen.width < 360){
      isExtraSmallScreen.value = true;
    }
  
  })

  return { 
    isExtraSmallScreen, 
    isSmallScreen, 
    isMediumScreen, 
    isLargeScreen, 
    isExtraLargeScreen 
  };
}