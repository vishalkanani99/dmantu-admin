import { getCurrentScope, onScopeDispose } from "vue";
export function useThrottle(callback, delay = 500) {
  let hasTimeout, recentArgs, isWaiting = false;

  let timeoutFn = () => {
    if( !recentArgs ) {
      isWaiting = false;
    } else {
      callback(...recentArgs);
      recentArgs = null;
      hasTimeout = setTimeout(timeoutFn, delay);
    }
  }

  if (getCurrentScope()) {
    onScopeDispose(() => {
      if(hasTimeout){
        clearTimeout(hasTimeout);
      }
    });
  }

  return (...args) => {
    if( isWaiting ) {
      recentArgs = args;
      return;
    };
    isWaiting = true;
    callback(...args);
    hasTimeout = setTimeout(timeoutFn, delay)
  } 
}