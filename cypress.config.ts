import { defineConfig } from "cypress";
import vitePreprocessor from "cypress-vite";
import { resolve } from "path";
import * as fs from "fs";
import junitReporter from "./cypress/support/plugins/junit-reporter";
import { resetJunitResults } from "./cypress/tasks/junit-reset";

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
  // Set reporter to null to disable built-in JUnit reporter
  reporter: null,
  e2e: {
    baseUrl: "http://localhost:5173",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.ts",
    testIsolation: false,
    setupNodeEvents(on, config) {
      // Register our improved JUnit reporter
      junitReporter(on, config);

      on(
        "file:preprocessor",
        vitePreprocessor({
          configFile: resolve(__dirname, "./vite.config.ts"),
        })
      );

      // Register tasks for backward compatibility
      on("task", {
        // New readFile task
        readFile(filePath: string) {
          if (fs.existsSync(filePath)) {
            return fs.readFileSync(filePath, "utf8");
          }
          throw new Error(`File not found: ${filePath}`);
        },
        resetJunitResults: resetJunitResults,
        listJunitFiles() {
          const resultsDir = resolve(__dirname, "cypress/results");
          if (!fs.existsSync(resultsDir)) {
            console.log(`Results directory does not exist: ${resultsDir}`);
            return [];
          }

          const files = fs
            .readdirSync(resultsDir)
            .filter((file) => file.endsWith(".xml"));

          return files;
        },
      });

      return config;
    },
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
  waitForAnimations: false,
  defaultCommandTimeout: 5000,
  pageLoadTimeout: 10000,
  requestTimeout: 5000,
});
