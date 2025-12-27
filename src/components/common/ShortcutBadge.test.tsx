/**
 * Tests for ShortcutBadge component
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { ShortcutBadge } from './ShortcutBadge';
import { KEYBOARD_TEST_IDS } from '../../constants/keyboardShortcuts';

describe('ShortcutBadge', () => {
  const originalPlatform = window.navigator.platform;

  afterEach(() => {
    // Restore original platform
    Object.defineProperty(window.navigator, 'platform', {
      value: originalPlatform,
      writable: true,
      configurable: true,
    });
  });

  it('renders a single key shortcut', () => {
    render(<ShortcutBadge shortcut="k" />);
    
    const badge = screen.getByTestId(KEYBOARD_TEST_IDS.SHORTCUT_BADGE);
    expect(badge).toBeInTheDocument();
    
    const keys = screen.getAllByTestId(KEYBOARD_TEST_IDS.SHORTCUT_BADGE_KEY);
    expect(keys).toHaveLength(1);
    expect(keys[0]).toHaveTextContent('K');
  });

  it('renders multiple key shortcut with separator', () => {
    render(<ShortcutBadge shortcut="ctrl+k" />);
    
    const keys = screen.getAllByTestId(KEYBOARD_TEST_IDS.SHORTCUT_BADGE_KEY);
    expect(keys.length).toBeGreaterThan(1);
    
    // Check for separator
    const separator = screen.getByText('+');
    expect(separator).toBeInTheDocument();
  });

  it('applies small size class', () => {
    render(<ShortcutBadge shortcut="k" size="sm" />);
    
    const key = screen.getByTestId(KEYBOARD_TEST_IDS.SHORTCUT_BADGE_KEY);
    expect(key).toHaveClass('text-xs');
  });

  it('applies medium size class', () => {
    render(<ShortcutBadge shortcut="k" size="md" />);
    
    const key = screen.getByTestId(KEYBOARD_TEST_IDS.SHORTCUT_BADGE_KEY);
    expect(key).toHaveClass('text-sm');
  });

  it('applies large size class', () => {
    render(<ShortcutBadge shortcut="k" size="lg" />);
    
    const key = screen.getByTestId(KEYBOARD_TEST_IDS.SHORTCUT_BADGE_KEY);
    expect(key).toHaveClass('text-base');
  });

  it('applies custom className', () => {
    render(<ShortcutBadge shortcut="k" className="custom-class" />);
    
    const badge = screen.getByTestId(KEYBOARD_TEST_IDS.SHORTCUT_BADGE);
    expect(badge).toHaveClass('custom-class');
  });

  it('renders platform-specific keys on Mac', () => {
    Object.defineProperty(window.navigator, 'platform', {
      value: 'MacIntel',
      writable: true,
      configurable: true,
    });

    render(<ShortcutBadge shortcut="ctrl+k" platformSpecific={true} />);
    
    const keys = screen.getAllByTestId(KEYBOARD_TEST_IDS.SHORTCUT_BADGE_KEY);
    expect(keys[0]).toHaveTextContent('⌘');
  });

  it('renders generic keys when platformSpecific is false', () => {
    Object.defineProperty(window.navigator, 'platform', {
      value: 'MacIntel',
      writable: true,
      configurable: true,
    });

    render(<ShortcutBadge shortcut="ctrl+k" platformSpecific={false} />);
    
    const keys = screen.getAllByTestId(KEYBOARD_TEST_IDS.SHORTCUT_BADGE_KEY);
    // Should show Ctrl (generic) even on Mac when platformSpecific is false
    expect(keys[0]).toHaveTextContent('Ctrl');
  });

  it('includes aria-label for accessibility', () => {
    render(<ShortcutBadge shortcut="ctrl+k" />);
    
    const badge = screen.getByTestId(KEYBOARD_TEST_IDS.SHORTCUT_BADGE);
    expect(badge).toHaveAttribute('aria-label', 'Keyboard shortcut: ctrl+k');
  });

  it('renders complex shortcut with multiple modifiers', () => {
    render(<ShortcutBadge shortcut="ctrl+shift+alt+k" />);
    
    const keys = screen.getAllByTestId(KEYBOARD_TEST_IDS.SHORTCUT_BADGE_KEY);
    expect(keys.length).toBeGreaterThanOrEqual(4);
  });
});
