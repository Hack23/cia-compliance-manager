import { CIADetails, SecurityLevel } from "../types/cia"; // Added SecurityLevel import
import {
  AvailabilityDetail,
  ConfidentialityDetail,
  IntegrityDetail,
} from "../types/widgets";

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
 * New alias for backward compatibility
 */
export function isCIADetails(obj: unknown): obj is CIADetails {
  if (!obj || typeof obj !== "object") return false;

  const details = obj as Partial<CIADetails>;
  return (
    (typeof details.description === "string" ||
      details.description === undefined) &&
    (typeof details.businessImpact === "string" ||
      details.businessImpact === undefined)
  );
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
 */
export function isComplianceStatus(obj: any): boolean {
  if (!isObject(obj)) return false;
  return (
    hasProperty(obj, "framework") &&
    hasProperty(obj, "status") &&
    hasProperty(obj, "details")
  );
}

/**
 * Checks if an object is a valid compliance framework
 */
export function isComplianceFramework(obj: any): boolean {
  if (!isObject(obj)) return false;
  return (
    hasProperty(obj, "id") &&
    hasProperty(obj, "name") &&
    hasProperty(obj, "version") &&
    hasProperty(obj, "controls")
  );
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
 */
export function parseRiskLevel(level: string | null | undefined): number {
  if (!level) return 0;

  const numValue = parseInt(level, 10);
  if (!isNaN(numValue)) return numValue;

  // Map common risk level strings to numbers
  const levelLower = level.toLowerCase();
  if (levelLower.includes("high")) return 3;
  if (levelLower.includes("medium") || levelLower.includes("moderate"))
    return 2;
  if (levelLower.includes("low")) return 1;
  return 0;
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
