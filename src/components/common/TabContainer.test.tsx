/**
 * Unit tests for TabContainer component
 * 
 * Tests keyboard navigation, ARIA attributes, tab selection, and accessibility features.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TabContainer } from './TabContainer';
import { Tab } from '../../types/tabs';

describe('TabContainer', () => {
  const mockTabs: Tab[] = [
    { 
      id: 'tab1', 
      label: 'Tab 1', 
      content: <div>Content 1</div>,
      testId: 'test-tab-1',
    },
    { 
      id: 'tab2', 
      label: 'Tab 2', 
      content: <div>Content 2</div>,
      badge: '3',
    },
    { 
      id: 'tab3', 
      label: 'Tab 3', 
      content: <div>Content 3</div>, 
      disabled: true,
    },
  ];

  describe('Rendering', () => {
    it('should render all tabs', () => {
      render(<TabContainer tabs={mockTabs} />);
      
      expect(screen.getByText('Tab 1')).toBeInTheDocument();
      expect(screen.getByText('Tab 2')).toBeInTheDocument();
      expect(screen.getByText('Tab 3')).toBeInTheDocument();
    });

    it('should render tab with badge', () => {
      render(<TabContainer tabs={mockTabs} />);
      
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('should render first tab as active by default', () => {
      render(<TabContainer tabs={mockTabs} testId="test-tabs" />);
      
      const tab1 = screen.getByTestId('test-tab-1');
      expect(tab1).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Content 1')).toBeVisible();
    });

    it('should render specified initial tab as active', () => {
      render(<TabContainer tabs={mockTabs} initialTab="tab2" testId="test-tabs" />);
      
      const tab2Button = screen.getByText('Tab 2').closest('button');
      expect(tab2Button).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Content 2')).toBeVisible();
    });

    it('should apply custom className', () => {
      render(<TabContainer tabs={mockTabs} className="custom-class" testId="test-tabs" />);
      
      const container = screen.getByTestId('test-tabs');
      expect(container).toHaveClass('custom-class');
    });
  });

  describe('Tab Selection', () => {
    it('should change active tab on click', () => {
      render(<TabContainer tabs={mockTabs} testId="test-tabs" />);
      
      const tab2Button = screen.getByText('Tab 2');
      fireEvent.click(tab2Button);
      
      expect(screen.getByText('Content 2')).toBeVisible();
      // Content 1 should still be in DOM but hidden
      const panel1 = screen.getByTestId('test-tabs-panel-tab1');
      expect(panel1).toHaveAttribute('hidden');
    });

    it('should call onChange callback when tab changes', () => {
      const handleChange = vi.fn();
      render(<TabContainer tabs={mockTabs} onChange={handleChange} />);
      
      const tab2Button = screen.getByText('Tab 2');
      fireEvent.click(tab2Button);
      
      expect(handleChange).toHaveBeenCalledWith('tab2');
    });

    it('should not select disabled tab on click', () => {
      render(<TabContainer tabs={mockTabs} testId="test-tabs" />);
      
      const tab3Button = screen.getByText('Tab 3');
      fireEvent.click(tab3Button);
      
      // Should still show Content 1 (first tab)
      expect(screen.getByText('Content 1')).toBeVisible();
      expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('should navigate to next tab with ArrowRight', () => {
      render(<TabContainer tabs={mockTabs} testId="test-tabs" />);
      
      const tab1Button = screen.getByText('Tab 1');
      tab1Button.focus();
      
      fireEvent.keyDown(tab1Button, { key: 'ArrowRight' });
      
      expect(screen.getByText('Content 2')).toBeVisible();
    });

    it('should navigate to previous tab with ArrowLeft', () => {
      render(<TabContainer tabs={mockTabs} initialTab="tab2" testId="test-tabs" />);
      
      const tab2Button = screen.getByText('Tab 2');
      tab2Button.focus();
      
      fireEvent.keyDown(tab2Button, { key: 'ArrowLeft' });
      
      expect(screen.getByText('Content 1')).toBeVisible();
    });

    it('should wrap to last tab when pressing ArrowLeft on first tab', () => {
      render(<TabContainer tabs={mockTabs} testId="test-tabs" />);
      
      const tab1Button = screen.getByText('Tab 1');
      tab1Button.focus();
      
      fireEvent.keyDown(tab1Button, { key: 'ArrowLeft' });
      
      // Should wrap to tab2 (skipping disabled tab3)
      expect(screen.getByText('Content 2')).toBeVisible();
    });

    it('should wrap to first tab when pressing ArrowRight on last enabled tab', () => {
      render(<TabContainer tabs={mockTabs} initialTab="tab2" testId="test-tabs" />);
      
      const tab2Button = screen.getByText('Tab 2');
      tab2Button.focus();
      
      fireEvent.keyDown(tab2Button, { key: 'ArrowRight' });
      
      // Should wrap to tab1 (skipping disabled tab3)
      expect(screen.getByText('Content 1')).toBeVisible();
    });

    it('should navigate to first tab with Home key', () => {
      render(<TabContainer tabs={mockTabs} initialTab="tab2" testId="test-tabs" />);
      
      const tab2Button = screen.getByText('Tab 2');
      tab2Button.focus();
      
      fireEvent.keyDown(tab2Button, { key: 'Home' });
      
      expect(screen.getByText('Content 1')).toBeVisible();
    });

    it('should navigate to last enabled tab with End key', () => {
      render(<TabContainer tabs={mockTabs} testId="test-tabs" />);
      
      const tab1Button = screen.getByText('Tab 1');
      tab1Button.focus();
      
      fireEvent.keyDown(tab1Button, { key: 'End' });
      
      // Should go to tab2 (last enabled tab, skipping disabled tab3)
      expect(screen.getByText('Content 2')).toBeVisible();
    });

    it('should skip disabled tabs in keyboard navigation', () => {
      const tabsWithDisabled: Tab[] = [
        { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
        { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div>, disabled: true },
        { id: 'tab3', label: 'Tab 3', content: <div>Content 3</div> },
      ];
      
      render(<TabContainer tabs={tabsWithDisabled} testId="test-tabs" />);
      
      const tab1Button = screen.getByText('Tab 1');
      tab1Button.focus();
      
      // Pressing ArrowRight should skip tab2 and go to tab3
      fireEvent.keyDown(tab1Button, { key: 'ArrowRight' });
      
      expect(screen.getByText('Content 3')).toBeVisible();
    });
  });

  describe('ARIA Attributes', () => {
    it('should have proper tablist role', () => {
      render(<TabContainer tabs={mockTabs} testId="test-tabs" />);
      
      const tablist = screen.getByRole('tablist');
      expect(tablist).toBeInTheDocument();
    });

    it('should have proper tab role and aria-selected', () => {
      render(<TabContainer tabs={mockTabs} testId="test-tabs" />);
      
      const tab1 = screen.getByRole('tab', { name: /Tab 1/ });
      expect(tab1).toHaveAttribute('aria-selected', 'true');
      
      const tab2 = screen.getByRole('tab', { name: /Tab 2/ });
      expect(tab2).toHaveAttribute('aria-selected', 'false');
    });

    it('should have proper aria-controls attribute', () => {
      render(<TabContainer tabs={mockTabs} testId="test-tabs" />);
      
      const tab1 = screen.getByRole('tab', { name: /Tab 1/ });
      expect(tab1).toHaveAttribute('aria-controls', 'test-tabs-panel-tab1');
    });

    it('should have proper tabpanel role and aria-labelledby', () => {
      render(<TabContainer tabs={mockTabs} testId="test-tabs" />);
      
      const panel1 = screen.getByTestId('test-tabs-panel-tab1');
      expect(panel1).toHaveAttribute('role', 'tabpanel');
      expect(panel1).toHaveAttribute('aria-labelledby', 'test-tabs-tab-tab1');
    });

    it('should have proper tabIndex for active and inactive tabs', () => {
      render(<TabContainer tabs={mockTabs} testId="test-tabs" />);
      
      const tab1 = screen.getByRole('tab', { name: /Tab 1/ });
      expect(tab1).toHaveAttribute('tabIndex', '0');
      
      const tab2 = screen.getByRole('tab', { name: /Tab 2/ });
      expect(tab2).toHaveAttribute('tabIndex', '-1');
    });

    it('should have keyboard instructions for screen readers', () => {
      render(<TabContainer tabs={mockTabs} testId="test-tabs" />);
      
      const instructions = screen.getByText(/Use arrow keys to navigate between tabs/i);
      expect(instructions).toBeInTheDocument();
      expect(instructions).toHaveClass('sr-only');
    });
  });

  describe('Tab Content Visibility', () => {
    it('should only show active tab content', () => {
      render(<TabContainer tabs={mockTabs} testId="test-tabs" />);
      
      expect(screen.getByText('Content 1')).toBeVisible();
      // Content 2 is in DOM but panel is hidden
      const panel2 = screen.getByTestId('test-tabs-panel-tab2');
      expect(panel2).toHaveAttribute('hidden');
      // Content 3 is in DOM but panel is hidden (disabled tab)
      const panel3 = screen.getByTestId('test-tabs-panel-tab3');
      expect(panel3).toHaveAttribute('hidden');
    });

    it('should hide inactive tab panels', () => {
      render(<TabContainer tabs={mockTabs} testId="test-tabs" />);
      
      const panel2 = screen.getByTestId('test-tabs-panel-tab2');
      expect(panel2).toHaveAttribute('hidden');
    });

    it('should not hide active tab panel', () => {
      render(<TabContainer tabs={mockTabs} testId="test-tabs" />);
      
      const panel1 = screen.getByTestId('test-tabs-panel-tab1');
      expect(panel1).not.toHaveAttribute('hidden');
    });
  });

  describe('Icons and Badges', () => {
    it('should render tab with icon', () => {
      const tabsWithIcon: Tab[] = [
        { 
          id: 'tab1', 
          label: 'Tab 1', 
          icon: <span data-testid="tab-icon">🔒</span>,
          content: <div>Content 1</div>,
        },
      ];
      
      render(<TabContainer tabs={tabsWithIcon} />);
      
      expect(screen.getByTestId('tab-icon')).toBeInTheDocument();
    });

    it('should render badge with correct value', () => {
      render(<TabContainer tabs={mockTabs} />);
      
      const badge = screen.getByText('3');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('bg-info-light/10');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty tabs array', () => {
      render(<TabContainer tabs={[]} testId="test-tabs" />);
      
      const tablist = screen.getByTestId('test-tabs-list');
      expect(tablist).toBeInTheDocument();
    });

    it('should handle single tab', () => {
      const singleTab: Tab[] = [
        { id: 'tab1', label: 'Only Tab', content: <div>Only Content</div> },
      ];
      
      render(<TabContainer tabs={singleTab} testId="test-tabs" />);
      
      expect(screen.getByText('Only Tab')).toBeInTheDocument();
      expect(screen.getByText('Only Content')).toBeVisible();
    });

    it('should handle all disabled tabs', () => {
      const allDisabled: Tab[] = [
        { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div>, disabled: true },
        { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div>, disabled: true },
      ];
      
      render(<TabContainer tabs={allDisabled} testId="test-tabs" />);
      
      const tab1Button = screen.getByText('Tab 1').closest('button');
      expect(tab1Button).toBeDisabled();
    });
  });
});
