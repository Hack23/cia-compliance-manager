/**
 * TabContainer Component
 * 
 * A standardized, accessible tab component with full keyboard navigation support.
 * Implements ARIA tab patterns and consistent styling across the application.
 * 
 * @module components/common/TabContainer
 */

import React from 'react';
import { Tab } from '../../types/tabs';
import { useTabs } from '../../hooks/useTabs';
import { TRANSITIONS } from '../../constants/designTokens';
import { ARIA_ROLES } from '../../utils/accessibility';

/**
 * Props for TabContainer component
 */
export interface TabContainerProps {
  /** Array of tabs to render */
  tabs: Tab[];
  
  /** Initial active tab ID (defaults to first tab) */
  initialTab?: string;
  
  /** Callback when tab changes */
  onChange?: (tabId: string) => void;
  
  /** Optional CSS class for additional styling */
  className?: string;
  
  /** Test ID for testing purposes */
  testId?: string;
}

/**
 * TabContainer - Standardized tab navigation component
 * 
 * Features:
 * - Full keyboard navigation (Arrow Left/Right, Home, End)
 * - ARIA attributes for accessibility
 * - Support for icons and badges
 * - Disabled tab support
 * - Consistent visual styling with design tokens
 * 
 * @example
 * ```tsx
 * const tabs: Tab[] = [
 *   {
 *     id: 'overview',
 *     label: 'Overview',
 *     icon: <ChartIcon />,
 *     content: <OverviewPanel />,
 *     testId: 'overview-tab',
 *   },
 *   {
 *     id: 'details',
 *     label: 'Details',
 *     badge: '5',
 *     content: <DetailsPanel />,
 *   },
 * ];
 * 
 * <TabContainer
 *   tabs={tabs}
 *   initialTab="overview"
 *   onChange={(tabId) => console.log('Tab changed:', tabId)}
 *   testId="my-tabs"
 * />
 * ```
 */
export const TabContainer: React.FC<TabContainerProps> = ({
  tabs,
  initialTab,
  onChange,
  className = '',
  testId = 'tab-container',
}) => {
  const { activeTab, selectTab, handleKeyDown, tabRefs } = useTabs(tabs, {
    initialTab,
    onChange,
  });

  return (
    <div className={className} data-testid={testId}>
      {/* Tab List */}
      <div
        role={ARIA_ROLES.TABLIST}
        className="flex space-x-2 border-b border-gray-200 dark:border-gray-700 mb-6"
        data-testid={`${testId}-list`}
        aria-label="Tab navigation"
      >
        <span className="sr-only" id={`${testId}-keyboard-instructions`}>
          Use arrow keys to navigate between tabs. Press Enter or Space to activate a tab.
        </span>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              ref={(el) => {
                if (el) tabRefs.current.set(tab.id, el);
              }}
              role={ARIA_ROLES.TAB}
              aria-selected={isActive}
              aria-controls={`${testId}-panel-${tab.id}`}
              id={`${testId}-tab-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              disabled={tab.disabled}
              onClick={() => selectTab(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, tab.id)}
              data-testid={tab.testId || `${testId}-tab-${tab.id}`}
              aria-describedby={`${testId}-keyboard-instructions`}
              className={`
                px-4 py-2 font-medium text-sm rounded-t-lg
                transition-colors
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                ${isActive 
                  ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }
                ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `.trim()}
              style={{ transitionDuration: TRANSITIONS.fast }}
            >
              <div className="flex items-center gap-2">
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full">
                    {tab.badge}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role={ARIA_ROLES.TABPANEL}
          id={`${testId}-panel-${tab.id}`}
          aria-labelledby={`${testId}-tab-${tab.id}`}
          hidden={activeTab !== tab.id}
          data-testid={`${testId}-panel-${tab.id}`}
          className="focus:outline-none"
          tabIndex={0}
        >
          {activeTab === tab.id && tab.content}
        </div>
      ))}
    </div>
  );
};

export default TabContainer;
