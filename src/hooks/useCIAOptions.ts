import { SecurityLevel } from "../types/cia";

/**
 * ROI type representing different security level categories
 * 
 * Used to categorize return on investment estimates based on
 * security level investments. Maps to SecurityLevel enum values.
 */
export type ROIType = "NONE" | "LOW" | "MODERATE" | "HIGH" | "VERY_HIGH";

/**
 * ROI data structure containing investment analysis
 * 
 * Provides return on investment metrics and recommendations for
 * security level implementations, helping stakeholders understand
 * the business value of security investments.
 * 
 * @example
 * ```typescript
 * const roiData: ROIData = {
 *   returnRate: "75%",
 *   recommendation: "High investment recommended",
 *   description: "Advanced security measures should be implemented.",
 *   value: "$75,000",
 *   potentialSavings: "$200,000 annually",
 *   breakEvenPeriod: "18 months"
 * };
 * ```
 */
export interface ROIData {
  /** Expected return rate as percentage (e.g., "75%", "100%") */
  returnRate: string;
  
  /** Investment recommendation text */
  recommendation: string;
  
  /** Detailed description of the investment scenario */
  description: string;
  
  /** Optional calculated ROI value in currency */
  value?: string;
  
  /** Optional estimated cost savings */
  potentialSavings?: string;
  
  /** Optional time period to break even on investment */
  breakEvenPeriod?: string;
}

/**
 * CIA option details for a specific security level
 * 
 * Comprehensive configuration data for a security level including
 * costs, descriptions, and technical details. Used to display
 * security level options to users with full context.
 * 
 * @example
 * ```typescript
 * const optionDetails: CIAOptionDetails = {
 *   value: 3,
 *   description: "High availability requirements",
 *   technical: "Multi-AZ deployment with auto-scaling",
 *   businessImpact: "Minimal downtime, improved customer satisfaction",
 *   capex: 75000,
 *   opex: 30000,
 *   recommendations: ["Implement monitoring", "Regular DR testing"],
 *   impact: "99.9% uptime guarantee",
 *   fte: 2,
 *   bg: "bg-green-100",
 *   text: "text-green-800"
 * };
 * ```
 */
export interface CIAOptionDetails {
  /** Numeric value (0-4) representing security level strength */
  value: number;
  
  /** Human-readable description of the security level */
  description: string;
  
  /** Optional technical implementation details */
  technical?: string;
  
  /** Optional business impact description */
  businessImpact?: string;
  
  /** Optional capital expenditure (one-time costs) */
  capex?: number;
  
  /** Optional operational expenditure (recurring annual costs) */
  opex?: number;
  
  /** Optional array of implementation recommendations */
  recommendations?: string[];
  
  /** Optional impact statement */
  impact?: string;
  
  /** Optional full-time equivalent resources needed */
  fte?: number;
  
  /** Optional background color CSS class for UI display */
  bg?: string;
  
  /** Optional text color CSS class for UI display */
  text?: string;
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

/**
 * Return type for useCIAOptions hook
 * 
 * Provides access to CIA security level options, ROI estimates,
 * and utility functions for working with security configurations.
 */
export interface UseCIAOptionsReturn {
  /** Availability security level options with details and costs */
  availabilityOptions: Record<SecurityLevel, CIAOptionDetails>;
  
  /** Integrity security level options with details and costs */
  integrityOptions: Record<SecurityLevel, CIAOptionDetails>;
  
  /** Confidentiality security level options with details and costs */
  confidentialityOptions: Record<SecurityLevel, CIAOptionDetails>;
  
  /** ROI estimates for different security investment levels */
  ROI_ESTIMATES: Record<ROIType, ROIData>;
  
  /** Get availability options (same as availabilityOptions property) */
  getAvailabilityOptions: () => Record<SecurityLevel, CIAOptionDetails>;
  
  /** Get integrity options (same as integrityOptions property) */
  getIntegrityOptions: () => Record<SecurityLevel, CIAOptionDetails>;
  
  /** Get confidentiality options (same as confidentialityOptions property) */
  getConfidentialityOptions: () => Record<SecurityLevel, CIAOptionDetails>;
  
  /** Get ROI estimates (same as ROI_ESTIMATES property) */
  getROIEstimates: () => Record<ROIType, ROIData>;
  
  /**
   * Get ROI type for a specific security level
   * @param level - Security level to get ROI type for
   * @returns Corresponding ROI type
   */
  getROIEstimateForSecurityLevel: (level: SecurityLevel) => ROIType;
  
  /**
   * Get combined ROI key based on CIA triad levels
   * @param confidentiality - Confidentiality level
   * @param integrity - Integrity level  
   * @param availability - Availability level
   * @returns ROI type based on highest security level
   */
  getCombinedROIKey: (
    confidentiality: SecurityLevel,
    integrity: SecurityLevel,
    availability: SecurityLevel
  ) => ROIType;
  
  /**
   * Get ROI data for a specific ROI type
   * @param key - ROI type key
   * @returns ROI data object
   */
  getROIDataForCombinedKey: (key: ROIType) => ROIData;
}

/**
 * Custom hook for accessing CIA security level options and ROI estimates
 * 
 * Provides comprehensive access to security level configurations including
 * availability, integrity, and confidentiality options with associated costs,
 * descriptions, and ROI estimates. This hook is essential for building
 * security configuration interfaces and cost calculators.
 * 
 * ## Features
 * - Pre-configured security level options for all CIA components
 * - Cost estimates (CAPEX and OPEX) for each security level
 * - ROI estimates and recommendations
 * - Utility functions for calculating combined security metrics
 * - Type-safe access to all configuration data
 * 
 * ## Usage Guidelines
 * - Use the options objects to populate security level selectors
 * - Reference cost data for budget planning and financial analysis
 * - Use ROI functions to calculate investment returns
 * - Combine with other hooks for complete security assessments
 * 
 * @returns Object containing CIA options, ROI estimates, and utility functions
 * 
 * @example
 * ```tsx
 * // Basic usage - accessing security level options
 * function SecurityLevelSelector() {
 *   const { availabilityOptions } = useCIAOptions();
 *   const [selected, setSelected] = useState<SecurityLevel>('Moderate');
 * 
 *   return (
 *     <select value={selected} onChange={(e) => setSelected(e.target.value as SecurityLevel)}>
 *       {Object.entries(availabilityOptions).map(([level, details]) => (
 *         <option key={level} value={level}>
 *           {level} - {details.description} (CAPEX: ${details.capex}, OPEX: ${details.opex})
 *         </option>
 *       ))}
 *     </select>
 *   );
 * }
 * ```
 * 
 * @example
 * ```tsx
 * // Advanced usage - calculating ROI
 * function ROICalculator() {
 *   const {
 *     getCombinedROIKey,
 *     getROIDataForCombinedKey
 *   } = useCIAOptions();
 * 
 *   const [levels, setLevels] = useState({
 *     confidentiality: 'High' as SecurityLevel,
 *     integrity: 'Very High' as SecurityLevel,
 *     availability: 'Moderate' as SecurityLevel
 *   });
 * 
 *   const roiKey = getCombinedROIKey(
 *     levels.confidentiality,
 *     levels.integrity,
 *     levels.availability
 *   );
 *   const roiData = getROIDataForCombinedKey(roiKey);
 * 
 *   return (
 *     <div>
 *       <h3>ROI Analysis</h3>
 *       <p>Return Rate: {roiData.returnRate}</p>
 *       <p>Recommendation: {roiData.recommendation}</p>
 *       <p>{roiData.description}</p>
 *     </div>
 *   );
 * }
 * ```
 * 
 * @example
 * ```tsx
 * // Cost comparison across security levels
 * function CostComparison() {
 *   const { availabilityOptions, integrityOptions, confidentialityOptions } = useCIAOptions();
 * 
 *   const calculateTotalCost = (level: SecurityLevel) => {
 *     const availCost = (availabilityOptions[level]?.capex || 0) + (availabilityOptions[level]?.opex || 0);
 *     const integrityCost = (integrityOptions[level]?.capex || 0) + (integrityOptions[level]?.opex || 0);
 *     const confCost = (confidentialityOptions[level]?.capex || 0) + (confidentialityOptions[level]?.opex || 0);
 *     return availCost + integrityCost + confCost;
 *   };
 * 
 *   return (
 *     <table>
 *       <thead>
 *         <tr><th>Level</th><th>Total Cost</th></tr>
 *       </thead>
 *       <tbody>
 *         {(['None', 'Low', 'Moderate', 'High', 'Very High'] as SecurityLevel[]).map(level => (
 *           <tr key={level}>
 *             <td>{level}</td>
 *             <td>${calculateTotalCost(level).toLocaleString()}</td>
 *           </tr>
 *         ))}
 *       </tbody>
 *     </table>
 *   );
 * }
 * ```
 */
export const useCIAOptions = (): UseCIAOptionsReturn => {
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
