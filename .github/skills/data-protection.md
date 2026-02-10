# 🏷️ Data Protection Skill

## Strategic Principle

**Every piece of data must be classified, protected, and handled according to its sensitivity level, ensuring confidentiality, integrity, and availability throughout its lifecycle.**

This skill integrates systematic data classification, GDPR privacy by design, encryption standards, and data lifecycle management into all development activities.

## Core References

### Hack23 ISMS Data Protection Framework

**Primary Policies**:
1. [🏷️ Data Classification Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Data_Classification_Policy.md) - Systematic data classification and handling requirements
2. [🔐 Privacy Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Privacy_Policy.md) - GDPR-compliant privacy framework
3. [🏷️ CLASSIFICATION Framework](https://github.com/Hack23/ISMS-PUBLIC/blob/main/CLASSIFICATION.md) - Business impact-based classification methodology
4. [🔒 Cryptography Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Cryptography_Policy.md) - Encryption standards and key management

**Supporting Frameworks**:
- [🔐 Information Security Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Information_Security_Policy.md) - Data protection principles
- [🔑 Access Control Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Access_Control_Policy.md) - Data access governance
- [💾 Backup Recovery Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Backup_Recovery_Policy.md) - Data recovery and retention

## Data Classification Framework

### Classification Levels

**RULE**: All data MUST be classified using the CIA triad (Confidentiality, Integrity, Availability).

```typescript
enum ConfidentialityLevel {
  PUBLIC = 'public',               // Public disclosure acceptable
  INTERNAL = 'internal',           // Internal use only
  CONFIDENTIAL = 'confidential',   // Restricted to authorized personnel
  RESTRICTED = 'restricted',       // Highly sensitive, need-to-know basis
}

enum IntegrityLevel {
  LOW = 'low',                     // Errors acceptable, no critical impact
  MODERATE = 'moderate',           // Accuracy important, errors manageable
  HIGH = 'high',                   // Accuracy critical, errors have significant impact
  CRITICAL = 'critical',           // Zero tolerance for errors, mission-critical
}

enum AvailabilityLevel {
  LOW = 'low',                     // Downtime acceptable (>24h)
  MODERATE = 'moderate',           // Limited downtime (4-24h)
  HIGH = 'high',                   // Minimal downtime (<4h)
  CRITICAL = 'critical',           // Near-zero downtime (<1h), 99.9%+ uptime
}

interface DataClassification {
  readonly dataType: string;
  readonly confidentiality: ConfidentialityLevel;
  readonly integrity: IntegrityLevel;
  readonly availability: AvailabilityLevel;
  readonly containsPII: boolean;
  readonly retentionPeriod: string;
  readonly legalBasis?: string;  // GDPR legal basis if PII
}
```

### Classification Examples

```typescript
// ✅ GOOD: Explicit data classification
const DATA_CLASSIFICATIONS: Record<string, DataClassification> = {
  userCredentials: {
    dataType: 'User authentication credentials',
    confidentiality: ConfidentialityLevel.RESTRICTED,
    integrity: IntegrityLevel.CRITICAL,
    availability: AvailabilityLevel.HIGH,
    containsPII: true,
    retentionPeriod: 'Account lifetime + 30 days',
    legalBasis: 'GDPR Article 6(1)(b) - Contract performance',
  },
  
  complianceReports: {
    dataType: 'Generated compliance assessment reports',
    confidentiality: ConfidentialityLevel.CONFIDENTIAL,
    integrity: IntegrityLevel.HIGH,
    availability: AvailabilityLevel.MODERATE,
    containsPII: false,
    retentionPeriod: '7 years (regulatory requirement)',
  },
  
  publicDocumentation: {
    dataType: 'Public API documentation',
    confidentiality: ConfidentialityLevel.PUBLIC,
    integrity: IntegrityLevel.MODERATE,
    availability: AvailabilityLevel.HIGH,
    containsPII: false,
    retentionPeriod: 'Indefinite',
  },
  
  auditLogs: {
    dataType: 'Security and access audit logs',
    confidentiality: ConfidentialityLevel.CONFIDENTIAL,
    integrity: IntegrityLevel.CRITICAL,
    availability: AvailabilityLevel.MODERATE,
    containsPII: true,
    retentionPeriod: '1 year minimum (ISO 27001 requirement)',
    legalBasis: 'GDPR Article 6(1)(f) - Legitimate interests (security)',
  },
};
```

**Reference**: 
- [Data Classification Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Data_Classification_Policy.md)
- [CLASSIFICATION Framework](https://github.com/Hack23/ISMS-PUBLIC/blob/main/CLASSIFICATION.md)

## GDPR Privacy by Design

### Seven Foundational Principles

**1. Proactive not Reactive; Preventative not Remedial**
```typescript
// ✅ GOOD: Privacy by design in data collection
interface UserRegistration {
  readonly email: string;              // Required for authentication
  readonly consent: {
    readonly marketing: boolean;       // Explicit opt-in
    readonly analytics: boolean;       // Explicit opt-in
    readonly timestamp: Date;          // Proof of consent
  };
  // ❌ BAD: Collecting unnecessary data
  // readonly phoneNumber?: string;
  // readonly address?: string;
}
```

**2. Privacy as the Default Setting**
```typescript
// ✅ GOOD: Privacy-preserving defaults
const DEFAULT_USER_PRIVACY: UserPrivacySettings = {
  profileVisibility: 'private',        // Not public by default
  dataSharing: false,                  // No third-party sharing by default
  analyticsTracking: false,            // No tracking by default
  marketingEmails: false,              // No marketing by default
};
```

**3. Privacy Embedded into Design**
```typescript
// ✅ GOOD: Privacy embedded in architecture
interface DataProcessingPipeline {
  readonly collection: {
    readonly minimization: boolean;        // Collect only necessary data
    readonly purposeLimitation: boolean;   // Collect for specific purpose
  };
  readonly storage: {
    readonly encryption: boolean;          // Encrypt at rest
    readonly pseudonymization: boolean;    // Separate identifiers
  };
  readonly access: {
    readonly roleBasedControl: boolean;    // Limit access
    readonly auditLogging: boolean;        // Track access
  };
  readonly retention: {
    readonly automaticDeletion: boolean;   // Auto-delete after retention period
    readonly dataMinimization: boolean;    // Delete when no longer needed
  };
}
```

**4. Full Functionality — Positive-Sum, not Zero-Sum**
```typescript
// ✅ GOOD: Privacy-preserving analytics
interface PrivacyPreservingAnalytics {
  readonly aggregatedMetrics: boolean;     // Only aggregate data
  readonly differentialPrivacy: boolean;   // Add noise to protect individuals
  readonly noPersonalIdentifiers: boolean; // Strip PII
  readonly consentBased: boolean;          // Only with user consent
}

async function trackEvent(
  eventName: string, 
  properties: Record<string, unknown>
): Promise<void> {
  // Remove PII before sending
  const sanitized = removePII(properties);
  
  // Only send if user consented
  if (await hasAnalyticsConsent()) {
    await analytics.track(eventName, sanitized);
  }
}
```

**5. End-to-End Security — Full Lifecycle Protection**
```typescript
// ✅ GOOD: Lifecycle data protection
class SecureDataLifecycle<T> {
  async create(data: T, classification: DataClassification): Promise<string> {
    // Encrypt if confidential/restricted
    const encrypted = await this.encryptIfNeeded(data, classification);
    
    // Store with metadata
    const id = await this.store(encrypted, {
      classification,
      createdAt: new Date(),
      expiresAt: this.calculateExpiry(classification.retentionPeriod),
    });
    
    // Audit log creation
    await this.auditLog('data_created', { id, classification });
    
    return id;
  }
  
  async read(id: string, requester: User): Promise<T> {
    // Check access control
    await this.enforceAccessControl(id, requester);
    
    // Decrypt if needed
    const data = await this.retrieve(id);
    const decrypted = await this.decryptIfNeeded(data);
    
    // Audit log access
    await this.auditLog('data_accessed', { id, requester: requester.id });
    
    return decrypted;
  }
  
  async delete(id: string, reason: string): Promise<void> {
    // Secure deletion (overwrite + delete)
    await this.secureDelete(id);
    
    // Audit log deletion
    await this.auditLog('data_deleted', { id, reason });
  }
  
  async automaticRetentionCleanup(): Promise<void> {
    // Find expired data
    const expired = await this.findExpired();
    
    // Securely delete
    for (const item of expired) {
      await this.delete(item.id, 'retention_period_expired');
    }
  }
}
```

**6. Visibility and Transparency — Keep it Open**
```typescript
// ✅ GOOD: Transparent data processing
interface DataProcessingNotice {
  readonly purpose: string;
  readonly dataCollected: readonly string[];
  readonly legalBasis: string;
  readonly retention: string;
  readonly thirdParties: readonly string[];
  readonly userRights: readonly string[];
  readonly dpo: {
    readonly name: string;
    readonly email: string;
  };
}

const USER_DATA_NOTICE: DataProcessingNotice = {
  purpose: 'User authentication and compliance assessment',
  dataCollected: ['email', 'hashed password', 'login timestamps'],
  legalBasis: 'GDPR Article 6(1)(b) - Contract performance',
  retention: 'Account lifetime + 30 days',
  thirdParties: ['AWS (cloud hosting)', 'GitHub (authentication)'],
  userRights: [
    'Right to access (Article 15)',
    'Right to rectification (Article 16)',
    'Right to erasure (Article 17)',
    'Right to data portability (Article 20)',
  ],
  dpo: {
    name: 'James Pether Sörling',
    email: 'james@hack23.com',
  },
};
```

**7. Respect for User Privacy — Keep it User-Centric**
```typescript
// ✅ GOOD: User-centric privacy controls
interface UserPrivacyRights {
  async exerciseRightToAccess(userId: string): Promise<UserDataPackage> {
    // Compile all user data
    const profile = await this.getUserProfile(userId);
    const activity = await this.getUserActivity(userId);
    const consents = await this.getUserConsents(userId);
    
    return {
      profile,
      activity,
      consents,
      generatedAt: new Date(),
      format: 'JSON',
    };
  }
  
  async exerciseRightToErasure(userId: string): Promise<void> {
    // GDPR Article 17 - Right to be forgotten
    await this.deleteUserData(userId);
    await this.auditLog('right_to_erasure_exercised', { userId });
  }
  
  async exerciseRightToPortability(userId: string): Promise<Blob> {
    // GDPR Article 20 - Data portability
    const data = await this.getUserData(userId);
    return this.exportToStructuredFormat(data, 'JSON');
  }
  
  async exerciseRightToRectification(
    userId: string, 
    corrections: Partial<UserProfile>
  ): Promise<void> {
    // GDPR Article 16 - Right to rectification
    await this.updateUserProfile(userId, corrections);
    await this.auditLog('right_to_rectification_exercised', { userId });
  }
}
```

**Reference**: [Privacy Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Privacy_Policy.md)

## Encryption Standards

### Encryption Requirements by Classification

**RULE**: Encrypt data based on classification level.

```typescript
interface EncryptionRequirements {
  readonly dataAtRest: {
    readonly algorithm: string;
    readonly keySize: number;
    readonly mode: string;
  };
  readonly dataInTransit: {
    readonly protocol: string;
    readonly minVersion: string;
    readonly cipherSuites: readonly string[];
  };
  readonly keyManagement: {
    readonly storage: string;
    readonly rotation: string;
    readonly access: string;
  };
}

const ENCRYPTION_BY_CLASSIFICATION: Record<ConfidentialityLevel, EncryptionRequirements> = {
  [ConfidentialityLevel.RESTRICTED]: {
    dataAtRest: {
      algorithm: 'AES',
      keySize: 256,
      mode: 'GCM',
    },
    dataInTransit: {
      protocol: 'TLS',
      minVersion: '1.3',
      cipherSuites: ['TLS_AES_256_GCM_SHA384', 'TLS_CHACHA20_POLY1305_SHA256'],
    },
    keyManagement: {
      storage: 'AWS KMS with hardware security module',
      rotation: 'Annual',
      access: 'CEO only',
    },
  },
  
  [ConfidentialityLevel.CONFIDENTIAL]: {
    dataAtRest: {
      algorithm: 'AES',
      keySize: 256,
      mode: 'GCM',
    },
    dataInTransit: {
      protocol: 'TLS',
      minVersion: '1.2',
      cipherSuites: ['TLS_AES_256_GCM_SHA384', 'TLS_AES_128_GCM_SHA256'],
    },
    keyManagement: {
      storage: 'AWS KMS',
      rotation: 'Every 2 years',
      access: 'Role-based',
    },
  },
  
  [ConfidentialityLevel.INTERNAL]: {
    dataAtRest: {
      algorithm: 'AES',
      keySize: 128,
      mode: 'GCM',
    },
    dataInTransit: {
      protocol: 'TLS',
      minVersion: '1.2',
      cipherSuites: ['TLS_AES_128_GCM_SHA256'],
    },
    keyManagement: {
      storage: 'AWS KMS',
      rotation: 'Every 3 years',
      access: 'Service-level',
    },
  },
  
  [ConfidentialityLevel.PUBLIC]: {
    dataAtRest: {
      algorithm: 'None',
      keySize: 0,
      mode: 'N/A',
    },
    dataInTransit: {
      protocol: 'TLS',
      minVersion: '1.2',
      cipherSuites: ['TLS_AES_128_GCM_SHA256'],
    },
    keyManagement: {
      storage: 'N/A',
      rotation: 'N/A',
      access: 'N/A',
    },
  },
};
```

### Practical Encryption Implementation

```typescript
// ✅ GOOD: Classification-aware encryption
import { webcrypto } from 'crypto';

class DataEncryptionService {
  async encryptData(
    data: string,
    classification: DataClassification
  ): Promise<{ encrypted: ArrayBuffer; iv: Uint8Array }> {
    const requirements = ENCRYPTION_BY_CLASSIFICATION[classification.confidentiality];
    
    // Only encrypt confidential and restricted data
    if (classification.confidentiality === ConfidentialityLevel.PUBLIC ||
        classification.confidentiality === ConfidentialityLevel.INTERNAL) {
      return { 
        encrypted: new TextEncoder().encode(data), 
        iv: new Uint8Array() 
      };
    }
    
    // Generate encryption key from KMS
    const key = await this.getEncryptionKey(classification);
    
    // Generate random IV
    const iv = webcrypto.getRandomValues(new Uint8Array(12));
    
    // Encrypt using AES-GCM
    const encrypted = await webcrypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv,
      },
      key,
      new TextEncoder().encode(data)
    );
    
    // Audit log encryption
    await this.auditLog('data_encrypted', { 
      classification: classification.confidentiality,
      algorithm: requirements.dataAtRest.algorithm,
    });
    
    return { encrypted, iv };
  }
  
  async decryptData(
    encrypted: ArrayBuffer,
    iv: Uint8Array,
    classification: DataClassification
  ): Promise<string> {
    // Skip decryption for unencrypted data
    if (classification.confidentiality === ConfidentialityLevel.PUBLIC ||
        classification.confidentiality === ConfidentialityLevel.INTERNAL) {
      return new TextDecoder().decode(encrypted);
    }
    
    // Get decryption key from KMS
    const key = await this.getEncryptionKey(classification);
    
    // Decrypt using AES-GCM
    const decrypted = await webcrypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv,
      },
      key,
      encrypted
    );
    
    // Audit log decryption
    await this.auditLog('data_decrypted', {
      classification: classification.confidentiality,
    });
    
    return new TextDecoder().decode(decrypted);
  }
}
```

**Reference**: [Cryptography Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Cryptography_Policy.md)

## Data Handling Procedures

### Secure Data Collection

```typescript
// ✅ GOOD: Minimal data collection with clear purpose
interface DataCollectionForm {
  readonly purpose: string;
  readonly fields: readonly {
    readonly name: string;
    readonly required: boolean;
    readonly justification: string;
  }[];
  readonly legalBasis: string;
  readonly retention: string;
}

const LOGIN_FORM: DataCollectionForm = {
  purpose: 'User authentication',
  fields: [
    {
      name: 'email',
      required: true,
      justification: 'Unique identifier for authentication',
    },
    {
      name: 'password',
      required: true,
      justification: 'Authentication credential',
    },
    // ❌ BAD: Unnecessary fields
    // { name: 'phoneNumber', required: false, justification: '???' },
  ],
  legalBasis: 'GDPR Article 6(1)(b) - Contract performance',
  retention: 'Account lifetime + 30 days',
};
```

### Secure Data Storage

```typescript
// ✅ GOOD: Classification-aware storage
class SecureDataStore {
  async store<T>(
    data: T,
    classification: DataClassification
  ): Promise<string> {
    // Encrypt if needed
    const processedData = await this.processForStorage(data, classification);
    
    // Choose storage based on availability requirements
    const storage = this.selectStorage(classification.availability);
    
    // Store with metadata
    const id = await storage.save({
      data: processedData,
      metadata: {
        classification,
        createdAt: new Date(),
        expiresAt: this.calculateExpiry(classification.retentionPeriod),
      },
    });
    
    // Audit log
    await this.auditLog('data_stored', { id, classification });
    
    // Schedule automatic deletion
    await this.scheduleRetentionCleanup(id, classification.retentionPeriod);
    
    return id;
  }
  
  private selectStorage(availability: AvailabilityLevel): DataStorage {
    switch (availability) {
      case AvailabilityLevel.CRITICAL:
        return this.multiRegionReplicatedStorage;  // 99.99% uptime
      case AvailabilityLevel.HIGH:
        return this.replicatedStorage;             // 99.9% uptime
      case AvailabilityLevel.MODERATE:
        return this.standardStorage;               // 99% uptime
      case AvailabilityLevel.LOW:
        return this.archiveStorage;                // Best effort
    }
  }
}
```

### Secure Data Transmission

```typescript
// ✅ GOOD: TLS-enforced data transmission
interface SecureTransmissionConfig {
  readonly enforceHTTPS: boolean;
  readonly tlsVersion: string;
  readonly certificatePinning: boolean;
  readonly hsts: boolean;
}

const SECURE_TRANSMISSION: SecureTransmissionConfig = {
  enforceHTTPS: true,
  tlsVersion: '1.3',
  certificatePinning: false,  // Not needed for public web apps
  hsts: true,                 // HTTP Strict Transport Security
};

// Enforce HTTPS at application level
function enforceHTTPS(req: Request, res: Response, next: NextFunction): void {
  if (!req.secure && process.env.NODE_ENV === 'production') {
    return res.redirect(301, `https://${req.headers.host}${req.url}`);
  }
  next();
}
```

### Secure Data Deletion

```typescript
// ✅ GOOD: Secure data deletion (GDPR Article 17)
class SecureDataDeletion {
  async deleteUserData(userId: string, reason: string): Promise<void> {
    // 1. Identify all user data across systems
    const dataLocations = await this.identifyUserData(userId);
    
    // 2. Delete from primary storage
    await Promise.all([
      this.deleteFromDatabase(userId),
      this.deleteFromCache(userId),
      this.deleteFromBackups(userId),  // Anonymize in backups
      this.deleteFromLogs(userId),     // Anonymize in logs
    ]);
    
    // 3. Verify deletion
    const remainingData = await this.verifyDeletion(userId);
    if (remainingData.length > 0) {
      throw new Error(`Failed to delete all data: ${remainingData.join(', ')}`);
    }
    
    // 4. Audit log
    await this.auditLog('user_data_deleted', {
      userId,
      reason,
      timestamp: new Date(),
      dataLocations,
    });
    
    // 5. Notify user
    await this.notifyUserDeletionComplete(userId);
  }
  
  private async anonymizeInBackups(userId: string): Promise<void> {
    // Can't delete from immutable backups, anonymize instead
    await this.updateBackupIndex(userId, {
      email: `deleted-${userId}@example.com`,
      name: '[DELETED]',
      deletedAt: new Date(),
    });
  }
}
```

**Reference**: [Data Classification Policy - Data Handling](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Data_Classification_Policy.md)

## Data Retention and Disposal

### Retention Policy

```typescript
interface RetentionPolicy {
  readonly dataType: string;
  readonly retentionPeriod: string;
  readonly legalRequirement?: string;
  readonly disposalMethod: 'secure_delete' | 'anonymize' | 'archive';
}

const RETENTION_POLICIES: readonly RetentionPolicy[] = [
  {
    dataType: 'User credentials',
    retentionPeriod: 'Account lifetime + 30 days',
    legalRequirement: 'GDPR Article 5(1)(e) - Storage limitation',
    disposalMethod: 'secure_delete',
  },
  {
    dataType: 'Audit logs',
    retentionPeriod: '1 year minimum',
    legalRequirement: 'ISO 27001:2022 Control A.8.16',
    disposalMethod: 'secure_delete',
  },
  {
    dataType: 'Financial records',
    retentionPeriod: '7 years',
    legalRequirement: 'Swedish Accounting Act',
    disposalMethod: 'archive',
  },
  {
    dataType: 'Compliance assessments',
    retentionPeriod: '7 years',
    legalRequirement: 'Regulatory compliance',
    disposalMethod: 'archive',
  },
];
```

## Enforcement Rules

### MUST (Critical - Block PR if violated)
1. All data MUST be classified using CIA triad (Confidentiality, Integrity, Availability)
2. Confidential and restricted data MUST be encrypted at rest (AES-256-GCM)
3. All data transmission MUST use TLS 1.2+ 
4. PII MUST have documented GDPR legal basis
5. Data collection MUST follow minimization principle (only necessary data)
6. User privacy rights MUST be implemented (access, rectification, erasure, portability)
7. Data retention periods MUST be enforced with automatic deletion
8. Secure deletion MUST overwrite data (not just mark as deleted)

### SHOULD (High priority - Require justification)
1. Implement privacy by design in all features
2. Use pseudonymization for identifiable data where possible
3. Encrypt confidential data in transit and at rest
4. Implement differential privacy for analytics
5. Conduct Data Protection Impact Assessments (DPIA) for high-risk processing
6. Document data flows in Data Flow Diagrams
7. Regular data protection audits (quarterly)

### MAY (Recommended - Best practice)
1. Appoint dedicated Data Protection Officer (DPO)
2. Implement homomorphic encryption for sensitive computations
3. Use secure multi-party computation for collaborative analysis
4. Pursue privacy certifications (Privacy Shield, Standard Contractual Clauses)
5. Conduct privacy training for all personnel
6. Participate in privacy communities

## Quick Decision Guide

**When collecting user data:**
→ Classify data (CIA triad)
→ Apply GDPR data minimization
→ Document legal basis
→ Implement consent mechanism (if needed)
→ Define retention period

**When storing sensitive data:**
→ Check classification level
→ Encrypt if confidential/restricted (AES-256-GCM)
→ Apply access controls
→ Audit log all access
→ Schedule automatic deletion

**When processing personal data:**
→ Verify GDPR legal basis
→ Implement privacy by design
→ Enable user privacy rights
→ Conduct DPIA if high-risk
→ Document data flows

**When deleting data:**
→ Secure deletion (overwrite)
→ Delete from all locations (primary, cache, backups, logs)
→ Verify deletion complete
→ Audit log deletion
→ Notify user

## Remember

**Data protection is not compliance theater. It's a fundamental commitment to respecting user privacy and securing information assets.**

Every data field is a privacy decision. Classify, protect, minimize, delete.

## Related Resources

### Hack23 ISMS Data Protection Framework
- [🏷️ Data Classification Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Data_Classification_Policy.md)
- [🔐 Privacy Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Privacy_Policy.md)
- [🏷️ CLASSIFICATION Framework](https://github.com/Hack23/ISMS-PUBLIC/blob/main/CLASSIFICATION.md)
- [🔒 Cryptography Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Cryptography_Policy.md)
- [💾 Backup Recovery Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Backup_Recovery_Policy.md)

### External Standards
- [GDPR Official Text](https://gdpr-info.eu/)
- [ISO/IEC 27001:2022 Control A.8.11 - Data Masking](https://www.iso.org/standard/27001)
- [NIST Privacy Framework](https://www.nist.gov/privacy-framework)
- [OWASP Data Protection Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Data_Protection_Cheat_Sheet.html)
