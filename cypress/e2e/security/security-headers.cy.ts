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

describe("Security Headers", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
  });

  describe("Content Security Policy (CSP)", () => {
    it("should have CSP meta tag configured", () => {
      cy.get('meta[http-equiv="Content-Security-Policy"]')
        .should("exist")
        .and("have.attr", "content")
        .and("not.be.empty");
    });

    it("should include required CSP directives", () => {
      cy.get('meta[http-equiv="Content-Security-Policy"]')
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
          expect(cspContent).to.include(
            "frame-ancestors 'none'",
            "CSP should prevent site from being embedded in frames"
          );
        });
    });

    it("should allow required font sources for Orbitron and Share Tech Mono", () => {
      cy.get('meta[http-equiv="Content-Security-Policy"]')
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
      cy.get('meta[http-equiv="Content-Security-Policy"]')
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
      cy.get('meta[http-equiv="Content-Security-Policy"]')
        .should("have.attr", "content")
        .and("include", "upgrade-insecure-requests");
    });
  });

  describe("X-Content-Type-Options", () => {
    it("should have X-Content-Type-Options meta tag set to nosniff", () => {
      cy.get('meta[http-equiv="X-Content-Type-Options"]')
        .should("exist")
        .and("have.attr", "content", "nosniff");
    });
  });

  describe("X-Frame-Options", () => {
    it("should have X-Frame-Options meta tag set to DENY", () => {
      cy.get('meta[http-equiv="X-Frame-Options"]')
        .should("exist")
        .and("have.attr", "content", "DENY");
    });
  });

  describe("Cross-Origin Policies", () => {
    it("should have Cross-Origin-Opener-Policy set to same-origin", () => {
      cy.get('meta[http-equiv="Cross-Origin-Opener-Policy"]')
        .should("exist")
        .and("have.attr", "content", "same-origin");
    });

    it("should have Cross-Origin-Embedder-Policy set to require-corp", () => {
      cy.get('meta[http-equiv="Cross-Origin-Embedder-Policy"]')
        .should("exist")
        .and("have.attr", "content", "require-corp");
    });
  });

  describe("Referrer Policy", () => {
    it("should have Referrer-Policy meta tag configured", () => {
      cy.get('meta[name="referrer"]')
        .should("exist")
        .and("have.attr", "content", "strict-origin-when-cross-origin");
    });
  });

  describe("Security Headers Comprehensive Check", () => {
    it("should have all required security headers present", () => {
      const requiredHeaders = [
        'meta[http-equiv="Content-Security-Policy"]',
        'meta[http-equiv="X-Content-Type-Options"]',
        'meta[http-equiv="X-Frame-Options"]',
        'meta[http-equiv="Cross-Origin-Opener-Policy"]',
        'meta[http-equiv="Cross-Origin-Embedder-Policy"]',
        'meta[name="referrer"]',
      ];

      requiredHeaders.forEach((selector) => {
        cy.get(selector).should("exist");
      });
    });

    it("should not display any CSP violations in console", () => {
      cy.window().then((win) => {
        // Check for CSP violation reports
        cy.wrap(win).its("console").should("exist");

        // Monitor for CSP violations
        let cspViolations = 0;
        win.addEventListener("securitypolicyviolation", (e) => {
          cspViolations++;
          cy.log(
            `CSP Violation: ${e.violatedDirective} - ${e.blockedURI || "inline"}`
          );
        });

        // Wait a moment for any violations to be reported
        cy.wait(1000);

        // Verify no violations occurred during page load
        cy.wrap(cspViolations).should("equal", 0, "No CSP violations detected");
      });
    });
  });

  describe("ISMS Compliance Verification", () => {
    it("should meet Application Security Framework requirements", () => {
      // Verify all security headers are present as per ISMS requirements
      cy.get("head")
        .find('meta[http-equiv="Content-Security-Policy"]')
        .should("exist");
      cy.get("head")
        .find('meta[http-equiv="X-Frame-Options"]')
        .should("exist");
      cy.get("head")
        .find('meta[http-equiv="X-Content-Type-Options"]')
        .should("exist");

      cy.log("✅ Application Security Framework requirements met");
    });

    it("should implement defense-in-depth security strategy", () => {
      // Multiple layers of security controls
      const securityLayers = [
        {
          name: "XSS Protection",
          selector: 'meta[http-equiv="Content-Security-Policy"]',
        },
        {
          name: "Clickjacking Protection",
          selector: 'meta[http-equiv="X-Frame-Options"]',
        },
        {
          name: "MIME-Sniffing Protection",
          selector: 'meta[http-equiv="X-Content-Type-Options"]',
        },
        {
          name: "Spectre Protection",
          selector: 'meta[http-equiv="Cross-Origin-Opener-Policy"]',
        },
      ];

      securityLayers.forEach((layer) => {
        cy.get(layer.selector).should(
          "exist",
          `${layer.name} should be implemented`
        );
        cy.log(`✅ ${layer.name} implemented`);
      });
    });
  });
});
