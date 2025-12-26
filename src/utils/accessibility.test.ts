import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  ARIA_ROLES,
  ARIA_LIVE,
  getSecurityLevelAriaLabel,
  getWidgetAriaDescription,
  getTabAriaProps,
  getTabPanelAriaProps,
  getButtonAriaProps,
  getSelectAriaProps,
  getProgressAriaProps,
  getStatusAriaProps,
  getChartAriaProps,
  getTabIndex,
  handleArrowKeyNavigation,
  getMetricAccessibleName,
  announceToScreenReader,
  meetsContrastRequirement,
} from './accessibility';
import { SecurityLevel } from '../types/cia';

describe('Accessibility Utilities', () => {
  describe('ARIA Constants', () => {
    it('should export ARIA_ROLES constants', () => {
      expect(ARIA_ROLES.NAVIGATION).toBe('navigation');
      expect(ARIA_ROLES.MAIN).toBe('main');
      expect(ARIA_ROLES.TAB).toBe('tab');
      expect(ARIA_ROLES.TABPANEL).toBe('tabpanel');
      expect(ARIA_ROLES.BUTTON).toBe('button');
    });

    it('should export ARIA_LIVE constants', () => {
      expect(ARIA_LIVE.OFF).toBe('off');
      expect(ARIA_LIVE.POLITE).toBe('polite');
      expect(ARIA_LIVE.ASSERTIVE).toBe('assertive');
    });
  });

  describe('getSecurityLevelAriaLabel', () => {
    it('should create accessible label for availability', () => {
      const label = getSecurityLevelAriaLabel('High' as SecurityLevel, 'availability');
      expect(label).toBe('Availability security level: High');
    });

    it('should create accessible label for integrity', () => {
      const label = getSecurityLevelAriaLabel('Moderate' as SecurityLevel, 'integrity');
      expect(label).toBe('Integrity security level: Moderate');
    });

    it('should create accessible label for confidentiality', () => {
      const label = getSecurityLevelAriaLabel('Very High' as SecurityLevel, 'confidentiality');
      expect(label).toBe('Confidentiality security level: Very High');
    });
  });

  describe('getWidgetAriaDescription', () => {
    it('should create description with provided text', () => {
      const desc = getWidgetAriaDescription('Security Summary', 'Shows overall security posture');
      expect(desc).toBe('Security Summary widget. Shows overall security posture');
    });

    it('should create description without additional text', () => {
      const desc = getWidgetAriaDescription('Cost Estimation');
      expect(desc).toBe('Cost Estimation widget');
    });
  });

  describe('getTabAriaProps', () => {
    it('should generate props for selected tab', () => {
      const props = getTabAriaProps('tab-1', true, 'panel-1');
      expect(props).toEqual({
        role: 'tab',
        'aria-selected': true,
        'aria-controls': 'panel-1',
        id: 'tab-1',
        tabIndex: 0,
      });
    });

    it('should generate props for unselected tab', () => {
      const props = getTabAriaProps('tab-2', false, 'panel-2');
      expect(props).toEqual({
        role: 'tab',
        'aria-selected': false,
        'aria-controls': 'panel-2',
        id: 'tab-2',
        tabIndex: -1,
      });
    });
  });

  describe('getTabPanelAriaProps', () => {
    it('should generate props for visible panel', () => {
      const props = getTabPanelAriaProps('panel-1', 'tab-1', false);
      expect(props).toEqual({
        role: 'tabpanel',
        id: 'panel-1',
        'aria-labelledby': 'tab-1',
        tabIndex: 0,
      });
    });

    it('should generate props for hidden panel', () => {
      const props = getTabPanelAriaProps('panel-2', 'tab-2', true);
      expect(props).toEqual({
        role: 'tabpanel',
        id: 'panel-2',
        'aria-labelledby': 'tab-2',
        hidden: true,
        tabIndex: 0,
      });
    });
  });

  describe('getButtonAriaProps', () => {
    it('should generate basic button props', () => {
      const props = getButtonAriaProps('Close dialog');
      expect(props).toEqual({
        'aria-label': 'Close dialog',
      });
    });

    it('should include pressed state', () => {
      const props = getButtonAriaProps('Toggle filter', { isPressed: true });
      expect(props['aria-pressed']).toBe(true);
    });

    it('should include expanded state', () => {
      const props = getButtonAriaProps('Expand menu', { isExpanded: true, controls: 'menu-1' });
      expect(props['aria-expanded']).toBe(true);
      expect(props['aria-controls']).toBe('menu-1');
    });

    it('should include describedby', () => {
      const props = getButtonAriaProps('Submit', { describedBy: 'help-text' });
      expect(props['aria-describedby']).toBe('help-text');
    });
  });

  describe('getSelectAriaProps', () => {
    it('should generate basic select props', () => {
      const props = getSelectAriaProps('Choose security level', 'High');
      expect(props).toEqual({
        'aria-label': 'Choose security level',
      });
    });

    it('should mark as required', () => {
      const props = getSelectAriaProps('Choose security level', 'High', true);
      expect(props['aria-required']).toBe(true);
    });
  });

  describe('getProgressAriaProps', () => {
    it('should generate progress props with default values', () => {
      const props = getProgressAriaProps('Upload progress', 50);
      expect(props).toEqual({
        role: 'progressbar',
        'aria-label': 'Upload progress',
        'aria-valuenow': 50,
        'aria-valuemin': 0,
        'aria-valuemax': 100,
      });
    });

    it('should include custom range and valuetext', () => {
      const props = getProgressAriaProps('Security score', 7, 0, 10, '7 out of 10');
      expect(props).toEqual({
        role: 'progressbar',
        'aria-label': 'Security score',
        'aria-valuenow': 7,
        'aria-valuemin': 0,
        'aria-valuemax': 10,
        'aria-valuetext': '7 out of 10',
      });
    });
  });

  describe('getStatusAriaProps', () => {
    it('should generate status props with default politeness', () => {
      const props = getStatusAriaProps('Settings saved');
      expect(props).toEqual({
        role: 'status',
        'aria-live': 'polite',
        'aria-atomic': true,
      });
    });

    it('should generate assertive status props', () => {
      const props = getStatusAriaProps('Error occurred', 'ASSERTIVE');
      expect(props).toEqual({
        role: 'status',
        'aria-live': 'assertive',
        'aria-atomic': true,
      });
    });
  });

  describe('getChartAriaProps', () => {
    it('should generate chart props without description ID', () => {
      const props = getChartAriaProps('Security trends', 'Shows security metrics over time');
      expect(props).toEqual({
        'aria-label': 'Security trends',
        role: 'img',
      });
    });

    it('should generate chart props with description ID', () => {
      const props = getChartAriaProps('Security trends', 'Shows security metrics', 'chart-desc-1');
      expect(props).toEqual({
        'aria-label': 'Security trends',
        'aria-describedby': 'chart-desc-1',
        role: 'img',
      });
    });
  });

  describe('getTabIndex', () => {
    it('should return 0 for interactive elements', () => {
      expect(getTabIndex(true)).toBe(0);
    });

    it('should return undefined for non-interactive elements', () => {
      expect(getTabIndex(false)).toBeUndefined();
    });

    it('should return -1 for disabled elements', () => {
      expect(getTabIndex(true, true)).toBe(-1);
      expect(getTabIndex(false, true)).toBe(-1);
    });
  });

  describe('handleArrowKeyNavigation', () => {
    it('should handle vertical arrow down navigation', () => {
      const mockCallback = vi.fn();
      const event = {
        key: 'ArrowDown',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent;

      handleArrowKeyNavigation(event, 2, 5, mockCallback, 'vertical');

      expect(event.preventDefault).toHaveBeenCalled();
      expect(mockCallback).toHaveBeenCalledWith(3);
    });

    it('should handle vertical arrow up navigation', () => {
      const mockCallback = vi.fn();
      const event = {
        key: 'ArrowUp',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent;

      handleArrowKeyNavigation(event, 2, 5, mockCallback, 'vertical');

      expect(event.preventDefault).toHaveBeenCalled();
      expect(mockCallback).toHaveBeenCalledWith(1);
    });

    it('should not go beyond bounds', () => {
      const mockCallback = vi.fn();
      const eventDown = {
        key: 'ArrowDown',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent;

      handleArrowKeyNavigation(eventDown, 4, 5, mockCallback, 'vertical');
      // At max index (4 out of 5 items), should not call callback
      expect(mockCallback).not.toHaveBeenCalled();

      const mockCallback2 = vi.fn();
      const eventUp = {
        key: 'ArrowUp',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent;

      handleArrowKeyNavigation(eventUp, 0, 5, mockCallback2, 'vertical');
      // At min index (0), should not call callback
      expect(mockCallback2).not.toHaveBeenCalled();
    });

    it('should handle horizontal arrow navigation', () => {
      const mockCallback = vi.fn();
      const event = {
        key: 'ArrowRight',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent;

      handleArrowKeyNavigation(event, 1, 5, mockCallback, 'horizontal');

      expect(event.preventDefault).toHaveBeenCalled();
      expect(mockCallback).toHaveBeenCalledWith(2);
    });

    it('should handle Home key', () => {
      const mockCallback = vi.fn();
      const event = {
        key: 'Home',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent;

      handleArrowKeyNavigation(event, 3, 5, mockCallback);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(mockCallback).toHaveBeenCalledWith(0);
    });

    it('should handle End key', () => {
      const mockCallback = vi.fn();
      const event = {
        key: 'End',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent;

      handleArrowKeyNavigation(event, 1, 5, mockCallback);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(mockCallback).toHaveBeenCalledWith(4);
    });
  });

  describe('getMetricAccessibleName', () => {
    it('should format metric without unit', () => {
      const name = getMetricAccessibleName('Security Score', 85);
      expect(name).toBe('Security Score: 85');
    });

    it('should format metric with unit', () => {
      const name = getMetricAccessibleName('Availability', '99.9', '%');
      expect(name).toBe('Availability: 99.9 %');
    });

    it('should format monetary values', () => {
      const name = getMetricAccessibleName('Cost', '$50,000');
      expect(name).toBe('Cost: $50,000');
    });
  });

  describe('announceToScreenReader', () => {
    beforeEach(() => {
      // Clear any existing live regions
      document.body.innerHTML = '';
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.restoreAllMocks();
      vi.useRealTimers();
      // Clean up any live regions created during tests
      const liveRegions = document.querySelectorAll('[aria-live]');
      liveRegions.forEach(region => region.remove());
    });

    it('should create and reuse singleton live region', () => {
      announceToScreenReader('Test message', 'polite');

      // Fast-forward through initial timeout
      vi.advanceTimersByTime(100);

      const liveRegions = document.querySelectorAll('[aria-live="polite"]');
      expect(liveRegions.length).toBe(1);
      expect(liveRegions[0].textContent).toBe('Test message');

      // Fast-forward through cleanup timeout - content should be cleared but element remains
      vi.advanceTimersByTime(3000);

      const remainingRegions = document.querySelectorAll('[aria-live="polite"]');
      expect(remainingRegions.length).toBe(1); // Element still exists (singleton)
      expect(remainingRegions[0].textContent).toBe(''); // But content is cleared
    });

    it('should reuse singleton for multiple announcements', () => {
      announceToScreenReader('First message', 'polite');
      vi.advanceTimersByTime(100);
      
      const firstRegions = document.querySelectorAll('[aria-live="polite"]');
      expect(firstRegions.length).toBe(1);
      expect(firstRegions[0].textContent).toBe('First message');

      // Make another announcement - should reuse same element
      announceToScreenReader('Second message', 'polite');
      vi.advanceTimersByTime(100);

      const secondRegions = document.querySelectorAll('[aria-live="polite"]');
      expect(secondRegions.length).toBe(1); // Still only one element
      expect(secondRegions[0].textContent).toBe('Second message');
    });

    it('should clear all pending timeouts on rapid successive calls', () => {
      // Make multiple rapid announcements
      announceToScreenReader('First', 'polite');
      announceToScreenReader('Second', 'polite');
      announceToScreenReader('Third', 'polite');
      
      // Only the last message should be shown after timeout
      vi.advanceTimersByTime(100);
      
      const liveRegion = document.querySelector('[aria-live="polite"]') as HTMLElement;
      expect(liveRegion?.textContent).toBe('Third');
      
      // After cleanup, content should be cleared
      vi.advanceTimersByTime(3000);
      expect(liveRegion?.textContent).toBe('');
    });

    it('should create assertive live region', () => {
      announceToScreenReader('Error message', 'assertive');

      vi.advanceTimersByTime(100);

      const liveRegions = document.querySelectorAll('[aria-live="assertive"]');
      expect(liveRegions.length).toBe(1);
      expect(liveRegions[0].textContent).toBe('Error message');
    });

    it('should hide live region visually', () => {
      announceToScreenReader('Hidden message');

      vi.advanceTimersByTime(100);

      const liveRegion = document.querySelector('[aria-live]') as HTMLElement;
      expect(liveRegion?.style.position).toBe('absolute');
      expect(liveRegion?.style.left).toBe('-10000px');
      expect(liveRegion?.style.overflow).toBe('hidden');
    });
  });

  describe('meetsContrastRequirement', () => {
    it('should validate contrast for normal text (4.5:1 required)', () => {
      // Black on white should pass
      expect(meetsContrastRequirement('#000000', '#ffffff', false)).toBe(true);
      
      // White on black should pass
      expect(meetsContrastRequirement('#ffffff', '#000000', false)).toBe(true);
    });

    it('should validate contrast for large text (3:1 required)', () => {
      // Medium gray on white should pass for large text
      expect(meetsContrastRequirement('#767676', '#ffffff', true)).toBe(true);
    });

    it('should fail insufficient contrast for normal text', () => {
      // Light gray on white should fail for normal text
      expect(meetsContrastRequirement('#cccccc', '#ffffff', false)).toBe(false);
    });

    it('should handle hex colors with or without hash', () => {
      expect(meetsContrastRequirement('000000', 'ffffff', false)).toBe(true);
      expect(meetsContrastRequirement('#000000', '#ffffff', false)).toBe(true);
    });
  });
});
