import { vi } from "vitest";
import { SECURITY_LEVELS } from "../constants/appConstants";

/**
 * Interface defining the structure for mock options
 */
interface MockOptions {
  description: string;
  technical: string;
  impact: string;
  capex: number;
  opex: number;
  bg: string;
  text: string;
  recommendations: string[];
}

/**
 * Interface for mock event handlers
 */
interface MockHandlers {
  setAvailability: ReturnType<typeof vi.fn>;
  setIntegrity: ReturnType<typeof vi.fn>;
  setConfidentiality: ReturnType<typeof vi.fn>;
}

/**
 * Creates mock options for test cases
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
      return 35;
    case SECURITY_LEVELS.MODERATE:
      return 20;
    case SECURITY_LEVELS.LOW:
      return 10;
    default:
      return 0;
  }
};

const getDefaultColor = (level: string): string => {
  switch (level) {
    case SECURITY_LEVELS.VERY_HIGH:
      return "#FF5733"; // Orange-red
    case SECURITY_LEVELS.HIGH:
      return "#FFC300"; // Amber
    case SECURITY_LEVELS.MODERATE:
      return "#DAF7A6"; // Light green
    case SECURITY_LEVELS.LOW:
      return "#C7F9CC"; // Very light green
    default:
      return "#F8F9FA"; // Light gray
  }
};

const mockFactory = {
  createMockOptions,
  createMockHandlers,
};

export default mockFactory;
