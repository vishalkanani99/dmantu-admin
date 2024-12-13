import { ref, watchEffect, toValue, shallowRef, isRef } from 'vue';
import { useEventListener } from './useEventListener';

export function useScrollOver(targetRef, thresholdRef = 0, scrollableRef = document){
  let target, threshold, mainTarget, hasDocHeight;
  const visible = shallowRef(false);
  const visibleAtBottom = shallowRef(false);

  function initParams() {
    visible.value = false;
    visibleAtBottom.value = false;
    target = isRef(targetRef) ? toValue(targetRef) : targetRef;
    threshold = isRef(thresholdRef) ? toValue(thresholdRef) : thresholdRef;
    mainTarget = isRef(scrollableRef) ? toValue(scrollableRef) : scrollableRef;
    hasDocHeight = mainTarget === document || mainTarget === window || mainTarget === document.body;
    return target && mainTarget;
  }

  function validate() {
    let mainTargetHeight = Math.round(hasDocHeight ? document.documentElement.clientHeight : mainTarget.clientHeight);
    let mainTargetTop = !hasDocHeight ? Math.round(mainTarget.getBoundingClientRect().top) : 0;
    let targetTop = Math.round(target.getBoundingClientRect().top) - mainTargetTop;
    let targetHeight = Math.round(target.getBoundingClientRect().height);
    let targetHeightWithThreshold = targetHeight + threshold;
    
    if(targetTop >= 0 && targetTop < mainTargetHeight){
      visible.value = true;
      visibleAtBottom.value = (targetTop + targetHeightWithThreshold) < mainTargetHeight;
    }

  }

  function registerEvent() {
    useEventListener(mainTarget, 'scroll', validate);
  }

  function initScrollOver() {
    if( !initParams() ) return;
    validate();
    registerEvent();
  }

  watchEffect(() => {
    initScrollOver();
  });

  return { 
    visible,
    visibleAtBottom,
  };
}