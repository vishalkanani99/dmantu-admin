export function useThrottle(callback, delay = 500) {
  let recentArgs, isWaiting = false;

  let timeoutFn = () => {
    if( recentArgs === null ) {
      isWaiting = false;
    } else {
      callback(...recentArgs);
      recentArgs = null;
      setTimeout(timeoutFn, delay);
    }
  }

  return (...args) => {
    if( isWaiting ) {
      recentArgs = args;
      return;
    };
    isWaiting = true;
    callback(...args);
    setTimeout(timeoutFn, delay)
  } 
}