/**
 * Simple logger utility for consistent logging throughout the application
 *
 * ## Technical Perspective
 *
 * Provides standardized logging across the application with different log levels.
 * Can be extended to support more advanced features like remote logging or log rotation.
 */

// Define a prefix for all log messages
const PREFIX = "[CIA-CM]";

/**
 * Logger interface to define the shape of our logger object
 */
interface Logger {
  log(...args: any[]): Logger;
  info(message: string, context?: any): Logger;
  warn(message: string, context?: any): Logger;
  error(message: string, context?: any): Logger;
  debug(message: string, context?: any): Logger;
}

/**
 * Simple logger interface with different log levels
 */
const logger: Logger = {
  /**
   * Log a message (same as console.log)
   * @param args - Arguments to log
   * @returns The logger instance for chaining
   */
  log(...args: any[]): typeof logger {
    console.log(PREFIX, ...args);
    return logger;
  },

  /**
   * Log debug message
   *
   * @param message - Message to log
   * @param context - Optional context object
   * @returns The logger instance for chaining
   */
  debug(message: string, context?: any): typeof logger {
    if (context !== undefined) {
      console.debug(PREFIX, message, context);
    } else {
      console.debug(PREFIX, message);
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
  info(message: string, context?: any): typeof logger {
    if (context !== undefined) {
      console.info(PREFIX, message, context);
    } else {
      console.info(PREFIX, message);
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
  warn(message: string, context?: any): typeof logger {
    if (context !== undefined) {
      console.warn(PREFIX, message, context);
    } else {
      console.warn(PREFIX, message);
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
  error(message: string, context?: any): typeof logger {
    if (context !== undefined) {
      console.error(PREFIX, message, context);
    } else {
      console.error(PREFIX, message);
    }
    return logger;
  },
};

export default logger;
