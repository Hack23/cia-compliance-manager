import { readFileSync } from "fs";
import { resolve } from "path";
import { beforeAll, describe, expect, it } from "vitest";

/**
 * Reads index.html from build or source directory.
 * Tries build directory first (for CI/CD), falls back to source for local development.
 *
 * @returns The contents of index.html
 * @throws Error if neither file can be read
 */
function readIndexHtml(): string {
  try {
    // Try to read from build directory first (for CI/CD)
    return readFileSync(resolve(__dirname, "../../build/index.html"), "utf-8");
  } catch (buildError: unknown) {
    try {
      // Fall back to source index.html for local development
      return readFileSync(resolve(__dirname, "../../index.html"), "utf-8");
    } catch (sourceError: unknown) {
      // Log both errors for debugging
      console.error("Failed to read from build directory:", buildError);
      console.error("Failed to read from source directory:", sourceError);
      throw new Error(
        "Could not read index.html from build or source directory"
      );
    }
  }
}

describe("Security Headers", (): void => {
  describe("index.html security meta tags", (): void => {
    let indexHtml: string;

    beforeAll((): void => {
      indexHtml = readIndexHtml();
    });

    it("should contain Content-Security-Policy meta tag", (): void => {
      expect(indexHtml).toContain('http-equiv="Content-Security-Policy"');
      expect(indexHtml).toContain("default-src 'self'");
      expect(indexHtml).toContain("script-src 'self'");
      expect(indexHtml).toContain("style-src 'self' 'unsafe-inline'");
      expect(indexHtml).toContain("object-src 'none'");
      expect(indexHtml).toContain("frame-ancestors 'none'");
    });

    it("should contain X-Frame-Options meta tag with DENY", (): void => {
      expect(indexHtml).toContain('http-equiv="X-Frame-Options"');
      expect(indexHtml).toContain('content="DENY"');
    });

    it("should contain X-Content-Type-Options meta tag with nosniff", (): void => {
      expect(indexHtml).toContain('http-equiv="X-Content-Type-Options"');
      expect(indexHtml).toContain('content="nosniff"');
    });

    it("should contain Cross-Origin-Opener-Policy meta tag", (): void => {
      expect(indexHtml).toContain('http-equiv="Cross-Origin-Opener-Policy"');
      expect(indexHtml).toContain('content="same-origin"');
    });

    it("should contain Cross-Origin-Embedder-Policy meta tag", (): void => {
      expect(indexHtml).toContain(
        'http-equiv="Cross-Origin-Embedder-Policy"'
      );
      expect(indexHtml).toContain('content="require-corp"');
    });

    it("should contain Cross-Origin-Resource-Policy meta tag", (): void => {
      expect(indexHtml).toContain(
        'http-equiv="Cross-Origin-Resource-Policy"'
      );
      expect(indexHtml).toContain('content="cross-origin"');
    });

    it("should contain Referrer-Policy meta tag", (): void => {
      expect(indexHtml).toContain('http-equiv="Referrer-Policy"');
      expect(indexHtml).toContain('content="strict-origin-when-cross-origin"');
    });

    it("should contain Permissions-Policy meta tag", (): void => {
      expect(indexHtml).toContain('http-equiv="Permissions-Policy"');
      expect(indexHtml).toContain("accelerometer=()");
      expect(indexHtml).toContain("camera=()");
      expect(indexHtml).toContain("geolocation=()");
      expect(indexHtml).toContain("microphone=()");
    });

    it("should have CSP that allows required resources", (): void => {
      expect(indexHtml).toContain("img-src 'self' data: https:");
      expect(indexHtml).toContain("font-src 'self' data:");
      expect(indexHtml).toContain("connect-src 'self'");
    });

    it("should have CSP base-uri and form-action restrictions", (): void => {
      expect(indexHtml).toContain("base-uri 'self'");
      expect(indexHtml).toContain("form-action 'self'");
    });

    it("should upgrade insecure requests in CSP", (): void => {
      expect(indexHtml).toContain("upgrade-insecure-requests");
    });
  });

  describe("Security header comments", (): void => {
    let indexHtml: string;

    beforeAll((): void => {
      indexHtml = readIndexHtml();
    });

    it("should have security headers section comment", (): void => {
      expect(indexHtml).toContain("<!-- Security Headers -->");
    });

    it("should have CSP explanation comment", (): void => {
      expect(indexHtml).toContain(
        "<!-- Content Security Policy: Prevent XSS attacks -->"
      );
    });

    it("should have X-Frame-Options explanation comment", (): void => {
      expect(indexHtml).toContain(
        "<!-- X-Frame-Options: Prevent clickjacking -->"
      );
    });

    it("should have Spectre protection comments", (): void => {
      expect(indexHtml).toContain(
        "<!-- Cross-Origin-Opener-Policy: Spectre protection -->"
      );
      expect(indexHtml).toContain(
        "<!-- Cross-Origin-Embedder-Policy: Spectre protection -->"
      );
    });
  });
});
