/**
 * KeyboardShortcutHelp modal component
 * 
 * @module components/common/KeyboardShortcutHelp
 */

import React, { useEffect, useMemo } from 'react';
import { KeyboardShortcutHelpProps, GroupedShortcuts } from '../../types/keyboard';
import { ShortcutBadge } from './ShortcutBadge';
import { SHORTCUT_CATEGORY_LABELS, KEYBOARD_TEST_IDS } from '../../constants/keyboardShortcuts';
import { useKeyboardShortcutContext } from '../../contexts/KeyboardShortcutContext';

/**
 * KeyboardShortcutHelp component displays a modal with all available keyboard shortcuts
 * 
 * @example
 * ```tsx
 * <KeyboardShortcutHelp isOpen={showHelp} onClose={() => setShowHelp(false)} />
 * ```
 */
export const KeyboardShortcutHelp: React.FC<KeyboardShortcutHelpProps> = ({
  isOpen,
  onClose,
  shortcuts: providedShortcuts,
}) => {
  const context = useKeyboardShortcutContext();
  const shortcuts = providedShortcuts || context.shortcuts;

  // Group shortcuts by category
  const groupedShortcuts = useMemo<GroupedShortcuts>(() => {
    const groups: GroupedShortcuts = {};
    
    Object.values(shortcuts).forEach((shortcut) => {
      const category = shortcut.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(shortcut);
    });
    
    return groups;
  }, [shortcuts]);

  // Handle Escape key to close modal
  // Note: This local handler coexists with the global keyboard shortcut handler.
  // The Escape key is marked as a bypass key in BYPASS_INPUT_CHECK_KEYS, ensuring
  // it works correctly in both contexts without conflicts.
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        onClose();
        e.preventDefault();
        e.stopPropagation();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Focus trap for accessibility
  useEffect(() => {
    if (!isOpen) return;

    let cleanup: (() => void) | undefined;

    // Use requestAnimationFrame to ensure modal is in DOM
    const rafId = requestAnimationFrame(() => {
      const modal = document.querySelector('[role="dialog"]');
      if (!modal) return;

      const focusableElements = modal.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleTab = (e: KeyboardEvent): void => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      };

      modal.addEventListener('keydown', handleTab as EventListener);
      firstElement?.focus();

      cleanup = () => modal.removeEventListener('keydown', handleTab as EventListener);
    });

    return () => {
      cancelAnimationFrame(rafId);
      cleanup?.();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={onClose}
      data-testid={KEYBOARD_TEST_IDS.HELP_MODAL}
      aria-label="Close keyboard shortcuts dialog by clicking outside"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="keyboard-shortcuts-title"
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2
            id="keyboard-shortcuts-title"
            className="text-2xl font-bold text-gray-900 dark:text-white"
            data-testid={KEYBOARD_TEST_IDS.HELP_MODAL_TITLE}
          >
            ⌨️ Keyboard Shortcuts
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close keyboard shortcuts"
            data-testid={KEYBOARD_TEST_IDS.HELP_MODAL_CLOSE}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 flex-1">
          {Object.entries(groupedShortcuts).map(([category, categoryShortcuts]) => (
            <div
              key={category}
              className="mb-6 last:mb-0"
              data-testid={KEYBOARD_TEST_IDS.HELP_MODAL_CATEGORY}
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {SHORTCUT_CATEGORY_LABELS[category as keyof typeof SHORTCUT_CATEGORY_LABELS] || category}
              </h3>
              <div className="space-y-2">
                {categoryShortcuts.map((shortcut) => (
                  <div
                    key={shortcut.id}
                    className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    data-testid={KEYBOARD_TEST_IDS.HELP_MODAL_SHORTCUT}
                  >
                    <span className="text-gray-700 dark:text-gray-300">
                      {shortcut.description}
                    </span>
                    <ShortcutBadge
                      shortcut={shortcut.keys}
                      size="md"
                      platformSpecific={true}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Press <ShortcutBadge shortcut="Escape" size="sm" /> to close this dialog
          </p>
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcutHelp;
