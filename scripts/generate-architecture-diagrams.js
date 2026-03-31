import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS_DIR = path.join(__dirname, "..", "docs", "architecture");

// Ensure directory exists
if (!fs.existsSync(DOCS_DIR)) {
  fs.mkdirSync(DOCS_DIR, { recursive: true });
}

// Generate project structure visualization
console.log("Generating project structure visualization...");
try {
  const projectStructure = execSync(
    'find src -type f -not -path "*/node_modules/*" -not -path "*/\\.*" | sort'
  ).toString();

  // Write structure to file for visualization
  fs.writeFileSync(
    path.join(DOCS_DIR, "project-structure.txt"),
    projectStructure
  );

  // Generate HTML visualization
  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CIA Compliance Manager - Project Structure</title>
    <style>
      body { font-family: Arial, sans-serif; margin: 2em; }
      .tree-structure { margin-left: 2em; }
      .file { color: #333; }
      .directory { color: #0066cc; font-weight: bold; }
      h1 { color: #333; border-bottom: 1px solid #ccc; padding-bottom: 0.5em; }
    </style>
  </head>
  <body>
    <h1>CIA Compliance Manager Project Structure</h1>
    <pre class="tree-structure">
${projectStructure
  .split("\n")
  .map((line) => {
    if (!line.trim()) return "";
    const indentation = line.split("/").length - 1;
    const spaces = "  ".repeat(indentation);
    const isFile = !line.endsWith("/");
    const name = line.split("/").pop();
    return `${spaces}${isFile ? "📄 " : "📁 "}<span class="${
      isFile ? "file" : "directory"
    }">${name || ""}</span>`;
  })
  .join("\n")}
    </pre>
  </body>
  </html>
  `;

  fs.writeFileSync(path.join(DOCS_DIR, "project-structure.html"), htmlContent);
} catch (error) {
  console.error("Error generating project structure visualization:", error);
}

console.log("Architecture diagrams generated successfully!");
