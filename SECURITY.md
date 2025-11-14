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
- ✅ **Security Headers** - Comprehensive HTTP security headers implementation

**Evidence:**
- [![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/Hack23/cia-compliance-manager/badge)](https://scorecard.dev/viewer/?uri=github.com/Hack23/cia-compliance-manager)
- [![CII Best Practices](https://bestpractices.coreinfrastructure.org/projects/10365/badge)](https://bestpractices.coreinfrastructure.org/projects/10365)
- [Security Overview](https://github.com/Hack23/cia-compliance-manager/security)

---

## Security Headers

CIA Compliance Manager implements comprehensive security headers to protect against common web vulnerabilities and attacks. These headers are implemented as HTML meta tags and are automatically included in both development and production builds.

### Implemented Security Headers

#### 1. Content-Security-Policy (CSP)
**Purpose:** Prevent Cross-Site Scripting (XSS) attacks and data injection attacks.

**Configuration:**
```
default-src 'self'; 
script-src 'self'; 
style-src 'self' 'unsafe-inline'; 
img-src 'self' data: https:; 
font-src 'self' data:; 
connect-src 'self'; 
object-src 'none'; 
base-uri 'self'; 
form-action 'self'; 
frame-ancestors 'none'; 
upgrade-insecure-requests;
```

**Rationale:**
- `default-src 'self'`: Only allow resources from the same origin by default
- `script-src 'self'`: Only allow scripts from the same origin (no inline scripts or external CDNs)
- `style-src 'self' 'unsafe-inline'`: Allow same-origin styles and inline styles (required for TailwindCSS and React)
- `img-src 'self' data: https:`: Allow images from same origin, data URIs, and HTTPS sources
- `font-src 'self' data:`: Allow fonts from same origin and data URIs
- `connect-src 'self'`: Only allow AJAX/WebSocket connections to same origin
- `object-src 'none'`: Disallow plugins like Flash
- `base-uri 'self'`: Restrict base URL to same origin
- `form-action 'self'`: Only allow form submissions to same origin
- `frame-ancestors 'none'`: Prevent embedding in iframes (clickjacking protection)
- `upgrade-insecure-requests`: Automatically upgrade HTTP requests to HTTPS

#### 2. X-Frame-Options: DENY
**Purpose:** Prevent clickjacking attacks by disallowing the page from being embedded in frames/iframes.

**Configuration:** `DENY`

**Rationale:** The application does not need to be embedded in other sites, so we use the strictest setting.

#### 3. X-Content-Type-Options: nosniff
**Purpose:** Prevent MIME-type sniffing attacks.

**Configuration:** `nosniff`

**Rationale:** Prevents browsers from interpreting files as a different MIME type than declared by the server, which could lead to XSS attacks.

#### 4. Cross-Origin-Opener-Policy: same-origin
**Purpose:** Protect against Spectre-like side-channel attacks.

**Configuration:** `same-origin`

**Rationale:** Ensures the document is isolated in its own browsing context group, preventing cross-origin access.

#### 5. Cross-Origin-Embedder-Policy: require-corp
**Purpose:** Protect against Spectre-like side-channel attacks.

**Configuration:** `require-corp`

**Rationale:** Prevents the document from loading cross-origin resources that don't explicitly grant permission.

#### 6. Cross-Origin-Resource-Policy: cross-origin
**Purpose:** Control how resources can be loaded by other origins.

**Configuration:** `cross-origin`

**Rationale:** Allow cross-origin loading for GitHub Pages deployment where resources may be accessed from different subdomains.

#### 7. Referrer-Policy: strict-origin-when-cross-origin
**Purpose:** Control how much referrer information is sent with requests.

**Configuration:** `strict-origin-when-cross-origin`

**Rationale:** Send full URL for same-origin requests, but only origin for cross-origin requests, and no referrer for downgraded HTTPS to HTTP.

#### 8. Permissions-Policy
**Purpose:** Disable unnecessary browser features to reduce attack surface.

**Configuration:**
```
accelerometer=(), 
camera=(), 
geolocation=(), 
gyroscope=(), 
magnetometer=(), 
microphone=(), 
payment=(), 
usb=()
```

**Rationale:** The application doesn't require access to these sensitive APIs, so they are disabled.

### Testing Security Headers

#### Local Development
To test security headers during development:

```bash
# Start the development server
npm run dev

# In another terminal, test the headers
curl -I http://localhost:5173

# Check for specific headers
curl -I http://localhost:5173 | grep -E "(Content-Security-Policy|X-Frame-Options|X-Content-Type-Options)"
```

#### Production Build
To test security headers in the production build:

```bash
# Build the application
npm run build

# Check the built index.html
cat build/index.html | grep -A 5 "Security Headers"

# Serve the build locally
npx vite preview

# Test the headers
curl -I http://localhost:4173
```

#### Automated Tests
Security headers are validated through automated tests in `src/tests/security-headers.test.ts`. Run tests with:

```bash
npm test -- src/tests/security-headers.test.ts
```

#### Browser DevTools
1. Open the application in a browser
2. Open DevTools (F12)
3. Go to the Network tab
4. Reload the page
5. Click on the document request (usually the first one)
6. Check the Response Headers section

#### Online Security Header Scanners
Test the deployed application with these tools:
- [Security Headers](https://securityheaders.com/) - Comprehensive header analysis
- [Mozilla Observatory](https://observatory.mozilla.org/) - Security and best practices scan
- [OWASP ZAP](https://www.zaproxy.org/) - Security testing tool

### GitHub Pages Limitations

**Important Note:** GitHub Pages has limited support for custom HTTP headers. While we cannot set HTTP response headers directly on GitHub Pages, we use HTML meta tags with `http-equiv` attributes, which provide equivalent protection for many security features.

**Meta Tag Support:**
- ✅ Content-Security-Policy - Fully supported via meta tag
- ✅ X-Frame-Options - Supported via meta tag in modern browsers
- ✅ X-Content-Type-Options - Advisory only, but still valuable
- ✅ Cross-Origin-* Policies - Supported via meta tags
- ✅ Referrer-Policy - Fully supported via meta tag
- ✅ Permissions-Policy - Supported via meta tag

**Workarounds for GitHub Pages:**
1. Use meta tags with `http-equiv` attribute (implemented)
2. For more control, consider using a CDN like Cloudflare that allows custom headers
3. For enterprise deployments, host on infrastructure with full header control

### CSP Violation Reporting

If you encounter CSP violations during development or testing:

1. **Check Browser Console:** CSP violations are logged in the browser console with detailed information
2. **Identify the Source:** Look at the blocked resource URL and type
3. **Evaluate Necessity:** Determine if the resource is required for functionality
4. **Update CSP:** If needed, update the CSP in `index.html` and `vite.config.ts`

**Common CSP Issues:**
- **Inline Scripts:** Use external scripts or nonces/hashes for inline scripts
- **External Resources:** Add trusted domains to appropriate CSP directives
- **Eval/Function Constructor:** Avoid `eval()` and `new Function()` usage
- **Inline Styles:** Use external stylesheets or add nonces for inline styles

### Maintenance

When updating security headers:

1. Update both `index.html` and `vite.config.ts` to keep them in sync
2. Run automated tests to verify changes: `npm test -- src/tests/security-headers.test.ts`
3. Test locally with `npm run dev` and verify headers with `curl -I http://localhost:5173`
4. Build and test production build: `npm run build && npx vite preview`
5. Update this documentation with any changes
6. Test deployed application with online scanners after deployment

### References

- [OWASP Security Headers Project](https://owasp.org/www-project-secure-headers/)
- [Content Security Policy Reference](https://content-security-policy.com/)
- [MDN Web Security Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers#security)
- [W3C CSP Level 3](https://www.w3.org/TR/CSP3/)
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
