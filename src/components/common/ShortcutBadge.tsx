/**
 * ShortcutBadge component for displaying keyboard shortcuts
 * 
 * @module components/common/ShortcutBadge
 */

import React from 'react';
import { ShortcutBadgeProps } from '../../types/keyboard';
import { splitShortcutKeys, detectPlatform } from '../../utils/keyboardUtils';
import { KEYBOARD_TEST_IDS } from '../../constants/keyboardShortcuts';

// Size classes defined outside component to avoid recreation on each render
const SIZE_CLASSES = {
  sm: 'px-1.5 py-0.5 text-xs',
  md: 'px-2 py-1 text-sm',
  lg: 'px-2.5 py-1.5 text-base',
} as const;

/**
 * ShortcutBadge component displays a visual representation of a keyboard shortcut
 * 
 * @example
 * ```tsx
 * <ShortcutBadge shortcut="ctrl+k" size="sm" />
 * ```
 */
export const ShortcutBadge: React.FC<ShortcutBadgeProps> = React.memo(({
  shortcut,
  size = 'sm',
  className = '',
  platformSpecific = true,
}) => {
  // detectPlatform is already cached at module level
  const platform = platformSpecific ? detectPlatform() : 'windows';
  const keys = splitShortcutKeys(shortcut, platform);

  return (
    <span
      className={`inline-flex items-center gap-0.5 ${className}`}
      data-testid={KEYBOARD_TEST_IDS.SHORTCUT_BADGE}
      aria-label={`Keyboard shortcut: ${shortcut}`}
    >
      {keys.map((key, index) => (
        <React.Fragment key={index}>
          <kbd
            className={`
              ${SIZE_CLASSES[size]}
              font-mono font-semibold
              bg-gray-100 dark:bg-gray-700
              text-gray-700 dark:text-gray-300
              border border-gray-300 dark:border-gray-600
              rounded shadow-sm
              inline-flex items-center justify-center
              min-w-[1.5em]
            `}
            data-testid={KEYBOARD_TEST_IDS.SHORTCUT_BADGE_KEY}
          >
            {key}
          </kbd>
          {index < keys.length - 1 && (
            <span
              className="text-gray-400 dark:text-gray-500 text-xs"
              aria-hidden="true"
            >
              +
            </span>
          )}
        </React.Fragment>
      ))}
    </span>
  );
});

ShortcutBadge.displayName = 'ShortcutBadge';

export default ShortcutBadge;
