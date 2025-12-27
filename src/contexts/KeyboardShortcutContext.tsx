/**
 * Keyboard shortcut context for global shortcut state management
 * 
 * @module contexts/KeyboardShortcutContext
 */

import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';
import { 
  KeyboardShortcutContextValue, 
  ShortcutMap, 
  KeyboardShortcut,
  Platform,
} from '../types/keyboard';
import { detectPlatform } from '../utils/keyboardUtils';
import logger from '../utils/logger';

/**
 * Keyboard shortcut context
 */
const KeyboardShortcutContext = createContext<KeyboardShortcutContextValue | undefined>(undefined);

/**
 * Props for KeyboardShortcutProvider
 */
export interface KeyboardShortcutProviderProps {
  /** Child components */
  children: ReactNode;
  
  /** Initial shortcuts to register */
  initialShortcuts?: ShortcutMap;
  
  /** Whether shortcuts are enabled by default */
  defaultEnabled?: boolean;
}

/**
 * Provider component for keyboard shortcut context
 * 
 * @example
 * ```tsx
 * <KeyboardShortcutProvider>
 *   <App />
 * </KeyboardShortcutProvider>
 * ```
 */
export function KeyboardShortcutProvider({
  children,
  initialShortcuts = {},
  defaultEnabled = true,
}: KeyboardShortcutProviderProps): React.ReactElement {
  const [shortcuts, setShortcuts] = useState<ShortcutMap>(initialShortcuts);
  const [isEnabled, setIsEnabled] = useState<boolean>(defaultEnabled);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [platform] = useState<Platform>(detectPlatform());

  /**
   * Register a new keyboard shortcut
   */
  const registerShortcut = useCallback((shortcut: KeyboardShortcut): void => {
    logger.debug('Registering keyboard shortcut', {
      id: shortcut.id,
      keys: shortcut.keys,
      description: shortcut.description,
    });

    setShortcuts(prev => ({
      ...prev,
      [shortcut.id]: shortcut,
    }));
  }, []);

  /**
   * Unregister a keyboard shortcut by id
   */
  const unregisterShortcut = useCallback((id: string): void => {
    logger.debug('Unregistering keyboard shortcut', { id });

    setShortcuts(prev => {
      const { [id]: removed, ...rest } = prev;
      return rest;
    });
  }, []);

  /**
   * Enable or disable all shortcuts
   */
  const setEnabledCallback = useCallback((enabled: boolean): void => {
    logger.debug('Setting keyboard shortcuts enabled', { enabled });
    setIsEnabled(enabled);
  }, []);

  /**
   * Toggle help modal visibility
   */
  const setShowHelpCallback = useCallback((show: boolean): void => {
    logger.debug('Setting keyboard shortcut help visibility', { show });
    setShowHelp(show);
  }, []);

  // Memoize context value to avoid unnecessary re-renders
  const contextValue = useMemo<KeyboardShortcutContextValue>(
    () => ({
      shortcuts,
      registerShortcut,
      unregisterShortcut,
      isEnabled,
      setEnabled: setEnabledCallback,
      platform,
      showHelp,
      setShowHelp: setShowHelpCallback,
    }),
    [
      shortcuts,
      registerShortcut,
      unregisterShortcut,
      isEnabled,
      setEnabledCallback,
      platform,
      showHelp,
      setShowHelpCallback,
    ]
  );

  return (
    <KeyboardShortcutContext.Provider value={contextValue}>
      {children}
    </KeyboardShortcutContext.Provider>
  );
}

/**
 * Hook to access keyboard shortcut context
 * 
 * @throws Error if used outside of KeyboardShortcutProvider
 * @returns Keyboard shortcut context value
 * 
 * @example
 * ```tsx
 * const { shortcuts, registerShortcut, showHelp, setShowHelp } = useKeyboardShortcutContext();
 * ```
 */
export function useKeyboardShortcutContext(): KeyboardShortcutContextValue {
  const context = useContext(KeyboardShortcutContext);
  
  if (context === undefined) {
    throw new Error(
      'useKeyboardShortcutContext must be used within a KeyboardShortcutProvider'
    );
  }
  
  return context;
}

/**
 * Optional hook to access keyboard shortcut context (returns undefined if not in provider)
 * 
 * @returns Keyboard shortcut context value or undefined
 * 
 * @example
 * ```tsx
 * const context = useKeyboardShortcutContextOptional();
 * if (context) {
 *   // Use context
 * }
 * ```
 */
export function useKeyboardShortcutContextOptional(): KeyboardShortcutContextValue | undefined {
  return useContext(KeyboardShortcutContext);
}
