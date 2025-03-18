import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Selection from './Selection';

describe('Selection Component', () => {
  // Create mock options properly as SelectionOption[]
  const mockOptions = [
    { value: 'None', label: 'None - No controls' },
    { value: 'Low', label: 'Low - Basic controls' },
    { value: 'Moderate', label: 'Moderate - Standard controls' },
    { value: 'High', label: 'High - Advanced controls' }
  ];

  it('renders correctly with options', () => {
    render(
      <Selection
        id="test-select"
        label="Test Selection"
        value="Low"
        options={mockOptions}
        onChange={() => {}}
        testId="test-selection"
      />
    );
    
    expect(screen.getByLabelText('Test Selection')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveValue('Low');
  });

  it('contains all option values', () => {
    render(
      <Selection
        id="test-select"
        label="Test Selection"
        value="Low"
        options={mockOptions}
        onChange={() => {}}
        testId="test-selection"
      />
    );
    
    const selectElement = screen.getByRole('combobox');
    expect(selectElement.children.length).toBe(mockOptions.length);
  });

  it('handles changes correctly', () => {
    const handleChange = vi.fn();
    render(
      <Selection
        id="test-select"
        label="Test Selection"
        value="Low"
        options={mockOptions}
        onChange={handleChange}
        testId="test-selection"
      />
    );
    
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'High' } });
    expect(handleChange).toHaveBeenCalledWith('High');
  });

  it('handles options with no corresponding security icons', () => {
    const customOptions = [
      ...mockOptions,
      { value: 'Custom', label: 'Custom - Custom level' }
    ];
    render(
      <Selection
        id="test-select"
        label="Test Selection"
        value="Custom"
        options={customOptions}
        onChange={() => {}}
        testId="test-selection"
      />
    );
    const select = screen.getByTestId('test-selection');
    expect(select).toBeInTheDocument();
  });

  describe('Accessibility', () => {
    it('maintains label-input association', () => {
      render(
        <Selection
          id="test-select"
          label="Test Selection"
          value="Low"
          options={mockOptions}
          onChange={() => {}}
          testId="test-selection"
        />
      );
      const select = screen.getByTestId('test-selection');
      expect(select).toHaveAttribute('id', 'test-select');
    });

    it('has proper ARIA attributes', () => {
      const testProps = {
        id: 'aria-test-select',
        label: 'Availability',
        value: 'Low',
        options: mockOptions,
        onChange: () => {},
        testId: 'aria-test-select'
      };

      const { rerender } = render(<Selection {...testProps} />);
      const select = screen.getByTestId('aria-test-select');
      expect(select).toHaveAttribute('id');
      expect(select).toHaveAttribute('aria-label', 'Availability');

      rerender(<Selection {...testProps} label="" />);
      const selectWithoutLabel = screen.getByTestId('aria-test-select');
      expect(selectWithoutLabel).not.toHaveAttribute('aria-label');
    });
  });

  describe('Option Handling', () => {
    it('displays correct number of options', () => {
      render(
        <Selection
          id="test-select"
          label="Test Selection"
          value="Low"
          options={mockOptions}
          onChange={() => {}}
          testId="test-selection"
        />
      );
      const optionElements = screen.getAllByRole('option');
      expect(optionElements).toHaveLength(mockOptions.length);
    });

    it('maintains option order', () => {
      render(
        <Selection
          id="test-select"
          label="Test Selection"
          value="Low"
          options={mockOptions}
          onChange={() => {}}
          testId="test-selection"
        />
      );
      const optionElements = screen.getAllByRole('option');
      optionElements.forEach((element, index) => {
        expect(element.textContent).toBe(mockOptions[index].label);
      });
    });
  });

  describe('Info and Context Functionality', () => {
    it('toggles info content when info button is clicked', () => {
      render(
        <Selection
          id="test-select"
          label="Test Selection"
          value="Low"
          options={mockOptions}
          onChange={() => {}}
          testId="test-selection"
          infoContent="Test info content"
        />
      );

      expect(screen.queryByText('Test info content')).not.toBeInTheDocument();

      const infoButton = screen.getByRole('button', {
        name: /Show information about Test Selection/
      });
      fireEvent.click(infoButton);

      expect(screen.getByText('Test info content')).toBeInTheDocument();

      fireEvent.click(infoButton);

      expect(screen.queryByText('Test info content')).not.toBeInTheDocument();
    });

    it('toggles context info when show/hide context button is clicked', () => {
      render(
        <Selection
          id="test-select"
          label="Test Selection"
          value="Low"
          options={mockOptions}
          onChange={() => {}}
          testId="test-selection"
          contextInfo="Test context information"
        />
      );

      const contextButton = screen.getByRole('button', {
        name: 'Show context'
      });
      expect(contextButton).toBeInTheDocument();
      expect(screen.queryByTestId('context-info')).not.toBeInTheDocument();

      fireEvent.click(contextButton);

      expect(screen.getByTestId('context-info')).toBeInTheDocument();
      expect(screen.getByTestId('context-info')).toHaveTextContent('Test context information');
      expect(screen.getByRole('button', { name: 'Hide context' })).toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: 'Hide context' }));

      expect(screen.queryByTestId('context-info')).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Show context' })).toBeInTheDocument();
    });

    it("doesn't render info button when infoContent is not provided", () => {
      render(
        <Selection
          id="test-select"
          label="Test Selection"
          value="Low"
          options={mockOptions}
          onChange={() => {}}
          testId="test-selection"
        />
      );

      expect(screen.queryByRole('button', { name: /Show information about/ })).not.toBeInTheDocument();
    });

    it("doesn't render context section when contextInfo is not provided", () => {
      render(
        <Selection
          id="test-select"
          label="Test Selection"
          value="Low"
          options={mockOptions}
          onChange={() => {}}
          testId="test-selection"
        />
      );

      expect(screen.queryByRole('button', { name: /context/ })).not.toBeInTheDocument();
    });
  });
});
