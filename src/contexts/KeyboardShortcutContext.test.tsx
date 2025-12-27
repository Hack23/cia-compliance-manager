/**
 * Tests for KeyboardShortcutContext
 */

import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import {
  KeyboardShortcutProvider,
  useKeyboardShortcutContext,
  useKeyboardShortcutContextOptional,
} from './KeyboardShortcutContext';
import { KeyboardShortcut, ShortcutMap } from '../types/keyboard';

describe('KeyboardShortcutContext', () => {
  describe('KeyboardShortcutProvider', () => {
    it('provides context to children', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <KeyboardShortcutProvider>{children}</KeyboardShortcutProvider>
      );

      const { result } = renderHook(() => useKeyboardShortcutContext(), { wrapper });

      expect(result.current).toBeDefined();
      expect(result.current.shortcuts).toEqual({});
      expect(result.current.isEnabled).toBe(true);
      expect(result.current.showHelp).toBe(false);
    });

    it('initializes with initial shortcuts', () => {
      const initialShortcuts: ShortcutMap = {
        test: {
          id: 'test',
          keys: 'ctrl+k',
          description: 'Test',
          category: 'Actions',
          handler: vi.fn(),
        },
      };

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <KeyboardShortcutProvider initialShortcuts={initialShortcuts}>
          {children}
        </KeyboardShortcutProvider>
      );

      const { result } = renderHook(() => useKeyboardShortcutContext(), { wrapper });

      expect(result.current.shortcuts).toEqual(initialShortcuts);
    });

    it('initializes with custom default enabled state', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <KeyboardShortcutProvider defaultEnabled={false}>
          {children}
        </KeyboardShortcutProvider>
      );

      const { result } = renderHook(() => useKeyboardShortcutContext(), { wrapper });

      expect(result.current.isEnabled).toBe(false);
    });
  });

  describe('useKeyboardShortcutContext', () => {
    it('throws error when used outside provider', () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        renderHook(() => useKeyboardShortcutContext());
      }).toThrow('useKeyboardShortcutContext must be used within a KeyboardShortcutProvider');

      consoleSpy.mockRestore();
    });

    it('returns context when used inside provider', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <KeyboardShortcutProvider>{children}</KeyboardShortcutProvider>
      );

      const { result } = renderHook(() => useKeyboardShortcutContext(), { wrapper });

      expect(result.current).toBeDefined();
      expect(result.current.shortcuts).toBeDefined();
      expect(result.current.registerShortcut).toBeDefined();
      expect(result.current.unregisterShortcut).toBeDefined();
    });
  });

  describe('useKeyboardShortcutContextOptional', () => {
    it('returns undefined when used outside provider', () => {
      const { result } = renderHook(() => useKeyboardShortcutContextOptional());

      expect(result.current).toBeUndefined();
    });

    it('returns context when used inside provider', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <KeyboardShortcutProvider>{children}</KeyboardShortcutProvider>
      );

      const { result } = renderHook(() => useKeyboardShortcutContextOptional(), { wrapper });

      expect(result.current).toBeDefined();
    });
  });

  describe('registerShortcut', () => {
    it('registers a new shortcut', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <KeyboardShortcutProvider>{children}</KeyboardShortcutProvider>
      );

      const { result } = renderHook(() => useKeyboardShortcutContext(), { wrapper });

      const newShortcut: KeyboardShortcut = {
        id: 'new-shortcut',
        keys: 'ctrl+n',
        description: 'New shortcut',
        category: 'Actions',
        handler: vi.fn(),
      };

      act(() => {
        result.current.registerShortcut(newShortcut);
      });

      expect(result.current.shortcuts['new-shortcut']).toEqual(newShortcut);
    });

    it('registers multiple shortcuts', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <KeyboardShortcutProvider>{children}</KeyboardShortcutProvider>
      );

      const { result } = renderHook(() => useKeyboardShortcutContext(), { wrapper });

      const shortcut1: KeyboardShortcut = {
        id: 'shortcut1',
        keys: 'ctrl+1',
        description: 'Shortcut 1',
        category: 'Selection',
        handler: vi.fn(),
      };

      const shortcut2: KeyboardShortcut = {
        id: 'shortcut2',
        keys: 'ctrl+2',
        description: 'Shortcut 2',
        category: 'Selection',
        handler: vi.fn(),
      };

      act(() => {
        result.current.registerShortcut(shortcut1);
        result.current.registerShortcut(shortcut2);
      });

      expect(result.current.shortcuts['shortcut1']).toEqual(shortcut1);
      expect(result.current.shortcuts['shortcut2']).toEqual(shortcut2);
    });
  });

  describe('unregisterShortcut', () => {
    it('unregisters an existing shortcut', () => {
      const initialShortcuts: ShortcutMap = {
        test: {
          id: 'test',
          keys: 'ctrl+k',
          description: 'Test',
          category: 'Actions',
          handler: vi.fn(),
        },
      };

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <KeyboardShortcutProvider initialShortcuts={initialShortcuts}>
          {children}
        </KeyboardShortcutProvider>
      );

      const { result } = renderHook(() => useKeyboardShortcutContext(), { wrapper });

      expect(result.current.shortcuts['test']).toBeDefined();

      act(() => {
        result.current.unregisterShortcut('test');
      });

      expect(result.current.shortcuts['test']).toBeUndefined();
    });
  });

  describe('setEnabled', () => {
    it('enables and disables shortcuts', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <KeyboardShortcutProvider>{children}</KeyboardShortcutProvider>
      );

      const { result } = renderHook(() => useKeyboardShortcutContext(), { wrapper });

      expect(result.current.isEnabled).toBe(true);

      act(() => {
        result.current.setEnabled(false);
      });

      expect(result.current.isEnabled).toBe(false);

      act(() => {
        result.current.setEnabled(true);
      });

      expect(result.current.isEnabled).toBe(true);
    });
  });

  describe('setShowHelp', () => {
    it('shows and hides help modal', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <KeyboardShortcutProvider>{children}</KeyboardShortcutProvider>
      );

      const { result } = renderHook(() => useKeyboardShortcutContext(), { wrapper });

      expect(result.current.showHelp).toBe(false);

      act(() => {
        result.current.setShowHelp(true);
      });

      expect(result.current.showHelp).toBe(true);

      act(() => {
        result.current.setShowHelp(false);
      });

      expect(result.current.showHelp).toBe(false);
    });
  });

  describe('platform', () => {
    it('detects platform', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <KeyboardShortcutProvider>{children}</KeyboardShortcutProvider>
      );

      const { result } = renderHook(() => useKeyboardShortcutContext(), { wrapper });

      expect(result.current.platform).toBeDefined();
      expect(['windows', 'mac', 'linux', 'unknown']).toContain(result.current.platform);
    });
  });
});
