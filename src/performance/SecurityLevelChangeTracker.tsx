import { useEffect, useRef } from "react";
import { SecurityLevel } from "../types/cia";

/**
 * Performance monitoring interface for tracking security level changes
 */
interface SecurityLevelChangeMetrics {
  lastChangeTimestamp: number;
  changeCount: number;
  averageRenderTime: number;
  totalRenderTime: number;
}

/**
 * Component props for the SecurityLevelChangeTracker
 */
interface SecurityLevelChangeTrackerProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  componentId: string;
}

// Export the props type directly for documentation purposes
export type { SecurityLevelChangeTrackerProps } from "../types/componentPropExports";

/**
 * Tracks performance metrics for security level changes
 *
 * This component doesn't render anything but monitors performance metrics
 * for how quickly components respond to security level changes.
 *
 * @param props Component props including security levels to track
 * @returns null (this component doesn't render anything)
 */
export function SecurityLevelChangeTracker({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  componentId,
}: SecurityLevelChangeTrackerProps): null {
  // Use refs to track previous values and metrics
  const prevAvailability = useRef<SecurityLevel>(availabilityLevel);
  const prevIntegrity = useRef<SecurityLevel>(integrityLevel);
  const prevConfidentiality = useRef<SecurityLevel>(confidentialityLevel);

  // Track performance metrics
  const metrics = useRef<SecurityLevelChangeMetrics>({
    lastChangeTimestamp: 0,
    changeCount: 0,
    averageRenderTime: 0,
    totalRenderTime: 0,
  });

  // Track render timing
  const renderStartTime = useRef<number>(performance.now());

  // Monitor for changes and update metrics
  useEffect(() => {
    // Calculate render time
    const renderTime = performance.now() - renderStartTime.current;

    // Check if any security level changed
    if (
      availabilityLevel !== prevAvailability.current ||
      integrityLevel !== prevIntegrity.current ||
      confidentialityLevel !== prevConfidentiality.current
    ) {
      const currentMetrics = metrics.current;

      // Update metrics
      currentMetrics.lastChangeTimestamp = Date.now();
      currentMetrics.changeCount += 1;
      currentMetrics.totalRenderTime += renderTime;
      currentMetrics.averageRenderTime =
        currentMetrics.totalRenderTime / currentMetrics.changeCount;

      // Log changes for performance monitoring
      console.debug(`[Performance] ${componentId} security level change:`, {
        from: {
          availability: prevAvailability.current,
          integrity: prevIntegrity.current,
          confidentiality: prevConfidentiality.current,
        },
        to: {
          availability: availabilityLevel,
          integrity: integrityLevel,
          confidentiality: confidentialityLevel,
        },
        metrics: {
          renderTime,
          averageRenderTime: currentMetrics.averageRenderTime,
          totalChanges: currentMetrics.changeCount,
        },
      });

      // Update previous values
      prevAvailability.current = availabilityLevel;
      prevIntegrity.current = integrityLevel;
      prevConfidentiality.current = confidentialityLevel;
    }

    // Reset render start time for next render
    renderStartTime.current = performance.now();
  }, [availabilityLevel, integrityLevel, confidentialityLevel, componentId]);

  // This component doesn't render anything
  return null;
}
