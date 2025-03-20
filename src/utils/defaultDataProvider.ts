import { SecurityLevel } from "../types/cia";
import { CIADataProvider, CIADetails } from "../types/cia-services";

/**
 * Creates a default data provider for services
 * 
 * @returns A default CIADataProvider instance with minimal values
 */
export function createDefaultDataProvider(): CIADataProvider {
  // Create empty CIADetails for each security level
  const createEmptyDetails = (): CIADetails => ({
    description: "",
    technical: "",
    businessImpact: "",
    capex: 0,
    opex: 0,
    bg: "#ffffff",
    text: "#000000",
    recommendations: []
  });

  // Create options for each security level
  const securityLevels: SecurityLevel[] = ["None", "Low", "Moderate", "High", "Very High"];
  const options: Record<SecurityLevel, CIADetails> = {} as Record<SecurityLevel, CIADetails>;

  securityLevels.forEach(level => {
    options[level] = createEmptyDetails();
  });

  // Return the complete data provider
  return {
    availabilityOptions: { ...options },
    integrityOptions: { ...options },
    confidentialityOptions: { ...options },
    roiEstimates: {
      "NONE": { returnRate: "0%", value: "0%", description: "No ROI" },
      "LOW": { returnRate: "50%", value: "50%", description: "Low ROI" },
      "MODERATE": { returnRate: "150%", value: "150%", description: "Moderate ROI" },
      "HIGH": { returnRate: "250%", value: "250%", description: "High ROI" },
      "VERY_HIGH": { returnRate: "400%", value: "400%", description: "Very High ROI" }
    }
  };
}
