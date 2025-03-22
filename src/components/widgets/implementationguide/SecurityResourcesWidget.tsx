import React, { useMemo, useState } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { SecurityLevel } from "../../../types/cia";
import WidgetContainer from "../../common/WidgetContainer";
// ... other imports

interface SecurityResourcesWidgetProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  className?: string;
  testId?: string;
}

/**
 * Security Resources Widget provides relevant documentation and guidance
 *
 * ## Business Perspective
 *
 * This widget offers security professionals access to implementation guides,
 * best practices, and reference materials tailored to the organization's
 * specific security level selections, supporting effective security implementation. 📚
 */
const SecurityResourcesWidget: React.FC<SecurityResourcesWidgetProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  className = "",
  testId = "widget-security-resources",
}) => {
  // Search functionality
  const [searchTerm, setSearchTerm] = useState("");

  // Get relevant resources based on security levels
  const resources = useMemo(() => {
    // Implementation logic to fetch resources
    return [
      {
        id: "general-guidelines",
        title: "General Security Guidelines",
        description: `General security guidelines for ${availabilityLevel} security level`,
        tags: ["guidelines", "best practices"],
        url: "#",
      },
      // ... other resources
    ];
  }, [availabilityLevel, integrityLevel, confidentialityLevel]);

  // Filter resources based on search
  const filteredResources = useMemo(() => {
    if (!searchTerm) return resources;
    return resources.filter(
      (resource) =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
  }, [resources, searchTerm]);

  return (
    <WidgetContainer
      title={WIDGET_TITLES.SECURITY_RESOURCES}
      icon={WIDGET_ICONS.SECURITY_RESOURCES}
      className={className}
      testId={testId}
    >
      <div>
        <p className="mb-4">
          Access security implementation guides, best practices, and reference
          materials tailored to your selected security levels.
        </p>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search resources..."
            className="w-full p-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            data-testid="resource-search"
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">All Resources</h3>
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="p-3 bg-gray-50 dark:bg-gray-800 rounded border"
              data-testid={`resource-${resource.id}`}
            >
              <h4 className="font-medium">{resource.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {resource.description}
              </p>
              <div className="mt-2 space-x-2">
                {resource.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-gray-500 dark:text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-2 text-right">
                <a
                  href={resource.url}
                  className="text-sm text-blue-600 dark:text-blue-400"
                >
                  View Resource →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </WidgetContainer>
  );
};

export default SecurityResourcesWidget;
