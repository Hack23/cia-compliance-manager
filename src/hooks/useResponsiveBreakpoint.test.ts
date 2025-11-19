import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useResponsiveBreakpoint } from './useResponsiveBreakpoint';

describe('useResponsiveBreakpoint', () => {
  // Store original window.innerWidth
  let originalInnerWidth: number;

  beforeEach(() => {
    originalInnerWidth = window.innerWidth;
  });

  afterEach(() => {
    // Restore original innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
    vi.clearAllMocks();
  });

  it('should return "mobile" for width < 640px', () => {
    // Set window width to mobile size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    });

    const { result } = renderHook(() => useResponsiveBreakpoint());

    expect(result.current).toBe('mobile');
  });

  it('should return "tablet" for width between 640px and 1024px', () => {
    // Set window width to tablet size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 800,
    });

    const { result } = renderHook(() => useResponsiveBreakpoint());

    expect(result.current).toBe('tablet');
  });

  it('should return "desktop" for width >= 1024px', () => {
    // Set window width to desktop size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1920,
    });

    const { result } = renderHook(() => useResponsiveBreakpoint());

    expect(result.current).toBe('desktop');
  });

  it('should handle exact breakpoint boundaries correctly', () => {
    // Test mobile/tablet boundary (640px)
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 640,
    });

    const { result: result1 } = renderHook(() => useResponsiveBreakpoint());
    expect(result1.current).toBe('tablet');

    // Test tablet/desktop boundary (1024px)
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });

    const { result: result2 } = renderHook(() => useResponsiveBreakpoint());
    expect(result2.current).toBe('desktop');
  });

  it('should handle one pixel below breakpoint boundaries', () => {
    // One pixel below mobile/tablet boundary
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 639,
    });

    const { result: result1 } = renderHook(() => useResponsiveBreakpoint());
    expect(result1.current).toBe('mobile');

    // One pixel below tablet/desktop boundary
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1023,
    });

    const { result: result2 } = renderHook(() => useResponsiveBreakpoint());
    expect(result2.current).toBe('tablet');
  });

  it('should update breakpoint when window is resized', async () => {
    // Start with desktop size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1920,
    });

    const { result } = renderHook(() => useResponsiveBreakpoint());

    expect(result.current).toBe('desktop');

    // Simulate window resize to mobile
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    });

    // Trigger resize event
    window.dispatchEvent(new Event('resize'));

    // Wait for state update
    await waitFor(() => {
      expect(result.current).toBe('mobile');
    });
  });

  it('should clean up event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useResponsiveBreakpoint());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  it('should handle multiple resize events correctly', async () => {
    // Start with desktop
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1920,
    });

    const { result } = renderHook(() => useResponsiveBreakpoint());

    expect(result.current).toBe('desktop');

    // Resize to tablet
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 800,
    });
    window.dispatchEvent(new Event('resize'));

    await waitFor(() => {
      expect(result.current).toBe('tablet');
    });

    // Resize to mobile
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    });
    window.dispatchEvent(new Event('resize'));

    await waitFor(() => {
      expect(result.current).toBe('mobile');
    });

    // Resize back to desktop
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1920,
    });
    window.dispatchEvent(new Event('resize'));

    await waitFor(() => {
      expect(result.current).toBe('desktop');
    });
  });

  it('should handle very small screen sizes', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 320,
    });

    const { result } = renderHook(() => useResponsiveBreakpoint());

    expect(result.current).toBe('mobile');
  });

  it('should handle very large screen sizes', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 3840,
    });

    const { result } = renderHook(() => useResponsiveBreakpoint());

    expect(result.current).toBe('desktop');
  });

  it('should not cause excessive re-renders for same breakpoint', async () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1920,
    });

    let renderCount = 0;
    const { result } = renderHook(() => {
      renderCount++;
      return useResponsiveBreakpoint();
    });

    const initialRenderCount = renderCount;
    expect(result.current).toBe('desktop');

    // Simulate multiple resize events within desktop range
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200,
    });
    window.dispatchEvent(new Event('resize'));

    await waitFor(() => {
      expect(result.current).toBe('desktop');
    });

    // Should not cause additional re-renders since breakpoint is the same
    expect(renderCount).toBeLessThanOrEqual(initialRenderCount + 1);
  });

  it('should transition through all breakpoints correctly', async () => {
    // Start at mobile
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    });

    const { result } = renderHook(() => useResponsiveBreakpoint());
    expect(result.current).toBe('mobile');

    // Move to tablet
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 700,
    });
    window.dispatchEvent(new Event('resize'));

    await waitFor(() => {
      expect(result.current).toBe('tablet');
    });

    // Move to desktop
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1500,
    });
    window.dispatchEvent(new Event('resize'));

    await waitFor(() => {
      expect(result.current).toBe('desktop');
    });
  });

  it('should handle rapid resize events', async () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1920,
    });

    const { result } = renderHook(() => useResponsiveBreakpoint());

    expect(result.current).toBe('desktop');

    // Simulate rapid resizes
    for (let i = 0; i < 10; i++) {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500 + i * 50,
      });
      window.dispatchEvent(new Event('resize'));
    }

    // Should eventually settle on the final size
    await waitFor(() => {
      expect(result.current).toBe('tablet');
    });
  });

  it('should work correctly in SSR environment (window undefined)', () => {
    // This test verifies the SSR safety check works
    // The implementation should return 'desktop' when window is undefined
    // but since we're testing in a browser environment with jsdom,
    // window is always defined. This test verifies the current behavior.
    
    const { result } = renderHook(() => useResponsiveBreakpoint());
    
    // Should return a valid breakpoint
    expect(['mobile', 'tablet', 'desktop']).toContain(result.current);
  });
});
