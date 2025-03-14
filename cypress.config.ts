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
  reporter: "cypress-junit-reporter",
  reporterOptions: {
    mochaFile: "cypress/results/junit-[hash].xml",
    toConsole: true,
    attachments: true,
    testCaseSwitchClassnameAndName: false,
    rootSuiteTitle: "CIA Compliance Manager Tests",
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

      // Simple directory and file utilities
      on("task", {
        ensureDir(dirPath) {
          try {
            if (!fs.existsSync(dirPath)) {
              fs.mkdirSync(dirPath, { recursive: true });
              return `Created directory: ${dirPath}`;
            }
            return `Directory already exists: ${dirPath}`;
          } catch (err) {
            return `Error creating directory: ${err}`;
          }
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
