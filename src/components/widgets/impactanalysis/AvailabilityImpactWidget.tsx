import React from "react";
import type { AvailabilityImpactWidgetProps } from "../../../types/widget-props";
import { AVAILABILITY_IMPACT_TEST_IDS } from "../../../constants/testIds";
import ImpactWidget from "./ImpactWidget";

/**
 * Widget that displays the impact of selected availability level
 *
 * ## Business Perspective
 *
 * This widget helps stakeholders understand the business impact of
 * availability controls, including uptime targets, recovery objectives,
 * and resilience requirements for business continuity. ⏱️
 */
const AvailabilityImpactWidget: React.FC<AvailabilityImpactWidgetProps> = ({
  availabilityLevel,
  integrityLevel: _integrityLevel,
  confidentialityLevel: _confidentialityLevel,
  showExtendedDetails = false,
  className = "",
  testId = AVAILABILITY_IMPACT_TEST_IDS.AVAILABILITY_IMPACT_PREFIX,
  onError,
}) => {
  return (
    <ImpactWidget
      component="availability"
      level={availabilityLevel}
      className={className}
      testId={testId}
      showExtendedDetails={showExtendedDetails}
      onError={onError}
    />
  );
};

export default AvailabilityImpactWidget;
