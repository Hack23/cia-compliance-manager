/**
 * Helper function for safely checking matches in widget tests
 * This resolves TypeScript warnings about possible undefined values
 */
export function safelyCheckMatches(
  $matches: JQuery<HTMLElement> | undefined,
  callback: (hasMatches: boolean) => void
): void {
  if ($matches && $matches.length > 0) {
    callback(true);
  } else {
    callback(false);
  }
}
