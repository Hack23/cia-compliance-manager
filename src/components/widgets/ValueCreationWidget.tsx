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
import { ValueCreationWidgetProps } from "../../types/widgets"; // Use the imported type

const ValueCreationWidget: React.FC<ValueCreationWidgetProps> = ({
  securityLevel = SECURITY_LEVELS.NONE,
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
        return ROI_ESTIMATES.VERY_HIGH;
      case SECURITY_LEVELS.HIGH:
        return ROI_ESTIMATES.HIGH;
      case SECURITY_LEVELS.MODERATE:
        return ROI_ESTIMATES.MODERATE;
      case SECURITY_LEVELS.LOW:
        return ROI_ESTIMATES.LOW;
      default:
        return ROI_ESTIMATES.NONE;
    }
  };

  const roiEstimate = getROIEstimate();

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
      className="space-y-4"
      data-testid={WIDGET_TEST_IDS.VALUE_CREATION_CONTENT}
    >
      <div className="flex items-center justify-between">
        <h3
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

      <ul className="space-y-2" data-testid={WIDGET_TEST_IDS.VALUE_POINTS_LIST}>
        {ensureArray(valuePoints).map((point, index) => (
          <li
            key={index}
            className="flex items-start"
            data-testid={createDynamicTestId.valuePoint(index)}
          >
            <span className={`mr-2 ${getLevelColorClass()}`}>•</span>
            <span className="font-medium text-sm text-gray-700 dark:text-gray-300">
              {point}
            </span>
          </li>
        ))}
      </ul>

      <div className="border-t pt-2 mt-4">
        <KeyValuePair
          label="Return on Investment:"
          value={
            <ValueDisplay
              value={roiEstimate}
              variant={getLevelVariant()}
              testId={WIDGET_TEST_IDS.ROI_VALUE}
            />
          }
          testId={WIDGET_TEST_IDS.ROI_SECTION}
        />
      </div>
    </div>
  );
};

export default ValueCreationWidget;
