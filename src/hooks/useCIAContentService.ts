import { useMemo } from 'react';
import { CIAContentService } from '../services/ciaContentService';
import { useCIAOptions } from './useCIAOptions';

/**
 * Hook that provides access to the CIA content service
 * 
 * ## Business Perspective
 * 
 * This hook centralizes access to CIA security content throughout the application,
 * ensuring consistent security descriptions, technical details, and business
 * impact information are presented to users across all widgets. 🔒
 * 
 * The service handles security level calculations, risk assessments, and technical
 * recommendations to provide a cohesive security narrative that aligns with
 * business objectives. 💼
 * 
 * @returns The CIA content service instance
 */
export function useCIAContentService() {
  const ciaOptions = useCIAOptions();
  
  const ciaContentService = useMemo(() => {
    // Map the ciaOptions to match the CIADataProvider interface
    const dataProvider = {
      availabilityOptions: ciaOptions.availabilityOptions,
      integrityOptions: ciaOptions.integrityOptions,
      confidentialityOptions: ciaOptions.confidentialityOptions,
      roiEstimates: ciaOptions.ROI_ESTIMATES, // Keep using ROI_ESTIMATES for compatibility
    };
    
    // Only add optional properties if they exist in ciaOptions
    if (typeof ciaOptions === 'object') {
      // Optional properties - using safer property access and type casting
      if ('getDefaultSecurityIcon' in ciaOptions && 
          typeof ciaOptions.getDefaultSecurityIcon === 'function') {
        (dataProvider as any).getDefaultSecurityIcon = ciaOptions.getDefaultSecurityIcon;
      }
      
      if ('getDefaultValuePoints' in ciaOptions && 
          typeof ciaOptions.getDefaultValuePoints === 'function') {
        (dataProvider as any).getDefaultValuePoints = ciaOptions.getDefaultValuePoints;
      }
    }
    
    return new CIAContentService(dataProvider);
  }, [ciaOptions]);
  
  return { ciaContentService };
}
