/**
 * Centralized keyboard shortcut definitions
 * 
 * @module constants/keyboardShortcuts
 */

import { ShortcutCategory } from '../types/keyboard';

/**
 * Keyboard shortcut configuration constants
 * 
 * These shortcuts follow cross-platform conventions and avoid conflicts
 * with browser default shortcuts.
 */
export const KEYBOARD_SHORTCUTS = {
  SELECT_NONE: {
    id: 'select-none',
    keys: 'alt+1',
    description: 'Set security level to None',
    category: 'Selection' as ShortcutCategory,
  },
  SELECT_LOW: {
    id: 'select-low',
    keys: 'alt+2',
    description: 'Set security level to Low',
    category: 'Selection' as ShortcutCategory,
  },
  SELECT_MODERATE: {
    id: 'select-moderate',
    keys: 'alt+3',
    description: 'Set security level to Moderate',
    category: 'Selection' as ShortcutCategory,
  },
  SELECT_HIGH: {
    id: 'select-high',
    keys: 'alt+4',
    description: 'Set security level to High',
    category: 'Selection' as ShortcutCategory,
  },
  SELECT_VERY_HIGH: {
    id: 'select-very-high',
    keys: 'alt+5',
    description: 'Set security level to Very High',
    category: 'Selection' as ShortcutCategory,
  },
  
  NAV_ASSESSMENT: {
    id: 'nav-assessment',
    keys: 'ctrl+shift+1',
    description: 'Navigate to Assessment Center',
    category: 'Navigation' as ShortcutCategory,
  },
  NAV_BUSINESS: {
    id: 'nav-business',
    keys: 'ctrl+shift+2',
    description: 'Navigate to Business Value',
    category: 'Navigation' as ShortcutCategory,
  },
  NAV_IMPACT: {
    id: 'nav-impact',
    keys: 'ctrl+shift+3',
    description: 'Navigate to Impact Analysis',
    category: 'Navigation' as ShortcutCategory,
  },
  NAV_IMPLEMENTATION: {
    id: 'nav-implementation',
    keys: 'ctrl+shift+4',
    description: 'Navigate to Implementation Guide',
    category: 'Navigation' as ShortcutCategory,
  },
  
  TOGGLE_COMPARISON: {
    id: 'toggle-comparison',
    keys: 'ctrl+m',
    description: 'Toggle comparison mode',
    category: 'Actions' as ShortcutCategory,
  },
  EXPORT_DATA: {
    id: 'export-data',
    keys: 'ctrl+shift+e',
    description: 'Export assessment data',
    category: 'Actions' as ShortcutCategory,
  },
  QUICK_SEARCH: {
    id: 'quick-search',
    keys: 'ctrl+shift+k',
    description: 'Quick search/filter',
    category: 'Actions' as ShortcutCategory,
    platformKeys: {
      mac: 'cmd+shift+k',
    },
  },
  SHOW_HELP: {
    id: 'show-help',
    keys: '?',
    description: 'Show keyboard shortcuts',
    category: 'Help' as ShortcutCategory,
  },
  SHOW_HELP_ALT: {
    id: 'show-help-alt',
    keys: 'ctrl/',
    description: 'Show keyboard shortcuts (alternative)',
    category: 'Help' as ShortcutCategory,
  },
} as const;

/**
 * Keyboard shortcut IDs for type-safe access
 */
export type KeyboardShortcutId = keyof typeof KEYBOARD_SHORTCUTS;

/**
 * Category labels for help display
 */
export const SHORTCUT_CATEGORY_LABELS: Record<ShortcutCategory, string> = {
  Selection: '🎯 Security Level Selection',
  Navigation: '🧭 Navigation',
  Actions: '⚡ Actions',
  Help: '❓ Help',
  General: '📋 General',
};

/**
 * Platform detection strings
 */
export const PLATFORM_DETECTION = {
  MAC: 'MAC',
  WINDOWS: 'WIN',
  LINUX: 'LINUX',
} as const;

/**
 * Key display names for different platforms
 */
export const KEY_DISPLAY_NAMES = {
  ctrl: {
    windows: 'Ctrl',
    mac: '⌘',
    linux: 'Ctrl',
    unknown: 'Ctrl',
  },
  shift: {
    windows: 'Shift',
    mac: '⇧',
    linux: 'Shift',
    unknown: 'Shift',
  },
  alt: {
    windows: 'Alt',
    mac: '⌥',
    linux: 'Alt',
    unknown: 'Alt',
  },
  meta: {
    windows: 'Win',
    mac: '⌘',
    linux: 'Meta',
    unknown: 'Meta',
  },
  cmd: {
    windows: 'Ctrl',
    mac: '⌘',
    linux: 'Ctrl',
    unknown: 'Ctrl',
  },
  enter: {
    windows: 'Enter',
    mac: '↵',
    linux: 'Enter',
    unknown: 'Enter',
  },
  escape: {
    windows: 'Esc',
    mac: 'Esc',
    linux: 'Esc',
    unknown: 'Esc',
  },
  backspace: {
    windows: 'Backspace',
    mac: '⌫',
    linux: 'Backspace',
    unknown: 'Backspace',
  },
  tab: {
    windows: 'Tab',
    mac: '⇥',
    linux: 'Tab',
    unknown: 'Tab',
  },
  arrowup: {
    windows: '↑',
    mac: '↑',
    linux: '↑',
    unknown: '↑',
  },
  arrowdown: {
    windows: '↓',
    mac: '↓',
    linux: '↓',
    unknown: '↓',
  },
  arrowleft: {
    windows: '←',
    mac: '←',
    linux: '←',
    unknown: '←',
  },
  arrowright: {
    windows: '→',
    mac: '→',
    linux: '→',
    unknown: '→',
  },
} as const;

/**
 * Keys that should not trigger shortcuts when focused in input elements
 */
export const INPUT_ELEMENT_TAGS = ['INPUT', 'TEXTAREA', 'SELECT'] as const;

/**
 * Keys that should bypass input element check
 */
export const BYPASS_INPUT_CHECK_KEYS = ['Escape', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'] as const;

/**
 * Test IDs for keyboard shortcut components
 */
export const KEYBOARD_TEST_IDS = {
  HELP_MODAL: 'keyboard-shortcut-help-modal',
  HELP_MODAL_CLOSE: 'keyboard-shortcut-help-modal-close',
  HELP_MODAL_TITLE: 'keyboard-shortcut-help-modal-title',
  HELP_MODAL_CATEGORY: 'keyboard-shortcut-help-modal-category',
  HELP_MODAL_SHORTCUT: 'keyboard-shortcut-help-modal-shortcut',
  SHORTCUT_BADGE: 'keyboard-shortcut-badge',
  SHORTCUT_BADGE_KEY: 'keyboard-shortcut-badge-key',
} as const;
