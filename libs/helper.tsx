export const stripHtml = (html?: string) => (html ? html.replace(/<[^>]+>/g, "") : "");

export const extractFirstParagraphHtml = (html?: string) => {
  if (!html) return "";
  const parts = html.split(/<\/p>/i);
  if (!parts.length) return "";
  const first = parts[0].trim();
  return first ? (first.endsWith("</p>") ? first : `${first}</p>`) : "";
};
