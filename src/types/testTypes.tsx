// Test-specific type definitions
import { SecurityLevel } from "./cia";

// Type for mock options creation
export interface MockOptions {
  description: string;
  technical: string;
  impact?: string;
  capex: number;
  opex: number;
  bg?: string;
  text?: string;
  recommendations?: string[];
}

// Type for mock handlers
export interface MockHandlers {
  setAvailability: (level: SecurityLevel) => void;
  setIntegrity: (level: SecurityLevel) => void;
  setConfidentiality: (level: SecurityLevel) => void;
}

// Type for test wrapper components
export interface TestWrapperProps {
  children: React.ReactNode;
}

// Type for test data
export interface TestData {
  securityLevels: Record<string, string>;
  descriptions: Record<string, string>;
  options: Record<string, any>;
}
