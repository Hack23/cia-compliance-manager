import { vi } from "vitest";
import { SECURITY_LEVELS } from "../constants";
import type { SecurityLevel } from "../types/cia";
import type { MockOptions, MockHandlers } from "../types/testTypes";

/**
 * Creates mock CIA options for testing components
 *
 * @param levels Array of security levels to include in the mock
 * @param customValues Optional custom values for specific fields
 * @returns Mocked options object
 */
export const createMockOptions = (
  levels: string[] = Object.values(SECURITY_LEVELS),
  customValues: Partial<Record<string, Partial<MockOptions>>> = {}
): Record<string, MockOptions> => {
  const options: Record<string, MockOptions> = {};

  levels.forEach((level) => {
    const baseOptions: MockOptions = {
      description: `${level} level description`,
      technical: `${level} level technical details`,
      impact: `${level} level impact`,
      capex: getDefaultCapex(level),
      opex: getDefaultOpex(level),
      bg: getDefaultColor(level),
      text: "#ffffff",
      recommendations: [`${level} recommendation`],
    };

    options[level] = {
      ...baseOptions,
      ...customValues[level],
    };
  });

  return options;
};

/**
 * Creates mock event handlers for component testing
 *
 * @returns Object with mock functions for availability, integrity, and confidentiality
 */
export const createMockHandlers = (): MockHandlers => {
  return {
    setAvailability: vi.fn(),
    setIntegrity: vi.fn(),
    setConfidentiality: vi.fn(),
  };
};

/**
 * Helper functions for default values
 */
const getDefaultCapex = (level: string): number => {
  switch (level) {
    case SECURITY_LEVELS.VERY_HIGH:
      return 60;
    case SECURITY_LEVELS.HIGH:
      return 30;
    case SECURITY_LEVELS.MODERATE:
      return 15;
    case SECURITY_LEVELS.LOW:
      return 5;
    default:
      return 0;
  }
};

const getDefaultOpex = (level: string): number => {
  switch (level) {
    case SECURITY_LEVELS.VERY_HIGH:
      return 70;
    case SECURITY_LEVELS.HIGH:
      return 40;
    case SECURITY_LEVELS.MODERATE:
      return 15;
    case SECURITY_LEVELS.LOW:
      return 5;
    default:
      return 0;
  }
};

const getDefaultColor = (level: string): string => {
  switch (level) {
    case SECURITY_LEVELS.VERY_HIGH:
      return "#3498db";
    case SECURITY_LEVELS.HIGH:
      return "#2ecc71";
    case SECURITY_LEVELS.MODERATE:
      return "#f1c40f";
    case SECURITY_LEVELS.LOW:
      return "#f39c12";
    default:
      return "#e74c3c";
  }
};

export default {
  createMockOptions,
  createMockHandlers,
};
