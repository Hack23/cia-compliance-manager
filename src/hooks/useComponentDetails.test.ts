import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useComponentDetails } from './useComponentDetails';
import * as useCIAContentServiceModule from './useCIAContentService';
import { CIAComponent, SecurityLevel } from '../types/cia';
import { CIAContentService } from '../services/ciaContentService';

// Mock the useCIAContentService hook
vi.mock('./useCIAContentService');

describe('useComponentDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return component details when service is available', () => {
    const mockDetails = {
      uptime: '99.9%',
      rto: '< 4 hours',
      rpo: '< 1 hour',
      mttr: '< 2 hours',
      sla: '24/7',
    };

    const mockService = {
      getComponentDetails: vi.fn().mockReturnValue(mockDetails),
    } as unknown as CIAContentService;

    vi.spyOn(useCIAContentServiceModule, 'useCIAContentService').mockReturnValue({
      ciaContentService: mockService,
      error: null,
      isLoading: false,
      refresh: vi.fn(),
    });

    const { result } = renderHook(() =>
      useComponentDetails('availability' as CIAComponent, 'High' as SecurityLevel)
    );

    expect(result.current).toEqual(mockDetails);
    expect(mockService.getComponentDetails).toHaveBeenCalledWith(
      'availability',
      'High'
    );
  });

  it('should return null when service is null', () => {
    vi.spyOn(useCIAContentServiceModule, 'useCIAContentService').mockReturnValue({
      ciaContentService: null,
      error: null,
      isLoading: false,
      refresh: vi.fn(),
    });

    const { result } = renderHook(() =>
      useComponentDetails('availability' as CIAComponent, 'Moderate' as SecurityLevel)
    );

    expect(result.current).toBeNull();
  });

  it('should return null when service is undefined', () => {
    vi.spyOn(useCIAContentServiceModule, 'useCIAContentService').mockReturnValue({
      ciaContentService: null,
      error: null,
      isLoading: false,
      refresh: vi.fn(),
    });

    const { result } = renderHook(() =>
      useComponentDetails('integrity' as CIAComponent, 'Low' as SecurityLevel)
    );

    expect(result.current).toBeNull();
  });

  it('should return null when getComponentDetails returns null', () => {
    const mockService = {
      getComponentDetails: vi.fn().mockReturnValue(null),
    } as unknown as CIAContentService;

    vi.spyOn(useCIAContentServiceModule, 'useCIAContentService').mockReturnValue({
      ciaContentService: mockService,
      error: null,
      isLoading: false,
      refresh: vi.fn(),
    });

    const { result } = renderHook(() =>
      useComponentDetails('confidentiality' as CIAComponent, 'Very High' as SecurityLevel)
    );

    expect(result.current).toBeNull();
  });

  it('should return null when getComponentDetails returns undefined', () => {
    const mockService = {
      getComponentDetails: vi.fn().mockReturnValue(undefined),
    } as unknown as CIAContentService;

    vi.spyOn(useCIAContentServiceModule, 'useCIAContentService').mockReturnValue({
      ciaContentService: mockService,
      error: null,
      isLoading: false,
      refresh: vi.fn(),
    });

    const { result } = renderHook(() =>
      useComponentDetails('availability' as CIAComponent, 'High' as SecurityLevel)
    );

    expect(result.current).toBeNull();
  });

  it('should handle errors gracefully and return null', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    const mockService = {
      getComponentDetails: vi.fn().mockImplementation(() => {
        throw new Error('Service error');
      }),
    } as unknown as CIAContentService;

    vi.spyOn(useCIAContentServiceModule, 'useCIAContentService').mockReturnValue({
      ciaContentService: mockService,
      error: null,
      isLoading: false,
      refresh: vi.fn(),
    });

    const { result } = renderHook(() =>
      useComponentDetails('integrity' as CIAComponent, 'Moderate' as SecurityLevel)
    );

    expect(result.current).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error getting integrity details:',
      expect.any(Error)
    );

    consoleErrorSpy.mockRestore();
  });

  it('should work with all CIA components', () => {
    const components: CIAComponent[] = ['availability', 'integrity', 'confidentiality'];
    
    components.forEach((component) => {
      const mockDetails = { test: `${component} details` };
      const mockService = {
        getComponentDetails: vi.fn().mockReturnValue(mockDetails),
      } as unknown as CIAContentService;

      vi.spyOn(useCIAContentServiceModule, 'useCIAContentService').mockReturnValue({
        ciaContentService: mockService,
        error: null,
        isLoading: false,
      refresh: vi.fn(),
    });

      const { result } = renderHook(() =>
        useComponentDetails(component, 'High' as SecurityLevel)
      );

      expect(result.current).toEqual(mockDetails);
    });
  });

  it('should work with all security levels', () => {
    const levels: SecurityLevel[] = ['None', 'Low', 'Moderate', 'High', 'Very High'];
    
    levels.forEach((level) => {
      const mockDetails = { test: `${level} details` };
      const mockService = {
        getComponentDetails: vi.fn().mockReturnValue(mockDetails),
      } as unknown as CIAContentService;

      vi.spyOn(useCIAContentServiceModule, 'useCIAContentService').mockReturnValue({
        ciaContentService: mockService,
        error: null,
        isLoading: false,
      refresh: vi.fn(),
    });

      const { result } = renderHook(() =>
        useComponentDetails('availability' as CIAComponent, level)
      );

      expect(result.current).toEqual(mockDetails);
    });
  });

  it('should memoize results correctly', () => {
    const mockDetails = { uptime: '99.9%' };
    const mockService = {
      getComponentDetails: vi.fn().mockReturnValue(mockDetails),
    } as unknown as CIAContentService;

    vi.spyOn(useCIAContentServiceModule, 'useCIAContentService').mockReturnValue({
      ciaContentService: mockService,
      error: null,
      isLoading: false,
      refresh: vi.fn(),
    });

    const { result, rerender } = renderHook(() =>
      useComponentDetails('availability' as CIAComponent, 'High' as SecurityLevel)
    );

    const firstResult = result.current;

    // Rerender without changing inputs
    rerender();

    // Should return the same object reference (memoized)
    expect(result.current).toBe(firstResult);
    expect(mockService.getComponentDetails).toHaveBeenCalledTimes(1);
  });

  it('should recalculate when component changes', () => {
    const mockService = {
      getComponentDetails: vi.fn()
        .mockReturnValueOnce({ availability: 'data' })
        .mockReturnValueOnce({ integrity: 'data' }),
    } as unknown as CIAContentService;

    vi.spyOn(useCIAContentServiceModule, 'useCIAContentService').mockReturnValue({
      ciaContentService: mockService,
      error: null,
      isLoading: false,
      refresh: vi.fn(),
    });

    const { result, rerender } = renderHook(
      ({ component, level }) => useComponentDetails(component, level),
      {
        initialProps: {
          component: 'availability' as CIAComponent,
          level: 'High' as SecurityLevel,
        },
      }
    );

    expect(result.current).toEqual({ availability: 'data' });

    // Change component
    rerender({
      component: 'integrity' as CIAComponent,
      level: 'High' as SecurityLevel,
    });

    expect(result.current).toEqual({ integrity: 'data' });
    expect(mockService.getComponentDetails).toHaveBeenCalledTimes(2);
  });

  it('should recalculate when security level changes', () => {
    const mockService = {
      getComponentDetails: vi.fn()
        .mockReturnValueOnce({ high: 'data' })
        .mockReturnValueOnce({ low: 'data' }),
    } as unknown as CIAContentService;

    vi.spyOn(useCIAContentServiceModule, 'useCIAContentService').mockReturnValue({
      ciaContentService: mockService,
      error: null,
      isLoading: false,
      refresh: vi.fn(),
    });

    const { result, rerender } = renderHook(
      ({ component, level }) => useComponentDetails(component, level),
      {
        initialProps: {
          component: 'availability' as CIAComponent,
          level: 'High' as SecurityLevel,
        },
      }
    );

    expect(result.current).toEqual({ high: 'data' });

    // Change level
    rerender({
      component: 'availability' as CIAComponent,
      level: 'Low' as SecurityLevel,
    });

    expect(result.current).toEqual({ low: 'data' });
    expect(mockService.getComponentDetails).toHaveBeenCalledTimes(2);
  });
});
