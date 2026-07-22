export function telHref(number: string): string {
  const trimmed = number.trim();
  const sign = trimmed.startsWith("+") ? "+" : "";
  return `tel:${sign}${trimmed.replace(/[^\d]/g, "")}`;
}
