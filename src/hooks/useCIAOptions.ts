import { SecurityLevel } from "../types/cia";

export type ROIType = "NONE" | "LOW" | "MODERATE" | "HIGH" | "VERY_HIGH";

export interface ROIData {
  returnRate: string;
  recommendation: string;
  description: string;
  value?: string; // Make value optional since it's used in tests
  potentialSavings?: string; // Add optional property used in tests
  breakEvenPeriod?: string; // Add optional property used in tests
}

export interface CIAOptionDetails {
  value: number;
  description: string;
  technical?: string;
  businessImpact?: string;
  capex?: number;
  opex?: number;
  recommendations?: string[];
  impact?: string;
  fte?: number;
  bg?: string; // Add optional bg property used in tests
  text?: string; // Add optional text property used in tests
}

// Export these constants directly so they can be imported without calling the hook
export const availabilityOptions: Record<SecurityLevel, CIAOptionDetails> = {
  None: {
    value: 0,
    description: "No availability requirements",
    technical: "",
    capex: 0,
    opex: 0,
  },
  Low: {
    value: 1,
    description: "Minimal availability requirements",
    technical: "",
    capex: 25000,
    opex: 10000,
  },
  Moderate: {
    value: 2,
    description: "Standard availability requirements",
    technical: "",
    capex: 50000,
    opex: 20000,
  },
  High: {
    value: 3,
    description: "High availability requirements",
    technical: "",
    capex: 75000,
    opex: 30000,
  },
  "Very High": {
    value: 4,
    description: "Maximum availability requirements",
    technical: "",
    capex: 100000,
    opex: 40000,
  },
};

export const integrityOptions: Record<SecurityLevel, CIAOptionDetails> = {
  None: {
    value: 0,
    description: "No integrity requirements",
    technical: "",
    capex: 0,
    opex: 0,
  },
  Low: {
    value: 1,
    description: "Minimal integrity requirements",
    technical: "",
    capex: 25000,
    opex: 10000,
  },
  Moderate: {
    value: 2,
    description: "Standard integrity requirements",
    technical: "",
    capex: 50000,
    opex: 20000,
  },
  High: {
    value: 3,
    description: "High integrity requirements",
    technical: "",
    capex: 75000,
    opex: 30000,
  },
  "Very High": {
    value: 4,
    description: "Maximum integrity requirements",
    technical: "",
    capex: 100000,
    opex: 40000,
  },
};

export const confidentialityOptions: Record<SecurityLevel, CIAOptionDetails> = {
  None: {
    value: 0,
    description: "No confidentiality requirements",
    technical: "",
    capex: 0,
    opex: 0,
  },
  Low: {
    value: 1,
    description: "Minimal confidentiality requirements",
    technical: "",
    capex: 25000,
    opex: 10000,
  },
  Moderate: {
    value: 2,
    description: "Standard confidentiality requirements",
    technical: "",
    capex: 50000,
    opex: 20000,
  },
  High: {
    value: 3,
    description: "High confidentiality requirements",
    technical: "",
    capex: 75000,
    opex: 30000,
  },
  "Very High": {
    value: 4,
    description: "Maximum confidentiality requirements",
    technical: "",
    capex: 100000,
    opex: 40000,
  },
};

export const ROI_ESTIMATES: Record<ROIType, ROIData> = {
  NONE: {
    returnRate: "0%",
    recommendation: "No investment recommended",
    description: "Investment in security measures is not necessary.",
  },
  LOW: {
    returnRate: "25%",
    recommendation: "Minimal investment recommended",
    description: "Basic security measures should be implemented.",
  },
  MODERATE: {
    returnRate: "50%",
    recommendation: "Moderate investment recommended",
    description: "Standard security measures should be implemented.",
  },
  HIGH: {
    returnRate: "75%",
    recommendation: "High investment recommended",
    description: "Advanced security measures should be implemented.",
  },
  VERY_HIGH: {
    returnRate: "100%",
    recommendation: "Maximum investment recommended",
    description: "Comprehensive security measures should be implemented.",
  },
};

export const useCIAOptions = () => {
  // Use the exported constants directly
  const getAvailabilityOptions = () => availabilityOptions;
  const getIntegrityOptions = () => integrityOptions;
  const getConfidentialityOptions = () => confidentialityOptions;
  const getROIEstimates = () => ROI_ESTIMATES;

  const getROIEstimateForSecurityLevel = (level: SecurityLevel): ROIType => {
    switch (level) {
      case "None":
        return "NONE";
      case "Low":
        return "LOW";
      case "Moderate":
        return "MODERATE";
      case "High":
        return "HIGH";
      case "Very High":
        return "VERY_HIGH";
      default:
        return "NONE";
    }
  };

  const getCombinedROIKey = (
    confidentiality: SecurityLevel,
    integrity: SecurityLevel,
    availability: SecurityLevel
  ): ROIType => {
    // Simple algorithm to determine combined ROI level based on CIA levels
    const levels = [confidentiality, integrity, availability];
    const highestLevel = levels.reduce((highest, current) => {
      const currentValue = confidentialityOptions[current]?.value || 0;
      const highestValue = confidentialityOptions[highest]?.value || 0;
      return currentValue > highestValue ? current : highest;
    }, "None" as SecurityLevel);

    return getROIEstimateForSecurityLevel(highestLevel);
  };

  const getROIDataForCombinedKey = (key: ROIType): ROIData => {
    return ROI_ESTIMATES[key] || ROI_ESTIMATES.NONE;
  };

  return {
    availabilityOptions,
    integrityOptions,
    confidentialityOptions,
    ROI_ESTIMATES,
    getAvailabilityOptions,
    getIntegrityOptions,
    getConfidentialityOptions,
    getROIEstimates,
    getROIEstimateForSecurityLevel,
    getCombinedROIKey,
    getROIDataForCombinedKey,
  };
};

export default useCIAOptions;
