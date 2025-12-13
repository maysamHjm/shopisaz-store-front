export function getInitials(title: string): string {
  return title
    .trim()
    .split(/\s+/) // split by spaces
    .filter((word) => /[a-zA-Z0-9]/.test(word)) // remove symbols like &
    .map((word) => word[0].toUpperCase())
    .join("");
}
