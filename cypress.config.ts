import { defineConfig } from "cypress";
import vitePreprocessor from "cypress-vite";
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
  video: true,
  screenshotOnRunFailure: true,
  trashAssetsBeforeRuns: true,
  viewportWidth: 1280, // More focused viewport default
  viewportHeight: 800, // More focused viewport default
  retries: {
    runMode: 2, // Increase retries for CI runs
    openMode: 1, // Allow one retry in open mode
  },
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    reporterEnabled: "spec, cypress-junit-reporter, mochawesome",
    mochaJunitReporterReporterOptions: {
      mochaFile: "cypress/reports/junit/results-[hash].xml",
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
      timestamp: "mmddyyyy_HHMMss",
      charts: true,
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

      // Register vite preprocessor
      on(
        "file:preprocessor",
        vitePreprocessor({
          configFile: resolve(__dirname, "./vite.config.ts"),
        })
      );

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

            // Find and delete all XML files in the directory
            const xmlFiles = fs
              .readdirSync(REPORTS.junit)
              .filter((file) => file.endsWith(".xml"));

            // Delete each XML file
            xmlFiles.forEach((file) => {
              const filePath = path.join(REPORTS.junit, file);
              fs.unlinkSync(filePath);
            });

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
      });

      return config;
    },
    retries: {
      runMode: 1,
      openMode: 0,
    },
    defaultCommandTimeout: 8000, // Slightly reduced from 10000
    chromeWebSecurity: false,
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
  waitForAnimations: false,
  pageLoadTimeout: 10000,
  requestTimeout: 5000,
});
