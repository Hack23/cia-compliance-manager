# Security Headers Configuration

**Document Owner:** Security Team | **Version:** 1.0 | **Last Updated:** 2025-11-21

## Overview

CIA Compliance Manager implements comprehensive security headers to protect against common web vulnerabilities including XSS attacks, clickjacking, MIME-sniffing, and Spectre-like attacks. This document provides detailed information about the security headers implementation, testing procedures, and deployment considerations.

## Implemented Security Headers

### Content-Security-Policy (CSP)

**Implementation:** Meta tag in `index.html`

**Purpose:** Restricts sources from which content can be loaded, providing defense-in-depth protection against Cross-Site Scripting (XSS) attacks.

**Configuration:**
```html
<meta 
  http-equiv="Content-Security-Policy" 
  content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'; font-src 'self' data: https://fonts.gstatic.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;"
/>
```

**Directives Explained:**

| Directive | Value | Purpose |
|-----------|-------|---------|
| `default-src` | `'self'` | Default policy: only load resources from same origin |
| `script-src` | `'self' 'unsafe-inline'` | Allow scripts from same origin and inline scripts (required for Vite) |
| `style-src` | `'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com` | Allow styles from same origin, inline styles (TailwindCSS), and Google Fonts |
| `img-src` | `'self' data: https:` | Allow images from same origin, data URIs, and HTTPS sources |
| `connect-src` | `'self'` | Restrict network requests to same origin |
| `font-src` | `'self' data: https://fonts.gstatic.com` | Allow fonts from same origin, data URIs, and Google Fonts |
| `object-src` | `'none'` | Block all plugins (Flash, Java, etc.) |
| `base-uri` | `'self'` | Restrict base tag URLs to same origin |
| `form-action` | `'self'` | Only allow form submissions to same origin |
| `frame-ancestors` | `'none'` | Prevent site from being embedded in frames (clickjacking protection) |
| `upgrade-insecure-requests` | - | Automatically upgrade HTTP requests to HTTPS |

**Security Benefits:**
- ✅ Prevents XSS attacks by restricting script sources
- ✅ Blocks malicious code injection
- ✅ Prevents clickjacking through `frame-ancestors 'none'`
- ✅ Enforces HTTPS for all resources
- ✅ Blocks dangerous plugins

**Known Trade-offs:**
- ⚠️ `unsafe-inline` for scripts required by Vite development mode
- ⚠️ `unsafe-inline` for styles required by TailwindCSS

**Future Improvements:**
- Consider migrating to nonce-based or hash-based CSP for stricter inline script control
- Implement CSP reporting endpoint to monitor violations

---

### X-Frame-Options

**Implementation:** Meta tag in `index.html`

**Purpose:** Prevents the application from being embedded in frames/iframes, protecting against clickjacking attacks.

**Configuration:**
```html
<meta http-equiv="X-Frame-Options" content="DENY" />
```

**Values:**
- `DENY` - Page cannot be displayed in a frame (current setting)
- `SAMEORIGIN` - Page can only be framed by same origin
- `ALLOW-FROM uri` - Page can only be framed by specified origin

**Security Benefits:**
- ✅ Prevents clickjacking attacks
- ✅ Protects against UI redress attacks
- ✅ Prevents malicious site from tricking users into clicking hidden elements

**Note:** This header is also enforced via CSP `frame-ancestors 'none'` directive for defense-in-depth.

---

### X-Content-Type-Options

**Implementation:** Meta tag in `index.html`

**Purpose:** Prevents browsers from MIME-type sniffing, reducing exposure to drive-by download attacks.

**Configuration:**
```html
<meta http-equiv="X-Content-Type-Options" content="nosniff" />
```

**Security Benefits:**
- ✅ Forces browsers to respect declared Content-Type
- ✅ Prevents MIME-confusion attacks
- ✅ Reduces risk of drive-by downloads
- ✅ Protects against content-type based XSS

---

### Cross-Origin-Opener-Policy (COOP)

**Implementation:** Meta tag in `index.html`

**Purpose:** Isolates browsing context to protect against Spectre-like attacks by preventing cross-origin documents from opening in the same browsing context group.

**Configuration:**
```html
<meta http-equiv="Cross-Origin-Opener-Policy" content="same-origin" />
```

**Values:**
- `same-origin` - Only same-origin documents can access window (current setting)
- `same-origin-allow-popups` - Same-origin plus popups can access
- `unsafe-none` - No isolation (not recommended)

**Security Benefits:**
- ✅ Protects against Spectre attacks
- ✅ Prevents cross-origin window access
- ✅ Isolates browsing context for enhanced security

---

### Cross-Origin-Embedder-Policy (COEP)

**Implementation:** Meta tag in `index.html`

**Purpose:** Requires cross-origin resources to explicitly grant permission to be loaded, enhancing isolation against Spectre vulnerabilities.

**Configuration:**
```html
<meta http-equiv="Cross-Origin-Embedder-Policy" content="require-corp" />
```

**Values:**
- `require-corp` - Cross-origin resources must explicitly opt-in (current setting)
- `unsafe-none` - No restrictions (not recommended)

**Security Benefits:**
- ✅ Enhanced Spectre vulnerability protection
- ✅ Forces explicit opt-in for cross-origin resources
- ✅ Enables powerful web platform features (SharedArrayBuffer, high-resolution timers)

---

### Referrer-Policy

**Implementation:** Meta tag in `index.html`

**Purpose:** Controls how much referrer information is shared with requests, protecting user privacy and preventing information leakage.

**Configuration:**
```html
<meta name="referrer" content="strict-origin-when-cross-origin" />
```

**Behavior:**
- Full URL sent for same-origin requests
- Only origin sent for cross-origin HTTPS→HTTPS requests
- No referrer sent for HTTPS→HTTP downgrades

**Security Benefits:**
- ✅ Protects user privacy
- ✅ Prevents information leakage to third parties
- ✅ Balances functionality with security

---

## Deployment Considerations

### GitHub Pages Deployment

GitHub Pages has **limited support** for custom HTTP headers. Our implementation strategy:

**Primary Method:** Meta tags in `index.html`
- ✅ CSP via meta tag
- ✅ X-Frame-Options via meta tag
- ✅ X-Content-Type-Options via meta tag
- ✅ COOP/COEP via meta tags
- ✅ Referrer-Policy via meta tag

**Limitations:**
- ❌ HSTS (Strict-Transport-Security) cannot be set via meta tags
- ❌ Permissions-Policy requires server configuration
- ℹ️ GitHub Pages enforces HTTPS at infrastructure level

### Development Server

Security headers are also configured in `vite.config.ts` for local development:

```typescript
server: {
  headers: {
    'Content-Security-Policy': '...',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Embedder-Policy': 'require-corp',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  },
}
```

### Production Deployment (Future)

For deployments with full server control (nginx, Apache, CDN), additional headers can be configured:

**Strict-Transport-Security (HSTS):**
```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

**Permissions-Policy:**
```
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

**Additional CSP Reporting:**
```
Content-Security-Policy-Report-Only: default-src 'self'; report-uri /csp-report
```

---

## Testing Security Headers

### Local Development Testing

**Start Development Server:**
```bash
npm run dev
```

**Verify Headers in Browser:**
1. Open DevTools (F12)
2. Navigate to Network tab
3. Refresh page
4. Click on document request
5. Check Response Headers section

**Check for CSP Violations:**
1. Open DevTools Console
2. Look for CSP violation messages
3. No violations should appear during normal operation

### Automated E2E Testing

**Run Security Headers Tests:**
```bash
npm run test:e2e
```

**Test Location:** `cypress/e2e/security/security-headers.cy.ts`

**Tests Cover:**
- ✅ Presence of all security headers
- ✅ Correct values for each header
- ✅ CSP directive validation
- ✅ No CSP violations during page load
- ✅ ISMS compliance verification

### Production Testing

**Test with curl:**
```bash
curl -I https://hack23.github.io/cia-compliance-manager/
```

**Online Security Scanners:**
- [Security Headers](https://securityheaders.com/) - Grade security headers
- [Mozilla Observatory](https://observatory.mozilla.org/) - Comprehensive security scan
- [OWASP ZAP](https://www.zaproxy.org/) - Automated security testing

**Expected Results:**
- A+ rating on Security Headers
- No critical findings on Mozilla Observatory
- All security header checks passed in ZAP scan

---

## ISMS Compliance

This security headers implementation fulfills requirements from:

- **[Information Security Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Information_Security_Policy.md)** - Security by design
- **[Secure Development Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Secure_Development_Policy.md)** - Application Security Framework
- **[Vulnerability Management](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Vulnerability_Management.md)** - Preventive controls

### Compliance Mappings

**NIST CSF 2.0:**
- PR.DS-01: Data-at-rest is protected
- PR.DS-02: Data-in-transit is protected
- PR.AC-03: Remote access is managed

**ISO/IEC 27001:2022:**
- 8.22: Segregation of networks
- 8.23: Web filtering
- 8.24: Use of cryptography

**CIS Controls v8.1:**
- 13.3: Deploy Web Application Firewall
- 13.5: Manage Access Control to Web Services

---

## Troubleshooting

### Common Issues

**Issue:** CSP violations in development
- **Cause:** Vite hot reload or inline scripts
- **Solution:** `unsafe-inline` is required for development; acceptable trade-off

**Issue:** Fonts not loading
- **Cause:** CSP blocking font sources
- **Solution:** Verify `font-src` includes `https://fonts.gstatic.com`

**Issue:** External images not displaying
- **Cause:** CSP `img-src` too restrictive
- **Solution:** Current config allows `https:` for external images

**Issue:** Cannot embed site in iframe
- **Expected:** X-Frame-Options DENY prevents embedding (security feature)
- **Solution:** This is intentional to prevent clickjacking

### Monitoring and Alerts

**CSP Violation Monitoring:**
```javascript
window.addEventListener('securitypolicyviolation', (e) => {
  console.error('CSP Violation:', {
    violatedDirective: e.violatedDirective,
    blockedURI: e.blockedURI,
    sourceFile: e.sourceFile,
    lineNumber: e.lineNumber,
  });
});
```

**Recommended Monitoring:**
- Set up CSP reporting endpoint (future enhancement)
- Monitor browser console for violations during development
- Include security header tests in CI/CD pipeline

---

## Security Considerations

### Defense-in-Depth Strategy

Multiple overlapping security controls:
1. **CSP** - Primary defense against XSS
2. **X-Frame-Options** - Clickjacking protection
3. **COOP/COEP** - Spectre attack mitigation
4. **X-Content-Type-Options** - MIME-sniffing prevention
5. **Referrer-Policy** - Information leakage protection

### Known Limitations

**Meta Tag Limitations:**
- HSTS cannot be set via meta tags (requires server header)
- Some directives may not be supported in older browsers
- Meta tags are parsed after HTML, providing less protection than HTTP headers

**CSP unsafe-inline:**
- Required for Vite development mode
- Required for TailwindCSS utility classes
- Consider hash-based CSP in future versions

### Security Review Checklist

Before deploying changes:
- [ ] All security headers present in `index.html`
- [ ] CSP allows required resources (fonts, styles)
- [ ] CSP blocks unnecessary sources
- [ ] E2E tests pass (`npm run test:e2e`)
- [ ] No CSP violations in browser console
- [ ] Security scanner shows A+ rating
- [ ] Documentation updated

---

## References

### Standards and Guidelines

- [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/)
- [Content Security Policy Reference](https://content-security-policy.com/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [W3C CSP Level 3](https://www.w3.org/TR/CSP3/)

### Project Documentation

- [SECURITY.md](../SECURITY.md#security-headers-implementation) - Main security policy
- [ISMS Implementation Guide](../ISMS_IMPLEMENTATION_GUIDE.md) - Control implementation details
- [Threat Model](./architecture/THREAT_MODEL.md) - Security threat analysis
- [Control Mapping](../control-mapping.md) - Framework mappings

### External Tools

- [Security Headers Scanner](https://securityheaders.com/)
- [Mozilla Observatory](https://observatory.mozilla.org/)
- [CSP Evaluator](https://csp-evaluator.withgoogle.com/)
- [Report URI](https://report-uri.com/) - CSP reporting service

---

## Changelog

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2025-11-21 | Initial documentation for v1.0 release | Security Team |

---

**Document Control:**
- **Classification:** Public
- **Review Cycle:** Quarterly
- **Next Review:** 2025-02-21
- **Approved By:** CEO/Security Team
