import React, { useState, useRef } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { TECHNICAL_DETAILS_WIDGET_IDS } from "../../../constants/testIds";
import { useCIAContentService } from "../../../hooks/useCIAContentService";
import { useTechnicalDetailsData } from "../../../hooks/useTechnicalDetailsData";
import { SecurityLevel } from "../../../types/cia";
import { TechnicalDetailsWidgetProps } from "../../../types/widget-props";
import { 
  getTabAriaProps, 
  getTabPanelAriaProps, 
  handleArrowKeyNavigation,
  getWidgetAriaDescription,
  ARIA_ROLES 
} from "../../../utils/accessibility";
import { WidgetClasses, cn } from "../../../utils/tailwindClassHelpers";
import WidgetContainer from "../../common/WidgetContainer";
import WidgetErrorBoundary from "../../common/WidgetErrorBoundary";
import { CIAComponentDetails } from "./CIAComponentDetails";

/**
 * Tab configuration for CIA components
 */
const CIA_TABS = [
  { id: "confidentiality" as const, label: "Confidentiality", icon: "🔒" },
  { id: "integrity" as const, label: "Integrity", icon: "✓" },
  { id: "availability" as const, label: "Availability", icon: "⏱️" },
] as const;

/**
 * Widget that displays detailed technical implementation requirements
 *
 * ## Business Perspective
 *
 * This widget provides technical teams with specific implementation details
 * for achieving the selected security levels. It helps bridge the gap between
 * security requirements and technical implementation by providing concrete
 * guidance on controls, configurations, and technologies. 🛠️
 */
const TechnicalDetailsWidget: React.FC<TechnicalDetailsWidgetProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  className = "",
  testId = "technical-details-widget",
}) => {
  // State for active tab
  const [activeTab, setActiveTab] = useState<
    "confidentiality" | "integrity" | "availability"
  >("confidentiality");
  
  // Refs for keyboard navigation
  const tabListRef = useRef<HTMLDivElement>(null);

  // Handle keyboard navigation for tabs
  const handleTabKeyDown = (event: React.KeyboardEvent, index: number): void => {
    handleArrowKeyNavigation(
      event,
      index,
      CIA_TABS.length,
      (newIndex) => {
        setActiveTab(CIA_TABS[newIndex].id);
        
        // Focus the new tab button
        const tabButtons = tabListRef.current?.querySelectorAll('button[role="tab"]');
        if (tabButtons && tabButtons[newIndex]) {
          (tabButtons[newIndex] as HTMLButtonElement).focus();
        }
      },
      'horizontal'
    );
  };

  // Get CIA content service
  const { ciaContentService, error, isLoading } = useCIAContentService();

  // Use custom hook for all data and helper functions
  const {
    confidentialityDetails,
    integrityDetails,
    availabilityDetails,
    getTechnicalDescription,
    getTechnicalRequirements,
    getTechnologies,
    getConfigurations,
    getExpertiseRequired,
  } = useTechnicalDetailsData(
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
    ciaContentService
  );

  return (
    <WidgetErrorBoundary widgetName="Technical Details">
      <WidgetContainer
        title={
          WIDGET_TITLES.TECHNICAL_DETAILS || "Technical Implementation Details"
        }
        icon={WIDGET_ICONS.TECHNICAL_DETAILS || "🛠️"}
        className={className}
        testId={testId}
        isLoading={isLoading}
        error={error}
      >
      <div 
        className="p-md sm:p-lg"
        role={ARIA_ROLES.REGION}
        aria-label={getWidgetAriaDescription(
          "Technical Implementation Details",
          "Detailed technical implementation requirements for achieving selected security levels"
        )}
      >
        {/* Technical details description */}
        <section 
          className={cn(
            WidgetClasses.section,
            "p-md rounded-md",
            "bg-info-light/10 dark:bg-info-dark/20"
          )}
          aria-labelledby="technical-description-heading"
        >
          <p id="technical-description-heading" className={WidgetClasses.body}>
            This widget provides technical implementation details for achieving
            your selected security levels. Use these guidelines when designing
            and implementing your security controls.
          </p>
        </section>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-md">
          <div
            ref={tabListRef}
            role={ARIA_ROLES.TABLIST}
            aria-label="Technical implementation components"
            className="flex"
          >
            <span className="sr-only" id="tech-tab-keyboard-instructions">
              Use arrow keys to navigate between tabs. Press Enter or Space to activate a tab.
            </span>
            {CIA_TABS.map((tab, index) => {
              const isSelected = activeTab === tab.id;
              const tabId = `${testId}-tab-${tab.id}`;
              const panelId = `${testId}-panel-${tab.id}`;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                  }}
                  onKeyDown={(e) => handleTabKeyDown(e, index)}
                  className={cn(
                    "py-2 px-4 font-medium",
                    WidgetClasses.textResponsive,
                    WidgetClasses.focusVisible,
                    isSelected && tab.id === "confidentiality" && "border-b-2 border-primary text-primary-dark dark:text-primary-light",
                    isSelected && tab.id === "integrity" && "border-b-2 border-green-500 text-green-600 dark:text-green-400",
                    isSelected && tab.id === "availability" && "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400",
                    !isSelected && "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  )}
                  data-testid={TECHNICAL_DETAILS_WIDGET_IDS.button(`${tab.id}-tab`)}
                  {...getTabAriaProps(tabId, isSelected, panelId)}
                  aria-describedby="tech-tab-keyboard-instructions"
                >
                  <span className="mr-xs" aria-hidden="true">{tab.icon}</span> {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Confidentiality details */}
        <div
          {...getTabPanelAriaProps(
            `${testId}-panel-confidentiality`,
            `${testId}-tab-confidentiality`,
            activeTab !== 'confidentiality'
          )}
        >
          {activeTab === "confidentiality" && (
            <CIAComponentDetails
              component="confidentiality"
              level={confidentialityLevel}
              details={confidentialityDetails}
              ciaContentService={ciaContentService}
              testId={testId}
              getTechnicalDescription={getTechnicalDescription}
              getTechnicalRequirements={getTechnicalRequirements}
              getTechnologies={getTechnologies}
              getConfigurations={getConfigurations}
              getExpertiseRequired={getExpertiseRequired}
            />
          )}
        </div>

        {/* Integrity details */}
        <div
          {...getTabPanelAriaProps(
            `${testId}-panel-integrity`,
            `${testId}-tab-integrity`,
            activeTab !== 'integrity'
          )}
        >
          {activeTab === "integrity" && (
            <CIAComponentDetails
              component="integrity"
              level={integrityLevel}
              details={integrityDetails}
              ciaContentService={ciaContentService}
              testId={testId}
              getTechnicalDescription={getTechnicalDescription}
              getTechnicalRequirements={getTechnicalRequirements}
              getTechnologies={getTechnologies}
              getConfigurations={getConfigurations}
              getExpertiseRequired={getExpertiseRequired}
            />
          )}
        </div>

        {/* Availability details */}
        <div
          {...getTabPanelAriaProps(
            `${testId}-panel-availability`,
            `${testId}-tab-availability`,
            activeTab !== 'availability'
          )}
        >
          {activeTab === "availability" && (
            <CIAComponentDetails
              component="availability"
              level={availabilityLevel}
              details={availabilityDetails}
              ciaContentService={ciaContentService}
              testId={testId}
              getTechnicalDescription={getTechnicalDescription}
              getTechnicalRequirements={getTechnicalRequirements}
              getTechnologies={getTechnologies}
              getConfigurations={getConfigurations}
              getExpertiseRequired={getExpertiseRequired}
            />
          )}
        </div>

        {/* Implementation considerations */}
        <div className="p-md bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium mb-md flex items-center">
            <span className="mr-sm">💡</span>Implementation Notes
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-start">
              <span className="mr-sm text-blue-500">•</span>
              <span>
                Implement these technical controls in a layered approach,
                starting with foundational controls.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-sm text-blue-500">•</span>
              <span>
                Regular testing and validation are required to ensure controls
                are functioning as intended.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-sm text-blue-500">•</span>
              <span>
                Consider integrating with existing security infrastructure to
                maximize effectiveness.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-sm text-blue-500">•</span>
              <span>
                Document all implementation details and maintain up-to-date
                configuration records.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </WidgetContainer>
    </WidgetErrorBoundary>
  );
};

export default TechnicalDetailsWidget;
