/**
 * Cypress test constants
 * Re-exports only the constants actually used in Cypress tests
 */

// Only re-export SECURITY_LEVELS as it's the only constant used in e2e tests
export { SECURITY_LEVELS } from "../../src/constants/coreConstants";

/**
 * Security header selectors for E2E testing
 * Used to validate security headers in meta tags
 */
export const SECURITY_HEADER_SELECTORS = {
  CSP: 'meta[http-equiv="Content-Security-Policy"]',
  X_CONTENT_TYPE_OPTIONS: 'meta[http-equiv="X-Content-Type-Options"]',
  X_FRAME_OPTIONS: 'meta[http-equiv="X-Frame-Options"]',
  COOP: 'meta[http-equiv="Cross-Origin-Opener-Policy"]',
  COEP: 'meta[http-equiv="Cross-Origin-Embedder-Policy"]',
  REFERRER: 'meta[name="referrer"]',
} as const;

/**
 * Security layer configurations for defense-in-depth verification
 */
export const SECURITY_LAYER_CONFIGS = [
  {
    name: "XSS Protection",
    selector: SECURITY_HEADER_SELECTORS.CSP,
  },
  {
    name: "Clickjacking Protection",
    selector: SECURITY_HEADER_SELECTORS.X_FRAME_OPTIONS,
  },
  {
    name: "MIME-Sniffing Protection",
    selector: SECURITY_HEADER_SELECTORS.X_CONTENT_TYPE_OPTIONS,
  },
  {
    name: "Spectre Protection",
    selector: SECURITY_HEADER_SELECTORS.COOP,
  },
] as const;
