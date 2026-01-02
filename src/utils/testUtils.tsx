import { render, RenderOptions, waitFor, screen } from '@testing-library/react';
import React, { ReactElement } from 'react';
import { expect, vi } from 'vitest';
import { SecurityLevel } from '../types/cia';

/**
 * Common widget test props with standard security levels
 * Used as baseline props for widget testing
 */
export const mockWidgetProps = {
  availabilityLevel: 'Moderate' as SecurityLevel,
  integrityLevel: 'Moderate' as SecurityLevel,
  confidentialityLevel: 'Moderate' as SecurityLevel,
};

/**
 * Props for testing high security scenario
 */
export const mockHighSecurityProps = {
  availabilityLevel: 'High' as SecurityLevel,
  integrityLevel: 'High' as SecurityLevel,
  confidentialityLevel: 'High' as SecurityLevel,
};

/**
 * Props for testing low security scenario
 */
export const mockLowSecurityProps = {
  availabilityLevel: 'Low' as SecurityLevel,
  integrityLevel: 'Low' as SecurityLevel,
  confidentialityLevel: 'Low' as SecurityLevel,
};

/**
 * Props for testing mixed security levels
 */
export const mockMixedSecurityProps = {
  availabilityLevel: 'High' as SecurityLevel,
  integrityLevel: 'Moderate' as SecurityLevel,
  confidentialityLevel: 'Low' as SecurityLevel,
};

/**
 * Props for testing Very High security scenario
 */
export const mockVeryHighSecurityProps = {
  availabilityLevel: 'Very High' as SecurityLevel,
  integrityLevel: 'Very High' as SecurityLevel,
  confidentialityLevel: 'Very High' as SecurityLevel,
};

/**
 * Custom render function with common providers
 * Currently no providers are needed, but this provides a consistent API
 * for future enhancements
 * 
 * @param ui - React element to render
 * @param options - Additional render options
 * @returns Render result from @testing-library/react
 */
export function renderWidget(
  ui: ReactElement,
  options?: RenderOptions
) {
  return render(ui, {
    ...options,
  });
}

/**
 * Wait for widget to finish loading
 * Checks that the loading indicator is no longer present
 * 
 * @param testId - Base test ID of the widget
 * @throws Will throw if the loading state doesn't clear within timeout
 * 
 * @example
 * await waitForWidgetLoad('widget-cost-estimation');
 */
export async function waitForWidgetLoad(testId: string) {
  await waitFor(() => {
    const loadingIndicator = screen.queryByTestId(`${testId}-loading`);
    const containerLoading = screen.queryByTestId(`widget-container-loading-container-${testId}`);
    
    // Both loading indicators should be absent
    expect(loadingIndicator).not.toBeInTheDocument();
    expect(containerLoading).not.toBeInTheDocument();
  }, { timeout: 3000 });
}

/**
 * Wait for widget content to be visible
 * Checks that the widget's content area is present
 * 
 * @param testId - Base test ID of the widget
 * @throws Will throw if content doesn't appear within timeout
 * 
 * @example
 * await waitForWidgetContent('widget-cost-estimation');
 */
export async function waitForWidgetContent(testId: string) {
  await waitFor(() => {
    const content = screen.queryByTestId(`${testId}-content`) || 
                   screen.queryByTestId(`widget-container-content-${testId}`);
    expect(content).toBeInTheDocument();
  }, { timeout: 3000 });
}

/**
 * Wait for widget error state to be visible
 * Checks that the widget's error message is present
 * 
 * @param testId - Base test ID of the widget
 * @throws Will throw if error doesn't appear within timeout
 * 
 * @example
 * await waitForWidgetError('widget-cost-estimation');
 */
export async function waitForWidgetError(testId: string) {
  await waitFor(() => {
    const error = screen.queryByTestId(`${testId}-error`) || 
                 screen.queryByTestId(`widget-container-error-${testId}`);
    expect(error).toBeInTheDocument();
  }, { timeout: 3000 });
}


