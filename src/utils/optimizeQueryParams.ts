/**
 * Converts an object to an optimized query string.
 * Removes undefined/null/empty string values and sorts keys alphabetically.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function optimizeQueryParams(params: Record<string, any>): string {
  const filtered = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .sort(([a], [b]) => a.localeCompare(b));

  const query = filtered
    .map(([k, v]) =>
      Array.isArray(v)
        ? v
            .map(
              (item) => `${encodeURIComponent(k)}=${encodeURIComponent(item)}`
            )
            .join("&")
        : `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
    )
    .join("&");

  return query;
}
