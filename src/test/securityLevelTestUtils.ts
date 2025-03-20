import { vi } from 'vitest';
import { SecurityLevel } from '../types/cia';
import { SecurityWidgetProps } from '../types/widget-props';

/**
 * Creates a standard set of security level props for testing
 * 
 * @param overrides - Optional overrides for the default props
 * @returns Standard security widget props for testing
 */
export function createSecurityLevelTestProps(
  overrides?: Partial<SecurityWidgetProps>
): SecurityWidgetProps {
  const defaultProps: SecurityWidgetProps = {
    availabilityLevel: "Moderate",
    integrityLevel: "Moderate",
    confidentialityLevel: "Moderate",
    onAvailabilityChange: vi.fn(),
    onIntegrityChange: vi.fn(),
    onConfidentialityChange: vi.fn(),
    className: '',
    testId: 'test-security-widget'
  };

  return { ...defaultProps, ...overrides };
}

/**
 * Creates security level test props with specific levels
 * 
 * @param levels - The security levels to use
 * @param overrides - Optional additional overrides
 * @returns Customized security widget props for testing
 */
export function createCustomSecurityLevelProps(
  levels: {
    availability?: SecurityLevel;
    integrity?: SecurityLevel;
    confidentiality?: SecurityLevel;
  },
  overrides?: Partial<SecurityWidgetProps>
): SecurityWidgetProps {
  return createSecurityLevelTestProps({
    ...(levels.availability && { availabilityLevel: levels.availability }),
    ...(levels.integrity && { integrityLevel: levels.integrity }),
    ...(levels.confidentiality && { confidentialityLevel: levels.confidentiality }),
    ...overrides
  });
}
