import { useEventListener } from './useEventListener';

export function useSwiper() {
  
  const initSwiperEvents = (target, startDraggingCb, draggingCb, stopDraggingCb) => {
    let position, draggedPosition, registeredEvents = [], isDragging = false;

    const startDragging = (e) => {
      let pageX = e?.pageX || ( e?.touches?.length && e.touches[0]?.pageX);
      position = pageX;
      setStyle('grabbing');
      startDraggingCb(position, e);
      isDragging = true;
    }
  
    const dragging = (e) => {
      if(!isDragging) return;
      let pageX = e?.pageX || ( e?.touches?.length && e.touches[0]?.pageX);
      if(e.type === 'mousemove') {
        e.preventDefault();
      }
      draggedPosition = pageX - position;
      draggingCb(draggedPosition, e);
    }
  
    const stopDragging = (e) => {
      if(!isDragging) return;
      setStyle();
      stopDraggingCb(draggedPosition, e);
      isDragging = false;
    }
  
    const setStyle = (cursor = 'grab') => {
      target.style['cursor'] = cursor;
    }
  
    const registerSwiperEvents = () => {
      let events = [];

      if('ontouchstart' in target) {
        events.push(
          [target, "touchstart", startDragging, { 'passive': true }],
          [target, "touchmove", dragging, { 'passive': true }],
          [target, "touchend", stopDragging, { 'passive': true }],
          [target, "touchcancel", stopDragging, { 'passive': true }],
        );
      } else {
        events.push(
          [target, "mousedown", startDragging],
          [target, "mousemove", dragging],
          [target, "mouseup", stopDragging],
          [target, "mouseleave", stopDragging],
        );
      }
      registeredEvents.push(useEventListener(events));
    }

    setStyle();
    registerSwiperEvents();
    return registeredEvents;
  };
  
  const initSwiper = ( target, draggingCB, stopDraggingCB, startDraggingCB = () => {}) => {
    return initSwiperEvents(target, startDraggingCB, draggingCB, stopDraggingCB);
  }

  const initMultipleSwiper = (...args) => {
    let registeredSwipers = args[0];

    registeredSwipers = registeredSwipers.filter((swiper) => {
      return swiper[0] && typeof swiper[0] === 'object'
        && swiper[1] && typeof swiper[1] === 'function'
        && swiper[2] && typeof swiper[2] === 'function';
    }).map((swiper) => {
      return initSwiper(...swiper);
    });

    return registeredSwipers;
  }

  return { initSwiper, initMultipleSwiper };
}