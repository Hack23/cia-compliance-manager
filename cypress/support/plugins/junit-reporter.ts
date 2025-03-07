import fs from "fs";
import path from "path";

// Define custom types instead of trying to augment Cypress namespace
type TestState = "passed" | "failed" | "skipped" | "pending";

interface TestError {
  message: string;
  stack?: string;
  name?: string;
}

interface TestResult {
  title: string | string[];
  state: TestState;
  duration: number;
  displayError?: string;
  attempts?: Array<{ state: string; error?: TestError }>;
}

interface TestSuite {
  title: string;
  tests: TestResult[];
  duration: number;
  timestamp: string;
  file: string;
}

interface JUnitReportManifest {
  timestamp: string;
  files: string[];
  totalTests: number;
  totalFailures?: number;
  totalDuration?: number;
}

// Constants
const RESULTS_DIR = path.join(process.cwd(), "cypress", "results");

// Ensure results directory exists
if (!fs.existsSync(RESULTS_DIR)) {
  fs.mkdirSync(RESULTS_DIR, { recursive: true });
}

// Store test results during the test run
const specResults: Record<string, TestSuite> = {};

/**
 * Generate a clean filename from a test spec path
 */
function getSpecFileName(specPath: string): string {
  if (!specPath) return "unknown-spec";

  // Extract the filename without extension
  const baseName = path.basename(specPath, path.extname(specPath));

  // Make it safe for filenames by replacing non-alphanumeric chars
  return baseName.replace(/[^a-zA-Z0-9-]/g, "_");
}

/**
 * Generate JUnit XML content for a test suite
 */
function generateJUnitXml(testSuite: TestSuite): string {
  const { title, tests, duration, timestamp, file } = testSuite;

  // Count failures
  const failures = tests.filter((test) => test.state === "failed").length;

  // Generate test case elements
  const testCases = tests
    .map((test) => {
      const testCaseXml = `    <testcase name="${escapeXml(
        Array.isArray(test.title) ? test.title.join(" > ") : test.title
      )}" time="${(test.duration / 1000).toFixed(3)}" classname="${escapeXml(
        file
      )}">
${
  test.state === "failed"
    ? `      <failure message="${escapeXml(
        test.displayError || ""
      )}" type="AssertionError"><![CDATA[${
        test.attempts && test.attempts.length > 0
          ? test.attempts[test.attempts.length - 1].error?.stack || ""
          : ""
      }]]></failure>`
    : ""
}
${test.state === "skipped" ? "      <skipped/>" : ""}
    </testcase>`;
      return testCaseXml;
    })
    .join("\n");

  // Generate the complete XML
  return `<?xml version="1.0" encoding="UTF-8"?>
<testsuites name="Cypress Tests" time="${(duration / 1000).toFixed(
    3
  )}" tests="${tests.length}" failures="${failures}">
  <testsuite name="${escapeXml(title)}" timestamp="${timestamp}" tests="${
    tests.length
  }" file="${escapeXml(file)}" time="${(duration / 1000).toFixed(
    3
  )}" failures="${failures}">
${testCases}
  </testsuite>
</testsuites>`;
}

/**
 * Escape special characters for XML
 */
function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
}

/**
 * Print test results summary to console
 */
function printTestSummary(specResults: Record<string, TestSuite>): void {
  console.log("\n🧪 Test Results Summary");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  let totalTests = 0;
  let totalPassed = 0;
  let totalFailed = 0;
  let totalSkipped = 0;
  let totalDuration = 0;

  Object.values(specResults).forEach((suite) => {
    const passed = suite.tests.filter((t) => t.state === "passed").length;
    const failed = suite.tests.filter((t) => t.state === "failed").length;
    const skipped = suite.tests.filter(
      (t) => t.state === "skipped" || t.state === "pending"
    ).length;

    totalTests += suite.tests.length;
    totalPassed += passed;
    totalFailed += failed;
    totalSkipped += skipped;
    totalDuration += suite.duration;

    console.log(`File: ${path.basename(suite.file)}`);
    console.log(`  Tests: ${suite.tests.length}`);
    console.log(`  Passed: ${passed}`);
    console.log(`  Failed: ${failed > 0 ? failed + " ❌" : "0"}`);
    if (skipped > 0) console.log(`  Skipped: ${skipped}`);
    console.log(`  Duration: ${(suite.duration / 1000).toFixed(2)}s`);

    if (failed > 0) {
      console.log("\n  Failed Tests:");
      suite.tests
        .filter((t) => t.state === "failed")
        .forEach((test) => {
          console.log(
            `    - ${
              Array.isArray(test.title) ? test.title.join(" > ") : test.title
            }`
          );
          // Use optional chaining for error property
          console.log(`      ${test.displayError || ""}`);
        });
    }

    console.log("\n" + "─".repeat(40) + "\n");
  });

  console.log("\nTotal Summary:");
  console.log(`  Tests: ${totalTests}`);
  console.log(`  Passed: ${totalPassed}`);
  console.log(`  Failed: ${totalFailed > 0 ? totalFailed + " ❌" : "0"}`);
  if (totalSkipped > 0) console.log(`  Skipped: ${totalSkipped}`);
  console.log(
    `  Success Rate: ${
      totalTests > 0
        ? Math.round((totalPassed / totalTests) * 100) + "%"
        : "N/A"
    }`
  );
  console.log(`  Total Duration: ${(totalDuration / 1000).toFixed(2)}s`);
  console.log("\n" + "━".repeat(40) + "\n");

  // Output JUnit XML path for CI integration
  console.log(`JUnit XML reports available in: ${RESULTS_DIR}`);
}

/**
 * Find JUnit files using native fs functions
 */
function findJunitFiles(dir: string, pattern: RegExp): string[] {
  return fs
    .readdirSync(dir)
    .filter((file) => pattern.test(file))
    .map((file) => path.join(dir, file));
}

/**
 * The main JUnit reporter function - using valid Cypress events
 */
export function junitReporter(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): void {
  // Use the after:spec event to collect test results
  on("after:spec", (spec, results) => {
    try {
      // Get spec info
      const specFile = spec.relative || spec.name;

      if (!specFile) {
        console.log("Could not determine spec file");
        return;
      }

      // Create test suite entry for this spec
      const suite: TestSuite = {
        title: path.basename(specFile, path.extname(specFile)),
        tests: [],
        duration: 0,
        timestamp: new Date().toISOString(),
        file: specFile,
      };

      // Process test results from the spec run
      if (results && results.tests) {
        results.tests.forEach((test) => {
          const testResult: TestResult = {
            title: test.title || ["Unknown Test"],
            state: test.state as TestState,
            duration: test.duration || 0,
            displayError: test.displayError || undefined,
            attempts: test.attempts,
          };

          suite.tests.push(testResult);
          suite.duration += testResult.duration;
        });
      }

      // Store in our results collection
      specResults[specFile] = suite;

      // Generate XML for this specific spec
      try {
        const fileName = getSpecFileName(specFile);
        const reportPath = path.join(RESULTS_DIR, `junit-${fileName}.xml`);
        const xmlContent = generateJUnitXml(suite);

        fs.writeFileSync(reportPath, xmlContent);
        console.log(`  ✓ Created JUnit report: ${reportPath}`);
      } catch (error) {
        console.error(`Error generating XML for ${specFile}:`, error);
      }
    } catch (error) {
      console.error("Error processing spec result:", error);
    }
  });

  // Handle end of test run to generate summary and combined reports
  // Use a simpler approach for after:run event
  on("after:run" as any, (results: any) => {
    console.log("\n📊 Generating JUnit XML reports summary...");

    try {
      // Print summary to console
      printTestSummary(specResults);

      // Create a manifest of all reports
      const reportFiles = Object.keys(specResults).map((specPath) => {
        const fileName = getSpecFileName(specPath);
        return `junit-${fileName}.xml`;
      });

      const totalTests = Object.values(specResults).reduce(
        (acc, suite) => acc + suite.tests.length,
        0
      );

      const totalFailures = Object.values(specResults).reduce(
        (acc, suite) =>
          acc + suite.tests.filter((t) => t.state === "failed").length,
        0
      );

      const totalDuration = Object.values(specResults).reduce(
        (acc, suite) => acc + suite.duration,
        0
      );

      const manifest: JUnitReportManifest = {
        timestamp: new Date().toISOString(),
        files: reportFiles,
        totalTests,
        totalFailures,
        totalDuration,
      };

      fs.writeFileSync(
        path.join(RESULTS_DIR, "junit-reports-manifest.json"),
        JSON.stringify(manifest, null, 2)
      );

      console.log(
        `\n✅ JUnit reporting complete. ${
          Object.keys(specResults).length
        } reports generated.\n`
      );
    } catch (error) {
      console.error("Error generating JUnit reports summary:", error);
    }

    return results;
  });

  // Register helper tasks
  on("task", {
    listJunitReports: () => {
      try {
        const reportFiles = findJunitFiles(RESULTS_DIR, /^junit-.*\.xml$/);
        return reportFiles.map((file) => path.basename(file));
      } catch (error) {
        console.error("Error listing JUnit reports:", error);
        return [];
      }
    },

    cleanJunitReports: () => {
      try {
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const backupDir = path.join(RESULTS_DIR, `backup-${timestamp}`);

        // Create backup directory
        if (!fs.existsSync(backupDir)) {
          fs.mkdirSync(backupDir, { recursive: true });
        }

        // Find existing reports
        const reportFiles = findJunitFiles(RESULTS_DIR, /^junit-.*\.xml$/);

        // Move to backup directory
        reportFiles.forEach((file) => {
          const fileName = path.basename(file);
          fs.copyFileSync(file, path.join(backupDir, fileName));
          fs.unlinkSync(file);
        });

        return {
          success: true,
          message: `Cleaned ${reportFiles.length} reports. Backup created at ${backupDir}`,
          backupDir,
        };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        console.error("Error cleaning JUnit reports:", errorMessage);
        return { success: false, error: errorMessage };
      }
    },
  });
}

// Add default export to fix import issues
export default junitReporter;
