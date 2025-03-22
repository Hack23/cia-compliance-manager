import { ROIEstimatesMap } from "../../types/cia-services";

/**
 * Return on investment estimates for different security levels
 *
 * ## Business Perspective
 *
 * These estimates help organizations understand the potential business value
 * of different security investments, supporting decision-making with quantified
 * return projections and payback periods. 💰
 */
const roiEstimatesData: ROIEstimatesMap = {
  NONE: {
    returnRate: "0%",
    value: "0%", // For backward compatibility
    description: "No ROI without security investment",
    potentialSavings: "$0",
    breakEvenPeriod: "N/A",
  },
  LOW: {
    returnRate: "50-100%",
    value: "50-100%", // For backward compatibility
    description:
      "Basic security measures provide minimal protection with moderate return",
    potentialSavings: "$5K-$10K annually",
    breakEvenPeriod: "12-18 months",
  },
  MODERATE: {
    returnRate: "100-200%",
    value: "100-200%", // For backward compatibility
    description:
      "Balanced security approach delivers positive returns for most organizations",
    potentialSavings: "$10K-$25K annually",
    breakEvenPeriod: "6-12 months",
  },
  HIGH: {
    returnRate: "200-300%",
    value: "200-300%", // For backward compatibility
    description:
      "Strong security posture provides excellent returns for organizations with sensitive data or operations",
    potentialSavings: "$20K-$50K annually",
    breakEvenPeriod: "3-6 months",
  },
  VERY_HIGH: {
    returnRate: "300-500%",
    value: "300-500%", // For backward compatibility
    description:
      "Maximum security investment delivers highest potential returns for organizations in regulated industries or handling critical data",
    potentialSavings: "$30K-$70K annually",
    breakEvenPeriod: "2-4 months",
  },
};

export default roiEstimatesData;
