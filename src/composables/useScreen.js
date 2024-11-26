import { shallowRef, onMounted } from 'vue';

export function useScreen(){
  const isXs = shallowRef(false);
  const isSm = shallowRef(false);
  const isMd = shallowRef(false);
  const isLg = shallowRef(false);
  const isXl = shallowRef(false);

  onMounted(() => {
    if(screen.width > 1280) {
      isXl.value = true;
    } else if(screen.width >= 1024 && screen.width < 1280){
      isLg.value = true;
    } else if(screen.width >= 768 && screen.width < 1024){
      isMd.value = true;
    } else if(screen.width >= 360 && screen.width < 768){
      isSm.value = true;
    } else if(screen.width < 360){
      isXs.value = true;
    }
  
  })

  return { 
    isXs, 
    isSm, 
    isMd, 
    isLg, 
    isXl, 
  };
}