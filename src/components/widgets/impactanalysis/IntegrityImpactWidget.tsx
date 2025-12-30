import React from "react";
import type { IntegrityImpactWidgetProps } from "../../../types/widget-props";
import { INTEGRITY_IMPACT_TEST_IDS } from "../../../constants/testIds";
import ImpactWidget from "./ImpactWidget";

/**
 * Widget that displays the impact of selected integrity level
 *
 * ## Business Perspective
 *
 * This widget helps stakeholders understand the business impact of
 * integrity controls, including how data accuracy and validation
 * mechanisms protect business operations and decision-making. 📊
 */
const IntegrityImpactWidget: React.FC<IntegrityImpactWidgetProps> = ({
  availabilityLevel: _availabilityLevel,
  integrityLevel,
  confidentialityLevel: _confidentialityLevel,
  className = "",
  testId = INTEGRITY_IMPACT_TEST_IDS.INTEGRITY_IMPACT_PREFIX,
  showExtendedDetails = false,
  onError,
}) => {
  return (
    <ImpactWidget
      component="integrity"
      level={integrityLevel}
      className={className}
      testId={testId}
      showExtendedDetails={showExtendedDetails}
      onError={onError}
    />
  );
};

export default IntegrityImpactWidget;
