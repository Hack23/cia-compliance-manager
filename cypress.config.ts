import { defineConfig } from "cypress";
import * as fs from "fs";
import * as path from "path";
import { resolve } from "path";

// Use __dirname in a more TypeScript-friendly way
const __dirname = resolve(process.cwd());

// Centralize report directories
const REPORTS_BASE_DIR = "docs/cypress";
const REPORTS = {
  junit: `${REPORTS_BASE_DIR}/junit`,
  mochawesome: `${REPORTS_BASE_DIR}/mochawesome`,
  videos: `${REPORTS_BASE_DIR}/videos`,
  screenshots: `${REPORTS_BASE_DIR}/screenshots`,
  artifacts: `${REPORTS_BASE_DIR}/artifacts`,
};

export default defineConfig({
  screenshotsFolder: REPORTS.screenshots,
  videosFolder: REPORTS.videos,
  experimentalMemoryManagement: true,
  video: false, // Disable video by default to save time - can be enabled via env var
  screenshotOnRunFailure: true,
  trashAssetsBeforeRuns: true,
  viewportWidth: 1280, // More focused viewport default
  viewportHeight: 800, // More focused viewport default
  retries: {
    runMode: 1, // Reduce retries to speed up failing tests
    openMode: 0, // No retries in open mode
  },
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    reporterEnabled: "spec, cypress-junit-reporter, mochawesome",
    mochaJunitReporterReporterOptions: {
      mochaFile: "docs/cypress/junit/results-[hash].xml",
      toConsole: false,
      attachments: true,
      testCaseSwitchClassnameAndName: false,
      includePending: true,
    },
    mochawesomeReporterOptions: {
      reportDir: REPORTS.mochawesome,
      overwrite: false,
      html: true,
      json: true,
      code: true,
      timestamp: "mmddyyyy_HHMMss",
      charts: true,
      showHooks: "failed",
      embeddedScreenshots: true,
    },
  },
  e2e: {
    baseUrl: "http://localhost:5173",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.ts",
    testIsolation: true, // Enable test isolation for more reliable tests
    setupNodeEvents(on, config) {
      on("before:run", () => {
        // Clean up all report directories
        Object.values(REPORTS).forEach((dir) => {
          if (fs.existsSync(dir)) {
            console.log(`Cleaning up ${dir}`);
            const files = fs.readdirSync(dir);
            files.forEach((file) => {
              const filePath = path.join(dir, file);
              if (!fs.lstatSync(filePath).isDirectory()) {
                fs.unlinkSync(filePath);
              }
            });
          } else {
            fs.mkdirSync(dir, { recursive: true });
            console.log(`Created directory ${dir}`);
          }
        });
      });

      // Use Cypress built-in TypeScript support instead of external preprocessor
      // Cypress 10+ has built-in TypeScript support, no additional configuration needed

      // Define tasks properly to avoid Promise chain issues
      on("task", {
        // Basic directory tasks
        ensureDir: (dir: string) => {
          // Use synchronous file operations to avoid Promise issues
          const fs = require("fs");
          const path = require("path");

          try {
            if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir, { recursive: true });
            }
            return true;
          } catch (error) {
            console.error(`Failed to create directory: ${dir}`, error);
            return false;
          }
        },

        // Example of a proper task that returns a direct value (not a Promise)
        log(message) {
          console.log(message);
          return null; // Tasks must return null or a serializable value
        },

        readFile({ path }) {
          try {
            const content = fs.readFileSync(path, "utf8");
            return { content };
          } catch (err) {
            return { error: `Error reading file: ${err}` };
          }
        },

        // Update the listJunitFiles task
        listJunitFiles() {
          try {
            if (!fs.existsSync(REPORTS.junit)) {
              return [];
            }
            return fs
              .readdirSync(REPORTS.junit)
              .filter((file) => file.endsWith(".xml"));
          } catch (err) {
            return [];
          }
        },

        // Update the resetJunitResults task
        resetJunitResults() {
          try {
            // Ensure directory exists
            if (!fs.existsSync(REPORTS.junit)) {
              fs.mkdirSync(REPORTS.junit, { recursive: true });
              return null;
            }

            return null;
          } catch (err) {
            console.error("Error resetting JUnit results:", err);
            return null;
          }
        },

        // You might also want to add a writeFile task for completeness
        writeFile({ path, content }) {
          try {
            fs.writeFileSync(path, content);
            return `File written successfully: ${path}`;
          } catch (err) {
            return `Error writing file: ${
              err instanceof Error ? err.message : String(err)
            }`;
          }
        },

        // Add additional error logging for better debugging
        logTestMetrics({ test, status, duration }) {
          console.log(
            `Test: ${test}, Status: ${status}, Duration: ${duration}ms`
          );
          return null;
        },

        // Simple implementation for the checkFilesExist task
        checkFilesExist({
          basePath,
          fileList,
        }: {
          basePath: string;
          fileList: string[];
        }) {
          const existingFiles = fileList.filter((file: string) =>
            fs.existsSync(path.join(basePath, file))
          );
          return existingFiles;
        },

        // Simple implementation for finding unconverted tests
        findUnconvertedTests({
          testDir,
          templatePattern,
        }: {
          testDir: string;
          templatePattern: string;
        }) {
          const files = fs.readdirSync(testDir);

          const unconverted = files.filter((file) => {
            if (!file.endsWith(".cy.ts")) return false;
            const content = fs.readFileSync(path.join(testDir, file), "utf8");
            return !content.includes(templatePattern);
          });

          return unconverted;
        },
      });

      return config;
    },
    retries: {
      runMode: 1, // Reduced retries for faster feedback
      openMode: 0,
    },
    defaultCommandTimeout: 6000, // Reduced from 8000ms
    chromeWebSecurity: false,
    numTestsKeptInMemory: 10, // Reduce memory usage
    experimentalMemoryManagement: true,
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
      viteConfig: {
        configFile: resolve(__dirname, "./vite.config.ts"),
      },
    },
  },
  waitForAnimations: false,
  pageLoadTimeout: 8000, // Reduced from 10000ms
  requestTimeout: 4000, // Reduced from 5000ms
  responseTimeout: 8000, // Add explicit response timeout
});
