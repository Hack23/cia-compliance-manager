/**
 * Cypress test constants
 * Re-exports only the constants actually used in Cypress tests
 */

// Only re-export SECURITY_LEVELS as it's the only constant used in e2e tests
export { SECURITY_LEVELS } from "../../src/constants/coreConstants";
