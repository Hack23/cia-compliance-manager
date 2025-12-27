/**
 * Tests for keyboard utilities
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  detectPlatform,
  getPlatformModifier,
  getKeyCombination,
  normalizeShortcut,
  shortcutsMatch,
  formatShortcut,
  splitShortcutKeys,
  isInputElement,
  shouldIgnoreKeyboardEvent,
  getPlatformShortcut,
  getShortcutAriaLabel,
  areKeyboardShortcutsSupported,
} from './keyboardUtils';

describe('keyboardUtils', () => {
  describe('detectPlatform', () => {
    it('detects Mac platform', () => {
      const originalPlatform = window.navigator.platform;
      Object.defineProperty(window.navigator, 'platform', {
        value: 'MacIntel',
        writable: true,
        configurable: true,
      });
      
      expect(detectPlatform()).toBe('mac');
      
      Object.defineProperty(window.navigator, 'platform', {
        value: originalPlatform,
        writable: true,
        configurable: true,
      });
    });

    it('detects Windows platform', () => {
      const originalPlatform = window.navigator.platform;
      Object.defineProperty(window.navigator, 'platform', {
        value: 'Win32',
        writable: true,
        configurable: true,
      });
      
      expect(detectPlatform()).toBe('windows');
      
      Object.defineProperty(window.navigator, 'platform', {
        value: originalPlatform,
        writable: true,
        configurable: true,
      });
    });

    it('detects Linux platform', () => {
      const originalPlatform = window.navigator.platform;
      Object.defineProperty(window.navigator, 'platform', {
        value: 'Linux x86_64',
        writable: true,
        configurable: true,
      });
      
      expect(detectPlatform()).toBe('linux');
      
      Object.defineProperty(window.navigator, 'platform', {
        value: originalPlatform,
        writable: true,
        configurable: true,
      });
    });

    it('returns unknown for unrecognized platforms', () => {
      const originalPlatform = window.navigator.platform;
      Object.defineProperty(window.navigator, 'platform', {
        value: 'Unknown',
        writable: true,
        configurable: true,
      });
      
      expect(detectPlatform()).toBe('unknown');
      
      Object.defineProperty(window.navigator, 'platform', {
        value: originalPlatform,
        writable: true,
        configurable: true,
      });
    });
  });

  describe('getPlatformModifier', () => {
    it('returns cmd for Mac', () => {
      const originalPlatform = window.navigator.platform;
      Object.defineProperty(window.navigator, 'platform', {
        value: 'MacIntel',
        writable: true,
        configurable: true,
      });
      
      expect(getPlatformModifier()).toBe('cmd');
      
      Object.defineProperty(window.navigator, 'platform', {
        value: originalPlatform,
        writable: true,
        configurable: true,
      });
    });

    it('returns ctrl for non-Mac platforms', () => {
      const originalPlatform = window.navigator.platform;
      Object.defineProperty(window.navigator, 'platform', {
        value: 'Win32',
        writable: true,
        configurable: true,
      });
      
      expect(getPlatformModifier()).toBe('ctrl');
      
      Object.defineProperty(window.navigator, 'platform', {
        value: originalPlatform,
        writable: true,
        configurable: true,
      });
    });
  });

  describe('getKeyCombination', () => {
    it('handles single key press', () => {
      const event = new KeyboardEvent('keydown', { key: 'k' });
      expect(getKeyCombination(event)).toBe('k');
    });

    it('handles ctrl+key combination', () => {
      const event = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true });
      expect(getKeyCombination(event)).toBe('ctrl+k');
    });

    it('handles shift+key combination', () => {
      const event = new KeyboardEvent('keydown', { key: 'K', shiftKey: true });
      expect(getKeyCombination(event)).toBe('shift+k');
    });

    it('handles multiple modifiers', () => {
      const event = new KeyboardEvent('keydown', { 
        key: 'k', 
        ctrlKey: true, 
        shiftKey: true 
      });
      expect(getKeyCombination(event)).toBe('ctrl+shift+k');
    });

    it('handles special keys', () => {
      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      expect(getKeyCombination(escapeEvent)).toBe('escape');
      
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      expect(getKeyCombination(enterEvent)).toBe('enter');
    });
  });

  describe('normalizeShortcut', () => {
    it('normalizes shortcut to lowercase', () => {
      expect(normalizeShortcut('Ctrl+K')).toBe('ctrl+k');
    });

    it('sorts modifier keys consistently', () => {
      expect(normalizeShortcut('k+shift+ctrl')).toBe('ctrl+k+shift');
    });

    it('trims whitespace', () => {
      expect(normalizeShortcut(' ctrl + k ')).toBe('ctrl+k');
    });
  });

  describe('shortcutsMatch', () => {
    it('matches identical shortcuts', () => {
      expect(shortcutsMatch('ctrl+k', 'ctrl+k')).toBe(true);
    });

    it('matches shortcuts with different order', () => {
      expect(shortcutsMatch('shift+ctrl+k', 'ctrl+shift+k')).toBe(true);
    });

    it('matches cmd and ctrl as equivalent', () => {
      expect(shortcutsMatch('cmd+k', 'ctrl+k')).toBe(true);
    });

    it('does not match different shortcuts', () => {
      expect(shortcutsMatch('ctrl+k', 'ctrl+j')).toBe(false);
    });
  });

  describe('formatShortcut', () => {
    it('formats shortcut for Windows', () => {
      expect(formatShortcut('ctrl+k', 'windows')).toBe('Ctrl+K');
    });

    it('formats shortcut for Mac', () => {
      expect(formatShortcut('ctrl+k', 'mac')).toBe('⌘K');
    });

    it('formats shortcut for Linux', () => {
      expect(formatShortcut('ctrl+k', 'linux')).toBe('Ctrl+K');
    });
  });

  describe('splitShortcutKeys', () => {
    it('splits shortcut into individual keys', () => {
      const keys = splitShortcutKeys('ctrl+shift+k', 'windows');
      expect(keys).toEqual(['Ctrl', 'Shift', 'K']);
    });

    it('uses platform-specific symbols', () => {
      const keys = splitShortcutKeys('ctrl+k', 'mac');
      expect(keys).toEqual(['⌘', 'K']);
    });
  });

  describe('isInputElement', () => {
    it('returns true for input element', () => {
      const input = document.createElement('input');
      expect(isInputElement(input)).toBe(true);
    });

    it('returns true for textarea element', () => {
      const textarea = document.createElement('textarea');
      expect(isInputElement(textarea)).toBe(true);
    });

    it('returns true for select element', () => {
      const select = document.createElement('select');
      expect(isInputElement(select)).toBe(true);
    });

    it('returns false for div element', () => {
      const div = document.createElement('div');
      expect(isInputElement(div)).toBe(false);
    });
  });

  describe('shouldIgnoreKeyboardEvent', () => {
    it('ignores events on input elements', () => {
      const input = document.createElement('input');
      const event = new KeyboardEvent('keydown', { 
        key: 'k',
        bubbles: true 
      });
      Object.defineProperty(event, 'target', { value: input, writable: false });
      
      expect(shouldIgnoreKeyboardEvent(event)).toBe(true);
    });

    it('does not ignore Escape key on input elements', () => {
      const input = document.createElement('input');
      const event = new KeyboardEvent('keydown', { 
        key: 'Escape',
        bubbles: true 
      });
      Object.defineProperty(event, 'target', { value: input, writable: false });
      
      expect(shouldIgnoreKeyboardEvent(event)).toBe(false);
    });

    it('ignores events on contenteditable elements', () => {
      const div = document.createElement('div');
      div.setAttribute('contenteditable', 'true');
      const event = new KeyboardEvent('keydown', { 
        key: 'k',
        bubbles: true 
      });
      Object.defineProperty(event, 'target', { value: div, writable: false });
      
      expect(shouldIgnoreKeyboardEvent(event)).toBe(true);
    });

    it('does not ignore events on regular elements', () => {
      const div = document.createElement('div');
      const event = new KeyboardEvent('keydown', { 
        key: 'k',
        bubbles: true 
      });
      Object.defineProperty(event, 'target', { value: div, writable: false });
      
      expect(shouldIgnoreKeyboardEvent(event)).toBe(false);
    });
  });

  describe('getPlatformShortcut', () => {
    it('returns default keys when no platform override', () => {
      expect(getPlatformShortcut('ctrl+k')).toBe('ctrl+k');
    });

    it('returns platform-specific keys when available', () => {
      const originalPlatform = window.navigator.platform;
      Object.defineProperty(window.navigator, 'platform', {
        value: 'MacIntel',
        writable: true,
        configurable: true,
      });
      
      const result = getPlatformShortcut('ctrl+k', { mac: 'cmd+k' });
      expect(result).toBe('cmd+k');
      
      Object.defineProperty(window.navigator, 'platform', {
        value: originalPlatform,
        writable: true,
        configurable: true,
      });
    });

    it('returns default when platform not in overrides', () => {
      expect(getPlatformShortcut('ctrl+k', { mac: 'cmd+k' })).toBe('ctrl+k');
    });
  });

  describe('getShortcutAriaLabel', () => {
    it('creates accessible label for single key', () => {
      expect(getShortcutAriaLabel('k')).toBe('K');
    });

    it('creates accessible label with modifiers', () => {
      expect(getShortcutAriaLabel('ctrl+k')).toBe('Control + K');
    });

    it('creates accessible label with multiple modifiers', () => {
      expect(getShortcutAriaLabel('ctrl+shift+k')).toBe('Control + Shift + K');
    });
  });

  describe('areKeyboardShortcutsSupported', () => {
    it('returns true in browser environment', () => {
      expect(areKeyboardShortcutsSupported()).toBe(true);
    });
  });
});
