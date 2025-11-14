import { readFileSync } from "fs";
import { resolve } from "path";
import { describe, expect, it } from "vitest";

describe("Security Headers", () => {
  describe("index.html security meta tags", () => {
    let indexHtml: string;

    try {
      // Try to read from build directory first (for CI/CD)
      indexHtml = readFileSync(
        resolve(__dirname, "../../build/index.html"),
        "utf-8"
      );
    } catch {
      // Fall back to source index.html for local development
      indexHtml = readFileSync(
        resolve(__dirname, "../../index.html"),
        "utf-8"
      );
    }

    it("should contain Content-Security-Policy meta tag", () => {
      expect(indexHtml).toContain('http-equiv="Content-Security-Policy"');
      expect(indexHtml).toContain("default-src 'self'");
      expect(indexHtml).toContain("script-src 'self'");
      expect(indexHtml).toContain("style-src 'self' 'unsafe-inline'");
      expect(indexHtml).toContain("object-src 'none'");
      expect(indexHtml).toContain("frame-ancestors 'none'");
    });

    it("should contain X-Frame-Options meta tag with DENY", () => {
      expect(indexHtml).toContain('http-equiv="X-Frame-Options"');
      expect(indexHtml).toContain('content="DENY"');
    });

    it("should contain X-Content-Type-Options meta tag with nosniff", () => {
      expect(indexHtml).toContain('http-equiv="X-Content-Type-Options"');
      expect(indexHtml).toContain('content="nosniff"');
    });

    it("should contain Cross-Origin-Opener-Policy meta tag", () => {
      expect(indexHtml).toContain('http-equiv="Cross-Origin-Opener-Policy"');
      expect(indexHtml).toContain('content="same-origin"');
    });

    it("should contain Cross-Origin-Embedder-Policy meta tag", () => {
      expect(indexHtml).toContain(
        'http-equiv="Cross-Origin-Embedder-Policy"'
      );
      expect(indexHtml).toContain('content="require-corp"');
    });

    it("should contain Cross-Origin-Resource-Policy meta tag", () => {
      expect(indexHtml).toContain(
        'http-equiv="Cross-Origin-Resource-Policy"'
      );
      expect(indexHtml).toContain('content="cross-origin"');
    });

    it("should contain Referrer-Policy meta tag", () => {
      expect(indexHtml).toContain('http-equiv="Referrer-Policy"');
      expect(indexHtml).toContain('content="strict-origin-when-cross-origin"');
    });

    it("should contain Permissions-Policy meta tag", () => {
      expect(indexHtml).toContain('http-equiv="Permissions-Policy"');
      expect(indexHtml).toContain("accelerometer=()");
      expect(indexHtml).toContain("camera=()");
      expect(indexHtml).toContain("geolocation=()");
      expect(indexHtml).toContain("microphone=()");
    });

    it("should have CSP that allows required resources", () => {
      expect(indexHtml).toContain("img-src 'self' data: https:");
      expect(indexHtml).toContain("font-src 'self' data:");
      expect(indexHtml).toContain("connect-src 'self'");
    });

    it("should have CSP base-uri and form-action restrictions", () => {
      expect(indexHtml).toContain("base-uri 'self'");
      expect(indexHtml).toContain("form-action 'self'");
    });

    it("should upgrade insecure requests in CSP", () => {
      expect(indexHtml).toContain("upgrade-insecure-requests");
    });
  });

  describe("Security header comments", () => {
    let indexHtml: string;

    try {
      indexHtml = readFileSync(
        resolve(__dirname, "../../build/index.html"),
        "utf-8"
      );
    } catch {
      indexHtml = readFileSync(
        resolve(__dirname, "../../index.html"),
        "utf-8"
      );
    }

    it("should have security headers section comment", () => {
      expect(indexHtml).toContain("<!-- Security Headers -->");
    });

    it("should have CSP explanation comment", () => {
      expect(indexHtml).toContain(
        "<!-- Content Security Policy: Prevent XSS attacks -->"
      );
    });

    it("should have X-Frame-Options explanation comment", () => {
      expect(indexHtml).toContain(
        "<!-- X-Frame-Options: Prevent clickjacking -->"
      );
    });

    it("should have Spectre protection comments", () => {
      expect(indexHtml).toContain("<!-- Cross-Origin-Opener-Policy: Spectre protection -->");
      expect(indexHtml).toContain("<!-- Cross-Origin-Embedder-Policy: Spectre protection -->");
    });
  });
});
