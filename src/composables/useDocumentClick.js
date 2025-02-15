import { ref, watchEffect, toValue, shallowRef, isRef } from 'vue';
import { useEventListener } from './useEventListener';

export function useDocumentClick(containerRef, outsideTargetCb, onTargetCb = () => {} ){
  let target, mainTarget, isTargetExist;

  function validate(el) {
    target = el.target;
    mainTarget = isRef(containerRef) ? toValue(containerRef) : containerRef;
    isTargetExist = document.body.contains(el.target);

    if(!isTargetExist || !mainTarget) return;

    if(mainTarget.contains(target)){
      onTargetCb(target);
    } else {
      outsideTargetCb(target);
    }
  }

  function registerEvent() {
    useEventListener(document, 'click', validate);
  }

  function initDocumentClick() {
    registerEvent();
  }

  watchEffect(() => {
    initDocumentClick();
  });
}