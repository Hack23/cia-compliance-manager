/**
 * Custom hook for managing tab state and keyboard navigation
 * 
 * Provides reusable tab state management with full keyboard navigation support
 * (Arrow keys, Home, End) and accessibility features.
 * 
 * @module hooks/useTabs
 */

import { useState, useCallback, useRef, useMemo } from 'react';
import { Tab, UseTabsOptions, UseTabsReturn } from '../types/tabs';

/**
 * Hook for managing tab state with keyboard navigation
 * 
 * This hook provides:
 * - Tab selection state management
 * - Keyboard navigation (Arrow Left/Right, Home, End)
 * - Focus management for tab buttons
 * - Support for disabled tabs
 * 
 * @param tabs - Array of tab configurations
 * @param options - Optional configuration for initial tab and change callback
 * @returns Tab state and handlers
 * 
 * @example
 * ```tsx
 * const tabs: Tab[] = [
 *   { id: 'tab1', label: 'First Tab', content: <div>Content 1</div> },
 *   { id: 'tab2', label: 'Second Tab', content: <div>Content 2</div> },
 * ];
 * 
 * const { activeTab, selectTab, handleKeyDown, tabRefs } = useTabs(tabs, {
 *   initialTab: 'tab1',
 *   onChange: (tabId) => console.log('Tab changed to:', tabId),
 * });
 * ```
 */
export function useTabs(tabs: Tab[], options: UseTabsOptions = {}): UseTabsReturn {
  const { initialTab, onChange } = options;
  const [activeTab, setActiveTab] = useState<string>(initialTab || tabs[0]?.id || '');
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const enabledTabIds = useMemo(() => {
    return tabs.filter(t => !t.disabled).map(t => t.id);
  }, [tabs]);

  /**
   * Select a tab programmatically
   * Ignores disabled tabs and triggers onChange callback
   */
  const selectTab = useCallback((tabId: string): void => {
    const tab = tabs.find(t => t.id === tabId);
    if (tab && !tab.disabled) {
      setActiveTab(tabId);
      onChange?.(tabId);
    }
  }, [tabs, onChange]);

  /**
   * Handle keyboard navigation for tabs
   * Supports Arrow Left/Right, Home, and End keys
   */
  const handleKeyDown = useCallback((event: React.KeyboardEvent, currentTabId: string): void => {
    if (enabledTabIds.length === 0) {
      return;
    }

    const currentIndex = enabledTabIds.indexOf(currentTabId);
    let newIndex: number;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        newIndex = currentIndex > 0 ? currentIndex - 1 : enabledTabIds.length - 1;
        break;
      case 'ArrowRight':
        event.preventDefault();
        newIndex = currentIndex < enabledTabIds.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = enabledTabIds.length - 1;
        break;
      default:
        return;
    }

    const newTabId = enabledTabIds[newIndex];
    selectTab(newTabId);
    
    tabRefs.current.get(newTabId)?.focus();
  }, [enabledTabIds, selectTab]);

  return {
    activeTab,
    selectTab,
    handleKeyDown,
    tabRefs,
  };
}
