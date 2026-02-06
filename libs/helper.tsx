export const stripHtml = (html?: string) => (html ? html.replace(/<[^>]+>/g, "") : "");

export const extractFirstParagraphHtml = (html?: string) => {
  if (!html) return "";
  const parts = html.split(/<\/p>/i);
  if (!parts.length) return "";
  const first = parts[0].trim();
  return first ? (first.endsWith("</p>") ? first : `${first}</p>`) : "";
};


export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
) {
  let timer: NodeJS.Timeout | null = null;

  const debounced = (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, delay);
  };

  debounced.flush = () => {
    if (timer) {
      clearTimeout(timer);
      fn();
      timer = null;
    }
  };

  return debounced;
}

