export function useEvent() {
  const addEvent = ( target, event, callback, options = {} ) => {
    target.addEventListener(event, callback, options);
  }
  
  const romoveEvent = ( target, event, callback, options = {} ) => {
    target.removeEventListener(event, callback, options);
  }
  
  return { addEvent, romoveEvent };
}