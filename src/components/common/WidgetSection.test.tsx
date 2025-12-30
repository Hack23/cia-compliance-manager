import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import WidgetSection from './WidgetSection';

describe('WidgetSection', () => {
  it('renders with required props', () => {
    render(
      <WidgetSection title="Test Section">
        <p>Test content</p>
      </WidgetSection>
    );

    expect(screen.getByText('Test Section')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders with subtitle', () => {
    render(
      <WidgetSection title="Test Section" subtitle="Test subtitle">
        <p>Test content</p>
      </WidgetSection>
    );

    expect(screen.getByText('Test subtitle')).toBeInTheDocument();
  });

  it('renders with icon', () => {
    render(
      <WidgetSection title="Test Section" icon="📊">
        <p>Test content</p>
      </WidgetSection>
    );

    expect(screen.getByText('📊')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <WidgetSection title="Test Section" className="custom-class">
        <p>Test content</p>
      </WidgetSection>
    );

    const section = container.querySelector('section');
    expect(section).toHaveClass('custom-class');
  });

  it('applies custom testId', () => {
    render(
      <WidgetSection title="Test Section" testId="custom-test-id">
        <p>Test content</p>
      </WidgetSection>
    );

    expect(screen.getByTestId('custom-test-id')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    const { container } = render(
      <WidgetSection title="Test Section" variant="success">
        <p>Test content</p>
      </WidgetSection>
    );

    const section = container.querySelector('section');
    expect(section).toHaveClass('border-green-200');
    expect(section).toHaveClass('bg-green-50');
  });

  it('supports aria-labelledby for accessibility', () => {
    render(
      <WidgetSection
        title="Test Section"
        ariaLabelledBy="test-section-heading"
      >
        <p>Test content</p>
      </WidgetSection>
    );

    const section = screen.getByTestId('widget-section');
    expect(section).toHaveAttribute('aria-labelledby', 'test-section-heading');
  });

  it('renders multiple children', () => {
    render(
      <WidgetSection title="Test Section">
        <p>First child</p>
        <div>Second child</div>
      </WidgetSection>
    );

    expect(screen.getByText('First child')).toBeInTheDocument();
    expect(screen.getByText('Second child')).toBeInTheDocument();
  });

  it('applies primary variant correctly', () => {
    const { container } = render(
      <WidgetSection title="Test Section" variant="primary">
        <p>Test content</p>
      </WidgetSection>
    );

    const section = container.querySelector('section');
    expect(section).toHaveClass('border-primary-light');
  });

  it('applies error variant correctly', () => {
    const { container } = render(
      <WidgetSection title="Test Section" variant="error">
        <p>Test content</p>
      </WidgetSection>
    );

    const section = container.querySelector('section');
    expect(section).toHaveClass('border-red-200');
    expect(section).toHaveClass('bg-red-50');
  });
});
