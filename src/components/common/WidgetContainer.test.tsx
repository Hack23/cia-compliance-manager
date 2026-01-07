import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import WidgetContainer from './WidgetContainer';
import { WIDGET_CONTAINER_TEST_IDS } from '../../constants/testIds';

describe('WidgetContainer', () => {
  it('renders with title and content', () => {
    render(
      <WidgetContainer title="Test Widget">
        <div data-testid="test-content">Content</div>
      </WidgetContainer>
    );

    expect(screen.getByText('Test Widget')).toBeInTheDocument();
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.getByTestId(WIDGET_CONTAINER_TEST_IDS.WIDGET_CONTAINER)).toBeInTheDocument();
  });

  it('renders with loading state', () => {
    render(
      <WidgetContainer title="Test Widget" isLoading={true}>
        <div>Content (should not be visible during loading)</div>
      </WidgetContainer>
    );

    expect(screen.getByText('Test Widget')).toBeInTheDocument();
    expect(screen.getByTestId(WIDGET_CONTAINER_TEST_IDS.WIDGET_SPINNER)).toBeInTheDocument();
    expect(screen.getByTestId(WIDGET_CONTAINER_TEST_IDS.WIDGET_CONTAINER_LOADING_CONTAINER)).toBeInTheDocument();
  });

  it('renders with error state', () => {
    render(
      <WidgetContainer title="Test Widget" error="Test error">
        <div>Content (should not be visible during error)</div>
      </WidgetContainer>
    );

    expect(screen.getByText('Test Widget')).toBeInTheDocument();
    expect(screen.getByTestId('test-widget-error')).toHaveTextContent('Test error');
    expect(screen.getByTestId(WIDGET_CONTAINER_TEST_IDS.WIDGET_CONTAINER_ERROR)).toBeInTheDocument();
  });

  it('renders with icon', () => {
    const iconTestId = 'test-icon';
    render(
      <WidgetContainer title="Test Widget" icon={<span data-testid={iconTestId}>🔒</span>}>
        <div>Content</div>
      </WidgetContainer>
    );

    expect(screen.getByTestId(iconTestId)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    render(
      <WidgetContainer title="Test Widget" className={customClass}>
        <div>Content</div>
      </WidgetContainer>
    );

    expect(screen.getByTestId(WIDGET_CONTAINER_TEST_IDS.WIDGET_CONTAINER)).toHaveClass(customClass);
  });

  it('renders children', () => {
    const childTestId = 'test-child';
    render(
      <WidgetContainer title="Test Widget">
        <div data-testid={childTestId}>Child Content</div>
      </WidgetContainer>
    );

    expect(screen.getByTestId(childTestId)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const customClass = 'my-custom-class';
    render(
      <WidgetContainer title="Test Widget" className={customClass}>
        <div>Content</div>
      </WidgetContainer>
    );

    expect(screen.getByTestId(WIDGET_CONTAINER_TEST_IDS.WIDGET_CONTAINER)).toHaveClass(customClass);
  });

  it('renders with title', () => {
    render(
      <WidgetContainer title="Custom Widget Title">
        <div>Content</div>
      </WidgetContainer>
    );

    expect(screen.getByText('Custom Widget Title')).toBeInTheDocument();
  });

  it('renders loading state', () => {
    // Test with the "loading" prop for backward compatibility
    render(
      <WidgetContainer title="Test Widget" loading={true}>
        <div>Content</div>
      </WidgetContainer>
    );

    expect(screen.getByTestId(WIDGET_CONTAINER_TEST_IDS.WIDGET_SPINNER)).toBeInTheDocument();
  });

  it('renders with test ID', () => {
    const testId = 'custom-widget-id';
    render(
      <WidgetContainer title="Test Widget" testId={testId}>
        <div>Content</div>
      </WidgetContainer>
    );

    expect(screen.getByTestId(`widget-container-${testId}`)).toBeInTheDocument();
  });

  it('renders with actions', () => {
    const actionsTestId = 'test-actions';
    render(
      <WidgetContainer 
        title="Test Widget" 
        actions={<button data-testid={actionsTestId}>Action</button>}
      >
        <div>Content</div>
      </WidgetContainer>
    );

    expect(screen.getByTestId(actionsTestId)).toBeInTheDocument();
  });

  it('renders error with Error object', () => {
    const errorObj = new Error('Test error object');
    render(
      <WidgetContainer title="Test Widget" error={errorObj}>
        <div>Content</div>
      </WidgetContainer>
    );

    expect(screen.getByText('Test error object')).toBeInTheDocument();
  });

  it('renders error with errorContent', () => {
    const errorContentTestId = 'error-content';
    render(
      <WidgetContainer 
        title="Test Widget" 
        error="Test error"
        errorContent={<div data-testid={errorContentTestId}>Additional error info</div>}
      >
        <div>Content</div>
      </WidgetContainer>
    );

    expect(screen.getByTestId(errorContentTestId)).toBeInTheDocument();
  });

  it('applies design token spacing via inline styles', () => {
    const { container } = render(
      <WidgetContainer title="Test Widget">
        <div>Content</div>
      </WidgetContainer>
    );

    // Check that widget header has inline styles
    const header = container.querySelector('.widget-header');
    expect(header).toHaveStyle({ paddingTop: '6px' }); // SPACING.sm
    expect(header).toHaveStyle({ paddingLeft: '8px' }); // SPACING.md

    // Check that widget body has inline styles  
    const body = container.querySelector('.widget-body');
    expect(body).toHaveStyle({ padding: '8px' }); // SPACING.md
  });

  it('renders icon with proper spacing', () => {
    const iconTestId = 'widget-icon';
    const { container } = render(
      <WidgetContainer 
        title="Test Widget" 
        icon={<span data-testid={iconTestId}>🔒</span>}
      >
        <div>Content</div>
      </WidgetContainer>
    );

    const icon = screen.getByTestId(iconTestId);
    const iconParent = icon.parentElement;
    expect(iconParent).toHaveStyle({ marginRight: '6px' }); // SPACING.sm
  });
});
