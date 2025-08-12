export function debounce(
  fn: (value: string) => void,
  delay: number
): (value: string) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (value: string) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(value);
    }, delay);
  };
}
