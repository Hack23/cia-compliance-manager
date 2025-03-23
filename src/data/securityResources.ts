import { SecurityResource } from "../types/securityResources";

/**
 * Sample security resources for development and testing
 */
const securityResources: SecurityResource[] = [
  {
    id: "resource-1",
    title: "NIST Cybersecurity Framework",
    description:
      "A set of guidelines for mitigating organizational cybersecurity risks",
    url: "https://www.nist.gov/cyberframework",
    type: "general",
    relevantLevels: ["Moderate", "High", "Very High"],
    components: ["availability", "integrity", "confidentiality"],
    tags: ["framework", "best_practices", "standards"],
    category: "frameworks",
    source: "NIST",
  },
  {
    id: "resource-2",
    title: "OWASP Top 10",
    description:
      "Standard awareness document for developers about the most critical security risks to web applications",
    url: "https://owasp.org/www-project-top-ten/",
    type: "integrity",
    relevantLevels: ["Low", "Moderate", "High"],
    components: ["integrity"],
    tags: ["web", "vulnerabilities", "security_testing"],
    category: "best_practices",
    source: "OWASP",
  },
  {
    id: "resource-3",
    title: "AWS Well-Architected Framework",
    description:
      "Helps cloud architects build secure, high-performing, resilient, and efficient infrastructure",
    url: "https://aws.amazon.com/architecture/well-architected/",
    type: "availability",
    relevantLevels: ["Moderate", "High", "Very High"],
    components: ["availability"],
    tags: ["cloud", "architecture", "resilience"],
    category: "best_practices",
    source: "AWS",
  },
  {
    id: "resource-4",
    title: "Data Encryption Standard",
    description:
      "Standards and guidelines for implementing encryption to protect sensitive data",
    url: "https://csrc.nist.gov/publications/detail/fips/140/3/final",
    type: "confidentiality",
    relevantLevels: ["High", "Very High"],
    components: ["confidentiality"],
    tags: ["encryption", "data_protection", "standards"],
    category: "standards",
    source: "NIST",
  },
  {
    id: "resource-5",
    title: "CIS Benchmarks",
    description:
      "Best practices for secure configuration of technology systems",
    url: "https://www.cisecurity.org/cis-benchmarks/",
    type: "general",
    relevantLevels: ["Low", "Moderate", "High", "Very High"],
    components: ["integrity", "confidentiality"],
    tags: ["configuration", "benchmarks", "hardening"],
    category: "standards",
    source: "CIS",
  },
];

export default securityResources;
