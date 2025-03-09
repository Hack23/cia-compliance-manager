import React from "react";
import {
  SECURITY_LEVELS,
  VALUE_CREATION_POINTS,
  ROI_ESTIMATES,
  UI_TEXT,
  DETAILED_VALUE_POINTS,
} from "../../constants/appConstants";
import { ensureArray } from "../../utils/typeGuards";
import ValueDisplay from "../common/ValueDisplay";
import KeyValuePair from "../common/KeyValuePair";
import {
  WIDGET_TEST_IDS,
  createDynamicTestId,
  VALUE_CREATION_TEST_IDS,
} from "../../constants/testIds";
import { WidgetBaseProps } from "../../types/widgets";

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
  // Create a mapping to simplify the getValuePoints function
  const getValuePoints = () => {
    const levelMap: Record<string, string[]> = {
      [SECURITY_LEVELS.VERY_HIGH]: [
        VALUE_CREATION_POINTS[SECURITY_LEVELS.VERY_HIGH][0] ??
          "Premium security value",
        ...DETAILED_VALUE_POINTS.VERY_HIGH,
      ],
      [SECURITY_LEVELS.HIGH]: [
        VALUE_CREATION_POINTS[SECURITY_LEVELS.HIGH][0] ?? "High security value",
        ...DETAILED_VALUE_POINTS.HIGH,
      ],
      [SECURITY_LEVELS.MODERATE]: [
        VALUE_CREATION_POINTS[SECURITY_LEVELS.MODERATE][0] ??
          "Moderate security value",
        ...DETAILED_VALUE_POINTS.MODERATE,
      ],
      [SECURITY_LEVELS.LOW]: [
        VALUE_CREATION_POINTS[SECURITY_LEVELS.LOW][0] ?? "Basic security value",
        ...DETAILED_VALUE_POINTS.LOW,
      ],
      [SECURITY_LEVELS.NONE]: [
        VALUE_CREATION_POINTS[SECURITY_LEVELS.NONE][0] ??
          "Minimal security value",
        ...DETAILED_VALUE_POINTS.NONE,
      ],
    };

    return levelMap[securityLevel] || levelMap[SECURITY_LEVELS.NONE];
  };

  const valuePoints = getValuePoints();

  // Get ROI estimation based on security level
  const getROIEstimate = () => {
    switch (securityLevel) {
      case SECURITY_LEVELS.VERY_HIGH:
        return {
          value: "5x+",
          description: "Maximum return with comprehensive security controls",
        };
      case SECURITY_LEVELS.HIGH:
        return {
          value: "3-5x",
          description: "Strong return with robust security implementation",
        };
      case SECURITY_LEVELS.MODERATE:
        return {
          value: "2-3x",
          description: "Good return with balanced security approach",
        };
      case SECURITY_LEVELS.LOW:
        return {
          value: "1-2x",
          description: "Basic return with minimal security investment",
        };
      default:
        return {
          value: "Negative (high risk of losses)",
          description: "No return without security investment",
        };
    }
  };

  // Get ROI data from calculation
  const roiData = getROIEstimate();

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
        {ensureArray(valuePoints).map((point, index) => (
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
          <p>{getImplementationConsiderations(securityLevel)}</p>
        </div>
      </div>
    </div>
  );
};

// Add a new helper function
function getImplementationConsiderations(level: string): string {
  switch (level) {
    case SECURITY_LEVELS.VERY_HIGH:
      return "Implementation requires significant upfront investment but offers maximum long-term value through comprehensive risk reduction and regulatory compliance.";
    case SECURITY_LEVELS.HIGH:
      return "Balanced approach with substantial security benefits and reasonable implementation costs for most organizations with sensitive data or operations.";
    case SECURITY_LEVELS.MODERATE:
      return "Cost-effective implementation that provides standard security capabilities suitable for most business applications and moderate risk environments.";
    case SECURITY_LEVELS.LOW:
      return "Minimal implementation effort focused on essential security controls, appropriate for non-critical systems or limited budgets.";
    default:
      return "No security implementation considerations. Consider baseline security controls for any business system.";
  }
}

export default ValueCreationWidget;
