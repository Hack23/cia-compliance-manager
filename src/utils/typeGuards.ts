import { SecurityLevel } from "../types/cia";
import {
  BusinessImpactDetails,
  CIAComponentType,
  CIADetails,
  ROIEstimate
} from "../types/cia-services";
import {
  AvailabilityDetail,
  CIAImpactSummaryWidgetProps,
  ConfidentialityDetail,
  IntegrityDetail,
  SecurityLevelWidgetProps,
  WidgetBaseProps
} from "../types/widgets";
import { parseRiskLevel as parseRiskLevelFromUtils } from "./riskUtils";

/**
 * Type guard utilities for the CIA compliance manager
 *
 * These utilities ensure type safety when working with domain-specific types.
 */

/**
 * Type guard to check if an object is an AvailabilityDetail
 */
export function isAvailabilityDetail(obj: unknown): obj is AvailabilityDetail {
  if (!obj || typeof obj !== "object") return false;

  const detail = obj as Partial<AvailabilityDetail>;
  return (
    typeof detail.description === "string" &&
    typeof detail.businessImpact === "string" &&
    typeof detail.uptime === "string" &&
    Array.isArray(detail.recommendations)
  );
}

/**
 * Type guard to check if an object is an IntegrityDetail
 */
export function isIntegrityDetail(obj: unknown): obj is IntegrityDetail {
  if (!obj || typeof obj !== "object") return false;

  const detail = obj as Partial<IntegrityDetail>;
  return (
    typeof detail.description === "string" &&
    typeof detail.businessImpact === "string" &&
    Array.isArray(detail.recommendations)
  );
}

/**
 * Type guard to check if an object is a ConfidentialityDetail
 */
export function isConfidentialityDetail(
  obj: unknown
): obj is ConfidentialityDetail {
  if (!obj || typeof obj !== "object") return false;

  const detail = obj as Partial<ConfidentialityDetail>;
  return (
    typeof detail.impact === "string" &&
    typeof detail.businessImpact === "string" &&
    Array.isArray(detail.recommendations)
  );
}

/**
 * Type guard to check if a CIA detail object exists
 */
export function isValidCIADetail(
  detail: CIADetails | undefined | null
): detail is CIADetails {
  return detail !== undefined && detail !== null;
}

/**
 * Type guard to check if a value is a non-null object
 */
export function isObject(
  value: unknown
): value is Record<string | number | symbol, unknown> {
  return typeof value === "object" && value !== null;
}

/**
 * Type guard to check if a value is a string
 */
export function isString(value: unknown): value is string {
  return typeof value === "string";
}

/**
 * Type guard to check if a value is a number
 */
export function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

/**
 * Safely access a nested property in an object using a dot notation path
 * @param obj The object to access
 * @param path The path to the property, e.g. 'a.b.c' or 'a[0].b.c'
 * @param defaultValue The default value to return if the property doesn't exist
 * @returns The value at the path or the default value
 */
export function safeAccess<T = any>(
  obj: any,
  path: string | (string | number)[],
  defaultValue?: T
): T {
  if (obj == null) {
    return defaultValue as T;
  }

  const parts = Array.isArray(path)
    ? path
    : path.replace(/\[(\d+)\]/g, ".$1").split(".");

  let current = obj;

  for (const part of parts) {
    if (current == null || typeof current !== "object") {
      return defaultValue as T;
    }

    current = current[part];
  }

  return current !== undefined && current !== null
    ? current
    : (defaultValue as T);
}

/**
 * Ensures value is an array, or converts it to one if not
 */
export function ensureArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : value ? [value] : [];
}

/**
 * Safely converts string to number, with a fallback value if conversion fails
 */
export function safeNumberConversion(
  value: string | number | undefined,
  fallback = 0
): number {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    return isNaN(parsed) ? fallback : parsed;
  }
  return fallback;
}

/**
 * Helper function to safely access CIA options with string keys
 * @param options The options object to access
 * @param key The string key that should be treated as SecurityLevel
 * @returns The option value or undefined if not found
 */
export function getSecurityLevelOption<T>(
  options: Record<SecurityLevel, T>,
  key: string | undefined
): T | undefined {
  // Default to "None" if key is undefined
  const safeKey = key || "None";

  // Check if the key is a valid SecurityLevel
  if (
    safeKey === "None" ||
    safeKey === "Low" ||
    safeKey === "Moderate" ||
    safeKey === "High" ||
    safeKey === "Very High"
  ) {
    return options[safeKey as SecurityLevel];
  }
  return undefined;
}

/**
 * Helper function to check if an object has a property
 * @param obj The object to check
 * @param prop The property to check for
 * @returns True if the object has the property
 */
export function hasProperty(obj: any, prop: string): boolean {
  return Boolean(obj && Object.prototype.hasOwnProperty.call(obj, prop));
}

/**
 * Type guard for ROI metrics objects
 * @param value - The value to check
 * @returns True if the value is a valid ROI metrics object
 */
export function isROIMetrics(value: any): boolean {
  return (
    isObject(value) &&
    typeof value.returnRate === "string" &&
    typeof value.description === "string"
  );
}

/**
 * Type guard for technical implementation details
 * @param value - The value to check
 * @returns True if the value is a valid technical implementation details object
 */
export function isTechnicalImplementationDetails(value: any): boolean {
  return (
    isObject(value) &&
    typeof value.description === "string" &&
    Array.isArray(value.implementationSteps) &&
    isObject(value.effort) &&
    typeof value.effort.development === "string" &&
    typeof value.effort.maintenance === "string" &&
    typeof value.effort.expertise === "string"
  );
}

/**
 * Type guard for security resource objects
 * @param value - The value to check
 * @returns True if the value is a valid security resource object
 */
export function isSecurityResource(value: any): boolean {
  return (
    isObject(value) &&
    typeof value.title === "string" &&
    typeof value.description === "string" &&
    typeof value.url === "string" &&
    typeof value.category === "string" &&
    Array.isArray(value.tags) &&
    typeof value.relevanceScore === "number" &&
    typeof value.type === "string"
  );
}

/**
 * Type guard for basic widget props
 * @param value - The value to check
 * @returns True if the value has the required widget properties
 */
export function hasWidgetProps(value: any): boolean {
  return (
    isObject(value) &&
    typeof value.title === "string" &&
    typeof value.description === "string" &&
    typeof value.icon === "string"
  );
}

/**
 * Checks if an object is a valid security profile
 */
export function isSecurityProfile(obj: any): boolean {
  if (!isObject(obj)) return false;
  return (
    hasProperty(obj, "availability") &&
    hasProperty(obj, "integrity") &&
    hasProperty(obj, "confidentiality") &&
    hasProperty(obj, "overall")
  );
}

/**
 * Checks if an object is a valid compliance status
 * 
 * @param obj - Object to check
 * @returns True if the object is a valid compliance status
 */
export function isComplianceStatus(obj: any): boolean {
  if (!obj || typeof obj !== 'object') return false;
  
  // Check for required array properties
  if (!Array.isArray(obj.compliantFrameworks)) return false;
  if (!Array.isArray(obj.partiallyCompliantFrameworks)) return false;
  if (!Array.isArray(obj.nonCompliantFrameworks)) return false;
  
  // Optional properties can be undefined but must be arrays if present
  if (obj.remediationSteps !== undefined && !Array.isArray(obj.remediationSteps)) return false;
  if (obj.requirements !== undefined && !Array.isArray(obj.requirements)) return false;
  
  // Status and complianceScore/score are also acceptable properties
  if (obj.status !== undefined && typeof obj.status !== 'string') return false;
  if (obj.complianceScore !== undefined && typeof obj.complianceScore !== 'number') return false;
  if (obj.score !== undefined && typeof obj.score !== 'number') return false;
  
  return true;
}

/**
 * Checks if an object is a valid compliance framework
 * 
 * @param obj - Object to check
 * @returns True if the object is a valid compliance framework
 */
export function isComplianceFramework(obj: any): boolean {
  if (!obj) {
    return false;
  }

  // If it's a string, it's a simple framework name
  if (typeof obj === "string") {
    return true;
  }

  // If it's an object, it should have the required properties
  if (typeof obj !== "object") {
    return false;
  }

  // Check for required properties - name must be a string
  if (!hasProperty(obj, "name") || typeof obj.name !== 'string') {
    return false;
  }
  
  // If it has description and security level requirements, check those properties
  if (hasProperty(obj, "description") && typeof obj.description !== 'string') {
    return false;
  }
  
  if (hasProperty(obj, "requiredAvailabilityLevel")) {
    if (!isSecurityLevel(obj.requiredAvailabilityLevel)) return false;
  }
  
  if (hasProperty(obj, "requiredIntegrityLevel")) {
    if (!isSecurityLevel(obj.requiredIntegrityLevel)) return false;
  }
  
  if (hasProperty(obj, "requiredConfidentialityLevel")) {
    if (!isSecurityLevel(obj.requiredConfidentialityLevel)) return false;
  }
  
  // If it has status property (for test compatibility)
  if (hasProperty(obj, "status") && typeof obj.status !== 'string') return false;
  
  return true;
}

/**
 * Checks if an object is a valid ROI metric details object
 */
export function isROIMetricDetails(obj: any): boolean {
  if (!isObject(obj)) return false;
  return (
    hasProperty(obj, "amount") &&
    isString(obj.amount) &&
    hasProperty(obj, "percentage") &&
    isString(obj.percentage) &&
    hasProperty(obj, "timeframe") &&
    isString(obj.timeframe)
  );
}

/**
 * Type guard utilities for the CIA compliance manager
 *
 * These utilities ensure type safety when working with domain-specific types.
 */

/**
 * Type guard for SecurityLevel
 *
 * @param value - Value to check
 * @returns True if the value is a valid SecurityLevel
 */
export function isSecurityLevel(value: unknown): value is SecurityLevel {
  return (
    typeof value === "string" &&
    ["None", "Low", "Moderate", "High", "Very High"].includes(value)
  );
}

/**
 * Type guard for CIAComponentType
 *
 * @param value - Value to check
 * @returns True if the value is a valid CIAComponentType
 */
export function isCIAComponentType(value: unknown): value is CIAComponentType {
  return (
    typeof value === "string" &&
    ["confidentiality", "integrity", "availability"].includes(value)
  );
}

/**
 * Type guard for CIADetails
 *
 * @param value - Value to check
 * @returns True if the value has the required properties of CIADetails
 */
export function isCIADetails(value: unknown): value is CIADetails {
  if (!value || typeof value !== "object") return false;

  const obj = value as Record<string, unknown>;

  // Check for required fields
  return (
    typeof obj.description === "string" &&
    typeof obj.technical === "string" &&
    typeof obj.businessImpact === "string" &&
    typeof obj.capex === "number" &&
    typeof obj.opex === "number" &&
    typeof obj.bg === "string" &&
    typeof obj.text === "string" &&
    Array.isArray(obj.recommendations)
  );
}

/**
 * Type guard for checking if a value is a valid widget props object
 * @param value - The value to check
 * @returns True if the value is a valid widget props object
 */
export function isWidgetProps(value: unknown): value is WidgetBaseProps {
  return (
    isObject(value) &&
    (typeof value.className === "undefined" || typeof value.className === "string") &&
    (typeof value.testId === "undefined" || typeof value.testId === "string")
  );
}

/**
 * Type guard for checking if a value is a SecurityLevelWidgetProps
 * @param value - The value to check
 * @returns True if the value is a valid SecurityLevelWidgetProps
 */
export function isSecurityLevelWidgetProps(value: unknown): value is SecurityLevelWidgetProps {
  if (!isWidgetProps(value)) return false;
  
  const val = value as any; // Use any temporarily for property checking
  
  // Check for the additional required properties
  return (
    hasProperty(val, "availabilityLevel") && isSecurityLevel(val.availabilityLevel) &&
    hasProperty(val, "integrityLevel") && isSecurityLevel(val.integrityLevel) &&
    hasProperty(val, "confidentialityLevel") && isSecurityLevel(val.confidentialityLevel)
  );
}

/**
 * Type guard for CIAImpactSummaryWidgetProps
 * @param value - The value to check
 * @returns True if the value is a valid CIAImpactSummaryWidgetProps
 */
export function isCIAImpactSummaryWidgetProps(value: unknown): value is CIAImpactSummaryWidgetProps {
  if (!isWidgetProps(value)) return false;
  
  const val = value as any; // Use any temporarily for property checking
  
  // Check for the additional required properties
  return (
    hasProperty(val, "availabilityLevel") && isSecurityLevel(val.availabilityLevel) &&
    hasProperty(val, "integrityLevel") && isSecurityLevel(val.integrityLevel) &&
    hasProperty(val, "confidentialityLevel") && isSecurityLevel(val.confidentialityLevel)
  );
}

/**
 * Type guard for BusinessImpactDetails
 * @param value - The value to check
 * @returns True if the value is a valid BusinessImpactDetails
 */
export function isBusinessImpactDetails(value: unknown): value is BusinessImpactDetails {
  if (!isObject(value)) return false;
  
  // Check for required summary property
  if (typeof value.summary !== "string") return false;
  
  // Check for at least one impact category
  const hasAnyImpact = [
    'financial', 'operational', 'reputational', 'strategic', 'regulatory',
    'financialImpact', 'operationalImpact', 'reputationalImpact'
  ].some(prop => hasProperty(value, prop) && isObject(value[prop]));
  
  return hasAnyImpact;
}

/**
 * Type guard for ROI estimate
 * @param value - The value to check
 * @returns True if the value is a valid ROI estimate
 */
export function isROIEstimate(value: unknown): value is ROIEstimate {
  return (
    isObject(value) &&
    typeof value.returnRate === "string" &&
    typeof value.description === "string"
  );
}

/**
 * Checks if an object is a valid widget config
 */
export function isWidgetConfig(obj: any): boolean {
  if (!isObject(obj)) return false;
  return hasProperty(obj, "type") && isString(obj.type);
}

/**
 * Checks if an object has a specific tag value
 */
export function hasTagValue(obj: any, tagValue: string): boolean {
  if (!isObject(obj) || !hasProperty(obj, "tags") || !Array.isArray(obj.tags)) {
    return false;
  }
  return obj.tags.includes(tagValue);
}

/**
 * Parses a risk level string to a number
 * @deprecated Use parseRiskLevel from riskUtils instead for consistent behavior
 * @param level - Risk level string to parse
 * @returns Numeric value of the risk level (0-4)
 */
export function parseRiskLevel(level: string | null | undefined): number {
  // Import the implementation from riskUtils for consistency
  return parseRiskLevelFromUtils(level);
}

/**
 * Extracts CIA security levels from an object
 */
export function extractSecurityLevels(obj: any): {
  availability: string;
  integrity: string;
  confidentiality: string;
} {
  if (!isObject(obj)) {
    return {
      availability: "None",
      integrity: "None",
      confidentiality: "None",
    };
  }

  return {
    availability: String(obj.availability || "None"),
    integrity: String(obj.integrity || "None"),
    confidentiality: String(obj.confidentiality || "None"),
  };
}

/**
 * Calculates the implementation cost from a cost object
 */
export function getImplementationCost(costObj: any): number {
  if (!isObject(costObj)) return 0;

  let total = 0;
  if (hasProperty(costObj, "capex") && isNumber(costObj.capex)) {
    total += costObj.capex;
  }
  if (hasProperty(costObj, "opex") && isNumber(costObj.opex)) {
    total += costObj.opex;
  }
  if (hasProperty(costObj, "fte") && isNumber(costObj.fte)) {
    total += costObj.fte * 100000; // Assuming $100k per FTE
  }
  return total;
}
