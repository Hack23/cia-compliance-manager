import { execSync } from "child_process";
import * as fs from "fs";

// Colors for terminal output
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  bright: "\x1b[1m",
};

console.log(
  `${colors.bright}${colors.blue}🔍 Running Test Diagnostic Report${colors.reset}`
);

// Function to format output with colors
function formatOutput(
  message: string,
  status: "success" | "error" | "warning" | "info"
): void {
  const colorMap = {
    success: colors.green,
    error: colors.red,
    warning: colors.yellow,
    info: colors.blue,
  };
  console.log(`${colorMap[status]}${message}${colors.reset}`);
}

// Function to run a command and handle its output
function runCommand(
  command: string,
  description: string
): { success: boolean; output: string } {
  try {
    formatOutput(`⚙️ ${description}...`, "info");
    const output = execSync(command, { encoding: "utf-8" });
    formatOutput(`✅ ${description} complete!`, "success");
    return { success: true, output };
  } catch (error: any) {
    formatOutput(`❌ ${description} failed!`, "error");
    return {
      success: false,
      output: error.stdout ? error.stdout.toString() : error.message,
    };
  }
}

// Generate a list of all test files
function getTestFiles() {
  const output = execSync('find src -name "*.test.tsx" -o -name "*.test.ts"', {
    encoding: "utf-8",
  });
  return output.trim().split("\n");
}

// Check for TypeScript errors
const tsCheck = runCommand("npx tsc --noEmit", "TypeScript type check");
if (!tsCheck.success) {
  formatOutput("TypeScript errors found:", "error");
  console.log(tsCheck.output);
}

// Get all test files
const testFiles = getTestFiles();
formatOutput(`Found ${testFiles.length} test files`, "info");

// Check for specific issues related to vi.mock
const potentialHoistingIssues = testFiles.filter((file) => {
  try {
    const content = fs.readFileSync(file, "utf-8");
    // Look for patterns that might indicate hoisting issues
    return (
      content.includes("vi.mock") &&
      (content.match(/vi\.mock/g)?.length || 0) > 1 &&
      !content.startsWith("vi.mock")
    );
  } catch (err) {
    return false;
  }
});

if (potentialHoistingIssues.length > 0) {
  formatOutput(
    `⚠️ Found ${potentialHoistingIssues.length} files with potential vi.mock hoisting issues:`,
    "warning"
  );
  potentialHoistingIssues.forEach((file) => {
    console.log(`  - ${file}`);
  });

  formatOutput(`\nRecommendation:`, "info");
  console.log(`- Move all vi.mock calls to the top of the file, before any imports
- Use factory functions for defining mock implementations
- Consider using the test utilities from src/tests/testMocks.ts`);
}

// Run specific problematic tests to verify fixes
const problematicTests = [
  {
    file: "BusinessImpactSection.extended.test.tsx",
    description: "BusinessImpactSection extended tests",
  },
  {
    file: "CIAClassificationApp.darkmode.test.tsx",
    description: "Dark mode tests",
  },
  {
    file: "RadarChart.extended.test.tsx",
    description: "RadarChart extended tests",
  },
];

formatOutput(`\nTesting specific problematic files:`, "info");
problematicTests.forEach((test) => {
  const result = runCommand(
    `npx vitest run ${test.file} --reporter=verbose`,
    `Running ${test.description}`
  );
  if (!result.success) {
    console.log(result.output.split("\n").slice(0, 20).join("\n") + "...");
  }
});

// Run coverage report
formatOutput(`\nGenerating test coverage report:`, "info");
const coverageResult = runCommand(
  "npx vitest run --coverage",
  "Coverage report"
);

// Analyze coverage report
if (coverageResult.success) {
  formatOutput(`\nTest coverage summary:`, "success");
  const coverageLines = coverageResult.output.split("\n");
  const coverageSummaryIndex = coverageLines.findIndex((line) =>
    line.includes("Test Files")
  );

  if (coverageSummaryIndex > 0) {
    coverageLines
      .slice(coverageSummaryIndex, coverageSummaryIndex + 5)
      .forEach((line) => {
        console.log(line);
      });
  }
}

console.log(
  `\n${colors.bright}${colors.blue}Test Diagnostic Report Complete${colors.reset}`
);
