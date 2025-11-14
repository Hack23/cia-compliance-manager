/**
 * Security header constants for Content Security Policy and other HTTP security headers.
 * These values are used in both index.html meta tags and vite.config.ts server headers.
 *
 * @module securityConstants
 */

/**
 * Content Security Policy directives to prevent XSS attacks and control resource loading.
 *
 * Directives:
 * - default-src 'self': Only allow resources from same origin by default
 * - script-src 'self': Only allow scripts from same origin
 * - style-src 'self' 'unsafe-inline': Allow same-origin styles and inline styles (required for TailwindCSS/React)
 * - img-src 'self' data: https:: Allow images from same origin, data URIs, and HTTPS sources
 * - font-src 'self' data:: Allow fonts from same origin and data URIs
 * - connect-src 'self': Only allow AJAX/WebSocket connections to same origin
 * - object-src 'none': Disallow plugins like Flash
 * - base-uri 'self': Restrict base URL to same origin
 * - form-action 'self': Only allow form submissions to same origin
 * - frame-ancestors 'none': Prevent embedding in iframes (clickjacking protection)
 * - upgrade-insecure-requests: Automatically upgrade HTTP requests to HTTPS
 */
export const CONTENT_SECURITY_POLICY =
  "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;";

/**
 * X-Frame-Options header value to prevent clickjacking attacks.
 * DENY prevents the page from being embedded in any iframe.
 */
export const X_FRAME_OPTIONS = "DENY";

/**
 * X-Content-Type-Options header value to prevent MIME-type sniffing.
 * nosniff forces browsers to respect the declared Content-Type.
 */
export const X_CONTENT_TYPE_OPTIONS = "nosniff";

/**
 * Cross-Origin-Opener-Policy header value for Spectre vulnerability protection.
 * same-origin isolates the browsing context group.
 */
export const CROSS_ORIGIN_OPENER_POLICY = "same-origin";

/**
 * Cross-Origin-Embedder-Policy header value for Spectre vulnerability protection.
 * require-corp ensures cross-origin resources explicitly opt-in to being loaded.
 */
export const CROSS_ORIGIN_EMBEDDER_POLICY = "require-corp";

/**
 * Cross-Origin-Resource-Policy header value to control resource loading.
 * cross-origin allows cross-origin loading (required for GitHub Pages deployment).
 */
export const CROSS_ORIGIN_RESOURCE_POLICY = "cross-origin";

/**
 * Referrer-Policy header value to control referrer information leakage.
 * strict-origin-when-cross-origin sends full URL for same-origin, only origin for cross-origin.
 */
export const REFERRER_POLICY = "strict-origin-when-cross-origin";

/**
 * Permissions-Policy header value to disable unnecessary browser features.
 * Disables: accelerometer, camera, geolocation, gyroscope, magnetometer, microphone, payment, usb
 */
export const PERMISSIONS_POLICY =
  "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()";

/**
 * Complete security headers configuration object for use in server configurations.
 */
export const SECURITY_HEADERS = {
  "Content-Security-Policy": CONTENT_SECURITY_POLICY,
  "X-Frame-Options": X_FRAME_OPTIONS,
  "X-Content-Type-Options": X_CONTENT_TYPE_OPTIONS,
  "Cross-Origin-Opener-Policy": CROSS_ORIGIN_OPENER_POLICY,
  "Cross-Origin-Embedder-Policy": CROSS_ORIGIN_EMBEDDER_POLICY,
  "Cross-Origin-Resource-Policy": CROSS_ORIGIN_RESOURCE_POLICY,
  "Referrer-Policy": REFERRER_POLICY,
  "Permissions-Policy": PERMISSIONS_POLICY,
} as const;
