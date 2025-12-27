/**
 * Custom hook for keyboard shortcut handling
 * 
 * @module hooks/useKeyboardShortcuts
 */

import { useEffect, useCallback, useRef } from 'react';
import { ShortcutMap, UseKeyboardShortcutsOptions } from '../types/keyboard';
import {
  getKeyCombination,
  shortcutsMatch,
  shouldIgnoreKeyboardEvent,
  getPlatformShortcut,
  areKeyboardShortcutsSupported,
} from '../utils/keyboardUtils';
import logger from '../utils/logger';

/**
 * Custom hook for registering and handling keyboard shortcuts
 * 
 * @param options - Configuration options for keyboard shortcuts
 * 
 * @example
 * ```tsx
 * const shortcuts = {
 *   'save': {
 *     id: 'save',
 *     keys: 'ctrl+s',
 *     description: 'Save document',
 *     category: 'Actions',
 *     handler: () => handleSave(),
 *   }
 * };
 * 
 * useKeyboardShortcuts({
 *   shortcuts,
 *   enabled: true,
 *   preventDefault: true,
 * });
 * ```
 */
export function useKeyboardShortcuts(options: UseKeyboardShortcutsOptions): void {
  const {
    shortcuts,
    enabled = true,
    preventDefault = true,
    stopPropagation = false,
  } = options;

  // Use ref to avoid recreating handler on every render
  const shortcutsRef = useRef<ShortcutMap>(shortcuts);
  const optionsRef = useRef({ preventDefault, stopPropagation });

  // Update refs when values change
  useEffect(() => {
    shortcutsRef.current = shortcuts;
    optionsRef.current = { preventDefault, stopPropagation };
  }, [shortcuts, preventDefault, stopPropagation]);

  /**
   * Handle keyboard event and match against registered shortcuts
   */
  const handleKeyDown = useCallback((event: KeyboardEvent): void => {
    // Skip if shortcuts are not supported or event should be ignored
    if (!areKeyboardShortcutsSupported() || shouldIgnoreKeyboardEvent(event)) {
      return;
    }

    // Get the key combination from the event
    const keyCombination = getKeyCombination(event);

    // Find matching shortcut
    const matchingShortcut = Object.values(shortcutsRef.current).find(shortcut => {
      if (shortcut.enabled === false) {
        return false;
      }

      // Get platform-specific keys if available
      const shortcutKeys = getPlatformShortcut(
        shortcut.keys,
        shortcut.platformKeys
      );

      // Check if keys match
      return shortcutsMatch(keyCombination, shortcutKeys);
    });

    // Execute handler if match found
    if (matchingShortcut) {
      logger.debug('Keyboard shortcut triggered', {
        id: matchingShortcut.id,
        keys: keyCombination,
        description: matchingShortcut.description,
      });

      if (optionsRef.current.preventDefault) {
        event.preventDefault();
      }
      if (optionsRef.current.stopPropagation) {
        event.stopPropagation();
      }

      try {
        matchingShortcut.handler();
      } catch (error) {
        logger.error('Error executing keyboard shortcut handler', {
          id: matchingShortcut.id,
          error,
        });
      }
    }
  }, []);

  // Register and cleanup event listener
  useEffect(() => {
    if (!enabled || !areKeyboardShortcutsSupported()) {
      return;
    }

    logger.debug('Registering keyboard shortcuts', {
      count: Object.keys(shortcuts).length,
      shortcuts: Object.values(shortcuts).map(s => ({
        id: s.id,
        keys: s.keys,
        description: s.description,
      })),
    });

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      logger.debug('Unregistering keyboard shortcuts');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled, handleKeyDown, shortcuts]);
}
