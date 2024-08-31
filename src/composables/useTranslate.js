import { ref, watchEffect, toValue } from 'vue'

export function useTranslate(origin2d){
  const show = ref('scale-100');
  const hide = ref('scale-0');

  function updateTranslate() {
    let origin = toValue(origin2d) ?? 'center';
    let originY = origin === 'top' || origin === 'bottom';
    let originX = origin === 'right' || origin === 'left';

    if( originY ) {
      show.value = 'translate-y-0';
      hide.value = origin === 'top' ? '-translate-y-full' : 'translate-y-full';
      return;
    }

    if( originX ) {
      show.value = 'translate-x-0';
      hide.value = origin === 'left' ? '-translate-x-full' : 'translate-x-full';
      return;
    }

    show.value = 'scale-100';
    hide.value = 'scale-0';
  }

  watchEffect(() => {
    updateTranslate();
  });

  return { 
    hide, 
    show,
  };
}