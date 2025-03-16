import React, { useMemo, useState } from "react";
import { RESOURCE_TEST_IDS } from "../../constants/testIds";
import { SecurityLevel } from "../../types/cia";
import StatusBadge from "../common/StatusBadge";
import WidgetContainer from "../common/WidgetContainer";

/**
 * Props for SecurityResourcesWidget component
 */
export interface SecurityResourcesWidgetProps {
  securityLevel: SecurityLevel;
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  className?: string;
  testId?: string;
}

type ResourceCategory = "standard" | "regulation" | "best-practice" | "tool";

interface Resource {
  title: string;
  description: string;
  link: string;
  category: ResourceCategory;
  tags: string[];
  requiredLevel?: SecurityLevel;
}

/**
 * SecurityResourcesWidget displays security resources, standards, and best practices
 *
 * ## Business Perspective
 *
 * This widget helps organizations identify relevant security frameworks,
 * standards, and tools that align with their selected security levels.
 * By providing curated resources, it assists security teams in implementing
 * appropriate controls and following industry best practices. 📚
 *
 * The categorized resources enable organizations to efficiently navigate
 * complex security requirements and find the information they need for
 * effective security program development. 🔍
 */
const SecurityResourcesWidget: React.FC<SecurityResourcesWidgetProps> = ({
  securityLevel,
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  className = "",
  testId = RESOURCE_TEST_IDS.SECURITY_RESOURCES_WIDGET,
}) => {
  // State for filtering and search
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    ResourceCategory | "all"
  >("all");

  // Determine the highest selected level to filter relevant resources
  const highestLevel = useMemo(() => {
    const levels: Record<SecurityLevel, number> = {
      None: 0,
      Low: 1,
      Moderate: 2,
      High: 3,
      "Very High": 4,
    };

    const availabilityValue = levels[availabilityLevel] || 0;
    const integrityValue = levels[integrityLevel] || 0;
    const confidentialityValue = levels[confidentialityLevel] || 0;

    const maxValue = Math.max(
      availabilityValue,
      integrityValue,
      confidentialityValue
    );

    return Object.keys(levels).find(
      (key) => levels[key as SecurityLevel] === maxValue
    ) as SecurityLevel;
  }, [availabilityLevel, integrityLevel, confidentialityLevel]);

  // Security resources data - could be moved to a service
  const resources: Resource[] = [
    {
      title: "NIST 800-53 Rev. 5",
      description:
        "Security and Privacy Controls for Information Systems and Organizations",
      link: "https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final",
      category: "standard",
      tags: ["government", "compliance", "controls"],
      requiredLevel: "Moderate",
    },
    {
      title: "ISO/IEC 27001:2022",
      description: "Information security management systems - Requirements",
      link: "https://www.iso.org/standard/27001",
      category: "standard",
      tags: ["international", "management", "certification"],
      requiredLevel: "Moderate",
    },
    {
      title: "OWASP Top 10",
      description:
        "The standard awareness document for developers about the most critical security risks to web applications",
      link: "https://owasp.org/www-project-top-ten/",
      category: "best-practice",
      tags: ["web", "development", "vulnerabilities"],
      requiredLevel: "Low",
    },
    {
      title: "CIS Controls v8",
      description:
        "Prescriptive, prioritized, and simplified set of cybersecurity best practices",
      link: "https://www.cisecurity.org/controls/cis-controls-list",
      category: "best-practice",
      tags: ["implementation", "prioritization", "controls"],
      requiredLevel: "Moderate",
    },
    {
      title: "GDPR",
      description:
        "General Data Protection Regulation - EU data protection and privacy regulation",
      link: "https://gdpr.eu/",
      category: "regulation",
      tags: ["privacy", "EU", "data-protection"],
      requiredLevel: "Moderate",
    },
    {
      title: "HIPAA",
      description:
        "Health Insurance Portability and Accountability Act - US healthcare data privacy",
      link: "https://www.hhs.gov/hipaa/index.html",
      category: "regulation",
      tags: ["healthcare", "US", "privacy"],
      requiredLevel: "High",
    },
    {
      title: "NIST Cybersecurity Framework 2.0",
      description:
        "Framework for improving critical infrastructure cybersecurity",
      link: "https://www.nist.gov/cyberframework",
      category: "standard",
      tags: ["risk-management", "critical-infrastructure"],
      requiredLevel: "Moderate",
    },
    {
      title: "OWASP ASVS",
      description:
        "Application Security Verification Standard - requirements for secure development",
      link: "https://owasp.org/www-project-application-security-verification-standard/",
      category: "best-practice",
      tags: ["application-security", "verification", "requirements"],
      requiredLevel: "High",
    },
    {
      title: "SOC 2",
      description:
        "Service Organization Control 2 - trust services criteria for security, availability, processing integrity, confidentiality, and privacy",
      link: "https://www.aicpa.org/interestareas/frc/assuranceadvisoryservices/aicpasoc2report.html",
      category: "standard",
      tags: ["service-providers", "audit", "trust"],
      requiredLevel: "High",
    },
    {
      title: "OWASP ZAP",
      description: "Open source web application security scanner",
      link: "https://www.zaproxy.org/",
      category: "tool",
      tags: ["scanner", "open-source", "web"],
      requiredLevel: "Low",
    },
    {
      title: "NIST Secure Software Development Framework (SSDF)",
      description: "Recommended secure software development practices",
      link: "https://csrc.nist.gov/Projects/ssdf",
      category: "best-practice",
      tags: ["sdlc", "secure-development"],
      requiredLevel: "Moderate",
    },
    {
      title: "PCI DSS",
      description:
        "Payment Card Industry Data Security Standard - security standard for organizations handling credit cards",
      link: "https://www.pcisecuritystandards.org/",
      category: "regulation",
      tags: ["payment", "finance", "compliance"],
      requiredLevel: "High",
    },
  ];

  // Filter resources based on selected security level, category, and search term
  const filteredResources = useMemo(() => {
    const levels: Record<SecurityLevel, number> = {
      None: 0,
      Low: 1,
      Moderate: 2,
      High: 3,
      "Very High": 4,
    };

    const highestLevelValue = levels[highestLevel];

    return resources.filter((resource) => {
      // Filter by security level - show resource if it's required level is equal or below user's highest selected level
      const resourceLevelValue = resource.requiredLevel
        ? levels[resource.requiredLevel]
        : 0;

      if (resourceLevelValue > highestLevelValue) {
        return false;
      }

      // Filter by category if selected
      if (
        selectedCategory !== "all" &&
        resource.category !== selectedCategory
      ) {
        return false;
      }

      // Filter by search term
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          resource.title.toLowerCase().includes(searchLower) ||
          resource.description.toLowerCase().includes(searchLower) ||
          resource.tags.some((tag) => tag.toLowerCase().includes(searchLower))
        );
      }

      return true;
    });
  }, [resources, highestLevel, selectedCategory, searchTerm]);

  // Get category counts for filter badges
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: 0 };

    filteredResources.forEach((resource) => {
      counts.all = (counts.all || 0) + 1;
      counts[resource.category] = (counts[resource.category] || 0) + 1;
    });

    return counts;
  }, [filteredResources]);

  // Category display names
  const categoryLabels: Record<ResourceCategory | "all", string> = {
    all: "All Resources",
    standard: "Standards & Frameworks",
    regulation: "Regulations & Compliance",
    "best-practice": "Best Practices",
    tool: "Tools & Software",
  };

  return (
    <WidgetContainer
      title="Security Resources"
      icon="📚"
      className={className}
      testId={testId}
    >
      <div className="space-y-6">
        {/* Current Security Level Summary */}
        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
          <h4 className="text-sm font-medium mb-2">Recommended For</h4>
          <div className="flex flex-wrap gap-2">
            <StatusBadge status="info" size="sm">
              Availability: {availabilityLevel}
            </StatusBadge>
            <StatusBadge status="success" size="sm">
              Integrity: {integrityLevel}
            </StatusBadge>
            <StatusBadge status="purple" size="sm">
              Confidentiality: {confidentialityLevel}
            </StatusBadge>
          </div>
        </div>

        {/* Search Input */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            data-testid={RESOURCE_TEST_IDS.RESOURCE_SEARCH}
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(categoryLabels).map(([category, label]) => (
            <button
              key={category}
              onClick={() =>
                setSelectedCategory(category as ResourceCategory | "all")
              }
              className={`px-3 py-1 text-xs rounded-full ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
              data-testid={`${RESOURCE_TEST_IDS.RESOURCE_CATEGORY_FILTER}-${category}`}
            >
              {label} ({categoryCounts[category] || 0})
            </button>
          ))}
        </div>

        {/* Resource Cards */}
        {filteredResources.length > 0 ? (
          <div
            className="space-y-4"
            data-testid={RESOURCE_TEST_IDS.RESOURCE_LIST}
          >
            {filteredResources.map((resource, index) => (
              <div
                key={index}
                className="resource-card p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                data-testid={`${RESOURCE_TEST_IDS.RESOURCE_ITEM}-${index}`}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                  <h4 className="font-medium mb-1">
                    <a
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                      data-testid={`${RESOURCE_TEST_IDS.RESOURCE_LINK}-${index}`}
                    >
                      {resource.title}
                    </a>
                  </h4>

                  <div className="text-xs text-gray-500 dark:text-gray-400 sm:ml-2">
                    {resource.requiredLevel && (
                      <span className="resource-tag inline-block rounded-full px-2 py-1 mr-1">
                        Required: {resource.requiredLevel}+
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {resource.description}
                </p>

                <div className="flex flex-wrap gap-1 mt-2">
                  {resource.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="inline-block bg-gray-100 dark:bg-gray-700 rounded-full px-2 py-1 text-xs text-gray-600 dark:text-gray-300"
                    >
                      #{tag}
                    </span>
                  ))}

                  <span
                    className={`ml-auto inline-block rounded-full px-2 py-1 text-xs ${
                      resource.category === "standard"
                        ? "bg-blue-100 dark:bg-blue-900 dark:bg-opacity-20 text-blue-800 dark:text-blue-200"
                        : resource.category === "regulation"
                        ? "bg-purple-100 dark:bg-purple-900 dark:bg-opacity-20 text-purple-800 dark:text-purple-200"
                        : resource.category === "best-practice"
                        ? "bg-green-100 dark:bg-green-900 dark:bg-opacity-20 text-green-800 dark:text-green-200"
                        : "bg-yellow-100 dark:bg-yellow-900 dark:bg-opacity-20 text-yellow-800 dark:text-yellow-200"
                    }`}
                  >
                    {categoryLabels[resource.category]
                      .replace(" & Software", "")
                      .replace(" & Frameworks", "")
                      .replace(" & Compliance", "")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No resources match your search criteria.
          </div>
        )}

        {/* Resource Footnote */}
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-4">
          <p>
            Note: Resources are recommended based on your selected security
            levels. Higher security levels include more comprehensive resources.
          </p>
        </div>
      </div>
    </WidgetContainer>
  );
};

export default SecurityResourcesWidget;
