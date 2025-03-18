/**
 * Simple logger utility for consistent logging throughout the application
 * 
 * ## Technical Perspective
 * 
 * Provides standardized logging across the application with different log levels.
 * Can be extended to support more advanced features like remote logging or log rotation.
 */
const logger = {
  /**
   * Log debug message
   * 
   * @param message - Message to log
   * @param context - Optional context object
   */
  debug(message: string, context?: any): void {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[DEBUG] ${message}`, context ? context : '');
    }
  },
  
  /**
   * Log info message
   * 
   * @param message - Message to log
   * @param context - Optional context object
   */
  info(message: string, context?: any): void {
    console.info(`[INFO] ${message}`, context ? context : '');
  },
  
  /**
   * Log warning message
   * 
   * @param message - Message to log
   * @param context - Optional context object
   */
  warn(message: string, context?: any): void {
    console.warn(`[WARN] ${message}`, context ? context : '');
  },
  
  /**
   * Log error message
   * 
   * @param message - Message to log
   * @param context - Optional context object
   */
  error(message: string, context?: any): void {
    console.error(`[ERROR] ${message}`, context ? context : '');
  }
};

export default logger;
