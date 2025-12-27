/**
 * Keyboard utilities for shortcut handling and platform detection
 * 
 * @module utils/keyboardUtils
 */

import { Platform, KeyboardEventInfo } from '../types/keyboard';
import { 
  PLATFORM_DETECTION, 
  KEY_DISPLAY_NAMES, 
  INPUT_ELEMENT_TAGS,
  BYPASS_INPUT_CHECK_KEYS 
} from '../constants/keyboardShortcuts';

/**
 * Detect the current platform
 * 
 * @returns The detected platform
 */
export function detectPlatform(): Platform {
  if (typeof window === 'undefined') {
    return 'unknown';
  }
  
  const platform = window.navigator.platform.toUpperCase();
  
  if (platform.indexOf(PLATFORM_DETECTION.MAC) >= 0) {
    return 'mac';
  }
  if (platform.indexOf(PLATFORM_DETECTION.WINDOWS) >= 0) {
    return 'windows';
  }
  if (platform.indexOf(PLATFORM_DETECTION.LINUX) >= 0) {
    return 'linux';
  }
  
  return 'unknown';
}

/**
 * Get platform modifier key (Cmd on Mac, Ctrl elsewhere)
 * 
 * @returns The platform-specific modifier key name
 */
export function getPlatformModifier(): 'cmd' | 'ctrl' {
  const platform = detectPlatform();
  return platform === 'mac' ? 'cmd' : 'ctrl';
}

/**
 * Parse keyboard event into structured information
 * 
 * @param event - The keyboard event
 * @returns Structured keyboard event info
 */
export function parseKeyboardEvent(event: KeyboardEvent): KeyboardEventInfo {
  return {
    key: event.key,
    ctrl: event.ctrlKey,
    shift: event.shiftKey,
    alt: event.altKey,
    meta: event.metaKey,
    originalEvent: event,
  };
}

/**
 * Get key combination string from keyboard event
 * 
 * @param event - The keyboard event
 * @returns Key combination string (e.g., 'ctrl+shift+k')
 */
export function getKeyCombination(event: KeyboardEvent): string {
  const parts: string[] = [];
  
  // Add modifiers in consistent order
  if (event.ctrlKey) parts.push('ctrl');
  if (event.metaKey && detectPlatform() === 'mac') parts.push('cmd');
  if (event.shiftKey) parts.push('shift');
  if (event.altKey) parts.push('alt');
  
  // Add the main key (lowercase for consistency)
  const key = event.key.toLowerCase();
  
  // Handle special keys
  if (key === ' ') {
    parts.push('space');
  } else if (key === 'escape') {
    parts.push('escape');
  } else if (key === 'enter') {
    parts.push('enter');
  } else {
    parts.push(key);
  }
  
  return parts.join('+');
}

/**
 * Normalize shortcut string for comparison
 * 
 * @param shortcut - The shortcut string (e.g., 'Ctrl+K', 'cmd+k')
 * @returns Normalized shortcut string
 */
export function normalizeShortcut(shortcut: string): string {
  return shortcut
    .toLowerCase()
    .split('+')
    .map(part => part.trim())
    .sort()
    .join('+');
}

/**
 * Check if two shortcuts match
 * 
 * @param shortcut1 - First shortcut string
 * @param shortcut2 - Second shortcut string
 * @returns True if shortcuts match
 */
export function shortcutsMatch(shortcut1: string, shortcut2: string): boolean {
  // Handle cmd/ctrl equivalence
  const normalized1 = normalizeShortcut(shortcut1.replace('cmd', 'ctrl'));
  const normalized2 = normalizeShortcut(shortcut2.replace('cmd', 'ctrl'));
  
  return normalized1 === normalized2;
}

/**
 * Format shortcut for display based on platform
 * 
 * @param keys - Key combination string (e.g., 'ctrl+k')
 * @param platform - Target platform (defaults to current)
 * @returns Formatted shortcut string
 */
export function formatShortcut(keys: string, platform?: Platform): string {
  const targetPlatform = platform || detectPlatform();
  
  return keys
    .split('+')
    .map(key => {
      const lowerKey = key.toLowerCase();
      
      // Check if key has platform-specific display name
      if (lowerKey in KEY_DISPLAY_NAMES) {
        const keyName = lowerKey as keyof typeof KEY_DISPLAY_NAMES;
        return KEY_DISPLAY_NAMES[keyName][targetPlatform];
      }
      
      // Capitalize first letter for other keys
      return key.charAt(0).toUpperCase() + key.slice(1);
    })
    .join(targetPlatform === 'mac' ? '' : '+');
}

/**
 * Split formatted shortcut into individual keys for badge display
 * 
 * @param keys - Key combination string
 * @param platform - Target platform
 * @returns Array of individual key display strings
 */
export function splitShortcutKeys(keys: string, platform?: Platform): string[] {
  const targetPlatform = platform || detectPlatform();
  
  return keys
    .split('+')
    .map(key => {
      const lowerKey = key.toLowerCase();
      
      if (lowerKey in KEY_DISPLAY_NAMES) {
        const keyName = lowerKey as keyof typeof KEY_DISPLAY_NAMES;
        return KEY_DISPLAY_NAMES[keyName][targetPlatform];
      }
      
      return key.charAt(0).toUpperCase() + key.slice(1);
    });
}

/**
 * Check if element is an input that should prevent shortcuts
 * 
 * @param element - DOM element to check
 * @returns True if element is an input
 */
export function isInputElement(element: Element | null): boolean {
  if (!element || !element.tagName) {
    return false;
  }
  const tagName = element.tagName.toUpperCase();
  return INPUT_ELEMENT_TAGS.includes(tagName as typeof INPUT_ELEMENT_TAGS[number]);
}

/**
 * Check if keyboard event should be ignored for shortcuts
 * 
 * @param event - Keyboard event
 * @returns True if event should be ignored
 */
export function shouldIgnoreKeyboardEvent(event: KeyboardEvent): boolean {
  const target = event.target as Element | null;
  
  // Check if key should bypass input check (e.g., Escape)
  if (BYPASS_INPUT_CHECK_KEYS.includes(event.key as typeof BYPASS_INPUT_CHECK_KEYS[number])) {
    return false;
  }
  
  // Ignore if focused on input element
  if (target && isInputElement(target)) {
    return true;
  }
  
  // Ignore if contenteditable
  if (target && target.getAttribute && target.getAttribute('contenteditable') === 'true') {
    return true;
  }
  
  return false;
}

/**
 * Get keyboard shortcut for current platform
 * 
 * @param defaultKeys - Default key combination
 * @param platformKeys - Platform-specific overrides
 * @returns Key combination for current platform
 */
export function getPlatformShortcut(
  defaultKeys: string,
  platformKeys?: Partial<Record<Platform, string>>
): string {
  if (!platformKeys) {
    return defaultKeys;
  }
  
  const platform = detectPlatform();
  return platformKeys[platform] || defaultKeys;
}

/**
 * Create accessible label for keyboard shortcut
 * 
 * @param keys - Key combination string
 * @returns Accessible label string
 */
export function getShortcutAriaLabel(keys: string): string {
  const platform = detectPlatform();
  const parts = keys.split('+').map(key => {
    const lowerKey = key.toLowerCase();
    
    // Use full names for screen readers
    if (lowerKey === 'ctrl') return 'Control';
    if (lowerKey === 'cmd') return 'Command';
    if (lowerKey === 'shift') return 'Shift';
    if (lowerKey === 'alt') return platform === 'mac' ? 'Option' : 'Alt';
    if (lowerKey === 'meta') return platform === 'mac' ? 'Command' : 'Meta';
    
    return key.charAt(0).toUpperCase() + key.slice(1);
  });
  
  return parts.join(' + ');
}

/**
 * Check if keyboard shortcuts are supported in the current environment
 * 
 * @returns True if keyboard shortcuts are supported
 */
export function areKeyboardShortcutsSupported(): boolean {
  return typeof window !== 'undefined' && typeof window.addEventListener === 'function';
}
