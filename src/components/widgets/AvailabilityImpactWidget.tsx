import React from "react";
import { WidgetBaseProps } from "../../types/widgets";
import { AVAILABILITY_IMPACT_TEST_IDS } from "../../constants/testIds";
import ciaContentService from "../../services/ciaContentService";
import StatusBadge from "../common/StatusBadge";
import KeyValuePair from "../common/KeyValuePair";
import { SecurityLevel } from "../../types/cia";
import WidgetContainer from "../common/WidgetContainer";
import { CIA_COMPONENT_ICONS } from "../../constants/coreConstants";

interface AvailabilityImpactWidgetProps extends WidgetBaseProps {
  options?: Record<string, any>;
}

const AvailabilityImpactWidget: React.FC<AvailabilityImpactWidgetProps> = ({
  availabilityLevel = "None",
  options,
}) => {
  // Get availability details from ciaContentService
  const details = ciaContentService.getComponentDetails(
    "availability",
    availabilityLevel as SecurityLevel
  );
  const businessImpact = ciaContentService.getBusinessImpact(
    "availability",
    availabilityLevel as SecurityLevel
  );
  const technicalDetails = ciaContentService.getTechnicalImplementation(
    "availability",
    availabilityLevel as SecurityLevel
  );
  const businessPerspective = ciaContentService.getBusinessPerspective(
    "availability",
    availabilityLevel as SecurityLevel
  );
  const recommendations = ciaContentService.getRecommendations(
    "availability",
    availabilityLevel as SecurityLevel
  );

  return (
    <WidgetContainer
      title="Availability Impact"
      icon={CIA_COMPONENT_ICONS.AVAILABILITY}
      testId={AVAILABILITY_IMPACT_TEST_IDS.AVAILABILITY_IMPACT_PREFIX}
    >
      <div className="space-y-4">
        <div>
          <h3 className="font-medium mb-1">Description</h3>
          <p className="text-sm">{details?.description}</p>
        </div>

        <div>
          <h3 className="font-medium mb-1">Business Impact</h3>
          <p className="text-sm">{businessImpact.summary}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {details?.uptime && (
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
              <h4 className="text-sm font-medium mb-1">Uptime</h4>
              <p className="text-sm font-bold">{details?.uptime}</p>
            </div>
          )}

          {details?.mttr && (
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
              <h4 className="text-sm font-medium mb-1">
                Mean Time To Recovery (MTTR)
              </h4>
              <p className="text-sm font-bold">{details?.mttr}</p>
            </div>
          )}
        </div>

        {details?.rto && details?.rpo && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
              <h4 className="text-sm font-medium mb-1 flex items-center">
                <span className="mr-1">⏱️</span>
                Recovery Time Objective (RTO)
              </h4>
              <p className="text-sm font-bold">{details?.rto}</p>
            </div>

            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
              <h4 className="text-sm font-medium mb-1 flex items-center">
                <span className="mr-1">💾</span>
                Recovery Point Objective (RPO)
              </h4>
              <p className="text-sm font-bold">{details?.rpo}</p>
            </div>
          </div>
        )}

        <div>
          <h3 className="font-medium mb-1">Business Perspective</h3>
          <p className="text-sm">{businessPerspective}</p>
        </div>

        <div>
          <h3 className="font-medium mb-1">Recommendations</h3>
          <ul className="list-disc list-inside text-sm">
            {recommendations.map((recommendation, index) => (
              <li key={index}>{recommendation}</li>
            ))}
          </ul>
        </div>
      </div>
    </WidgetContainer>
  );
};

export default AvailabilityImpactWidget;
