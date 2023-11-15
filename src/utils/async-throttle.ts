export function asyncThrottle<T>(func: () => PromiseLike<T>, wait = 0): () => PromiseLike<T> {
  let onGoing: PromiseLike<T> | null = null;
  return () => {
    if (onGoing) {
      return onGoing;
    } else {
      onGoing = func();
      setTimeout(() => {
        onGoing = null;
      }, wait);
      return onGoing;
    }
  };
}
