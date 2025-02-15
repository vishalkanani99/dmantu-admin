import { shallowRef, onMounted, ref } from 'vue';
import { useEventListener } from './useEventListener';

export function useScreen(){
  const isXs = shallowRef(false);
  const isSm = shallowRef(false);
  const isMd = shallowRef(false);
  const isLg = shallowRef(false);
  const isXl = shallowRef(false);
  const isMMXs = shallowRef(false);
  const isMMSm = shallowRef(false);
  const isMMMd = shallowRef(false);
  const isMMLg = shallowRef(false);
  const isMMXl = shallowRef(false);

  function resetScreen() {
    isXs.value = isSm.value = isMd.value = isLg.value = isXl.value = false;
    isMMXs.value = isMMSm.value = isMMMd.value = isMMLg.value = isMMXl.value = false;
  }
  
  function update(w) {
    if(w > 1280) {
      isXl.value = true;
      isMMXs.value = isMMSm.value = isMMMd.value = isMMLg.value = isMMXl.value = true;
    } else if(w >= 1024 && w < 1280){
      isLg.value = true;
      isMMXs.value = isMMSm.value = isMMMd.value = isMMLg.value = true;
    } else if(w >= 768 && w < 1024){
      isMd.value = true;
      isMMXs.value = isMMSm.value = isMMMd.value = true;
    } else if(w >= 360 && w < 768){
      isSm.value = true;
      isMMXs.value = isMMSm.value = true;
    } else if(w < 360){
      isXs.value = isMMXs.value = true;
    }
  }

  const initResize = () => {
    resetScreen();
    update(innerWidth);
  }
  onMounted(() => {
    initResize();
    useEventListener(window, 'resize', initResize);
  })

  return { 
    isXs, 
    isSm, 
    isMd, 
    isLg, 
    isXl,
    isMMXs, 
    isMMSm, 
    isMMMd, 
    isMMLg, 
    isMMXl, 
  };
}