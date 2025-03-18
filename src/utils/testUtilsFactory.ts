import { createTestDataProvider } from "../data/testDataProvider";
import { SecurityResourceService } from "../services/securityResourceService";
import { CIADataProvider } from "../types/cia-services";

/**
 * Create a test instance of the SecurityResourceService
 *
 * This factory function creates a SecurityResourceService instance
 * with a test data provider, suitable for testing components
 * that depend on the service.
 */
export function createTestSecurityResourceService(): SecurityResourceService {
  const testDataProvider: CIADataProvider = createTestDataProvider();
  return new SecurityResourceService(testDataProvider);
}

/**
 * Create test data provider with specified customizations
 */
export function createCustomTestDataProvider(
  customizations: Partial<CIADataProvider> = {}
): CIADataProvider {
  const baseProvider = createTestDataProvider();

  // Merge the base provider with any customizations
  return {
    ...baseProvider,
    ...customizations,
  };
}
