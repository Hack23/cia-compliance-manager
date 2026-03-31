/**
 * # Contexts Module
 *
 * Re-exports all React contexts for the CIA Compliance Manager.
 * Provides centralized error handling and keyboard shortcut management.
 *
 * @packageDocumentation
 */

// Re-export error context
export {
  ErrorProvider,
  useError,
  default as ErrorProviderDefault,
} from "./ErrorContext";
export type {
  ErrorEntry,
  ToastConfig,
  ErrorContextValue,
  ErrorProviderProps,
} from "./ErrorContext";

// Re-export keyboard shortcut context
export {
  KeyboardShortcutProvider,
  useKeyboardShortcutContext,
  useKeyboardShortcutContextOptional,
} from "./KeyboardShortcutContext";
export type { KeyboardShortcutProviderProps } from "./KeyboardShortcutContext";
