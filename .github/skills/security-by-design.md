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

## ISMS Alignment

This skill enforces requirements from:

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

## Remember

**Security is not optional. Security is not an afterthought. Security is built-in from the first line of code.**

Every code change is a potential attack vector. Think like an attacker, code like a defender.

## Related Resources

- [Hack23 Secure Development Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Secure_Development_Policy.md)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CWE/SANS Top 25](https://cwe.mitre.org/top25/)
- [NIST Secure Software Development Framework](https://csrc.nist.gov/Projects/ssdf)
