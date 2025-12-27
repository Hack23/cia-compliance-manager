/**
 * Type definitions for keyboard shortcuts
 * 
 * @module types/keyboard
 */

import { CIAComponent, SecurityLevel } from './cia';

/**
 * Keyboard shortcut categories for organization
 */
export type ShortcutCategory = 
  | 'Selection'    // Security level selection
  | 'Navigation'   // Widget category navigation
  | 'Actions'      // General actions (export, search, etc.)
  | 'Help'         // Help and documentation
  | 'General';     // General UI operations

/**
 * Modifier keys for keyboard shortcuts
 */
export type ModifierKey = 'ctrl' | 'shift' | 'alt' | 'meta' | 'cmd';

/**
 * Platform types for keyboard shortcut display
 */
export type Platform = 'windows' | 'mac' | 'linux' | 'unknown';

/**
 * Keyboard shortcut definition
 */
export interface KeyboardShortcut {
  /** Unique identifier for the shortcut */
  id: string;
  
  /** Key combination (e.g., 'ctrl+1', 'ctrl+shift+n') */
  keys: string;
  
  /** Human-readable description of what the shortcut does */
  description: string;
  
  /** Category for grouping shortcuts */
  category: ShortcutCategory;
  
  /** Handler function to execute when shortcut is triggered */
  handler: () => void;
  
  /** Whether the shortcut is enabled */
  enabled?: boolean;
  
  /** Platform-specific override (optional) */
  platformKeys?: Partial<Record<Platform, string>>;
}

/**
 * Keyboard shortcut map for registration
 */
export type ShortcutMap = Record<string, KeyboardShortcut>;

/**
 * Props for keyboard shortcut hook
 */
export interface UseKeyboardShortcutsOptions {
  /** Map of shortcuts to register */
  shortcuts: ShortcutMap;
  
  /** Whether shortcuts are enabled */
  enabled?: boolean;
  
  /** Prevent default browser behavior */
  preventDefault?: boolean;
  
  /** Stop event propagation */
  stopPropagation?: boolean;
}

/**
 * Keyboard shortcut context value
 */
export interface KeyboardShortcutContextValue {
  /** All registered shortcuts */
  shortcuts: ShortcutMap;
  
  /** Register a new shortcut */
  registerShortcut: (shortcut: KeyboardShortcut) => void;
  
  /** Unregister a shortcut by id */
  unregisterShortcut: (id: string) => void;
  
  /** Check if shortcuts are enabled */
  isEnabled: boolean;
  
  /** Enable/disable all shortcuts */
  setEnabled: (enabled: boolean) => void;
  
  /** Get current platform */
  platform: Platform;
  
  /** Toggle help modal visibility */
  showHelp: boolean;
  
  /** Set help modal visibility */
  setShowHelp: (show: boolean) => void;
}

/**
 * Props for keyboard shortcut help modal
 */
export interface KeyboardShortcutHelpProps {
  /** Whether the modal is open */
  isOpen: boolean;
  
  /** Callback when modal is closed */
  onClose: () => void;
  
  /** Shortcuts to display (defaults to all) */
  shortcuts?: ShortcutMap;
}

/**
 * Props for shortcut badge component
 */
export interface ShortcutBadgeProps {
  /** Key combination to display */
  shortcut: string;
  
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  
  /** Additional CSS classes */
  className?: string;
  
  /** Whether to show platform-specific keys */
  platformSpecific?: boolean;
}

/**
 * Grouped shortcuts by category for help display
 */
export interface GroupedShortcuts {
  [category: string]: KeyboardShortcut[];
}

// TODO: Future types for v1.1+ feature expansion
// These will be used when implementing additional keyboard shortcuts
// for security level selection, navigation, and general actions
//
// export type SecurityLevelShortcutAction = {
//   component: CIAComponent;
//   level: SecurityLevel;
// };
//
// export type NavigationShortcutAction = 
//   | 'assessment-center'
//   | 'business-value'
//   | 'impact-analysis'
//   | 'implementation-guide';
//
// export type GeneralShortcutAction = 
//   | 'toggle-comparison'
//   | 'export-data'
//   | 'quick-search'
//   | 'show-help'
//   | 'close-modal';
