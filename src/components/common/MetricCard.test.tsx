import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MetricCard from './MetricCard';

describe('MetricCard', () => {
  it('renders with required props', () => {
    render(<MetricCard label="Test Metric" value="100" />);

    expect(screen.getByText('Test Metric')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('renders with unit', () => {
    render(<MetricCard label="Test Metric" value="99.9" unit="%" />);

    expect(screen.getByText('99.9%')).toBeInTheDocument();
  });

  it('renders with icon', () => {
    render(<MetricCard label="Test Metric" value="100" icon="📊" />);

    expect(screen.getByText('📊')).toBeInTheDocument();
  });

  it('renders with description', () => {
    render(
      <MetricCard
        label="Test Metric"
        value="100"
        description="This is a test description"
      />
    );

    expect(screen.getByText('This is a test description')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <MetricCard label="Test Metric" value="100" className="custom-class" />
    );

    const card = container.querySelector('div[data-testid="metric-card"]');
    expect(card).toHaveClass('custom-class');
  });

  it('applies custom testId', () => {
    render(
      <MetricCard label="Test Metric" value="100" testId="custom-test-id" />
    );

    expect(screen.getByTestId('custom-test-id')).toBeInTheDocument();
  });

  it('renders with numeric value', () => {
    render(<MetricCard label="Test Metric" value={42} />);

    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('applies success variant correctly', () => {
    const { container } = render(
      <MetricCard label="Test Metric" value="100" variant="success" />
    );

    const card = container.querySelector('div[data-testid="metric-card"]');
    expect(card).toHaveClass('border-green-300');
    expect(card).toHaveClass('bg-green-50');
  });

  it('applies error variant correctly', () => {
    const { container } = render(
      <MetricCard label="Test Metric" value="0" variant="error" />
    );

    const card = container.querySelector('div[data-testid="metric-card"]');
    expect(card).toHaveClass('border-red-300');
    expect(card).toHaveClass('bg-red-50');
  });

  it('applies warning variant correctly', () => {
    const { container } = render(
      <MetricCard label="Test Metric" value="50" variant="warning" />
    );

    const card = container.querySelector('div[data-testid="metric-card"]');
    expect(card).toHaveClass('border-yellow-300');
    expect(card).toHaveClass('bg-yellow-50');
  });

  it('applies primary variant correctly', () => {
    const { container } = render(
      <MetricCard label="Test Metric" value="100" variant="primary" />
    );

    const card = container.querySelector('div[data-testid="metric-card"]');
    expect(card).toHaveClass('border-primary-light');
  });

  it('applies info variant correctly', () => {
    const { container } = render(
      <MetricCard label="Test Metric" value="100" variant="info" />
    );

    const card = container.querySelector('div[data-testid="metric-card"]');
    expect(card).toHaveClass('border-blue-300');
    expect(card).toHaveClass('bg-blue-50');
  });

  it('renders all elements with testIds', () => {
    render(
      <MetricCard
        label="Test Metric"
        value="100"
        description="Test description"
        testId="test-metric"
      />
    );

    expect(screen.getByTestId('test-metric')).toBeInTheDocument();
    expect(screen.getByTestId('test-metric-value')).toBeInTheDocument();
    expect(screen.getByTestId('test-metric-label')).toBeInTheDocument();
    expect(screen.getByTestId('test-metric-description')).toBeInTheDocument();
  });

  it('has proper aria-label', () => {
    render(<MetricCard label="Uptime" value="99.9" unit="%" />);

    const card = screen.getByTestId('metric-card');
    expect(card).toHaveAttribute('aria-label', 'Uptime: 99.9%');
  });

  it('supports custom aria-label', () => {
    render(
      <MetricCard
        label="Uptime"
        value="99.9"
        unit="%"
        ariaLabel="Custom aria label"
      />
    );

    const card = screen.getByTestId('metric-card');
    expect(card).toHaveAttribute('aria-label', 'Custom aria label');
  });

  it('renders with string value and unit', () => {
    render(<MetricCard label="Duration" value="4-8" unit=" hours" />);

    expect(screen.getByText('4-8 hours')).toBeInTheDocument();
  });
});
