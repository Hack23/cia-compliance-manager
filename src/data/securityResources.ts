import { SecurityResource } from "../types/securityResources";

/**
 * Security resources for development and production use
 */
const securityResources: SecurityResource[] = [
  {
    id: "resource-1",
    title: "NIST Cybersecurity Framework",
    description:
      "A set of guidelines for mitigating organizational cybersecurity risks",
    url: "https://www.nist.gov/cyberframework",
    type: "general",
    securityLevels: ["Moderate", "High", "Very High"],
    components: ["availability", "integrity", "confidentiality"],
    tags: ["framework", "best_practices", "standards"],
    source: "NIST",
  },
  {
    id: "resource-2",
    title: "OWASP Top 10",
    description:
      "Standard awareness document for developers about the most critical security risks to web applications",
    url: "https://owasp.org/www-project-top-ten/",
    type: "integrity",
    securityLevels: ["Low", "Moderate", "High"],
    components: ["integrity"],
    tags: ["web", "vulnerabilities", "security_testing"],
    source: "OWASP",
  },
  {
    id: "resource-3",
    title: "AWS Well-Architected Framework",
    description:
      "Helps cloud architects build secure, high-performing, resilient, and efficient infrastructure",
    url: "https://aws.amazon.com/architecture/well-architected/",
    type: "availability",
    securityLevels: ["Moderate", "High", "Very High"],
    components: ["availability"],
    tags: ["cloud", "architecture", "resilience"],
    source: "AWS",
  },
  {
    id: "resource-4",
    title: "Data Encryption Standard",
    description:
      "Standards and guidelines for implementing encryption to protect sensitive data",
    url: "https://csrc.nist.gov/publications/detail/fips/140/3/final",
    type: "confidentiality",
    securityLevels: ["High", "Very High"],
    components: ["confidentiality"],
    tags: ["encryption", "data_protection", "standards"],
    source: "NIST",
  },
  {
    id: "resource-5",
    title: "CIS Benchmarks",
    description:
      "Best practices for secure configuration of technology systems",
    url: "https://www.cisecurity.org/cis-benchmarks/",
    type: "general",
    securityLevels: ["Low", "Moderate", "High", "Very High"],
    components: ["integrity", "confidentiality"],
    tags: ["configuration", "benchmarks", "hardening"],
    source: "CIS",
  },
  {
    id: "resource-6",
    title: "AWS Security Hub",
    description:
      "Centralized security tool to manage security alerts and automate compliance checks across AWS accounts",
    url: "https://aws.amazon.com/security-hub/",
    type: "general",
    securityLevels: ["High", "Very High"],
    components: ["availability", "integrity", "confidentiality"],
    tags: ["cloud", "monitoring", "automation"],
    source: "AWS",
    priority: 3,
  },
  {
    id: "resource-7",
    title: "Zero Trust Architecture Guide",
    description:
      "NIST guide for implementing a zero trust architecture in enterprise environments",
    url: "https://www.nist.gov/publications/zero-trust-architecture",
    type: "confidentiality",
    securityLevels: ["High", "Very High"],
    components: ["confidentiality"],
    tags: ["zero_trust", "architecture", "access_control"],
    source: "NIST",
    priority: 2,
  },
  {
    id: "resource-8",
    title: "SANS CIS Controls Implementation Guide",
    description:
      "Practical guide to implementing the top 20 Critical Security Controls",
    url: "https://www.sans.org/blog/cis-controls-v8/",
    type: "general",
    securityLevels: ["Low", "Moderate", "High"],
    components: ["availability", "integrity", "confidentiality"],
    tags: ["implementation", "baseline", "best_practices"],
    source: "SANS Institute",
    priority: 4,
  },
  {
    id: "resource-9",
    title: "HashiCorp Vault",
    description:
      "Secrets management and data protection with identity-based access",
    url: "https://www.vaultproject.io/",
    type: "confidentiality",
    securityLevels: ["Moderate", "High", "Very High"],
    components: ["confidentiality", "integrity"],
    tags: ["secrets_management", "encryption", "access_control"],
    source: "HashiCorp",
    priority: 3,
  },
  {
    id: "resource-10",
    title: "DDoS Protection Best Practices",
    description:
      "Guidelines for protecting systems against distributed denial-of-service attacks",
    url: "https://www.cisa.gov/sites/default/files/publications/DDoS%20Quick%20Guide.pdf",
    type: "availability",
    securityLevels: ["Moderate", "High"],
    components: ["availability"],
    tags: ["ddos", "resilience", "mitigation"],
    source: "CISA",
    priority: 2,
  },
  {
    id: "resource-11",
    title: "OWASP API Security Top 10",
    description: "Top 10 API security vulnerabilities and how to mitigate them",
    url: "https://owasp.org/www-project-api-security/",
    type: "integrity",
    securityLevels: ["Moderate", "High"],
    components: ["integrity", "confidentiality"],
    tags: ["api", "web_security", "vulnerabilities"],
    source: "OWASP",
    priority: 3,
  },
  {
    id: "resource-12",
    title: "Microsoft Security Development Lifecycle",
    description: "Industry-leading software security assurance process",
    url: "https://www.microsoft.com/en-us/securityengineering/sdl/",
    type: "integrity",
    securityLevels: ["Moderate", "High", "Very High"],
    components: ["integrity"],
    tags: ["sdlc", "secure_coding", "development"],
    source: "Microsoft",
    priority: 2,
  },
  {
    id: "resource-13",
    title: "Google SRE Book",
    description:
      "Site Reliability Engineering: How Google Runs Production Systems",
    url: "https://sre.google/sre-book/table-of-contents/",
    type: "availability",
    securityLevels: ["High", "Very High"],
    components: ["availability"],
    tags: ["sre", "reliability", "operations"],
    source: "Google",
    priority: 3,
  },
  {
    id: "resource-14",
    title: "ENISA Threat Landscape",
    description:
      "European Union Agency for Cybersecurity's comprehensive threat landscape report",
    url: "https://www.enisa.europa.eu/topics/threat-risk-management/threats-and-trends",
    type: "general",
    securityLevels: ["Moderate", "High", "Very High"],
    components: ["availability", "integrity", "confidentiality"],
    tags: ["threat_intelligence", "risk_assessment", "planning"],
    source: "ENISA",
    priority: 2,
  },
  {
    id: "resource-15",
    title: "Snyk",
    description:
      "Developer security platform to find and fix vulnerabilities in code, dependencies, containers, and IaC",
    url: "https://snyk.io/",
    type: "integrity",
    securityLevels: ["Moderate", "High"],
    components: ["integrity"],
    tags: ["dependency_scanning", "vulnerability_management", "devops"],
    source: "Snyk",
    priority: 4,
  },
];

/**
 * Sample security resources for development and testing
 */
const securityResourcesData: SecurityResource[] = [
  // Availability Resources
  {
    id: "avail-1",
    title: "High Availability Architecture Patterns",
    description:
      "Best practices for designing highly available system architectures with redundancy and failover capabilities.",
    url: "https://example.com/high-availability-patterns",
    type: "Documentation",
    source: "Cloud Security Alliance",
    tags: ["architecture", "redundancy", "failover", "cloud"],
    components: ["availability"],
    securityLevels: ["High", "Very High"],
    format: "PDF",
    complexity: 3,
  },
  {
    id: "avail-2",
    title: "Disaster Recovery Planning Template",
    description:
      "A comprehensive template for creating disaster recovery plans with RTO and RPO considerations.",
    url: "https://example.com/dr-template",
    type: "Template",
    source: "NIST",
    tags: ["disaster recovery", "planning", "business continuity"],
    components: ["availability"],
    securityLevels: ["Moderate", "High", "Very High"],
    format: "Document",
    complexity: 2,
  },
  {
    id: "avail-3",
    title: "Load Balancing Implementation Guide",
    description:
      "Step-by-step instructions for implementing load balancing across multiple servers.",
    url: "https://example.com/load-balancing",
    type: "Guide",
    source: "AWS",
    tags: ["load balancing", "scalability", "performance"],
    components: ["availability"],
    securityLevels: ["Moderate", "High"],
    format: "Website",
    complexity: 3,
  },
  // Integrity Resources
  {
    id: "integ-1",
    title: "Data Integrity Validation Framework",
    description:
      "A framework for implementing data validation, checksums, and cryptographic verification.",
    url: "https://example.com/data-integrity",
    type: "Documentation",
    source: "OWASP",
    tags: ["data validation", "checksums", "cryptography"],
    components: ["integrity"],
    securityLevels: ["Moderate", "High", "Very High"],
    format: "PDF",
    complexity: 4,
  },
  {
    id: "integ-2",
    title: "Database Transaction Integrity Course",
    description:
      "Online course on ensuring database transaction integrity and ACID compliance.",
    url: "https://example.com/database-integrity",
    type: "Training",
    source: "Database Security Consortium",
    tags: ["database", "transactions", "ACID"],
    components: ["integrity"],
    securityLevels: ["Moderate", "High"],
    format: "Video",
    isPremium: true,
    complexity: 3,
  },
  {
    id: "integ-3",
    title: "SHA-256 Hash Verification Tool",
    description:
      "Tool for generating and verifying SHA-256 hashes to ensure file integrity.",
    url: "https://example.com/hash-tool",
    type: "Tool",
    source: "Security Tools Foundation",
    tags: ["hash", "verification", "SHA-256"],
    components: ["integrity"],
    securityLevels: ["Low", "Moderate", "High"],
    format: "Software",
    complexity: 1,
  },
  // Confidentiality Resources
  {
    id: "conf-1",
    title: "Data Classification Policy Template",
    description:
      "Template for creating a comprehensive data classification policy for your organization.",
    url: "https://example.com/data-classification",
    type: "Template",
    source: "ISO 27001",
    tags: ["data classification", "policy", "compliance"],
    components: ["confidentiality"],
    securityLevels: ["Low", "Moderate", "High", "Very High"],
    format: "Document",
    complexity: 2,
  },
  {
    id: "conf-2",
    title: "Encryption Implementation Guide",
    description:
      "Detailed guide on implementing encryption at rest and in transit.",
    url: "https://example.com/encryption-guide",
    type: "Guide",
    source: "NIST",
    tags: ["encryption", "cryptography", "data protection"],
    components: ["confidentiality"],
    securityLevels: ["Moderate", "High", "Very High"],
    format: "PDF",
    complexity: 4,
  },
  {
    id: "conf-3",
    title: "Access Control Models Comparison",
    description:
      "Comparison of different access control models (RBAC, ABAC, DAC, MAC) with implementation considerations.",
    url: "https://example.com/access-control",
    type: "Documentation",
    source: "Security Patterns Institute",
    tags: ["access control", "RBAC", "authorization"],
    components: ["confidentiality"],
    securityLevels: ["Moderate", "High"],
    format: "Website",
    complexity: 3,
  },
  // Multi-component Resources
  {
    id: "multi-1",
    title: "NIST Cybersecurity Framework Implementation Guide",
    description:
      "Comprehensive guide to implementing the NIST Cybersecurity Framework across your organization.",
    url: "https://example.com/nist-csf",
    type: "Guide",
    source: "NIST",
    tags: ["compliance", "framework", "governance"],
    components: ["availability", "integrity", "confidentiality"],
    securityLevels: ["Moderate", "High", "Very High"],
    format: "PDF",
    complexity: 4,
  },
  {
    id: "multi-2",
    title: "Security Architecture Review Checklist",
    description:
      "Checklist for reviewing security architecture across all CIA components.",
    url: "https://example.com/arch-review",
    type: "Template",
    source: "Cloud Security Alliance",
    tags: ["architecture", "assessment", "review"],
    components: ["availability", "integrity", "confidentiality"],
    securityLevels: ["High", "Very High"],
    format: "Spreadsheet",
    complexity: 3,
  },
  {
    id: "multi-3",
    title: "Security Metrics Dashboard Template",
    description:
      "Dashboard template for tracking security metrics across availability, integrity, and confidentiality.",
    url: "https://example.com/security-metrics",
    type: "Tool",
    source: "Security Measurement Consortium",
    tags: ["metrics", "dashboard", "monitoring"],
    components: ["availability", "integrity", "confidentiality"],
    securityLevels: ["Moderate", "High"],
    format: "Software",
    complexity: 2,
  },
];

// Only export one default
export { securityResources, securityResourcesData };
export default securityResources;
