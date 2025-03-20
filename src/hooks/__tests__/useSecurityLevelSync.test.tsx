import { act, renderHook } from '@testing-library/react';
import { SecurityLevel } from '../../types/cia';
import { useSecurityLevelSync } from '../useSecurityLevelSync';

describe('useSecurityLevelSync', () => {
  it('should use default security levels if none provided', () => {
    const { result } = renderHook(() => useSecurityLevelSync(
      "Moderate" as SecurityLevel,
      "Moderate" as SecurityLevel,
      "Moderate" as SecurityLevel
    ));
    
    expect(result.current.availabilityLevel).toBe('Moderate');
    expect(result.current.integrityLevel).toBe('Moderate');
    expect(result.current.confidentialityLevel).toBe('Moderate');
  });
  
  it('should initialize with provided security levels', () => {
    const { result } = renderHook(() => useSecurityLevelSync(
      "High" as SecurityLevel,
      "Low" as SecurityLevel,
      "Very High" as SecurityLevel
    ));
    
    expect(result.current.availabilityLevel).toBe('High');
    expect(result.current.integrityLevel).toBe('Low');
    expect(result.current.confidentialityLevel).toBe('Very High');
  });
  
  it('should update security levels with setters', () => {
    const { result } = renderHook(() => useSecurityLevelSync(
      "Moderate" as SecurityLevel,
      "Moderate" as SecurityLevel, 
      "Moderate" as SecurityLevel
    ));
    
    act(() => {
      result.current.setAvailabilityLevel('High');
    });
    
    expect(result.current.availabilityLevel).toBe('High');
    
    act(() => {
      result.current.setIntegrityLevel('Low');
    });
    
    expect(result.current.integrityLevel).toBe('Low');
    
    act(() => {
      result.current.setConfidentialityLevel('Very High');
    });
    
    expect(result.current.confidentialityLevel).toBe('Very High');
  });
});
