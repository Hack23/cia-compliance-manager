import React from "react";
import type { ConfidentialityImpactWidgetProps } from "../../../types/widget-props";
import ImpactWidget from "./ImpactWidget";

/**
 * Displays confidentiality impact details for the selected security level
 *
 * ## Business Perspective
 *
 * This widget helps stakeholders understand how confidentiality security levels
 * affect business operations through metrics like data classification, access controls,
 * and encryption methods. The visualization of these metrics supports better decision-making
 * about data protection requirements and privacy investments. 🔒
 */
const ConfidentialityImpactWidget: React.FC<
  ConfidentialityImpactWidgetProps
> = ({
  availabilityLevel: _availabilityLevel,
  integrityLevel: _integrityLevel,
  confidentialityLevel,
  className = "",
  testId = "widget-confidentiality-impact",
  showExtendedDetails = false,
  onError,
}) => {
  return (
    <ImpactWidget
      component="confidentiality"
      level={confidentialityLevel}
      className={className}
      testId={testId}
      showExtendedDetails={showExtendedDetails}
      onError={onError}
    />
  );
};

export default ConfidentialityImpactWidget;
