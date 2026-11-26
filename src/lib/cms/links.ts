/** Keep submitted addresses in the mailto address, never in its query or fragment. */
export function emailLink(email: string) {
  return `mailto:${encodeURIComponent(email).replace(/%40/g, "@")}`;
}
