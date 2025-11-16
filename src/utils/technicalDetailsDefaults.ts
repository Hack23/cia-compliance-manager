import { SecurityLevel } from "../types/cia";

/**
 * Gets default technical details when service isn't available
 *
 * @param component - The CIA component
 * @param level - The security level
 * @returns Default technical details object
 */
export function getDefaultTechnicalDetails(
  component: string,
  level: SecurityLevel
): {
  description: string;
  technical: string;
  recommendations: string[];
} {
  return {
    description: getDefaultDescription(component, level),
    technical: getDefaultTechDescription(component, level),
    recommendations: getDefaultRequirements(component, level),
  };
}

/**
 * Gets default description for a CIA component at a specific security level
 *
 * @param component - The CIA component
 * @param level - The security level
 * @returns Default description text
 */
export function getDefaultDescription(
  component: string,
  level: SecurityLevel
): string {
  if (component === "confidentiality") {
    switch (level) {
      case "None":
        return "No confidentiality controls implemented, allowing unrestricted access to data.";
      case "Low":
        return "Basic confidentiality controls to prevent casual unauthorized access to data.";
      case "Moderate":
        return "Standard confidentiality controls with defined access privileges and protections.";
      case "High":
        return "Advanced confidentiality controls with strong encryption and strict access management.";
      case "Very High":
        return "Comprehensive confidentiality controls with the highest level of protection.";
      default:
        return "Standard confidentiality controls.";
    }
  }

  if (component === "integrity") {
    switch (level) {
      case "None":
        return "No integrity controls implemented, data can be modified without detection.";
      case "Low":
        return "Basic integrity controls that provide minimal protection against unauthorized changes.";
      case "Moderate":
        return "Standard integrity controls that detect unauthorized modifications to data.";
      case "High":
        return "Advanced integrity controls with cryptographic verification of data.";
      case "Very High":
        return "Comprehensive integrity controls with immutable audit trails.";
      default:
        return "Standard integrity controls.";
    }
  }

  // Default to availability
  switch (level) {
    case "None":
      return "No availability controls implemented, no guarantees for system uptime.";
    case "Low":
      return "Basic availability controls providing minimal resilience to disruptions.";
    case "Moderate":
      return "Standard availability controls ensuring reasonable system uptime.";
    case "High":
      return "Advanced availability controls with redundancy and quick recovery capabilities.";
    case "Very High":
      return "Comprehensive availability controls with maximum fault tolerance.";
    default:
      return "Standard availability controls.";
  }
}

/**
 * Gets default technical description for a CIA component at a specific security level
 *
 * @param component - The CIA component
 * @param level - The security level
 * @returns Default technical description text
 */
export function getDefaultTechDescription(
  component: string,
  level: SecurityLevel
): string {
  if (component === "confidentiality") {
    switch (level) {
      case "None":
        return "No specific technical controls for protecting data confidentiality.";
      case "Low":
        return "Basic access controls and password protection for sensitive resources.";
      case "Moderate":
        return "Role-based access control (RBAC), data encryption at rest and in transit, and proper authentication mechanisms.";
      case "High":
        return "Granular access control, strong encryption with proper key management, DLP controls, and multi-factor authentication.";
      case "Very High":
        return "Zero-trust architecture, advanced encryption with hardware security modules, comprehensive DLP, and context-aware access controls.";
      default:
        return "Standard confidentiality technical controls.";
    }
  }

  if (component === "integrity") {
    switch (level) {
      case "None":
        return "No specific technical controls for ensuring data integrity.";
      case "Low":
        return "Basic input validation and error detection mechanisms.";
      case "Moderate":
        return "Comprehensive input validation, checksums, access controls, and error detection.";
      case "High":
        return "Digital signatures, cryptographic hashing, strong change control, and comprehensive logging.";
      case "Very High":
        return "Blockchain or similar technologies for critical data, immutable audit logs, and formal verification methods.";
      default:
        return "Standard integrity technical controls.";
    }
  }

  // Default to availability
  switch (level) {
    case "None":
      return "No specific technical controls for ensuring system availability.";
    case "Low":
      return "Basic monitoring and manual recovery procedures.";
    case "Moderate":
      return "Redundant components, scheduled backups, load balancing, and defined recovery procedures.";
    case "High":
      return "Automatic failover, real-time monitoring, comprehensive disaster recovery, and advanced load balancing.";
    case "Very High":
      return "Multi-site active-active configurations, continuous data protection, and fully automated recovery with zero data loss.";
    default:
      return "Standard availability technical controls.";
  }
}

/**
 * Gets default technical requirements for a CIA component at a specific security level
 *
 * @param component - The CIA component
 * @param level - The security level
 * @returns Array of default technical requirements
 */
export function getDefaultRequirements(
  component: string,
  level: SecurityLevel
): string[] {
  if (component === "confidentiality") {
    switch (level) {
      case "None":
        return ["No specific requirements."];
      case "Low":
        return [
          "Implement user authentication",
          "Use basic password policies",
          "Apply simple access controls",
          "Secure sensitive data storage",
        ];
      case "Moderate":
        return [
          "Implement role-based access control",
          "Use standard TLS for data in transit",
          "Encrypt sensitive data at rest",
          "Enforce strong password policies",
          "Implement session management",
        ];
      case "High":
        return [
          "Implement multi-factor authentication",
          "Deploy data loss prevention solutions",
          "Use strong encryption for all data",
          "Implement privileged access management",
          "Conduct regular access reviews",
        ];
      case "Very High":
        return [
          "Implement zero-trust network architecture",
          "Use hardware security modules for encryption",
          "Deploy advanced data loss prevention",
          "Implement just-in-time access",
          "Use behavioral analytics for access monitoring",
        ];
      default:
        return ["Standard confidentiality requirements."];
    }
  }

  if (component === "integrity") {
    switch (level) {
      case "None":
        return ["No specific requirements."];
      case "Low":
        return [
          "Implement basic input validation",
          "Use simple error detection",
          "Apply basic data quality checks",
        ];
      case "Moderate":
        return [
          "Implement comprehensive input validation",
          "Use checksums for data verification",
          "Implement change detection mechanisms",
          "Maintain data validation logs",
          "Use database constraints",
        ];
      case "High":
        return [
          "Implement digital signatures",
          "Use cryptographic hash verification",
          "Deploy comprehensive audit logging",
          "Implement strict change controls",
          "Use data integrity monitoring",
        ];
      case "Very High":
        return [
          "Implement blockchain for critical data",
          "Use immutable audit trails",
          "Deploy formal verification methods",
          "Implement hardware-based integrity controls",
          "Use zero-knowledge proofs where applicable",
        ];
      default:
        return ["Standard integrity requirements."];
    }
  }

  // Default to availability
  switch (level) {
    case "None":
      return ["No specific requirements."];
    case "Low":
      return [
        "Set up basic system monitoring",
        "Implement manual backup procedures",
        "Create simple incident response plan",
      ];
    case "Moderate":
      return [
        "Implement redundant components",
        "Set up scheduled backup routines",
        "Deploy basic load balancing",
        "Create disaster recovery procedures",
        "Implement health checks and alerts",
      ];
    case "High":
      return [
        "Implement automatic failover mechanisms",
        "Deploy real-time monitoring and alerting",
        "Set up geographically distributed backups",
        "Implement advanced load balancing",
        "Create comprehensive disaster recovery plan",
      ];
    case "Very High":
      return [
        "Implement multi-site active-active configuration",
        "Deploy continuous data protection",
        "Use fully automated recovery mechanisms",
        "Implement zero-downtime deployment processes",
        "Deploy dedicated site reliability engineering",
      ];
    default:
      return ["Standard availability requirements."];
  }
}

/**
 * Gets default technologies for a CIA component at a specific security level
 *
 * @param component - The CIA component
 * @param level - The security level
 * @returns Default technologies description
 */
export function getDefaultTechnologies(
  component: string,
  level: SecurityLevel
): string {
  if (component === "confidentiality") {
    switch (level) {
      case "None":
        return "No specific technologies";
      case "Low":
        return "Password managers, basic access control lists";
      case "Moderate":
        return "LDAP, Active Directory, TLS 1.2+, AES-128";
      case "High":
        return "MFA solutions, DLP tools, AES-256, Key Management Systems";
      case "Very High":
        return "HSMs, Zero-trust frameworks, Advanced DLP, AES-256-GCM, Behavioral analytics";
      default:
        return "Standard encryption and access control tools";
    }
  }

  if (component === "integrity") {
    switch (level) {
      case "None":
        return "No specific technologies";
      case "Low":
        return "Basic input validation libraries, simple checksums";
      case "Moderate":
        return "SHA-256, input validation frameworks, database constraints";
      case "High":
        return "Digital signature systems, cryptographic hashing, SIEM tools";
      case "Very High":
        return "Blockchain platforms, immutable logging systems, formal verification tools";
      default:
        return "Standard integrity verification tools";
    }
  }

  // Default to availability
  switch (level) {
    case "None":
      return "No specific technologies";
    case "Low":
      return "Basic monitoring tools, manual backup scripts";
    case "Moderate":
      return "Load balancers, backup solutions, monitoring systems";
    case "High":
      return "HA clusters, advanced monitoring, automated failover systems";
    case "Very High":
      return "Global load balancers, CDP solutions, site reliability platforms, chaos engineering tools";
    default:
      return "Standard availability tools";
  }
}

/**
 * Gets default configurations for a CIA component at a specific security level
 *
 * @param component - The CIA component
 * @param level - The security level
 * @returns Default configurations description
 */
export function getDefaultConfigurations(
  component: string,
  level: SecurityLevel
): string {
  if (component === "confidentiality") {
    switch (level) {
      case "None":
        return "No specific configurations";
      case "Low":
        return "Password complexity rules, basic session timeouts";
      case "Moderate":
        return "RBAC policies, TLS 1.2+, encryption keys rotation every 180 days";
      case "High":
        return "MFA required, encryption key rotation every 90 days, privileged access controls";
      case "Very High":
        return "Zero-trust policies, HSM-managed keys, continuous authentication, behavioral monitoring";
      default:
        return "Standard security configurations";
    }
  }

  if (component === "integrity") {
    switch (level) {
      case "None":
        return "No specific configurations";
      case "Low":
        return "Basic input validation rules, error logging";
      case "Moderate":
        return "Comprehensive validation rules, checksums for critical data, change logs";
      case "High":
        return "Digital signature verification, cryptographic hashing, immutable audit logs";
      case "Very High":
        return "Blockchain consensus rules, formal verification policies, hardware integrity checks";
      default:
        return "Standard integrity configurations";
    }
  }

  // Default to availability
  switch (level) {
    case "None":
      return "No specific configurations";
    case "Low":
      return "Basic monitoring alerts, manual backup schedules";
    case "Moderate":
      return "Load balancer rules, daily backups, health check intervals";
    case "High":
      return "Automatic failover policies, real-time replication, RPO < 1 hour";
    case "Very High":
      return "Multi-site active-active configuration, continuous replication, RPO near-zero, RTO < 5 minutes";
    default:
      return "Standard availability configurations";
  }
}

/**
 * Gets default expertise requirements for a CIA component at a specific security level
 *
 * @param component - The CIA component
 * @param level - The security level
 * @returns Array of default expertise requirements
 */
export function getDefaultExpertise(
  component: string,
  level: SecurityLevel
): string[] {
  if (component === "confidentiality") {
    switch (level) {
      case "None":
        return ["No specific expertise required"];
      case "Low":
        return ["Basic security knowledge", "Access control fundamentals"];
      case "Moderate":
        return [
          "Identity management",
          "Encryption technologies",
          "Authentication systems",
        ];
      case "High":
        return [
          "Advanced cryptography",
          "Identity and access management",
          "Security architecture",
          "Data protection",
        ];
      case "Very High":
        return [
          "Security architecture",
          "Advanced cryptography",
          "Zero-trust implementation",
          "Data protection specialization",
          "Hardware security",
        ];
      default:
        return ["General security knowledge"];
    }
  }

  if (component === "integrity") {
    switch (level) {
      case "None":
        return ["No specific expertise required"];
      case "Low":
        return ["Basic data validation", "Error handling"];
      case "Moderate":
        return [
          "Data validation techniques",
          "Database integrity",
          "Error handling",
        ];
      case "High":
        return [
          "Cryptographic verification",
          "Digital signatures",
          "Secure logging",
          "Change management",
        ];
      case "Very High":
        return [
          "Advanced cryptography",
          "Formal verification",
          "Distributed ledger technologies",
          "Immutable logging systems",
        ];
      default:
        return ["Data integrity fundamentals"];
    }
  }

  // Default to availability expertise
  switch (level) {
    case "None":
      return ["No specific expertise required"];
    case "Low":
      return ["Basic system monitoring", "Manual recovery procedures"];
    case "Moderate":
      return ["System redundancy", "Backup management", "Basic load balancing"];
    case "High":
      return [
        "High availability architecture",
        "Disaster recovery",
        "Advanced monitoring",
        "Automated failover",
      ];
    case "Very High":
      return [
        "Distributed systems",
        "Site reliability engineering",
        "Global load balancing",
        "Chaos engineering",
        "Real-time recovery systems",
      ];
    default:
      return ["System reliability fundamentals"];
  }
}
