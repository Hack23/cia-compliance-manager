import { useMemo } from 'react';
import { CIAComponent, SecurityLevel } from '../types/cia';
import { useCIAContentService } from './useCIAContentService';
import { isNullish } from '../utils/typeGuards';

/**
 * Custom hook for fetching CIA component details with error handling
 * 
 * ## Business Perspective
 * 
 * This hook encapsulates the common pattern of fetching component details
 * from the CIA content service, providing consistent error handling and
 * null safety across all widget components. This reduces duplication and
 * ensures consistent behavior across the application. 🔄
 * 
 * @param component - CIA component (availability, integrity, confidentiality)
 * @param level - Security level for the component
 * @returns Component details or null if unavailable
 * 
 * @example
 * ```typescript
 * const details = useComponentDetails('availability', 'High');
 * 
 * if (details) {
 *   console.log(details.uptime);
 * }
 * ```
 */
export function useComponentDetails(
  component: CIAComponent,
  level: SecurityLevel
) {
  const { ciaContentService } = useCIAContentService();

  const details = useMemo(() => {
    if (isNullish(ciaContentService)) return null;

    try {
      const result = ciaContentService.getComponentDetails(component, level);
      return isNullish(result) ? null : result;
    } catch (err) {
      console.error(`Error getting ${component} details:`, err);
      return null;
    }
  }, [ciaContentService, component, level]);

  return details;
}
