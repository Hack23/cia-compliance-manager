import { describe, it, expect } from 'vitest';
import {
  getDefaultDevelopmentEffort,
  getDefaultMaintenanceEffort,
  getDefaultExpertiseLevel,
  getInformationSensitivity,
  getProtectionLevel
} from './securityDefaults';
import { SecurityLevel } from '../types/cia';

describe('Security Defaults Utils', () => {
  describe('getDefaultDevelopmentEffort', () => {
    it('returns correct development effort for each security level', () => {
      expect(getDefaultDevelopmentEffort('None')).toBe('None');
      expect(getDefaultDevelopmentEffort('Low')).toBe('Days (1-5)');
      expect(getDefaultDevelopmentEffort('Moderate')).toBe('Weeks (2-4)');
      expect(getDefaultDevelopmentEffort('High')).toBe('Months (1-3)');
      expect(getDefaultDevelopmentEffort('Very High')).toBe('Months (3+)');
    });

    it('returns default value for unknown security level', () => {
      expect(getDefaultDevelopmentEffort('Unknown' as SecurityLevel)).toBe('Not specified');
    });
  });

  describe('getDefaultMaintenanceEffort', () => {
    it('returns correct maintenance effort for each security level', () => {
      expect(getDefaultMaintenanceEffort('None')).toBe('None');
      expect(getDefaultMaintenanceEffort('Low')).toBe('Minimal (quarterly review)');
      expect(getDefaultMaintenanceEffort('Moderate')).toBe('Regular (monthly review)');
      expect(getDefaultMaintenanceEffort('High')).toBe('Significant (biweekly monitoring)');
      expect(getDefaultMaintenanceEffort('Very High')).toBe('Extensive (continuous monitoring)');
    });

    it('returns default value for unknown security level', () => {
      expect(getDefaultMaintenanceEffort('Unknown' as SecurityLevel)).toBe('Not specified');
    });
  });

  describe('getDefaultExpertiseLevel', () => {
    it('returns correct expertise level for each security level', () => {
      expect(getDefaultExpertiseLevel('None')).toBe('None');
      expect(getDefaultExpertiseLevel('Low')).toBe('Basic security knowledge');
      expect(getDefaultExpertiseLevel('Moderate')).toBe('Security professional');
      expect(getDefaultExpertiseLevel('High')).toBe('Security specialist');
      expect(getDefaultExpertiseLevel('Very High')).toBe('Security expert team');
    });

    it('returns default value for unknown security level', () => {
      expect(getDefaultExpertiseLevel('Unknown' as SecurityLevel)).toBe('Not specified');
    });
  });

  describe('getInformationSensitivity', () => {
    it('returns correct sensitivity level for each security level', () => {
      expect(getInformationSensitivity('None')).toBe('Public Information');
      expect(getInformationSensitivity('Low')).toBe('Internal Use Only');
      expect(getInformationSensitivity('Moderate')).toBe('Sensitive Information');
      expect(getInformationSensitivity('High')).toBe('Confidential Information');
      expect(getInformationSensitivity('Very High')).toBe('Restricted Information');
    });

    it('returns default value for unknown security level', () => {
      expect(getInformationSensitivity('Unknown' as SecurityLevel)).toBe('Not Classified');
    });
  });

  describe('getProtectionLevel', () => {
    it('returns correct protection level for each security level', () => {
      expect(getProtectionLevel('None')).toBe('No Protection');
      expect(getProtectionLevel('Low')).toBe('Basic Protection');
      expect(getProtectionLevel('Moderate')).toBe('Standard Protection');
      expect(getProtectionLevel('High')).toBe('Enhanced Protection');
      expect(getProtectionLevel('Very High')).toBe('Maximum Protection');
    });

    it('returns default value for unknown security level', () => {
      expect(getProtectionLevel('Unknown' as SecurityLevel)).toBe('Undefined Protection');
    });
  });
});
