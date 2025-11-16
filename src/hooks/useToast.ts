import { useState, useCallback } from 'react';
import type { Toast, ToastType } from '../components/common/Toast';

/**
 * Configuration for creating a toast
 */
export interface ToastConfig {
  /**
   * Toast type
   */
  type: ToastType;
  
  /**
   * Toast message
   */
  message: string;
  
  /**
   * Duration in milliseconds before auto-dismiss
   * @default 3000
   */
  duration?: number;
}

/**
 * Return type for useToast hook
 */
export interface UseToastReturn {
  /**
   * Array of current toast notifications
   */
  toasts: Toast[];
  
  /**
   * Show a toast notification
   */
  showToast: (config: ToastConfig) => void;
  
  /**
   * Dismiss a toast notification by ID
   */
  dismissToast: (id: number) => void;
  
  /**
   * Clear all toast notifications
   */
  clearToasts: () => void;
}

/**
 * Hook for managing toast notifications
 * 
 * ## Business Perspective
 * 
 * Provides a simple, centralized way to manage user feedback notifications
 * across the application. Essential for keeping users informed about the
 * success or failure of security operations without disrupting their workflow. 📣
 * 
 * @returns Toast management functions and state
 * 
 * @example
 * ```tsx
 * const { toasts, showToast, dismissToast } = useToast();
 * 
 * // Show success toast
 * showToast({ type: 'success', message: 'Security level updated' });
 * 
 * // Show error toast with custom duration
 * showToast({ type: 'error', message: 'Calculation failed', duration: 5000 });
 * 
 * // Render toast container
 * <ToastContainer toasts={toasts} onDismiss={dismissToast} />
 * ```
 */
export function useToast(): UseToastReturn {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismissToast = useCallback((id: number): void => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((config: ToastConfig): void => {
    const id = Date.now();
    const duration = config.duration || 3000;
    
    const newToast: Toast = {
      id,
      type: config.type,
      message: config.message,
      duration
    };

    setToasts((prev) => [...prev, newToast]);

    // Auto-dismiss after duration
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, duration);
  }, []);

  const clearToasts = useCallback((): void => {
    setToasts([]);
  }, []);

  return {
    toasts,
    showToast,
    dismissToast,
    clearToasts
  };
}

export default useToast;
