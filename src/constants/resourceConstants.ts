import { SecurityLevel } from "../types/cia";

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
