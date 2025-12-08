export function slugify(str: string) {
  return str
    .toString()
    .normalize("NFKD") // normalize accents
    .replace(/[\u0300-\u036f]/g, "") // remove diacritics (accent chars)
    .replace(/[^\w\u0600-\u06FF\s-]/g, "") // remove non-word except Persian
    .replace(/\s+/g, "-") // spaces → hyphen
    .replace(/--+/g, "-") // collapse multiple hyphens
    .replace(/^-+|-+$/g, "") // trim hyphens
    .toLowerCase();
}

export function toRGBA(color: string, alpha = 0.1) {
  // اگر فرمت rgb باشد → مستقیم
  if (color.includes(",")) return `rgba(${color}, ${alpha})`;

  // اگر hex باشد
  const m = color.replace("#", "");
  const bigint = parseInt(m, 16);

  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
