import { useMemo } from "react";
import { SecurityLevel } from "../types/cia";
import { getImplementationComplexity } from "../utils/riskUtils";
import { getSecurityLevelValue } from "../utils/securityLevelUtils";
import {
  getDefaultTechnicalDetails,
  getDefaultTechDescription,
  getDefaultRequirements,
  getDefaultTechnologies,
  getDefaultConfigurations,
  getDefaultExpertise,
} from "../utils/technicalDetailsDefaults";
import { isNullish } from "../utils/typeGuards";

/**
 * CIA Component types
 */
type CIAComponent = "confidentiality" | "integrity" | "availability";

/**
 * Custom hook for TechnicalDetailsWidget helper functions and data
 * Centralizes all fallback logic for technical details
 *
 * @param availabilityLevel - Selected availability security level
 * @param integrityLevel - Selected integrity security level
 * @param confidentialityLevel - Selected confidentiality security level
 * @param ciaContentService - CIA content service instance
 * @returns Computed technical details data and helper functions
 */
export function useTechnicalDetailsData(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel,
  ciaContentService: unknown
) {
  // Helper to convert complexity string to numeric value for UI
  const getComplexityValue = (complexity: string): number => {
    const value = getSecurityLevelValue(complexity as SecurityLevel);
    return value * 25;
  };

  // Get technical details for each component with error handling
  const confidentialityDetails = useMemo(() => {
    try {
      if (isNullish(ciaContentService)) {
        return getDefaultTechnicalDetails("confidentiality", confidentialityLevel);
      }

      const details = ciaContentService.getComponentDetails?.(
        "confidentiality",
        confidentialityLevel
      );
      return isNullish(details)
        ? getDefaultTechnicalDetails("confidentiality", confidentialityLevel)
        : details;
    } catch (err) {
      console.error("Error getting confidentiality details:", err);
      return getDefaultTechnicalDetails("confidentiality", confidentialityLevel);
    }
  }, [ciaContentService, confidentialityLevel]);

  // Get integrity technical details
  const integrityDetails = useMemo(() => {
    try {
      if (isNullish(ciaContentService)) {
        return getDefaultTechnicalDetails("integrity", integrityLevel);
      }

      const details = ciaContentService.getComponentDetails?.(
        "integrity",
        integrityLevel
      );
      return isNullish(details)
        ? getDefaultTechnicalDetails("integrity", integrityLevel)
        : details;
    } catch (err) {
      console.error("Error getting integrity details:", err);
      return getDefaultTechnicalDetails("integrity", integrityLevel);
    }
  }, [ciaContentService, integrityLevel]);

  // Get availability technical details
  const availabilityDetails = useMemo(() => {
    try {
      if (isNullish(ciaContentService)) {
        return getDefaultTechnicalDetails("availability", availabilityLevel);
      }

      const details = ciaContentService.getComponentDetails?.(
        "availability",
        availabilityLevel
      );
      return isNullish(details)
        ? getDefaultTechnicalDetails("availability", availabilityLevel)
        : details;
    } catch (err) {
      console.error("Error getting availability details:", err);
      return getDefaultTechnicalDetails("availability", availabilityLevel);
    }
  }, [ciaContentService, availabilityLevel]);

  // Calculate component complexities using riskUtils
  const confidentialityComplexity = useMemo(() => {
    const complexity = getImplementationComplexity(
      confidentialityLevel,
      confidentialityLevel,
      confidentialityLevel
    );
    return {
      value: getComplexityValue(complexity),
      label: complexity,
    };
  }, [confidentialityLevel]);

  const integrityComplexity = useMemo(() => {
    const complexity = getImplementationComplexity(
      integrityLevel,
      integrityLevel,
      integrityLevel
    );
    return {
      value: getComplexityValue(complexity),
      label: complexity,
    };
  }, [integrityLevel]);

  const availabilityComplexity = useMemo(() => {
    const complexity = getImplementationComplexity(
      availabilityLevel,
      availabilityLevel,
      availabilityLevel
    );
    return {
      value: getComplexityValue(complexity),
      label: complexity,
    };
  }, [availabilityLevel]);

  /**
   * Gets technical description for a CIA component
   *
   * @param component - The CIA component
   * @param level - The security level
   * @returns Technical description text
   */
  const getTechnicalDescription = (
    component: CIAComponent,
    level: SecurityLevel
  ): string => {
    return getDefaultTechDescription(component, level);
  };

  /**
   * Gets technical requirements for a CIA component
   *
   * @param component - The CIA component
   * @param level - The security level
   * @returns Array of technical requirements
   */
  const getTechnicalRequirements = (
    component: CIAComponent,
    level: SecurityLevel
  ): string[] => {
    try {
      if (!isNullish(ciaContentService)) {
        const requirements = ciaContentService.getTechnicalRequirements?.(
          component,
          level
        );
        if (Array.isArray(requirements) && requirements.length > 0) {
          return requirements;
        }
      }
      return getDefaultRequirements(component, level);
    } catch (err) {
      console.error(`Error getting ${component} technical requirements:`, err);
      return getDefaultRequirements(component, level);
    }
  };

  /**
   * Gets technologies for a CIA component
   *
   * @param component - The CIA component
   * @param level - The security level
   * @returns Technologies description
   */
  const getTechnologies = (
    component: CIAComponent,
    level: SecurityLevel
  ): string => {
    return getDefaultTechnologies(component, level);
  };

  /**
   * Gets configurations for a CIA component
   *
   * @param component - The CIA component
   * @param level - The security level
   * @returns Configurations description
   */
  const getConfigurations = (
    component: CIAComponent,
    level: SecurityLevel
  ): string => {
    return getDefaultConfigurations(component, level);
  };

  /**
   * Gets expertise requirements for a CIA component
   *
   * @param component - The CIA component
   * @param level - The security level
   * @returns Array of expertise requirements
   */
  const getExpertiseRequired = (
    component: CIAComponent,
    level: SecurityLevel
  ): string[] => {
    try {
      if (!isNullish(ciaContentService)) {
        const expertise = ciaContentService.getRequiredExpertise?.(
          component,
          level
        );
        if (Array.isArray(expertise) && expertise.length > 0) {
          return expertise;
        }
      }
      return getDefaultExpertise(component, level);
    } catch (err) {
      console.error(`Error getting ${component} expertise requirements:`, err);
      return getDefaultExpertise(component, level);
    }
  };

  return {
    confidentialityDetails,
    integrityDetails,
    availabilityDetails,
    confidentialityComplexity,
    integrityComplexity,
    availabilityComplexity,
    getTechnicalDescription,
    getTechnicalRequirements,
    getTechnologies,
    getConfigurations,
    getExpertiseRequired,
  };
}
