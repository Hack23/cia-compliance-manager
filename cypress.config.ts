import { defineConfig } from "cypress";
import vitePreprocessor from "cypress-vite";
import { resolve } from "path";
import * as fs from "fs";
import junitReporter from "./cypress/support/plugins/junit-reporter";

// Use __dirname in a more TypeScript-friendly way
const __dirname = resolve(process.cwd());

// Ensure the results directory exists
const resultsDir = resolve(__dirname, "cypress/results");
if (!fs.existsSync(resultsDir)) {
  fs.mkdirSync(resultsDir, { recursive: true });
  console.log(`Created results directory: ${resultsDir}`);
}

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

      // Add a task to list JUnit files
      on("task", {
        listJunitFiles() {
          const resultsDir = resolve(__dirname, "cypress/results");
          if (!fs.existsSync(resultsDir)) {
            console.log(`Results directory does not exist: ${resultsDir}`);
            return [];
          }

          const files = fs
            .readdirSync(resultsDir)
            .filter((file) => file.endsWith(".xml"));

          console.log(`Found ${files.length} JUnit files in ${resultsDir}`);
          files.forEach((file) => console.log(`- ${file}`));

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
