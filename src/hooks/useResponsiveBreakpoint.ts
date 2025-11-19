import { useState, useEffect } from 'react';

/**
 * Responsive breakpoint names
 */
export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

/**
 * Breakpoint width thresholds in pixels
 */
const BREAKPOINTS = {
  mobile: 640,
  tablet: 1024,
} as const;

/**
 * Determines the current breakpoint based on window width
 * 
 * @param width - Window width in pixels
 * @returns Current breakpoint name
 */
function getBreakpoint(width: number): Breakpoint {
  if (width < BREAKPOINTS.mobile) return 'mobile';
  if (width < BREAKPOINTS.tablet) return 'tablet';
  return 'desktop';
}

/**
 * Custom hook for detecting current responsive breakpoint
 * 
 * ## Business Perspective
 * 
 * This hook enables widgets to adapt their layout and content based on
 * device size, ensuring optimal user experience for security officers
 * and executives accessing the application from different devices. 📱💻
 * 
 * Responsive design is critical for modern security dashboards that need
 * to be accessible on mobile devices during incident response.
 * 
 * @returns Current breakpoint ('mobile', 'tablet', or 'desktop')
 * 
 * @example
 * ```typescript
 * const breakpoint = useResponsiveBreakpoint();
 * 
 * return (
 *   <div>
 *     {breakpoint === 'mobile' && <MobileLayout />}
 *     {breakpoint === 'tablet' && <TabletLayout />}
 *     {breakpoint === 'desktop' && <DesktopLayout />}
 *   </div>
 * );
 * ```
 */
export function useResponsiveBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() => {
    // SSR safety: return desktop as default for server-side rendering
    if (typeof window === 'undefined') return 'desktop';
    return getBreakpoint(window.innerWidth);
  });

  useEffect(() => {
    // Handler for window resize events
    const handleResize = () => {
      const width = window.innerWidth;
      setBreakpoint(getBreakpoint(width));
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup: remove event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
}
