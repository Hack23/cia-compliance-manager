# Security Policy

**🔐 ISMS Alignment:** This security policy implements [Vulnerability Management](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Vulnerability_Management.md) and [Incident Response Plan](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Incident_Response_Plan.md).

## Supported Versions

This project is under active development, and we provide security updates for the latest version only. Please ensure you're using the latest version of the project to receive security updates.

| Version | Supported          | ISMS Policy |
| ------- | ------------------ | ----------- |
| latest  | :white_check_mark: | [Vulnerability Management](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Vulnerability_Management.md) |

## Security Posture

CIA Compliance Manager maintains strong security practices as documented in our [ISMS Implementation Guide](./ISMS_IMPLEMENTATION_GUIDE.md):

- ✅ **Zero Critical/High Vulnerabilities** - Continuous scanning with automated remediation
- ✅ **SLSA Level 3** - Supply chain security with build attestation
- ✅ **80%+ Test Coverage** - Comprehensive automated testing
- ✅ **Automated Security Scanning** - SAST, SCA, DAST, Secret Scanning
- ✅ **Comprehensive Security Headers** - Protection against XSS, clickjacking, MIME-sniffing, and Spectre vulnerabilities

**Evidence:**
- [![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/Hack23/cia-compliance-manager/badge)](https://scorecard.dev/viewer/?uri=github.com/Hack23/cia-compliance-manager)
- [![CII Best Practices](https://bestpractices.coreinfrastructure.org/projects/10365/badge)](https://bestpractices.coreinfrastructure.org/projects/10365)
- [Security Overview](https://github.com/Hack23/cia-compliance-manager/security)

---

## Security Headers Implementation

CIA Compliance Manager implements comprehensive security headers to protect against common web vulnerabilities:

### Implemented Headers

#### Content-Security-Policy (CSP)
Restricts content sources to prevent XSS attacks:
- **default-src 'self'**: Only load resources from same origin by default
- **script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net**: Allow scripts from same origin, inline scripts (required for Vite), and CDN
- **style-src 'self' 'unsafe-inline'**: Allow styles from same origin and inline styles (required for TailwindCSS)
- **img-src 'self' data: https:**: Allow images from same origin, data URIs, and HTTPS sources
- **connect-src 'self'**: Only allow network requests to same origin
- **font-src 'self' data:**: Allow fonts from same origin and data URIs
- **object-src 'none'**: Block all plugins (Flash, Java, etc.)
- **base-uri 'self'**: Restrict base tag URLs to same origin
- **form-action 'self'**: Only allow form submissions to same origin
- **frame-ancestors 'none'**: Prevent site from being embedded (clickjacking protection)
- **upgrade-insecure-requests**: Automatically upgrade HTTP requests to HTTPS

#### X-Frame-Options
**Value:** `DENY`  
**Purpose:** Prevents the application from being embedded in frames/iframes, protecting against clickjacking attacks.

#### X-Content-Type-Options
**Value:** `nosniff`  
**Purpose:** Prevents browsers from MIME-type sniffing, reducing exposure to drive-by download attacks.

#### Cross-Origin-Opener-Policy (COOP)
**Value:** `same-origin`  
**Purpose:** Isolates browsing context to protect against Spectre-like attacks by preventing cross-origin documents from opening in the same browsing context group.

#### Cross-Origin-Embedder-Policy (COEP)
**Value:** `require-corp`  
**Purpose:** Requires cross-origin resources to explicitly grant permission to be loaded, enhancing isolation against Spectre vulnerabilities.

#### Referrer-Policy
**Value:** `strict-origin-when-cross-origin`  
**Purpose:** Controls how much referrer information is shared with requests:
- Full URL for same-origin requests
- Only origin for cross-origin HTTPS→HTTPS requests
- No referrer for HTTPS→HTTP downgrades

### Deployment Considerations

#### GitHub Pages Limitations
GitHub Pages has limited support for custom HTTP headers. Our implementation uses:
- **Meta tags in index.html**: Primary method for enforcing security headers (applies to the main document)
- **Development server headers**: `vite.config.ts` configures headers for local development

**Note:** Some security headers (like HSTS) cannot be set via meta tags and require server-level configuration. These headers are documented but not enforceable on GitHub Pages.

#### Testing Security Headers

**Local Development:**
```bash
npm run dev
# Open browser DevTools → Network tab → Check response headers
```

**Production Deployment:**
```bash
# Test with curl
curl -I https://hack23.github.io/cia-compliance-manager/

# Test with online tools
# https://securityheaders.com/
# https://observatory.mozilla.org/
```

**Browser Console:**
```javascript
// Check for CSP violations in browser console
// Violations will be logged if CSP blocks any resources
```

### Known Limitations

1. **HSTS (Strict-Transport-Security)**: Cannot be set via meta tags. GitHub Pages enforces HTTPS at the infrastructure level.
2. **Permissions-Policy**: Not implemented via meta tags; would require server configuration.
3. **CSP unsafe-inline**: Required for Vite's development mode and TailwindCSS. Consider moving to hash-based or nonce-based CSP in future versions.

### Security Scanning

Security headers are validated through:
- **ZAP Scan**: Automated OWASP ZAP scans in CI/CD (see `.github/workflows/zap-scan.yml`)
- **Manual Testing**: Using tools like securityheaders.com and Mozilla Observatory
- **Browser DevTools**: Verifying headers in Network tab during development

### References

- [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/)
- [Content Security Policy Reference](https://content-security-policy.com/)
- [Mozilla CSP Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [GitHub Pages Security](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)

---

## Reporting a Vulnerability

We take the security of the lambda-in-private-vpc project seriously. If you have found a potential security vulnerability, we kindly ask you to report it privately, so that we can assess and address the issue before it becomes publicly known.

### What Constitutes a Vulnerability

A vulnerability is a weakness or flaw in the project that can be exploited to compromise the security, integrity, or availability of the system or its data. Examples of vulnerabilities include, but are not limited to:

- Unauthenticated access to sensitive data
- Injection attacks (e.g., SQL injection, cross-site scripting)
- Insecure defaults or configurations
- Insufficient access controls
- Remote code execution

### How to Privately Report a Vulnerability using GitHub

Please follow these steps to privately report a security vulnerability:

1. On GitHub.com, navigate to the main page of the [cia-compliance-manager repository](https://github.com/Hack23/cia-compliance-manager).
2. Under the repository name, click **Security**. If you cannot see the "Security" tab, select the dropdown menu, and then click **Security**.
3. In the left sidebar, under "Reporting", click **Advisories**.
4. Click **Report a vulnerability** to open the advisory form.
5. Fill in the advisory details form. Provide as much information as possible to help us understand and reproduce the issue.
6. At the bottom of the form, click **Submit report**.

After you submit the report, the maintainers of the cia-compliance-manager repository will be notified. They will review the report, validate the vulnerability, and take necessary actions to address the issue. You will be added as a collaborator and credited for the security advisory.

### Disclosure Timeline

Upon receipt of a vulnerability report, our team will:

1. Acknowledge the report within 48 hours
2. Validate the vulnerability within 7 days
3. Develop and release a patch or mitigation within 30 days, depending on the complexity and severity of the issue
4. Publish a security advisory with a detailed description of the vulnerability and the fix

### Recognition and Anonymity

We appreciate your effort in helping us maintain a secure and reliable project. If your report results in a confirmed security fix, we will recognize your contribution in the release notes and/or a public acknowledgment, unless you request to remain anonymous.

---

## 🔐 ISMS Framework Integration

CIA Compliance Manager's security practices are part of Hack23 AB's comprehensive Information Security Management System (ISMS):

### 📋 Related ISMS Policies

| 🛡️ **Policy** | 📊 **Application to CIA Compliance Manager** |
|--------------|-------------------------------------------|
| [Vulnerability Management](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Vulnerability_Management.md) | 48h response SLA, coordinated disclosure process |
| [Incident Response Plan](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Incident_Response_Plan.md) | P1-P4 incident classification, escalation procedures |
| [Secure Development Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Secure_Development_Policy.md) | Security testing requirements, code review standards |
| [Information Security Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Information_Security_Policy.md) | Overall security governance framework |

### 🔍 Comprehensive Security Documentation

For complete details on how CIA Compliance Manager implements security controls:

- **📊 Control Mapping:** [control-mapping.md](./control-mapping.md) - Framework mappings (NIST, ISO, CIS)
- **🛡️ ISMS Implementation:** [ISMS_IMPLEMENTATION_GUIDE.md](./ISMS_IMPLEMENTATION_GUIDE.md) - Detailed control implementation
- **⚖️ CRA Compliance:** [CRA-ASSESSMENT.md](./CRA-ASSESSMENT.md) - EU Cyber Resilience Act assessment

### 🏆 Security Excellence Through Transparency

By publicly documenting our security practices, we demonstrate that CIA Compliance Manager is not just a compliance assessment tool—it's a **reference implementation** of secure software development practices. Every security control we help customers evaluate is implemented in our own development process.

**Explore Our Public ISMS:** [https://github.com/Hack23/ISMS-PUBLIC](https://github.com/Hack23/ISMS-PUBLIC)

Thank you for helping us keep the cia-compliance-manager project and its users safe.
