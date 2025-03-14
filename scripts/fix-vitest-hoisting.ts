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

// Template for recommended pattern
const createFixTemplate = (filename: string) => `
Recommended fix for ${filename}:

1. Move all vi.mock calls to the top of the file, before any imports
2. Ensure each mock returns the proper structure including __esModule: true
3. Add proper typing to mock functions

Example:
\`\`\`typescript
vi.mock("./path/to/module", () => ({
  __esModule: true,
  default: vi.fn(),
  namedExport: vi.fn(),
}));

// Then do normal imports
import { render } from '@testing-library/react';
\`\`\`

Consider using our test utilities from src/tests/testUtils for consistent mocking.
`;

// Generate report
filesWithHoistingIssues.forEach((file) => {
  console.log(createFixTemplate(file));
});

console.log(`
Use the following command to fix a specific test file:
npm run test:radar -- --update
`);
