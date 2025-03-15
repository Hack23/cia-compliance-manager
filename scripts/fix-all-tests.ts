import { execSync } from "child_process";
import * as fs from "fs";

// Get all test files with potential hoisting issues
const output = execSync('find src -name "*.test.tsx" -o -name "*.test.ts"', {
  encoding: "utf-8",
});
const testFiles = output.trim().split("\n");

// Filter for files with vi.mock not at the top
const filesWithHoistingIssues = testFiles.filter((file) => {
  const content = fs.readFileSync(file, "utf-8");
  return (
    content.includes("vi.mock") &&
    !content.startsWith("vi.mock") &&
    !content.startsWith("// vi.mock")
  );
});

console.log(
  `Found ${filesWithHoistingIssues.length} files with potential vi.mock hoisting issues`
);

// Process each file
let fixedCount = 0;
let errorCount = 0;

for (const file of filesWithHoistingIssues) {
  try {
    console.log(`Processing ${file}...`);
    execSync(`npx tsx scripts/fix-test-hoisting.ts ${file}`, {
      stdio: "inherit",
    });
    fixedCount++;
  } catch (error) {
    console.error(`Error fixing ${file}:`, error);
    errorCount++;
  }
}

console.log(`
✅ Fixed hoisting issues in ${fixedCount} files
❌ Failed to fix ${errorCount} files

Next steps:
1. Run tests to verify everything works: npm test
2. Review fixed files for additional improvements
3. Consider using standard mock helpers for new tests
`);
