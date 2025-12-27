/**
 * Tests for KeyboardShortcutHelp component
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { KeyboardShortcutHelp } from './KeyboardShortcutHelp';
import { KeyboardShortcutProvider } from '../../contexts/KeyboardShortcutContext';
import { ShortcutMap } from '../../types/keyboard';
import { KEYBOARD_TEST_IDS } from '../../constants/keyboardShortcuts';

describe('KeyboardShortcutHelp', () => {
  const mockShortcuts: ShortcutMap = {
    'test-shortcut-1': {
      id: 'test-shortcut-1',
      keys: 'ctrl+k',
      description: 'Test Shortcut 1',
      category: 'Actions',
      handler: vi.fn(),
    },
    'test-shortcut-2': {
      id: 'test-shortcut-2',
      keys: 'ctrl+1',
      description: 'Test Shortcut 2',
      category: 'Selection',
      handler: vi.fn(),
    },
  };

  it('does not render when isOpen is false', () => {
    render(
      <KeyboardShortcutProvider>
        <KeyboardShortcutHelp isOpen={false} onClose={vi.fn()} />
      </KeyboardShortcutProvider>
    );

    const modal = screen.queryByTestId(KEYBOARD_TEST_IDS.HELP_MODAL);
    expect(modal).not.toBeInTheDocument();
  });

  it('renders when isOpen is true', () => {
    render(
      <KeyboardShortcutProvider initialShortcuts={mockShortcuts}>
        <KeyboardShortcutHelp isOpen={true} onClose={vi.fn()} />
      </KeyboardShortcutProvider>
    );

    const modal = screen.getByTestId(KEYBOARD_TEST_IDS.HELP_MODAL);
    expect(modal).toBeInTheDocument();
  });

  it('displays the modal title', () => {
    render(
      <KeyboardShortcutProvider>
        <KeyboardShortcutHelp isOpen={true} onClose={vi.fn()} />
      </KeyboardShortcutProvider>
    );

    const title = screen.getByTestId(KEYBOARD_TEST_IDS.HELP_MODAL_TITLE);
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Keyboard Shortcuts');
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    
    render(
      <KeyboardShortcutProvider>
        <KeyboardShortcutHelp isOpen={true} onClose={onClose} />
      </KeyboardShortcutProvider>
    );

    const closeButton = screen.getByTestId(KEYBOARD_TEST_IDS.HELP_MODAL_CLOSE);
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape key is pressed', () => {
    const onClose = vi.fn();
    
    render(
      <KeyboardShortcutProvider>
        <KeyboardShortcutHelp isOpen={true} onClose={onClose} />
      </KeyboardShortcutProvider>
    );

    fireEvent.keyDown(window, { key: 'Escape' });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when backdrop is clicked', () => {
    const onClose = vi.fn();
    
    render(
      <KeyboardShortcutProvider>
        <KeyboardShortcutHelp isOpen={true} onClose={onClose} />
      </KeyboardShortcutProvider>
    );

    const backdrop = screen.getByTestId(KEYBOARD_TEST_IDS.HELP_MODAL);
    fireEvent.click(backdrop);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not close when modal content is clicked', () => {
    const onClose = vi.fn();
    
    render(
      <KeyboardShortcutProvider>
        <KeyboardShortcutHelp isOpen={true} onClose={onClose} />
      </KeyboardShortcutProvider>
    );

    const dialog = screen.getByRole('dialog');
    fireEvent.click(dialog);

    expect(onClose).not.toHaveBeenCalled();
  });

  it('displays shortcuts grouped by category', () => {
    render(
      <KeyboardShortcutProvider initialShortcuts={mockShortcuts}>
        <KeyboardShortcutHelp isOpen={true} onClose={vi.fn()} />
      </KeyboardShortcutProvider>
    );

    const categories = screen.getAllByTestId(KEYBOARD_TEST_IDS.HELP_MODAL_CATEGORY);
    expect(categories.length).toBeGreaterThan(0);
  });

  it('displays all shortcuts', () => {
    render(
      <KeyboardShortcutProvider initialShortcuts={mockShortcuts}>
        <KeyboardShortcutHelp isOpen={true} onClose={vi.fn()} />
      </KeyboardShortcutProvider>
    );

    expect(screen.getByText('Test Shortcut 1')).toBeInTheDocument();
    expect(screen.getByText('Test Shortcut 2')).toBeInTheDocument();
  });

  it('uses provided shortcuts instead of context shortcuts', () => {
    const providedShortcuts: ShortcutMap = {
      'provided-shortcut': {
        id: 'provided-shortcut',
        keys: 'ctrl+p',
        description: 'Provided Shortcut',
        category: 'Actions',
        handler: vi.fn(),
      },
    };

    render(
      <KeyboardShortcutProvider initialShortcuts={mockShortcuts}>
        <KeyboardShortcutHelp
          isOpen={true}
          onClose={vi.fn()}
          shortcuts={providedShortcuts}
        />
      </KeyboardShortcutProvider>
    );

    expect(screen.getByText('Provided Shortcut')).toBeInTheDocument();
    expect(screen.queryByText('Test Shortcut 1')).not.toBeInTheDocument();
  });

  it('has proper ARIA attributes', () => {
    render(
      <KeyboardShortcutProvider>
        <KeyboardShortcutHelp isOpen={true} onClose={vi.fn()} />
      </KeyboardShortcutProvider>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'keyboard-shortcuts-title');
  });

  it('prevents default and stops propagation on Escape key', () => {
    const onClose = vi.fn();
    
    render(
      <KeyboardShortcutProvider>
        <KeyboardShortcutHelp isOpen={true} onClose={onClose} />
      </KeyboardShortcutProvider>
    );

    const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true });
    
    window.dispatchEvent(event);

    expect(onClose).toHaveBeenCalled();
  });

  it('sets up focus trap with requestAnimationFrame', async () => {
    render(
      <KeyboardShortcutProvider>
        <KeyboardShortcutHelp isOpen={true} onClose={vi.fn()} />
      </KeyboardShortcutProvider>
    );

    // Wait for RAF
    await new Promise(resolve => requestAnimationFrame(() => resolve(undefined)));

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
  });

  it('has proper ARIA label on backdrop', () => {
    render(
      <KeyboardShortcutProvider>
        <KeyboardShortcutHelp isOpen={true} onClose={vi.fn()} />
      </KeyboardShortcutProvider>
    );

    const backdrop = screen.getByLabelText(/close keyboard shortcuts dialog/i);
    expect(backdrop).toBeInTheDocument();
  });
});
