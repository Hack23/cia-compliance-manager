import { useMemo } from "react";
import {
  ComplianceStatusDetails,
  createComplianceService,
} from "../services/complianceService";
import { ComplianceService } from "../services/ComplianceServiceAdapter";
import { SecurityLevel } from "../types/cia";

/**
 * Hook to access the compliance service
 *
 * ## Business Perspective
 *
 * This hook provides access to compliance mapping functionality,
 * helping organizations understand how their security controls
 * relate to regulatory frameworks and standards. 📋
 *
 * @returns The compliance service instance
 */
export const useComplianceService = (): ComplianceService => {
  // Create the base compliance service
  const baseComplianceService = useMemo(() => createComplianceService(), []);

  // Create a wrapper that implements the ComplianceService interface
  const complianceService = useMemo(() => {
    return {
      getComplianceFrameworks: () => [
        {
          id: "soc2",
          name: "SOC 2",
          description: "Service Organization Control 2",
        },
        {
          id: "iso27001",
          name: "ISO 27001",
          description: "Information Security Management",
        },
        {
          id: "pci-dss",
          name: "PCI DSS",
          description: "Payment Card Industry Data Security Standard",
        },
      ],
      getFrameworkStatus: (
        frameworkId: string,
        availabilityLevel: SecurityLevel,
        integrityLevel: SecurityLevel,
        confidentialityLevel: SecurityLevel
      ) => {
        // Get the compliance status from the base service
        const status = baseComplianceService.getFrameworkStatus(
          frameworkId,
          availabilityLevel,
          integrityLevel,
          confidentialityLevel
        );

        // Convert to FrameworkStatus format
        return {
          complianceLevel: status,
          description: `Compliance status for ${frameworkId} is ${status}`,
        };
      },
      // Return the full ComplianceStatusDetails object
      getComplianceStatus: (
        availabilityLevel: SecurityLevel,
        integrityLevel: SecurityLevel,
        confidentialityLevel: SecurityLevel
      ): ComplianceStatusDetails => {
        return baseComplianceService.getComplianceStatus(
          availabilityLevel,
          integrityLevel,
          confidentialityLevel
        );
      },
    } as ComplianceService;
  }, [baseComplianceService]);

  return complianceService;
};
