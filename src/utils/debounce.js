export const debounce = (fn, delay = 250) => {
  let timeout;
  return function (arg) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(arg);
    }, delay);
  };
};
