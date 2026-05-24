#!/usr/bin/env node
/**
 * Color audit for mermaid diagrams.
 *
 * Walks all `*.md` files and inspects every ```mermaid``` block. Reports
 * every fill / stroke color used in `style` / `classDef` / `linkStyle` /
 * `UpdateElementStyle` lines, grouped by hex code (case-insensitive). The
 * canonical palette comes from `docs/architecture/STYLE_GUIDE.md`; colors
 * that are not in the palette are flagged so they can be reviewed and
 * normalized to the closest sanctioned token.
 *
 * Usage:
 *   node scripts/audit-mermaid-colors.mjs           # full report
 *   node scripts/audit-mermaid-colors.mjs --non-palette
 */
import fs from "node:fs";
import path from "node:path";

const REPO_ROOT = path.resolve(process.cwd());
const SKIP_DIRS = new Set(["node_modules", ".git", "dist", "build", "coverage", ".cache"]);
const NON_PALETTE_ONLY = process.argv.includes("--non-palette");

// Canonical palette taken from docs/architecture/STYLE_GUIDE.md
const PALETTE = new Set(
  [
    // CIA Triad
    "#7B1FA2", "#4A148C",
    "#2E7D32", "#1B5E20",
    "#1565C0", "#0D47A1",
    // Architectural elements
    "#455A64", "#2c3e50",
    "#D32F2F", "#B71C1C",
    "#2196F3",
    // Status
    "#4CAF50",
    "#FF9800", "#F57C00", "#e67e22",
    "#9E9E9E", "#757575", "#616161", "#626567",
    // Business / value
    "#FFC107", "#FF8F00",
    // Style-guide alternative tokens
    "#8e44ad", "#6c3483",
    "#27ae60", "#1e8449",
    "#2980b9", "#2471a3",
    "#34495e",
    "#3498db",
    "#e74c3c", "#c0392b",
    "#f1c40f", "#f39c12",
    "#1abc9c", "#16a085",
    // Neutrals frequently used
    "#ffffff", "#FFFFFF", "#fff", "#000", "#000000", "#333", "#666",
    "#007E33", "#6A1B9A",
  ].map((c) => c.toLowerCase())
);

function walkMd(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walkMd(p, out);
    else if (entry.isFile() && entry.name.endsWith(".md")) out.push(p);
  }
  return out;
}

const HEX_RE = /#(?:[0-9a-fA-F]{3,8})\b/g;

const allColors = new Map(); // hex (lower) -> { count, files: Set, examples: [] }

for (const f of walkMd(REPO_ROOT)) {
  const content = fs.readFileSync(f, "utf8");
  const lines = content.split("\n");
  let inBlock = false;
  let fence = "";
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!inBlock) {
      const m = line.match(/^(\s*)(`{3,}|~{3,})mermaid\s*$/);
      if (m) {
        inBlock = true;
        fence = m[2];
      }
    } else if (line.match(new RegExp(`^\\s*${fence}\\s*$`))) {
      inBlock = false;
    } else if (/\b(style|classDef|linkStyle|UpdateElementStyle|UpdateRelStyle)\b|fill:|stroke:|bgColor=|borderColor=|fontColor=/i.test(line)) {
      const matches = line.match(HEX_RE);
      if (matches) {
        for (const c of matches) {
          const key = c.toLowerCase();
          if (!allColors.has(key)) allColors.set(key, { count: 0, files: new Set(), examples: [] });
          const entry = allColors.get(key);
          entry.count++;
          entry.files.add(path.relative(REPO_ROOT, f));
          if (entry.examples.length < 2) entry.examples.push(`${path.relative(REPO_ROOT, f)}:${i + 1}`);
        }
      }
    }
  }
}

const rows = Array.from(allColors.entries())
  .map(([hex, info]) => ({ hex, count: info.count, files: info.files.size, inPalette: PALETTE.has(hex), example: info.examples[0] }))
  .sort((a, b) => b.count - a.count);

const reportDir = path.join(REPO_ROOT, "build");
fs.mkdirSync(reportDir, { recursive: true });
fs.writeFileSync(path.join(reportDir, "mermaid-color-audit.json"), JSON.stringify(rows, null, 2));

const display = NON_PALETTE_ONLY ? rows.filter((r) => !r.inPalette) : rows;
console.log(`${rows.length} distinct colors (${rows.filter((r) => !r.inPalette).length} not in STYLE_GUIDE palette)\n`);
console.log("count  files  palette  hex        example");
for (const r of display) {
  console.log(
    `${String(r.count).padStart(5)}  ${String(r.files).padStart(5)}  ${(r.inPalette ? "OK" : "----").padStart(7)}  ${r.hex.padEnd(9)}  ${r.example}`
  );
}
