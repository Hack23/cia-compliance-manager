import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import WidgetContainer, { WidgetContainerProps } from './WidgetContainer';

describe('WidgetContainer', () => {
  it('renders with title and content', () => {
    // Arrange
    const props: WidgetContainerProps = {
      title: 'Test Widget',
      children: <div>Test content</div>,
      testId: 'test-widget'
    };

    // Act
    render(<WidgetContainer {...props} />);

    // Assert
    expect(screen.getByTestId('test-widget')).toBeInTheDocument();
    expect(screen.getByText('Test Widget')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders with loading state', () => {
    render(
      <WidgetContainer title="Test Widget" loading={true}>
        <div>Widget Content</div>
      </WidgetContainer>
    );
    
    // Loading spinner should be rendered
    expect(screen.queryByText('Widget Content')).not.toBeInTheDocument();
    expect(screen.getByTestId('widget-container-loading')).toBeInTheDocument();
  });

  it('renders with error state', () => {
    render(
      <WidgetContainer title="Test Widget" error={new Error('Test error')}>
        <div>Error Content</div>
      </WidgetContainer>
    );
    
    expect(screen.getByText('Test error')).toBeInTheDocument();
    expect(screen.getByTestId('test-widget-error')).toBeInTheDocument();
  });

  // Remove or update test for headerContent since it's not in the props interface
  // it('renders with header content', () => {
  //   render(
  //     <WidgetContainer title="Test Widget" headerContent={<div>Header Content</div>}>
  //       <div>Widget Content</div>
  //     </WidgetContainer>
  //   );
  //   
  //   expect(screen.getByText('Header Content')).toBeInTheDocument();
  // });

  it('renders with icon', () => {
    const iconTestId = 'test-icon';
    render(
      <WidgetContainer title="Test Widget" icon={<span data-testid={iconTestId}>🔒</span>}>
        <div>Widget Content</div>
      </WidgetContainer>
    );
    
    expect(screen.getByTestId(iconTestId)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <WidgetContainer title="Test Widget" className="custom-class">
        <div>Widget Content</div>
      </WidgetContainer>
    );
    
    const widgetElement = container.firstChild as HTMLElement;
    expect(widgetElement.classList.contains('custom-class')).toBe(true);
  });

  it('renders children', () => {
    render(
      <WidgetContainer title="Test Widget">
        <div data-testid="child-element">Child Content</div>
      </WidgetContainer>
    );
    
    expect(screen.getByTestId('child-element')).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <WidgetContainer title="Test Widget" className="test-class">
        <div>Content</div>
      </WidgetContainer>
    );
    
    expect(container.firstChild).toHaveClass('test-class');
  });

  it('renders with title', () => {
    render(
      <WidgetContainer title="Widget Title">
        <div>Content</div>
      </WidgetContainer>
    );
    
    expect(screen.getByText('Widget Title')).toBeInTheDocument();
  });

  it('renders loading state', () => {
    render(
      <WidgetContainer title="Test Widget" loading={true}>
        <div>Content</div>
      </WidgetContainer>
    );
    
    expect(screen.getByTestId('widget-container-loading')).toBeInTheDocument();
  });

  it('renders with test ID', () => {
    render(
      <WidgetContainer title="Test Widget" testId="custom-test-id">
        <div>Content</div>
      </WidgetContainer>
    );
    
    expect(screen.getByTestId('custom-test-id')).toBeInTheDocument();
  });

  // Remove or update this test since style is not in the props interface
  // it('applies custom style', () => {
  //   const { container } = render(
  //     <WidgetContainer title="Test Widget" style={{ backgroundColor: 'red' }}>
  //       <div>Content</div>
  //     </WidgetContainer>
  //   );
  //   
  //   const widgetElement = container.firstChild as HTMLElement;
  //   expect(widgetElement).toHaveStyle('background-color: red');
  // });
});
