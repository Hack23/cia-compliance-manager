import { SecurityLevel } from "../types/cia";

/**
 * Resource type constants for security resources
 */

/**
 * Types of security resources
 */
export const RESOURCE_TYPES = {
  ARTICLE: "article",
  TOOL: "tool",
  VIDEO: "video",
  DOCUMENTATION: "documentation",
  WHITEPAPER: "whitepaper",
  STANDARD: "standard",
  FRAMEWORK: "framework",
  TEMPLATE: "template",
  CHECKLIST: "checklist",
  TRAINING: "training",
  WEBINAR: "webinar",
  BOOK: "book",
  GUIDE: "guide",
};

/**
 * Display names for resource types
 */
export const RESOURCE_TYPE_NAMES: Record<string, string> = {
  [RESOURCE_TYPES.ARTICLE]: "Article",
  [RESOURCE_TYPES.TOOL]: "Tool",
  [RESOURCE_TYPES.VIDEO]: "Video",
  [RESOURCE_TYPES.DOCUMENTATION]: "Documentation",
  [RESOURCE_TYPES.WHITEPAPER]: "Whitepaper",
  [RESOURCE_TYPES.STANDARD]: "Standard",
  [RESOURCE_TYPES.FRAMEWORK]: "Framework",
  [RESOURCE_TYPES.TEMPLATE]: "Template",
  [RESOURCE_TYPES.CHECKLIST]: "Checklist",
  [RESOURCE_TYPES.TRAINING]: "Training",
  [RESOURCE_TYPES.WEBINAR]: "Webinar",
  [RESOURCE_TYPES.BOOK]: "Book",
  [RESOURCE_TYPES.GUIDE]: "Guide",
};

/**
 * Icons for resource types
 */
export const RESOURCE_TYPE_ICONS: Record<string, string> = {
  [RESOURCE_TYPES.ARTICLE]: "📄",
  [RESOURCE_TYPES.TOOL]: "🔧",
  [RESOURCE_TYPES.VIDEO]: "🎥",
  [RESOURCE_TYPES.DOCUMENTATION]: "📚",
  [RESOURCE_TYPES.WHITEPAPER]: "📑",
  [RESOURCE_TYPES.STANDARD]: "📏",
  [RESOURCE_TYPES.FRAMEWORK]: "🏗️",
  [RESOURCE_TYPES.TEMPLATE]: "📝",
  [RESOURCE_TYPES.CHECKLIST]: "✅",
  [RESOURCE_TYPES.TRAINING]: "🎓",
  [RESOURCE_TYPES.WEBINAR]: "💻",
  [RESOURCE_TYPES.BOOK]: "📕",
  [RESOURCE_TYPES.GUIDE]: "📋",
};

/**
 * Resource categories
 */
export const RESOURCE_CATEGORIES = {
  IMPLEMENTATION: "implementation",
  COMPLIANCE: "compliance",
  EDUCATION: "education",
  REFERENCE: "reference",
  ASSESSMENT: "assessment",
  BEST_PRACTICE: "best-practice",
};

/**
 * Display names for resource categories
 */
export const RESOURCE_CATEGORY_NAMES: Record<string, string> = {
  [RESOURCE_CATEGORIES.IMPLEMENTATION]: "Implementation",
  [RESOURCE_CATEGORIES.COMPLIANCE]: "Compliance",
  [RESOURCE_CATEGORIES.EDUCATION]: "Education",
  [RESOURCE_CATEGORIES.REFERENCE]: "Reference",
  [RESOURCE_CATEGORIES.ASSESSMENT]: "Assessment",
  [RESOURCE_CATEGORIES.BEST_PRACTICE]: "Best Practice",
};

/**
 * Common resource tags
 */
export const COMMON_RESOURCE_TAGS = [
  "availability",
  "integrity",
  "confidentiality",
  "disaster recovery",
  "backup",
  "encryption",
  "authentication",
  "authorization",
  "monitoring",
  "logging",
  "auditing",
  "risk assessment",
  "compliance",
  "governance",
  "security policy",
  "security control",
  "security framework",
  "security standard",
  "business continuity",
  "incident response",
  "penetration testing",
  "vulnerability assessment",
  "security awareness",
  "security training",
  "security architecture",
  "security design",
  "security implementation",
  "security operations",
  "cloud security",
  "network security",
  "application security",
  "data security",
  "physical security",
  "identity management",
  "access control",
];

/**
 * Resource filter options for UI display
 */
export const RESOURCE_FILTER_OPTIONS = {
  COMPONENT: [
    { value: "availability", label: "Availability" },
    { value: "integrity", label: "Integrity" },
    { value: "confidentiality", label: "Confidentiality" },
  ],
  SECURITY_LEVEL: [
    { value: "None", label: "None" },
    { value: "Low", label: "Low" },
    { value: "Moderate", label: "Moderate" },
    { value: "High", label: "High" },
    { value: "Very High", label: "Very High" },
  ],
  TYPE: Object.entries(RESOURCE_TYPE_NAMES).map(([value, label]) => ({
    value,
    label,
  })),
  CATEGORY: Object.entries(RESOURCE_CATEGORY_NAMES).map(([value, label]) => ({
    value,
    label,
  })),
};

export interface SecurityResource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: "availability" | "integrity" | "confidentiality" | "general";
  relevantLevels?: SecurityLevel[];
  tags?: string[];
  priority?: number;
}

export const SECURITY_RESOURCES: SecurityResource[] = [
  {
    id: "nist-sp-800-53",
    title: "NIST SP 800-53",
    description:
      "Security and Privacy Controls for Information Systems and Organizations",
    url: "https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final",
    type: "general",
    tags: ["compliance", "controls", "federal"],
    priority: 10,
  },
  {
    id: "iso-27001",
    title: "ISO 27001",
    description: "Information Security Management System Standard",
    url: "https://www.iso.org/isoiec-27001-information-security.html",
    type: "general",
    tags: ["compliance", "management", "international"],
    priority: 9,
  },
  {
    id: "cis-controls",
    title: "CIS Controls",
    description: "Center for Internet Security Controls",
    url: "https://www.cisecurity.org/controls/",
    type: "general",
    tags: ["controls", "best practices"],
    priority: 8,
  },
  {
    id: "availability-high",
    title: "High Availability Design Patterns",
    description: "Design patterns for implementing high availability systems",
    url: "https://docs.microsoft.com/en-us/azure/architecture/framework/resiliency/reliability-patterns",
    type: "availability",
    relevantLevels: ["High", "Very High"],
    tags: ["architecture", "design"],
    priority: 7,
  },
  {
    id: "integrity-cryptography",
    title: "Cryptographic Integrity Controls",
    description: "Implementing cryptographic controls for data integrity",
    url: "https://csrc.nist.gov/publications/detail/sp/800-57-part-1/rev-5/final",
    type: "integrity",
    relevantLevels: ["High", "Very High"],
    tags: ["cryptography", "data protection"],
    priority: 6,
  },
  {
    id: "confidentiality-encryption",
    title: "Data Encryption Best Practices",
    description: "Implementing encryption for data confidentiality",
    url: "https://www.nist.gov/publications/guide-storage-encryption-technologies-end-user-devices",
    type: "confidentiality",
    relevantLevels: ["Moderate", "High", "Very High"],
    tags: ["encryption", "data protection"],
    priority: 5,
  },
];
