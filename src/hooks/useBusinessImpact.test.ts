import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useBusinessImpact } from './useBusinessImpact';
import * as useCIAContentServiceModule from './useCIAContentService';
import * as riskUtilsModule from '../utils/riskUtils';
import { CIAComponent, SecurityLevel } from '../types/cia';

// Mock dependencies
vi.mock('./useCIAContentService');
vi.mock('../utils/riskUtils');

describe('useBusinessImpact', () => {
  const mockDefaultImpact = {
    financialImpact: 'Moderate financial impact',
    operationalImpact: 'Moderate operational impact',
    reputationalImpact: 'Moderate reputational impact',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock getDefaultComponentImpact to return a consistent value
    vi.spyOn(riskUtilsModule, 'getDefaultComponentImpact').mockReturnValue(
      mockDefaultImpact
    );
  });

  it('should return business impact when service is available', () => {
    const mockImpact = {
      financialImpact: 'High financial impact',
      operationalImpact: 'High operational impact',
      reputationalImpact: 'High reputational impact',
    };

    const mockService = {
      getBusinessImpact: vi.fn().mockReturnValue(mockImpact),
    };

    vi.spyOn(useCIAContentServiceModule, 'useCIAContentService').mockReturnValue({
      ciaContentService: mockService,
      error: null,
      isLoading: false,
    });

    const { result } = renderHook(() =>
      useBusinessImpact('availability' as CIAComponent, 'High' as SecurityLevel)
    );

    expect(result.current).toEqual(mockImpact);
    expect(mockService.getBusinessImpact).toHaveBeenCalledWith('availability', 'High');
  });

  it('should return default impact when service is null', () => {
    vi.spyOn(useCIAContentServiceModule, 'useCIAContentService').mockReturnValue({
      ciaContentService: null,
      error: null,
      isLoading: false,
    });

    const { result } = renderHook(() =>
      useBusinessImpact('integrity' as CIAComponent, 'Moderate' as SecurityLevel)
    );

    expect(result.current).toEqual(mockDefaultImpact);
    expect(riskUtilsModule.getDefaultComponentImpact).toHaveBeenCalledWith(
      'integrity',
      'Moderate'
    );
  });

  it('should return default impact when service is undefined', () => {
    vi.spyOn(useCIAContentServiceModule, 'useCIAContentService').mockReturnValue({
      ciaContentService: undefined,
      error: null,
      isLoading: false,
    });

    const { result } = renderHook(() =>
      useBusinessImpact('confidentiality' as CIAComponent, 'Low' as SecurityLevel)
    );

    expect(result.current).toEqual(mockDefaultImpact);
    expect(riskUtilsModule.getDefaultComponentImpact).toHaveBeenCalledWith(
      'confidentiality',
      'Low'
    );
  });

  it('should return default impact when getBusinessImpact returns null', () => {
    const mockService = {
      getBusinessImpact: vi.fn().mockReturnValue(null),
    };

    vi.spyOn(useCIAContentServiceModule, 'useCIAContentService').mockReturnValue({
      ciaContentService: mockService,
      error: null,
      isLoading: false,
    });

    const { result } = renderHook(() =>
      useBusinessImpact('availability' as CIAComponent, 'Very High' as SecurityLevel)
    );

    expect(result.current).toEqual(mockDefaultImpact);
    expect(riskUtilsModule.getDefaultComponentImpact).toHaveBeenCalledWith(
      'availability',
      'Very High'
    );
  });

  it('should return default impact when getBusinessImpact returns undefined', () => {
    const mockService = {
      getBusinessImpact: vi.fn().mockReturnValue(undefined),
    };

    vi.spyOn(useCIAContentServiceModule, 'useCIAContentService').mockReturnValue({
      ciaContentService: mockService,
      error: null,
      isLoading: false,
    });

    const { result } = renderHook(() =>
      useBusinessImpact('integrity' as CIAComponent, 'High' as SecurityLevel)
    );

    expect(result.current).toEqual(mockDefaultImpact);
    expect(riskUtilsModule.getDefaultComponentImpact).toHaveBeenCalledWith(
      'integrity',
      'High'
    );
  });

  it('should handle errors gracefully and return default impact', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    const mockService = {
      getBusinessImpact: vi.fn().mockImplementation(() => {
        throw new Error('Service error');
      }),
    };

    vi.spyOn(useCIAContentServiceModule, 'useCIAContentService').mockReturnValue({
      ciaContentService: mockService,
      error: null,
      isLoading: false,
    });

    const { result } = renderHook(() =>
      useBusinessImpact('confidentiality' as CIAComponent, 'Moderate' as SecurityLevel)
    );

    expect(result.current).toEqual(mockDefaultImpact);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error getting confidentiality business impact:',
      expect.any(Error)
    );
    expect(riskUtilsModule.getDefaultComponentImpact).toHaveBeenCalledWith(
      'confidentiality',
      'Moderate'
    );

    consoleErrorSpy.mockRestore();
  });

  it('should work with all CIA components', () => {
    const components: CIAComponent[] = ['availability', 'integrity', 'confidentiality'];
    
    components.forEach((component) => {
      const mockImpact = {
        financialImpact: `${component} financial impact`,
        operationalImpact: `${component} operational impact`,
        reputationalImpact: `${component} reputational impact`,
      };

      const mockService = {
        getBusinessImpact: vi.fn().mockReturnValue(mockImpact),
      };

      vi.spyOn(useCIAContentServiceModule, 'useCIAContentService').mockReturnValue({
        ciaContentService: mockService,
        error: null,
        isLoading: false,
      });

      const { result } = renderHook(() =>
        useBusinessImpact(component, 'High' as SecurityLevel)
      );

      expect(result.current).toEqual(mockImpact);
      expect(mockService.getBusinessImpact).toHaveBeenCalledWith(component, 'High');
    });
  });

  it('should work with all security levels', () => {
    const levels: SecurityLevel[] = ['None', 'Low', 'Moderate', 'High', 'Very High'];
    
    levels.forEach((level) => {
      const mockImpact = {
        financialImpact: `${level} financial impact`,
        operationalImpact: `${level} operational impact`,
        reputationalImpact: `${level} reputational impact`,
      };

      const mockService = {
        getBusinessImpact: vi.fn().mockReturnValue(mockImpact),
      };

      vi.spyOn(useCIAContentServiceModule, 'useCIAContentService').mockReturnValue({
        ciaContentService: mockService,
        error: null,
        isLoading: false,
      });

      const { result } = renderHook(() =>
        useBusinessImpact('availability' as CIAComponent, level)
      );

      expect(result.current).toEqual(mockImpact);
      expect(mockService.getBusinessImpact).toHaveBeenCalledWith('availability', level);
    });
  });

  it('should memoize results correctly', () => {
    const mockImpact = {
      financialImpact: 'High financial impact',
      operationalImpact: 'High operational impact',
      reputationalImpact: 'High reputational impact',
    };

    const mockService = {
      getBusinessImpact: vi.fn().mockReturnValue(mockImpact),
    };

    vi.spyOn(useCIAContentServiceModule, 'useCIAContentService').mockReturnValue({
      ciaContentService: mockService,
      error: null,
      isLoading: false,
    });

    const { result, rerender } = renderHook(() =>
      useBusinessImpact('availability' as CIAComponent, 'High' as SecurityLevel)
    );

    const firstResult = result.current;

    // Rerender without changing inputs
    rerender();

    // Should return the same object reference (memoized)
    expect(result.current).toBe(firstResult);
    expect(mockService.getBusinessImpact).toHaveBeenCalledTimes(1);
  });

  it('should recalculate when component changes', () => {
    const mockService = {
      getBusinessImpact: vi.fn()
        .mockReturnValueOnce({ financialImpact: 'availability impact' })
        .mockReturnValueOnce({ financialImpact: 'integrity impact' }),
    };

    vi.spyOn(useCIAContentServiceModule, 'useCIAContentService').mockReturnValue({
      ciaContentService: mockService,
      error: null,
      isLoading: false,
    });

    const { result, rerender } = renderHook(
      ({ component, level }) => useBusinessImpact(component, level),
      {
        initialProps: {
          component: 'availability' as CIAComponent,
          level: 'High' as SecurityLevel,
        },
      }
    );

    expect(result.current).toEqual({ financialImpact: 'availability impact' });

    // Change component
    rerender({
      component: 'integrity' as CIAComponent,
      level: 'High' as SecurityLevel,
    });

    expect(result.current).toEqual({ financialImpact: 'integrity impact' });
    expect(mockService.getBusinessImpact).toHaveBeenCalledTimes(2);
  });

  it('should recalculate when security level changes', () => {
    const mockService = {
      getBusinessImpact: vi.fn()
        .mockReturnValueOnce({ financialImpact: 'high impact' })
        .mockReturnValueOnce({ financialImpact: 'low impact' }),
    };

    vi.spyOn(useCIAContentServiceModule, 'useCIAContentService').mockReturnValue({
      ciaContentService: mockService,
      error: null,
      isLoading: false,
    });

    const { result, rerender } = renderHook(
      ({ component, level }) => useBusinessImpact(component, level),
      {
        initialProps: {
          component: 'availability' as CIAComponent,
          level: 'High' as SecurityLevel,
        },
      }
    );

    expect(result.current).toEqual({ financialImpact: 'high impact' });

    // Change level
    rerender({
      component: 'availability' as CIAComponent,
      level: 'Low' as SecurityLevel,
    });

    expect(result.current).toEqual({ financialImpact: 'low impact' });
    expect(mockService.getBusinessImpact).toHaveBeenCalledTimes(2);
  });

  it('should always return a non-null value', () => {
    // Test with service returning null
    const mockService = {
      getBusinessImpact: vi.fn().mockReturnValue(null),
    };

    vi.spyOn(useCIAContentServiceModule, 'useCIAContentService').mockReturnValue({
      ciaContentService: mockService,
      error: null,
      isLoading: false,
    });

    const { result: result1 } = renderHook(() =>
      useBusinessImpact('availability' as CIAComponent, 'High' as SecurityLevel)
    );

    expect(result1.current).not.toBeNull();
    expect(result1.current).toBeDefined();

    // Test with service unavailable
    vi.spyOn(useCIAContentServiceModule, 'useCIAContentService').mockReturnValue({
      ciaContentService: null,
      error: null,
      isLoading: false,
    });

    const { result: result2 } = renderHook(() =>
      useBusinessImpact('integrity' as CIAComponent, 'Moderate' as SecurityLevel)
    );

    expect(result2.current).not.toBeNull();
    expect(result2.current).toBeDefined();
  });
});
