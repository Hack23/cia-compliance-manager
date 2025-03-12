/**
 * Type definitions for junit-merger module
 */

export interface JunitMergerOptions {
  resultsDir?: string;
  prefix?: string;
  filePattern?: string;
  outputFile?: string;
}

export function junitMerger(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions,
  options?: JunitMergerOptions
): void;

export function mergeAllJunitReports(): Promise<{
  success: boolean;
  error?: string;
  files?: string[];
}>;
