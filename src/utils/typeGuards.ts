/**
 * Type guard utilities for CIA compliance types
 *
 * Provides runtime type checking functions for use with TypeScript
 * type narrowing. These guards enable safe casting and validation.
 *
 * @module
 */

import { SecurityLevel } from "../types/cia";
import { CIAComponentType } from "../types/cia-services";

/**
 * Valid security level strings
 */
const VALID_SECURITY_LEVELS: SecurityLevel[] = [
  "None",
  "Low",
  "Moderate",
  "High",
  "Very High",
];

/**
 * Check if a value is null or undefined
 *
 * @param value - Value to check
 * @returns True if the value is null or undefined
 *
 * @example
 * ```typescript
 * isNullish(null)      // true
 * isNullish(undefined) // true
 * isNullish(0)         // false
 * isNullish('')        // false
 * ```
 */
export function isNullish(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

/**
 * Check if a value is a non-empty string
 *
 * @param value - Value to check
 * @returns True if the value is a non-empty string
 *
 * @example
 * ```typescript
 * isNonEmptyString('hello') // true
 * isNonEmptyString('')      // false
 * isNonEmptyString(null)    // false
 * ```
 */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Check if a value is a valid SecurityLevel
 *
 * @param value - Value to check
 * @returns True if the value is a valid SecurityLevel
 *
 * @example
 * ```typescript
 * isValidSecurityLevel('High')     // true
 * isValidSecurityLevel('Invalid')  // false
 * isValidSecurityLevel(null)       // false
 * ```
 */
export function isValidSecurityLevel(value: unknown): value is SecurityLevel {
  if (typeof value !== "string") {
    return false;
  }
  return VALID_SECURITY_LEVELS.includes(value as SecurityLevel);
}

/**
 * Check if a value is a valid CIAComponentType
 *
 * @param value - Value to check
 * @returns True if the value is a valid CIAComponentType
 *
 * @example
 * ```typescript
 * isValidCIAComponent('availability')    // true
 * isValidCIAComponent('confidentiality') // true
 * isValidCIAComponent('invalid')         // false
 * ```
 */
export function isValidCIAComponent(value: unknown): value is CIAComponentType {
  if (typeof value !== "string") {
    return false;
  }
  return ["availability", "integrity", "confidentiality"].includes(value);
}

/**
 * Check if a value is a plain object (not null, array, or primitive)
 *
 * @param value - Value to check
 * @returns True if the value is a plain object
 *
 * @example
 * ```typescript
 * isPlainObject({})           // true
 * isPlainObject({ a: 1 })    // true
 * isPlainObject([])           // false
 * isPlainObject(null)         // false
 * ```
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Object.prototype.toString.call(value) === "[object Object]"
  );
}

/**
 * Check if a value is a finite number
 *
 * @param value - Value to check
 * @returns True if the value is a finite number
 *
 * @example
 * ```typescript
 * isFiniteNumber(42)        // true
 * isFiniteNumber(Infinity)  // false
 * isFiniteNumber('42')      // false
 * ```
 */
export function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

/**
 * Assert that a value is defined (not null or undefined)
 *
 * @param value - Value to assert
 * @param message - Optional error message
 * @throws Error if the value is null or undefined
 *
 * @example
 * ```typescript
 * assertDefined(someValue, 'Value must be defined');
 * ```
 */
export function assertDefined<T>(
  value: T | null | undefined,
  message = "Value is null or undefined"
): asserts value is T {
  if (isNullish(value)) {
    throw new Error(message);
  }
}
