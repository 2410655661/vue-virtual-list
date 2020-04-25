export function debouce(executor, interval) {
  let timer;
  return function (...agus) {
    if (timer) {
      return;
    }
    executor.apply(this, agus);
    timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
    }, interval);
  }
}
