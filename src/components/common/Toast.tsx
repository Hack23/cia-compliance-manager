import React from 'react';
import { COMMON_COMPONENT_TEST_IDS } from '../../constants/testIds';

/**
 * Toast notification types
 */
export type ToastType = 'success' | 'error' | 'warning' | 'info';

/**
 * Toast notification interface
 */
export interface Toast {
  /**
   * Unique identifier for the toast
   */
  id: number;
  
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
 * Props for Toast component
 */
export interface ToastProps {
  /**
   * Toast configuration
   */
  toast: Toast;
  
  /**
   * Callback when toast is dismissed
   */
  onDismiss: (id: number) => void;
  
  /**
   * Optional test ID
   */
  testId?: string;
}

/**
 * Toast notification component
 * 
 * ## Business Perspective
 * 
 * Toast notifications provide non-intrusive feedback for user actions,
 * keeping users informed about the success or failure of operations
 * without blocking their workflow. Essential for maintaining user
 * confidence in security operations. ✅
 */
export const Toast: React.FC<ToastProps> = ({
  toast,
  onDismiss,
  testId = COMMON_COMPONENT_TEST_IDS.TOAST
}) => {
  const { id, type, message } = toast;

  const typeStyles = {
    success: 'bg-green-500 dark:bg-green-700 text-white',
    error: 'bg-red-500 dark:bg-red-700 text-white',
    warning: 'bg-yellow-500 dark:bg-yellow-700 text-white',
    info: 'bg-blue-500 dark:bg-blue-700 text-white'
  };

  const typeIcons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };

  const typeAriaLabels = {
    success: 'Success message',
    error: 'Error message',
    warning: 'Warning message',
    info: 'Information message'
  };

  return (
    <div
      className={`toast-notification flex items-center justify-between px-4 py-3 rounded-lg shadow-lg ${typeStyles[type]} animate-slide-in-right`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      aria-label={typeAriaLabels[type]}
      data-testid={`${testId}-${id}`}
    >
      <div className="flex items-center gap-2">
        <span 
          className="toast-icon text-xl font-bold"
          data-testid={`${testId}-${id}-icon`}
          aria-hidden="true"
        >
          {typeIcons[type]}
        </span>
        <span 
          className="toast-message"
          data-testid={`${testId}-${id}-message`}
        >
          {message}
        </span>
      </div>
      <button
        onClick={() => onDismiss(id)}
        className="toast-dismiss ml-4 text-white hover:opacity-75 transition-opacity"
        aria-label="Dismiss notification"
        data-testid={`${testId}-${id}-dismiss`}
      >
        ✕
      </button>
    </div>
  );
};

/**
 * Props for ToastContainer component
 */
export interface ToastContainerProps {
  /**
   * Array of toast notifications
   */
  toasts: Toast[];
  
  /**
   * Callback when a toast is dismissed
   */
  onDismiss: (id: number) => void;
  
  /**
   * Position of the toast container
   * @default 'top-right'
   */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center';
  
  /**
   * Optional test ID
   */
  testId?: string;
}

/**
 * Toast container component
 * 
 * Manages the display of multiple toast notifications
 */
export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onDismiss,
  position = 'top-right',
  testId = COMMON_COMPONENT_TEST_IDS.TOAST_CONTAINER
}) => {
  const positionStyles = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2'
  };

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div
      className={`toast-container fixed ${positionStyles[position]} z-50 flex flex-col gap-2 max-w-md`}
      data-testid={testId}
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          onDismiss={onDismiss}
          testId={COMMON_COMPONENT_TEST_IDS.TOAST}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
