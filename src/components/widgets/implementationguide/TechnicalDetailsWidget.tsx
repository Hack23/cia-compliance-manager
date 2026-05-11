import React from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { TECHNICAL_DETAILS_WIDGET_IDS } from "../../../constants/testIds";
import { useCIAContentService } from "../../../hooks/useCIAContentService";
import { useTechnicalDetailsData } from "../../../hooks/useTechnicalDetailsData";
import { TechnicalDetailsWidgetProps } from "../../../types/widget-props";
import { Tab } from "../../../types/tabs";
import { 
  getWidgetAriaDescription,
  ARIA_ROLES 
} from "../../../utils/accessibility";
import { WidgetClasses, cn } from "../../../utils/tailwindClassHelpers";
import WidgetContainer from "../../common/WidgetContainer";
import WidgetErrorBoundary from "../../common/WidgetErrorBoundary";
import TabContainer from "../../common/TabContainer";
import { CIAComponentDetails } from "./CIAComponentDetails";

/**
 * Widget that displays detailed technical implementation requirements
 *
 * ## Business Perspective
 *
 * This widget provides technical teams with specific implementation details
 * for achieving the selected security levels. It helps bridge the gap between
 * security requirements and technical implementation by providing concrete
 * guidance on controls, configurations, and technologies. \uD83D\uDEE0\uFE0F
 */
const TechnicalDetailsWidget: React.FC<TechnicalDetailsWidgetProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  className = "",
  testId = TECHNICAL_DETAILS_WIDGET_IDS.root,
}) => {
  const { ciaContentService, error, isLoading } = useCIAContentService();

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

  const tabs: Tab[] = [
    {
      id: 'confidentiality',
      label: 'Confidentiality',
      icon: <span className="mr-xs" aria-hidden="true">\uD83D\uDD12</span>,
      content: (
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
      ),
      testId: TECHNICAL_DETAILS_WIDGET_IDS.button('confidentiality-tab'),
    },
    {
      id: 'integrity',
      label: 'Integrity',
      icon: <span className="mr-xs" aria-hidden="true">\u2713</span>,
      content: (
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
      ),
      testId: TECHNICAL_DETAILS_WIDGET_IDS.button('integrity-tab'),
    },
    {
      id: 'availability',
      label: 'Availability',
      icon: <span className="mr-xs" aria-hidden="true">\u23F1\uFE0F</span>,
      content: (
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
      ),
      testId: TECHNICAL_DETAILS_WIDGET_IDS.button('availability-tab'),
    },
  ];

  return (
    <WidgetErrorBoundary widgetName="Technical Details">
      <WidgetContainer
        title={
          WIDGET_TITLES.TECHNICAL_DETAILS || "Technical Implementation Details"
        }
        icon={WIDGET_ICONS.TECHNICAL_DETAILS || "\uD83D\uDEE0\uFE0F"}
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

        <TabContainer
          tabs={tabs}
          initialTab="confidentiality"
          testId={`${testId}-tabs`}
        />

        <div className="p-md bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-subheading font-medium mb-md flex items-center">
            <span className="mr-sm">\uD83D\uDCA1</span>Implementation Notes
          </h3>
          <ul className="space-y-xs text-body text-gray-600 dark:text-gray-400">
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
