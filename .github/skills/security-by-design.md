# 🔐 Security by Design Skill

## Strategic Principle

**Security must be built into every phase of development, not bolted on afterward.**

This skill embodies the "Security by Design" principle from Hack23 AB's ISMS framework, ensuring all code changes follow secure development practices from conception to deployment.

## Core Rules

### 1. Threat Modeling (ALWAYS REQUIRED)

**BEFORE** writing any code that handles:
- User input
- Authentication/Authorization
- Sensitive data
- External APIs
- File operations

**YOU MUST**:
1. Identify potential threats (STRIDE model: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege)
2. Assess attack surface
3. Design security controls
4. Document threat mitigation strategy

**Example**:
```typescript
// ❌ BAD: Writing code without threat assessment
function processUserInput(data: string) {
  return eval(data); // Critical vulnerability!
}

// ✅ GOOD: Threat-aware implementation
/**
 * Process user input with security controls
 * Threats mitigated:
 * - Code injection: Input validation + no eval()
 * - XSS: Output encoding
 * - DoS: Input size limits
 */
function processUserInput(data: string): string {
  // Validate input
  if (typeof data !== 'string' || data.length > 1000) {
    throw new Error('Invalid input');
  }
  
  // Sanitize using DOMPurify
  return DOMPurify.sanitize(data);
}
```

### 2. Input Validation (MANDATORY)

**RULE**: Never trust user input. Validate at boundaries.

**Implementation**:
- Use allowlists (not denylists)
- Validate type, format, length, range
- Sanitize before use
- Reject invalid input (fail secure)

```typescript
// ✅ GOOD: Comprehensive input validation
import { z } from 'zod';

const SecurityLevelSchema = z.enum(['critical', 'high', 'moderate', 'low', 'public']);

function setSecurityLevel(level: unknown): SecurityLevel {
  // Validate using schema
  return SecurityLevelSchema.parse(level);
}
```

### 3. Principle of Least Privilege

**RULE**: Grant minimum necessary permissions.

**Application**:
- Limit function/component access to only required data
- Use TypeScript's `readonly`, `private`, `protected`
- Implement role-based access control
- Time-bound permissions where possible

```typescript
// ✅ GOOD: Least privilege in action
interface UserData {
  readonly id: string;
  readonly email: string;
  // Sensitive fields not exposed
}

function displayUser(user: Pick<UserData, 'id' | 'email'>): JSX.Element {
  // Can only access id and email, nothing else
  return <div>{user.email}</div>;
}
```

### 4. Defense in Depth

**RULE**: Multiple layers of security controls.

**Implementation**:
```typescript
// ✅ GOOD: Multiple security layers
async function handlePayment(data: PaymentData) {
  // Layer 1: Authentication check
  if (!isAuthenticated()) throw new AuthError();
  
  // Layer 2: Authorization check
  if (!hasPermission('payment:create')) throw new PermissionError();
  
  // Layer 3: Input validation
  validatePaymentData(data);
  
  // Layer 4: Rate limiting
  await checkRateLimit(userId);
  
  // Layer 5: Encryption
  const encryptedData = encrypt(data);
  
  // Layer 6: Audit logging
  await auditLog('payment:create', userId, data.amount);
  
  return processPayment(encryptedData);
}
```

### 5. Secure Error Handling

**RULE**: Never expose sensitive information in errors.

```typescript
// ❌ BAD: Leaking sensitive information
catch (error) {
  console.log(`Database connection failed: ${dbPassword}`);
  throw new Error(`SQL error: ${error.stack}`);
}

// ✅ GOOD: Secure error handling
catch (error) {
  // Log detailed error securely (server-side only)
  logger.error('Database operation failed', { 
    errorCode: error.code, 
    userId 
  });
  
  // Return generic user-facing message
  throw new Error('An error occurred. Please try again later.');
}
```

### 6. Cryptography Best Practices

**RULE**: Use proven cryptographic libraries. Never roll your own crypto.

```typescript
// ❌ BAD: Custom encryption
function encrypt(data: string): string {
  return btoa(data); // Not encryption!
}

// ✅ GOOD: Use proven libraries
import { webcrypto } from 'crypto';

async function encrypt(data: string, key: CryptoKey): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  
  return await webcrypto.subtle.encrypt(
    { name: 'AES-GCM', iv: generateIV() },
    key,
    dataBuffer
  );
}
```

### 7. Secure Dependencies

**RULE**: Minimize attack surface through dependencies.

**Implementation**:
- Run `npm audit` before adding dependencies
- Use GitHub Advisory Database check
- Keep dependencies updated
- Remove unused dependencies
- Pin dependency versions

```bash
# ✅ GOOD: Security checks before adding dependencies
npm audit
npm audit fix
# Check for known vulnerabilities in new package
npm view <package-name> security
```

### 8. Security Testing (REQUIRED)

**RULE**: Security must be tested, not assumed.

**Test Categories**:
1. **Input validation tests**: Malicious inputs, edge cases
2. **Authentication tests**: Bypass attempts, token validation
3. **Authorization tests**: Privilege escalation, access control
4. **Injection tests**: SQL, XSS, command injection
5. **Cryptography tests**: Key management, encryption/decryption

```typescript
// ✅ GOOD: Security-focused tests
describe('Security: Input Validation', () => {
  it('should reject SQL injection attempts', () => {
    const maliciousInput = "'; DROP TABLE users; --";
    expect(() => validateInput(maliciousInput)).toThrow();
  });
  
  it('should reject XSS payloads', () => {
    const xssPayload = '<script>alert("XSS")</script>';
    expect(() => validateInput(xssPayload)).toThrow();
  });
  
  it('should enforce input length limits', () => {
    const tooLong = 'a'.repeat(10001);
    expect(() => validateInput(tooLong)).toThrow();
  });
});
```

### Hack23 Secure Development Policy
- **Section 4.1**: Secure coding practices mandatory
- **Section 4.3**: Security testing in all phases
- **Section 4.5**: Vulnerability management

### ISO 27001:2022 Controls
- **8.25**: Secure development lifecycle
- **8.26**: Application security requirements
- **8.27**: Secure system architecture

### NIST CSF 2.0
- **PR.DS**: Data Security (protection of data at rest/transit)
- **PR.IP**: Information Protection Processes
- **DE.CM**: Security Continuous Monitoring

### CIS Controls v8
- **Control 16**: Application Software Security
- **Control 18**: Penetration Testing

## Enforcement Rules

### MUST (Critical - Block PR if violated)
1. All user inputs MUST be validated
2. Authentication/authorization MUST be tested
3. Secrets MUST NOT be hardcoded
4. Sensitive data MUST be encrypted
5. Error messages MUST NOT leak sensitive information

### SHOULD (High priority - Require justification if not followed)
1. Use proven security libraries (not custom implementations)
2. Implement defense in depth
3. Follow principle of least privilege
4. Include security test cases
5. Document threat model for sensitive operations

### MAY (Recommended - Best practice)
1. Use security linters (ESLint security plugins)
2. Implement audit logging for sensitive operations
3. Use TypeScript strict mode
4. Add security-focused code comments
5. Perform threat modeling workshops

## Quick Decision Guide

**When handling user input:**
→ Validate type, format, length, range
→ Sanitize before use
→ Test with malicious payloads

**When implementing authentication:**
→ Use proven libraries (OAuth, JWT)
→ Implement multi-factor authentication
→ Test bypass scenarios

**When storing data:**
→ Encrypt sensitive data at rest
→ Use secure key management
→ Implement access controls

**When communicating:**
→ Use TLS for all connections
→ Validate certificates
→ Implement certificate pinning (mobile)

**When logging:**
→ Never log passwords, tokens, or PII
→ Log security events (auth failures, permission denials)
→ Implement log retention policies

## 🔄 Secure Development Lifecycle (SDLC) Integration

**RULE**: Security must be integrated into every phase of the development lifecycle.

### 📋 Phase 1: Planning & Design

**Security Activities**:
- Threat modeling (STRIDE analysis)
- Security requirements definition
- Data classification and protection requirements
- Architecture security review
- Third-party component risk assessment

**Deliverables**:
```typescript
// ✅ GOOD: Security requirements documented
interface SecurityRequirements {
  readonly authentication: {
    readonly method: 'OAuth2' | 'JWT' | 'SAML';
    readonly mfaRequired: boolean;
    readonly sessionTimeout: number;  // seconds
  };
  readonly authorization: {
    readonly model: 'RBAC' | 'ABAC';
    readonly defaultDeny: boolean;
  };
  readonly dataProtection: {
    readonly encryptionAtRest: boolean;
    readonly encryptionInTransit: boolean;
    readonly keyManagement: 'AWS_KMS' | 'Azure_KeyVault';
  };
  readonly auditLogging: {
    readonly enabled: boolean;
    readonly retentionDays: number;
  };
}

const PROJECT_SECURITY_REQUIREMENTS: SecurityRequirements = {
  authentication: {
    method: 'OAuth2',
    mfaRequired: true,
    sessionTimeout: 3600,
  },
  authorization: {
    model: 'RBAC',
    defaultDeny: true,
  },
  dataProtection: {
    encryptionAtRest: true,
    encryptionInTransit: true,
    keyManagement: 'AWS_KMS',
  },
  auditLogging: {
    enabled: true,
    retentionDays: 365,
  },
};
```

**Reference**: [Secure Development Policy - Phase 1: Planning & Design](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Secure_Development_Policy.md#phase-1-planning--design)

### 💻 Phase 2: Development

**Security Activities**:
- Secure coding practices (OWASP Top 10 prevention)
- Code review with security focus
- Static Application Security Testing (SAST)
- Dependency vulnerability scanning
- Secret scanning and prevention

**Secure Coding Standards**:
```typescript
// ✅ GOOD: Secure TypeScript patterns

// 1. Input Validation
import { z } from 'zod';

const UserInputSchema = z.object({
  email: z.string().email().max(254),
  password: z.string().min(12).max(128),
  displayName: z.string().min(1).max(100).regex(/^[a-zA-Z0-9\s]+$/),
});

function registerUser(input: unknown): Promise<User> {
  // Validate input structure
  const validated = UserInputSchema.parse(input);
  
  // Additional security checks
  if (await isEmailBlacklisted(validated.email)) {
    throw new Error('Email not allowed');
  }
  
  // Hash password with bcrypt
  const hashedPassword = await bcrypt.hash(validated.password, 12);
  
  return createUser({
    ...validated,
    password: hashedPassword,
  });
}

// 2. SQL Injection Prevention
import { sql } from 'kysely';

// ❌ BAD: String concatenation
const badQuery = `SELECT * FROM users WHERE email = '${email}'`;

// ✅ GOOD: Parameterized queries
const users = await db
  .selectFrom('users')
  .selectAll()
  .where('email', '=', email)
  .execute();

// 3. XSS Prevention
import DOMPurify from 'dompurify';

function renderUserContent(html: string): string {
  // Sanitize HTML before rendering
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
    ALLOWED_ATTR: ['href'],
  });
}

// 4. CSRF Protection
import { generateToken, validateToken } from 'csrf';

const csrfToken = generateToken(req);
res.cookie('XSRF-TOKEN', csrfToken, {
  httpOnly: false,  // JavaScript needs to read this
  secure: true,
  sameSite: 'strict',
});

// Validate on state-changing requests
if (!validateToken(req.body._csrf, req.cookies['XSRF-TOKEN'])) {
  throw new Error('CSRF validation failed');
}

// 5. Secure Session Management
const sessionConfig = {
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true,  // HTTPS only
    sameSite: 'strict' as const,
    maxAge: 3600000,  // 1 hour
  },
};
```

**Code Review Checklist**:
- [ ] All user inputs validated
- [ ] No hardcoded secrets or credentials
- [ ] Parameterized queries used (no string concatenation)
- [ ] Output encoding applied
- [ ] Authentication and authorization implemented
- [ ] Sensitive data encrypted
- [ ] Error messages don't leak information
- [ ] Security test cases included

**Reference**: [Secure Development Policy - Phase 2: Development](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Secure_Development_Policy.md#phase-2-development)

### 🧪 Phase 3: Security Testing

**Security Testing Types**:

#### 🕷️ Static Application Security Testing (SAST)
```yaml
# ✅ GOOD: CodeQL SAST configuration
name: Security Scanning - SAST

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  codeql:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Initialize CodeQL
        uses: github/codeql-action/init@v3
        with:
          languages: javascript, typescript
          queries: security-and-quality
      
      - name: Autobuild
        uses: github/codeql-action/autobuild@v3
      
      - name: Perform CodeQL Analysis
        uses: github/codeql-action/analyze@v3
```

#### 🌐 Dynamic Application Security Testing (DAST)
```typescript
// ✅ GOOD: OWASP ZAP integration
import { ZapClient } from 'zaproxy';

async function runDAST(targetUrl: string): Promise<DastResults> {
  const zap = new ZapClient({
    apiKey: process.env.ZAP_API_KEY,
    proxy: 'http://localhost:8080',
  });
  
  // Spider the application
  await zap.spider.scan(targetUrl);
  await zap.spider.waitForComplete();
  
  // Active scan for vulnerabilities
  await zap.ascan.scan(targetUrl);
  await zap.ascan.waitForComplete();
  
  // Get alerts
  const alerts = await zap.core.alerts();
  
  return {
    targetUrl,
    scanDate: new Date(),
    alerts: alerts.filter(a => a.risk !== 'Informational'),
  };
}
```

#### 🔍 Software Composition Analysis (SCA)
```bash
# ✅ GOOD: Multi-tool dependency scanning
npm audit --audit-level=high
npm run snyk-test
trivy fs --scanners vuln .
```

#### 🧪 Interactive Application Security Testing (IAST)
```typescript
// ✅ GOOD: Runtime security monitoring
import { Contrast } from '@contrast/agent';

if (process.env.NODE_ENV === 'test') {
  Contrast.start({
    apiKey: process.env.CONTRAST_API_KEY,
    serviceKey: process.env.CONTRAST_SERVICE_KEY,
    appName: 'cia-compliance-manager',
  });
}
```

#### 🎭 Penetration Testing
```markdown
# Penetration Testing Checklist

## Pre-engagement
- [ ] Scope defined and approved
- [ ] Rules of engagement documented
- [ ] Emergency contacts identified
- [ ] Legal authorization obtained

## Testing Phases
- [ ] Reconnaissance (OSINT)
- [ ] Vulnerability scanning
- [ ] Exploitation attempts
- [ ] Privilege escalation testing
- [ ] Lateral movement testing
- [ ] Data exfiltration simulation

## Reporting
- [ ] Executive summary
- [ ] Technical findings (CVSS scored)
- [ ] Proof of concept included
- [ ] Remediation recommendations
- [ ] Retest verification
```

**Reference**: [Secure Development Policy - Phase 3: Security Testing](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Secure_Development_Policy.md#phase-3-security-testing)

### 🚀 Phase 4: Deployment

**Secure Deployment Checklist**:
```typescript
// ✅ GOOD: Secure deployment configuration
interface DeploymentSecurityConfig {
  readonly environment: 'development' | 'staging' | 'production';
  readonly securityHeaders: Record<string, string>;
  readonly corsPolicy: {
    readonly allowedOrigins: readonly string[];
    readonly allowedMethods: readonly string[];
  };
  readonly rateLimiting: {
    readonly enabled: boolean;
    readonly maxRequests: number;
    readonly windowMs: number;
  };
  readonly secretsManagement: {
    readonly provider: 'AWS_SecretsManager' | 'Azure_KeyVault';
    readonly rotationEnabled: boolean;
  };
}

const PRODUCTION_CONFIG: DeploymentSecurityConfig = {
  environment: 'production',
  securityHeaders: {
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';",
    'X-XSS-Protection': '1; mode=block',
  },
  corsPolicy: {
    allowedOrigins: ['https://cia-compliance-manager.com'],
    allowedMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
  rateLimiting: {
    enabled: true,
    maxRequests: 100,
    windowMs: 60000,  // 1 minute
  },
  secretsManagement: {
    provider: 'AWS_SecretsManager',
    rotationEnabled: true,
  },
};
```

**Deployment Security Gates**:
- [ ] All security tests passed
- [ ] No critical or high vulnerabilities
- [ ] Secrets rotated and not in code
- [ ] Security headers configured
- [ ] TLS/SSL certificates valid
- [ ] Least privilege IAM roles
- [ ] Monitoring and alerting enabled

**Reference**: [Secure Development Policy - Phase 4: Deployment](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Secure_Development_Policy.md#phase-4-deployment)

### 🔧 Phase 5: Maintenance & Operations

**Ongoing Security Activities**:
```typescript
// ✅ GOOD: Security monitoring and response
interface SecurityMonitoring {
  readonly metrics: {
    readonly authFailures: number;
    readonly rateLimitExceeded: number;
    readonly suspiciousRequests: number;
  };
  readonly alerts: readonly SecurityAlert[];
  readonly patchStatus: {
    readonly lastUpdate: Date;
    readonly pendingCritical: number;
    readonly pendingHigh: number;
  };
}

class SecurityOperations {
  async monitorSecurityEvents(): Promise<SecurityMonitoring> {
    const metrics = await this.collectSecurityMetrics();
    const alerts = await this.getActiveAlerts();
    const patchStatus = await this.checkPatchStatus();
    
    // Auto-response for critical threats
    if (metrics.suspiciousRequests > 1000) {
      await this.triggerIncidentResponse('potential_ddos');
    }
    
    return { metrics, alerts, patchStatus };
  }
  
  async performSecurityMaintenance(): Promise<void> {
    // Regular security tasks
    await this.rotateSecrets();
    await this.updateDependencies();
    await this.reviewAccessLogs();
    await this.validateBackups();
  }
}
```

**Vulnerability Management SLA** (from [Vulnerability Management Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Vulnerability_Management.md)):
- 🔴 **Critical**: 24 hours
- 🟠 **High**: 7 days
- 🟡 **Medium**: 30 days
- 🟢 **Low**: 90 days

**Reference**: [Secure Development Policy - Phase 5: Maintenance & Operations](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Secure_Development_Policy.md#phase-5-maintenance--operations)

## 🤖 AI-Augmented Development Security Controls

**CRITICAL**: GitHub Copilot custom agents are used extensively in Hack23's development process. These controls ensure AI-generated code maintains security standards.

### 🔐 AI as Proposal Generator, Not Authority

**RULE**: AI-generated code is a proposal that MUST be reviewed by humans for security.

```typescript
// ✅ GOOD: AI-generated code with human security review
/**
 * 🤖 COPILOT GENERATED - CEO REVIEW REQUIRED
 * 
 * Security Review Checklist:
 * - [x] Input validation implemented
 * - [x] No hardcoded secrets
 * - [x] Error handling doesn't leak information
 * - [x] Authentication required
 * - [x] Authorization enforced
 * - [x] Security tests included
 * 
 * Reviewed by: James Pether Sörling, CEO
 * Review Date: 2026-02-10
 */
async function processPayment(amount: number, userId: string): Promise<PaymentResult> {
  // AI-generated implementation with security controls
  // ... (code validated by human reviewer)
}
```

### 📋 PR Review Requirements for AI-Generated Code

**MANDATORY**: All AI-generated PRs require CEO approval before merge.

```yaml
# ✅ GOOD: CODEOWNERS for AI agent PRs
# .github/CODEOWNERS

# AI agent branches require CEO review
copilot/** @pethers

# Security-critical paths
src/auth/** @pethers
src/services/** @pethers
.github/workflows/** @pethers
```

### 🔧 Curator-Agent as Tooling Change

**Context**: The `agent-curator` org-level agent maintains agent configurations, not application code.

**Security Boundary**: Agent curator changes MUST NOT bypass security reviews for application code.

### 🛡️ Security Requirements for AI Usage

```typescript
// ✅ GOOD: AI usage security policy
interface AISecurityPolicy {
  readonly dataProtection: {
    readonly noPIIInPrompts: boolean;
    readonly noSecretsInContext: boolean;
    readonly ismsContextRequired: boolean;
  };
  readonly codeGeneration: {
    readonly humanReviewRequired: boolean;
    readonly securityTestsRequired: boolean;
    readonly ceoApprovalForMerge: boolean;
  };
  readonly auditTrail: {
    readonly gitHubLogsComplete: boolean;
    readonly prDescriptionRequired: boolean;
    readonly changeJustificationRequired: boolean;
  };
}

const COPILOT_SECURITY_POLICY: AISecurityPolicy = {
  dataProtection: {
    noPIIInPrompts: true,
    noSecretsInContext: true,
    ismsContextRequired: true,  // Load ISMS policies as context
  },
  codeGeneration: {
    humanReviewRequired: true,
    securityTestsRequired: true,
    ceoApprovalForMerge: true,
  },
  auditTrail: {
    gitHubLogsComplete: true,
    prDescriptionRequired: true,
    changeJustificationRequired: true,
  },
};
```

**Reference**: 
- [Secure Development Policy - AI-Augmented Development Controls](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Secure_Development_Policy.md#ai-augmented-development-controls)
- [AI Governance Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/AI_Policy.md)
- [OWASP LLM Security Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/OWASP_LLM_Security_Policy.md)

## 📊 Testing Excellence Integration

### 🎯 Unit Test Coverage Standards

**MUST Requirements**:
- 📊 80%+ overall test coverage
- 📊 100% coverage for security-critical paths (authentication, authorization, data handling)
- 📊 All edge cases and error scenarios tested

```typescript
// ✅ GOOD: Comprehensive security test coverage
describe('UserAuthentication', () => {
  describe('Security Tests', () => {
    it('should reject invalid credentials', async () => {
      await expect(
        authenticateUser('user@example.com', 'wrong_password')
      ).rejects.toThrow('Invalid credentials');
    });
    
    it('should enforce rate limiting', async () => {
      // Attempt 6 failed logins (limit is 5)
      for (let i = 0; i < 6; i++) {
        try {
          await authenticateUser('user@example.com', 'wrong');
        } catch (e) {
          // Expected failures
        }
      }
      
      // 6th attempt should be rate limited
      await expect(
        authenticateUser('user@example.com', 'correct_password')
      ).rejects.toThrow('Rate limit exceeded');
    });
    
    it('should sanitize error messages', async () => {
      try {
        await authenticateUser('invalid-email', 'password');
      } catch (error) {
        // Should NOT reveal whether user exists
        expect(error.message).not.toContain('user not found');
        expect(error.message).toBe('Invalid credentials');
      }
    });
    
    it('should enforce session timeout', async () => {
      const session = await createSession('user@example.com');
      
      // Fast-forward time
      jest.advanceTimersByTime(3600000 + 1000);  // 1 hour + 1 second
      
      await expect(
        validateSession(session.token)
      ).rejects.toThrow('Session expired');
    });
  });
});
```

### 🌐 End-to-End Testing Strategy

**Security E2E Tests**:
```typescript
// ✅ GOOD: E2E security testing with Cypress
describe('E2E Security Tests', () => {
  it('should enforce authentication on protected routes', () => {
    // Attempt to access protected route without auth
    cy.visit('/dashboard', { failOnStatusCode: false });
    
    // Should redirect to login
    cy.url().should('include', '/login');
  });
  
  it('should prevent XSS attacks', () => {
    const xssPayload = '<script>alert("XSS")</script>';
    
    cy.login('test@example.com', 'password');
    cy.visit('/profile');
    cy.get('[data-testid="display-name-input"]').type(xssPayload);
    cy.get('[data-testid="save-button"]').click();
    
    // Verify script tag was sanitized
    cy.get('[data-testid="display-name-display"]')
      .should('not.contain', '<script>');
  });
  
  it('should enforce CSRF protection', () => {
    cy.login('test@example.com', 'password');
    
    // Attempt state-changing request without CSRF token
    cy.request({
      method: 'POST',
      url: '/api/profile/update',
      failOnStatusCode: false,
      body: { name: 'Hacker' },
      headers: {
        // Missing CSRF token
      },
    }).then((response) => {
      expect(response.status).to.eq(403);
      expect(response.body.error).to.contain('CSRF');
    });
  });
});
```

**Reference**: 
- [Secure Development Policy - Testing Standards](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Secure_Development_Policy.md#unit-test-coverage--quality)
- [Testing Excellence Skill](.github/skills/testing-excellence.md)

## 🕷️ Advanced Security Testing Framework

### 🐛 Bug Bounty Program Integration

**SHOULD**: Maintain public vulnerability disclosure process.

```markdown
# Security Vulnerability Disclosure

## Scope
✅ In scope:
- Web application (https://cia-compliance-manager.com)
- API endpoints (https://api.cia-compliance-manager.com)
- Open source repositories

❌ Out of scope:
- Third-party services
- Social engineering
- Physical attacks
- DoS attacks

## Reporting
1. Email: security@hack23.com
2. PGP key: [link]
3. Response SLA: 24 hours

## Rewards
🔴 Critical: €500-€2,000
🟠 High: €200-€500
🟡 Medium: €50-€200
🟢 Low: Recognition
```

**Reference**: [Vulnerability Management Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Vulnerability_Management.md)

**When logging:**
→ Never log passwords, tokens, or PII
→ Log security events (auth failures, permission denials)
→ Implement log retention policies

## Remember

**Security is not optional. Security is not an afterthought. Security is built-in from the first line of code.**

Every code change is a potential attack vector. Think like an attacker, code like a defender.

## Related Resources

### 📚 Hack23 ISMS Framework
- [🛠️ Secure Development Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Secure_Development_Policy.md) - Comprehensive 95KB guide covering all SDLC phases
- [🎯 Threat Modeling Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Threat_Modeling.md) - STRIDE, MITRE ATT&CK, risk-based security design
- [🔍 Vulnerability Management](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Vulnerability_Management.md) - Security testing framework and SLA requirements
- [📊 Risk Assessment Methodology](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Risk_Assessment_Methodology.md) - Risk quantification and prioritization
- [🔒 Cryptography Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Cryptography_Policy.md) - Encryption standards and key management
- [📊 Data Classification Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Data_Classification_Policy.md) - CIA Triad classification framework
- [🤖 AI Governance Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/AI_Policy.md) - AI-first operations and GitHub Copilot governance
- [🛡️ OWASP LLM Security Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/OWASP_LLM_Security_Policy.md) - LLM Top 10 2025 security controls
- [📊 Security Metrics](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Security_Metrics.md) - KPIs for security program effectiveness
- [🎯 CLASSIFICATION Framework](https://github.com/Hack23/ISMS-PUBLIC/blob/main/CLASSIFICATION.md) - Business impact analysis
- [🎯 STYLE_GUIDE](https://github.com/Hack23/ISMS-PUBLIC/blob/main/STYLE_GUIDE.md) - Documentation standards and emoji icons

### 🎯 Related Skills
- [Threat Modeling Skill](threat-modeling.md) - STRIDE framework, DFD, attack surface analysis
- [ISMS Compliance Skill](isms-compliance.md) - Framework alignment (ISO 27001, NIST CSF, CIS)
- [Data Protection Skill](data-protection.md) - Privacy by Design, GDPR compliance
- [Testing Excellence Skill](testing-excellence.md) - Comprehensive testing pyramid
- [Code Quality Excellence Skill](code-quality-excellence.md) - Quality-first development
- [AI Governance Skill](ai-governance.md) - EU AI Act, OWASP LLM Top 10
- [Compliance Frameworks Skill](compliance-frameworks.md) - Multi-framework compliance mapping

### 🌐 External Standards & Resources
- [OWASP Top 10 (2021)](https://owasp.org/www-project-top-ten/) - Most critical web application security risks
- [OWASP ASVS 4.0](https://owasp.org/www-project-application-security-verification-standard/) - Application Security Verification Standard
- [OWASP Testing Guide v4.2](https://owasp.org/www-project-web-security-testing-guide/) - Comprehensive security testing methodology
- [CWE/SANS Top 25](https://cwe.mitre.org/top25/) - Most dangerous software weaknesses
- [MITRE ATT&CK Framework](https://attack.mitre.org/) - Adversary tactics and techniques
- [NIST Secure Software Development Framework (SSDF)](https://csrc.nist.gov/Projects/ssdf) - Security practices for SDLC
- [ISO/IEC 27034](https://www.iso.org/standard/44378.html) - Application security standard
- [CERT Secure Coding Standards](https://wiki.sei.cmu.edu/confluence/display/seccode) - Language-specific secure coding
- [GitHub Security Best Practices](https://docs.github.com/en/code-security) - GitHub-native security features
- [Snyk Vulnerability Database](https://snyk.io/vuln/) - Open source vulnerability intelligence

## 🎯 Compliance Framework Mapping

### ISO 27001:2022 Controls
- **A.5.23**: Information security for use of cloud services
- **A.8.25**: Secure development life cycle - Complete SDLC security integration
- **A.8.26**: Application security requirements - Threat modeling and security requirements
- **A.8.27**: Secure system architecture and engineering principles - Defense in depth
- **A.8.28**: Secure coding - OWASP Top 10 prevention patterns
- **A.8.29**: Security testing in development and acceptance - SAST, DAST, SCA, IAST, penetration testing
- **A.8.30**: Outsourced development - Third-party component risk assessment
- **A.8.31**: Separation of development, test and production environments
- **A.8.32**: Change management - Security gates in deployment
- **A.8.33**: Test information - Protection of test data

### NIST Cybersecurity Framework 2.0
- **GV.SC-01**: Cyber supply chain risk management processes identified
- **ID.RA-01**: Asset vulnerabilities identified and documented
- **PR.DS-02**: Data-in-transit protected - TLS/SSL enforcement
- **PR.DS-05**: Protections against data leaks implemented - Secret scanning
- **PR.DS-06**: Integrity checking mechanisms used - Code signing, checksums
- **PR.IP-01**: Baseline configuration created and maintained - Secure defaults
- **PR.IP-02**: System development life cycle managed - SDLC phases 1-5
- **DE.CM-04**: Malicious code detected - SAST, DAST scanning
- **RS.AN-05**: Processes established to receive, analyze and respond to vulnerabilities

### CIS Controls v8.1
- **Control 2**: Inventory and Control of Software Assets - Dependency tracking
- **Control 3**: Data Protection - Encryption at rest and in transit
- **Control 16**: Application Software Security
  - 16.1: Establish and Maintain a Secure Application Development Process
  - 16.2: Establish and Maintain a Process to Accept and Address Software Vulnerabilities
  - 16.3: Perform Root Cause Analysis on Security Vulnerabilities
  - 16.4: Establish and Manage an Inventory of Third-Party Software Components
  - 16.5: Use Up-to-Date and Trusted Third-Party Software Components
  - 16.6: Establish and Maintain a Severity Rating System and Process for Application Vulnerabilities
  - 16.7: Use Standard Hardening Configuration Templates for Application Infrastructure
  - 16.8: Separate Production and Non-Production Systems
  - 16.9: Train Developers in Application Security Concepts and Secure Coding
  - 16.10: Apply Secure Design Principles in Application Architectures
  - 16.11: Leverage Vetted Modules or Services for Application Security Components
  - 16.12: Implement Code-Level Security Checks
  - 16.13: Conduct Application Penetration Testing
  - 16.14: Conduct Threat Modeling
- **Control 18**: Penetration Testing - Security validation

### GDPR (General Data Protection Regulation)
- **Article 25**: Data protection by design and by default - Privacy by Design principles
- **Article 32**: Security of processing - Technical and organizational measures

### NIS2 Directive (EU)
- **Article 21**: Cybersecurity risk-management measures - Secure development practices

### EU Cyber Resilience Act (CRA)
- **Annex I, Part I**: Essential cybersecurity requirements - Secure by design, vulnerability handling
- **Annex I, Part II**: Vulnerability handling requirements - Coordinated disclosure, patch management
