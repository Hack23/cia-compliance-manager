/**
 * Simple logger utility for consistent logging throughout the application
 *
 * ## Technical Perspective
 *
 * Provides standardized logging across the application with different log levels.
 * All output is routed through console.warn (for info/debug/log levels) or
 * console.error (for error level) to comply with the project's no-console rule
 * which restricts direct console usage to warn and error only.
 *
 * @example
 * ```typescript
 * import { logger } from './utils/logger';
 *
 * // Basic logging
 * logger.info('Application started');
 * 
 * // Logging with context
 * logger.warn('High memory usage', { memory: '85%', threshold: '80%' });
 * 
 * // Error logging
 * try {
 *   processData();
 * } catch (error) {
 *   logger.error('Data processing failed', error);
 * }
 * 
 * // Debug logging (development only)
 * logger.debug('Security calculation', { confidentiality: 'High', integrity: 'Moderate' });
 * ```
 */

// Define a prefix for all log messages
const PREFIX = "[CIA-CM]";

/**
 * Logger interface to define the shape of our logger object
 */
interface Logger {
  log(...args: unknown[]): Logger;
  info(message: string, context?: unknown): Logger;
  warn(message: string, context?: unknown): Logger;
  error(message: string, context?: unknown): Logger;
  debug(message: string, context?: unknown): Logger;
}

/**
 * Simple logger interface with different log levels.
 * Uses only console.warn and console.error (ESLint-allowed methods)
 * with level prefixes to distinguish severity.
 */
const logger: Logger = {
  /**
   * Log a general message
   * @param args - Arguments to log
   * @returns The logger instance for chaining
   */
  log(...args: unknown[]): typeof logger {
    console.warn(PREFIX, "[LOG]", ...args);
    return logger;
  },

  /**
   * Log debug message
   *
   * @param message - Message to log
   * @param context - Optional context object
   * @returns The logger instance for chaining
   * 
   * @example
   * ```typescript
   * // Simple debug message
   * logger.debug('Rendering widget');
   * 
   * // Debug with context
   * logger.debug('Service call', { 
   *   endpoint: '/api/security', 
   *   params: { level: 'High' } 
   * });
   * ```
   */
  debug(message: string, context?: unknown): typeof logger {
    if (context !== undefined) {
      console.warn(PREFIX, "[DEBUG]", message, context);
    } else {
      console.warn(PREFIX, "[DEBUG]", message);
    }
    return logger;
  },

  /**
   * Log info message
   *
   * @param message - Message to log
   * @param context - Optional context object
   * @returns The logger instance for chaining
   */
  info(message: string, context?: unknown): typeof logger {
    if (context !== undefined) {
      console.warn(PREFIX, "[INFO]", message, context);
    } else {
      console.warn(PREFIX, "[INFO]", message);
    }
    return logger;
  },

  /**
   * Log warning message
   *
   * @param message - Message to log
   * @param context - Optional context object
   * @returns The logger instance for chaining
   */
  warn(message: string, context?: unknown): typeof logger {
    if (context !== undefined) {
      console.warn(PREFIX, "[WARN]", message, context);
    } else {
      console.warn(PREFIX, "[WARN]", message);
    }
    return logger;
  },

  /**
   * Log error message
   *
   * @param message - Message to log
   * @param context - Optional context object
   * @returns The logger instance for chaining
   */
  error(message: string, context?: unknown): typeof logger {
    if (context !== undefined) {
      console.error(PREFIX, "[ERROR]", message, context);
    } else {
      console.error(PREFIX, "[ERROR]", message);
    }
    return logger;
  },
};

export default logger;
