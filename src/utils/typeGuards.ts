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
