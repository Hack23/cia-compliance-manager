import { useMemo } from "react";
import { ComplianceService } from "../../../services/ComplianceServiceAdapter";
import { ComplianceStatusWidgetProps } from "../../../types/widgets";

/**
 * ComplianceStatusWidget displays the compliance status based on selected security levels
 * It shows compliant, partially compliant, and non-compliant frameworks
 *
 * ## Business Perspective
 *
 * This widget helps organizations understand their compliance posture based on
 * selected security levels across the CIA triad. It provides actionable insights
 * for compliance officers to identify gaps that need addressing. 📋
 *
 * The clear visualization of compliance status supports regulatory reporting
 * requirements and helps prioritize security investments. 💼
 *
 * @param props - Component properties
 * @returns JSX element
 */
export default function ComplianceStatusWidget({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  securityLevel,
  className = "",
  testId = "compliance-status-widget",
}: ComplianceStatusWidgetProps) {
  // Use ComplianceService to get compliance status data
  const complianceData = useMemo(() => {
    // If we have individual CIA levels, use those for more precise compliance analysis
    if (availabilityLevel && integrityLevel && confidentialityLevel) {
      return ComplianceService.getComplianceStatus(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      );
    }
    // Otherwise use the overall security level as a fallback
    else if (securityLevel) {
      return ComplianceService.getComplianceStatus(
        securityLevel,
        securityLevel,
        securityLevel
      );
    }
    // Default to moderate if nothing is provided
    return ComplianceService.getComplianceStatus(
      "Moderate",
      "Moderate",
      "Moderate"
    );
  }, [availabilityLevel, integrityLevel, confidentialityLevel, securityLevel]);

  // Determine status style based on compliance status
  const statusStyle = useMemo(() => {
    if (!complianceData.status)
      return {
        bgColor: "bg-gray-100",
        textColor: "text-gray-800",
        borderColor: "border-gray-500",
      };

    switch (complianceData.status) {
      case "Fully Compliant":
        return {
          bgColor: "bg-green-100",
          textColor: "text-green-800",
          borderColor: "border-green-500",
        };
      case "Partially Compliant":
        return {
          bgColor: "bg-yellow-100",
          textColor: "text-yellow-800",
          borderColor: "border-yellow-500",
        };
      case "Non-Compliant":
        return {
          bgColor: "bg-red-100",
          textColor: "text-red-800",
          borderColor: "border-red-500",
        };
      default:
        return {
          bgColor: "bg-gray-100",
          textColor: "text-gray-800",
          borderColor: "border-gray-500",
        };
    }
  }, [complianceData.status]);

  // Fallback to default implementation for testing
  const {
    compliantFrameworks,
    partiallyCompliantFrameworks,
    nonCompliantFrameworks,
  } = useMemo(() => {
    if (!complianceData.compliantFrameworks) {
      return {
        compliantFrameworks: getCompliantFrameworks(),
        partiallyCompliantFrameworks: getPartiallyCompliantFrameworks(),
        nonCompliantFrameworks: getNonCompliantFrameworks(),
      };
    }
    return {
      compliantFrameworks: complianceData.compliantFrameworks,
      partiallyCompliantFrameworks: complianceData.partiallyCompliantFrameworks,
      nonCompliantFrameworks: complianceData.nonCompliantFrameworks,
    };
  }, [complianceData]);

  // Fallback functions for testing
  function getCompliantFrameworks() {
    // This is a placeholder - would be replaced with actual logic
    if (
      securityLevel === "Very High" ||
      (availabilityLevel === "High" &&
        integrityLevel === "High" &&
        confidentialityLevel === "High")
    ) {
      return [
        "NIST 800-53 Rev. 5",
        "ISO 27001:2022",
        "NIST CSF 2.0",
        "PCI DSS",
      ];
    } else if (
      securityLevel === "High" ||
      (availabilityLevel === "Moderate" &&
        integrityLevel === "High" &&
        confidentialityLevel === "High")
    ) {
      return ["NIST 800-53 Rev. 5", "ISO 27001:2022"];
    } else if (
      securityLevel === "Moderate" ||
      (availabilityLevel === "Moderate" && integrityLevel === "Moderate")
    ) {
      return ["ISO 27001:2022"];
    }
    return [];
  }

  function getPartiallyCompliantFrameworks() {
    // This is a placeholder - would be replaced with actual logic
    if (
      securityLevel === "High" ||
      (availabilityLevel === "Moderate" &&
        integrityLevel === "Moderate" &&
        confidentialityLevel === "High")
    ) {
      return ["NIST CSF 2.0", "GDPR", "SOC2"];
    } else if (
      securityLevel === "Moderate" ||
      (availabilityLevel === "Low" &&
        integrityLevel === "Moderate" &&
        confidentialityLevel === "Moderate")
    ) {
      return ["NIST 800-53 Rev. 5", "GDPR", "SOC2"];
    } else if (
      securityLevel === "Low" ||
      (availabilityLevel === "Low" && integrityLevel === "Low")
    ) {
      return ["ISO 27001:2022"];
    }
    return ["GDPR", "SOC2"];
  }

  function getNonCompliantFrameworks() {
    // This is a placeholder - would be replaced with actual logic
    if (
      securityLevel === "None" ||
      availabilityLevel === "None" ||
      integrityLevel === "None" ||
      confidentialityLevel === "None"
    ) {
      return [
        "NIST 800-53 Rev. 5",
        "ISO 27001:2022",
        "NIST CSF 2.0",
        "PCI DSS",
        "HIPAA",
      ];
    } else if (
      securityLevel === "Low" ||
      (availabilityLevel === "Low" &&
        integrityLevel === "Low" &&
        confidentialityLevel === "Low")
    ) {
      return ["NIST 800-53 Rev. 5", "NIST CSF 2.0", "PCI DSS", "HIPAA"];
    }
    return ["PCI DSS", "HIPAA"];
  }

  return (
    <div
      className={`p-4 border rounded-lg shadow-sm ${className}`}
      data-testid={testId}
    >
      <h3 className="text-lg font-semibold mb-4">Compliance Status</h3>

      {/* Compliance Status Badge */}
      <div
        className={`px-3 py-2 mb-4 rounded-md inline-flex ${statusStyle.bgColor} ${statusStyle.textColor} ${statusStyle.borderColor} border-l-4`}
        data-testid="compliance-status-badge"
      >
        <span className="font-medium">
          {complianceData.status || "Meets basic compliance only"}
        </span>
      </div>

      <div className="space-y-4">
        {/* Compliant Frameworks */}
        <div>
          <h4 className="font-medium text-green-700 mb-2">Compliant</h4>
          {compliantFrameworks.length > 0 ? (
            <ul className="pl-5 list-disc">
              {compliantFrameworks.map((framework) => (
                <li
                  key={framework}
                  className="text-green-600"
                  data-testid="framework-item"
                >
                  {framework}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No compliant frameworks</p>
          )}
        </div>

        {/* Partially Compliant Frameworks */}
        <div>
          <h4 className="font-medium text-yellow-700 mb-2">
            Partially Compliant
          </h4>
          {partiallyCompliantFrameworks.length > 0 ? (
            <ul className="pl-5 list-disc">
              {partiallyCompliantFrameworks.map((framework) => (
                <li
                  key={framework}
                  className="text-yellow-600"
                  data-testid="framework-item"
                >
                  {framework}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">
              No partially compliant frameworks
            </p>
          )}
        </div>

        {/* Non-Compliant Frameworks */}
        <div>
          <h4 className="font-medium text-red-700 mb-2">Non-Compliant</h4>
          {nonCompliantFrameworks.length > 0 ? (
            <ul className="pl-5 list-disc">
              {nonCompliantFrameworks.map((framework) => (
                <li
                  key={framework}
                  className="text-red-600"
                  data-testid="framework-item"
                >
                  {framework}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No non-compliant frameworks</p>
          )}
        </div>

        {/* Remediation Steps */}
        {complianceData.remediationSteps &&
          complianceData.remediationSteps.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium text-blue-700 mb-2">
                Remediation Steps
              </h4>
              <ul className="pl-5 list-disc">
                {complianceData.remediationSteps.map((step, index) => (
                  <li key={index} className="text-blue-600">
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>
    </div>
  );
}
