import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Toast, ToastContainer } from './Toast';
import type { Toast as ToastType } from './Toast';

describe('Toast', () => {
  const mockOnDismiss = vi.fn();
  
  const defaultToast: ToastType = {
    id: 1,
    type: 'info',
    message: 'Test message'
  };

  it('renders toast with message', () => {
    render(<Toast toast={defaultToast} onDismiss={mockOnDismiss} />);
    
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('renders success toast with correct styling', () => {
    const successToast: ToastType = { ...defaultToast, type: 'success' };
    render(<Toast toast={successToast} onDismiss={mockOnDismiss} />);
    
    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('bg-green-500');
    expect(screen.getByText('✓')).toBeInTheDocument();
  });

  it('renders error toast with correct styling', () => {
    const errorToast: ToastType = { ...defaultToast, type: 'error' };
    render(<Toast toast={errorToast} onDismiss={mockOnDismiss} />);
    
    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('bg-red-500');
    expect(screen.getByTestId('toast-1-icon')).toHaveTextContent('✕');
  });

  it('renders warning toast with correct styling', () => {
    const warningToast: ToastType = { ...defaultToast, type: 'warning' };
    render(<Toast toast={warningToast} onDismiss={mockOnDismiss} />);
    
    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('bg-yellow-500');
    expect(screen.getByText('⚠')).toBeInTheDocument();
  });

  it('renders info toast with correct styling', () => {
    const infoToast: ToastType = { ...defaultToast, type: 'info' };
    render(<Toast toast={infoToast} onDismiss={mockOnDismiss} />);
    
    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('bg-blue-500');
    expect(screen.getByText('ℹ')).toBeInTheDocument();
  });

  it('calls onDismiss when dismiss button is clicked', () => {
    render(<Toast toast={defaultToast} onDismiss={mockOnDismiss} />);
    
    const dismissButton = screen.getByLabelText('Dismiss notification');
    fireEvent.click(dismissButton);
    
    expect(mockOnDismiss).toHaveBeenCalledWith(1);
  });

  it('has proper ARIA attributes', () => {
    render(<Toast toast={defaultToast} onDismiss={mockOnDismiss} />);
    
    const toast = screen.getByRole('alert');
    expect(toast).toHaveAttribute('aria-live', 'assertive');
    expect(toast).toHaveAttribute('aria-atomic', 'true');
  });

  it('uses correct test IDs', () => {
    render(<Toast toast={defaultToast} onDismiss={mockOnDismiss} testId="custom-toast" />);
    
    expect(screen.getByTestId('custom-toast-1')).toBeInTheDocument();
    expect(screen.getByTestId('custom-toast-1-icon')).toBeInTheDocument();
    expect(screen.getByTestId('custom-toast-1-message')).toBeInTheDocument();
    expect(screen.getByTestId('custom-toast-1-dismiss')).toBeInTheDocument();
  });
});

describe('ToastContainer', () => {
  const mockOnDismiss = vi.fn();
  
  const toasts: ToastType[] = [
    { id: 1, type: 'success', message: 'Success message' },
    { id: 2, type: 'error', message: 'Error message' }
  ];

  it('renders all toasts', () => {
    render(<ToastContainer toasts={toasts} onDismiss={mockOnDismiss} />);
    
    expect(screen.getByText('Success message')).toBeInTheDocument();
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('renders nothing when no toasts', () => {
    const { container } = render(<ToastContainer toasts={[]} onDismiss={mockOnDismiss} />);
    
    expect(container.firstChild).toBeNull();
  });

  it('applies top-right position by default', () => {
    render(<ToastContainer toasts={toasts} onDismiss={mockOnDismiss} />);
    
    const container = screen.getByTestId('toast-container');
    expect(container).toHaveClass('top-4', 'right-4');
  });

  it('applies top-left position', () => {
    render(<ToastContainer toasts={toasts} onDismiss={mockOnDismiss} position="top-left" />);
    
    const container = screen.getByTestId('toast-container');
    expect(container).toHaveClass('top-4', 'left-4');
  });

  it('applies bottom-right position', () => {
    render(<ToastContainer toasts={toasts} onDismiss={mockOnDismiss} position="bottom-right" />);
    
    const container = screen.getByTestId('toast-container');
    expect(container).toHaveClass('bottom-4', 'right-4');
  });

  it('applies bottom-left position', () => {
    render(<ToastContainer toasts={toasts} onDismiss={mockOnDismiss} position="bottom-left" />);
    
    const container = screen.getByTestId('toast-container');
    expect(container).toHaveClass('bottom-4', 'left-4');
  });

  it('applies top-center position', () => {
    render(<ToastContainer toasts={toasts} onDismiss={mockOnDismiss} position="top-center" />);
    
    const container = screen.getByTestId('toast-container');
    expect(container).toHaveClass('top-4', 'left-1/2', '-translate-x-1/2');
  });

  it('uses custom test ID', () => {
    render(<ToastContainer toasts={toasts} onDismiss={mockOnDismiss} testId="custom-container" />);
    
    expect(screen.getByTestId('custom-container')).toBeInTheDocument();
  });
});
