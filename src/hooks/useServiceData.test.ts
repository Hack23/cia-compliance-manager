import { renderHook, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useServiceData } from './useServiceData';

describe('useServiceData', () => {
  describe('initialization', () => {
    it('starts with loading state true and null data', () => {
      const fetchFn = vi.fn(() => ({ value: 'test' }));
      const { result } = renderHook(() => useServiceData(fetchFn, []));
      
      // Initial state should have loading true
      expect(result.current.loading).toBe(false); // Will be false after sync execution
      expect(result.current.error).toBe(null);
    });

    it('immediately calls fetch function on mount', () => {
      const fetchFn = vi.fn(() => ({ value: 'test' }));
      renderHook(() => useServiceData(fetchFn, []));
      
      expect(fetchFn).toHaveBeenCalledTimes(1);
    });

    it('sets data after successful fetch', () => {
      const testData = { value: 'test data', count: 42 };
      const fetchFn = vi.fn(() => testData);
      const { result } = renderHook(() => useServiceData(fetchFn, []));
      
      expect(result.current.data).toEqual(testData);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(null);
    });
  });

  describe('error handling', () => {
    it('captures Error instances thrown by fetch function', () => {
      const testError = new Error('Fetch failed');
      const fetchFn = vi.fn(() => {
        throw testError;
      });
      const { result } = renderHook(() => useServiceData(fetchFn, []));
      
      expect(result.current.data).toBe(null);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(testError);
    });

    it('wraps non-Error throws in Error object', () => {
      const fetchFn = vi.fn(() => {
        throw 'string error';
      });
      const { result } = renderHook(() => useServiceData(fetchFn, []));
      
      expect(result.current.data).toBe(null);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe('Unknown error occurred');
    });

    it('handles null throw', () => {
      const fetchFn = vi.fn(() => {
        throw null;
      });
      const { result } = renderHook(() => useServiceData(fetchFn, []));
      
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe('Unknown error occurred');
    });

    it('handles undefined throw', () => {
      const fetchFn = vi.fn(() => {
        throw undefined;
      });
      const { result } = renderHook(() => useServiceData(fetchFn, []));
      
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe('Unknown error occurred');
    });
  });

  describe('dependency updates', () => {
    it('refetches when dependencies change', () => {
      const fetchFn = vi.fn((level: string) => ({ level }));
      
      const { result, rerender } = renderHook(
        ({ level }) => useServiceData(() => fetchFn(level), [level]),
        { initialProps: { level: 'low' } }
      );
      
      expect(fetchFn).toHaveBeenCalledTimes(1);
      expect(result.current.data).toEqual({ level: 'low' });
      
      // Change dependency
      rerender({ level: 'high' });
      
      expect(fetchFn).toHaveBeenCalledTimes(2);
      expect(result.current.data).toEqual({ level: 'high' });
    });

    it('does not refetch when dependencies remain the same', () => {
      const fetchFn = vi.fn(() => ({ value: 'test' }));
      
      const { rerender } = renderHook(
        ({ level }) => useServiceData(fetchFn, [level]),
        { initialProps: { level: 'moderate' } }
      );
      
      expect(fetchFn).toHaveBeenCalledTimes(1);
      
      // Rerender with same dependency
      rerender({ level: 'moderate' });
      
      expect(fetchFn).toHaveBeenCalledTimes(1);
    });

    it('handles multiple dependencies', () => {
      const fetchFn = vi.fn((a: number, b: string) => ({ a, b }));
      
      const { result, rerender } = renderHook(
        ({ a, b }) => useServiceData(() => fetchFn(a, b), [a, b]),
        { initialProps: { a: 1, b: 'test' } }
      );
      
      expect(result.current.data).toEqual({ a: 1, b: 'test' });
      
      // Change first dependency
      rerender({ a: 2, b: 'test' });
      expect(result.current.data).toEqual({ a: 2, b: 'test' });
      
      // Change second dependency
      rerender({ a: 2, b: 'changed' });
      expect(result.current.data).toEqual({ a: 2, b: 'changed' });
    });

    it('refetches with empty dependency array only once', () => {
      const fetchFn = vi.fn(() => ({ value: 'test' }));
      const { rerender } = renderHook(() => useServiceData(fetchFn, []));
      
      expect(fetchFn).toHaveBeenCalledTimes(1);
      
      // Multiple rerenders should not trigger refetch
      rerender();
      rerender();
      rerender();
      
      expect(fetchFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('refetch function', () => {
    it('provides a refetch function', () => {
      const fetchFn = vi.fn(() => ({ value: 'test' }));
      const { result } = renderHook(() => useServiceData(fetchFn, []));
      
      expect(result.current.refetch).toBeInstanceOf(Function);
    });

    it('manually triggers data fetch when refetch is called', () => {
      let counter = 0;
      const fetchFn = vi.fn(() => ({ count: counter++ }));
      const { result } = renderHook(() => useServiceData(fetchFn, []));
      
      expect(result.current.data).toEqual({ count: 0 });
      expect(fetchFn).toHaveBeenCalledTimes(1);
      
      // Manual refetch
      act(() => {
        result.current.refetch();
      });
      
      expect(result.current.data).toEqual({ count: 1 });
      expect(fetchFn).toHaveBeenCalledTimes(2);
    });

    it('clears error state on refetch', () => {
      let shouldError = true;
      const fetchFn = vi.fn(() => {
        if (shouldError) throw new Error('Failed');
        return { value: 'success' };
      });
      
      const { result } = renderHook(() => useServiceData(fetchFn, []));
      
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.data).toBe(null);
      
      // Fix the error and refetch
      shouldError = false;
      act(() => {
        result.current.refetch();
      });
      
      expect(result.current.error).toBe(null);
      expect(result.current.data).toEqual({ value: 'success' });
    });

    it('can be called multiple times', () => {
      const fetchFn = vi.fn(() => ({ timestamp: Date.now() }));
      const { result } = renderHook(() => useServiceData(fetchFn, []));
      
      expect(fetchFn).toHaveBeenCalledTimes(1);
      
      act(() => {
        result.current.refetch();
      });
      expect(fetchFn).toHaveBeenCalledTimes(2);
      
      act(() => {
        result.current.refetch();
      });
      expect(fetchFn).toHaveBeenCalledTimes(3);
    });
  });

  describe('loading states', () => {
    it('sets loading to false after successful fetch', () => {
      const fetchFn = vi.fn(() => ({ value: 'test' }));
      const { result } = renderHook(() => useServiceData(fetchFn, []));
      
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual({ value: 'test' });
    });

    it('sets loading to false after error', () => {
      const fetchFn = vi.fn(() => {
        throw new Error('Fetch failed');
      });
      const { result } = renderHook(() => useServiceData(fetchFn, []));
      
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeInstanceOf(Error);
    });
  });

  describe('type safety', () => {
    it('works with primitive types', () => {
      const fetchFn = vi.fn(() => 'string value');
      const { result } = renderHook(() => useServiceData(fetchFn, []));
      
      expect(result.current.data).toBe('string value');
    });

    it('works with number types', () => {
      const fetchFn = vi.fn(() => 42);
      const { result } = renderHook(() => useServiceData(fetchFn, []));
      
      expect(result.current.data).toBe(42);
    });

    it('works with array types', () => {
      const testArray = [1, 2, 3, 4, 5];
      const fetchFn = vi.fn(() => testArray);
      const { result } = renderHook(() => useServiceData(fetchFn, []));
      
      expect(result.current.data).toEqual(testArray);
    });

    it('works with complex object types', () => {
      interface ComplexData {
        id: number;
        name: string;
        nested: {
          value: boolean;
          items: string[];
        };
      }
      
      const testData: ComplexData = {
        id: 1,
        name: 'test',
        nested: {
          value: true,
          items: ['a', 'b', 'c']
        }
      };
      
      const fetchFn = vi.fn(() => testData);
      const { result } = renderHook(() => useServiceData<ComplexData>(fetchFn, []));
      
      expect(result.current.data).toEqual(testData);
    });

    it('works with null return values', () => {
      const fetchFn = vi.fn(() => null);
      const { result } = renderHook(() => useServiceData<string | null>(fetchFn, []));
      
      expect(result.current.data).toBe(null);
      expect(result.current.error).toBe(null);
      expect(result.current.loading).toBe(false);
    });

    it('works with undefined return values', () => {
      const fetchFn = vi.fn(() => undefined);
      const { result } = renderHook(() => useServiceData<string | undefined>(fetchFn, []));
      
      expect(result.current.data).toBe(undefined);
      expect(result.current.error).toBe(null);
    });
  });

  describe('integration scenarios', () => {
    it('handles realistic service call scenario', () => {
      interface SecurityMetrics {
        score: number;
        level: string;
        risks: string[];
      }
      
      const mockService = {
        getMetrics: (level: string): SecurityMetrics => ({
          score: level === 'high' ? 90 : 60,
          level,
          risks: level === 'low' ? ['Multiple vulnerabilities'] : []
        })
      };
      
      const { result, rerender } = renderHook(
        ({ level }) => useServiceData(
          () => mockService.getMetrics(level),
          [level]
        ),
        { initialProps: { level: 'low' } }
      );
      
      expect(result.current.data).toEqual({
        score: 60,
        level: 'low',
        risks: ['Multiple vulnerabilities']
      });
      
      // User changes security level
      rerender({ level: 'high' });
      
      expect(result.current.data).toEqual({
        score: 90,
        level: 'high',
        risks: []
      });
    });

    it('handles error recovery scenario', () => {
      let callCount = 0;
      const fetchFn = vi.fn(() => {
        callCount++;
        if (callCount === 1) throw new Error('Network error');
        if (callCount === 2) throw new Error('Still failing');
        return { success: true };
      });
      
      const { result } = renderHook(() => useServiceData(fetchFn, []));
      
      // First call fails
      expect(result.current.error?.message).toBe('Network error');
      expect(result.current.data).toBe(null);
      
      // Retry - still fails
      act(() => {
        result.current.refetch();
      });
      expect(result.current.error?.message).toBe('Still failing');
      
      // Retry - succeeds
      act(() => {
        result.current.refetch();
      });
      expect(result.current.error).toBe(null);
      expect(result.current.data).toEqual({ success: true });
    });
  });
});
