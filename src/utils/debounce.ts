// biome-ignore lint/suspicious/noExplicitAny: explanation
export const debounce = <T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
) => {
  let timer: ReturnType<typeof setTimeout>;

  // biome-ignore lint/suspicious/noExplicitAny: explanation
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
