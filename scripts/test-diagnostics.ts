import { execSync } from "child_process";

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
  `${colors.bright}${colors.blue}🔍 Running Test Diagnostics${colors.reset}`
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
    const output = execSync(command).toString();
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

// Check for TypeScript errors
const tsCheck = runCommand("npx tsc --noEmit", "TypeScript type check");
if (!tsCheck.success) {
  formatOutput("TypeScript errors found:", "error");
  console.log(tsCheck.output);
}

// Run tests in different modes
const testModes = [
  { command: "npm run test", description: "Running all tests" },
  {
    command: "npm run test -- BusinessImpactSection",
    description: "Testing BusinessImpactSection components",
  },
  {
    command: "npm run test -- RadarChart",
    description: "Testing RadarChart components",
  },
  {
    command: "npm run test -- typeGuards",
    description: "Testing typeGuards utilities",
  },
];

let passedTests = 0;
const failedTests: string[] = [];

for (const mode of testModes) {
  const result = runCommand(mode.command, mode.description);
  if (result.success) {
    passedTests++;
  } else {
    failedTests.push(mode.description);
    console.log(`\nError output for ${mode.description}:`);
    console.log(result.output);
  }
}

console.log("\n=== Summary ===");
formatOutput(
  `${passedTests} of ${testModes.length} test groups passed.`,
  passedTests === testModes.length ? "success" : "warning"
);

if (failedTests.length > 0) {
  formatOutput("Failed test groups:", "error");
  failedTests.forEach((test, i) => {
    console.log(`${i + 1}. ${test}`);
  });
}

// Offer specific advice based on failed tests
if (failedTests.includes("Testing typeGuards utilities")) {
  formatOutput("\nSuggestions for fixing typeGuards tests:", "info");
  console.log(
    "- Check for missing type guard helper functions (isString, isNumber)"
  );
  console.log("- Verify proper imports in test files");
  console.log("- Ensure test mocks match the expected interfaces");
}

if (failedTests.includes("Testing RadarChart components")) {
  formatOutput("\nSuggestions for fixing RadarChart tests:", "info");
  console.log("- Check Chart.js mock implementation");
  console.log("- Verify canvas mock setup");
  console.log("- Check for proper test cleanup");
}
