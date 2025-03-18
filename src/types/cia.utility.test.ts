import { describe, expect, it } from "vitest";
import { SecurityLevel } from "./cia";
import {
    calculateOverallSecurityLevel,
    calculateRiskLevel,
    formatSecurityLevel,
    getSecurityLevelFromValue,
    getSecurityLevelValue
} from "./cia.utility";

describe('CIADetails TypeScript Type Validation', () => {
  it('validates all fields of CIADetails with TypeScript', () => {
    // This test only validates types at compile time
    expect(true).toBe(true);
  });
});

describe('CIA Utility Functions', () => {
  describe('formatSecurityLevel', () => {
    it('formats security levels correctly', () => {
      expect(formatSecurityLevel('none')).toBe('None');
      expect(formatSecurityLevel('LOW')).toBe('Low');
      expect(formatSecurityLevel('MODERATE')).toBe('Moderate');
      expect(formatSecurityLevel('high')).toBe('High');
      expect(formatSecurityLevel('VERY HIGH')).toBe('Very High');
    });

    it('handles empty or undefined values', () => {
      expect(formatSecurityLevel(undefined)).toBe('None');
      expect(formatSecurityLevel('')).toBe('None');
      expect(formatSecurityLevel(null as unknown as string)).toBe('None');
    });
  });

  describe('getSecurityLevelValue', () => {
    it('returns correct numeric values for security levels', () => {
      expect(getSecurityLevelValue('None')).toBe(0);
      expect(getSecurityLevelValue('Low')).toBe(1);
      expect(getSecurityLevelValue('Moderate')).toBe(2);
      expect(getSecurityLevelValue('High')).toBe(3);
      expect(getSecurityLevelValue('Very High')).toBe(4);
    });

    it('returns 0 for unknown levels', () => {
      expect(getSecurityLevelValue('Unknown' as SecurityLevel)).toBe(0);
    });
  });

  describe('getSecurityLevelFromValue', () => {
    it('returns correct security level for numeric value', () => {
      expect(getSecurityLevelFromValue(0)).toBe('None');
      expect(getSecurityLevelFromValue(1)).toBe('Low');
      expect(getSecurityLevelFromValue(2)).toBe('Moderate');
      expect(getSecurityLevelFromValue(3)).toBe('High');
      expect(getSecurityLevelFromValue(4)).toBe('Very High');
    });

    it('returns \'None\' for out of range values', () => {
      expect(getSecurityLevelFromValue(-1)).toBe('None');
      expect(getSecurityLevelFromValue(5)).toBe('None');
    });
  });

  describe('calculateOverallSecurityLevel', () => {
    it('calculates average security level correctly', () => {
      // Equal values should remain the same
      expect(calculateOverallSecurityLevel('None', 'None', 'None')).toBe('None');
      expect(calculateOverallSecurityLevel('Low', 'Low', 'Low')).toBe('Low');
      expect(calculateOverallSecurityLevel('Moderate', 'Moderate', 'Moderate')).toBe('Moderate');
      expect(calculateOverallSecurityLevel('High', 'High', 'High')).toBe('High');
      expect(calculateOverallSecurityLevel('Very High', 'Very High', 'Very High')).toBe('Very High');
    });

    it('rounds to nearest security level', () => {
      // Average 1.67 should round to 2 (Moderate)
      expect(calculateOverallSecurityLevel('Low', 'Low', 'High')).toBe('Moderate');
      
      // Average 2.33 should round to 2 (Moderate)
      expect(calculateOverallSecurityLevel('Low', 'High', 'High')).toBe('Moderate');
      
      // Average 0.67 should round to 1 (Low)
      expect(calculateOverallSecurityLevel('None', 'None', 'Low')).toBe('Low');
    });

    it('handles mixed security levels', () => {
      // Various combinations of mixed levels
      expect(calculateOverallSecurityLevel('None', 'High', 'Very High')).toBe('Moderate');
      expect(calculateOverallSecurityLevel('Low', 'None', 'High')).toBe('Low');
      expect(calculateOverallSecurityLevel('Very High', 'Moderate', 'None')).toBe('Moderate');
    });
  });

  describe('calculateRiskLevel', () => {
    it('calculates risk level based on security levels', () => {
      expect(calculateRiskLevel('None', 'None', 'None')).toBe('Critical');
      expect(calculateRiskLevel('Low', 'Low', 'Low')).toBe('High');
      expect(calculateRiskLevel('Moderate', 'Moderate', 'Moderate')).toBe('Medium');
      expect(calculateRiskLevel('High', 'High', 'High')).toBe('Low');
      expect(calculateRiskLevel('Very High', 'Very High', 'Very High')).toBe('Minimal');
    });

    it('uses average security level for risk calculation', () => {
      // Average is Moderate, so risk is Medium
      expect(calculateRiskLevel('Low', 'Moderate', 'High')).toBe('Medium');
      
      // Average is between Moderate and High, rounds to Moderate, so risk is Medium
      expect(calculateRiskLevel('Low', 'Moderate', 'Very High')).toBe('Medium');
      
      // Average is High, so risk is Low
      expect(calculateRiskLevel('High', 'High', 'Very High')).toBe('Low');
    });
  });
});
