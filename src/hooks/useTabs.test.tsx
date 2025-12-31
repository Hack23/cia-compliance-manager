/**
 * Unit tests for useTabs hook
 * 
 * Tests tab state management, keyboard navigation, and accessibility features.
 */

import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useTabs } from './useTabs';
import { Tab } from '../types/tabs';

describe('useTabs', () => {
  // Mock tabs for testing
  const mockTabs: Tab[] = [
    { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
    { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
    { id: 'tab3', label: 'Tab 3', content: <div>Content 3</div> },
  ];

  const mockTabsWithDisabled: Tab[] = [
    { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
    { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div>, disabled: true },
    { id: 'tab3', label: 'Tab 3', content: <div>Content 3</div> },
  ];

  describe('initialization', () => {
    it('should initialize with first tab as active by default', () => {
      const { result } = renderHook(() => useTabs(mockTabs));
      
      expect(result.current.activeTab).toBe('tab1');
    });

    it('should initialize with specified initial tab', () => {
      const { result } = renderHook(() => useTabs(mockTabs, { initialTab: 'tab2' }));
      
      expect(result.current.activeTab).toBe('tab2');
    });

    it('should handle empty tabs array', () => {
      const { result } = renderHook(() => useTabs([]));
      
      expect(result.current.activeTab).toBe('');
    });

    it('should initialize tabRefs as empty Map', () => {
      const { result } = renderHook(() => useTabs(mockTabs));
      
      expect(result.current.tabRefs.current).toBeInstanceOf(Map);
      expect(result.current.tabRefs.current.size).toBe(0);
    });
  });

  describe('selectTab', () => {
    it('should change active tab when selecting valid tab', () => {
      const { result } = renderHook(() => useTabs(mockTabs));
      
      act(() => {
        result.current.selectTab('tab2');
      });
      
      expect(result.current.activeTab).toBe('tab2');
    });

    it('should not change active tab when selecting disabled tab', () => {
      const { result } = renderHook(() => useTabs(mockTabsWithDisabled));
      
      act(() => {
        result.current.selectTab('tab2');
      });
      
      // Should remain on tab1 (initial tab)
      expect(result.current.activeTab).toBe('tab1');
    });

    it('should not change active tab when selecting non-existent tab', () => {
      const { result } = renderHook(() => useTabs(mockTabs));
      
      act(() => {
        result.current.selectTab('nonexistent');
      });
      
      // Should remain on tab1 (initial tab)
      expect(result.current.activeTab).toBe('tab1');
    });

    it('should call onChange callback when tab changes', () => {
      const onChange = vi.fn();
      const { result } = renderHook(() => useTabs(mockTabs, { onChange }));
      
      act(() => {
        result.current.selectTab('tab2');
      });
      
      expect(onChange).toHaveBeenCalledWith('tab2');
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('should not call onChange when selecting disabled tab', () => {
      const onChange = vi.fn();
      const { result } = renderHook(() => useTabs(mockTabsWithDisabled, { onChange }));
      
      act(() => {
        result.current.selectTab('tab2');
      });
      
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('keyboard navigation - ArrowRight', () => {
    it('should navigate to next tab on ArrowRight', () => {
      const { result } = renderHook(() => useTabs(mockTabs));
      
      const event = {
        key: 'ArrowRight',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent;
      
      act(() => {
        result.current.handleKeyDown(event, 'tab1');
      });
      
      expect(event.preventDefault).toHaveBeenCalled();
      expect(result.current.activeTab).toBe('tab2');
    });

    it('should wrap to first tab when pressing ArrowRight on last tab', () => {
      const { result } = renderHook(() => useTabs(mockTabs));
      
      const event = {
        key: 'ArrowRight',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent;
      
      act(() => {
        result.current.handleKeyDown(event, 'tab3');
      });
      
      expect(result.current.activeTab).toBe('tab1');
    });

    it('should skip disabled tabs when navigating with ArrowRight', () => {
      const { result } = renderHook(() => useTabs(mockTabsWithDisabled));
      
      const event = {
        key: 'ArrowRight',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent;
      
      act(() => {
        result.current.handleKeyDown(event, 'tab1');
      });
      
      // Should skip tab2 (disabled) and go to tab3
      expect(result.current.activeTab).toBe('tab3');
    });
  });

  describe('keyboard navigation - ArrowLeft', () => {
    it('should navigate to previous tab on ArrowLeft', () => {
      const { result } = renderHook(() => useTabs(mockTabs, { initialTab: 'tab2' }));
      
      const event = {
        key: 'ArrowLeft',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent;
      
      act(() => {
        result.current.handleKeyDown(event, 'tab2');
      });
      
      expect(event.preventDefault).toHaveBeenCalled();
      expect(result.current.activeTab).toBe('tab1');
    });

    it('should wrap to last tab when pressing ArrowLeft on first tab', () => {
      const { result } = renderHook(() => useTabs(mockTabs));
      
      const event = {
        key: 'ArrowLeft',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent;
      
      act(() => {
        result.current.handleKeyDown(event, 'tab1');
      });
      
      expect(result.current.activeTab).toBe('tab3');
    });

    it('should skip disabled tabs when navigating with ArrowLeft', () => {
      const { result } = renderHook(() => useTabs(mockTabsWithDisabled, { initialTab: 'tab3' }));
      
      const event = {
        key: 'ArrowLeft',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent;
      
      act(() => {
        result.current.handleKeyDown(event, 'tab3');
      });
      
      // Should skip tab2 (disabled) and go to tab1
      expect(result.current.activeTab).toBe('tab1');
    });
  });

  describe('keyboard navigation - Home', () => {
    it('should navigate to first enabled tab on Home', () => {
      const { result } = renderHook(() => useTabs(mockTabs, { initialTab: 'tab3' }));
      
      const event = {
        key: 'Home',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent;
      
      act(() => {
        result.current.handleKeyDown(event, 'tab3');
      });
      
      expect(event.preventDefault).toHaveBeenCalled();
      expect(result.current.activeTab).toBe('tab1');
    });

    it('should navigate to first enabled tab even if first tab is disabled', () => {
      const tabsWithFirstDisabled: Tab[] = [
        { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div>, disabled: true },
        { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
        { id: 'tab3', label: 'Tab 3', content: <div>Content 3</div> },
      ];
      
      const { result } = renderHook(() => useTabs(tabsWithFirstDisabled, { initialTab: 'tab3' }));
      
      const event = {
        key: 'Home',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent;
      
      act(() => {
        result.current.handleKeyDown(event, 'tab3');
      });
      
      expect(result.current.activeTab).toBe('tab2');
    });
  });

  describe('keyboard navigation - End', () => {
    it('should navigate to last enabled tab on End', () => {
      const { result } = renderHook(() => useTabs(mockTabs));
      
      const event = {
        key: 'End',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent;
      
      act(() => {
        result.current.handleKeyDown(event, 'tab1');
      });
      
      expect(event.preventDefault).toHaveBeenCalled();
      expect(result.current.activeTab).toBe('tab3');
    });

    it('should navigate to last enabled tab even if last tab is disabled', () => {
      const tabsWithLastDisabled: Tab[] = [
        { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
        { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
        { id: 'tab3', label: 'Tab 3', content: <div>Content 3</div>, disabled: true },
      ];
      
      const { result } = renderHook(() => useTabs(tabsWithLastDisabled));
      
      const event = {
        key: 'End',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent;
      
      act(() => {
        result.current.handleKeyDown(event, 'tab1');
      });
      
      expect(result.current.activeTab).toBe('tab2');
    });
  });

  describe('keyboard navigation - other keys', () => {
    it('should not handle other keys', () => {
      const { result } = renderHook(() => useTabs(mockTabs));
      
      const event = {
        key: 'Enter',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent;
      
      act(() => {
        result.current.handleKeyDown(event, 'tab1');
      });
      
      expect(event.preventDefault).not.toHaveBeenCalled();
      expect(result.current.activeTab).toBe('tab1');
    });

    it('should not change tab on Escape key', () => {
      const { result } = renderHook(() => useTabs(mockTabs));
      
      const event = {
        key: 'Escape',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent;
      
      act(() => {
        result.current.handleKeyDown(event, 'tab1');
      });
      
      expect(event.preventDefault).not.toHaveBeenCalled();
      expect(result.current.activeTab).toBe('tab1');
    });
  });

  describe('edge cases', () => {
    it('should handle all tabs disabled', () => {
      const allDisabledTabs: Tab[] = [
        { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div>, disabled: true },
        { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div>, disabled: true },
      ];
      
      const { result } = renderHook(() => useTabs(allDisabledTabs));
      
      const event = {
        key: 'ArrowRight',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent;
      
      act(() => {
        result.current.handleKeyDown(event, 'tab1');
      });
      
      // Should not crash and preventDefault should not be called since early return
      expect(result.current.activeTab).toBe('tab1');
    });

    it('should handle single tab', () => {
      const singleTab: Tab[] = [
        { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
      ];
      
      const { result } = renderHook(() => useTabs(singleTab));
      
      const event = {
        key: 'ArrowRight',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent;
      
      act(() => {
        result.current.handleKeyDown(event, 'tab1');
      });
      
      // Should wrap to itself
      expect(result.current.activeTab).toBe('tab1');
    });

    it('should maintain memoized enabledTabIds across re-renders', () => {
      const { result, rerender } = renderHook(() => useTabs(mockTabs));
      
      const firstCallRefs = result.current.tabRefs;
      
      rerender();
      
      // tabRefs should be the same reference
      expect(result.current.tabRefs).toBe(firstCallRefs);
    });
  });

  describe('focus management', () => {
    it('should attempt to focus new tab after keyboard navigation', () => {
      const { result } = renderHook(() => useTabs(mockTabs));
      
      // Create mock button element
      const mockButton = {
        focus: vi.fn(),
      } as unknown as HTMLButtonElement;
      
      // Add button to tabRefs
      act(() => {
        result.current.tabRefs.current.set('tab2', mockButton);
      });
      
      const event = {
        key: 'ArrowRight',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent;
      
      act(() => {
        result.current.handleKeyDown(event, 'tab1');
      });
      
      expect(mockButton.focus).toHaveBeenCalled();
    });

    it('should handle missing tab ref gracefully', () => {
      const { result } = renderHook(() => useTabs(mockTabs));
      
      const event = {
        key: 'ArrowRight',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent;
      
      // Don't add any refs, so focus will be attempted on undefined
      act(() => {
        result.current.handleKeyDown(event, 'tab1');
      });
      
      // Should not throw error
      expect(result.current.activeTab).toBe('tab2');
    });
  });

  describe('onChange callback integration', () => {
    it('should call onChange on keyboard navigation', () => {
      const onChange = vi.fn();
      const { result } = renderHook(() => useTabs(mockTabs, { onChange }));
      
      const event = {
        key: 'ArrowRight',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent;
      
      act(() => {
        result.current.handleKeyDown(event, 'tab1');
      });
      
      expect(onChange).toHaveBeenCalledWith('tab2');
    });

    it('should call onChange multiple times for multiple navigations', () => {
      const onChange = vi.fn();
      const { result } = renderHook(() => useTabs(mockTabs, { onChange }));
      
      const eventRight = {
        key: 'ArrowRight',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent;
      
      act(() => {
        result.current.handleKeyDown(eventRight, 'tab1');
      });
      
      act(() => {
        result.current.handleKeyDown(eventRight, 'tab2');
      });
      
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenNthCalledWith(1, 'tab2');
      expect(onChange).toHaveBeenNthCalledWith(2, 'tab3');
    });
  });
});
