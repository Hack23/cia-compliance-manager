import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS_DIR = path.join(__dirname, "..", "docs", "architecture");
const DEPS_DIR = path.join(__dirname, "..", "docs", "dependencies");

// Ensure directories exist
[DOCS_DIR, DEPS_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Check if GraphViz is installed
try {
  execSync("dot -V", { stdio: "ignore" });
  console.log("GraphViz is installed.");
} catch (error) {
  console.error(
    "GraphViz is not installed or not in PATH. Skipping diagram generation that requires GraphViz."
  );
  console.error("Please install GraphViz: sudo apt-get install graphviz");
  // Exit with success to allow workflow to continue
  process.exit(0);
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

// Create a basic module dependency file if generation failed
if (
  !fs.existsSync(
    path.join(
      __dirname,
      "..",
      "docs",
      "dependencies",
      "module-dependencies.svg"
    )
  )
) {
  const basicSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="300">
    <text x="50" y="50" font-family="Arial" font-size="16">Module dependency diagram generation failed.</text>
    <text x="50" y="80" font-family="Arial" font-size="14">Please ensure GraphViz is installed.</text>
    <text x="50" y="110" font-family="Arial" font-size="14">Install with: sudo apt-get install graphviz</text>
  </svg>`;

  fs.writeFileSync(path.join(DEPS_DIR, "module-dependencies.svg"), basicSvg);
}

console.log("Architecture diagrams generated successfully!");
