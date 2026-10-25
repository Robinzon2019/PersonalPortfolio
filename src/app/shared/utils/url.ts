/** Devuelve la URL solo si es http(s) válida; en caso contrario, null. */
export function toHttpUrl(value: string | undefined | null): string | null {
  const raw = value?.trim();
  if (!raw) {
    return null;
  }
  try {
    const url = new URL(raw);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : null;
  } catch {
    return null;
  }
}
