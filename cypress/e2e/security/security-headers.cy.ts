/**
 * Security Headers E2E Tests
 *
 * Validates that security headers are properly configured to protect against
 * XSS, clickjacking, MIME-sniffing, and other web vulnerabilities.
 *
 * Tests ensure compliance with OWASP Secure Headers Project recommendations
 * and Hack23 AB's ISMS Application Security Framework requirements.
 *
 * @see https://owasp.org/www-project-secure-headers/
 * @see ../../../SECURITY.md#security-headers-implementation
 */

import {
  SECURITY_HEADER_SELECTORS,
  SECURITY_LAYER_CONFIGS,
} from "../../support/constants";

/**
 * Extended Window interface for CSP violation tracking
 */
interface WindowWithCSPViolations extends Window {
  cspViolations: () => number;
}

describe("Security Headers", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
  });

  describe("Content Security Policy (CSP)", () => {
    it("should have CSP meta tag configured", () => {
      cy.get(SECURITY_HEADER_SELECTORS.CSP)
        .should("exist")
        .and("have.attr", "content")
        .and("not.be.empty");
    });

    it("should include required CSP directives", () => {
      cy.get(SECURITY_HEADER_SELECTORS.CSP)
        .should("have.attr", "content")
        .then((content) => {
          const cspContent = content as string;

          // Verify critical CSP directives
          expect(cspContent).to.include(
            "default-src 'self'",
            "CSP should restrict default sources to same origin"
          );
          expect(cspContent).to.include(
            "script-src 'self'",
            "CSP should restrict scripts to same origin"
          );
          expect(cspContent).to.include(
            "object-src 'none'",
            "CSP should block all plugins (Flash, Java, etc.)"
          );
          expect(cspContent).to.include(
            "base-uri 'self'",
            "CSP should restrict base tag URLs to same origin"
          );
          expect(cspContent).to.include(
            "form-action 'self'",
            "CSP should restrict form submissions to same origin"
          );
          // frame-ancestors is an HTTP-header-only CSP directive and must not
          // appear in meta tags (browsers ignore it and emit a console warning).
          // It is configured via vite.config.ts (dev) and CloudFront (production).
          expect(cspContent).not.to.include(
            "frame-ancestors",
            "CSP meta tag must not contain frame-ancestors (HTTP-header-only directive)"
          );
        });
    });

    it("should allow required font sources for Orbitron and Share Tech Mono", () => {
      cy.get(SECURITY_HEADER_SELECTORS.CSP)
        .should("have.attr", "content")
        .then((content) => {
          const cspContent = content as string;

          // Verify font sources for Google Fonts
          expect(cspContent).to.include(
            "font-src",
            "CSP should include font-src directive"
          );
          expect(cspContent).to.include(
            "https://fonts.gstatic.com",
            "CSP should allow Google Fonts for typography"
          );
        });
    });

    it("should allow required style sources", () => {
      cy.get(SECURITY_HEADER_SELECTORS.CSP)
        .should("have.attr", "content")
        .then((content) => {
          const cspContent = content as string;

          // Verify style sources
          expect(cspContent).to.include(
            "style-src",
            "CSP should include style-src directive"
          );
          expect(cspContent).to.include(
            "'unsafe-inline'",
            "CSP should allow inline styles for TailwindCSS"
          );
          expect(cspContent).to.include(
            "https://fonts.googleapis.com",
            "CSP should allow Google Fonts stylesheets"
          );
        });
    });

    it("should include upgrade-insecure-requests directive", () => {
      cy.get(SECURITY_HEADER_SELECTORS.CSP)
        .should("have.attr", "content")
        .and("include", "upgrade-insecure-requests");
    });
  });

  describe("X-Content-Type-Options", () => {
    it("should have X-Content-Type-Options meta tag set to nosniff", () => {
      cy.get(SECURITY_HEADER_SELECTORS.X_CONTENT_TYPE_OPTIONS)
        .should("exist")
        .and("have.attr", "content", "nosniff");
    });
  });

  describe("Clickjacking Protection", () => {
    it("should not have X-Frame-Options as meta tag (HTTP header only)", () => {
      // X-Frame-Options can only be set via HTTP headers, not meta tags
      // Verify it is NOT present as a meta tag (which would be ignored by browsers)
      cy.get('meta[http-equiv="X-Frame-Options"]').should("not.exist");
    });

    it("should enforce clickjacking protection via HTTP response headers", () => {
      // Verify X-Frame-Options and frame-ancestors are delivered as HTTP headers
      // (configured in vite.config.ts for dev, CloudFront for production)
      cy.request("/").then((response) => {
        const headers = response.headers;

        // X-Frame-Options must be DENY via HTTP header
        expect(headers).to.have.property("x-frame-options");
        expect(headers["x-frame-options"]).to.match(
          /deny/i,
          "X-Frame-Options HTTP header should be DENY"
        );

        // CSP frame-ancestors must be present in the HTTP header
        expect(headers).to.have.property("content-security-policy");
        const cspHeader = headers["content-security-policy"] as string;
        expect(cspHeader).to.include(
          "frame-ancestors",
          "CSP HTTP header should include frame-ancestors directive"
        );
      });
    });
  });

  describe("Cross-Origin Policies", () => {
    it("should have Cross-Origin-Opener-Policy set to same-origin", () => {
      cy.get(SECURITY_HEADER_SELECTORS.COOP)
        .should("exist")
        .and("have.attr", "content", "same-origin");
    });

    it("should have Cross-Origin-Embedder-Policy set to require-corp", () => {
      cy.get(SECURITY_HEADER_SELECTORS.COEP)
        .should("exist")
        .and("have.attr", "content", "require-corp");
    });
  });

  describe("Referrer Policy", () => {
    it("should have Referrer-Policy meta tag configured", () => {
      cy.get(SECURITY_HEADER_SELECTORS.REFERRER)
        .should("exist")
        .and("have.attr", "content", "strict-origin-when-cross-origin");
    });
  });

  describe("Security Headers Comprehensive Check", () => {
    it("should have all required security headers present", () => {
      const requiredHeaders = [
        SECURITY_HEADER_SELECTORS.CSP,
        SECURITY_HEADER_SELECTORS.X_CONTENT_TYPE_OPTIONS,
        SECURITY_HEADER_SELECTORS.COOP,
        SECURITY_HEADER_SELECTORS.COEP,
        SECURITY_HEADER_SELECTORS.REFERRER,
      ];

      requiredHeaders.forEach((selector) => {
        cy.get(selector).should("exist");
      });
    });

    it("should not display any CSP violations in console", () => {
      // This test needs to be run separately to capture violations during initial page load
      cy.visit("/", {
        onBeforeLoad(win: Window) {
          // Track CSP violations
          let cspViolations = 0;
          win.addEventListener("securitypolicyviolation", (e: SecurityPolicyViolationEvent) => {
            cspViolations++;
            // Log violation details for debugging
            const { violatedDirective, blockedURI } = e;
            cy.log(
              `CSP Violation: ${violatedDirective} - ${blockedURI || "inline"}`
            );
          });
          // Store reference for later assertion
          (win as WindowWithCSPViolations).cspViolations =
            () => cspViolations;
        },
      });
      cy.ensureAppLoaded();

      // Wait a moment for any violations to be reported
      cy.wait(1000);

      // Verify no violations occurred during page load
      cy.window().then((win) => {
        const violations = (
          win as WindowWithCSPViolations
        ).cspViolations();
        expect(violations).to.equal(0, "No CSP violations detected");
      });
    });
  });

  describe("ISMS Compliance Verification", () => {
    it("should meet Application Security Framework requirements", () => {
      // Verify all security headers are present as per ISMS requirements
      cy.get("head")
        .find(SECURITY_HEADER_SELECTORS.CSP)
        .should("exist");
      cy.get("head")
        .find(SECURITY_HEADER_SELECTORS.X_CONTENT_TYPE_OPTIONS)
        .should("exist");
      // Note: X-Frame-Options is enforced via HTTP headers (vite.config.ts dev / CloudFront production)
      // and should NOT be present as a meta tag

      cy.log("✅ Application Security Framework requirements met");
    });

    it("should implement defense-in-depth security strategy", () => {
      // Multiple layers of security controls using reusable constants
      SECURITY_LAYER_CONFIGS.forEach((layer) => {
        cy.get(layer.selector).should(
          "exist",
          `${layer.name} should be implemented`
        );
        cy.log(`✅ ${layer.name} implemented`);
      });
    });
  });
});
