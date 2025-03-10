import React, { useMemo } from "react";
import { SECURITY_LEVELS, UI_TEXT } from "../../constants/appConstants";
import ValueDisplay from "../common/ValueDisplay";
import KeyValuePair from "../common/KeyValuePair";
import {
  WIDGET_TEST_IDS,
  createDynamicTestId,
  VALUE_CREATION_TEST_IDS,
} from "../../constants/testIds";
import { WidgetBaseProps } from "../../types/widgets";
import ciaContentService, {
  getValuePoints,
  getROIEstimate,
  getImplementationConsiderations,
} from "../../services/ciaContentService";
import { SecurityLevel } from "../../types/cia";

export interface ValueCreationWidgetProps extends WidgetBaseProps {
  securityLevel: string;
  availabilityLevel: string;
  integrityLevel: string;
  confidentialityLevel: string;
}

const ValueCreationWidget: React.FC<ValueCreationWidgetProps> = ({
  securityLevel = SECURITY_LEVELS.NONE,
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  testId = VALUE_CREATION_TEST_IDS.VALUE_CREATION_PREFIX,
}) => {
  // Use ciaContentService to get value points
  const valuePoints = useMemo(() => {
    return getValuePoints(securityLevel as SecurityLevel) || [];
  }, [securityLevel]);

  // Get ROI data from ciaContentService
  const roiData = useMemo(() => {
    return getROIEstimate(securityLevel as SecurityLevel);
  }, [securityLevel]);

  // Get implementation considerations from ciaContentService
  const implementationConsiderations = useMemo(() => {
    return getImplementationConsiderations(securityLevel as SecurityLevel);
  }, [securityLevel]);

  // Color styling based on level
  const getLevelVariant = () => {
    switch (securityLevel) {
      case SECURITY_LEVELS.VERY_HIGH:
        return "success";
      case SECURITY_LEVELS.HIGH:
        return "primary";
      case SECURITY_LEVELS.MODERATE:
        return "info";
      case SECURITY_LEVELS.LOW:
        return "warning";
      default:
        return "danger";
    }
  };

  // Get text color class based on security level
  const getLevelColorClass = () => {
    switch (securityLevel) {
      case SECURITY_LEVELS.VERY_HIGH:
        return "text-green-600 dark:text-green-400";
      case SECURITY_LEVELS.HIGH:
        return "text-blue-600 dark:text-blue-400";
      case SECURITY_LEVELS.MODERATE:
        return "text-yellow-600 dark:text-yellow-400";
      case SECURITY_LEVELS.LOW:
        return "text-orange-600 dark:text-orange-400";
      default:
        return "text-red-600 dark:text-red-400";
    }
  };

  return (
    <div
      className="space-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
      data-testid={WIDGET_TEST_IDS.VALUE_CREATION_CONTENT}
      aria-labelledby="value-creation-title"
    >
      <div className="flex items-center justify-between">
        <h3
          id="value-creation-title"
          className={`text-lg font-bold ${getLevelColorClass()}`}
          data-testid={WIDGET_TEST_IDS.VALUE_CREATION_TITLE}
        >
          {securityLevel} Value Creation
        </h3>
        <p
          className="text-sm text-gray-500 dark:text-gray-400"
          data-testid={WIDGET_TEST_IDS.VALUE_CREATION_SUBTITLE}
        >
          Business value derived from this security profile
        </p>
      </div>

      <ul
        className="space-y-2"
        data-testid={WIDGET_TEST_IDS.VALUE_POINTS_LIST}
        aria-label="Value creation points"
      >
        {valuePoints.map((point, index) => (
          <li
            key={index}
            className="flex items-start"
            data-testid={createDynamicTestId.valuePoint(index)}
          >
            <span className={`mr-2 ${getLevelColorClass()}`} aria-hidden="true">
              •
            </span>
            <span className="font-medium text-sm text-gray-700 dark:text-gray-300">
              {point}
            </span>
          </li>
        ))}
      </ul>

      <div
        className="border-t pt-4 mt-4 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg"
        aria-labelledby="roi-section-title"
      >
        <h4 id="roi-section-title" className="text-sm font-medium mb-2">
          Return on Investment Analysis
        </h4>
        <KeyValuePair
          label="Return on Investment:"
          value={
            <ValueDisplay
              value={roiData.value}
              variant={getLevelVariant()}
              testId={WIDGET_TEST_IDS.ROI_VALUE}
            />
          }
          testId={WIDGET_TEST_IDS.ROI_SECTION}
        />
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          {roiData.description}
        </p>

        <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          <h5 className="font-medium mb-1">Implementation Considerations</h5>
          <p>{implementationConsiderations}</p>
        </div>
      </div>
    </div>
  );
};

export default ValueCreationWidget;
