import { useMemo } from 'react';
import { CIAComponent, SecurityLevel } from '../types/cia';
import { useCIAContentService } from './useCIAContentService';
import { getDefaultComponentImpact } from '../utils/riskUtils';
import { isNullish } from '../utils/typeGuards';

/**
 * Custom hook for fetching business impact details with fallback
 * 
 * ## Business Perspective
 * 
 * This hook provides consistent access to business impact information
 * across all widget components. It automatically falls back to default
 * values when the service is unavailable, ensuring widgets always display
 * meaningful impact information to stakeholders. 💼
 * 
 * @param component - CIA component (availability, integrity, confidentiality)
 * @param level - Security level for the component
 * @returns Business impact details with automatic fallback
 * 
 * @example
 * ```typescript
 * const impact = useBusinessImpact('confidentiality', 'Very High');
 * 
 * // Always returns impact data, never null
 * console.log(impact.financialImpact);
 * console.log(impact.operationalImpact);
 * ```
 */
export function useBusinessImpact(
  component: CIAComponent,
  level: SecurityLevel
) {
  const { ciaContentService } = useCIAContentService();

  const businessImpact = useMemo(() => {
    if (isNullish(ciaContentService)) {
      return getDefaultComponentImpact(component, level);
    }

    try {
      const impact = ciaContentService.getBusinessImpact(component, level);
      return impact || getDefaultComponentImpact(component, level);
    } catch (err) {
      console.error(`Error getting ${component} business impact:`, err);
      return getDefaultComponentImpact(component, level);
    }
  }, [ciaContentService, component, level]);

  return businessImpact;
}
