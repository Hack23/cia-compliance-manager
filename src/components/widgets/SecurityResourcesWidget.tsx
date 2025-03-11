import React, { useState, useEffect, useMemo } from "react";
import { SecurityLevel } from "../../types/cia";
import WidgetContainer from "../common/WidgetContainer";
import ciaContentService from "../../services/ciaContentService";
import type { SecurityResource } from "../../services/ciaContentService";
import { SECURITY_RESOURCES_TEST_IDS } from "../../constants/testIds";

/**
 * Props for SecurityResourcesWidget component
 */
export interface SecurityResourcesWidgetProps {
  securityLevel: SecurityLevel;
  availabilityLevel?: SecurityLevel;
  integrityLevel?: SecurityLevel;
  confidentialityLevel?: SecurityLevel;
  className?: string;
  testId?: string;
}

/**
 * Widget that displays security resources based on security levels
 */
const SecurityResourcesWidget: React.FC<SecurityResourcesWidgetProps> = ({
  securityLevel,
  availabilityLevel = "None",
  integrityLevel = "None",
  confidentialityLevel = "None",
  className = "",
  testId = SECURITY_RESOURCES_TEST_IDS.SECURITY_RESOURCES_PREFIX,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Fetch resources based on security levels
  const allResources = useMemo(() => {
    return ciaContentService.getSecurityResources(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel,
      securityLevel
    );
  }, [availabilityLevel, integrityLevel, confidentialityLevel, securityLevel]);

  // Get unique resource categories
  const uniqueCategories = useMemo(() => {
    const categoriesSet = new Set<string>();
    categoriesSet.add("All");

    allResources.forEach((resource) => {
      if (resource.category) {
        categoriesSet.add(resource.category);
      }
    });

    return Array.from(categoriesSet).sort();
  }, [allResources]);

  // Filter resources by category and search term
  const filteredResources = useMemo(() => {
    return allResources
      .filter((resource: SecurityResource) => {
        // Filter by category if not "All"
        if (
          selectedCategory !== "All" &&
          resource.category !== selectedCategory
        ) {
          return false;
        }

        // Filter by search term if provided
        if (searchTerm) {
          const searchLower = searchTerm.toLowerCase();
          return (
            resource.title.toLowerCase().includes(searchLower) ||
            resource.description.toLowerCase().includes(searchLower) ||
            resource.tags.some((tag: string) =>
              tag.toLowerCase().includes(searchLower)
            )
          );
        }

        return true;
      })
      .sort(
        (a: SecurityResource, b: SecurityResource) =>
          b.relevanceScore - a.relevanceScore
      );
  }, [allResources, selectedCategory, searchTerm]);

  // Extract unique categories from resources
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    allResources.forEach((resource: SecurityResource) =>
      uniqueCategories.add(resource.category)
    );
    return ["All", ...Array.from(uniqueCategories).sort()];
  }, [allResources]);

  return (
    <WidgetContainer
      title="Security Resources"
      icon="📚"
      className={className}
      testId={testId}
    >
      <div className="mb-4 flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
        {/* Search box */}
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search resources..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Category filter */}
        <select
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Resources list */}
      <ul
        className="space-y-4"
        data-testid={SECURITY_RESOURCES_TEST_IDS.RESOURCE_LIST}
      >
        {filteredResources.length === 0 ? (
          <li className="text-center py-4 text-gray-500 dark:text-gray-400">
            No resources found. Try adjusting your filters.
          </li>
        ) : (
          filteredResources.map((resource: SecurityResource, index: number) => (
            <li
              key={index}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              data-testid={`${SECURITY_RESOURCES_TEST_IDS.RESOURCE_ITEM}-${index}`}
            >
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div>
                  <h3 className="text-md font-medium text-blue-600 dark:text-blue-400">
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {resource.title}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {resource.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {resource.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-2 sm:mt-0 flex flex-col items-start sm:items-end">
                  <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                    {resource.category}
                  </span>
                  <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {resource.type}
                  </span>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </WidgetContainer>
  );
};

export default SecurityResourcesWidget;
