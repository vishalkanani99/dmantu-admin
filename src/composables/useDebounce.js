import { getCurrentScope, onScopeDispose } from "vue";
export function useDebounce(callback, delay = 250) {
  let hasTimeout;

  function clearTimerFn() {
    if(hasTimeout){
      clearTimeout(hasTimeout);
    }
  }

  if (getCurrentScope()) {
    onScopeDispose(() => clearTimerFn());
  }

  return (...args) => {
    clearTimerFn()

    hasTimeout = setTimeout(() => {
      callback(...args);
    }, delay)
  } 
}