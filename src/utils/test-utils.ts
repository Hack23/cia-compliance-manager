import { SecurityLevel } from "../types/cia";

// ... existing code ...

/**
 * Create mock security levels for testing
 *
 * @param overrides - Override specific security levels
 * @returns Security levels object
 */
export function createMockSecurityLevels(
  overrides: {
    availabilityLevel?: SecurityLevel;
    integrityLevel?: SecurityLevel;
    confidentialityLevel?: SecurityLevel;
  } = {}
) {
  return {
    availabilityLevel: "Moderate" as SecurityLevel,
    integrityLevel: "Moderate" as SecurityLevel,
    confidentialityLevel: "Moderate" as SecurityLevel,
    ...overrides, // Apply overrides correctly
  };
}

// ... existing code ...
