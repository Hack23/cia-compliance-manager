import React, { useState, useMemo, useEffect } from "react";
import { SecurityLevel } from "../../types/cia";
import { SECURITY_RESOURCES_TEST_IDS } from "../../constants/testIds";
import ciaContentService from "../../services/ciaContentService";
import WidgetContainer from "../common/WidgetContainer";
import StatusBadge from "../common/StatusBadge";

/**
 * Props for SecurityResourcesWidget component
 */
export interface SecurityResourcesWidgetProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  securityLevel: SecurityLevel;
  className?: string;
  testId?: string;
}

/**
 * SecurityResourcesWidget displays security resources and reference materials
 * Enhanced with Ingress-style UI elements for a more immersive experience
 */
const SecurityResourcesWidget: React.FC<SecurityResourcesWidgetProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  securityLevel,
  className = "",
  testId = SECURITY_RESOURCES_TEST_IDS.SECURITY_RESOURCES_WIDGET,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Add network activity state
  const [networkActivity, setNetworkActivity] = useState(false);

  // Simulate network activity when search changes
  useEffect(() => {
    if (searchQuery.trim() !== "") {
      setNetworkActivity(true);
      const timer = setTimeout(() => {
        setNetworkActivity(false);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  // Get security resources from service
  const resources = useMemo(
    () =>
      ciaContentService.getSecurityResources(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel,
        securityLevel
      ),
    [availabilityLevel, integrityLevel, confidentialityLevel, securityLevel]
  );

  // Handle cases where data might not be available
  if (!resources || resources.length === 0) {
    return (
      <WidgetContainer
        title="Security Resources"
        icon="📚"
        className={className}
        testId={testId}
        error={new Error("Security resources not available")}
      >
        <div>Security resources not available</div>
      </WidgetContainer>
    );
  }

  // Get unique categories for filtering
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(resources.map((resource) => resource.category))
    );
    return ["all", ...uniqueCategories];
  }, [resources]);

  // Filter resources based on active category and search query
  const filteredResources = useMemo(() => {
    let filtered = resources;

    // Apply category filter
    if (activeCategory !== "all") {
      filtered = filtered.filter(
        (resource) => resource.category === activeCategory
      );
    }

    // Apply search filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (resource) =>
          resource.title.toLowerCase().includes(query) ||
          resource.description.toLowerCase().includes(query) ||
          resource.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Sort by relevance
    return filtered.sort((a, b) => b.relevanceScore - a.relevanceScore);
  }, [resources, activeCategory, searchQuery]);

  // Get relevance badge variant based on score
  const getRelevanceBadgeVariant = (score: number) => {
    if (score >= 90) return "purple";
    if (score >= 75) return "success";
    if (score >= 50) return "info";
    return "neutral";
  };

  // Get category icon
  const getCategoryIcon = (category: string) => {
    const categoryIcons: Record<string, string> = {
      Framework: "📚",
      Standard: "📏",
      Tool: "🛠️",
      "Web Security": "🌐",
      Article: "📄",
      Video: "🎥",
      Course: "🎓",
      Book: "📖",
      Resource: "📋",
      Training: "👨‍🏫",
    };

    return categoryIcons[category] || "📌";
  };

  return (
    <WidgetContainer
      title="Security Resources"
      icon="📚"
      className={className}
      testId={testId}
    >
      <div className="space-y-4">
        {/* Security Level Summary */}
        <div className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-10 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-sm font-medium mb-2 terminal-text">
            <span className="mr-1">▶</span> Selected Security Profile
          </h4>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center">
              <span className="text-xs text-gray-600 dark:text-gray-300 mr-1">
                Confidentiality:
              </span>
              <StatusBadge status="purple" size="xs">
                <span
                  className={`security-level-indicator level-${confidentialityLevel.toLowerCase()} mr-1`}
                ></span>
                {confidentialityLevel}
              </StatusBadge>
            </div>
            <div className="flex items-center">
              <span className="text-xs text-gray-600 dark:text-gray-300 mr-1">
                Integrity:
              </span>
              <StatusBadge status="success" size="xs">
                <span
                  className={`security-level-indicator level-${integrityLevel.toLowerCase()} mr-1`}
                ></span>
                {integrityLevel}
              </StatusBadge>
            </div>
            <div className="flex items-center">
              <span className="text-xs text-gray-600 dark:text-gray-300 mr-1">
                Availability:
              </span>
              <StatusBadge status="info" size="xs">
                <span
                  className={`security-level-indicator level-${availabilityLevel.toLowerCase()} mr-1`}
                ></span>
                {availabilityLevel}
              </StatusBadge>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex-grow">
            <div className="relative search-container">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search resources..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid={`${testId}-search-input`}
              />
            </div>
          </div>
          <div className="flex-shrink-0">
            <select
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              data-testid={`${testId}-category-select`}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
          <span
            className={`inline-block w-3 h-3 rounded-full mr-2 ${
              networkActivity ? "bg-green-500 pulse-dot" : "bg-gray-500"
            }`}
          ></span>
          {networkActivity
            ? "Scanning resource database..."
            : `Showing ${filteredResources.length} of ${resources.length} resources`}
          {activeCategory !== "all" && <> in {activeCategory}</>}
          {searchQuery && <> matching "{searchQuery}"</>}
        </div>

        {/* Resource Cards */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredResources.map((resource, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border shadow-sm resource-card"
                data-testid={`${testId}-resource-${index}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <span className="text-base mr-2 icon-container">
                      {getCategoryIcon(resource.category)}
                    </span>
                    <h4 className="font-medium text-blue-600 dark:text-blue-400">
                      {resource.title}
                    </h4>
                  </div>
                  <StatusBadge
                    status={getRelevanceBadgeVariant(resource.relevanceScore)}
                    size="xs"
                  >
                    {resource.category}
                  </StatusBadge>
                </div>

                <p className="text-xs text-gray-600 dark:text-gray-300 mb-3 ml-8">
                  {resource.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-3 ml-8">
                  {resource.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="inline-block px-2 py-0.5 rounded-full text-xs resource-tag"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center ml-8">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center terminal-text"
                  >
                    <span className="mr-1">▶</span>
                    <span>Access Resource</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>

                  {/* Relevance score indicator */}
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400 mr-1">
                      Relevance:
                    </span>
                    <div className="w-16 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          resource.relevanceScore >= 90
                            ? "bg-purple-500"
                            : resource.relevanceScore >= 75
                            ? "bg-green-500"
                            : resource.relevanceScore >= 50
                            ? "bg-blue-500"
                            : "bg-gray-500"
                        }`}
                        style={{ width: `${resource.relevanceScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-medium mb-2">
              No matching resources found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Try adjusting your search criteria or security levels.
            </p>
          </div>
        )}

        {/* Security Resource Note */}
        <div className="p-3 bg-gray-50 dark:bg-gray-750 rounded-md border border-gray-200 dark:border-gray-600 mt-4">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            <span className="font-medium">Note:</span> Resources are tailored to
            your selected security profile. Changing your security levels will
            update available resources.
          </p>
        </div>
      </div>
    </WidgetContainer>
  );
};

export default SecurityResourcesWidget;
