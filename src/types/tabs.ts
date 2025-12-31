/**
 * Tab-related types and interfaces for standardized tab navigation
 * 
 * This module provides type definitions for tab components, supporting
 * consistent tab navigation patterns with accessibility features.
 * 
 * @module types/tabs
 */

import React from 'react';

/**
 * Individual tab configuration
 * 
 * Represents a single tab in a tab list with its associated content and metadata.
 */
export interface Tab {
  /** Unique identifier for the tab */
  id: string;
  
  /** Display label for the tab */
  label: string;
  
  /** Optional icon element to display alongside the label */
  icon?: React.ReactNode;
  
  /** Optional badge/count to display (e.g., "3" or "New") */
  badge?: string | number;
  
  /** Content to display when tab is active */
  content: React.ReactNode;
  
  /** Optional disabled state */
  disabled?: boolean;
  
  /** Optional test ID for testing purposes */
  testId?: string;
}

/**
 * State management for tabs
 * 
 * Represents the current state of a tab group.
 */
export interface TabsState {
  /** Currently active tab ID */
  activeTab: string;
  
  /** All tabs in the group */
  tabs: Tab[];
}

/**
 * Options for the useTabs hook
 */
export interface UseTabsOptions {
  /** Initial active tab ID (defaults to first tab if not specified) */
  initialTab?: string;
  
  /** Callback when tab changes */
  onChange?: (tabId: string) => void;
}

/**
 * Return type for the useTabs hook
 */
export interface UseTabsReturn {
  /** Currently active tab ID */
  activeTab: string;
  
  /** Function to select a tab programmatically */
  selectTab: (tabId: string) => void;
  
  /** Keyboard event handler for tab navigation */
  handleKeyDown: (event: React.KeyboardEvent, currentTabId: string) => void;
  
  /** Ref map for tab button elements (used for focus management) */
  tabRefs: React.MutableRefObject<Map<string, HTMLButtonElement>>;
}
