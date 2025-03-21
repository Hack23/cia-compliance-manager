/**
 * Security-specific test utilities for CIA Compliance Manager.
 *
 * @packageDocumentation
 */

import { vi } from "vitest";
import { SecurityLevel } from "../../types/cia";
import { TEST_CIA_OPTIONS } from "../testUtils/testData";

/**
 * Creates mock security level state with standard values
 */
export function createMockSecurityLevelState() {
  return {
    availabilityLevel: "Moderate" as SecurityLevel,
    integrityLevel: "Moderate" as SecurityLevel,
    confidentialityLevel: "Moderate" as SecurityLevel,
    setAvailabilityLevel: vi.fn(),
    setIntegrityLevel: vi.fn(),
    setConfidentialityLevel: vi.fn(),
  };
}

/**
 * Standard test data for security levels
 */
export const TEST_SECURITY_LEVELS: SecurityLevel[] = [
  "None",
  "Low",
  "Moderate",
  "High",
  "Very High",
];

/**
 * Converts a string value to SecurityLevel type
 * @param level String value to convert
 * @returns The value as a SecurityLevel type
 */
export function toSecurityLevel(level: string): SecurityLevel {
  return level as SecurityLevel;
}

/**
 * Gets the numerical value for a security level
 * @param level Security level to convert
 * @returns Number from 0-4 representing the level
 */
export function getSecurityLevelValue(level: SecurityLevel): number {
  const values: Record<SecurityLevel, number> = {
    None: 0,
    Low: 1,
    Moderate: 2,
    High: 3,
    "Very High": 4,
  };
  return values[level] || 0;
}

/**
 * Creates test props with set security levels
 * @param availabilityLevel Availability level
 * @param integrityLevel Integrity level
 * @param confidentialityLevel Confidentiality level
 * @returns Props object with set security levels
 */
export function createSecurityLevelProps(
  availabilityLevel: SecurityLevel = "Moderate",
  integrityLevel: SecurityLevel = "Moderate",
  confidentialityLevel: SecurityLevel = "Moderate"
) {
  return {
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
    setAvailabilityLevel: vi.fn(),
    setIntegrityLevel: vi.fn(),
    setConfidentialityLevel: vi.fn(),
  };
}

// Re-export CIA test options for convenience
export { TEST_CIA_OPTIONS };
