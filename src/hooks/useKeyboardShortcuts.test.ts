/**
 * Tests for useKeyboardShortcuts hook
 */

import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useKeyboardShortcuts } from './useKeyboardShortcuts';
import { ShortcutMap } from '../types/keyboard';

describe('useKeyboardShortcuts', () => {
  let mockHandler: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockHandler = vi.fn();
  });

  it('registers keyboard event listener when enabled', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    
    const shortcuts: ShortcutMap = {
      test: {
        id: 'test',
        keys: 'ctrl+k',
        description: 'Test shortcut',
        category: 'Actions',
        handler: mockHandler,
      },
    };

    renderHook(() => useKeyboardShortcuts({ shortcuts, enabled: true }));

    expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    
    addEventListenerSpy.mockRestore();
  });

  it('does not register event listener when disabled', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    
    const shortcuts: ShortcutMap = {
      test: {
        id: 'test',
        keys: 'ctrl+k',
        description: 'Test shortcut',
        category: 'Actions',
        handler: mockHandler,
      },
    };

    renderHook(() => useKeyboardShortcuts({ shortcuts, enabled: false }));

    expect(addEventListenerSpy).not.toHaveBeenCalled();
    
    addEventListenerSpy.mockRestore();
  });

  it('triggers handler when matching shortcut is pressed', () => {
    const shortcuts: ShortcutMap = {
      test: {
        id: 'test',
        keys: 'ctrl+k',
        description: 'Test shortcut',
        category: 'Actions',
        handler: mockHandler,
      },
    };

    renderHook(() => useKeyboardShortcuts({ shortcuts, enabled: true }));

    const event = new KeyboardEvent('keydown', {
      key: 'k',
      ctrlKey: true,
      bubbles: true,
    });
    window.dispatchEvent(event);

    expect(mockHandler).toHaveBeenCalledTimes(1);
  });

  it('does not trigger handler for non-matching shortcuts', () => {
    const shortcuts: ShortcutMap = {
      test: {
        id: 'test',
        keys: 'ctrl+k',
        description: 'Test shortcut',
        category: 'Actions',
        handler: mockHandler,
      },
    };

    renderHook(() => useKeyboardShortcuts({ shortcuts, enabled: true }));

    const event = new KeyboardEvent('keydown', {
      key: 'j',
      ctrlKey: true,
      bubbles: true,
    });
    window.dispatchEvent(event);

    expect(mockHandler).not.toHaveBeenCalled();
  });

  it('prevents default when preventDefault is true', () => {
    const shortcuts: ShortcutMap = {
      test: {
        id: 'test',
        keys: 'ctrl+k',
        description: 'Test shortcut',
        category: 'Actions',
        handler: mockHandler,
      },
    };

    renderHook(() => 
      useKeyboardShortcuts({ shortcuts, enabled: true, preventDefault: true })
    );

    const event = new KeyboardEvent('keydown', {
      key: 'k',
      ctrlKey: true,
      bubbles: true,
      cancelable: true,
    });
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
    
    window.dispatchEvent(event);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('does not prevent default when preventDefault is false', () => {
    const shortcuts: ShortcutMap = {
      test: {
        id: 'test',
        keys: 'ctrl+k',
        description: 'Test shortcut',
        category: 'Actions',
        handler: mockHandler,
      },
    };

    renderHook(() => 
      useKeyboardShortcuts({ shortcuts, enabled: true, preventDefault: false })
    );

    const event = new KeyboardEvent('keydown', {
      key: 'k',
      ctrlKey: true,
      bubbles: true,
      cancelable: true,
    });
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
    
    window.dispatchEvent(event);

    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });

  it('does not trigger disabled shortcuts', () => {
    const shortcuts: ShortcutMap = {
      test: {
        id: 'test',
        keys: 'ctrl+k',
        description: 'Test shortcut',
        category: 'Actions',
        handler: mockHandler,
        enabled: false,
      },
    };

    renderHook(() => useKeyboardShortcuts({ shortcuts, enabled: true }));

    const event = new KeyboardEvent('keydown', {
      key: 'k',
      ctrlKey: true,
      bubbles: true,
    });
    window.dispatchEvent(event);

    expect(mockHandler).not.toHaveBeenCalled();
  });

  it('ignores shortcuts when focused on input element', () => {
    const shortcuts: ShortcutMap = {
      test: {
        id: 'test',
        keys: 'ctrl+k',
        description: 'Test shortcut',
        category: 'Actions',
        handler: mockHandler,
      },
    };

    renderHook(() => useKeyboardShortcuts({ shortcuts, enabled: true }));

    const input = document.createElement('input');
    document.body.appendChild(input);
    input.focus();

    const event = new KeyboardEvent('keydown', {
      key: 'k',
      ctrlKey: true,
      bubbles: true,
    });
    Object.defineProperty(event, 'target', { value: input, writable: false });
    
    window.dispatchEvent(event);

    expect(mockHandler).not.toHaveBeenCalled();
    
    document.body.removeChild(input);
  });

  it('cleans up event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    
    const shortcuts: ShortcutMap = {
      test: {
        id: 'test',
        keys: 'ctrl+k',
        description: 'Test shortcut',
        category: 'Actions',
        handler: mockHandler,
      },
    };

    const { unmount } = renderHook(() => 
      useKeyboardShortcuts({ shortcuts, enabled: true })
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    
    removeEventListenerSpy.mockRestore();
  });

  it('handles multiple shortcuts', () => {
    const handler1 = vi.fn();
    const handler2 = vi.fn();

    const shortcuts: ShortcutMap = {
      test1: {
        id: 'test1',
        keys: 'ctrl+k',
        description: 'Test shortcut 1',
        category: 'Actions',
        handler: handler1,
      },
      test2: {
        id: 'test2',
        keys: 'ctrl+j',
        description: 'Test shortcut 2',
        category: 'Actions',
        handler: handler2,
      },
    };

    renderHook(() => useKeyboardShortcuts({ shortcuts, enabled: true }));

    // Trigger first shortcut
    const event1 = new KeyboardEvent('keydown', {
      key: 'k',
      ctrlKey: true,
      bubbles: true,
    });
    window.dispatchEvent(event1);

    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler2).not.toHaveBeenCalled();

    // Trigger second shortcut
    const event2 = new KeyboardEvent('keydown', {
      key: 'j',
      ctrlKey: true,
      bubbles: true,
    });
    window.dispatchEvent(event2);

    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler2).toHaveBeenCalledTimes(1);
  });
});
