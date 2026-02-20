# 🏷️ Classification & Access Control Skill

> **Strategic Principle**: Protect data proportionally to its sensitivity. Every piece of data has a classification level, every access request follows least privilege, and every transmission uses appropriate cryptography. This unified approach ensures consistent security across the entire data lifecycle — from creation through storage, transmission, and destruction.

---

## 📚 Core References

| Policy | Source | Scope |
|--------|--------|-------|
| Data Classification Policy | [ISMS-PUBLIC/policies/data-classification-policy.md](https://github.com/Hack23/ISMS-PUBLIC/blob/main/policies/data-classification-policy.md) | Labeling, handling, retention |
| Access Control Policy | [ISMS-PUBLIC/policies/access-control-policy.md](https://github.com/Hack23/ISMS-PUBLIC/blob/main/policies/access-control-policy.md) | AuthN, AuthZ, RBAC, sessions |
| Cryptography Policy | [ISMS-PUBLIC/policies/cryptography-policy.md](https://github.com/Hack23/ISMS-PUBLIC/blob/main/policies/cryptography-policy.md) | Algorithms, TLS, key management |
| CLASSIFICATION.md | Project root or docs/ | Project-specific classification map |

**Relationship**: Classification drives access control requirements, which drive cryptography requirements. All three work together.

---

## 1️⃣ Data Classification Levels

### Level Definitions

| Level | Label | Description | Examples |
|-------|-------|-------------|----------|
| **PUBLIC** | 🟢 Public | No impact if disclosed | Marketing content, open-source docs, public APIs |
| **INTERNAL** | 🟡 Internal | Minor impact if disclosed | Internal wikis, non-sensitive configs, team docs |
| **CONFIDENTIAL** | 🟠 Confidential | Significant impact if disclosed | Customer PII, financial data, business strategies |
| **RESTRICTED** | 🔴 Restricted | Severe/catastrophic impact if disclosed | Credentials, encryption keys, medical records, payment data |

### Handling Requirements by Level

#### 🟢 PUBLIC
- **Storage**: No special requirements
- **Transmission**: No encryption required (HTTPS still recommended)
- **Access Control**: Open access, no authentication required
- **Retention**: Follow standard retention schedule
- **Disposal**: Standard deletion

#### 🟡 INTERNAL
- **Storage**: Standard access-controlled systems
- **Transmission**: HTTPS/TLS required for external transmission
- **Access Control**: Authentication required; role-based access
- **Retention**: 1–3 years per retention policy
- **Disposal**: Standard secure deletion

#### 🟠 CONFIDENTIAL
- **Storage**: Encrypted at rest (AES-256); access-controlled systems
- **Transmission**: TLS 1.2+ required; end-to-end encryption recommended
- **Access Control**: RBAC with need-to-know; MFA for remote access
- **Retention**: Per regulatory requirements (GDPR, HIPAA, etc.)
- **Disposal**: Cryptographic erasure or certified destruction
- **Logging**: All access logged and auditable

#### 🔴 RESTRICTED
- **Storage**: Encrypted at rest (AES-256-GCM); dedicated secure storage (vault)
- **Transmission**: TLS 1.3 required; mutual TLS recommended
- **Access Control**: Strict need-to-know; MFA mandatory; time-limited access
- **Retention**: Minimum necessary; automated expiration
- **Disposal**: Cryptographic erasure with verification
- **Logging**: Real-time monitoring; tamper-proof audit trail
- **Additional**: No caching, no logging of values, memory-safe handling

### TypeScript Classification Helper

```typescript
/** Data classification levels ordered by sensitivity */
export enum ClassificationLevel {
  PUBLIC = "PUBLIC",
  INTERNAL = "INTERNAL",
  CONFIDENTIAL = "CONFIDENTIAL",
  RESTRICTED = "RESTRICTED",
}

/** Classification metadata for a data field */
export interface ClassificationTag {
  readonly level: ClassificationLevel;
  readonly category: string;
  readonly retentionDays: number;
  readonly encryptionRequired: boolean;
  readonly auditRequired: boolean;
}

/** Determine minimum required controls for a classification level */
export function getRequiredControls(level: ClassificationLevel): {
  encryptAtRest: boolean;
  encryptInTransit: boolean;
  mfaRequired: boolean;
  auditLogging: boolean;
  accessReviewDays: number;
} {
  switch (level) {
    case ClassificationLevel.RESTRICTED:
      return { encryptAtRest: true, encryptInTransit: true, mfaRequired: true, auditLogging: true, accessReviewDays: 30 };
    case ClassificationLevel.CONFIDENTIAL:
      return { encryptAtRest: true, encryptInTransit: true, mfaRequired: true, auditLogging: true, accessReviewDays: 90 };
    case ClassificationLevel.INTERNAL:
      return { encryptAtRest: false, encryptInTransit: true, mfaRequired: false, auditLogging: false, accessReviewDays: 180 };
    case ClassificationLevel.PUBLIC:
      return { encryptAtRest: false, encryptInTransit: false, mfaRequired: false, auditLogging: false, accessReviewDays: 365 };
  }
}
```

---

## 2️⃣ Access Control Rules

### Core Principles

- ✅ **MUST**: Apply least privilege — grant minimum access needed for the task
- ✅ **MUST**: Use Role-Based Access Control (RBAC) for all non-public resources
- ✅ **MUST**: Authenticate before authorizing — never trust unauthenticated requests
- ✅ **MUST**: Enforce separation of duties for critical operations
- ✅ **MUST**: Review and recertify access quarterly for CONFIDENTIAL/RESTRICTED data
- ✅ **SHOULD**: Implement attribute-based access control (ABAC) for fine-grained policies
- ✅ **SHOULD**: Use just-in-time (JIT) access for privileged operations

### Authentication Requirements

| Factor | Minimum Requirement |
|--------|-------------------|
| **Passwords** | 12+ characters, complexity rules, bcrypt/Argon2 hashing |
| **MFA** | Required for CONFIDENTIAL+ data access; TOTP or WebAuthn preferred |
| **API Keys** | Scoped, rotated every 90 days, never in source code |
| **Service Accounts** | Unique per service, no shared credentials, automated rotation |
| **Session Tokens** | Cryptographically random, HttpOnly, Secure, SameSite=Strict |

### Authorization Patterns

```typescript
/** Role-permission mapping (RBAC) */
export interface Permission {
  readonly resource: string;
  readonly action: "read" | "write" | "delete" | "admin";
  readonly classification: ClassificationLevel;
}

export interface Role {
  readonly name: string;
  readonly permissions: readonly Permission[];
  readonly maxClassification: ClassificationLevel;
}

/**
 * Check if a role has access to a classified resource.
 * Enforces both permission match AND classification clearance.
 */
export function hasAccess(
  role: Role,
  resource: string,
  action: Permission["action"],
  resourceClassification: ClassificationLevel
): boolean {
  const classOrder = [
    ClassificationLevel.PUBLIC,
    ClassificationLevel.INTERNAL,
    ClassificationLevel.CONFIDENTIAL,
    ClassificationLevel.RESTRICTED,
  ];
  const roleClearance = classOrder.indexOf(role.maxClassification);
  const resourceLevel = classOrder.indexOf(resourceClassification);

  if (roleClearance < resourceLevel) {
    return false; // Insufficient clearance
  }

  return role.permissions.some(
    (p) => p.resource === resource && p.action === action
  );
}
```

### Session Management

- ✅ **MUST**: Set session timeout to 15 minutes for RESTRICTED, 30 minutes for CONFIDENTIAL
- ✅ **MUST**: Invalidate session on logout (server-side)
- ✅ **MUST**: Regenerate session ID after authentication
- ✅ **MUST**: Use Secure, HttpOnly, SameSite cookie attributes
- ✅ **SHOULD**: Implement absolute session lifetime (8 hours max)
- ✅ **SHOULD**: Detect concurrent sessions and alert user

---

## 3️⃣ Cryptography Rules

### Approved Algorithms

| Purpose | Algorithm | Key Size | Notes |
|---------|-----------|----------|-------|
| **Symmetric Encryption** | AES-256-GCM | 256-bit | Preferred for data at rest |
| **Asymmetric Encryption** | RSA-OAEP | 4096-bit | Key exchange, signatures |
| **Asymmetric Encryption** | ECDSA | P-384+ | Preferred for new implementations |
| **Hashing** | SHA-256 / SHA-384 | — | Data integrity, checksums |
| **Password Hashing** | Argon2id | — | Preferred for passwords |
| **Password Hashing** | bcrypt | cost ≥ 12 | Acceptable alternative |
| **Key Derivation** | HKDF-SHA-256 | — | Derive sub-keys from master |
| **TLS** | TLS 1.2+ | — | TLS 1.3 preferred |

### ❌ Prohibited Algorithms

> **NEVER USE**: MD5, SHA-1, DES, 3DES, RC4, RSA-PKCS1v1.5 (for encryption), ECB mode

### TLS Enforcement

- ✅ **MUST**: Enforce TLS 1.2 minimum for all external connections
- ✅ **MUST**: Use TLS 1.3 for RESTRICTED data transmissions
- ✅ **MUST**: Validate server certificates (no `rejectUnauthorized: false` in production)
- ✅ **MUST**: Use strong cipher suites only (AEAD ciphers preferred)
- ✅ **SHOULD**: Enable HSTS with minimum 1-year max-age
- ✅ **SHOULD**: Implement certificate pinning for critical service-to-service calls

```typescript
// ✅ GOOD: Proper TLS configuration
const httpsOptions = {
  minVersion: "TLSv1.2" as const,
  ciphers: [
    "TLS_AES_256_GCM_SHA384",
    "TLS_CHACHA20_POLY1305_SHA256",
    "ECDHE-ECDSA-AES256-GCM-SHA384",
  ].join(":"),
  rejectUnauthorized: true,
};

// ❌ BAD: Disabling certificate validation
const insecureOptions = {
  rejectUnauthorized: false, // NEVER in production
};
```

### Key Management Lifecycle

| Phase | Requirement |
|-------|-------------|
| **Generation** | Use cryptographically secure random generators (CSPRNG) |
| **Storage** | Store in hardware security modules (HSM) or approved vault |
| **Distribution** | Encrypted channel only; never share raw key material |
| **Rotation** | Symmetric: every 90 days; Asymmetric: every 12 months |
| **Revocation** | Immediate on compromise; publish to CRL/OCSP |
| **Destruction** | Cryptographic zeroization; documented destruction |

### Certificate Handling

- ✅ **MUST**: Monitor certificate expiration (alert ≥ 30 days before expiry)
- ✅ **MUST**: Automate certificate renewal (Let's Encrypt / ACME)
- ✅ **MUST**: Use separate certificates per environment (dev/staging/prod)
- ✅ **SHOULD**: Implement certificate transparency logging
- ✅ **SHOULD**: Use short-lived certificates (≤ 90 days) where possible

---

## 4️⃣ Secrets Management Rules

### Core Rules

- ✅ **MUST**: Never hardcode secrets, API keys, or credentials in source code
- ✅ **MUST**: Never commit secrets to version control (use `.gitignore`, pre-commit hooks)
- ✅ **MUST**: Use a secrets vault (e.g., HashiCorp Vault, AWS Secrets Manager, GitHub Secrets)
- ✅ **MUST**: Enable GitHub secret scanning on all repositories
- ✅ **MUST**: Rotate secrets on schedule and immediately upon suspected compromise
- ✅ **MUST**: Scope secrets to minimum required access (per-environment, per-service)
- ✅ **SHOULD**: Use dynamic/ephemeral secrets where possible
- ✅ **SHOULD**: Log secret access events (but never log secret values)

### Rotation Policy

| Secret Type | Rotation Frequency | On Compromise |
|-------------|-------------------|---------------|
| **API Keys** | Every 90 days | Immediate |
| **Database Passwords** | Every 90 days | Immediate |
| **TLS Certificates** | Every 90 days (automated) | Immediate |
| **Encryption Keys** | Every 12 months | Immediate |
| **Service Account Tokens** | Every 90 days | Immediate |
| **User Passwords** | On indication of compromise | Immediate |

### Secret Scanning Enforcement

```yaml
# .github/workflows/secret-scan.yml (example)
name: Secret Scanning
on: [push, pull_request]
jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Gitleaks
        uses: gitleaks/gitleaks-action@v2
        env:
          GITLEAKS_LICENSE: ${{ secrets.GITLEAKS_LICENSE }}
```

### What to Do When a Secret is Leaked

1. **Revoke** the compromised secret immediately
2. **Rotate** to a new secret
3. **Audit** access logs for unauthorized use
4. **Remediate** the leak (remove from git history if needed: `git filter-branch` or BFG)
5. **Report** per incident response policy
6. **Improve** controls to prevent recurrence

---

## 5️⃣ Input Validation Rules

### Core Rules

- ✅ **MUST**: Validate ALL user inputs at system boundaries (API endpoints, form handlers)
- ✅ **MUST**: Use allowlists (not blocklists) for input validation
- ✅ **MUST**: Sanitize outputs contextually (HTML, SQL, shell, URL)
- ✅ **MUST**: Validate on the server side (client-side validation is UX only)
- ✅ **MUST**: Reject invalid input with clear error messages (without revealing internals)
- ✅ **SHOULD**: Use schema validation libraries (Zod, Yup, Joi)
- ✅ **SHOULD**: Enforce strict Content-Type checking

### Validation Pattern (TypeScript + Zod)

```typescript
import { z } from "zod";

/** Validated user input schema */
const UserInputSchema = z.object({
  email: z.string().email().max(254),
  name: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[\p{L}\p{N}\s\-'.]+$/u, "Invalid characters in name"),
  role: z.enum(["viewer", "editor", "admin"]),
  classification: z.nativeEnum(ClassificationLevel),
});

type ValidatedUserInput = z.infer<typeof UserInputSchema>;

/**
 * Validate and parse user input at system boundary.
 * Returns typed, validated data or throws descriptive error.
 */
export function validateUserInput(raw: unknown): ValidatedUserInput {
  return UserInputSchema.parse(raw);
}
```

### Common Validation Rules

| Input Type | Validation Rule |
|------------|----------------|
| **Email** | RFC 5322 format, max 254 chars |
| **URL** | Allowlisted schemes (https://), valid domain |
| **File Upload** | Allowlisted MIME types, max size, scan for malware |
| **Numeric IDs** | Positive integer, within expected range |
| **Free Text** | Max length, sanitize HTML entities, strip control chars |
| **Dates** | ISO 8601 format, within reasonable range |
| **Passwords** | Min 12 chars, not in breach database, complexity check |

### Output Encoding

```typescript
// ✅ GOOD: Context-aware sanitization
import DOMPurify from "dompurify";

function renderUserContent(untrusted: string): string {
  return DOMPurify.sanitize(untrusted, {
    ALLOWED_TAGS: ["b", "i", "em", "strong", "p"],
    ALLOWED_ATTR: [],
  });
}

// ❌ BAD: Direct interpolation of user input
function renderUnsafe(input: string): string {
  return `<div>${input}</div>`; // XSS vulnerability
}
```

---

## 6️⃣ CIA Triad Implementation Mapping

### How This Skill Maps to CIA

| CIA Dimension | Controls from This Skill | Implementation |
|---------------|------------------------|----------------|
| **Confidentiality** | Data classification, access control, encryption at rest/transit | Classify data → enforce RBAC → encrypt per level |
| **Integrity** | Input validation, hashing, digital signatures, audit logging | Validate inputs → hash for integrity → sign artifacts → log changes |
| **Availability** | Session management, key rotation, certificate monitoring | Manage sessions → rotate keys proactively → monitor cert expiry |

### Security Level Mapping

| Security Level | Classification | Encryption | Access Control | Validation |
|---------------|---------------|------------|----------------|------------|
| **None** | PUBLIC | None required | Open | Basic |
| **Low** | INTERNAL | TLS in transit | Authentication | Standard |
| **Moderate** | CONFIDENTIAL | AES-256 at rest + TLS | RBAC + MFA | Strict schema |
| **High** | RESTRICTED | AES-256-GCM + TLS 1.3 | RBAC + MFA + JIT | Strict + allowlist |
| **Very High** | RESTRICTED + additional | E2E + HSM | Zero trust + continuous auth | Formal verification |

---

## 7️⃣ Compliance Framework Mapping

### ISO 27001:2022

| Control | Skill Section | Implementation |
|---------|--------------|----------------|
| A.5.12 Classification of information | §1 Data Classification | 4-level scheme with handling rules |
| A.5.13 Labelling of information | §1 Data Classification | Classification tags on all data |
| A.5.15 Access control | §2 Access Control | RBAC, least privilege |
| A.5.17 Authentication information | §2 Authentication | Password policy, MFA |
| A.8.2 Privileged access rights | §2 Access Control | JIT access, separation of duties |
| A.8.5 Secure authentication | §2 Authentication | Session management |
| A.8.24 Use of cryptography | §3 Cryptography | Approved algorithms, key management |
| A.8.25 Secure development lifecycle | §5 Input Validation | Validation at boundaries |

### NIST CSF 2.0

| Function | Category | Skill Section |
|----------|----------|--------------|
| **IDENTIFY** | ID.AM — Asset Management | §1 Classification levels |
| **PROTECT** | PR.AA — Identity & Access | §2 Access control rules |
| **PROTECT** | PR.DS — Data Security | §1 Handling requirements, §3 Cryptography |
| **PROTECT** | PR.PS — Platform Security | §4 Secrets management |
| **DETECT** | DE.CM — Continuous Monitoring | §4 Secret scanning |
| **RESPOND** | RS.MI — Incident Mitigation | §4 Secret leak response |

### GDPR

| Principle | Skill Section | Implementation |
|-----------|--------------|----------------|
| Data minimization (Art. 5.1c) | §1 Classification | Classify and limit collection |
| Integrity and confidentiality (Art. 5.1f) | §2, §3 | Access control + encryption |
| Data protection by design (Art. 25) | §5 Input Validation | Validate and sanitize at boundaries |
| Security of processing (Art. 32) | §3 Cryptography | Encryption, pseudonymization |

---

## 8️⃣ Quick Decision Guide

### "What classification level should I use?"

```
Does disclosure cause severe/catastrophic harm?
  → YES → 🔴 RESTRICTED
Does disclosure cause significant business or regulatory harm?
  → YES → 🟠 CONFIDENTIAL
Is this for internal use only?
  → YES → 🟡 INTERNAL
  → NO  → 🟢 PUBLIC
```

### "What encryption do I need?"

```
Classification = RESTRICTED?
  → AES-256-GCM at rest + TLS 1.3 in transit + HSM key storage
Classification = CONFIDENTIAL?
  → AES-256 at rest + TLS 1.2+ in transit
Classification = INTERNAL?
  → TLS 1.2+ in transit
Classification = PUBLIC?
  → HTTPS recommended but not required
```

### "How do I handle this secret?"

```
Is it in source code? → REMOVE IT NOW. Use environment variables or vault.
Is it in git history? → Use BFG or git filter-branch to purge, then rotate.
Is it expired or unused? → Revoke and delete immediately.
Is it shared between services? → Create unique credentials per service.
Does it have an owner? → If no, assign one. Every secret needs an owner.
```

### "How do I validate this input?"

```
Is it user-supplied? → VALIDATE on the server side.
Can you define valid values? → Use an ALLOWLIST (enum, regex, schema).
Will it be rendered in HTML? → SANITIZE with DOMPurify or equivalent.
Will it be used in a query? → Use PARAMETERIZED queries, never concatenate.
Is it a file upload? → Check MIME type, size, scan for malware.
```

---

## 9️⃣ Anti-Patterns to Avoid

| ❌ Anti-Pattern | ✅ Correct Approach |
|----------------|---------------------|
| Storing passwords in plaintext | Hash with Argon2id or bcrypt (cost ≥ 12) |
| Using `any` for security-sensitive data | Define explicit TypeScript types with classification |
| Disabling TLS verification in production | Always validate certificates; fix root cause |
| Logging secret values | Log access events only; never log the secret itself |
| Shared service account credentials | Unique credentials per service, automated rotation |
| Client-side-only validation | Always validate server-side; client-side is UX only |
| Hardcoded API keys in source | Use vault or environment variables |
| Using MD5 or SHA-1 for security | Use SHA-256+ for hashing; Argon2id for passwords |
| Overly broad RBAC roles | Granular permissions following least privilege |
| No session timeout | Enforce timeouts per classification level |

---

## 🔗 Related Resources

### Internal
- [Security by Design Skill](./security-by-design.md)
- [Code Quality Excellence Skill](./code-quality-excellence.md)
- [ISMS Compliance Skill](./isms-compliance.md)
- [SECURITY.md](../../SECURITY.md)
- [ISMS Implementation Guide](../../ISMS_IMPLEMENTATION_GUIDE.md)

### External
- [OWASP Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)
- [OWASP Cryptographic Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html)
- [NIST SP 800-53 AC (Access Control)](https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final)
- [NIST SP 800-57 Key Management](https://csrc.nist.gov/publications/detail/sp/800-57-part-1/rev-5/final)
- [Hack23 ISMS-PUBLIC Repository](https://github.com/Hack23/ISMS-PUBLIC)

---

> **Remember**: Classification drives access control, access control drives cryptography. When in doubt, classify higher and restrict more — it is easier to relax controls than to recover from a breach.
