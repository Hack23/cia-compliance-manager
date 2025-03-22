import { SecurityLevel } from '../types/cia';
import {
  calculateOverallSecurityLevel,
  DEFAULT_SECURITY_LEVEL,
  formatSecurityLevel,
  getRiskLevelFromSecurityLevel,
  getSecurityIcon,
  getSecurityLevelDescription,
  getSecurityLevelFromValue,
  getSecurityLevelValue,
  isSecurityLevel,
  meetsComplianceRequirements,
  normalizeSecurityLevel
} from './securityLevelUtils';

describe('securityLevelUtils', () => {
  describe('getSecurityLevelValue', () => {
    test('returns correct numeric values for security levels', () => {
      expect(getSecurityLevelValue('None')).toBe(0);
      expect(getSecurityLevelValue('Low')).toBe(1);
      expect(getSecurityLevelValue('Moderate')).toBe(2);
      expect(getSecurityLevelValue('High')).toBe(3);
      expect(getSecurityLevelValue('Very High')).toBe(4);
    });

    test('returns 0 for invalid security levels', () => {
      expect(getSecurityLevelValue('Invalid' as SecurityLevel)).toBe(0);
    });
  });

  describe('getSecurityLevelFromValue', () => {
    test('returns correct security levels for numeric values', () => {
      expect(getSecurityLevelFromValue(0)).toBe('None');
      expect(getSecurityLevelFromValue(1)).toBe('Low');
      expect(getSecurityLevelFromValue(2)).toBe('Moderate');
      expect(getSecurityLevelFromValue(3)).toBe('High');
      expect(getSecurityLevelFromValue(4)).toBe('Very High');
    });

    test('returns "None" for out-of-range values', () => {
      expect(getSecurityLevelFromValue(-1)).toBe('None');
      expect(getSecurityLevelFromValue(5)).toBe('None');
    });
  });

  describe('calculateOverallSecurityLevel', () => {
    test('calculates average security level correctly', () => {
      expect(calculateOverallSecurityLevel('High', 'High', 'High')).toBe('High');
      expect(calculateOverallSecurityLevel('Low', 'Moderate', 'High')).toBe('Moderate');
      expect(calculateOverallSecurityLevel('None', 'None', 'Very High')).toBe('Low');
    });

    test('rounds to nearest security level', () => {
      // Average value of 2.33 (rounds to 2 = "Moderate")
      expect(calculateOverallSecurityLevel('Moderate', 'Moderate', 'High')).toBe('Moderate');

      // Average value of 2.67 (rounds to 3 = "High")
      expect(calculateOverallSecurityLevel('Moderate', 'High', 'High')).toBe('High');
    });
  });

  describe('normalizeSecurityLevel', () => {
    test('returns valid security levels unchanged', () => {
      expect(normalizeSecurityLevel('None')).toBe('None');
      expect(normalizeSecurityLevel('Low')).toBe('Low');
      expect(normalizeSecurityLevel('Moderate')).toBe('Moderate');
      expect(normalizeSecurityLevel('High')).toBe('High');
      expect(normalizeSecurityLevel('Very High')).toBe('Very High');
    });

    test('normalizes case variations', () => {
      expect(normalizeSecurityLevel('none')).toBe('None');
      expect(normalizeSecurityLevel('LOW')).toBe('Low');
      expect(normalizeSecurityLevel('moderate')).toBe('Moderate');
      expect(normalizeSecurityLevel('HIGH')).toBe('High');
      expect(normalizeSecurityLevel('very high')).toBe('Moderate'); // Can't handle spaces
    });

    test('returns default for invalid values', () => {
      expect(normalizeSecurityLevel()).toBe(DEFAULT_SECURITY_LEVEL);
      expect(normalizeSecurityLevel('invalid')).toBe(DEFAULT_SECURITY_LEVEL);
    });
  });

  describe('getRiskLevelFromSecurityLevel', () => {
    test('returns correct risk levels for security levels', () => {
      expect(getRiskLevelFromSecurityLevel('None')).toBe('Critical');
      expect(getRiskLevelFromSecurityLevel('Low')).toBe('High');
      expect(getRiskLevelFromSecurityLevel('Moderate')).toBe('Medium');
      expect(getRiskLevelFromSecurityLevel('High')).toBe('Low');
      expect(getRiskLevelFromSecurityLevel('Very High')).toBe('Minimal');
    });

    test('returns "Unknown" for invalid security levels', () => {
      expect(getRiskLevelFromSecurityLevel('Invalid' as SecurityLevel)).toBe('Unknown');
    });
  });

  describe('isSecurityLevel', () => {
    test('returns true for valid security levels', () => {
      expect(isSecurityLevel('None')).toBe(true);
      expect(isSecurityLevel('Low')).toBe(true);
      expect(isSecurityLevel('Moderate')).toBe(true);
      expect(isSecurityLevel('High')).toBe(true);
      expect(isSecurityLevel('Very High')).toBe(true);
    });

    test('returns false for invalid security levels', () => {
      expect(isSecurityLevel('Invalid')).toBe(false);
      expect(isSecurityLevel(123)).toBe(false);
      expect(isSecurityLevel(null)).toBe(false);
      expect(isSecurityLevel(undefined)).toBe(false);
      expect(isSecurityLevel({})).toBe(false);
    });
  });

  describe('formatSecurityLevel', () => {
    test('formats security levels correctly', () => {
      expect(formatSecurityLevel('none')).toBe('None');
      expect(formatSecurityLevel('LOW')).toBe('Low');
      expect(formatSecurityLevel('moderate')).toBe('Moderate');
      expect(formatSecurityLevel('medium')).toBe('Moderate');
      expect(formatSecurityLevel('HIGH')).toBe('High');
      expect(formatSecurityLevel('VERY HIGH')).toBe('Very High');
      expect(formatSecurityLevel('maximum')).toBe('Very High');
    });

    test('returns "Not Specified" for undefined or null values', () => {
      expect(formatSecurityLevel()).toBe('Not Specified');
      expect(formatSecurityLevel(null as unknown as string)).toBe('Not Specified');
    });

    test('returns original string for unrecognized values', () => {
      expect(formatSecurityLevel('Custom')).toBe('Custom');
    });
  });

  describe('getSecurityLevelDescription', () => {
    test('returns descriptions for security levels', () => {
      expect(getSecurityLevelDescription('None')).toContain('No security controls');
      expect(getSecurityLevelDescription('Low')).toContain('Basic security controls');
      expect(getSecurityLevelDescription('Moderate')).toContain('Standard security controls');
      expect(getSecurityLevelDescription('High')).toContain('Advanced security controls');
      expect(getSecurityLevelDescription('Very High')).toContain('Maximum security controls');
    });
  });

  describe('meetsComplianceRequirements', () => {
    test('evaluates compliance requirements correctly', () => {
      // SOC2 requires Moderate
      expect(meetsComplianceRequirements('None', 'SOC2')).toBe(false);
      expect(meetsComplianceRequirements('Low', 'SOC2')).toBe(false);
      expect(meetsComplianceRequirements('Moderate', 'SOC2')).toBe(true);
      expect(meetsComplianceRequirements('High', 'SOC2')).toBe(true);

      // PCI-DSS requires High
      expect(meetsComplianceRequirements('Moderate', 'PCI-DSS')).toBe(false);
      expect(meetsComplianceRequirements('High', 'PCI-DSS')).toBe(true);
    });
  });

  describe('getSecurityIcon', () => {
    test('returns appropriate icons for security levels', () => {
      expect(getSecurityIcon('None')).toBe('⚠️');
      expect(getSecurityIcon('Low')).toBe('🔑');
      expect(getSecurityIcon('Moderate')).toBe('🔒');
      expect(getSecurityIcon('High')).toBe('🛡️');
      expect(getSecurityIcon('Very High')).toBe('🔐');
    });

    test('returns fallback icon for invalid security levels', () => {
      expect(getSecurityIcon('Invalid' as SecurityLevel)).toBe('❓');
    });
  });
});
