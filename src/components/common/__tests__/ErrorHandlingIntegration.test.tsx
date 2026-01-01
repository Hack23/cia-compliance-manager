/**
 * Integration tests for error handling patterns
 * 
 * These tests demonstrate how widgets handle various error scenarios
 * and serve as examples for implementing error handling in new components.
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import ErrorMessage from '../ErrorMessage';
import LoadingSpinner from '../LoadingSpinner';
import { WIDGET_CONTAINER_TEST_IDS } from '../../../constants/testIds';

// Mock service that can simulate different scenarios
class MockService {
  private shouldFail: boolean = false;
  private shouldTimeout: boolean = false;
  private data: unknown = { value: 'test data' };

  setFailure(fail: boolean): void {
    this.shouldFail = fail;
  }

  setTimeout(timeout: boolean): void {
    this.shouldTimeout = timeout;
  }

  setData(data: unknown): void {
    this.data = data;
  }

  async fetchData(): Promise<unknown> {
    if (this.shouldTimeout) {
      await new Promise(resolve => setTimeout(resolve, 5000));
    }

    if (this.shouldFail) {
      throw new Error('Service unavailable');
    }

    return this.data;
  }
}

// Example widget using error handling components
interface ExampleWidgetProps {
  service: MockService;
}

const ExampleWidget: React.FC<ExampleWidgetProps> = ({ service }) => {
  const [data, setData] = React.useState<unknown>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  const fetchData = React.useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await service.fetchData();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [service]);

  React.useEffect(() => {
    void fetchData();
  }, [fetchData]);

  if (loading) {
    return <LoadingSpinner testId="widget-loader" />;
  }

  if (error) {
    return (
      <ErrorMessage
        title="Data Load Error"
        message={error.message}
        retry={fetchData}
        testId="widget-error"
      />
    );
  }

  return (
    <div data-testid="widget-content">
      {JSON.stringify(data)}
    </div>
  );
};

describe('Error Handling Integration Tests', () => {
  let mockService: MockService;

  beforeEach(() => {
    mockService = new MockService();
  });

  describe('Loading State', () => {
    it('displays loading spinner while fetching data', async () => {
      mockService.setTimeout(true);

      render(<ExampleWidget service={mockService} />);

      // Should show loading spinner immediately
      expect(screen.getByTestId(WIDGET_CONTAINER_TEST_IDS.WIDGET_LOADER)).toBeInTheDocument();

      // Content should not be visible
      expect(screen.queryByTestId(WIDGET_CONTAINER_TEST_IDS.WIDGET_CONTENT)).not.toBeInTheDocument();
    });

    it('removes loading spinner when data loads successfully', async () => {
      mockService.setData({ value: 'success' });

      render(<ExampleWidget service={mockService} />);

      // Wait for loading to complete
      await waitFor(() => {
        expect(screen.queryByTestId(WIDGET_CONTAINER_TEST_IDS.WIDGET_LOADER)).not.toBeInTheDocument();
      });

      // Content should now be visible
      expect(screen.getByTestId(WIDGET_CONTAINER_TEST_IDS.WIDGET_CONTENT)).toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    it('displays error message when service fails', async () => {
      mockService.setFailure(true);

      render(<ExampleWidget service={mockService} />);

      // Wait for error to appear
      await waitFor(() => {
        expect(screen.getByTestId(WIDGET_CONTAINER_TEST_IDS.WIDGET_ERROR)).toBeInTheDocument();
      });

      // Error message should be visible
      expect(screen.getByText('Data Load Error')).toBeInTheDocument();
      expect(screen.getByText('Service unavailable')).toBeInTheDocument();
    });

    it('displays retry button when error occurs', async () => {
      mockService.setFailure(true);

      render(<ExampleWidget service={mockService} />);

      await waitFor(() => {
        expect(screen.getByTestId(WIDGET_CONTAINER_TEST_IDS.WIDGET_ERROR_RETRY_BUTTON)).toBeInTheDocument();
      });

      const retryButton = screen.getByRole('button', { name: /try again/i });
      expect(retryButton).toBeInTheDocument();
    });
  });

  describe('Success State', () => {
    it('displays content when data loads successfully', async () => {
      mockService.setData({ value: 'test data' });

      render(<ExampleWidget service={mockService} />);

      await waitFor(() => {
        expect(screen.getByTestId(WIDGET_CONTAINER_TEST_IDS.WIDGET_CONTENT)).toBeInTheDocument();
      });

      expect(screen.getByText(/test data/i)).toBeInTheDocument();
    });
  });
});
