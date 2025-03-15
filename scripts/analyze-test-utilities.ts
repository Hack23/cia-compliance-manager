import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";

interface TestFile {
  path: string;
  filename: string;
  mockUsage: {
    viMockCalls: number;
    usesTestHelpers: boolean;
    usesMockChartJs: boolean;
    hasMockDOMAPIs: boolean;
  };
  testStructure: {
    testCount: number;
    describeBlocks: number;
    beforeEachUsed: boolean;
    afterEachUsed: boolean;
  };
  issues: {
    hoistingIssues: boolean;
    asyncAwaitIssues: boolean;
    typeAnnotationIssues: boolean;
    importErrorProne: boolean;
  };
}

function analyzeTestFile(filePath: string): TestFile {
  const content = fs.readFileSync(filePath, "utf-8");
  const filename = path.basename(filePath);

  // Count mocking patterns
  const viMockCalls = (content.match(/vi\.mock\(/g) || []).length;
  const usesTestHelpers =
    content.includes("test-helpers") || content.includes("testHelpers");
  const usesMockChartJs =
    content.includes("MockChart") || content.includes("mockChartInstance");
  const hasMockDOMAPIs =
    content.includes("HTMLCanvasElement.prototype") ||
    content.includes("window.matchMedia");

  // Count test structure
  const testCount = (content.match(/\bit\(/g) || []).length;
  const describeBlocks = (content.match(/\bdescribe\(/g) || []).length;
  const beforeEachUsed = content.includes("beforeEach");
  const afterEachUsed = content.includes("afterEach");

  // Identify potential issues
  const hoistingIssues = viMockCalls > 0 && !content.startsWith("vi.mock");
  const asyncAwaitIssues =
    content.includes("await") && !content.includes("async");
  const typeAnnotationIssues =
    content.includes(": any") || content.includes("as any");
  const importErrorProne =
    content.includes("import(") && !content.includes("async");

  return {
    path: filePath,
    filename,
    mockUsage: {
      viMockCalls,
      usesTestHelpers,
      usesMockChartJs,
      hasMockDOMAPIs,
    },
    testStructure: {
      testCount,
      describeBlocks,
      beforeEachUsed,
      afterEachUsed,
    },
    issues: {
      hoistingIssues,
      asyncAwaitIssues,
      typeAnnotationIssues,
      importErrorProne,
    },
  };
}

// Find all test files
const output = execSync('find src -name "*.test.tsx" -o -name "*.test.ts"', {
  encoding: "utf-8",
});
const testFiles = output.trim().split("\n");

// Analyze each test file
const results = testFiles.map(analyzeTestFile);

// Output results
console.log(`Analyzed ${results.length} test files`);
console.log(`\nTest Utility Usage Summary:`);
console.log(
  `- Files using vi.mock: ${
    results.filter((r) => r.mockUsage.viMockCalls > 0).length
  }`
);
console.log(
  `- Files using test-helpers: ${
    results.filter((r) => r.mockUsage.usesTestHelpers).length
  }`
);
console.log(
  `- Files using Chart.js mocks: ${
    results.filter((r) => r.mockUsage.usesMockChartJs).length
  }`
);
console.log(
  `- Files mocking DOM APIs: ${
    results.filter((r) => r.mockUsage.hasMockDOMAPIs).length
  }`
);

console.log(`\nPotential Issues:`);
console.log(
  `- Files with vi.mock hoisting issues: ${
    results.filter((r) => r.issues.hoistingIssues).length
  }`
);
console.log(
  `- Files with async/await issues: ${
    results.filter((r) => r.issues.asyncAwaitIssues).length
  }`
);
console.log(
  `- Files with type annotation issues: ${
    results.filter((r) => r.issues.typeAnnotationIssues).length
  }`
);
console.log(
  `- Files with error-prone dynamic imports: ${
    results.filter((r) => r.issues.importErrorProne).length
  }`
);

// Generate detailed report
const issueFiles = results.filter(
  (r) =>
    r.issues.hoistingIssues ||
    r.issues.asyncAwaitIssues ||
    r.issues.typeAnnotationIssues ||
    r.issues.importErrorProne
);

console.log(`\nFiles with potential issues (${issueFiles.length}):`);
issueFiles.forEach((file) => {
  console.log(`\n${file.filename}:`);
  if (file.issues.hoistingIssues)
    console.log(
      `  - vi.mock hoisting issue (${file.mockUsage.viMockCalls} calls)`
    );
  if (file.issues.asyncAwaitIssues) console.log(`  - async/await usage issue`);
  if (file.issues.typeAnnotationIssues)
    console.log(`  - type annotation issue`);
  if (file.issues.importErrorProne)
    console.log(`  - error-prone dynamic import`);
});
