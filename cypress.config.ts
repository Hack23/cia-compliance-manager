import { defineConfig } from "cypress";
import vitePreprocessor from "cypress-vite";
import * as fs from "fs";
import * as path from "path";
import { resolve } from "path";

// Use __dirname in a more TypeScript-friendly way
const __dirname = resolve(process.cwd());

export default defineConfig({
  experimentalMemoryManagement: true,
  video: true,
  screenshotOnRunFailure: true,
  trashAssetsBeforeRuns: true,
  viewportWidth: 3840,
  viewportHeight: 2160,
  retries: {
    runMode: 2,
    openMode: 1,
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
      reportDir: "cypress/reports/mochawesome",
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
    testIsolation: false,
    setupNodeEvents(on, config) {
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

        listJunitFiles() {
          try {
            const resultsDir = path.join(process.cwd(), "cypress", "results");
            if (!fs.existsSync(resultsDir)) {
              return [];
            }
            return fs
              .readdirSync(resultsDir)
              .filter((file) => file.endsWith(".xml"));
          } catch (err) {
            return [];
          }
        },

        // Add the missing resetJunitResults task
        resetJunitResults() {
          try {
            const resultsDir = path.join(process.cwd(), "cypress", "results");

            // Ensure directory exists
            if (!fs.existsSync(resultsDir)) {
              fs.mkdirSync(resultsDir, { recursive: true });
              return null; // Return null instead of a string
            }

            // Find and delete all XML files in the directory
            const xmlFiles = fs
              .readdirSync(resultsDir)
              .filter((file) => file.endsWith(".xml"));

            // Delete each XML file
            xmlFiles.forEach((file) => {
              const filePath = path.join(resultsDir, file);
              fs.unlinkSync(filePath);
            });

            return null; // Return null instead of a string
          } catch (err) {
            console.error("Error resetting JUnit results:", err);
            return null; // Return null instead of a string
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
      });

      return config;
    },
    retries: {
      runMode: 1,
      openMode: 0,
    },
    defaultCommandTimeout: 10000,
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
