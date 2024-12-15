export function useDebounce(callback, delay = 250) {
  let hasTimeout;

  return (...args) => {
    if( hasTimeout ) {
      clearTimeout(hasTimeout);
    };

    hasTimeout = setTimeout(() => {
      callback(...args);
    }, delay)
  } 
}