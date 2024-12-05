import { getCurrentScope, onScopeDispose, watch } from "vue";

/**
 * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
 *
 * @param target // Html Object
 * @param event // String
 * @param listener // Function
 * @param options // Object
 * 
 * or multiple array of listed params eg. [[target, event, listner, options], [target, event, listner, options], ...]
 */

export function useEventListener(...args) {
  let registeredListenters = []; 
  let eventListenters = [];

  if (!Array.isArray(args[0])) {
    eventListenters.push(args);
  } else {
    eventListenters = args[0];
  }

  const register = ( target, event, callback, options = {} ) => {
    target.addEventListener(event, callback, options);
    return () => target.removeEventListener(event, callback, options);
  }
  

  const clear = () => {
    registeredListenters.forEach((listenerFn) => listenerFn());
    registeredListenters.length = 0;
  }
  
  eventListenters = eventListenters.filter((listener) => {
    return listener[0] && typeof listener[0] === 'object'
      && listener[1] && typeof listener[1] === 'string'
      && listener[2] && typeof listener[2] === 'function';
  });

  if( registeredListenters.length > 0 ) {
    clear();
  }

  registeredListenters = eventListenters.map((listener) => {
    return register(listener[0], listener[1], listener[2], listener[3] || {} );
  });

  if (getCurrentScope()) {
    onScopeDispose(clear);
  }

  return clear;
}