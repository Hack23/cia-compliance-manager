import { defineConfig } from "cypress";
import { resolve } from "path";
import * as fs from "fs";
import junitReporter from "./cypress/support/plugins/junit-reporter";
import { resetJunitResults } from "./cypress/tasks/junit-reset";

// Use __dirname in a more TypeScript-friendly way
const __dirname = resolve(process.cwd());

// Ensure the results directory exists
const resultsDir = resolve(__dirname, "cypress/results");
if (!fs.existsSync(resultsDir)) {
  fs.mkdirSync(resultsDir, { recursive: true });
  console.log(`Created results directory: ${resultsDir}`);
}

export default defineConfig({
  // Enable experimental memory management to reduce memory leaks
  experimentalMemoryManagement: true,
  // Lower the number of tests kept in memory to reduce memory consumption
  // during 'cypress open' (interactive mode)
  numTestsKeptInMemory: 5, // Lower this value from default (50) to use less memory

  video: true,
  screenshotOnRunFailure: true,
  trashAssetsBeforeRuns: true,
  viewportWidth: 1940,
  viewportHeight: 1080,
  retries: {
    runMode: 1,
    openMode: 1,
  },
  // Set reporter to junit for XML reports
  reporter: "junit",
  reporterOptions: {
    mochaFile: "cypress/results/junit-[hash].xml",
    toConsole: true,
  },
  e2e: {
    baseUrl: "http://localhost:5173",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.ts",
    testIsolation: false,
    setupNodeEvents(on, config) {
      // Register our improved JUnit reporter
      junitReporter(on, config);

      // Import the plugins directly without using either require or dynamic import
      // We'll use fs directly to handle the plugin functionality ourselves

      // Register basic tasks
      on("task", {
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
        // Add missing tasks from plugins
        ensureDir(dirPath) {
          try {
            if (!fs.existsSync(dirPath)) {
              fs.mkdirSync(dirPath, { recursive: true });
              return `Created directory: ${dirPath}`;
            }
            return `Directory already exists: ${dirPath}`;
          } catch (error) {
            console.error(`Error creating directory ${dirPath}:`, error);
            return `Error: ${error.message}`;
          }
        },
        listFiles(pattern) {
          try {
            // Simple implementation without glob
            const dir = resolve(pattern.replace(/\*.*$/, ""));
            if (fs.existsSync(dir)) {
              const files = fs.readdirSync(dir);
              const filteredFiles = files
                .map((file) => resolve(dir, file))
                .filter((file) => {
                  // Simple pattern matching
                  const basename = file.split("/").pop() || "";
                  const patternBase = pattern.split("/").pop() || "";
                  const regexPattern = patternBase.replace(/\*/g, ".*");
                  return new RegExp(regexPattern).test(basename);
                });
              return filteredFiles;
            }
            return [];
          } catch (error) {
            console.error(
              `Error listing files with pattern ${pattern}:`,
              error
            );
            return [];
          }
        },
        readFile(filePath) {
          try {
            if (!fs.existsSync(filePath)) {
              return { success: false, error: `File not found: ${filePath}` };
            }

            const content = fs.readFileSync(filePath, "utf8");
            return { success: true, content };
          } catch (error) {
            console.error(`Error reading file from ${filePath}:`, error);
            return { success: false, error: error.message };
          }
        },
        writeFile({ path: filePath, content }) {
          try {
            // Ensure directory exists
            const dir = filePath.substring(0, filePath.lastIndexOf("/"));
            if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir, { recursive: true });
            }

            // Write the file
            fs.writeFileSync(filePath, content);
            return { success: true, filePath };
          } catch (error) {
            console.error(`Error writing file to ${filePath}:`, error);
            return { success: false, error: error.message };
          }
        },
        fileContains({ path, text }) {
          try {
            if (!fs.existsSync(path)) {
              return { exists: false, contains: false };
            }

            const content = fs.readFileSync(path, "utf8");
            return {
              exists: true,
              contains: content.includes(text),
              path,
            };
          } catch (error) {
            console.error(`Error checking file ${path}:`, error);
            return {
              exists: false,
              contains: false,
              error: error.message,
            };
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
